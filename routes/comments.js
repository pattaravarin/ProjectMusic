const   express     =   require('express'),
        router      =   express.Router({mergeParams : true}),
        Print       =   require('../models/print'),
        Comment     =   require('../models/comment');
        middleware  =   require('../middleware');

//ตรงนี้เกี่ยวกับเข้าไปหน้า comment 
router.get("/new", middleware.isLoggedIn ,function(req, res){
    Print.findById(req.params.id, function(err, foundPrint){
        if(err){
            console.log(err);
        }else {
            res.render('comments/new.ejs', {print: foundPrint})
        }
    });
});

router.post("/", middleware.isLoggedIn ,function(req, res){
    Print.findById(req.params.id, function(err, foundPrint){
        if(err){
            console.log(err);
        }else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    
                    foundPrint.comments.push(comment);
                    foundPrint.save();
                    res.redirect('/prints/'+ foundPrint._id);
                }
            });
        }
    });
});

//ไปหน้าแก้คอมเมน
router.get('/:comment_id/edit', middleware.checkCommentOwner, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
        console.log(err);
        res.redirect('back');
    }else{
        res.render('comments/edit.ejs', {print_id: req.params.id, comment: foundComment})
    }        
    });
})
//ให้คอมเมนแบบแก้ไขแล้วลงไปในฐานข้อมูล
router.put('/:comment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect('back');
        }else{
            res.redirect('/prints/' + req.params.id);
        }
    });
});

router.delete('/:comment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            req.flash('error', 'There are something wrong')
            res.redirect('/prints/' + req.params.id);
        }else{
            req.flash('success', 'comment was deleted')
            res.redirect('/prints/' + req.params.id);
        }
    });
});

module.exports = router;
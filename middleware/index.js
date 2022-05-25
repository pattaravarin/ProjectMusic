const   Print = require('../models/print'),
        Comment = require('../models/comment');

const   middlewareObj = {};

// check ว่าผู้ใช้เป็นเจ้าของตัว Post รึเปล่า ถ้าใช้ก็จะแก้ไขตัวรูปหรือลบก็ได้
middlewareObj.checkPrintOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Print.findById(req.params.id, function(err, foundPrint){
            if(err){
                res.redirect('back');
            }else {
                if(req.user.isAdmin){
                    next();
                }else{
                    req.flash('error', "You do not have permission to do this action!");
                    res.redirect('back');                }
            }
        })
    }else{
        req.flash('error', "Please login");
        res.redirect('back');
    }
}

middlewareObj.checkCommentOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect('back');
            }else {
                if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                }else{
                    req.flash('error', "You do not have permission to do this action!");
                    res.redirect('back');               
                }
            }
        });
    }else{
        req.flash('error', "Please login");
        res.redirect('back');
    }
}

// Check ว่า User Login มารึยัง
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to login first');    
    res.redirect('/login');
}
module.exports = middlewareObj;

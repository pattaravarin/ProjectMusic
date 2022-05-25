const   express     =   require('express'),
        router       =   express.Router(),
        Artist      =   require('../models/artist'),
        middleware  =   require('../middleware'),
        multer      =   require('multer'),
        User       =   require('../models/user'),
        path        =   require('path'),
        storage     =   multer.diskStorage({
            destination : function(req, file, callback){
                callback(null, './public/upload');
            },
            filename : function(req, file, callback){
                callback(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
            }
}),
imageFilter =   function(req, file, callback){
if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
    return callback(new Error('Only jpg, jpeg, png, gif'), false);
}
callback(null, true);
},
upload = multer({storage : storage, fileFilter : imageFilter}),
Artists       =   require('../models/artist');

router.get("/", function(req, res){
    Artist.find({}, function(err, allArtist){
        if(err){
            console.log(err);
        }
        else{
            res.render("artist/index.ejs",{artist:allArtist} );
                            
        }
    })                        
});


//ไปหน้าสร้าง Artist ตัวใหม่
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("artist/new.ejs");
});

//สร้าง Artist ใหม่
router.post("/", upload.single("artistImage"), function(req, res){
    if(req.file){
        req.body.artist.artistImage = '/upload/' + req.file.filename; 
    } Artists.create(req.body.artist, function(err, newArtist){
        if(err){
            console.log(err)
        }else {
            res.redirect("/artist")
        }
    })
})

//ไปหน้าแต่ละ Artist
router.get('/:id', function(req, res){
    Artists.findById(req.params.id, function(err, foundArtist){
        if(err){
            req.flash('error', ' There is something wrong');
            return res.redirect('/artist');
        }else {
            res.render('artist/show.ejs', {artist: foundArtist});
        }
    })
});

//สำหรับ edit เพื่อ put method
router.put('/:id', upload.fields([{name: "artistImage"}]), function(req, res){
    if(req.files["artistImage"]){
        req.body.print.image = '/upload/' + req.files["artistImage"][0].filename;
    }

    Print.findByIdAndUpdate(req.params.id, req.body.print, function(err, updatePrint){
        if(err){
            console.log(err);
            res.redirect('/artist/');
        }else {
            res.redirect('/prints/'+ req.params.id);
        }
    })
})

// ปุ่มค้นหาศิลปิน
router.post('/searchArtist', function(req, res){
    Artists.find({name:{$regex:req.body.searchButton, $options: "i"}}, function(err, foundArtist){
        if(err){
            console.log(err);
        }else {
            res.render('artist/index.ejs', {artist:foundArtist});

        }
    });
})

//ของ delete
router.delete('/:id', middleware.checkPrintOwner, function(req, res){
    Artist.findByIdAndRemove(req.params.id ,function(err){
        if(err){
            console.log(err);
            res.redirect('/artist/');
        }else {
            res.redirect('/artist/');
        }
    });
});
module.exports = router;
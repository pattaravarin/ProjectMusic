const { callbackify } = require('util');

const   express     =   require('express'),
        router      =   express.Router(),
        multer      =   require('multer'),
        path        =   require('path'),
        //path แล้วเก็บที่ไหนที่ storage ไงล่ะ
        storage     =   multer.diskStorage({
                        destination : function(req, file, callback){
                            callback(null, './public/upload');
                        },
                        filename : function(req, file, callback){
                            callback(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
                        }
        }),
        imageFilter =   function(req, file, callback){
            if(!file.originalname.match(/\.(jpg|jpeg|png|gif|mp3|wav|aiff|wma|ogg|aac|flac|m4a|ape|cda)$/i)){
                return callback(new Error('Only jpg, jpeg, png, gif ,mp3 ,wav ,aiff ,wma ,ogg ,aac ,flac ,m4a ,ape and cda'), false);
            }
            callback(null, true);
        },
        upload = multer({storage : storage, fileFilter : imageFilter}),
        middleware  =   require('../middleware'),
        Print       =   require('../models/print');

//"/prints ไปหน้า prints"
router.get("/", function(req, res){
    Print.find({}, function(err, allPrints){
        if(err){
            console.log(err);
        }
        else{
            res.render("print/index.ejs",{prints:allPrints} );
                            //prints แรกเป็นชื่อตัวแปลที่ส่งไปที่ index.ejs
        }
    })                        
});

//สร้าง print ใหม่
router.post("/" ,middleware.isLoggedIn ,upload.fields([{name: "image"},{name: "music"}]), function(req, res){
    req.body.print.image = '/upload/' + req.files["image"][0].filename;
    req.body.print.music = '/upload/' + req.files["music"][0].filename;
    req.body.print.author = {
        id: req.user._id,
        username: req.user.username,
    }

    Print.create(req.body.print, function(err, newlyAdded){
        if(err){
            console.log(err);
        } else{
            // res.redirect คือ user ใส่ข้อมูลเสร็จจะให้ user โผ่ไปหน้าไหน
            res.redirect("/prints");
        }
    });
});

//ไปหน้าสร้าง print ตัวใหม่
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("print/new.ejs");
});

//ไปหน้าโชว์แต่ละ print
router.get("/:id", function(req, res){
    Print.findById(req.params.id).populate('comments').exec(function(err, foundPrint){
        if(err){
            console.log(err)
        } else {
            res.render('print/show.ejs', {print: foundPrint})
        }
    });
});

//หน้า edit
router.get("/:id/edit", middleware.checkPrintOwner, function(req, res){
    Print.findById(req.params.id, function(err, foundprint){
        if(err){
            console.log(err);
        }else {
            res.render('print/edit.ejs', {print: foundprint})
        }
    });
});

//สำหรับ edit เพื่อ put method
router.put('/:id', upload.fields([{name: "image"},{name: "music"}]), function(req, res){
    if(req.files["image"]){
        req.body.print.image = '/upload/' + req.files["image"][0].filename;
    }
    if(req.files["music"]){
        req.body.print.music = '/upload/' + req.files["music"][0].filename;
    }

    Print.findByIdAndUpdate(req.params.id, req.body.print, function(err, updatePrint){
        if(err){
            console.log(err);
            res.redirect('/prints/');
        }else {
            res.redirect('/prints/'+ req.params.id);
        }
    })
})

//ของ delete
router.delete('/:id', middleware.checkPrintOwner, function(req, res){
    Print.findByIdAndRemove(req.params.id ,function(err){
        if(err){
            console.log(err);
            res.redirect('/prints/');
        }else {
            res.redirect('/prints/');
        }
    });
});

module.exports = router;
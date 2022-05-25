const   express     =   require('express'),
        router       =   express.Router(),
        User        =   require('../models/user'),
        Print       =   require('../models/print'),
        Artist      =   require('../models/artist'),
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
            if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
                return callback(new Error('Only jpg, jpeg, png, gif'), false);
            }
            callback(null, true);
        },
        upload = multer({storage : storage, fileFilter : imageFilter}),
        middleware  =   require('../middleware'),
        passport    =   require('passport');

//เป็นตัวที่ทำให้รู้ว่าจะเปิดเซิร์ฟที่ไฟล์ไหนดี
router.get("/", function(req, res){
    res.render("landing.ejs");
});


// ไปหน้า register
router.get('/register', function(req, res){
    res.render('register.ejs');
});

router.post('/register', upload.single('profileImage'), function(req, res){
    req.body.profileImage = '/upload/' + req.file.filename;
    let newUser = new User({username: req.body.username,
                            firstName : req.body.firstName,
                            lastName : req.body.lastName,
                            email     : req.body.email,
                            profileImage : req.body.profileImage
                           });
    // อยากเป็น admin ต้องเขียน code ของคนหน้าตาดีอย่าง GuitarPukpui
    if(req.body.adminCode === 'guitarpukpui'){
        newUser.isAdmin = true;
    } 
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash('error', err.message);
            return res.redirect('/register');
        }else {
            passport.authenticate('local') (req, res, function() {
                req.flash('success', user.username + ', Welcome Utae');
                res.redirect('/prints');
            });
        }
    });
});

//ไปหน้า login
router.get('/login', function(req, res){
    res.render('login.ejs');
});

router.get('/user/delete', function(req, res){
    User.find({}).exec(function(err, foundUser){
        if(err){
            console.log(err);
        }else {
            res.render('delete/show.ejs', {foundUser: foundUser}); 
        }
    })
   
});

router.post('/login', passport.authenticate('local',
{
    successRedirect: '/prints',
    failureRedirect: '/login',
    //บอก user ว่า login สำเร็จ ถ้าพลาดก็บอกอยู่ดี อิ_อิ
    successFlash: true,
    failureFlash: true,
    successFlash: 'Successfilly login',
    failureFlash: 'Invalid username or password'
}), function(req, res){
});

router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'Log you out successfully');
    res.redirect('/');
});

// ไปหน้าโปรไฟล์
router.get('/user/:id', function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash('error', ' There is something wrong');
            return res.redirect('/');
        }else {
            res.render('user/show.ejs', {user: foundUser});
        }
    })
});

//ไปหน้าแก้โปรไฟล์
router.get('/user/:id/edit', function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash('error', ' There is something wrong');
            return res.redirect('/');
        }else {
            res.render('user/edit', {user: foundUser});
        }
    })
});

// สำหรับ put ข้อมูลที่แก้ไขของโปรไฟล์
router.put('/user/:id', upload.single('image'), function(req, res){
    if(req.file){
        req.body.user.profileImage = '/upload/' + req.file.filename;
    }

    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updateUser){
        if(err){
            console.log(err);
            res.redirect('/user/');
        }else {
            res.redirect('/user/'+ req.params.id);
        }
    })
})

// ไปหน้า showSearch
router.get('/showSearch', function(req, res){
    res.render('showSearch.ejs');
});

router.post('/search', function(req, res){
    
    Print.find({name:{$regex:req.body.searchButton, $options: "i"}}, function(err, foundPrint){
        if(err){
            console.log(err);
        }else {
            Artist.find({artistname:{$regex:req.body.searchButton, $options: "i"}}, function(err, foundArtist){
                if(err){
                    console.log(err);
                }else {
                    res.render('search/showSearch', {prints:foundPrint ,artist:foundArtist});
        
                }
            })
        }
        })
})

//ของ delete
router.delete('/user/:id', function(req, res){
    User.findByIdAndRemove(req.params.id ,function(err){
        if(err){
            console.log(err);
            res.redirect('/user/delete');
        }else {
            res.redirect('/user/delete');
        }
    });
});

module.exports = router;
const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require('mongoose'),
      passport   =   require('passport'),
      LocalStrategy = require('passport-local'),
      flash    = require('connect-flash'),
      methodOverride = require('method-override'),
      Print       =   require('./models/print'),
      Comment     =   require('./models/comment'),
      User        =   require('./models/user'),
      Artist      =   require('./models/artist'),
      seedDB      =   require('./seeds.js');

const indexRoutes = require('./routes/index'),
      printRoutes = require('./routes/prints'),
      commentRoutes = require('./routes/comments'),
      artistRoutes = require('./routes/artist');
 
mongoose.connect('mongodb://localhost/Utae');

app.set("view engine", "ejs");
//ไปเชื่อมกับโฟรเดอร์ public ได้
app.use(express.static("./public"));

app.use(bodyParser.urlencoded({extended : true}));

app.use(methodOverride('_method'));

app.use(flash());
//อยากลบโหลดใหม่ก็เอา comment seedDB(); ออกนะ
// seedDB();

//ตรงนี้จะเกี่ยวกับ User
app.use(require('express-session')({
    secret : 'secret word',
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    //มันคือตัวบอก user ว่ากรอกข้อมูล login ผิดหรือกรอกสำเร็จ
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

//app.get คือการอ่านข้อมูล
//app.post คือการรับข้อมูล

app.use('/', indexRoutes);
app.use('/prints', printRoutes);
app.use('/prints/:id/comments', commentRoutes);
app.use('/artist', artistRoutes);

// เปิดเซิร์ฟที่ไหนดีนะ 3000 แล้วกัน
app.listen(3000, function(){
    console.log("Activated on 3000 YaHooๆ");
})
const mongoose = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose');

//กำหนดชุดข้อมูลที่กำลังจะเก็บ
const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    firstName : String,
    lastName : String,
    email    : String,
    profileImage : String,
    isAdmin  : {type : Boolean, default : false}
});

userSchema.plugin(passportLocalMongoose);

//ทำให้ไฟล์อื่นๆมาใช้ได้
module.exports = mongoose.model('User', userSchema);
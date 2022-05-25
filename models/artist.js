const mongoose = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose');

//กำหนดชุดข้อมูลที่กำลังจะเก็บ
const artistSchema = new mongoose.Schema({
    artistname : String,
    artistImage : String
});
//ทำให้ไฟล์อื่นๆมาใช้ได้
module.exports = mongoose.model('Artist', artistSchema);
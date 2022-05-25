const mongoose = require('mongoose');

//กำหนดชุดข้อมูลที่กำลังจะเก็บ
const commentSchema = new mongoose.Schema({
    author : String,
    author :{
        id :{
            //อ้างอิงจาก ID
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        } ,
        username: String
    } ,
    text : String
});

//ทำให้ไฟล์อื่นๆมาใช้ได้
module.exports = mongoose.model('Comment', commentSchema);

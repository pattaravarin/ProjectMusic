const mongoose = require('mongoose');

//กำหนดชุดข้อมูลที่กำลังจะเก็บ
const printSchema = new mongoose.Schema({
    name : String,
    Artist : String,
    image : String,
    music : String,
    lyrics : String,
    author : {
        id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    comments : [
        {
            //อ้างอิงจาก ID
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ]
});

//ทำให้ไฟล์อื่นๆมาใช้ได้
module.exports = mongoose.model('Print', printSchema);
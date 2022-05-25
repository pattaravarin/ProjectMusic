const   mongoose    =   require('mongoose'),
        Print       =   require('./models/print'),
        Comment     =   require('./models/comment');
        Artistss    =   require('./models/artist');
const command = require('nodemon/lib/config/command');

const dataSong = [  
{
    name : "Spy x Family",
    Artist: "Gen Hoshino",
    image: "/images/Screenshot 2022-05-22 235239.png",
    music: "/music/SPYFAMILYEnding_Comedy_by_Gen_(getmp3.pro).mp3",
},
{
    name : "Mafia",
    Artist: "Chogakusei",
    image: "/images/Screenshot 2022-05-24 200235.png",
    music: "/music/【超学生】マフィア _歌ってみた(MP3_320K).mp3",
},
{
    name : "Kami Ppoi na・ Laplus Cover",
    Artist: "Laplus ",
    image: "/images/Screenshot 2022-05-22 225945.png",
    music: "/music/_Cover_(getmp3.pro).mp3",
},
{
    name : "Careless",
    Artist: "ClariS",
    image: "/images/Screenshot 2022-05-24 202601.png",
    music: "/music/Careless(MP3_320K).mp3",
},
{
    name : "Rubia",
    Artist: "Zhou Shen",
    image: "/images/Screenshot 2022-05-24 203712.png",
    music: "/music/_Rubia_ เพลงธีมวาลคีเรียของ Honkai Impact 3 (ขับร้องโดย Zhou Shen)(MP3_160K)_1.mp3",
},
{
    name : "Rubia",
    Artist: "Zhou Shen",
    image: "/images/Screenshot 2022-05-22 233426.png",
    music: "/music/_From_Enc_(getmp3.pro).mp3",
},
{
    name : "MeMe ",
    Artist: "Mikoto (CV: Natsuki Hanae)",
    image : "/images/Screenshot 2022-05-24 204537.png",
    music : "/music/「MeMe」Mikoto _ MILGRAM [THAISUB] ซับไทย(MP3_160K).mp3"
},
{
    name : "Speed of Light",
    Artist: "DJ Okawari",
    image : "/images/Screenshot 2022-05-24 204915.png",
    music : "/music/「Speed of Light」DJ OKAWARI feat. 二宮愛(MP3_160K).mp3"
},
{
    name : "That That (prod. & feat. SUGA of BTS)",
    Artist: "PSY & feat. SUGA of BTS",
    image : "/images/Screenshot 2022-05-22 224828.png",
    music : "/music/That_That_prod_ft_SUGA_of_BTS_(getmp3.pro).mp3"
},
{
    name : "King  / Gawr Gura x Calliope Mori (Cover)",
    Artist: "Gawr Gura x Calliope Mori",
    image : "/images/Screenshot 2022-05-23 000530.png",
    music : "/music/KING_Gawr_Gura_x_Calliope_Mori_C_(getmp3.pro).mp3"
},
{
    name : "My Nonfiction",
    Artist: "Miyuki Shirogane · Chika Fujiwara",
    image : "/images/Screenshot 2022-05-22 234745.png",
    music : "/music/My_Nonfiction_(getmp3.pro).mp3"
},
{
    name : "Fate of Life (命の行方)",
    Artist: "DUSTCELL",
    image : "/images/Screenshot 2022-05-22 230810.png",
    music : "/music/DUSTCELL - 命の行方(MP3_320K).mp3"
},
{
    name : "'ZOOM'",
    Artist: "Jessi",
    image : "/images/Screenshot 2022-05-23 004045.png",
    music : "/music/Jessi_-_ZOOM_MV_(getmp3.pro).mp3"
},
{
    name : "CHU-OH-KU – Femme Fatale",
    Artist: "Party of Words",
    image : "/images/Screenshot 2022-05-23 001338.png",
    music : "/music/ヒプノシスマイク 「Femme Fatale」Music Video(MP3_160K).mp3"
},
{
    name : "CIKI CIKI BAM BAM",
    Artist: "QUEENDOM",
    image : "/images/Screenshot 2022-05-22 231426.png",
    music : "/music/Ya_Boy_Kongming_Opening_FullChitty_(getmp3.pro).mp3"
},
]

const dataArt = [
{
    artistname : "ClariS",
    artistImage : "/images/ClariS_SMER.jpg"
},
{
    artistname : "Eve",
    artistImage : "/images/Eve.png"
},{
    artistname : "Aimer",
    artistImage : "/images/channels4_profile.jpg"
},{
    artistname : "Reona",
    artistImage : "/images/Screenshot 2022-05-24 223315.png"
},{
    artistname : "Minami ",
    artistImage : "/images/minami.jpg"
}  
]
// เกี่ยวกับลบข้อมูลทั้งหมดและเพิ่มตัว start
function seedDB(){
    Print.remove({}, function(err){
        if(err){
            console.log(err);
        }else {
            console.log('Data removal complete');
         }
     });
     Artistss.remove({}, function(err){
        if(err){
            console.log(err);
        }else {
            console.log('Data removal complete');
         }
     });
     dataSong.forEach(function(songReUse){
         Print.create(songReUse, function(err, res){
             if(err){
                 console.log(err)
             } 
         })
     })
     dataArt.forEach(function(songReUse){
        Artistss.create(songReUse, function(err, res){
            if(err){
                console.log(err)
            } 
        })
    })
}


module.exports = seedDB;
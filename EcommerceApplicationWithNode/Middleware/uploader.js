const multer=require('multer');
const path =require('path');

module.exports=function(filterType){
var myStorage = multer.diskStorage({
    destination: function (req, file, cb) {

      cb(null, path.join(process.cwd(),'Uploads/image'))
    },
    filename: function (req, file, cb) {
      cb(null,  Date.now()+ '-' +file.originalname)
    }
  })
  function imagefilter(req,file,cb){
      //mimeType=['image','png']
      const  MimeType=file.mimetype.split('/')
      console.log('the types of files is =>',MimeType[0]);
      if(MimeType[0]==='image'){
          cb(null,true) //TRUE XA VANE PROCEED WITH UPLOAD 

      }
      else{
          req.fileTypeError=true;
          cb(null,false) //FASLE HUDA SKIP UPLOAD
      }
  }
   
  var upload = multer({
      storage: myStorage,
      fileFilter:imagefilter
      
    })
    return upload;
}
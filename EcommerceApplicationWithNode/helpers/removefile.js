const fs=require('fs');
const path=require('path')
 
module.exports=  function removeFile(fileName){
    fs.unlink(path.join(process.cwd(),'Uploads/image/'+fileName),function(err,remove){
        if(!err){
            console.log('file removed');
        }
    })
}
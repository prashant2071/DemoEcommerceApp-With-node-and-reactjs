import {notify} from './notify'


export const handleError = (err) =>{
  let errMsg = "Something went wrong";
  debugger;
  var httpErr=err.response;
  var serverErr=httpErr && httpErr.data;
  // errMsg=serverErr &&serverErr.msg
  if(serverErr){
    if(typeof (serverErr.msg) ==='string'){
      errMsg=serverErr.msg
    }
    else{
      errMsg=serverErr.msg.name
      // errMsg = serverErr.msg.message;

    }
  }

  notify.showError(errMsg);
}
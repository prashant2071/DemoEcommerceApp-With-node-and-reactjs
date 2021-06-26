import {notify} from './notify'


export const handleError = (error) => {
  let errMsg = 'Somehting Went Wrong';
  debugger;
  var httpErr = error.response;
  var serverErr = httpErr && httpErr.data;
  if (serverErr) {
      if (typeof (serverErr.msg) === 'string') {
          errMsg = serverErr.msg;
      }
      else {
          errMsg = serverErr.msg.message;
      }
  }

  notify.showError(errMsg)
}
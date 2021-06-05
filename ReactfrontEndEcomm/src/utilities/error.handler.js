import {toast} from 'react-toastify'
import { notify } from './notify'

export const handleError = (err) =>{
    let errMsg ="something went wrong"
    // debugger;
    var httpErr=err.response
    var serverErr=httpErr && httpErr.data
    if(serverErr){
        if(typeof(serverErr.msg)==='string'){
         errMsg = serverErr.msg;
        }
        else{
            errMsg=serverErr.msg.message
        }
    }

    notify.showWarning(errMsg)


}
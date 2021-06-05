import {toast} from 'react-toastify'
import cogoToast from "cogo-toast";

const showSuccess = (msg) =>{
toast.success(msg) 
}
const showError = (msg) =>{
toast.error(msg)
}
const showWarning = (msg) =>{
cogoToast.warn(msg);

}
const showInfo = (msg) =>{
toast.info(msg)
}
export const notify={
    showError,
    showInfo,
    showSuccess,
    showWarning

}

//this place is usually for sepreation of concern to handle complex program efficiently

export const redirecttoDashBoard = (history) =>{
    const CurrentUser = JSON.parse(localStorage.getItem('user'))
    if(CurrentUser.role===1){
        history.push("/dashboard");
    }
    if(CurrentUser.role===2){
        history.push('/home')
    }

// check user role redirect to admin dashboard
}
export const redirecttoHome = (user) =>{
// redirect to login
}
 export const redirecttoLogin = (user) =>{
// redorect to home
 }
 export const getAuthorizationToken = () =>{
// return
 }

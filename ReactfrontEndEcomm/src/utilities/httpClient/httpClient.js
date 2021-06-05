import axios from 'axios'
const base_url=process.env.REACT_APP_BASE_URL

const http=axios.create({
baseURL:base_url,
timeoutErrorMessage:"server respond failed",
timeout:10000,
responseType:"json",
headers:{
    "Content-Type":"application/json"
}
})

const GET = (url,params ={}) =>{
    return http.get(url,{
        params
    })
    

}
const POST = (url,data,params) =>{
    return http.post(url,data,{
        params
    })

}
const PUT = (url, params) => {
  return http.delete(url,{
    params,
  });
};const DELETE = (url, data, params) => {
  return http.delete(url, {
    params,
  });
};

export const httpClient ={
    GET,
    POST,
    PUT,
    DELETE
}

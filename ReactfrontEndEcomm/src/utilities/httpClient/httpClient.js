import axios from "axios";
const base_url = process.env.REACT_APP_BASE_URL;
const http= axios.create({
    baseURL:base_url,
    responseType:"json",
    timeout:20000,
    timeoutErrorMessage:"server took too much time to respond",
    headers:{
        'Content-Type':'application/json'
    }

})
const GET =((url,params={})=>{
return http.get(url,{
    params
})
})
const POST =((url,data,params={})=>{
return http.post(url,data,{
    params
})
})
const PUT =((url,data,params={})=>{
return http.put(url,data,{
    params
})
})
const DELETE =((url,params={})=>{
return http.delete(url),{
    params
}
})

export const httpClient={
 GET,
 PUT,
 POST,
 DELETE
}


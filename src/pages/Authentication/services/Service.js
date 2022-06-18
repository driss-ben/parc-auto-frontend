import axios from "axios"
import { DOMAIN } from "./../../../constants/Domain";

const URL = DOMAIN  

export const isLogin = (data) =>{
    
    
    const result = axios.post(URL + '/login',data,{
         headers : {'Access-Control-Allow-Origin' : '*'}
        })
        .then((res) => {
            if (res.headers.authentication) {

                localStorage.setItem('authorization',res.headers.authentication)
                
                return localStorage.getItem('authorization')
                

            }else {
                return false
            }

            
        })
        .catch(err => err)
    ;

    return result;
     
}

export const getUser = async(email)=>{
    const config = {
        headers : {
            'authentication' : localStorage.getItem('authorization')
        }
    }
    
    const result = await axios.get(URL+'/api/user/'+email,config)
    .then(res => {
        return res.data
    })
    

    return result;

}
import axios from "axios";
import { DOMAIN } from "./../../../constants/Domain";


const URL = DOMAIN + "/api/types-huile/"
const config = {
    headers : {
        'authentication' : localStorage.getItem('authorization')
    }
}

export const  getAll=async()=>{
    const huileTypes = await axios.get(URL,config) 
            .then(res => (res.data))

    return huileTypes
}

export const  ajouter_type= async(type)=>{
    const huileTypes = await axios.post(URL+"insert",type,config) 
            .then(res => (res.data))

    return huileTypes
}


import axios from 'axios';
import { DOMAIN } from "./../../../constants/Domain";

const URL = DOMAIN  + '/api/sinistres/'
const URL2 = DOMAIN  + '/api'
const config = {
    headers : {
        'authentication' : localStorage.getItem('authorization')
    }
}

export const Ajoutersinistre = async (sinistre) =>{
    
    const result = await axios.post(URL + "insert",sinistre,config)
    .then(result => {return result.data})
    .catch(err => err)
    return result
}

export const updatesinistre = async (sinistre) =>{
    

    const result = await axios.put(URL + "update",sinistre,config)
    .then(res => (res.data) )
    .catch(err => (err) )
    
    return result
    
    
}

export const getAll = async () =>{
    const result =  await axios.get(URL,config)
                        .then(res => { return res.data})

    return result;
}

export const deletesinistre = async (sinistre) => {
    const result =  axios.delete(URL + `delete/${sinistre}`,config)
    .then(res => {return res.data})

    return result
}

export const getById = async (id) =>{
    const result = await  axios.get(URL + `${id}`,config)
    .then(res => {return res.data})

    return result;
}

export const getAllVehicules = async () =>{
    const result =  await axios.get(URL2  + "/vehicules",config)
                        .then(res => { return res.data})

    return result;
}


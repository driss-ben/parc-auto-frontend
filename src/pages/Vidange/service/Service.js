import axios from 'axios';
import { DOMAIN } from "./../../../constants/Domain";

const URL = DOMAIN  + '/api/vidanges/'
const URL2 = DOMAIN  + '/api'
const config = {
    headers : {
        'authentication' : localStorage.getItem('authorization')
    }
}

export const Ajoutervidange = async(vidange) =>{
    const result = await axios.post(URL + "insert",vidange,config)
    .then(result => {return result.data})
    return result
}

export const updatevidange = async(vidange) =>{

    const result = await axios.put(URL + "update",vidange,config)
    .then(res => (res.data) )
    .catch(err => (err) )
    
    return result
    
    
}

export const getAll = async() =>{
    const result =  await axios.get(URL ,config)
                        .then(res => { return res.data})

    return result;
}

export const deletevidange = async(vidange)  =>{
    const result =  axios.delete(URL + `delete/${vidange}`,config)
    .then(res => {return res.data})

    return result
}

export const getById = async(id) =>{
    const result = await  axios.get(URL + `${id}`,config)
    .then(res => {return res.data})

    return result;
}

export const getAllVehicules = async() =>{
    const result =  await axios.get(URL2  + "/vehicules",config)
                        .then(res =>  res.data)

    return result;
}
export const getAllhuiles = async() =>{
    const result =  await axios.get(URL2  + "/huiles",config)
                        .then(res =>  res.data)

    return result;
}

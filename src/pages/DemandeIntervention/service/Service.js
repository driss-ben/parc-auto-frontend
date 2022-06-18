import axios from 'axios';
import { DOMAIN } from "./../../../constants/Domain";

const URL = DOMAIN  + '/api/demandes-intervention/'
const URL2 = DOMAIN  + '/api'
const config = {
    headers : {
        'authentication' : localStorage.getItem('authorization')
    }
}

export const  Ajouterdemande = async(demande)=>{
    
    const result = await axios.post(URL + "insert",demande,config)
    .then(result => {return result.data})
    return result
}

export const  updatedemande = async(demande)=>{
    
    const result = await axios.put(URL + "update",demande,config)
    .then(res => (res.data) )
    .catch(err => (err) )
    
    return result
    
    
}

export const  getAll = async()=>{
    const result =  await axios.get(URL ,config)
                        .then(res => { return res.data})

    return result;
}

export const  deletedemande = async(id) =>{
    const result =  axios.delete(URL + `delete/${id}`,config)
    .then(res => {return res.data})

    return result
}

export const  getById = async(id)=>{
    const result = await  axios.get(URL + `${id}`,config)
    .then(res => {return res.data})

    return result;
}
export const  getAllVehicules = async()=>{
    const result =  await axios.get(URL2  + "/vehicules",config)
                        .then(res =>  res.data)

    return result;
}

export const  setTraite = async(demande)=>{
    const result =  await axios.put(URL + "done",demande,config)
                        .then(res =>  res.data)

    return result;
}

export const  getEntretien = async(id)=>{
    const result = await  axios.get(URL2  + `/entretiens/demande-intervention/${id}`,config)
    .then(res => {return res.data})

    return result;
}

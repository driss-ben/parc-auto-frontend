import axios from 'axios';
import { DOMAIN } from "./../../../constants/Domain";

const URL = DOMAIN  + '/api/entretiens/'
const URL2 = DOMAIN  + '/api'
const config = {
    headers : {
        'authentication' : localStorage.getItem('authorization')
    }
}

export const Ajouterentretien = async (entretien)=>{
    
    const result = await axios.post(URL + "insert",entretien,config)
    .then(result => {return result.data})
    return result
}

export const updateentretien = async (entretien)=>{
    
    const result = await axios.put(URL + "update",entretien,config)
    .then(res => (res.data) )
    .catch(err => (err) )
    
    return result
    
    
}

export const getAll = async ()=>{
    const result =  await axios.get(URL,config)
                        .then(res => { return res.data})

    return result;
}

export const deleteentretien = async (id) =>{
    const result =  axios.delete(URL + `delete/${id}`,config)
    .then(res => {return res.data})

    return result
}

export const getById = async (id)=>{
    const result = await  axios.get(URL + `id/${id}`,config)
    .then(res => {return res.data})

    return result;
}

export const getAllDemandesIntervention = async ()=>{
    const result =  await axios.get(URL2  + "/demandes-intervention/etat/false",config)
                        .then(res => { return res.data})

    return result;
}

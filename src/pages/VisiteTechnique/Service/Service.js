import axios from 'axios';
import { DOMAIN } from "./../../../constants/Domain";


const URL = DOMAIN  + "/api/visite-technique/"
const URL2 = DOMAIN  + '/api'

const config = {
    headers : {
        'authentication' : localStorage.getItem('authorization')
    }
}

export const Ajoutervisite = async (visite) =>{
    
    const result = await axios.post(URL+"insert",visite,config)
    .then(result => {return result.data})
    return result
}

export const updatevisite = async (visite) =>{
    
    const result = await axios.put(URL+"update",visite,config)
    .then(res => (res.data) )
    .catch(err => (err) )
    return result
            
}

export const getAll = async () =>{
    const result =  await axios.get(URL,config)
                    .then(res => { return res.data})
    return result;
}

export const deletevisite = async (visite) => {
    const result =  axios.delete(URL+`delete/${visite}`,config)
    .then(res => {return res.data})

    return result
}

export const getById = async (id) =>{
    const result = await  axios.get(URL + `id/${id}`,config)
    .then(res => {return res.data})

    return result;
}

export const getAllVehicules = async () =>{
    const result =  await axios.get(URL2  +"/vehicules",config)
                        .then(res =>  res.data)

    return result;
}


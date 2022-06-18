import axios from 'axios';
import { DOMAIN } from "./../../../constants/Domain";

const URL = DOMAIN  + '/api/cartes-grise/'
const URL2 = DOMAIN  + '/api'
const config = {
    headers : {
        'authentication' : localStorage.getItem('authorization')
    }
}

export const Ajoutercarte_grise = async(carte_grise) => {
    
    const result = await axios.post(URL + "insert",carte_grise,config)
    .then(result => {return result.data})
    return result
}

export const updatecarte_grise = async(carte_grise) => {
    
    const result = await axios.put(URL + "update",carte_grise,config)
    .then(res => (res.data) )
    .catch(err => (err) )
    return result
    
    
}

export const getAll = async() => {
    const result =  await axios.get(URL,config)
                        .then(res => { return res.data})

    return result;
}

export const getAllVehicules = async() => {
    const result =  await axios.get(URL2  + "/vehicules/without-carte-grise",config)
                        .then(res =>  res.data)

    return result;
}

export const deletecarte_grise = async(id)  => {
    const result =  axios.delete(URL + `delete/${id}`,config)
    .then(res => {return res.data})

    return result
}

export const getById = async(id) => {
    const result = await  axios.get(URL + `id/${id}`,config)
    .then(res => {return res.data})

    return result;
}


import axios from 'axios';
import { DOMAIN } from "./../../../constants/Domain";


const URL = DOMAIN  + "/api/vignettes-fiscale/"
const URL2 = DOMAIN  + '/api'
const config = {
    headers : {
        'authentication' : localStorage.getItem('authorization')
    }
}

export const Ajoutervignette = async (vignette) =>{
    
    const result = await axios.post(URL+"insert",vignette,config)
    .then(result => {return result.data})
    return result
}

export const updatevignette = async (vignette) =>{
    
    const result = await axios.put(URL+"update",vignette,config)
    .then(res => (res.data) )
    .catch(err => (err) )
    return result
            
}

export const getAll = async () =>{
    const result =  await axios.get(URL,config)
                    .then(res => { return res.data})
    return result;
}

export const deletevignette = async (vignette) => {
    const result =  axios.delete(URL+`delete/${vignette}`,config)
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


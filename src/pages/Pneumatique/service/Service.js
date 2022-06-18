import axios from 'axios';
import { DOMAIN } from "./../../../constants/Domain";

const URL = DOMAIN  + '/api/pneumatiques/'
const URL2 = DOMAIN  + '/api'
const config = {
    headers : {
        'authentication' : localStorage.getItem('authorization')
    }
}

export const Ajouterpneumatique = async(pneumatique) =>{
    
    const result = await axios.post(URL + "insert",pneumatique,config)
    .then(result => {return result.data})
    return result
}

export const updatepneumatique = async(pneumatique) =>{
    
    const result = await axios.put(URL + "update",pneumatique,config)
    .then(res => (res.data) )
    .catch(err => (err) )
    
    return result
    
    
}

export const getAll = async() =>{
    const result =  await axios.get(URL,config)
                        .then(res => { return res.data})

    return result;
}

export const deletepneumatique = async(pneumatique)  =>{
    const result =  axios.delete(URL + `delete/${pneumatique}`,config)
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
export const getAllpneus = async(id) =>{
    const result =  await axios.get(URL2  + "/pneus/vehicule/"+id,config)
                        .then(res =>  res.data)
    return result;
}


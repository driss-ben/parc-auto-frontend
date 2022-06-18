import axios from 'axios';
import { DOMAIN } from "./../../../constants/Domain";
const URL = DOMAIN +'/api/assurances/'
const URL2 = DOMAIN + '/api'
const config = {
    headers : {
        'authentication' : localStorage.getItem('authorization')
    }
}

export const Ajouterassurance = async(assurance) =>{
    const result = await axios.post(URL+"insert",assurance,config)
    .then(result => {return result.data})
    return result
}

export const updateassurance = async(assurance) =>{
    const result = await axios.put(URL+"update",assurance,config)
    .then(res => (res.data) )
    .catch(err => (err) )
    return result
    
}

export const getAll = async ()=>{
    const result =  await axios.get(URL,config)
                        .then(res => { return res.data})

    return result;
}

export const deleteassurance = async (id)=> {
    const result =  axios.delete(URL+`delete/${id}`,config)
    .then(res => {return res.data})
    return result
}

export const  getById = async (id) =>{
    const result = await  axios.get(URL+`id/${id}`,config)
    .then(res => {return res.data})
    return result;
}

export const getAllVehicules = async () =>{
    const result =  await axios.get(URL2+"/vehicules",config)
                        .then(res =>  res.data)

    return result;
}

export const getVehiculeById =  async (id) =>{
    const result =  await axios.get(URL2 +`/vehicules/id/${id}`,config)
                        .then(res =>  res.data)

    return result;
}
export const getAllAssureurs = async () => {
    const result =  await axios.get(URL2 +"/assureurs",config)
                        .then(res =>  res.data)
    return result;
}


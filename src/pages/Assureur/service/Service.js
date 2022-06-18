import axios from 'axios';
import { DOMAIN } from "./../../../constants/Domain";

const URL = DOMAIN  + '/api/assureurs/'
const config = {
    headers : {
        'authentication' : localStorage.getItem('authorization')
    }
}

export const  Ajouterassureur = async (assureur) =>{
    
    assureur.nom=assureur.nom.toLowerCase();
    const result = await axios.post(URL + "insert",assureur,config)
    .then(result => {return result.data})
    return result
}

export const  updateassureur = async (assureur)=>{
    
    assureur.nom=assureur.nom.toLowerCase();
    const result = await axios.put(URL + "update",assureur,config)
    .then(res => (res.data) )
    .catch(err => (err) )
    return result
    
    
}

export const  getAll = async ()=>{
    const result =  await axios.get(URL,config)
                        .then(res => { return res.data})

    return result;
}

export const  deleteassureur = async (id)=> {
    const result =  axios.delete(URL + `delete/${id}`,config)
    .then(res => {return res.data})

    return result
}

export const  getById = async (id)=>{
    const result = await  axios.get(URL + `id/${id}`,config)
    .then(res => {return res.data})

    return result;
}


import axios from 'axios';
import { DOMAIN } from "./../../../constants/Domain";

const URL = DOMAIN  + '/api/fournisseurs/'
const URL2 = DOMAIN  + '/api'
const config = {
    headers : {
        'authentication' : localStorage.getItem('authorization')
    }
}

export const  Ajouterfournisseur= async(fournisseur)=>{
    
    fournisseur.nom=fournisseur.nom.toLowerCase();
    const result = await axios.post(URL + "insert",fournisseur,config)
    .then(result => {return result.data})
    return result
}

export const  updatefournisseur= async(fournisseur)=>{
    
    fournisseur.nom=fournisseur.nom.toLowerCase();
    const result = await axios.put(URL + "update",fournisseur,config)
    .then(res => (res.data) )
    .catch(err => (err) )
    
    return result
    
    
}

export const  getAll= async()=>{
    const result =  await axios.get(URL,config)
                        .then(res => { return res.data})

    return result;
}

export const  deletefournisseur= async(id) =>{
    const result =  axios.delete(URL + `delete/${id}`,config)
    .then(res => {return res.data})

    return result
}

export const  getById= async(id)=>{
    const result = await  axios.get(URL + `id/${id}`,config)
    .then(res => {return res.data})

    return result;
}


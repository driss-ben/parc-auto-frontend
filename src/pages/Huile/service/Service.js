import axios from 'axios';
import { DOMAIN } from "./../../../constants/Domain";

const URL = DOMAIN  + '/api/huiles/'
const URL2 = DOMAIN  + '/api'
const config = {
    headers : {
        'authentication' : localStorage.getItem('authorization')
    }
}

export const  Ajouterhuile =async (huile) => {
    

    huile.nom=huile.nom.toLowerCase();
    const result = await axios.post(URL + "insert",huile,config)
    .then(result => {return result.data})
    return result
}

export const  updatehuile =async (huile) => {

    huile.nom = huile.nom.toLowerCase();
    const result = await axios.put(URL + "update",huile,config)
    .then(res => (res.data) )
    .catch(err => (err) )
    return result
    
    
}

export const  getAll =async () => {
    const result =  await axios.get(URL,config)
                        .then(res => { return res.data})

    return result;
}

export const  getAllFromStock = async() => {
    const result =  await axios.get(URL + "stock",config)
                        .then(res => { return res.data})

    return result;
}

export const  deleteHuile =async (huile)  => {
    const result =  axios.delete(URL + `delete/${huile}`,config)
    .then(res => {return res.data})

    return result
}

export const  getById =async (id) => {
    const result = await  axios.get(URL + `id/${id}`,config)
    .then(res => {return res.data})

    return result;
}


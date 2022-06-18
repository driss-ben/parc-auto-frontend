import axios from 'axios';
import { DOMAIN } from "./../../../constants/Domain";

const URL = DOMAIN  + '/api/pneus/'
const config = {
    headers : {
        'authentication' : localStorage.getItem('authorization')
    }
}


export const Ajouterpneu = async (pneu) =>{
    
    pneu.nom=pneu.nom.toLowerCase();
    const result = await axios.post(URL + "insert",pneu,config)
    .then(result => {return result.data})
    .catch(err => err)
    return result
}

export const updatepneu = async (pneu) =>{
    

    pneu.nom=pneu.nom.toLowerCase();
    const result = await axios.put(URL + "update",pneu,config)
    .then(res => (res.data) )
    .catch(err => (err) )
    return result
    
    
}

export const getAll = async () =>{
    const result =  await axios.get(URL ,config)
                        .then(res => { return res.data})

    return result;
}

export const getAllFromStock = async () =>{
    const result =  await axios.get(URL + "stock",config)
                        .then(res => { return res.data})

    return result;
}

export const deletepneu = async (pneu)  =>{
    const result =  axios.delete(URL + `delete/${pneu}`,config)
    .then(res => {return res.data})

    return result
}

export const getById = async (id) =>{
    const result = await  axios.get(URL + `id/${id}`,config)
    .then(res => {return res.data})

    return result;
}

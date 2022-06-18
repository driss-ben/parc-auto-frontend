import axios from 'axios';
import { DOMAIN } from "./../../../constants/Domain";

const URL = DOMAIN  + '/api/demandes-pieces/'
const URL2 = DOMAIN  + '/api'
const config = {
    headers : {
        'authentication' : localStorage.getItem('authorization')
    }
}

export const  AjouterDemande = async(demande) =>{
    
    const result = await axios.post(URL + "insert",demande,config)
    .then(result => {return result.data})
    return result
}

export const  updateDemande = async(demande) =>{
    
    const result = await axios.put(URL + "update",demande,config)
    .then(res => (res.data) )
    .catch(err => (err) )
    return result
    
    
}

export const  getAll = async() =>{
    const result =  await axios.get(URL ,config)
                        .then(res => { return res.data})

    return result;
}


export const  deleteDemande = async(id)  =>{
    const result =  axios.delete(URL + `delete/${id}`,config)
    .then(res => {return res.data})

    return result
}

export const  deletePieceDemandee = async(id)  =>{
    const result =  axios.delete(URL2  + `/pieces-demandee/delete/${id}`,config)
    .then(res => {return res.data})

    return result
}

export const  getById = async(id) =>{
    const result = await  axios.get(URL + `id/${id}`,config)
    .then(res => {return res.data})

    return result;
}
export const  getPieceDemandeById = async(id) =>{
    const result = await  axios.get(URL2  + `/pieces-demandee/${id}`,config)
    .then(res => {return res.data})

    return result;
}
export const  updatePieceDemande = async(PieceDemandee) =>{
    const result = await  axios.put(URL2  + `/pieces-demandee/update`,PieceDemandee,config)
    .then(res => {return res.data})

    return result;
}
export const  getAllpieces = async() =>{
    const result =  await axios.get(URL2  + "/pieces",config)
                        .then(res => { return res.data})

    return result;
}

export const  getAllMaintenancesInternes = async() =>{
    const result =  await axios.get(URL2  + "/maintenances-interne/not-done",config)
                        .then(res => { return res.data})

    return result;
}

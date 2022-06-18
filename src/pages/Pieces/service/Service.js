import axios from 'axios';
import { DOMAIN } from "./../../../constants/Domain";


const URL = DOMAIN + '/api/pieces/'
const config = {
    headers : {
        'authentication' : localStorage.getItem('authorization')
    }
}

export const AjouterPiece = async(piece) =>{
    
    piece.nom=piece.nom.toLowerCase();
    const result = await axios.post(URL + "insert",piece,config)
    .then(result => {return result.data})
    return result
}

export const updatePiece = async(piece) =>{
    
    piece.nom=piece.nom.toLowerCase();
    const result = await axios.put(URL + "update",piece,config)
    .then(res => (res.data) )
    .catch(err => (err) )
    return result
    
    
}

export const getAll = async() =>{
    const result =  await axios.get(URL,config)
                        .then(res => { return res.data})

    return result;
}

export const getAllFromStock = async() =>{
    const result =  await axios.get(URL + "stock",config)
                        .then(res => { return res.data})

    return result;
}

export const deletePiece = async(id)  =>{
    const result =  axios.delete(URL + `delete/${id}`,config)
    .then(res => {return res.data})

    return result
}

export const getById = async(id) =>{
    const result = await  axios.get(URL + `id/${id}`,config)
    .then(res => {return res.data})

    return result;
}


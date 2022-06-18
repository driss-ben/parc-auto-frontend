import axios from 'axios';
import { DOMAIN } from "./../../../constants/Domain";

const URL = DOMAIN  + '/api/pieces-achete/'
const config = {
    headers : {
        'authentication' : localStorage.getItem('authorization')
    }
}

export const Ajouterpiece_achete= async(piece_achete) => {
    
    const result = await axios.post(URL + "insert",piece_achete,config)
    .then(result => {return result.data})
    return result
}

export const updatepiece_achete= async(piece_achete) => {
    
    const result = await axios.put(URL + "update",piece_achete,config)
    .then(res => (res.data) )
    .catch(err => (err) )
    return result
    
    
}

export const getAll= async() => {
    const result =  await axios.get(URL,config)
                        .then(res => { return res.data})

    return result;
}

export const deletepiece_achete= async(piece_achete)  => {
    const result =  axios.delete(URL + `delete/${piece_achete}`,config)
    .then(res => {return res.data})

    return result
}

export const getById= async(id) => {
    const result = await  axios.get(URL + `id/${id}`,config)
    .then(res => {return res.data})

    return result;
}

export const getAllfournisseurs= async () => {
    const result = await  axios.get(DOMAIN  + `/fournisseurs`,config)
    .then(res => {return res.data})

    return result;
}
export const getAllpieces= async () => {
    const result = await  axios.get(DOMAIN  + `/pieces/all`,config)
    .then(res => {return res.data})

    return result;
}


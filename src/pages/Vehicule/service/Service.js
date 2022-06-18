import axios from 'axios';
import { DOMAIN } from "./../../../constants/Domain";

const URL = DOMAIN  + '/api/vehicules/'
const URL2 = DOMAIN  + '/api'
const config = {
    headers : {
        'authentication' : localStorage.getItem('authorization')
    }
}

export const Ajoutervehicule = async (vehicule) =>{
    
    const result = await axios.post(URL + "insert",vehicule,config)
    .then(result => {return result.data})
    .catch(err => err)
    return result
}

export const updatevehicule = async (vehicule) =>{
    const result = await axios.put(URL +"update",vehicule,config)
    .then(res => (res.data) )
    .catch(err => (err) )
    return result
    
    
}
export const deletevehicule = async (id) =>{
    const result = await axios.delete(URL +"delete/"+id,config)
    .then(res => (res.data) )
    .catch(err => (err) )
    return result
    
    
}
export const getAll = async () =>{
    const result =  await axios.get(URL,config)
                        .then(res => { return res.data})

    return result;
}


export const getById = async (id) =>{
    const result = await  axios.get(URL +`id/${id}`,config)
    .then(res => {return res.data})

    return result;
}

export const getLastContrat = async (id) =>{
    const result =  await axios.get(URL2  + `/contrats/vehicule/last/${id}`,config)
                        .then(res => { return res.data})

    return result;
}

export const getLastAssurance = async (id) =>{
    const result =  await axios.get(URL2  + `/assurances/vehicule/${id}`,config)
                        .then(res => { return res.data})

    return result;
}

export const getCartegrise = async (id) =>{
    const result =  await axios.get(URL2  + `/cartes-grise/vehicule/last/${id}`,config)
                        .then(res => { return res.data})

    return result;
}

export const getStatistiques = async (id) =>{
    const result =  await axios.get(URL  + `statistiques/`+id,config)
                        .then(res => { return res.data})

    return result;
}

export const getAllAssurancesByVehicule = async (id) =>{
    const result =  await axios.get(URL2  + `/assurances/${id}`,config)
                        .then(res => { return res.data})

    return result;
}

export const getAllVignettesByVehicule = async (id) =>{
    const result =  await axios.get(URL2  + `/vignettes-fiscale/vehicule/${id}`,config)
                        .then(res => { return res.data})

    return result;
}
export const getAllMInternesByVehicule = async (id) =>{
    const result =  await axios.get(URL2  + `/maintenances-interne/vehicule/${id}`,config)
                        .then(res => { return res.data})


    return result;
}
export const getAllMExternesByVehicule = async (id) =>{
    const result =  await axios.get(URL2  + `/maintenances-externe/vehicule/${id}`,config)
                        .then(res => { return res.data})

    return result;
}

export const getConsommationTotal = async (id) =>{
    const result =  await axios.get(URL  + `consommation/${id}`,config)
                        .then(res => { return res.data})

    return result;
}


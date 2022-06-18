import axios from 'axios';
import { DOMAIN } from "./../../../constants/Domain";

const URL = DOMAIN  + '/api/maintenances-interne/'
const URL2 = DOMAIN  + '/api'
const config = {
    headers : {
        'authentication' : localStorage.getItem('authorization')
    }
}

 export const  Ajoutermaintenance = async(maintenance) => {
       
        const result = await axios.post(URL + "insert",maintenance,config)
        .then(result => {return result.data})
        return result
    }

 export const  updatemaintenance = async(maintenance) => {
        const result = await axios.put(URL + "update",maintenance,config)
        .then(res => (res.data) )
        .catch(err => (err) )
        return result
        
        
    }

 export const  getAll =async () => {
        const result =  await axios.get(URL ,config)
                            .then(res => { return res.data})

        return result;
    }

 export const  setAsDone = async(id) => {
        const result =  await axios.put(URL + `done/${id}`,null, config)
                            .then(res => { return res.data})

        return result;
    }

 export const  deletemaintenance =async (id) =>  {
        const result =  axios.delete(URL + `delete/${id}`,config)
        .then(res => {return res.data})

        return result
    }

 export const getById =async (id) => {
        const result =   axios.get(URL + `id/${id}`,config)
        .then(res => {return res.data})

        return result;
    }

 export const  getAllEntretiens =async (type) => {
        const result = await  axios.get(URL2  + `/entretiens/type-and-etat/${type}`,config)
        .then(res => {return res.data})
        return result;
    }

 export const  getAllVehicules  = async() => {
        const result = await  axios.get(URL2  + `/vehicules`,config)
        .then(res => {return res.data})

        return result;
    }

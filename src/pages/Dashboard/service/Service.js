import axios from "axios";
import { DOMAIN } from "./../../../constants/Domain";

const URL = DOMAIN + '/api'
const config = {
    headers : {
        'authentication' : localStorage.getItem('authorization')
    }
}


export const getAllVehiciles = async() => {
    const result =  await axios.get(URL + "/vehicules",config)
                        .then(res => { return res.data})
    return result;
}

export const  getAllHuiles = async () => {
    const result =  await axios.get(URL + "/huiles",config)
    .then(res => { return res.data})

    return result;
}

export const getAllPneux = async() => {
    const result =  await axios.get(URL + "/pneus",config)
                        .then(res => { return res.data})

    return result;
}

export const  getAllPieces = async() => {
    const result =  await axios.get(URL + "/pieces",config)
                        .then(res => { return res.data})

    return result;
}

export const  getAllassurances = async() => {
    const result =  await axios.get(URL + "/assurances",config)
                        .then(res => { return res.data})

    return result;
}

export const  getAllAssureurs = async() => {
    const result =  await axios.get(URL + "/assureurs",config)
                        .then(res => { return res.data})

    return result;
}
export const  getAllEntretiens = async() => {
    const result =  await axios.get(URL + "/entretiens",config)
                        .then(res => { return res.data})

    return result;
}
export const  getAllFournisseus = async() => {
    const result =  await axios.get(URL + "/fournisseurs",config)
                        .then(res => { return res.data})

    return result;
}

export const  getAllAchats = async() => {
    const result =  await axios.get(URL + "/pieces-achete",config)
                        .then(res => { return res.data})

    return result;
}

export const getAllContrats =  async() => {
    const result =  await axios.get(URL + "/contrats",config)
                        .then(res => { return res.data})
    return result;
}

export const getAllVignettes =   async ()=>{
    const result =  await axios.get(URL + "/vignettes-fiscale/",config)
                    .then(res => { return res.data})
    return result;
}

export const  getAllPneumatiques =  async () =>{
    const result =  await axios.get(URL + "/pneumatiques",config)
                        .then(res => { return res.data})

    return result;
}

export const  getAllExternes = async () =>{
    const result =  await axios.get(URL + "/maintenances-externe",config)
                        .then(res => { return res.data})

    return result;
}

export const getAllInternes =  async () =>{
    const result =  await axios.get(URL + "/maintenances-interne",config)
                        .then(res => { return res.data})

    return result;
}
export const getAllVidanges =  async () =>{
    const result =  await axios.get(URL + "/vidanges",config)
                        .then(res => { return res.data})

    return result;
}
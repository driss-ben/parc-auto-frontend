import React,{useState,useEffect} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label,Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { Ajoutercontrat,getAllVehicules, getById } from './service/Service';
import Select from "react-select";
import {useLocation} from 'react-router-dom'


function UpdateContrat() {
    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)
    const id = useLocation().pathname.split('/')[useLocation().pathname.split('/').length-1]

    const [selectedType, setselectedType] = useState(null);
    function handleSelectType(selectedType) {
        setselectedType(selectedType);
        setcontrat({
            ...contrat,
            type : selectedType.value
        })
        
    }
    const optionType = [
    {
        label: "Types",
        options: [
        { label: "achat", value: "achat" },
        { label: "LLD", value: "lld" },
        { label: "Leasing", value: "leasing" },
        ],
    }
    ];

    const [selectedVehicule, setselectedVehicule] = useState(null);
    const [vehiculeoptions, setvehiculeoptions] = useState([])
    function handleSelectVehicule(selectedVehicule) {
        setselectedVehicule(selectedVehicule);
        setcontrat({
            ...contrat,
            vehicule : {
                id :  selectedVehicule !== null ? selectedVehicule.value : null
            }
        })
    }
    const optionVehicule = [ { label: "Vehicules",  options: vehiculeoptions }  ];

    const getAllvehicules = async () =>{  
        const vehicules = await getAllVehicules()
        let rows = []
        vehicules.map(vehicule => {
            const objet = {label : vehicule.immatriculation, value : vehicule.id}
            rows.push(objet)
        })
        setvehiculeoptions(rows)
     }

     const [contrat, setcontrat] = useState({
        vehicule : {
            id : null
        },
        numContrat : '',
        dateContrat:'',
        dateEcheance :'',
        type : '' ,
        montant : null
    })

    const handleChange = (e) =>{
        setcontrat({
            ...contrat,
            [e.target.name] : e.target.value
        })
    }


    const handleSubmit = async() =>{
        const result = await Ajoutercontrat(contrat)
        if(result == true){
            setmessage("modification du contrat dont id = "+ id + " est fait avec succes")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }


    const getbyId = async () =>{
        const mycontrat = await getById(id)
        setcontrat({
            contrat,
              ...mycontrat
        })
    }

    useEffect(() => {
        getAllvehicules()
        getbyId()
      return () => {
        
      }
    }, [])

    return (
        <React.Fragment>
        <div className="page-content">
            <Breadcrumbs title="Modifier" breadcrumbItem="Les Contrats" />
            { message != null ? <Alert color={classname} role="alert"> {message}</Alert> : null }
            <Row>
                <Col xl="12">
                    <Card >
                        <CardBody>
                        <h1 className="card-title">Modifier Contrat</h1>
                        <p className="card-title-desc">
                        </p>
                        
                        <AvForm className="needs-validation" onValidSubmit={handleSubmit}>
                            
                            <Row>
                                <Col md="4">
                                    <div className="mb-3">
                                        <Label htmlFor="numContrat">Numero Contrat</Label>
                                        <AvField
                                            name="numContrat"
                                            placeholder="Numero Contrat"
                                            type="text"
                                            value = {contrat.numContrat}
                                            onChange={handleChange}
                                            errorMessage=" Entrer numero  Contrat."
                                            className="form-control"
                                            validate={{ 
                                                required: { value: true } ,
                                                pattern : { value : /^\d+$/}
                                            }}
                                            id="numContrat"
                                        />
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="mb-3">
                                    <Label htmlFor="vehicule">Vehicule</Label>
                                    <Select
                                    value={ selectedVehicule!==null ? selectedVehicule : 
                                        {label : contrat.vehicule.immatriculation, value : contrat.vehicule.id}}
                                    onChange={
                                        handleSelectVehicule
                                    }
                                    options={optionVehicule}
                                    classNamePrefix="select2-selection"
                                />
                                    </div>
                                </Col>
                                
                                <Col md="4">
                                    <div className="mb-3">
                                        <Label htmlFor="type">type Contrat </Label>
                                        <Select
                                            value={{label : contrat.type, value : contrat.type}}
                                            onChange={
                                                handleSelectType
                                            }
                                            options={optionType}
                                            classNamePrefix="select2-selection"
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="4">
                                    <div className="mb-3">
                                    <Label htmlFor="dateContrat">Date debut</Label>
                                    <AvField
                                            name="dateContrat"
                                            placeholder="Date debut"
                                            type="date"
                                            value = {contrat.dateContrat}
                                            onChange={handleChange}
                                            errorMessage=" Entrer Date debut."
                                            className="form-control"
                                            validate={{ required: { value: true } }}
                                            id="dateContrat"
                                        />
                                    </div>
                                </Col>
                                
                                <Col md="4">
                                    <div className="mb-3">
                                    <Label htmlFor="dateEcheance">Date Echeance</Label>
                                    <AvField
                                            name="dateEcheance"
                                            placeholder="Date Echeance"
                                            type="date"
                                            value = {contrat.dateEcheance}
                                            onChange={handleChange}
                                            errorMessage=" Entrer Date Echeance."
                                            className="form-control"
                                            id="dateEcheance"
                                        />
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="mb-3">
                                    <Label htmlFor="montant">Montant</Label>
                                    <AvField
                                            name="montant"
                                            placeholder="Montant"
                                            type="text"
                                            value = {contrat.montant}
                                            onChange={handleChange}
                                            errorMessage=" Entrer montant."
                                            className="form-control"
                                            validate={{ 
                                                required: { value: true } ,
                                                pattern : { value : /^\d+$/,  errorMessage : 'format valide : 00'}
                                            }}
                                            id="montant"
                                        />
                                    </div>
                                </Col>
                                
                            </Row>
                            <Row >
                                <Col>
                                    <Button className='w-100' color="primary" type="submit" >
                                               ;odifier
                                    </Button>
                                </Col>
                                
                            </Row>
                            
                        </AvForm>
                       
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
        
        </React.Fragment>
      )
}

export default UpdateContrat

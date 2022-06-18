import React ,{useState, useEffect} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label,Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import Select from "react-select";
import  {getAllAssureurs, getAllVehicules, updateassurance,getById}  from "./service/Service";
import {useLocation  } from "react-router-dom";

function UpdateAssurance() {
    const id = useLocation().pathname.split('/')[useLocation().pathname.split('/').length-1]
    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)
    const [assurance, setassurance] = useState({
        vehicule : { id : null },
        assureur:{  id : null },
        cout : null ,
        dateFin : null,
        dateDebut : null ,
        territoire : null
    })
    const [selectedassureur, setselectedassureur] = useState(null);
    const [assureuroptions, setassureuroptions] = useState([])
    function handleSelectassureur(selectedassureur) {
        setselectedassureur(selectedassureur);
        setassurance({
            ...assurance,
            assureur : {id : selectedassureur.value}
        })
    }
    const optionassureur = [{ label: "assureurs", options: assureuroptions }];
    const getAllassureurs = async () =>{   
        const assureurs = await getAllAssureurs()
        let rows = []
        assureurs.map(assureur => {
            const objet = {label : assureur.nom, value : assureur.id}
            rows.push(objet)
        })
        setassureuroptions(rows)
     }
    const [selectedVehicule, setselectedVehicule] = useState(null);
    const [vehiculeoptions, setvehiculeoptions] = useState([])
    function handleSelectVehicule(selectedVehicule) {
        setselectedVehicule(selectedVehicule);
        setassurance({
            ...assurance,
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

    

    const handleChange = (e) =>{
        setassurance({
            ...assurance,
            [e.target.name] : e.target.value
        })
        
    }


    const handleSubmit = async() =>{
        const result = await updateassurance(assurance)
        if(result == true){
            setmessage("modification de l'assurance dont id = "+ id + " est fait avec succes")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }

    const getbyId = async () =>{
        const myassurance = await getById(id)
        setassurance({
            assurance,
              ...myassurance
        })
    }
    useEffect(() => {
        getAllvehicules()
        getAllassureurs()
        getbyId()
      return () => {
        
      }
    }, [])

    return (
        <React.Fragment>
        <div className="page-content">
            <Breadcrumbs title="Modification" breadcrumbItem="Les Assurances" />
            { message != null ? <Alert color={classname} role="alert"> {message}</Alert> : null }
            <Row>
                <Col xl="12">
                    <Card>
                        <CardBody>
                        
                        <AvForm className="needs-validation" onValidSubmit={handleSubmit}>
                            <Row>
                            <Col md="4">
                                <div className="mb-3">
                                <Label htmlFor="vehicule">Vehicule</Label>
                                <Select
                                    onChange={
                                        handleSelectVehicule
                                    }
                                    value={selectedVehicule!==null ? selectedVehicule : {label : assurance.vehicule.immatriculation , value : assurance.vehicule.id}}
                                    options={vehiculeoptions}
                                    classNamePrefix="select2-selection"
                                />
                                </div>
                            </Col>
                            <Col md="4">
                                <div className="mb-3">
                                <Label htmlFor="assureur">Assureur</Label>
                                <Select
                                    value={ selectedassureur!==null ? selectedassureur : 
                                        {label : assurance.assureur.nom , value : assurance.assureur.id}}

                                    onChange={
                                        handleSelectassureur
                                    }
                                    options={assureuroptions}
                                    classNamePrefix="select2-selection"
                                />
                                </div>
                            </Col>
                            <Col md="4">
                                    <div className="mb-3">
                                    <Label htmlFor="cout">Cout</Label>
                                    <AvField
                                        name="cout"
                                        placeholder="cout  "
                                        type="text"
                                        onChange={handleChange}
                                        value={assurance.cout}
                                        className="form-control"
                                        validate={{ 
                                            required: { 
                                                value: true,
                                                errorMessage : "Cout Obligatoire"
                                            } ,
                                            pattern : { 
                                                value : /^\d+(\.\d{1,2})?$/ ,
                                                errorMessage : 'les formes valides : 00 | 00.0 | 00.00'
                                            } 
                                        }}
                                        id="cout"
                                    />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="4">
                                    <div className="mb-3">
                                    <Label htmlFor="date_debut">Date Debut</Label>
                                    <AvField
                                        name="dateDebut"
                                        placeholder="Last name"
                                        type="date"
                                        onChange={handleChange}
                                        value={assurance.dateDebut}
                                        errorMessage="Enter Date Debut"
                                        className="form-control"
                                        validate={{ required: { value: true } }}
                                        id="date_debut"
                                    />
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="mb-3">
                                    <Label htmlFor="dateFin">Date Fin</Label>
                                    <AvField
                                        name="date_fin"
                                        placeholder="Last name"
                                        type="date"
                                        onChange={handleChange}
                                        value={assurance.dateFin}
                                        errorMessage="Enter Date Fin"
                                        className="form-control"
                                        validate={{ required: { value: true } }}
                                        id="date_fin"
                                    />
                                    </div>
                                </Col>
                          
                                <Col md='4'>
                                <div className="mb-3">
                                    <Label htmlFor="validite">Validite territoire</Label>
                                    <AvField
                                        name="territoire"
                                        placeholder="validite territoire"
                                        type="text"
                                        onChange={handleChange}
                                        value={assurance.territoire}
                                        errorMessage="Entrer Validite territoire"
                                        className="form-control"
                                        validate={{ 
                                            required: { value: true },
                                            minLength : { 
                                                value : 5,
                                                errorMessage : 'Au moins 5 caracteres '
                                            }
                                        }}
                                        id="validite"
                                    />
                                    </div>
                                </Col>
                            </Row>
                            <Button color="primary" type="submit">
                                    Submit form
                            </Button>
                        </AvForm>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
        
        </React.Fragment>
      )
}

export default UpdateAssurance

import React,{useState,useEffect} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label,Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import Select from "react-select";
import  {getAllAssureurs}  from './service/Service';
import  {getAllVehicules}  from './service/Service';
import  {Ajouterassurance}  from './service/Service';



function AddAssurance() {
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


    const getVehicules = async () =>{    
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
        const result = await Ajouterassurance(assurance)
        if(result == true){
            setmessage("L'assurance est ajoutee.")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }

    useEffect(() => {
        getVehicules()
        getAllassureurs()
    
      return () => {
        
      }
    }, [])
    return (
        <React.Fragment>
        <div className="page-content">
            <Breadcrumbs title="Ajout" breadcrumbItem="assurances" />
            { message != null ? <Alert color={classname} role="alert"> {message}</Alert> : null }
            <Row>
                <Col xl="12">
                    <Card>
                        <CardBody>
                        
                        <AvForm className="needs-validation" onValidSubmit={handleSubmit}>
                            <Row>
                                <Col md="4">
                                    <div className="mb-3">
                                    <Label htmlFor="vehicule">
                                        Vehicule
                                    </Label>
                                    <Select
                                        value={selectedVehicule}
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
                                    <Label htmlFor="assureur">
                                        Assureur
                                    </Label>
                                    <Select
                                        value={selectedassureur}
                                        onChange={
                                            handleSelectassureur
                                        }
                                        options={optionassureur}
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
                                            onChange={handleChange}
                                            type="text"
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
                                        placeholder="date debut"
                                        type="date"
                                        onChange={handleChange}
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
                                        name="dateFin"
                                        placeholder="date fin"
                                        type="date"
                                        onChange={handleChange}
                                        errorMessage="Enter Date Fin"
                                        className="form-control"
                                        validate={{ required: { value: true } }}
                                        id="date_fin"
                                    />
                                    </div>
                                </Col>
                          
                                <Col md='4'>
                                <div className="mb-3">
                                    <Label htmlFor="territoire">Validite territoire</Label>
                                    <AvField
                                        name="territoire"
                                        placeholder="validite territoire"
                                        type="text"
                                        onChange={handleChange}
                                        errorMessage="Entrer Validitee territoire"
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
                            <Button color="primary" type="submit" >
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

export default AddAssurance


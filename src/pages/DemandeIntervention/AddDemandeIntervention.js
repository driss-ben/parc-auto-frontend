import React,{useState,useEffect} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label, Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import Select from "react-select";
import { Ajouterdemande,getAllVehicules } from './service/Service';

function AddMaintenanceInterne() {

    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)

    const [selectedVehicule, setselectedVehicule] = useState(null);
    const [vehiculeoptions, setvehiculeoptions] = useState([])
    function handleSelectVehicule(selectedVehicule) {
        setselectedVehicule(selectedVehicule);
        setdemandeintervention({
            ...demandeintervention,
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

     const [demandeintervention, setdemandeintervention] = useState({
        vehicule : {
            id : null
        },
        indexHoraire:'',
        description : ''
    })

    const handleChange = (e) =>{
        setdemandeintervention({
            ...demandeintervention,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async() =>{
        const result = await Ajouterdemande(demandeintervention)
        if(result == true){
            setmessage("Demande intervention est ajoutee.")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }


    useEffect(() => {
        getAllvehicules()
    
      return () => {
        
      }
    }, [])

    return (
        <React.Fragment>
        <div className="page-content">
            <Breadcrumbs title="Ajout" breadcrumbItem="Les Demandes Interventions" />
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
                                    <Label htmlFor="description">Description</Label>
                                    <AvField
                                            name="description"
                                            placeholder="description"
                                            type="text"
                                            onChange={handleChange}
                                            errorMessage=" Ajouter description."
                                            className="form-control"
                                            validate={{ 
                                                required: { value: true } 
                                            }}
                                            id="description"
                                        />
                                    </div>
                                </Col>
                                
                                <Col md="4">
                                    <div className="mb-3">
                                        <Label htmlFor="indexHoraire">Heure</Label>
                                        <AvField
                                            name="indexHoraire"
                                            placeholder="index Horaire"
                                            type="time"
                                            onChange={handleChange}
                                            errorMessage=" Entrer index horaire."
                                            className="form-control"
                                            validate={{ 
                                                required: { value: true } 
                                            }}
                                            id="indexHoraire"
                                        />
                                    </div>
                                </Col>
                            </Row>

                        
                            <Row >
                                <Col>
                                    <Button className='w-100' color="primary" type="submit" >
                                                Ajouter demande intervention
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

export default AddMaintenanceInterne


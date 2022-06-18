import React,{useState,useEffect} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label, Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import Select from "react-select";
import { getAllVehicules, updatedemande,getById } from './service/Service';
import {  useLocation } from 'react-router-dom';

function UpdateDemandeIntervention() {

    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)
    const id = useLocation().pathname.split('/')[useLocation().pathname.split('/').length-1]

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
         id : id ,
        vehicule : {
            id : null
        },
        indexHoraire:'',
        description : ''
    })
    const getbyId = async () =>{
        const mydemande = await getById(id)
        setdemandeintervention({
            ...demandeintervention,
              ...mydemande
        })
    }

    const handleChange = (e) =>{
        setdemandeintervention({
            ...demandeintervention,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async() =>{
        const result = await updatedemande(demandeintervention)
        if(result == true){
            setmessage("Demande intervention est Modifiee.")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
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
            <Breadcrumbs title="Modification" breadcrumbItem="Les Demandes Interventions" />
            { message != null ? <Alert color={classname} role="alert"> {message}</Alert> : null }
            <Row>
                <Col xl="12">
                    <Card>
                        <CardBody>
                            <h4 className="card-title">React Validation - Normal</h4>
                        
                            <AvForm className="needs-validation" onValidSubmit={handleSubmit}>
                            
                            <Row>
                                <Col md="4">
                                    <div className="mb-3">
                                    <Label htmlFor="vehicule">Vehicule</Label>
                                    <Select
                                         value={selectedVehicule!==null ? selectedVehicule : {
                                                  label : demandeintervention.vehicule.immatriculation,
                                                  value : demandeintervention.vehicule.id
                                             }
                                         }
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
                                            value={demandeintervention.description}
                                            errorMessage="Ajouter description."
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
                                            placeholder="index horaire"
                                            type="time"
                                            value={demandeintervention.indexHoraire}
                                            onChange={handleChange}
                                            errorMessage=" Entrer index horaire."
                                            className="form-control"
                                            validate={{ required: { value: true } }}
                                            id="indexHoraire"
                                        />
                                    </div>
                                </Col>
                            </Row>

                        
                            <Row >
                                <Col>
                                    <Button className='w-100' color="primary" type="submit" >
                                                Modifier demande intervention
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

export default UpdateDemandeIntervention
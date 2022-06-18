import React,{useState,useEffect} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label,Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import Select from "react-select";
import { getAllVehicules, Ajoutersinistre } from './service/Service';


function AddSinistre() {

    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)

    const [selectedVehicule, setselectedVehicule] = useState(null);
    const [vehiculeoptions, setvehiculeoptions] = useState([])
    const [sinistre, setsinistre] = useState({
        description : "",
        adresse : "",
        coutMaintenance : "",
        pourcentageAssurer : "",
        vehicule : { id : null }
    })
    function handleSelectVehicule(selectedVehicule) {
        setselectedVehicule(selectedVehicule);
        setsinistre({
            ...sinistre,
            vehicule : {
                id :  selectedVehicule !== null ? selectedVehicule.value : null
            }
        })
    }
    const optionVehicule = [ { label: "Vehicules",  options: vehiculeoptions }  ];


    const getallVehicules = async () =>{  
        const vehicules = await getAllVehicules()
        let rows = []
        vehicules.map(vehicule => {
            const objet = {label : vehicule.immatriculation, value : vehicule.id}
            rows.push(objet)
        })
        setvehiculeoptions(rows)
     }

    const handleChange = (e) =>{
        setsinistre({
            ...sinistre ,
            [e.target.name] : e.target.value
        })
    } 
    const handleSubmit = async () => {
        const result = await Ajoutersinistre(sinistre);
        if(result == true){
            setmessage("une nouvelle sinistre est ajoutee")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }

     useEffect(() => {
        getallVehicules()
     
       return () => {
         
       }
     }, [])
     

    return (
        <React.Fragment>
        <div className="page-content">
            <Breadcrumbs title="Ajout" breadcrumbItem="Les Sinistres" />
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
                                        value={selectedVehicule}
                                        onChange={
                                            handleSelectVehicule
                                        }
                                        options={optionVehicule}
                                        classNamePrefix="select2-selection"
                                    />
                                        </div>
                                    </Col>
                                    <Col md="8">
                                        <div className="mb-3">
                                        <Label htmlFor="validationCustom02">description</Label>
                                        <AvField
                                            name="description"
                                            placeholder="description"
                                            type="text"
                                            onChange={handleChange}
                                            errorMessage="Ajouter une description"
                                            className="form-control"
                                            validate={{ required: { value: true } }}
                                            id="validationCustom02"
                                        />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4">
                                        <div className="mb-3">
                                        <Label htmlFor="coutMaintenance">cout Maintenance</Label>
                                        <AvField
                                            name="coutMaintenance"
                                            placeholder="cout Maintenance"
                                            type="text"
                                            onChange={handleChange}
                                            errorMessage="ajouter le cout."
                                            className="form-control"
                                            validate={{ 
                                                required: { value: true } ,
                                                pattern : { value : /^\d+(\.\d{1,2})?$/,errorMessage:'format invalide' } 
                                            }}
                                            id="validationCustom03"
                                        />
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="mb-3">
                                        <Label htmlFor="pourcentageAssurer">pourcentage Assurer</Label>
                                        <AvField
                                            name="pourcentageAssurer"
                                            placeholder="pourcentage Assurer"
                                            type="text"
                                            onChange={handleChange}
                                            errorMessage="entrer le pourcentage assurer."
                                            className="form-control"
                                            validate={{ 
                                                required: { value: true },
                                                min : {value : 0,errorMessage:'valeur entre 0-100'},
                                                max : {value : 100,errorMessage:'valeur entre 0-100'},
                                                pattern : { value : /^\d+(\.\d{1,2})?$/,errorMessage:'format invalide' } 
                                            }}
                                            id="validationCustom04"
                                        />
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="mb-3">
                                        <Label htmlFor="validationCustom05">adresse</Label>
                                        <AvField
                                            name="adresse"
                                            placeholder="adresse "
                                            type="text"
                                            onChange={handleChange}
                                            errorMessage="entrer l'adresse de l'accident."
                                            className="form-control"
                                            validate={{ required: { value: true } }}
                                            id="adresse"
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

export default AddSinistre


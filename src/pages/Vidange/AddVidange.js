import React,{useState,useEffect} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label, Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import Select from "react-select";
import { Ajoutervidange, getAllhuiles, getAllVehicules} from './service/Service';

function AddVidange() {

    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)

    const [selectedhuile, setselectedhuile] = useState(null);
    const [huileoptions, sethuileoptions] = useState([])
    function handleSelecthuile(selectedhuile) {
        setselectedhuile(selectedhuile);
        setvidange({
            ...vidange,
            huile : {id : selectedhuile.value}
        })
    }
    const optionhuile = [{ label: "huiles", options: huileoptions }];
    const getallhuiles = async () =>{  
        const huiles = await getAllhuiles()
        let rows = []
        huiles.map(huile => {
            const objet = {label : huile.nom, value : huile.id}
            rows.push(objet)
        })
        sethuileoptions(rows)
     }
    const [selectedVehicule, setselectedVehicule] = useState(null);
    const [vehiculeoptions, setvehiculeoptions] = useState([])
    function handleSelectVehicule(selectedVehicule) {
        setselectedVehicule(selectedVehicule);
        setvidange({
            ...vidange,
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

     const [vidange, setvidange] = useState({
        vehicule : {
            id : null
        },
        quantiteHuile:'',
        huile : {
            id : null
        } 
    })

    const handleChange = (e) =>{
        setvidange({
            ...vidange,
            [e.target.name] : e.target.value
        })
    }


    const handleSubmit = async() =>{
        const result = await Ajoutervidange(vidange)
        
        if(result == true){
            setmessage("une nouvelle operation de vidange est ajoutee")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }

    useEffect(() => {
        getallVehicules()
        getallhuiles()
    
      return () => {
        
      }
    }, [])

    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title=" Ajout" breadcrumbItem="Les Vidanges" />
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
                                        <Label htmlFor="huile">Huile </Label>
                                        <Select
                                            value={selectedhuile}
                                            onChange={
                                                handleSelecthuile
                                            }
                                            options={optionhuile}
                                            classNamePrefix="select2-selection"
                                        />
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="mb-3">
                                    <Label htmlFor="quantiteHuile">quantite Huile</Label>
                                    <AvField
                                            name="quantiteHuile"
                                            placeholder="quantiteHuile"
                                            type="text"
                                            onChange={handleChange}
                                            errorMessage=" Entrer quantiteHuile."
                                            className="form-control"
                                            validate={{ 
                                                required: { value: true } ,
                                                pattern : { value : /^\d+$/ ,errorMessage:'format invalide'}
                                            }}
                                            id="quantiteHuile"
                                        />
                                    </div>
                                </Col>
                            </Row>

                         
                            <Row >
                                <Col>
                                    <Button className='w-100' color="primary" type="submit" >
                                                Ajouter vidange
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

export default AddVidange


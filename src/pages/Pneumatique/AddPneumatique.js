import React,{useState,useEffect} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label, Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import Select from "react-select";
import { Ajouterpneumatique, getAllpneus,getAllVehicules } from './service/Service';

function AddPneumatique() {
    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)

    const [isDisabledSelect, setisDisabledSelect] = useState(true)
    const [selectedpneu, setselectedpneu] = useState(null);
    const [pneuoptions, setpneuoptions] = useState([])
    function handleSelectpneu(selectedpneu) {
        setselectedpneu(selectedpneu);
        setpneumatique({
            ...pneumatique,
            pneu : {id : selectedpneu.value}
        })
    }
    const optionpneu = [{ label: "pneus", options: pneuoptions }];
    const getallpneus = async (selectedVehicule) =>{
        const pneus = await getAllpneus(selectedVehicule.value)
        let rows = []
        pneus.map( pneu => {
            const objet = {label : pneu.nom, value : pneu.id}
            rows.push(objet)
        })
        setpneuoptions(rows)
     }
    const [selectedVehicule, setselectedVehicule] = useState(null);
    const [vehiculeoptions, setvehiculeoptions] = useState([])
    function handleSelectVehicule(selectedVehicule) {
        setselectedVehicule(selectedVehicule);
        setpneumatique({
            ...pneumatique,
            vehicule : {
                id :  selectedVehicule !== null ? selectedVehicule.value : null
            }
        })
        setisDisabledSelect(false)
        getallpneus(selectedVehicule)
       
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

     const [pneumatique, setpneumatique] = useState({
        vehicule : {
            id : null
        },
        nombrePneus:'',
        pneu : {
            id : null
        } 
    })

    const handleChange = (e) =>{
        setpneumatique({
            ...pneumatique,
            [e.target.name] : e.target.value
        })
    }


    const handleSubmit = async() =>{
        const result = await Ajouterpneumatique(pneumatique)

        if(result == true){
            setmessage("nouvelle Operation pneumatique est ajoutee")
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
            <Breadcrumbs title=" Ajout" breadcrumbItem="Les Pneumatiques" />

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
                                        <Label htmlFor="pneu">pneu </Label>
                                        <Select
                                            value={selectedpneu}
                                            onChange={
                                                handleSelectpneu
                                            }
                                            options={optionpneu}
                                            isDisabled = {isDisabledSelect}
                                            classNamePrefix="select2-selection"
                                        />
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="mb-3">
                                    <Label htmlFor="nombrePneus">quantite pneu</Label>
                                    <AvField
                                            name="nombrePneus"
                                            placeholder="nombrePneus"
                                            pneu="text"
                                            onChange={handleChange}
                                            errorMessage=" Entrer nombrePneus."
                                            className="form-control"
                                            validate={{ 
                                                required: { value: true } ,
                                                pattern : { value : /^\d+$/,errorMessage:'format invalide'}
                                            }}
                                            id="nombrePneus"
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row >
                                <Col>
                                    <Button className='w-100' color="primary" type="submit" >
                                                Ajouter pneumatique
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

export default AddPneumatique


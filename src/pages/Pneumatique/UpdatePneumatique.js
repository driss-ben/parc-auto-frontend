import React,{useState,useEffect} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label, Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import Select from "react-select";
import { getAllpneus,getAllVehicules, getById, updatepneumatique} from './service/Service';
import { useLocation } from "react-router-dom";

function UpdatePneumatique() {

    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)
    const id = useLocation().pathname.split('/')[useLocation().pathname.split('/').length-1]

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
         id : id ,
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

    const getbyId = async () =>{
        const mypneumatique = await getById(id)
        setpneumatique({
            ...pneumatique,
              ...mypneumatique
        })
    }

    const handleSubmit = async() =>{
        const result = await updatepneumatique(pneumatique)

        if(result == true){
            setmessage("cette operation de pneumatique est modifiee avec succes")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }

    useEffect(() => {
        getallVehicules()
        getbyId()
        
    
      return () => {
        
      }
    }, [])

  return (
        <React.Fragment>
        <div className="page-content">
            <Breadcrumbs title="Modification " breadcrumbItem="Les Pneumatiques" />
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
                                    value={selectedVehicule!== null ? selectedVehicule : 
                                        {label : pneumatique.vehicule.immatriculation, value : pneumatique.vehicule.id }
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
                                        <Label htmlFor="pneu">pneu </Label>
                                        <Select
                                            value={selectedpneu !== null? selectedpneu : 
                                                {label : pneumatique.pneu.nom, value : pneumatique.pneu.id}
                                            }
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
                                            value={pneumatique.nombrePneus}
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
                                                Modifier pneumatique
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

export default UpdatePneumatique
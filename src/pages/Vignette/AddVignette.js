import React,{useState,useEffect} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label ,Alert} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { Ajoutervignette, getAllVehicules } from './service/Service';
import Select from "react-select";


function AddVignette() {    
    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)

    const [selectedGroup, setselectedGroup] = useState(null);
    const [vehiculeoptions, setvehiculeoptions] = useState([])
    const getallVehicules = async () =>{   
        const vehicules = await getAllVehicules()
        let rows = []
        vehicules.map(vehicule => {
            const objet = {label : vehicule.immatriculation, value : vehicule.id}
            rows.push(objet)
        })
        setvehiculeoptions(rows)
    }
    function handleSelectGroup(selectedGroup) {
        setselectedGroup(selectedGroup);
        setvignette({
            ...vignette,
            vehicule : {
                id :  selectedGroup !== null ? selectedGroup.value : null
            }
        })
    }
    const optionGroup = [ { label: "Vehicules", options: vehiculeoptions } ];

    const [vignette, setvignette] = useState({
        vehicule : {
            id : null
        },
        montantPrincipal : '',
        montantTsava:'',
        penalite :'',
        proprietaire :''
    })

    const handleChange = (e) =>{
        setvignette({
            ...vignette,
            [e.target.name] : e.target.value
        })
    }


    const handleSubmit = async() =>{
        const result = await Ajoutervignette(vignette)
        if(result == true){
            setmessage("une nouvelle vignette est ajoutee")
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
            <Breadcrumbs title="Ajout" breadcrumbItem="Les Vignettes" />
            { message != null ? <Alert color={classname} role="alert"> {message}</Alert> : null }
            <Row>
                <Col xl="12">
                    <Card>
                        <CardBody>
                                                
                        <AvForm className="needs-validation" onValidSubmit={handleSubmit}>
                            <Row>
                            <Col md="6">
                                <div className="mb-3">
                                <Label htmlFor="vehicule">Vehicule</Label>
                                <Select
                                    value={selectedGroup}
                                    onChange={
                                        handleSelectGroup
                                    }
                                    options={optionGroup}
                                    classNamePrefix="select2-selection"
                                />
                                </div>
                            </Col>
                            
                            <Col md="6">
                                <div className="mb-3">
                                <Label htmlFor="montantPrincipal">montant Principal</Label>
                                <AvField
                                    name="montantPrincipal"
                                    placeholder="montant Principal"
                                    type="text"
                                    onChange = {handleChange}
                                    errorMessage="montantPrincipal."
                                    className="form-control"
                                    validate={{ 
                                        required: { value: true },
                                        pattern : { value : /^\d+(\.\d{1,2})?$/,errorMessage:'format invalide' } 
                                    }}
                                    id="montantPrincipal"
                                />
                                </div>
                            </Col>
                            </Row>
                            <Row>
                            <Col md="4">
                                <div className="mb-3">
                                <Label htmlFor="montantTsava">montant Tsava</Label>
                                <AvField
                                    name="montantTsava"
                                    placeholder="date Operation"
                                    type="text"
                                    onChange = {handleChange}
                                    errorMessage="date Operation."
                                    className="form-control"
                                    validate={{ 
                                        required: { value: true },
                                        pattern : { value : /^\d+(\.\d{1,2})?$/,errorMessage:'format invalide' } 
                                    }}
                                    id="montantTsava"
                                />
                                </div>
                            </Col>
                            <Col md="4">
                                <div className="mb-3">
                                <Label htmlFor="penalite">penalite</Label>
                                <AvField
                                    name="penalite"
                                    placeholder="penalite"
                                    type="text"
                                    onChange = {handleChange}
                                    errorMessage=" fin Validite."
                                    className="form-control"
                                    validate={{ 
                                        required: { value: true },
                                        pattern : { value : /^\d+(\.\d{1,2})?$/,errorMessage:'format invalide' } 
                                    }}
                                    id="penalite"
                                />
                                </div>
                            </Col>
                            <Col md="4">
                                <div className="mb-3">
                                <Label htmlFor="majoration">majoration</Label>
                                <AvField
                                    name="majoration"
                                    placeholder="majoration"
                                    type="text"
                                    onChange = {handleChange}
                                    errorMessage="majoration."
                                    className="form-control"
                                    validate={{ 
                                        required: { value: true },
                                        pattern : { value : /^\d+(\.\d{1,2})?$/,errorMessage:'format invalide' } 
                                    }}
                                    id="majoration"
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

export default AddVignette


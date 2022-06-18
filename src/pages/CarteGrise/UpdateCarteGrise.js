import React,{useState,useEffect} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label,Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { getAllVehicules,updatecarte_grise ,getById} from './service/Service';
import Select from "react-select";
import {useLocation} from 'react-router-dom'


function UpdateCarteGrise() {
    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)
    const id = useLocation().pathname.split('/')[useLocation().pathname.split('/').length-1]

    const [selectedGroup, setselectedGroup] = useState(null);
    const [vehiculeoptions, setvehiculeoptions] = useState([])
    const getAllvehicules = async () =>{  
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
        setcartegrise({
            ...cartegrise,
            vehicule : {
                id :  selectedGroup !== null ? selectedGroup.value : null
            }
        })
        
    }
    const optionGroup = [ { label: "Vehicules", options: vehiculeoptions } ];

    const [cartegrise, setcartegrise] = useState({
        vehicule : {
            id : null
        },
        numeroSerie : '',
        dateOperation:'',
        finValidite :'',
        proprietaire :''
    })

    const handleChange = (e) =>{
        setcartegrise({
            ...cartegrise,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async() =>{
        const result = await updatecarte_grise(cartegrise)
        if(result == true){
            setmessage("modification de la carte grise dont id = "+ id + " est fait avec succes")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }

    const getbyId = async () =>{
        const mycartegrise = await getById(id)
        setcartegrise({
            cartegrise,
              ...mycartegrise
        })
        setselectedGroup({label:mycartegrise.vehicule.immatriculation, value:mycartegrise.vehicule.id})
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
            <Breadcrumbs title=" Modifier" breadcrumbItem="Les Cartes grise" />
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
                                    value={selectedGroup!==null ? selectedGroup : 
                                            {label : cartegrise.vehicule.immatriculation , value :cartegrise.vehicule.id}
                                    }
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
                                <Label htmlFor="numeroSerie">numero Serie du contrat</Label>
                                <AvField
                                    name="numeroSerie"
                                    placeholder="numero serie"
                                    type="text"
                                    value={cartegrise.numeroSerie}
                                    onChange = {handleChange}
                                    errorMessage="numero serie est obligatoire."
                                    className="form-control"
                                    validate={{ required: { value: true } }}
                                    id="numeroSerie"
                                />
                                </div>
                            </Col>
                            </Row>
                            <Row>
                            <Col md="4">
                                <div className="mb-3">
                                <Label htmlFor="dateOperation">date Operation</Label>
                                <AvField
                                    name="dateOperation"
                                    placeholder="date operation"
                                    value={cartegrise.dateOperation}
                                    type="date"
                                    onChange = {handleChange}
                                    errorMessage="date Operation obligatoire."
                                    className="form-control"
                                    validate={{ required: { value: true } }}
                                    id="dateOperation"
                                />
                                </div>
                            </Col>
                            <Col md="4">
                                <div className="mb-3">
                                <Label htmlFor="finValidite">fin Validite</Label>
                                <AvField
                                    name="finValidite"
                                    placeholder="fin Validite"
                                    value={cartegrise.finValidite}
                                    type="date"
                                    onChange = {handleChange}
                                    errorMessage=" fin Validite obligatoire."
                                    className="form-control"
                                    validate={{ required: { value: true } }}
                                    id="finValidite"
                                />
                                </div>
                            </Col>
                            <Col md="4">
                                <div className="mb-3">
                                <Label htmlFor="proprietaire">Proprietaire</Label>
                                <AvField
                                    name="proprietaire"
                                    placeholder="proprietaire"
                                    type="text"
                                    value={cartegrise.proprietaire}
                                    onChange = {handleChange}
                                    errorMessage="proprietaire est obligatoire."
                                    className="form-control"
                                    validate={{ required: { value: true } }}
                                    id="proprietaire"
                                />
                                </div>
                            </Col>
                            </Row>
                            <Button color="primary" className='w-100' type="submit">
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

export default UpdateCarteGrise

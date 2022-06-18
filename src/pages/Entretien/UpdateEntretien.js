import React,{useState, useEffect} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label,Alert, Badge,CardHeader } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import  Select  from "react-select";
import Table from "./service/Table";
import { Link } from 'react-router-dom';
import {  useLocation } from 'react-router-dom';
import { updateentretien,getById,getAllDemandesIntervention } from './service/Service';

function UpdateEntretien() {
    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)
    const id = useLocation().pathname.split('/')[useLocation().pathname.split('/').length-1]


    const [isVisible, setisVisible] = useState(true)


    const [demandes, setdemandes] = useState([])
    const [selectedtype, setselectedtypes] = useState(null);
    function handleSelecttypes(selectedtype) {
        setselectedtypes(selectedtype);
        setentretien({
            ...entretien ,
            typeIntervention :  selectedtype.value ,
        })
    }
    const optiontypes = [{ 
        label: "pieces", 
        options: [
            {label : 'interne' , value : 'interne'},
            {label : 'externe' , value : 'externe'}
    ] }];

    const [selecteddemande, setselecteddemande] = useState(null);
    const [demandeoptions, setdemandeoptions] = useState([])
    const optiondemande = [ { label: "demandes",  options: demandeoptions }  ];
    function handleSelectdemande(selecteddemande) {
        setselecteddemande(selecteddemande);
        setentretien({
            ...entretien,
            demandeIntervention : {
                id :  selecteddemande !== null ? selecteddemande.value : null
            }
        })
    }


    const getallDemandesIntervention = async () =>{ 
        const demandes = await getAllDemandesIntervention()
        let rows1 = []
        demandes.map(demande => {
            const objet = {label : demande.id, value : demande.id}
            rows1.push(objet)
        })
        setdemandeoptions(rows1)
        let rows2 = []
        demandes.map( (demande) => {
            const obj = {
                ...demande,
                statut :  <Badge pill 
                            role='button'
                            className={`p-2 badge-soft-${demande.etat == true ? 'success'
                                     : 'danger'}`} 
                            > 
                            {demande.etat == true ? 'traitee' : 'en attend'}
                          </Badge> ,
                vehicule : demande.vehicule.immatriculation,
            }
            
            rows2.push(obj)
          }) 
          
        setdemandes(rows2)

    }

   
    const [entretien, setentretien] = useState({
        id : id ,
        demandeIntervention : { id : null },
        typeIntervention : '',
        lieu : ''
    })

    const getbyId = async () =>{
        const myentretien = await getById(id)
        setentretien({
            ...entretien,
              ...myentretien
        })
    }
    const handleChange = (e) =>{
        setentretien({
            ...entretien,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async() =>{
        const result = await updateentretien(entretien)
        if(result == true){
            setmessage("l'entretien actuel est modifiee")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }

    useEffect(() => {
        getbyId()
        getallDemandesIntervention()
      return () => {
      }
    }, [message])
    

  return (
    <React.Fragment>
        <div className="page-content">
            <Breadcrumbs title="Modification" breadcrumbItem="Les Entretients" />
            { message != null ? <Alert color={classname} role="alert"> {message}</Alert> : null }
            <Row>
                <Col xl="12">
                    <Card>
                        <CardBody>
                        
                        {entretien.demandeIntervention.id !== null && entretien.etat===false ? 
                            <AvForm className="needs-validation" onValidSubmit={handleSubmit}>
                                <Row>
                                <Col md="4">
                                    <div className="mb-3">
                                        <Label htmlFor="validationCustom02">
                                            demande d'Intervention (
                                            <Link to='#' className='p-2' onClick={()=>setisVisible(!isVisible)}  >
                                                            { isVisible==true ? <i className='fa fa-eye-slash'></i> 
                                                                    : <i className='fa fa-eye'></i>}
                                                        </Link>
                                            )
                                        </Label>
                                        <Select
                                            value={selecteddemande!==null ? selecteddemande :
                                                { label : entretien.demandeIntervention.id , value : entretien.demandeIntervention.id }
                                            }
                                            onChange={
                                                handleSelectdemande
                                            }
                                            options={optiondemande}
                                            classNamePrefix="select2-selection"
                                            validate = {{
                                                required : { 
                                                    value : true,
                                                    errorMessage:'selectionner une vehicule'
                                                }
                                            }}
                                        />
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="mb-3">
                                        <Label htmlFor="validationCustom02">Type d'intervention</Label>
                                        <Select
                                            value={selectedtype!==null ? selectedtype :
                                                {label : entretien.typeIntervention , value : entretien.typeIntervention , }
                                            }
                                            onChange={
                                                handleSelecttypes
                                            }
                                            options={optiontypes}
                                            classNamePrefix="select2-selection"
                                            validate = {{
                                                required : { 
                                                    value : true,
                                                    errorMessage:'selectionner une vehicule'
                                                }
                                            }}
                                        />
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="mb-3">
                                        <Label htmlFor="lieu">lieu d'entretien</Label>
                                        <AvField
                                                name="lieu"
                                                placeholder="lieu"
                                                type="text"
                                                value={entretien.lieu}
                                                onChange={handleChange}
                                                errorMessage=" Entrer lieu."
                                                className="form-control"
                                                validate={{ 
                                                    required: { value: true } 
                                                }}
                                                id="lieu"
                                            />
                                        </div>
                                </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        
                                    </Col>
                                </Row>
                            
                                <Button color="primary" type="submit">
                                        Modifier Entretien
                                </Button>
                            </AvForm> :
                            <Row>
                                <Col>
                                    <h5 className='mb-5'>Entretien</h5>
                                    <Row className='mb-3'>
                                        <Col md='4'>id</Col>
                                        <Col md='4'>{entretien.id}</Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Col md='4'>Vehicule</Col>
                                        <Col md='4'>{entretien.demandeIntervention.id!== null ? entretien.demandeIntervention.vehicule.immatriculation : ''}</Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Col md='4'>type Intervention</Col>
                                        <Col md='4'>{entretien.typeIntervention}</Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Col md='4'>lieu</Col>
                                        <Col md='4'>{entretien.lieu}</Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Col md='4'>Etat</Col>
                                        <Col md='4'>
                                        <Badge pill 
                                                role='button'
                                                className={`p-2 badge-soft-${entretien.etat == true ? 'success'
                                                        : 'danger'}`} 
                                                > 
                                                {entretien.etat == true ? 'traitee' : 'en attend'}
                                            </Badge>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row> }
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            { isVisible==true && entretien.demandeIntervention.id !== null && entretien.etat===false ? 
                <Row>
                    <Col >
                        <Card>
                            <CardBody>
                                <Table 
                                    demandes={demandes} 
                                    id={selecteddemande!==null ? selecteddemande.value:'' }>
                                </Table>
                            </CardBody>  
                        </Card>
                    </Col>
                </Row>
            : ''}
        </div>
        
    </React.Fragment>
  )
}

export default UpdateEntretien
import React,{useState, useEffect} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label,Alert, Badge,CardHeader } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { Ajouterentretien,getAllDemandesIntervention } from './service/Service';
import  Select  from "react-select";
import Table from "./service/Table";
import { Link } from 'react-router-dom';


function AddEntretien() {

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

    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)

    const [entretien, setentretien] = useState({
        demandeIntervention : { id : null },
        typeIntervention : '',
        lieu : ''
    })

    const handleChange = (e) =>{
        setentretien({
            ...entretien,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async() =>{
        const result = await Ajouterentretien(entretien)
        if(result == true){
            setmessage("un nouveau entretien est ajoutee")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }

    useEffect(() => {
        getallDemandesIntervention()
    
      return () => {
      }
    }, [message])
    

  return (
    <React.Fragment>
        <div className="page-content">
            <Breadcrumbs title="Ajout" breadcrumbItem="Les Entretients" />
            { message != null ? <Alert color={classname} role="alert"> {message}</Alert> : null }
            <Row>
                <Col xl="12">
                    <Card>
                        <CardBody>
                        
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
                                        value={selecteddemande}
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
                                        value={selectedtype}
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
                                            onChange={handleChange}
                                            errorMessage=" Entrer le lieu."
                                            className="form-control"
                                            validate={{ 
                                                required: { value: true } 
                                            }}
                                            id="lieu"
                                        />
                                    </div>
                            </Col>
                            </Row>
                            
                           
                            <Button color="primary" className='w-100' type="submit">
                                    Ajouter Entretien
                            </Button>
                        </AvForm>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            { isVisible==true ? 
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

export default AddEntretien
import React,{useState,useEffect} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label,Alert,Badge } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import Select from "react-select";
import { getById,updatemaintenance, getAllEntretiens } from './service/Service';
import Table from "./service/Table";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function UpdateMaintenanceInterne() {

    const [isVisible, setisVisible] = useState(true)

    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)

    const id = useLocation().pathname.split('/')[useLocation().pathname.split('/').length-1]
   
    const [selectedentretien, setselectedentretien] = useState(null);
    const [entretienoptions, setentretienoptions] = useState([])
    const [interne, setinterne] = useState({
        id : id ,
        entretien : { id : null},
        dateDebut : null,
        dateFin : null
    })
    
    function handleSelectentretien(selectedentretien) {
        setselectedentretien(selectedentretien);
        setinterne({
            ...interne,
            entretien : {
                id :  selectedentretien !== null ? selectedentretien.value : null
            }
        })
    }
    const optionentretien = [ { label: "entretiens",  options: entretienoptions }  ];

    const handleChange = (e) =>{
        setinterne({
            ...interne,
            [e.target.name] : e.target.value 
        })
    }
    const [entretiens, setentretiens] = useState([])
    const getallentretiens = async () =>{    
        const entretiens = await getAllEntretiens('interne')
        let rows = []
        entretiens.map(entretien => {
            const objet = {label : entretien.id, value : entretien.id}
            rows.push(objet)
        })
        setentretienoptions(rows)
        let rows2 = []
        entretiens.map( entretien => {
            const obj = {
                ...entretien,
                vehicule : entretien.demandeIntervention.vehicule.immatriculation ,
                statut :  <Badge pill 
                            role='button'
                            className={`p-2 badge-soft-${entretien.etat == true ? 'success'
                                    : 'danger'}`} 
                            > 
                            {entretien.etat == true ? 'terminee' : 'en cours'}
                          </Badge> ,
            }
            rows2.push(obj)
        }) 
        setentretiens(rows2)
    }

 

    const handleSubmit =async ()=>{
        const result = await updatemaintenance(interne)
        if(result == true){
            setmessage("le maintenance interne actuel est Modifiée")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }

    const getbyId = async () =>{
        const myinterne = await getById(id)
        setinterne({
            ...interne,
              ...myinterne
        })
    }

    useEffect(() => {
        getallentretiens()
        getbyId()
        return () => {
        }
    }, [message])

  return (
    <React.Fragment>
        <div className="page-content">
            <Breadcrumbs title="Ajout" breadcrumbItem="Les Maintenances Interne" />
            { message != null ? <Alert color={classname} role="alert"> {message}</Alert> : null }
            <Row>
                <Col xl="12">
                    <Card>
                        <CardBody>
                        
                        {interne.entretien.id !== null && interne.etat===false ? 
                            <AvForm className="needs-validation" onValidSubmit={handleSubmit}>
                                <Row>
                                    <Col md="4">
                                        <div className="mb-3">
                                            <Label htmlFor="validationCustom02">
                                                Entretient (
                                                    <Link to='#'className='p-2' onClick={()=>setisVisible(!isVisible)}  >
                                                        { isVisible==true ? <i className='fa fa-eye-slash'></i> 
                                                                : <i className='fa fa-eye'></i>}
                                                    </Link>
                                                )
                                            </Label>
                                            <Select
                                                value={selectedentretien!==null ? selectedentretien : 
                                                    {label : interne.entretien.id , value : interne.entretien.id ,}
                                                }
                                                onChange={ handleSelectentretien }
                                                options={optionentretien}
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
                                        <Label htmlFor="dateDebut">date Debut</Label>
                                        <AvField
                                            name="dateDebut"
                                            placeholder="date Debut"
                                            type="date"
                                            value ={interne.dateDebut}
                                            onChange={handleChange}
                                            errorMessage="entrer la date Debut."
                                            className="form-control"
                                            validate={{ required: { value: true } }}
                                            id="dateDebut"
                                        />
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="mb-3">
                                        <Label htmlFor="dateFin">Date Fint</Label>
                                        <AvField
                                            name="dateFin"
                                            placeholder="date fin du mantenance"
                                            type="date"
                                            onChange={handleChange}
                                            value ={interne.dateFin}
                                            errorMessage=" entrer Date Fint."
                                            className="form-control"
                                            validate={{ required: { value: true } }}
                                            id="dateFin"
                                        />
                                        </div>
                                    </Col>
                                </Row>
                                

    
                                <Button color="primary" className='w-100' type="submit">
                                        Submit form
                                </Button>
                            </AvForm> :
                            <Row>
                                <Col>
                                    <h5 className='mb-5'>Maintenance Interne</h5>
                                    <Row className='mb-3'>
                                        <Col md='4' xs='6'>id</Col>
                                        <Col md='4' xs='6'>{interne.id}</Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Col md='4' xs='6'>Vehicule</Col>
                                        <Col md='4' xs='6'>{interne.entretien.id!== null ? interne.entretien.demandeIntervention.vehicule.immatriculation : ''}</Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Col md='4' xs='6'>Date Debut</Col>
                                        <Col md='4' xs='6'>{interne.dateDebut}</Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Col md='4' xs='6'>date Fin</Col>
                                        <Col md='4' xs='6'>{interne.dateFin}</Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Col md='4' xs='6'>Etat</Col>
                                        <Col md='4' xs='6'>
                                        <Badge pill 
                                                role='button'
                                                className={`p-2 badge-soft-${interne.etat == true ? 'success'
                                                        : 'danger'}`} 
                                                > 
                                                {interne.etat == true ? 'traitee' : 'en attend'}
                                            </Badge>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            }
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            {isVisible===true && interne.entretien.id !== null && interne.etat===false? 
            <Row>
            <Col >
                <Card>
                    <CardBody>
                        <Table 
                            entretiens={entretiens} 
                            id={selectedentretien!==null ? selectedentretien.value:'' }>
                        </Table>
                    </CardBody>
                </Card>
            </Col>
            </Row> : '' }
        </div>
    </React.Fragment>
  )
}

export default UpdateMaintenanceInterne
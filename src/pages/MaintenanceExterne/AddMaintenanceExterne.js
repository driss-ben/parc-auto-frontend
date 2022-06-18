import React,{useState, useEffect} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label,Alert,Badge } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { Ajoutermaintenance, getAllentretiens, getAllprestataires } from './service/Service';
import  Select  from "react-select";
import Table from "./service/Table";
import { Link } from "react-router-dom";

function AddMaintenanceExterne() {
    const [isVisible, setisVisible] = useState(true)

    const [selectedentretien, setselectedentretien] = useState(null);
    const [entretienoptions, setentretienoptions] = useState([])
    function handleSelectentretien(selectedentretien) {
        setselectedentretien(selectedentretien);
        setexterne({
            ...externe,
            entretien : {
                id :  selectedentretien !== null ? selectedentretien.value : null
            }
        })
    }
    const optionentretien = [ { label: "entretiens",  options: entretienoptions }  ];
    const [entretiens, setentretiens] = useState([])

    const getallentretiens = async () =>{    
        const entretiens = await getAllentretiens('externe')
        let rows1 = []
        entretiens.map(entretien => {
            const objet = {label : entretien.id, value : entretien.id}
            rows1.push(objet)
        })
        setentretienoptions(rows1)
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


    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)
    const [engagement, setengagement] = useState({
            dateDebut : null ,
            dateFin : null 
    })
    const [serviceFait, setserviceFait] = useState({
            cout : null ,
            description : null
    })
    
    const [externe, setexterne] = useState({
        prestataire : { id : null },
        entretien : { id : null } ,
        dateDebut : null ,
        dateFin : null ,
        garage : null ,
        serviceFait : {...serviceFait},
        engagement : {...engagement}
    })

    const [selectedprestataire, setselectedprestataire] = useState(null);
    const [prestataireoptions, setprestataireoptions] = useState([])
    function handleSelectprestataire(selectedprestataire) {
        setselectedprestataire(selectedprestataire);
        setexterne({
            ...externe,
            prestataire : {
                id :  selectedprestataire !== null ? selectedprestataire.value : null
            }
        })
    }
    const optionprestataire = [ { label: "prestataires",  options: prestataireoptions }  ];

    const getallprestataires = async () =>{   
        const prestataires = await getAllprestataires()
        let rows = []
        prestataires.map(prestataire => {
            const objet = {label : prestataire.nom, value : prestataire.id}
            rows.push(objet)
        })
        setprestataireoptions(rows)
     }
    const handleChange = (e) => {
        setexterne({
            ...externe ,
            [e.target.name] : e.target.value
        })
    }
    const traiteChange = (e) => {
        setengagement({
            ...engagement,
            dateDebut : e.target.dateDebutE ,
            dateFin : e.target.dateFinE
           
        })
    }

    const gereChange = (e) => {
        setserviceFait({
            ...serviceFait,
            [e.target.name] : e.target.value
            
        })
    }
    const handleSubmit = async() =>{
        setexterne({
            ...externe ,
            engagement : {...engagement} ,
            serviceFait : {...serviceFait}
        })
        
        const result = await Ajoutermaintenance(externe)
        if(result == true){
            setmessage("un nouveau maintenance est ajoutee")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }

    useEffect(() => {
        getallentretiens()
        getallprestataires()
      return () => {
        
      }
    }, [message])


    return (
        <React.Fragment>
        <div className="page-content">
            <Breadcrumbs title="Ajout" breadcrumbItem="Les Maintenances Externe" />
            { message != null ? <Alert color={classname} role="alert"> {message}</Alert> : null }
            <Row>
                <Col xl="12">
                        <AvForm className="needs-validation" onValidSubmit={handleSubmit}>
                        <Card className='mb-3'>
                            <CardBody> 
                                <Row>
                                    <Col>
                                        <h5 className='mb-3'>
                                            Maintenance Externe
                                        </h5>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Row>
                                        <Col md="4">
                                            <div className="mb-3">
                                                <Label htmlFor="validationCustom02">
                                                    entretien (
                                                        <Link to='#' className='p-2' onClick={()=>setisVisible(!isVisible)}  >
                                                            { isVisible==true ? <i className='fa fa-eye-slash'></i> 
                                                                    : <i className='fa fa-eye'></i>}
                                                        </Link>
                                                        )
                                                </Label>
                                                <Select
                                                    value={selectedentretien}
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
                                                <Label htmlFor="prestataire">prestataire</Label>
                                                <Select
                                                    value={selectedprestataire}
                                                    onChange={
                                                        handleSelectprestataire
                                                    }
                                                    options={optionprestataire}
                                                    classNamePrefix="select2-selection"
                                                />

                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="mb-3">
                                            <Label htmlFor="garage">garage</Label>
                                            <AvField
                                                name="garage"
                                                placeholder="garage"
                                                type="text"
                                                onChange = {handleChange}
                                                errorMessage="entrer le nom du garage."
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="garage"
                                            />
                                            </div>
                                        </Col>
                                        </Row>
                                        <Row>
                                        <Col md="6">
                                            <div className="mb-3">
                                            <Label htmlFor="dateDebut">date Debut</Label>
                                            <AvField
                                                name="dateDebut"
                                                placeholder="date Debut du maintenance"
                                                type="date"
                                                onChange = {handleChange}
                                                errorMessage="entrer la date de debut"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="dateDebut"
                                            />
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="mb-3">
                                            <Label htmlFor="dateFin">date Fin</Label>
                                            <AvField
                                                name="dateFin"
                                                placeholder="date Fin du maintenance"
                                                type="date"
                                                onChange = {handleChange}
                                                errorMessage="entrer la date de fin"
                                                className="form-control"
                                                validate={{ required: { value: true } }}
                                                id="dateFin"
                                            />
                                            </div>
                                        </Col>
                                        </Row>                                
                                    </Col>
                                </Row>
                                { isVisible==true ? 
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
                                    </Row>
                                : ''}
                            </CardBody>
                        </Card>

                         <Card className='mb-3'>
                            <CardBody> 
                                <Row> <Col><h5 className='mb-3'>Engagement</h5></Col>  </Row>
                                <Row>
                                    <Col md="6">
                                        <div className="mb-3">
                                        <Label htmlFor="dateDebut">dateDebut</Label>
                                        <AvField
                                            name="dateDebutE"
                                            placeholder="dateDebut"
                                            type="date"
                                            onChange = {traiteChange}
                                            errorMessage="Please provide a valid state."
                                            className="form-control"
                                            validate={{ required: { value: true } }}
                                            id="dateDebut"
                                        />
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="mb-3">
                                        <Label htmlFor="dateFin">dateFin</Label>
                                        <AvField
                                            name="dateFinE"
                                            placeholder="dateFin"
                                            type="date"
                                            onChange = {traiteChange}
                                            errorMessage="Please provide a valid state."
                                            className="form-control"
                                            validate={{ required: { value: true } }}
                                            id="dateFin"
                                        />
                                        </div>
                                    </Col> 
                                </Row>
                            </CardBody> 
                        </Card>
                        <Card className='mb-3'>
                        <CardBody> 
                            <Row>
                                <Col><h5 className='mb-3'>finalisation de maintenance </h5></Col>
                               
                            </Row>
                            <Row>
                                <Col md="6">
                                    <div className="mb-3">
                                    <Label htmlFor="cout">cout</Label>
                                    <AvField
                                        name="cout"
                                        placeholder="cout"
                                        type="text"
                                        onChange={gereChange}
                                        errorMessage="Please provide a valid state."
                                        className="form-control"
                                        validate={{ 
                                            required: { value: true },
                                            pattern: { value: /^[/\d]+$/ },
                                         }}
                                        id="cout"
                                    />
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="mb-3">
                                    <Label htmlFor="description">description</Label>
                                    <AvField
                                        name="description"
                                        placeholder="description"
                                        type="text"
                                        onChange={gereChange}
                                        errorMessage="Please provide a valid state."
                                        className="form-control"
                                        validate={{ required: { value: true } }}
                                        id="description"
                                    />
                                    </div>
                                </Col>
                            </Row>
                        </CardBody> 
                        </Card>

                            
                            <Button color="primary " className='w-100' type="submit">
                                    Submit form
                            </Button>
                        </AvForm>
                </Col>
            </Row>
        </div>
        
        </React.Fragment>
      )
}

export default AddMaintenanceExterne


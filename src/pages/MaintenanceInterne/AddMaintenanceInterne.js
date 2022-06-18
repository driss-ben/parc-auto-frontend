import React,{useState,useEffect} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label,Alert,Badge } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import Select from "react-select";
import { getAllEntretiens, Ajoutermaintenance } from './service/Service';
import Table from "./service/Table";
import { Link } from "react-router-dom";


function AddMaintenanceInterne() {
    const [isVisible, setisVisible] = useState(true)

    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)

    const [selectedentretien, setselectedentretien] = useState(null);
    const [entretienoptions, setentretienoptions] = useState([])
    
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

    const [interne, setinterne] = useState({
        entretien : { id : null},
        dateDebut : null,
        dateFin : null
    })

    const handleSubmit =async ()=>{
        const result = await Ajoutermaintenance(interne)
        if(result == true){
            setmessage("un nouveau maintenance interne est ajoutee")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }
    useEffect(() => {
        getallentretiens()
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
                                    <Label htmlFor="dateDebut">date Debut</Label>
                                    <AvField
                                        name="dateDebut"
                                        placeholder="date Debut"
                                        type="date"
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
                                        errorMessage=" entrer Date Fint."
                                        className="form-control"
                                        validate={{ required: { value: true } }}
                                        id="dateFin"
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
            {isVisible===true ? 
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

export default AddMaintenanceInterne


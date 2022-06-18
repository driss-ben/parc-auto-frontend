import React,{useState} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label,Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { Ajouterassureur } from './service/Service';


function AddAssureur() {
    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)
    const [assureur, setassureur] = useState({
        nom : '',
        telephone:'',
        email :'',
        ville :'',
        adresse :''
    })

    const handleChange = (e) =>{
        setassureur({
            ...assureur,
            [e.target.name] : e.target.value
        })
    }


    const handleSubmit = async() =>{
        const result = await Ajouterassureur(assureur)
        if(result == true){
            setmessage("une nouveau assureur est ajoutee.")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }

    return (
        <React.Fragment>
        <div className="page-content">
        <Breadcrumbs title="Ajout" breadcrumbItem="Les Assureurs" />
        { message != null ? <Alert color={classname} role="alert"> {message}</Alert> : null }
            <Row>
                <Col xl="12">
                    <Card>
                        <CardBody>
                        
                        <AvForm className="needs-validation" onValidSubmit={handleSubmit}>
                            <Row>
                            <Col md="6">
                                <div className="mb-3">
                                <Label htmlFor="nom"> Nom</Label>
                                <AvField
                                    name="nom"
                                    placeholder="nom"
                                    type="text"
                                    onChange = {handleChange}
                                    errorMessage="Entrer le Nom"
                                    className="form-control"
                                    validate={{ 
                                        required  : { value: true },
                                        minLength : { value : 4,errorMessage:'au moins 4 caracteres' }
                                    }}
                                    id="nom"
                                />
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="mb-3">
                                <Label htmlFor="telephone">Telephone</Label>
                                <AvField
                                    name="telephone"
                                    type="text"
                                    placeholder="+212 6...."
                                    errorMessage="Entrer Telephone"
                                    className="form-control"
                                    onChange = {handleChange}
                                    validate={{ 
                                        required : { value: true },
                                        pattern : { 
                                            value : /[(\+212|0)]([ \-_/]*)(\d*){9,9}/, 
                                            errorMessage:'format non valide: +212 6...| 06...'
                                        }
                                    }}
                                    id="telephone"
                                />
                                </div>
                            </Col>
                            </Row>
                            <Row>
                            <Col md="4">
                                <div className="mb-3">
                                    <Label htmlFor="email">Email</Label>
                                    <AvField
                                        name="email"
                                        placeholder="Email"
                                        type="text"
                                        onChange = {handleChange}
                                        errorMessage=" entrer Email."
                                        className="form-control"
                                        validate={{ 
                                            required: { value: true } ,
                                            email : { 
                                                value : true,
                                                errorMessage : "Email invalide"
                                            }
                                        }}
                                        id="email"
                                    />
                                </div>
                            </Col>
                            <Col md="4">
                                <div className="mb-3">
                                    <Label htmlFor="adresse">Adresse</Label>
                                    <AvField
                                        name="adresse"
                                        placeholder="Adresse"
                                        type="text"
                                        onChange = {handleChange}
                                        errorMessage="Entrer adresse."
                                        className="form-control"
                                        validate={{ required: { value: true } }}
                                        id="adresse"
                                    />
                                </div>
                            </Col>
                            <Col md="4">
                                <div className="mb-3">
                                    <Label htmlFor="ville">Ville</Label>
                                    <AvField
                                        name="ville"
                                        placeholder="ville"
                                        type="text"
                                        onChange = {handleChange}
                                        errorMessage="Entrer ville."
                                        className="form-control"
                                        validate={{ required: { value: true } }}
                                        id="ville"
                                    />
                                </div>
                            </Col>
                            
                            </Row>
                           
                            <Button color="primary" type="submit">
                                    Ajouter assureur
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

export default AddAssureur


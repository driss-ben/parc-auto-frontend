import React,{useState} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label,Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { Ajouterfournisseur } from './service/Service';

function AddFournisseur() {
    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)
    const [fournisseur, setfournisseur] = useState({
        nom : '',
        telephone:'',
        email :'',
        ville :'',
        adresse :''
    })

    const handleChange = (e) =>{
        setfournisseur({
            ...fournisseur,
            [e.target.name] : e.target.value
        })
    }


    const handleSubmit = async() =>{
        const result = await Ajouterfournisseur(fournisseur)
        if(result == true){
            setmessage("un nouveau fournisseur est ajoutee")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }

  return (
    <React.Fragment>
        <div className="page-content">
            <Breadcrumbs title="Ajout" breadcrumbItem="Les Fournisseurs" />
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
                                    placeholder="Le Nom"
                                    type="text"
                                    onChange = {handleChange}
                                    errorMessage="Entrer le Nom"
                                    className="form-control"
                                    validate={{ 
                                        required  : { value: true },
                                        minLength : { value : 4,errorMessage:'au moins 4 caracteres ' }
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
                                    Ajouter fournisseur
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

export default AddFournisseur
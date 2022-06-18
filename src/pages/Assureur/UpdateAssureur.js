import React, { useState,useEffect }from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label,Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import {  useLocation } from 'react-router-dom';
import { updateassureur,getById } from './service/Service';

function UpdateAssureur() {
    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)
    const id = useLocation().pathname.split('/')[useLocation().pathname.split('/').length-1]

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
        const result = await updateassureur(assureur)
        if(result == true){
            setmessage("modification de l'assureur dont id = "+ id + " est fait avec succes")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }
    const getbyId = async () =>{
        const myassureur = await getById(id)
        setassureur({
            ...assureur,
              ...myassureur
        })
    }
    useEffect(() => {
        
        getbyId()

    return () => {
        
    }
    }, [])
    return (
        <React.Fragment>
        <div className="page-content">
            <Breadcrumbs title="Modifier" breadcrumbItem="Les Assureurs" />
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
                                    value={assureur.nom}
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
                                    value={assureur.telephone}
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
                                        value={assureur.email}
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
                                        value={assureur.adresse}
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
                                        value={assureur.ville}
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

export default UpdateAssureur

import React, { useState,useEffect }from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label,Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import {  useLocation } from 'react-router-dom';
import { getById, updatefournisseur } from './service/Service';

function UpdateFournisseur() {
    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)
    const id = useLocation().pathname.split('/')[useLocation().pathname.split('/').length-1]

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
        const result = await updatefournisseur(fournisseur)
        if(result == true){
            setmessage("Fournisseur actuel est modifiee")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }
    const getbyId = async () =>{
        const myfournisseur = await getById(id)
        setfournisseur({
            ...fournisseur,
              ...myfournisseur
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
            <Breadcrumbs title="Modification" breadcrumbItem="Les Fournisseurs" />
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
                                    value={fournisseur.nom}
                                    onChange = {handleChange}
                                    errorMessage="Entrer le Nom"
                                    className="form-control"
                                    validate={{ 
                                        required : { value: true },
                                        minLength : { value : 4 }
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
                                    value={fournisseur.telephone}
                                    placeholder="+212 6...."
                                    errorMessage="Entrer Telephone"
                                    className="form-control"
                                    onChange = {handleChange}
                                    validate={{ 
                                        required : { value: true },
                                        tel : { value : true,errorMessage:'forme nom valide'}
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
                                        value={fournisseur.email}
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
                                        value={fournisseur.adresse}
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
                                        value={fournisseur.ville}
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

export default UpdateFournisseur
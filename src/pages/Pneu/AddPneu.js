import React,{ useState } from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label,Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"

import { Ajouterpneu } from './service/Service';

function NewPiece() {
    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)
    const [pneu, setpneu] = useState({
        nom : null,
        quantiteStock:0,
        kilometrage :0,
        rayon :null,
        largeur : null,
        hauteur : null,
        radial : null,
        diametre : null,
        charge : null,
        vitesse : null
    })



    const handleChange = (e) =>{
        setpneu({
            ...pneu,
            [e.target.name] : e.target.value
        })
    }


    const handleSubmit = async() =>{
        const result = await Ajouterpneu(pneu)
        if(result == true){
            setmessage("un nouveau Pneu est ajoutee")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }



  return (
    <React.Fragment>
        <div className="page-content">
            <Breadcrumbs title="Pneus" breadcrumbItem="Les Pneus" />
            { message != null ? <Alert color={classname} role="alert"> {message}</Alert> : null }
            <Row>
                <Col xl="12">
                    <Card>
                        <CardBody>
                            <h4 className="card-title">Ajouter Pneu</h4>
                        
                            <AvForm className="needs-validation" onValidSubmit={handleSubmit}>
                                <Row>
                                    <Col md="4">
                                        <div className="mb-3">
                                        <Label htmlFor="nom">Nom</Label>
                                        <AvField
                                            name="nom"
                                            placeholder="Nom du piece"
                                            onChange={handleChange}
                                            type="text"
                                            errorMessage="Entrer le Nom, au moins 2 caracteres"
                                            className="form-control"
                                            validate={{ 
                                                required: { value: true } ,
                                                minLength : {value : 2, errorMessage:'au moins 2 caracteres '}
                                            }}
                                            id="nom"
                                        />
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="mb-3">
                                        <Label htmlFor="kilometrage">kilometrage</Label>
                                        <AvField
                                            name="kilometrage"
                                            placeholder="kilometrage"
                                            type="text"
                                            validate={{ 
                                                required: { value: true },
                                                pattern : { value : /^\d+(\.\d{1,2})?$/ ,errorMessage:'format invalide'},
                                             }}
                                            errorMessage="kilometrage"
                                            onChange={handleChange}
                                            className="form-control"
                                            id="kilometrage"
                                        />
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="mb-3">
                                        <Label htmlFor="rayon">Rayon</Label>
                                        <AvField
                                            name="rayon"
                                            placeholder="rayon"
                                            onChange={handleChange}
                                            type="text"
                                            errorMessage=" Entrer rayon ."
                                            className="form-control"
                                            validate={{ 
                                                required: { value: true }, 
                                                pattern : { value : /^\d+(\.\d{1,2})?$/,errorMessage:'format invalide'}
                                            }}
                                            id="rayon"
                                        />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4">
                                        <div className="mb-3">
                                        <Label htmlFor="largeur">Largeur</Label>
                                        <AvField
                                            name="largeur"
                                            placeholder="Largeur"
                                            onChange={handleChange}
                                            type="text"
                                            validate={{ pattern : { value : /^\d+(\.\d{1,2})?$/ ,errorMessage:'format invalide'} }}
                                            errorMessage="Entrer la largeur du piece"
                                            className="form-control"
                                            id="largeur"
                                        />
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="mb-3">
                                        <Label htmlFor="hauteur">hauteur</Label>
                                        <AvField
                                            name="hauteur"
                                            placeholder="hauteur"
                                            type="text"
                                            validate={{ pattern : { value : /^\d+(\.\d{1,2})?$/ ,errorMessage:'format invalide'} }}
                                            errorMessage="Entrer la hauteur"
                                            onChange={handleChange}
                                            className="form-control"
                                            id="hauteur"
                                        />
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="mb-3">
                                        <Label htmlFor="radial">radial</Label>
                                        <AvField
                                            name="radial"
                                            placeholder="radial"
                                            type="text"
                                            validate={{ pattern : { value : /^\d+(\.\d{1,2})?$/,errorMessage:'format invalide' } }}
                                            errorMessage=" Entrer radial."
                                            onChange={handleChange}
                                            className="form-control"
                                            id="radial"
                                        />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4">
                                        <div className="mb-3">
                                        <Label htmlFor="diametre">diametre</Label>
                                        <AvField
                                            name="diametre"
                                            placeholder="diametre"
                                            type="text"
                                            validate={{ pattern : { value : /^\d+(\.\d{1,2})?$/,errorMessage:'format invalide' } }}
                                            errorMessage="Entrer le diametre"
                                            onChange={handleChange}
                                            className="form-control"
                                            id="diametre"
                                        />
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="mb-3">
                                        <Label htmlFor="charge">charge</Label>
                                        <AvField
                                            name="charge"
                                            placeholder="charge"
                                            type="text"
                                            validate={{ pattern : { value : /^\d+(\.\d{1,2})?$/,errorMessage:'format invalide' } }}
                                            errorMessage="Entrer la charge"
                                            onChange={handleChange}
                                            className="form-control"
                                            id="charge"
                                        />
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="mb-3">
                                        <Label htmlFor="vitesse">vitesse</Label>
                                        <AvField
                                            name="vitesse"
                                            placeholder="vitesse"
                                            type="text"
                                            validate={{ pattern : { value : /^\d+(\.\d{1,2})?$/ ,errorMessage:'format invalide'} }}
                                            errorMessage="Entrer lvitesse"
                                            onChange={handleChange}
                                            className="form-control"
                                            id="vitesse"
                                        />
                                        </div>
                                    </Col>
                                    
                                </Row>
                            

                                <Button color="primary" className='d-block w-100' type="submit">
                                        Ajouter pneu
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

export default NewPiece
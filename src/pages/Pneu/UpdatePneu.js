import React,{useState,useEffect} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label,Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { getById,updatepneu } from './service/Service';

import { useLocation } from 'react-router-dom'

function UpdatePiece() {

    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)

    const id = useLocation().pathname.split('/')[useLocation().pathname.split('/').length-1]
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
        const result = await updatepneu(pneu)
        if(result == true){
            setmessage("le Pneu actuel est modifiee")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }

    const getbyId = async () =>{
        const mypneu = await getById(id)
        setpneu({
            ...pneu,
              ...mypneu
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
            <Breadcrumbs title="Modification" breadcrumbItem="Les Pneus" />
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
                                            placeholder="Nom du pneu"
                                            value={pneu.nom}
                                            onChange={handleChange}
                                            type="text"
                                            errorMessage="Entrer un Nom du pneu"
                                            className="form-control"
                                            validate={{ 
                                                required: { value: true } ,
                                                minLength : {value : 2,errorMessage:'au moins 2 caracteres'}
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
                                            value={pneu.kilometrage}
                                            errorMessage="kilometrage"
                                            onChange={handleChange}
                                            className="form-control"
                                            validate={{ 
                                                required : { value : true},
                                                pattern : { value : /^\d+(\.\d{1,2})?$/,errorMessage:'format invalide' } 
                                            }}
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
                                                value={pneu.rayon}
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
                                            value={pneu.largeur}
                                            errorMessage="Entrer la largeur du piece"
                                            className="form-control"
                                            validate={{ pattern : { value : /^\d+(\.\d{1,2})?$/,errorMessage:'format invalide' } }}
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
                                            value={pneu.hauteur}
                                            errorMessage="Entrer la hauteur"
                                            onChange={handleChange}
                                            className="form-control"
                                            validate={{ pattern : { value : /^\d+(\.\d{1,2})?$/,errorMessage:'format invalide' } }}
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
                                            value={pneu.radial}
                                            errorMessage=" Entrer radial."
                                            onChange={handleChange}
                                            className="form-control"
                                            validate={{ pattern : { value : /^\d+(\.\d{1,2})?$/ ,errorMessage:'format invalide'} }}
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
                                            value={pneu.diametre}
                                            errorMessage="Entrer le diametre"
                                            onChange={handleChange}
                                            className="form-control"
                                            validate={{ pattern : { value : /^\d+(\.\d{1,2})?$/,errorMessage:'format invalide' } }}
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
                                            value={pneu.charge}
                                            errorMessage="Entrer la charge"
                                            onChange={handleChange}
                                            className="form-control"
                                            validate={{ pattern : { value : /^\d+(\.\d{1,2})?$/,errorMessage:'format invalide' } }}
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
                                            value={pneu.vitesse}
                                            errorMessage="Entrer lvitesse"
                                            onChange={handleChange}
                                            className="form-control"
                                            validate={{ pattern : { value : /^\d+(\.\d{1,2})?$/,errorMessage:'format invalide' } }}
                                            id="vitesse"
                                        />
                                        </div>
                                    </Col>
                                </Row>
                            

                                <Button color="primary" className='d-block' type="submit">
                                        modifier pneu
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

export default UpdatePiece
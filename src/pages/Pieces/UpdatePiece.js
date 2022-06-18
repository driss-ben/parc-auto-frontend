import React, { useState,useEffect }from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label, Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import {  useLocation } from 'react-router-dom';
import { getById, updatePiece } from './service/Service';


function UpdatePiece() {
    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)

    const id = useLocation().pathname.split('/')[useLocation().pathname.split('/').length-1]
    const [piece, setPiece] = useState({
        id : id ,
        nom : '',
        cout : 0.00,
        quantiteStock : 0
    });


    const handleChange = (e) => {
        setPiece({
        ...piece,
        [e.target.name] : e.target.value
        });
    }

    const handleSubmit = async() =>{
        const result = await updatePiece(piece)
        if(result == true){
            setmessage("une nouvelle piece est ajoutee")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
        
    }
    const getbyId = async () =>{
        const mypiece = await getById(id)
        setPiece({
            ...piece,
              ...mypiece
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
            <Breadcrumbs title="Modifier " breadcrumbItem="Les Pièces" />
            { message != null ? <Alert color={classname} role="alert"> {message}</Alert> : null }
            <Row>
                <Col xl="12">
                    <Card>
                        <CardBody>
                            <h1 className="card-title mb-4">Modifier Piece</h1>
                            
                            <AvForm className="needs-validation" onValidSubmit = {handleSubmit} >
                                <Row>
                                    <Col md="4">
                                        <div className="mb-3">
                                            <Label htmlFor="piece">Nom de la piece</Label>{piece.nom}
                                            <AvField
                                                name="nom"
                                                placeholder="Nom de la piece"
                                                value={piece.nom}
                                                type="text"
                                                errorMessage="Entrer Nom de la piece"
                                                className="form-control"
                                                validate={{ 
                                                    required: { value: true } ,
                                                    minLength : {value : 2,errorMessage:'au moins 2 caracteres'}
                                                }}
                                                id="piece"
                                                onChange = {handleChange}
                                            />
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="mb-3">
                                        <Label htmlFor="prix">Prix unitaire</Label>
                                        <AvField
                                            name="cout"
                                            placeholder="Prix unitaire"
                                            value={piece.cout}
                                            type="text"
                                            errorMessage="Entrer Prix unitaire "
                                            className="form-control"
                                            validate={{ 
                                                required: { value: true }, 
                                                pattern : { value : /^\d+(\.\d{1,2})?$/,errorMessage:'format invalide'}
                                            }}
                                            id="prix"
                                            onChange = {handleChange}
                                        />
                                        </div>
                                    </Col>
                                    
                                    <Col md="4">
                                        <div className="mb-3">
                                        <Label htmlFor="quantite">Quantite du Stock</Label>
                                        <AvField
                                            name="quantiteStock"
                                            placeholder="Quantite"
                                            value={piece.quantiteStock}
                                            type="text"
                                            errorMessage=" Entrer Quantite."
                                            className="form-control"
                                            validate={{ 
                                                required: { value: true },
                                                pattern: { value: /^[/\d]+$/,errorMessage:'format invalide' },
                                             }}
                                            id="quantite"
                                            onChange = {handleChange}
                                        />
                                        </div>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col>
                                        <Button className='w-100' color="primary" type="submit" >
                                                Modifier piece
                                        </Button>
                                    </Col>
                                </Row>
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
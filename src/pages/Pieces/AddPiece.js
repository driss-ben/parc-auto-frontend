import React, { useState } from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label,Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { AjouterPiece } from './service/Service';


function NewPiece() {
    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)
    const [piece, setPiece] = useState({
        nom : '',
        cout : 0.00,
        quantiteStock : 0
    });

    const handlePiece = (e) => {
        setPiece({
            ...piece,
            [e.target.name] : e.target.value
        });
    }
    const handleSubmit = async () =>{
       const result = await AjouterPiece(piece);
       if(result == true){
           setmessage("une nouvelle piece est ajoutee")
           setclassname("success");
       }else{
            setmessage(result)
            setclassname("danger");
       }
    }

  return (
    <React.Fragment>
        <div className="page-content">
            <Breadcrumbs title="Ajout" breadcrumbItem="Les Pieces" />
            { message != null ? <Alert color={classname} role="alert"> {message}</Alert> : null }
            <Row>
                <Col xl="12">
                    
                    
                    <Card >
                        <CardBody>
                            <h1 className="card-title">Ajout nouvelle piece</h1>
                                                    
                            <AvForm className="needs-validation" onValidSubmit = {handleSubmit} >
                                <Row>
                                    <Col md="4">
                                        <div className="mb-3">
                                        <Label htmlFor="piece">Nom de la piece</Label>
                                        <AvField
                                            name="nom"
                                            placeholder="Nom de la piece"
                                            type="text"
                                            errorMessage="Entrer Nom de la piece"
                                            className="form-control"
                                            validate={{ 
                                                required: { value: true } ,
                                                minLength : {value : 2}
                                            }}
                                            id="piece"
                                            onChange = {handlePiece}
                                        />
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="mb-3">
                                        <Label htmlFor="prix">
                                            Prix unitaire &nbsp;
                                            <span className='small text-muted'>(5.00)</span>
                                        </Label>
                                        <AvField
                                            name="cout"
                                            placeholder="Prix unitaire"
                                            type="text"
                                            errorMessage="Entrer Prix unitaire "
                                            className="form-control"
                                            validate={{ 
                                                required: { value: true }, 
                                                pattern : { value : /^\d+(\.\d{1,2})?$/,errorMessage:'format invalide'}
                                            }}
                                            id="prix"
                                            onChange = {handlePiece}
                                        />
                                        </div>
                                    </Col>
                                    
                                    <Col md="4">
                                        <div className="mb-3">
                                            <Label htmlFor="quantite">Quantite du Stock</Label>
                                            <AvField
                                                name="quantiteStock"
                                                placeholder="Quantite"
                                                type="text"
                                                errorMessage=" Entrer Quantite."
                                                className="form-control"
                                                validate={{ 
                                                    required: { value: true },
                                                    pattern: { value: /^[/\d]+$/,errorMessage:'format invalide' },
                                                 }}
                                                id="quantite"
                                                onChange = {handlePiece}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col>
                                        <Button className='w-100' color="primary" type="submit" >
                                                    Ajouter piece
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

export default NewPiece
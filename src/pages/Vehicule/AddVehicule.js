import React, { useState } from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label,Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { Ajoutervehicule } from './service/Service';

function AddVehicule() {

    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)
    const [vehicule, setvehicule] = useState({
        immatriculation : '',
        kilometrage : 0.00,
        rayonRoue : 0
    });
    const handlevehicule = (e) => {
        setvehicule({
            ...vehicule,
            [e.target.name] : e.target.value
        });
    }
    const handleSubmit = async () =>{
       const result = await Ajoutervehicule(vehicule);
       if(result == true){
           setmessage("une nouvelle vehicule est ajoutee")
           setclassname("success");
       }else{
            setmessage(result)
            setclassname("danger");
       }
    }

  return (
    <React.Fragment>
        <div className="page-content">
            <Breadcrumbs title="Ajout" breadcrumbItem="Les vehicules" />
            { message != null ? <Alert color={classname} role="alert"> {message}</Alert> : null }
            <Row>
                <Col xl="12">
                    
                    
                    <Card >
                        <CardBody>
                            <h1 className="card-title">Ajout nouvelle vehicule</h1>
                                                    
                            <AvForm className="needs-validation" onValidSubmit = {handleSubmit} >
                                <Row>
                                    <Col md="4">
                                        <div className="mb-3">
                                        <Label htmlFor="Immatriculation">Immatriculation</Label>
                                        <AvField
                                            name="immatriculation"
                                            placeholder="Immatriculation de la vehicule"
                                            type="text"
                                            errorMessage="Entrer Immatriculation de la vehicule"
                                            className="form-control"
                                            validate={{ 
                                                required: { value: true } ,
                                                minLength : {value : 2}
                                            }}
                                            id="Immatriculation"
                                            onChange = {handlevehicule}
                                        />
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="mb-3">
                                        <Label htmlFor="compteur">
                                            Compteur &nbsp;
                                            <span className='small text-muted'>(5.00)</span>
                                        </Label>
                                        <AvField
                                            name="kilometrage"
                                            placeholder="compteur"
                                            type="text"
                                            errorMessage="Entrer la valeur du compteur  "
                                            className="form-control"
                                            validate={{ 
                                                required: { value: true }, 
                                                pattern : { value : /^\d+(\.\d{1,2})?$/,errorMessage:'format invalide'}
                                            }}
                                            id="compteur"
                                            onChange = {handlevehicule}
                                        />
                                        </div>
                                    </Col>
                                    
                                    <Col md="4">
                                        <div className="mb-3">
                                            <Label htmlFor="rayonRoue">Rayon du roue</Label>
                                            <AvField
                                                name="rayonRoue"
                                                placeholder="rayon Roue"
                                                type="text"
                                                errorMessage=" Entrer rayon Roue."
                                                className="form-control"
                                                validate={{ 
                                                    required: { value: true },
                                                    pattern: { value: /^[/\d]+$/,errorMessage:'format invalide' },
                                                 }}
                                                id="rayonRoue"
                                                onChange = {handlevehicule}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col>
                                        <Button className='w-100' color="primary" type="submit" >
                                                    Ajouter vehicule
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

export default AddVehicule
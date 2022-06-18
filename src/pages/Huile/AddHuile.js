import React,{useState,useEffect} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label, Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import Select from "react-select";
import { ajouter_type, getAll } from './typeHuile/service';
import { Ajouterhuile } from './service/Service';

function AddHuile() {
    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)

    const [huile, sethuile] = useState({
        nom : '',
        typeHuile : {
            id : null
        },
        quantiteStock:0,
        kilometrage :0,
        cout :0
    })
    const [selectedGroup, setselectedGroup] = useState(null);
    const [typeoptions, settypeoptions] = useState([])
    function handleSelectGroup(selectedGroup) { 
        setselectedGroup(selectedGroup); 
        
        sethuile({
            ...huile,
            typeHuile : {
                id :  selectedGroup !== null ? selectedGroup.value : null
            }
        })
    }

    const getAllTypes = async () =>{    
       const types = await getAll()
       let rows = []
       types.map(type => {
           const objet = {label : type.nom, value : type.id}
           rows.push(objet)
       })
        settypeoptions(rows)
    }
     
    const optionGroup = [ { label: "Types", options: typeoptions } ];

    const handleChange = (e) =>{
        sethuile({
            ...huile,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async() =>{
        const result = await Ajouterhuile(huile)
        if(result == true){
            setmessage("un nouveau huile  est ajoutee")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }

    const [huiletype, sethuiletype] = useState({ nom : ''})

    const handlehuileSubmit = async() => {
        const result = await ajouter_type(huiletype);
        if(result == true){
            setmessage("un nouveau type d'huile  est ajoutee")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }

    const typeChange = (e) =>{
        sethuiletype({
            ...huiletype,
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        getAllTypes()
        return () => {
        }
    }, [message])
    


  return (
    <React.Fragment>
        <div className="page-content">
            <Breadcrumbs title="Ajout" breadcrumbItem="Les Huiles" />
            { message != null ? <Alert color={classname} role="alert"> {message}</Alert> : null }
            <Row>
                <Col xl="12">
                    <Card>
                        <CardBody>
                        <h4 className="card-title mb-3">Ajouter Huile</h4>
                       
                        <AvForm className="needs-validation mt-3" onValidSubmit={handleSubmit}>
                            <Row>
                            <Col md="6">
                                <div className="mb-3">
                                <Label htmlFor="nom"> Nom</Label>
                                <AvField
                                    onChange = {(e)=>handleChange(e)}
                                    name="nom"
                                    placeholder="nom d'huile"
                                    type="text"
                                    errorMessage="Entrer un nom d'huile"
                                    className="form-control"
                                    validate={{ 
                                        required: { value: true } ,
                                        minLength : {value : 2}
                                    }}
                                    id="nom"
                                />
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="mb-3">
                                <Label htmlFor="kilometrage">Kilometrage ( km )</Label>
                                <AvField
                                    onChange = {(e)=>handleChange(e)}
                                    name="kilometrage"
                                    placeholder="kilometrage"
                                    type="text"
                                    errorMessage="Enter le kilometrage"
                                    className="form-control"
                                    validate={{ 
                                        required : { value : true},
                                        pattern : { value : /^\d+(\.\d{1,2})?$/ } 
                                    }}
                                    id="kilometrage"
                                />
                                </div>
                            </Col>
                            </Row>
                            <Row>
                            <Col md="4">
                                <div className="mb-3">
                                <Label htmlFor="quantite">Quantite du stock (unite) </Label>
                                <AvField
                                    onChange = {(e)=>handleChange(e)}
                                    name="quantiteStock"
                                    placeholder="quantite stock"
                                    type="text"
                                    errorMessage=" Entrer Quantite du stock."
                                    className="form-control"
                                    validate={{ 
                                        required: { value: true },
                                        pattern: { value: /^[/\d]+$/ },
                                     }}
                                    id="quantite"
                                />
                                </div>
                            </Col>
                            <Col md="4">
                                <div className="mb-3">
                                <Label htmlFor="prix">Prix unitaire</Label>
                                <AvField
                                    onChange = {(e)=>handleChange(e)}
                                    name="cout"
                                    placeholder="Prix unitaire"
                                    type="text"
                                    errorMessage="Entrer Prix unitaire."
                                    className="form-control"
                                    validate={{ 
                                        required: { value: true }, 
                                        pattern : { value : /^\d+(\.\d{1,2})?$/}
                                    }}
                                    id="prix"
                                />
                                </div>
                            </Col>
                            <Col md="4">
                                <div className="mb-3">
                                <Label htmlFor="type">Type</Label>
                                <Select
                                    value={selectedGroup}
                                    onChange={
                                        handleSelectGroup
                                    }
                                    required
                                    options={optionGroup}
                                    classNamePrefix="select2-selection"
                                />
                                </div>
                            </Col>
                            
                            </Row>
                            
                            <Button color="primary" className='w-100' type="submit">
                                    Ajouter Huile
                            </Button>
                        </AvForm>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xl="12">
                    <Card>
                        <CardBody>                       
                        <AvForm className="needs-validation mt-3" onValidSubmit={handlehuileSubmit}>
                        
                            <Row>
                                <Col md="8">
                                    <div className="mb-3">
                                    <AvField
                                        onChange = {(e)=>typeChange(e)}
                                        name="nom"
                                        placeholder="type huile"
                                        type="text"
                                        errorMessage="type huile"
                                        className="form-control"
                                        validate={{ 
                                            required: { value: true }
                                        }}
                                        id="type huile"
                                    />
                                    </div>
                                </Col>     
                                <Col md="4">
                                    <Button color="primary" className='w-100' type="submit">
                                            Ajouter type d'Huile
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

export default AddHuile
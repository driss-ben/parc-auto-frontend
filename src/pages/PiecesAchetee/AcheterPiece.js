import React,{useState,useEffect} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label, Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import Select from 'react-select' 
import { Ajouterpiece_achete, getAllpieces, getAllfournisseurs } from './service/Service';

function AcheterPiece() {

    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)
    
    const [selectedpiece, setselectedpiece] = useState(null);
    const [pieceoptions, setpieceoptions] = useState([])
    function handleSelectpiece(selectedpiece) {
        setselectedpiece(selectedpiece);
        setachat({
            ...achat,
            piece : {id : selectedpiece.value}
        })
    }
    const optionpiece = [{ label: "pieces", options: pieceoptions }];
    const getallpieces = async () =>{   
        const pieces = await getAllpieces()
        let rows = []
        pieces.map(piece => {
            const objet = {label : piece.nom, value : piece.id}
            rows.push(objet)
        })
        setpieceoptions(rows)
     }
    const [selectedfournisseur, setselectedfournisseur] = useState(null);
    const [fournisseuroptions, setfournisseuroptions] = useState([])
    function handleSelectfournisseur(selectedfournisseur) {
        setselectedfournisseur(selectedfournisseur);
        setachat({
            ...achat,
            fournisseur : {
                id :  selectedfournisseur !== null ? selectedfournisseur.value : null
            }
        })
    }
    const optionfournisseur = [ { label: "fournisseurs",  options: fournisseuroptions }  ];

    const getallfournisseurs = async () =>{  
        const fournisseurs = await getAllfournisseurs()
        let rows = []
        fournisseurs.map(fournisseur => {
            const objet = {label : fournisseur.nom, value : fournisseur.id}
            rows.push(objet)
        })
        setfournisseuroptions(rows)
     }

     const [achat, setachat] = useState({
        fournisseur : {
            id : null
        },
        quantite:null,
        cout:null,
        piece : {
            id : null
        } 
    })

    const handleChange = (e) =>{
        setachat({
            ...achat,
            [e.target.name] : e.target.value
        })
    }


    const handleSubmit = async() =>{
        const result = await Ajouterpiece_achete(achat)
        if(result == true){
            setmessage("un nouveau Pneu est ajoutee")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }

    useEffect(() => {
        getallfournisseurs()
        getallpieces()
      return () => {
        
      }
    }, [])
  return (
    <React.Fragment>
    <div className="page-content">
        <Breadcrumbs title="Pièces" breadcrumbItem="Les Achats" />
        { message != null ? <Alert color={classname} role="alert"> {message}</Alert> : null }
        <Row>
            <Col xl="12">
                <Card>
                    <CardBody>
                    <h4 className="card-title">Ajouter Achat</h4>
                    <p className="card-title-desc">
                    </p>
                    <AvForm className="needs-validation" onValidSubmit={handleSubmit}>
                        <Row>
                        <Col md="6">
                            <div className="mb-3">
                                <Label htmlFor="piece">La Pièce</Label>
                                <Select
                                    value={selectedpiece}
                                    onChange={
                                        handleSelectpiece
                                    }
                                    options={optionpiece}
                                    classNamePrefix="select2-selection"
                                />
                            </div>
                        </Col>
                        <Col md="6">
                                <div className="mb-3">
                                <Label htmlFor="fournisseur">Fournisseur</Label>
                                <Select
                                    value={selectedfournisseur}
                                    onChange={
                                        handleSelectfournisseur
                                    }
                                    options={optionfournisseur}
                                    classNamePrefix="select2-selection"
                                />

                            </div>
                        </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <div className="mb-3">
                                <Label htmlFor="quantite">Quatite</Label>
                                <AvField
                                    name="quantite"
                                    placeholder="Quantite"
                                    onChange={handleChange}
                                    type="text"
                                    errorMessage=" Entere Quantite."
                                    className="form-control"
                                    validate={{ required: { value: true } }}
                                    id="quantite"
                                />
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="mb-3">
                                <Label htmlFor="cout">Cout unitaire</Label>
                                <AvField
                                    name="cout"
                                    placeholder="Cout"
                                    type="text"
                                    onChange={handleChange}
                                    errorMessage="Ajouter cout."
                                    className="form-control"
                                    validate={{ required: { value: true } }}
                                    id="cout"
                                />
                                </div>
                            </Col>
                        </Row>
                        <Button color="primary" type="submit">
                                Submit form
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

export default AcheterPiece
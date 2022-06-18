import React ,{useState,useEffect}from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button, Label, Alert,Badge } from "reactstrap"
import { AvForm } from "availity-reactstrap-validation"
import Select from "react-select";
import { getAllMaintenancesInternes, getAllpieces,AjouterDemande} from './service/Service';
import Table from "./service/Table";
import { Link } from 'react-router-dom';

function AddDemandePiece() {

    const [isVisible, setisVisible] = useState(true)
    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)

    const [rows2, setrows2] = useState([])
    function handleRemoveRow(e, id) {
      if (typeof id != "undefined"){
            document.getElementById("addr" + id).style.display = "none"
            document.getElementsByClassName('pieces')[id].classList.add('no-piece')
            document.getElementsByClassName('quantite')[id].classList.add('no-quantite')
      }
         
    }
    function handleAddRowNested1() {
      const item2 = { name1: "" }
      setrows2([...rows2, item2])
      
    }

    const [selectedinterne, setselectedinterne] = useState(null);
    const [interneoptions, setinterneoptions] = useState([])
    function handleSelectinterne(selectedinterne) {
        setselectedinterne(selectedinterne);
        setdemande({
            ...demande,
            maintenanceInterne : { id : selectedinterne.value}
        })
    }
    const optioninterne = [ { label: "internes",  options: interneoptions }  ];
    const [internes, setinternes] = useState([])

    const getAllinternes = async () =>{   
        const internes = await getAllMaintenancesInternes()
        let rows = []
        internes.map(interne => {
            const objet = {label : interne.id, value : interne.id}
            rows.push(objet)
        })
        setinterneoptions(rows)

        let rows2 = []
        internes.map( interne => {
            const obj = {
                ...interne,
                vehicule : interne.entretien.demandeIntervention.vehicule.immatriculation,
                statut : <Badge pill 
                            role='button'
                            className={`p-2 badge-soft-${interne.etat == true ? 'success'
                                    : 'danger'}`} 
                            > 
                            {interne.etat == true ? 'traitee' : 'en attend'}
                        </Badge> 
            }
            rows2.push(obj)
          }) 
          setinternes(rows2)
    }

    const [demande, setdemande] = useState({
        maintenanceInterne : { id : null },
        piecesDemandee : []
    })

    const [pieces, setpieces] = useState([])
    
    const getallPieces = async ()=>{
        const result = await getAllpieces()
        setpieces(result)
    }

    const handleSubmit =async ()=>{
        const piecesClass = document.getElementsByClassName('pieces');
        const quantiteClass = document.getElementsByClassName('quantite');

        let piecesDemandees = []
        let quantitePieces = []

        const isIn =(el, array ) => {
            for (let i = 0; i < array.length; i++) {
                if(el === array[i].piece.id) return true;                
            }
        }

        for (let i = 0; i < piecesClass.length; i++) {
            const piece = piecesClass[i];
            const quantite = quantiteClass[i];
            if(!piece.classList.contains('no-piece')) 
                piecesDemandees.push(piece.options[piece.selectedIndex].value)
            if(!quantite.classList.contains('no-quantite')) 
                quantitePieces.push(quantite.value)
        }

        let allPieces = []
        for (let i = 0; i < piecesDemandees.length; i++) {
            let nbrPiece = 1;
            for (let j = i + 1; j < piecesDemandees.length; j++){
                
                if (piecesDemandees[i] === piecesDemandees[j]  && !isIn(piecesDemandees[i],allPieces)) {
                    if (quantitePieces[i] != '' && piecesDemandees[i] != ''
                        && quantitePieces[j] != '' && piecesDemandees[j] != '' ) {
                            nbrPiece+=1;
                        quantitePieces[i] = Number(quantitePieces[i]) + Number(quantitePieces[j])
                        const piecedemandee = {
                            quantite : quantitePieces[i],
                            piece : { id : piecesDemandees[i] }
                        }
                        allPieces = [...allPieces, piecedemandee]
                    }
                }

            }
            if (nbrPiece === 1 && !isIn(piecesDemandees[i],allPieces)) {
                if (quantitePieces[i] != '' && piecesDemandees[i] != '' ) {
                    const piecedemandee = {
                        quantite : quantitePieces[i],
                        piece : { id : piecesDemandees[i] }
                    }
                    allPieces = [...allPieces, piecedemandee]
                }
            }
            
            
        }


        
        demande.piecesDemandee = allPieces
        
   
        const result = await AjouterDemande(demande)
        if(result == true){
            setmessage("La demande des pieces est ajoutee")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
    }
 
    
    useEffect(() => {
        getAllinternes()
        getallPieces()
        return () => {
            
        }
    }, [message])
     
  return (
    <React.Fragment>
        <div className="page-content">
            <Breadcrumbs title="Ajout" breadcrumbItem="Les Demandes Pieces" />
            { message != null ? <Alert color={classname} role="alert"> {message}</Alert> : null }
            <Row>
                <Col xl="12">
                    <Card>
                        <CardBody>
                            
                            <AvForm className="needs-validation" onValidSubmit={handleSubmit}>
                                <Row className='mb-4'>
                                    <Col md="3">
                                        
                                        <Label className='mt-2'>
                                            Id Maintenance (
                                            <Link to='#' className='p-2' onClick={()=>setisVisible(!isVisible)}  >
                                                            { isVisible==true ? <i className='fa fa-eye-slash'></i> 
                                                                    : <i className='fa fa-eye'></i>}
                                                        </Link>
                                            )
                                            
                                        </Label>
                                    </Col>
                                    <Col md="6">
                                            <Select
                                                value={selectedinterne}
                                                onChange={ handleSelectinterne }
                                                options={optioninterne}
                                                classNamePrefix="select2-selection"
                                                validate = {{
                                                    required : { 
                                                        value : true,
                                                        errorMessage:'selectionner une vehicule'
                                                    }
                                                }}
                                            />
                                    </Col>
                                    <Col md="3">
                                        <Button
                                            onClick={() => {
                                                handleAddRowNested1()
                                            }}
                                            color="success"
                                            className="btn btn-sm btn-success p-2 w-100 mt-3 mt-lg-0"
                                        >
                                            Ajouter d'autres Pieces 
                                        </Button>
                                    </Col>
                                </Row>


                                {rows2.map((item2, idx) => (
                                    <React.Fragment key={idx}>
                                        <div data-repeater-list="group-a" id={"addr" + idx} >
                                            <div data-repeater-item className="row">
                                                <div className="mb-3 col-md-4 d-flex">
                                                    <label className='m-2 w-25' >Piece</label>
                                                    <select   className="form-control pieces" required>
                                                        <option></option>
                                                        {pieces !== null ? pieces.map(piece => <option value={piece.id}>{piece.nom}</option>) : ''}
                                                    </select>
                                                </div>

                                                <div className="mb-3 col-md-5 d-flex">
                                                    <label className='m-2 mr-2 w-25' >Quantite</label>
                                                    <input type="number"  min='1' className="form-control quantite" required/>
                                                </div>

                                                <Col md={3} className="align-self-center d-grid d-flex mb-3">
                                                    <input data-repeater-delete type="button" className="btn btn-primary w-100" value="Delete"
                                                    onClick={e => {
                                                        handleRemoveRow(e , idx)
                                                    }} />
                                                </Col>
                                            </div>

                                        </div>
                                    </React.Fragment>
                                ))}
                                
                                
                                
                                <Button color="primary" type="submit">
                                        Submit form
                                </Button>
                            </AvForm>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            { isVisible==true ? 
                <Row>
                    <Col >
                        <Card>
                            <CardBody>
                                <Table 
                                    internes={internes} 
                                    id={selectedinterne!==null ? selectedinterne.value:'' }>
                                </Table>
                            </CardBody>  
                        </Card>
                    </Col>
                </Row>
            : ''}
        </div>
        
    </React.Fragment>
  )
}

export default AddDemandePiece
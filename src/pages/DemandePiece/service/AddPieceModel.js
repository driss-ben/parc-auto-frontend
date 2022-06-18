import axios from "axios"
import React, {useEffect,useState} from "react"
import { Col, Modal,Row ,Label, Button, Alert} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import  Select  from "react-select";
import { Link } from "react-router-dom";
import { updateDemande, getAllpieces, getById } from "./Service";


const AddPieceModel = ({id,interne,setreload, reload}) => {
  const [modal_standard, setmodal_standard] = useState(false)

  function tog_standard() {
    setmodal_standard(!modal_standard)
    removeBodyCss()
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  const [demandePiece, setdemandePiece] = useState({
      id : id ,
      maintenanceInterne : { id : interne} ,
      piecesDemandee : null,
  })
  const [pieceDemandee, setpieceDemandee] = useState({
      piece : null ,
      quantite : null
  })
  const [selectedpiece, setselectedpiece] = useState(null);
  const [pieceoptions, setpieceoptions] = useState([])
  function handleSelectpiece(selectedpiece) {
      setselectedpiece(selectedpiece);
        setpieceDemandee({
            ...pieceDemandee ,
               piece : {id : selectedpiece !== null ? selectedpiece.value : null} 
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

    const handleChange = (e) =>{
            setpieceDemandee({
                ...pieceDemandee ,
                   quantite : e.target.value     
            })
    }

  const [message, setmessage] = useState(null)
  const [classname, setclassname] = useState(null)


    const handleSubmit = async () => {
        setpieceDemandee(pieceDemandee)
        const demande = await getById(id)

        demande.piecesDemandee.push(pieceDemandee)

        const result = await updateDemande(demande)
        if(result == true){
            setmessage("une piece demandee est ajoutee")
            setclassname("success");
        }else{
             setmessage(result)
             setclassname("danger");
        }
        setreload(!reload)
        
        
        
    }





  useEffect(() => {
    getallpieces()
    return () => {
      
    }
  }, [])

  return (

        <Col sm={6} md={4} xl={3}>
            <Link
                to='#'
                type="button"
                onClick={() => {
                    tog_standard()
                }}
                className="h6 text-light p-2 rounded bg-success"
                data-toggle="modal"
                data-target="#myModal"
            >
            <i className="fa fa-plus"></i>
                </Link>
     
            <Modal
                isOpen={modal_standard}
                toggle={() => {
                tog_standard()
                }}
            >
                <div className="modal-header">
                <h5 className="modal-title mt-0" id="myModalLabel">
                    Modal Heading
                    </h5>
                <button
                    type="button"
                    onClick={() => {
                    setmodal_standard(false)
                    }}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body">
                    <AvForm className="needs-validation" onValidSubmit={handleSubmit}>
                    { message != null ? <Alert color={classname} role="alert"> {message}</Alert> : null }

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
                                    <Label htmlFor="validationCustom02">Quantite</Label>
                                    
                                        <AvField
                                            name="quantite"
                                            placeholder="Quantite"
                                            type="text"
                                            errorMessage="entrer la quantite."
                                            onChange = {handleChange}
                                            className="form-control"
                                            validate={{ 
                                                required: { value: true } ,
                                                pattern: { value: /^[/\d]+$/,errorMessage:'format invalide' },
                                            }}
                                            id="quantite"
                                        />
                                </div>
                            </Col>
                        </Row>
                        <Button color="primary" className="w-100" type="submit">
                                Ajouter demande
                        </Button>
                    </AvForm>
                </div>
            
            </Modal>
        </Col>
                
  )
}

export default AddPieceModel

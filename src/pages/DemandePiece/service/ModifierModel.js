
import React, {useEffect,useState} from "react"
import { Col, Modal,Row ,Label, Button,Alert} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { Link } from "react-router-dom";
import { getPieceDemandeById, updatePieceDemande } from "./Service";


const ModifierModel = ({pieceId,setreload,reload}) => {
  const [modal_standard, setmodal_standard] = useState(false)

  function tog_standard() {
    setmodal_standard(!modal_standard)
    removeBodyCss()
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  const [PieceDemandee, setPieceDemandee] = useState(null)

  const [message, setmessage] = useState(null)
  const [classname, setclassname] = useState(null)
  const getbyId = async() => {
    const result = await getPieceDemandeById(pieceId)
    setPieceDemandee(result);
  }

  const handleChange = (e) =>{
      setPieceDemandee({
          ...PieceDemandee,
          [e.target.name] : e.target.value 
      })
  }
  const handleSubmit = async() =>{
      const result = await updatePieceDemande(PieceDemandee)
      if(result == true){
          setmessage("la piece demandee est modifiee")
          setclassname("success");
      }else{
           setmessage(result)
           setclassname("danger");
      }
      
    setreload(!reload)
  }

  useEffect(() => {
    getbyId()
    return () => {
      
    }
  }, [])

  return (

        <>
            <Link
                to='#'
                type="button"
                onClick={() => {
                    tog_standard()
                }}
                className="text-primary h5"
                data-toggle="modal"
                data-target="#myModal"
            >
            <i className="bx bx-edit-alt "></i>
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
                            <Label htmlFor="validationCustom02">
                                {PieceDemandee !== null ? PieceDemandee.piece.nom : ''}
                            </Label>
                        </div>
                    </Col>
                    <Col md="6">
                        <Row className="mb-3">
                            <Col md='5'><Label htmlFor="validationCustom02">Quantite</Label></Col>
                            
                            <Col md='7'>
                                <AvField
                                    name="quantite"
                                    placeholder="Quantite"
                                    type="text"
                                    value = {PieceDemandee!== null ? PieceDemandee.quantite : null}
                                    errorMessage="entrer la quantite."
                                    onChange = {handleChange}
                                    className="form-control"
                                    validate={{ 
                                        required: { value: true } ,
                                        pattern: { value: /^[/\d]+$/,errorMessage:'format invalide' },
                                    }}
                                    id="quantite"
                                />
                            </Col>
                        </Row>
                    </Col>
                    </Row>
                    <Button color="primary" className="w-100" type="submit">
                            Modifier demande
                    </Button>
                </AvForm>
            </div>
        </Modal>
        </>
                
  )
}

export default ModifierModel

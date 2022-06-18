import React,{useState,useEffect} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row,  Card, CardBody,Col, Badge } from "reactstrap"
import {  deletePieceDemandee, getById } from './service/Service';
import {useLocation,Link} from 'react-router-dom'
import SweetAlert from "react-bootstrap-sweetalert"
import ModifierModel from './service/ModifierModel'
import  AddpieceModel from './service/AddPieceModel'
function ExploreDemandePiece() {
    const [success_dlg, setsuccess_dlg] = useState(false)
    const [error_dlg, seterror_dlg] = useState(false)
    const [dynamic_title, setdynamic_title] = useState("")
    const [dynamic_description, setdynamic_description] = useState("")
    const [confirm_alert, setconfirm_alert] = useState(false)

    const [reload, setreload] = useState(false)

    const id = useLocation().pathname.split('/')[useLocation().pathname.split('/').length-1]
    const [pieceId, setpieceId] = useState(null)
    const [demande, setdemande] = useState(null)
    const deleteById = async () =>{
        await deletePieceDemandee(pieceId) 
      }
    const getbyId = async () =>{
        const mydemande = await getById(id)
        setdemande(mydemande);
    }
    useEffect(() => {
      getbyId()
    
      return () => {
        
      }
    }, [success_dlg,reload])
    
  return (
      
    <React.Fragment>

        {success_dlg ? (
            <SweetAlert
              success
              title={dynamic_title}
              onConfirm={() => {
                setsuccess_dlg(false)
              }}
            >
              {dynamic_description}
            </SweetAlert>
          ) : null}

          {error_dlg ? (
            <SweetAlert
              error
              title={dynamic_title}
              onConfirm={() => {
                seterror_dlg(false)
              }}
            >
              {dynamic_description}
            </SweetAlert>
          ) : null}
          
          <Col xl="3" lg="4" sm="6" className="mb-2">
                  
              {confirm_alert ? (
                <SweetAlert
                  title="Are you sure?"
                  warning
                  showCancel
                  confirmButtonText="Yes, delete it!"
                  confirmBtnBsStyle="success"
                  cancelBtnBsStyle="danger"
                  onConfirm={() => {
                    setconfirm_alert(false)
                    setsuccess_dlg(true)
                    setdynamic_title("Deleted")
                    setdynamic_description("Your file has been deleted.")
                    deleteById()
                    
                  }}
                  onCancel={() => setconfirm_alert(false)}
                >
                  You won't be able to revert this!
                </SweetAlert>
              ) : null}
          </Col>
    <div className="page-content">
        <Breadcrumbs title="Details" breadcrumbItem="Demandes Pieces" />
        <Row>
            <Card>
            {demande!==null ? 
                <CardBody>
                    <div className='m-4'>
                        <h5 className='mb-4'>Maintenance Interne</h5>
                        <table className='table' border='0'>
                            <tbody>
                                <tr>
                                    <td>Vehicule</td>
                                    <td>{demande.maintenanceInterne!==null ? demande.maintenanceInterne.entretien.demandeIntervention.vehicule.immatriculation : ''}</td>
                                </tr>
                                <tr>
                                    <td>date debut</td>
                                    <td>{demande.maintenanceInterne.dateDebut}</td>
                                </tr>
                                <tr>
                                    <td>date debut</td>
                                    <td>{demande.maintenanceInterne.dateFin}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                   
                     <div className='m-4'> 
                        <Row className='justify-content-between'>
                            <h5 className='mb-4'>Les pieces demandees</h5>
                            {demande.etat === false ? 
                            <AddpieceModel 
                                id={demande.id} 
                                interne = {demande.maintenanceInterne.id} 
                                setreload = {setreload} reload = {reload}
                            /> : <Badge className='p-2 badge-soft-success' pill > traitee </Badge>}
                        </Row>
                        
                        {demande.piecesDemandee.length != 0 ? 
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>piece</th>
                                        <th>Quantite</th>
                                        {demande.etat === false ? <th>action</th> : ''}
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {demande.piecesDemandee.map(piece => {
                                            return(
                                                
                                                <tr key={piece.id}>
                                                    <td>{piece.id}</td>
                                                    <td>{piece.piece.nom}</td> 
                                                    <td>{piece.quantite}</td> 
                                                    {demande.etat === false ? 
                                                    <td>
                                                        {
                                                            <div> 
                                                                <ModifierModel pieceId={piece.id} setreload = {setreload} reload = {reload}/>
                                                                <Link to="#" className='mx-2 text-danger h5'>
                                                                    <span color="primary" id="sa-success"
                                                                        onClick={() => { setpieceId(piece.id);setconfirm_alert(true) }}
                                                                    >
                                                                        <i className='bx bx-trash '></i>
                                                                    </span>
                                                                </Link>
                                                                 
                                                            </div>
                                                        }
                                                    </td> : ''}
                                                </tr>
                                            )
                                        })} 
                                        
                                </tbody>
                                
                            </table>: ''
                        }
                    </div> 
                       
                </CardBody>
                            : ''    
                    } 
            </Card>
        </Row>
       
    </div>
    
    </React.Fragment>
  )
}

export default ExploreDemandePiece
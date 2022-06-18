import React, {useEffect,useState} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody,Badge, CardHeader, Alert } from "reactstrap"
import { Link } from 'react-router-dom';
import { deleteDemande, getAll } from './service/Service';

import SweetAlert from "react-bootstrap-sweetalert"

function DemandePiece() {
  const [message, setmessage] = useState(null)
  const [classname, setclassname] = useState(null)

  
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [error_dlg, seterror_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")
  const [confirm_alert, setconfirm_alert] = useState(false)

  const [data, setData] = useState({
    columns: [
        {
          label: "Id",
          field: "id",
          sort: "asc",
          width: 150,
        },
        {
          label: "Vehicule",
          field: "vehicule",
          sort: "asc",
          width: 200,
        },
        {
          label: "Id Maintenance",
          field: "maintenance",
          sort: "asc",
          width: 270,
        },
        {
          label: "nombre Piece",
          field: "nombrePiece",
          sort: "asc",
          width: 270,
        },
        {
          label: "statut",
          field: "statut",
          sort: "asc",
          width: 200,
        },
        {
          label: "Action",
          field: "action",
          sort: "asc",
          width: 200,
        }
    ],
    rows: []
  });

  const [id, setid] = useState(0)

  const deleteById = async () =>{
    const result = await deleteDemande(id) 
    if(result == true){
        setsuccess_dlg(true)
        setmessage("Demande Pieces est supprimee.")
        setclassname("success");
    }else{
        setmessage(result)
        setclassname("danger");
    }
  }
  const getall = async() =>{
    let rows = []
    const demandes = await getAll();
    demandes.map( demande => {
      const obj = {
          ...demande,
          vehicule : demande.maintenanceInterne.entretien.demandeIntervention.vehicule.immatriculation ,
          maintenance: demande.maintenanceInterne.id ,
          nombrePiece : demande.piecesDemandee.length,
          statut :  <Badge pill 
                        className={`p-2 badge-soft-${demande.etat == true ? 'success'
                                 : 'danger'}`} 
                        > 
                        {demande.etat == true ? 'traitee' : 'non traitee'}
                    </Badge>,
          action :  <div> 
                      <Link to={`/demande-piece/${demande.id}`} className='mx-2 h5 text-info'>  
                        <i className='fa fa-eye'></i>
                      </Link> 
                      <Link to="#" className='mx-2 text-danger h5'>
                        <span color="primary" id="sa-success"
                          onClick={() => { setid(demande.id); setconfirm_alert(true) }}
                        >
                          <i className='bx bx-trash '></i>
                        </span>
                      </Link>
                  </div> 
      }
      rows.push(obj)
    }) 
    setData({
      ...data,
      rows : rows
    })
  }     
  useEffect( () => {
    getall();
    return () => {

    }
  }, [success_dlg])

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
            <Breadcrumbs title="Demandes Pieces" breadcrumbItem="Demandes Pièces" />
            { message != null ? <Alert color={classname} role="alert"> {message}</Alert> : null }

            <Row>
                <Col className="col-12">
                    <Card>
                      <CardHeader className='d-flex justify-content-between' >
                        <h4 className='text-secondary'>Liste des Demandes</h4>
                        <Link to='/add-demande-piece'  className='btn btn-success float-end'>
                          <i className="fa fa-plus me-2 "></i>
                          <span>Ajouter Demande</span>
                        </Link> 
                      </CardHeader>
                      <CardBody>
                          <MDBDataTable responsive striped bordered data={data} />
                      </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
        
    </React.Fragment>
  )
}

export default DemandePiece
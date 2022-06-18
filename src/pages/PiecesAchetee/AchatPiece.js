import React, {useEffect,useState} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody,CardHeader, CardTitle } from "reactstrap"
import { Link } from 'react-router-dom';
import { deletepiece_achete,getAll } from './service/Service';

import SweetAlert from "react-bootstrap-sweetalert"

function AchatPiece() {
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
          label: "Piece",
          field: "piece",
          sort: "asc",
          width: 270,
        },
        {
          label: "fournisseur",
          field: "fournisseur",
          sort: "asc",
          width: 270,
        },
        {
          label: "Quantite",
          field: "quantite",
          sort: "asc",
          width: 200,
        },
        {
          label: "Cout unitaire",
          field: "cout",
          sort: "asc",
          width: 200,
        },
        // {
        //   label: "Action",
        //   field: "action",
        //   sort: "asc",
        //   width: 200,
        // }
    ],
      rows : []
    })
    const [id, setid] = useState(0)

    const deleteById = async () =>{
      await deletepiece_achete(id) 
    }
    const getall = async() =>{
      let rows = []
      const achats = await getAll();
      achats.map( achat => {
        const obj = {
            ...achat,
            piece : achat.piece.nom ,
            fournisseur : achat.fournisseur.nom ,
            action :  <div> 
                        <Link to="#" className='mx-2 text-danger h5'>
                          <span color="primary" id="sa-success"
                            onClick={() => { setid(achat.id);setconfirm_alert(true) }}
                          >
                            <i className='bx bx-trash '></i>
                          </span>
                        </Link>
                        <Link to={`/carte-grise/${achat.id}`} className='mx-2 h5 text-info'>  
                          <i className='bx bx-edit-alt'></i>
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
            <Breadcrumbs title="Achats Pieces" breadcrumbItem="Les Pièces" />

            <Row>
                <Col className="col-12">
                    <Card>
                      <CardHeader className='d-flex justify-content-between' >
                        <h4 className='text-secondary'>Liste des Achats</h4>
                        <Link to='/add-achat'  className='btn btn-success float-end'>
                          <i className="fa fa-plus me-2 "></i>
                          <span>Ajouter Achat</span>
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

export default AchatPiece
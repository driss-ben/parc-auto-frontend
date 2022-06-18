import React,{useState,useEffect} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody,  CardHeader } from "reactstrap"
import { Link } from 'react-router-dom'
import { deletesinistre, getAll} from './service/Service'
import SweetAlert from "react-bootstrap-sweetalert"


function Sinistre() {
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
                  width: 270,
                },
                {
                  label: "Cout",
                  field: "coutMaintenance",
                  sort: "asc",
                  width: 270,
                },
                {
                  label: "pourcentageAssurer",
                  field: "pourcentageAssurer",
                  sort: "asc",
                  width: 200,
                },
                {
                  label: "date",
                  field: "date",
                  sort: "asc",
                  width: 200,
                },
                {
                  label: "action",
                  field: "action",
                  sort: "asc",
                  width: 200,
                }
              ],
              rows : []
    })

  const [id, setid] = useState(null)

  const deleteById = async () =>{
    await deletesinistre(id) 
  }
 

  const getall = async() =>{
    let rows = []
    const sinistres = await getAll();
    sinistres.map( sinistre => {
        const obj = {
            ...sinistre,
            vehicule : sinistre.vehicule.immatriculation ,
            action :  <div> 
                          <Link className='mx-2 text-danger h5'>
                            <span color="primary" id="sa-success"
                              onClick={() => { setid(sinistre.id);setconfirm_alert(true) }}
                            >
                              <i className='bx bx-trash '></i>
                            </span>
                          </Link>
                          <Link to={`/sinistres/${sinistre.id}`} className='mx-2 h5 text-info'>  
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
            <Breadcrumbs title="Sinistres" breadcrumbItem="Les Sinistres" />

            <Row>
                <Col className="col-12">
                    <Card>
                      <CardHeader className='d-flex justify-content-between' >
                        <h4 className='text-secondary'>Liste des Sinistres</h4>
                        <Link to='/add-sinistre'  className='btn btn-success float-end'>
                          <i className="fa fa-plus me-2 "></i>
                          <span>Ajouter Sinistre</span>
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

export default Sinistre

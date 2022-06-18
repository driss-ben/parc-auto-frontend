import React, {useEffect,useState} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody,CardHeader,CardTitle } from "reactstrap"
import { Link } from 'react-router-dom';
import { getAll,deleteassurance } from './service/Service';

import SweetAlert from "react-bootstrap-sweetalert"

function Assurance() {
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
          label: "Assureur",
          field: "assureur",
          sort: "asc",
          width: 270,
        },
        {
          label: "Cout",
          field: "cout",
          sort: "asc",
          width: 270,
        },
        {
          label: "date Debut",
          field: "dateDebut",
          sort: "asc",
          width: 200,
        },
        {
          label: "date Fin",
          field: "dateFin",
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
      rows : []
    })

    const [id, setid] = useState(0)

    const deleteById = async () =>{
      await deleteassurance(id) 
    }

    const getAllAssurances = async() =>{
      let rows = []
      const assurances = await getAll();
      assurances.map( assurance => {
        const obj = {
            ...assurance,
            vehicule : assurance.vehicule.immatriculation ,
            assureur : assurance.assureur.nom ,
            action :  <div> 
                        <Link to="#" className='mx-2 text-danger h5'>
                          <span color="primary" id="sa-success"
                            onClick={() => { setid(assurance.id);setconfirm_alert(true) }}
                          >
                            <i className='bx bx-trash '></i>
                          </span>
                        </Link>
                        <Link to={`/assurance/${assurance.id}`} className='mx-2 h5 text-info'>  
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
      getAllAssurances();
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
            <Breadcrumbs title="Liste" breadcrumbItem="Les assurance" />

            <Row>
                <Col className="col-12">
                    <Card>
                      <CardHeader className='d-flex justify-content-between' >
                        <h4 className='text-secondary'>Liste des assurances</h4>
                        <Link to='/add-assurance'  className='btn btn-success float-end'>
                          <i className="fa fa-plus me-2 "></i>
                          <span>Ajouter assurance</span>
                        </Link> 
                      </CardHeader>
                      <CardBody>
                          <CardTitle>Stripped example </CardTitle>
                          <MDBDataTable responsive striped bordered data={data} />
                      </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
        
    </React.Fragment>
  )
}

export default Assurance

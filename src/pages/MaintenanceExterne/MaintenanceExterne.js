import React, {useEffect,useState} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody,Alert, CardHeader } from "reactstrap"
import { Link } from 'react-router-dom';
import { deletemaintenance, getAll } from './service/Service';

import SweetAlert from "react-bootstrap-sweetalert"

function MaintenanceExterne() {
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
          label: "date Debut",
          field: "dateDebut",
          sort: "asc",
          width: 270,
        },
        {
          label: "date Fin",
          field: "dateFin",
          sort: "asc",
          width: 200,
        },
        {
          label: "cout",
          field: "cout",
          sort: "asc",
          width: 200,
        },
        {
          label: "Prestataire",
          field: "prestataire",
          sort: "asc",
          width: 200,
        },
        {
          label: "Entretien",
          field: "entretien",
          sort: "asc",
          width: 200,
        }
    ],
    rows: []
  });

  const [id, setid] = useState(0)

  const deleteById = async () =>{
    const result =  await deletemaintenance(id) 
      
      if(result == true){
          setsuccess_dlg(true)
          setmessage("Demande intervention est supprimee.")
          setclassname("success");
      }else{
          setmessage(result)
          setclassname("danger");
      }
  }
  const getall = async() =>{
    let rows = []
    const externes = await getAll();
    externes.map( externe => {
      const obj = {
          ...externe,
          vehicule : externe.entretien.demandeIntervention.vehicule.immatriculation,
          prestataire : externe.prestataire.nom ,
          entretien : externe.entretien.id
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
  }, [])

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
            <Breadcrumbs title="Maintenance Externe" breadcrumbItem="Les Maintenances Externe" />
            { message != null ? <Alert color={classname} role="alert"> {message}</Alert> : null }
            <Row>
                <Col className="col-12">
                    <Card>
                      <CardHeader className='d-flex justify-content-between' >
                        <h4 className='text-secondary'>Liste des Maintenances Externes</h4>
                        <Link to='/add-externe'  className='btn btn-success float-end'>
                          <i className="fa fa-plus me-2 "></i>
                          <span>Ajouter Maintenance Externe</span>
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

export default MaintenanceExterne

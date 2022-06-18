import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card,Table,Badge} from "reactstrap"
import React, { useState,useEffect }from 'react'
import {  useLocation } from 'react-router-dom';
import { getById, getLastContrat, getLastAssurance, getCartegrise,
  getStatistiques, getAllAssurancesByVehicule, getAllVignettesByVehicule,
  getAllMInternesByVehicule, getAllMExternesByVehicule, getConsommationTotal
  } from './service/Service';
import Chartapex from "./LineChart";

function ExploreVehicule(props) {

  const id = useLocation().pathname.split('/')[useLocation().pathname.split('/').length-1]
  const [vehicule, setvehicule] = useState({});
  const [assurance, setassurance] = useState({})
  const [contrat, setcontrat] = useState({})
  const [statistiques, setstatistiques] = useState([])
  const [cartegrise, setcartegrise] = useState({})
  const [Nbrassurances, setNbrassurances] = useState(null)
  const [NbrVignettes, setNbrVignettes] = useState(null)
  const [NbrnMIterne, setNbrnMIterne] = useState(null)
  const [NbrnMExterne, setNbrnMExterne] = useState(null)
  const [total, settotal] = useState(null)
  



  const getbyId = async () =>{
      const myvehicule = await getById(id)
      setvehicule({
            ...myvehicule
      })
  }
  const getlastContrat = async () =>{
    const mycontrat = await getLastContrat(id)
    setcontrat({
          ...mycontrat
    })
}
  const getlastAssurance = async () =>{
    const myassurance = await getLastAssurance(id)
    setassurance({
          ...myassurance
    })
  }
  const getcartegrise = async () =>{
    const mycarte = await getCartegrise(id)
    setcartegrise({
          ...mycarte
    })
  }
  const getstatistiques = async () =>{
    const result = await getStatistiques(Number(id))
    setstatistiques([
       ...result
    ]     
   )}
   const getNombreassurances = async () =>{
    const result = await getAllAssurancesByVehicule(id)
    setNbrassurances(result.length)
   }
   const getNombreVignettes = async () =>{
    const result = await getAllVignettesByVehicule(id)
    setNbrVignettes(result.length)
   }
   const getNombreMInterne = async () =>{
    const result = await getAllMInternesByVehicule(id)
    setNbrnMIterne(result.length)
   }
   const getNombreMExterne = async () =>{
    const result = await getAllMExternesByVehicule(id)
    setNbrnMExterne(result.length)
   }

   const getconsommationTotal= async () =>{
    const result = await getConsommationTotal(id)
    settotal(result)
   }
  useEffect(() => {
      getbyId()
      getlastContrat()
      getlastAssurance()
      getcartegrise()
      getstatistiques()
      getNombreassurances()
      getNombreVignettes()
      getNombreMInterne()
      getNombreMExterne()
      getconsommationTotal()
  return () => {
      
  }
  }, [])

  return (
    <React.Fragment>
        <div className="page-content">
            <Breadcrumbs title="Vehicules" breadcrumbItem="Les Vehicules" />

            <Row>
              <Card className='p-0'>
                <Row>
                  <Col className='mb-4'>
                    <h1 className='px-lg-5 px-3 py-2 h5 text-light bg-primary'>Vehicule</h1>
                    
                    <div className="mx-lg-5 my-4">
                      <Row className='m-2'>
                        <Col>Immatricule</Col>
                        <Col>{vehicule.immatriculation}</Col>
                      </Row>
                      <Row className='m-2'>
                        <Col>Marque</Col>
                        <Col>{vehicule.marque}</Col>
                      </Row>
                      <Row className='m-2'>
                        <Col>Model</Col>
                        <Col>{vehicule.modele}</Col>
                      </Row>
                      <Row className='m-2'>
                        <Col>type</Col>
                        <Col>{vehicule.type}</Col>
                      </Row>
                      <Row className='m-2'>
                        <Col>kilometrage</Col>
                        <Col>{vehicule.kilometrage}</Col>
                      </Row> 

                      <Row className='m-2'>
                        <Col>reservoire</Col>
                        <Col>{vehicule.capaciteReservoir} L</Col>
                      </Row> 
                      <Row className='m-2'>
                        <Col>categorie permis</Col>
                        <Col>{vehicule.categoriePermis}</Col>
                      </Row> 
                      <Row className='m-2'>
                        <Col>couleur</Col>
                        <Col>{vehicule.couleur}</Col>
                      </Row> 
                      <Row className='m-2'>
                        <Col>date entree au parc</Col>
                        <Col>{vehicule.dateEntreeParc}</Col>
                      </Row> 
                      <Row className='m-2'>
                        <Col>date mise en circulation</Col>
                        <Col>{vehicule.dateMiseCirculation}</Col>
                      </Row> 
                      <Row className='m-2'>
                        <Col>gamme</Col>
                        <Col>{vehicule.gamme}</Col>
                      </Row> 
                      <Row className='m-2'>
                        <Col>carburant</Col>
                        <Col>{vehicule.typeCarburant}</Col>
                      </Row> 
                      <Row className='m-2 mb-5'>
                        <Col>poids vide</Col>
                        <Col>{vehicule.poidsVide}</Col>
                      </Row>       
                                  
                    </div>

                  </Col>
                </Row>

                <Row>
                    <Col className='mb-4'>
                      <h1 className='px-lg-5 px-3 py-2 h5 text-light bg-primary'>Statistiques</h1> 
                          <div className="mx-lg-5 my-4">
                            <Row className='m-2'>
                              <Col md={4} className="p-3">
                                <Table className="table">
                                  <tbody>
                                    <tr>
                                      <td >assurances</td>
                                      <td> <Badge pill className="badge-soft-danger h6">{Nbrassurances}</Badge> </td>
                                    </tr>
                                    <tr>
                                      <td>Vignettes</td>
                                      <td> <Badge pill className="badge-soft-primary h6">{NbrVignettes}</Badge> </td>
                                    </tr>
                                    <tr>
                                      <td >M. internes</td>
                                      <td> <Badge pill className="badge-soft-success h6">{NbrnMIterne}</Badge> </td>
                                    </tr>
                                    <tr>
                                      <td >M. externes</td>
                                      <td> <Badge pill className="badge-soft-warning h6">{NbrnMExterne}</Badge> </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </Col>
                              <Col md={8} className="p-3">
                                <Chartapex data = {statistiques} />
                              </Col>
                            </Row>
                            <Row className='m-2'>
                              <Col>Consommation total</Col>
                              <Col><b>{total}</b></Col>
                            </Row>
                          </div>
                        
                    </Col>

                </Row>
                        
                        

                      
                <Row>
                  <Col className='mb-4'>
                    <h1 className='px-5 py-2 h5 text-light bg-primary'>assurance actuelle</h1>
                    
                    <div className="mx-5 my-4">
                      <Row className='m-2'>
                        <Col>Date debut</Col>
                        <Col>{assurance.dateDebut}</Col>
                      </Row>
                      <Row className='m-2'>
                        <Col>Date d'expiration</Col>
                        <Col>{assurance.dateFin}</Col>
                      </Row>
                      <Row className='m-2'>
                        <Col>Montant Total</Col>
                        <Col>{assurance.cout}</Col>
                      </Row>
                      <Row className='m-2'>
                        <Col>Validitee territoire</Col>
                        <Col>{assurance.territoire}</Col>
                      </Row> 
                      <Row className='m-2'>
                        <Col>Assureur</Col>
                        <Col>{assurance.assureur !== undefined ? assurance.assureur.nom : '' }</Col>
                      </Row>
                      <Row className='m-2'>
                        <Col>Email</Col>
                        <Col>{ assurance.assureur !== undefined ?assurance.assureur.email : ''}</Col>
                      </Row>
                      <Row className='m-2'>
                        <Col>Adresse</Col>
                        <Col>{ assurance.assureur !== undefined ? assurance.assureur.adresse : ''}</Col>
                      </Row>   
                    </div>                 
                  </Col>
                </Row>
                
                <Row>
                  <Col className='mb-4'>
                    <h1 className='px-5 py-2 h5 text-light bg-primary'>Contrat</h1>
                    
                    <div className="mx-5 my-4">
                      <Row className='m-2'>
                        <Col>N Contrat</Col>
                        <Col>{contrat.numContrat}</Col>
                      </Row>
                      <Row className='m-2'>
                        <Col>Date contrat</Col>
                        <Col>{contrat.dateContrat}</Col>
                      </Row>
                      <Row className='m-2'>
                        <Col>date Echeance (leasing or LLD )</Col>
                        <Col>{contrat.dateEcheance}</Col>
                      </Row>
                      <Row className='m-2'>
                        <Col>Montant</Col>
                        <Col>{contrat.montant}</Col>
                      </Row>
                      <Row className='m-2'>
                        <Col>Type</Col>
                        <Col>{contrat.type}</Col>
                      </Row>
                      {/* <Row className='m-2'>
                        <Col>loyer monsuel</Col>
                        <Col>87668</Col>
                      </Row>
                      <Row className='m-2'>
                        <Col>tva</Col>
                        <Col>10%</Col>
                      </Row>
                      <Row className='m-2'>
                        <Col>montant hors taxe</Col>
                        <Col>4444</Col>
                      </Row>
                      <Row className='m-2'>
                        <Col>Montant ttc</Col>
                        <Col>HJ87668</Col>
                      </Row>
                      <Row className='m-2'>
                        <Col>Kilometrage debut</Col>
                        <Col>2000</Col>
                      </Row> */}
                      
                    </div>

                  </Col>
                </Row>

                <Row>
                  <Col className='mb-4'>
                    <h1 className='px-5 py-2 h5 text-light bg-primary'>Carte grise</h1>
                    
                    <div className="mx-5 my-4">
                      <Row className='m-2'>
                        <Col>N° Serie</Col>
                        <Col>{cartegrise.numeroSerie}</Col>
                      </Row>
                      <Row className='m-2'>
                        <Col>date d'operation</Col>
                        <Col>{cartegrise.dateOperation}</Col>
                      </Row>
                      <Row className='m-2'>
                        <Col>Proprietaire</Col>
                        <Col>{cartegrise.proprietaire}</Col>
                      </Row>   
                    </div>                 
                  </Col>
                </Row>




              </Card>
            </Row>
        </div>
        
    </React.Fragment>
  )
}

export default ExploreVehicule
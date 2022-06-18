import React,{useState,useEffect} from "react"
import { Row, Col, CardBody, Card, Progress } from "reactstrap"
import * as data  from './service/Service'

const Dashboard = () => {
  const [pieces, setpieces] = useState(0)
  const [huiles, sethuiles] = useState(0)
  const [pneux, setpneux] = useState(0)
  const [vehicules, setvehicules] = useState(0)
  const [assurances, setassurances] = useState(0)
  const [assureurs, setassureurs] = useState(0)
  const [entretiens, setentretiens] = useState(0)
  const [fournisseurs, setfournisseurs] = useState(0)
  const [achats, setachats] = useState(0)
  const [contrats, setcontrats] = useState(0)
  const [vignetts, setvignetts] = useState(0)
  const [internes, setinternes] = useState(0)
  const [externes, setexternes] = useState(0)
  const [vidanges, setvidanges] = useState(0)
  const [pneumatiques, setpneumatiques] = useState(0)

  useEffect(() => {
    const getNbPieces = async() =>{
        await data.getAllPieces()
          .then(res => {
            setpieces(res.length)
          })
    }
    getNbPieces()

    const getNbVehicule = async() =>{
        await data.getAllVehiciles()
          .then(res => {
            setvehicules(res.length)
          })
    }
    getNbVehicule()

    const getNbHuiles = async() =>{
        await data.getAllHuiles()
          .then(res => {
            sethuiles(res.length)
          })
    }
    getNbHuiles()

    const getNbPneux = async() =>{
      await data.getAllPneux()
        .then(res => {
          setpneux(res.length)
        })
    }
    getNbPneux()

    const getNbassurances = async() =>{
        await data.getAllassurances()
          .then(res => {
            setassurances(res.length)
          })
    }
    getNbassurances()

    const getNbAssureurs = async() =>{
      await data.getAllAssureurs()
        .then(res => {
          setassureurs(res.length)
        })
  }
  getNbAssureurs()


  const getNbFournisseurs = async() =>{
      await data.getAllFournisseus()
        .then(res => {
          setfournisseurs(res.length)
        })
  }
  getNbFournisseurs()


  const getNbEntretiens = async() =>{
    await data.getAllEntretiens()
      .then(res => {
        setentretiens(res.length)
      })
  }
  getNbEntretiens()

  const getNbAchats = async() =>{
    await data.getAllAchats()
      .then(res => {
        setachats(res.length)
      })
  }
  getNbAchats()

  const getNbContrats = async() =>{
    await data.getAllContrats()
      .then(res => {
        setcontrats(res.length)
      })
  }
  getNbContrats()

  const getNbVignettes = async() =>{
    await data.getAllVignettes()
      .then(res => {
        setvignetts(res.length)
      })
  }
  getNbVignettes()

  const getNbInternes = async() =>{
    await data.getAllInternes()
      .then(res => {
        setinternes(res.length)
      })
  }
  getNbInternes()

  const getNbExternes = async() =>{
    await data.getAllExternes()
      .then(res => {
        setexternes(res.length)
      })
  }
  getNbExternes()

  const getNbPneumatiques = async() =>{
    await data.getAllPneumatiques()
      .then(res => {
        setpneumatiques(res.length)
      })
  }
  getNbPneumatiques()

  const getNbVidanges = async() =>{
    await data.getAllVidanges()
      .then(res => {
        setvidanges(res.length)
      })
  }
  getNbVidanges()

   
    return () => {
      
    }
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
  
         <Row>
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="page-title mb-0 font-size-18">Dashboard</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">Welcome </li>
                </ol>
              </div>

            </div>
          </div>
        </Row> 

        <Row>
          <Col lg='12'>
              <h5 className="px-lg-5 px-3 py-2 h5 text-light bg-primary">Stock</h5>
          </Col>
          <Col md={4}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="avatar-sm font-size-20 me-3">
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="fas fa-dot-circle"></i>
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-16 mt-2">Pneus</div>

                  </div>
                </div>
                <h4 className="mt-4">{pneux}</h4>
                <Row>
                  
                  <div className=" align-self-center">
                    <Progress
                      value="100"
                      color="success"
                      className="bg-transparent progress-sm"
                      size="sm"
                    />
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="avatar-sm font-size-20 me-3">
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="fas fa-wrench"></i>
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-16 mt-2">Pieces</div>
                  </div>
                </div>
                <h4 className="mt-4">{pieces}</h4>
                <div className="row">
                  <div className=" align-self-center">
                      <Progress
                        value="100"
                        color="info"
                        className="bg-transparent progress-sm"
                        size="sm"
                      />
                    </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="avatar-sm font-size-20 me-3">
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="fas fa-gas-pump"></i>
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-16 mt-2">Huiles</div>

                  </div>
                </div>
                <h4 className="mt-4">{huiles}</h4>
                <div className="row">
                  <div className=" align-self-center">
                      <Progress
                        value="100"
                        color="primary"
                        className="bg-transparent progress-sm"
                        size="sm"
                      />
                    </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg='12'>
              <h5 className="px-lg-5 px-3 py-2 h5 text-light bg-primary">Fournisseurs et Achats</h5>
          </Col>
          <Col md={6}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="avatar-sm font-size-20 me-3">
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="fa fa-users"></i>
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-16 mt-2">Fournisseurs</div>
                  </div>
                </div>
                <h4 className="mt-4">{fournisseurs}</h4>
                <div className="row">
                  <div className=" align-self-center">
                      <Progress
                        value="100"
                        color="primary"
                        className="bg-transparent progress-sm"
                        size="sm"
                      />
                    </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col md={6}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="avatar-sm font-size-20 me-3">
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="fas fa-users"></i>
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-16 mt-2">Achats</div>

                  </div>
                </div>
                <h4 className="mt-4">{achats}</h4>
                <Row>
                  
                  <div className=" align-self-center">
                    <Progress
                      value="100"
                      color="success"
                      className="bg-transparent progress-sm"
                      size="sm"
                    />
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>

        
        </Row>

        <Row>
          <Col lg='12'>
              <h5 className="px-lg-5 px-3 py-2 h5 text-light bg-primary">Juridiques</h5>
          </Col>
          <Col md={4}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="avatar-sm font-size-20 me-3">
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                    <i className="fas fa-file"></i>
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-16 mt-2">Contrats</div>
                  </div>
                </div>
                <h4 className="mt-4">{contrats}</h4>
                <div className="row">
                  <div className=" align-self-center">
                      <Progress
                        value="100"
                        color="primary"
                        className="bg-transparent progress-sm"
                        size="sm"
                      />
                    </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="avatar-sm font-size-20 me-3">
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                    <i className="fas fa-file"></i>
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-16 mt-2">Vignettes</div>

                  </div>
                </div>
                <h4 className="mt-4">{vignetts}</h4>
                <Row>
                  
                  <div className=" align-self-center">
                    <Progress
                      value="100"
                      color="success"
                      className="bg-transparent progress-sm"
                      size="sm"
                    />
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="avatar-sm font-size-20 me-3">
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="fas fa-file"></i>
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-16 mt-2">Assurances</div>
                  </div>
                </div>
                <h4 className="mt-4">{assurances}</h4>
                <div className="row">
                  <div className=" align-self-center">
                      <Progress
                        value="100"
                        color="info"
                        className="bg-transparent progress-sm"
                        size="sm"
                      />
                    </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col lg='12'>
              <h5 className="px-lg-5 px-3 py-2 h5 text-light bg-primary">Interventions</h5>
          </Col>
          <Col md={3}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="avatar-sm font-size-20 me-3">
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                    <i className="fas fa-gas-pump"></i>
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-16 mt-2">Vidanges</div>
                  </div>
                </div>
                <h4 className="mt-4">{vidanges}</h4>
                <div className="row">
                  <div className=" align-self-center">
                      <Progress
                        value="100"
                        color="primary"
                        className="bg-transparent progress-sm"
                        size="sm"
                      />
                    </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col md={3}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="avatar-sm font-size-20 me-3">
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="fas fa-dot-circle"></i>
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-16 mt-2">Pneumatiques</div>

                  </div>
                </div>
                <h4 className="mt-4">{pneumatiques}</h4>
                <Row>
                  
                  <div className=" align-self-center">
                    <Progress
                      value="100"
                      color="success"
                      className="bg-transparent progress-sm"
                      size="sm"
                    />
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col md={3}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="avatar-sm font-size-20 me-3">
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                    <i className="fas fa-wrench"></i>
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-16 mt-2">M. internes</div>
                  </div>
                </div>
                <h4 className="mt-4">{internes}</h4>
                <div className="row">
                  <div className=" align-self-center">
                      <Progress
                        value="100"
                        color="info"
                        className="bg-transparent progress-sm"
                        size="sm"
                      />
                    </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="avatar-sm font-size-20 me-3">
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="fas fa-wrench"></i>
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-16 mt-2">M. externes</div>
                  </div>
                </div>
                <h4 className="mt-4">{externes}</h4>
                <div className="row">
                  <div className=" align-self-center">
                      <Progress
                        value="100"
                        color="primary"
                        className="bg-transparent progress-sm"
                        size="sm"
                      />
                    </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
         

      </div>
    </React.Fragment>
  )
}

export default Dashboard
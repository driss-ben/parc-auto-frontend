import React, {useEffect,useState} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody,Button,Label,Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { attributes1, attributes2 } from "./Service/AttributsVisiteTechniques";
import { updatevisite, getAllVehicules,getById } from "./Service/Service";
import  Select  from "react-select";
import {useLocation} from 'react-router-dom'
function UpdateVisiteTechnique() {

    const id = useLocation().pathname.split('/')[useLocation().pathname.split('/').length-1]

    const [visite, setvisite] = useState({
      id : id ,
      vehicule : { id : null },
      agentTechnique : null,
      kilometrage : 0,
      date : null,
      phares : null,
      feuxArrieres : null,
      feuxFreinage : null,
      lumiereSacGonflable : null,
      signauxVirage : null,
      instrumentsTableauBord : null,
      eclairageInterierDome : null,
      freins : null,
      horn : null,
      systemEchappement : null,
      retroviseur : null,
      essuisGlaces : null,
      fenetreElectrique : null,
      barreLumiereAeriene : null,
      lumiereUrgenceInterieur : null,
      spotLamp : null,
      clinOeillePhares : null,
      freinageSecours : null,
      frontCornerStrobes : null,
      arrowStrick : null,
      claxon : null,
      lampeEcrire : null,
      sortie3trous : null,
      boiteControl : null,
      computer : null,
      shotgunRack : null,
      alleyLight : null,
      videoSurveillance : null,
      microphoneBox : null,
      radioUrgences : null,
    })

    const [message, setmessage] = useState(null)
    const [classname, setclassname] = useState(null)

    const [selectedGroup, setselectedGroup] = useState(null);
    const [vehiculeoptions, setvehiculeoptions] = useState([])
    const getallVehicules = async () =>{   
      const vehicules = await getAllVehicules()
      let rows = []
      vehicules.map(vehicule => {
          const objet = {label : vehicule.immatriculation, value : vehicule.id}
          rows.push(objet)
      })
      setvehiculeoptions(rows)
    }
    function handleSelectGroup(selectedGroup) {
      setselectedGroup(selectedGroup);
      setvisite({
          ...visite,
          vehicule : {
              id :  selectedGroup !== null ? selectedGroup.value : null
          }
      })
    }
    const optionGroup = [ { label: "Vehicules", options: vehiculeoptions } ];

    const handleChange = (e) => {
      setvisite({
          ...visite,
          [e.target.name] : e.target.value,
      })
    }

    const handleCheck = (e) => {
      setvisite({
          ...visite,
          [e.target.name] : e.target.value=='1' ? true : false,
      })
    }

    const getbyId = async () =>{
      const myvisite = await getById(id)
      setvisite({
          ...visite,
            ...myvisite
      })
      
      setselectedGroup({label : myvisite.vehicule.immatriculation , value : myvisite.vehicule.id})
  }

    const handleSubmit = async () => {
      const result = await updatevisite(visite)
      
      if(result == true){
          setmessage("la visite technique actuelle est modifiee")
          setclassname("success");
      }else{
          setmessage(result)
          setclassname("danger");
      }
    }

    useEffect(() => {
      getallVehicules()
      getbyId()
    return () => {}
    }, [])

  return (
    <React.Fragment>
        <div className="page-content">
        
            <Breadcrumbs title="Ajout" breadcrumbItem="Les Visites Technique" />
            { message != null ? <Alert color={classname} role="alert"> {message}</Alert> : null }
            <Row>
                <Col className="col-12">
                    <Card>
                    <CardBody>
                        <AvForm className="needs-validation" onValidSubmit={handleSubmit}>
                          <Row>
                            <Col md="3">
                                <div className="mb-3">
                                <Label htmlFor="vehicule">Vehicule</Label>
                                <Select
                                    value={selectedGroup!==null ? selectedGroup : 
                                      {label : visite.vehicule.immatriculation, value : visite.vehicule.id }}
                                    onChange={
                                        handleSelectGroup
                                    }
                                    options={optionGroup}
                                    classNamePrefix="select2-selection"
                                />
                                </div>
                            </Col>
                            
                            <Col md="3">
                                <div className="mb-3">
                                <Label htmlFor="montantPrincipal">Agent Technique</Label>
                                <AvField
                                    name="agentTechnique"
                                    placeholder="agent technique"
                                    type="text"
                                    value = { visite.agentTechnique}
                                    onChange = {handleChange}
                                    errorMessage="entrer agent technique."
                                    className="form-control"
                                    validate={{ 
                                        required: { value: true },
                                    }}
                                    id="agentTechnique"
                                />
                                </div>
                            </Col>

                            <Col md="3">
                                <div className="mb-3">
                                <Label htmlFor="kilometrage">kilometrage</Label>
                                <AvField
                                    name="kilometrage"
                                    placeholder="kilometrage"
                                    type="text"
                                    value = { visite.kilometrage}
                                    validate={{ 
                                        required: { value: true },
                                        pattern : { 
                                            value : /^\d+(\.\d{1,2})?$/ ,
                                            errorMessage:'format invalide'},
                                        }}
                                    errorMessage="kilometrage"
                                    onChange={handleChange}
                                    className="form-control"
                                    id="kilometrage"
                                />
                                </div>
                            </Col>

                            <Col md="3">
                                <div className="mb-3">
                                <Label htmlFor="date">Date </Label>
                                <AvField
                                    name="date"
                                    placeholder="date Debut du visite"
                                    type="date"
                                    value = { visite.date}
                                    onChange = {handleChange}
                                    errorMessage="entrer la date de visite"
                                    className="form-control"
                                    validate={{ required: { value: true } }}
                                    id="date"
                                />
                                </div>
                            </Col>
                            </Row>
                            <Row>
                                <Col lg='6'>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>bon</th>
                                                <th>a reviser</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                attributes1.map(attr => {
                                                    const key = visite[`${attr.name}`]
                                                    
                                                    return(
                                                        <tr key={attr.id}>
                                                            <td>{attr.label}</td>
                                                            <td> 
                                                              <input onChange={handleCheck} 
                                                               className='form-check-input'
                                                                checked = {key===true ? true : false}
                                                                type="radio" name={attr.name} value='1' /> 
                                                            </td>
                                                            <td> 
                                                              <input onChange={handleCheck} 
                                                               className='form-check-input'
                                                                checked = {key===false ? true : false}
                                                                type="radio" name={attr.name} value='0' /> 
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            
                                        </tbody>
                                    </table>
                                </Col>

                                <Col lg='6'>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>bon</th>
                                                <th>a reviser</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                attributes2.map(attr => {
                                                  const key = visite[`${attr.name}`]
                                                    return(
                                                        <tr key={attr.id}>
                                                             <td>{attr.label}</td>
                                                              <td> 
                                                                <input onChange={handleCheck} 
                                                                 className='form-check-input'
                                                                  checked = {key==true ? true : false}
                                                                  type="radio" name={attr.name} value='1' /> 
                                                              </td>
                                                              <td> 
                                                                <input onChange={handleCheck} 
                                                                 className='form-check-input'
                                                                  checked = {key==false ? true : false}
                                                                  type="radio" name={attr.name} value='0' /> 
                                                              </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </Col>

                            </Row>
                            <Row>
                                <Button className='bg-primary' type='submit'>Modifier Visite Technique</Button>
                            </Row>
                        </AvForm>
                    </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    </React.Fragment>
  )
}

export default UpdateVisiteTechnique
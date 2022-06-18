import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Row, Col, Collapse } from "reactstrap"
import { Link, withRouter } from "react-router-dom"
import classname from "classnames"

//i18n
import { withTranslation } from "react-i18next"

import { connect } from "react-redux"

const Navbar = props => {
  const [stock, setstock] = useState(false)
  const [vehicule, setvehicule] = useState(false)
  const [juridique, setjuridique] = useState(false)
  const [personnel, setpersonnel] = useState(false)
  const [assurance, setassurance] = useState(false)
  const [operation, setoperation] = useState(false)
  const [intervention, setintervention] = useState(false)


  useEffect(() => {
    var matchingMenuItem = null
    var ul = document.getElementById("navigation")
    var items = ul.getElementsByTagName("a")
    for (var i = 0; i < items.length; ++i) {
      if (props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  })
  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    if (parent) {
      parent.classList.add("active") // li
      const parent2 = parent.parentElement
      parent2.classList.add("active") // li
      const parent3 = parent2.parentElement
      if (parent3) {
        parent3.classList.add("active") // li
        const parent4 = parent3.parentElement
        if (parent4) {
          parent4.classList.add("active") // li
          const parent5 = parent4.parentElement
          if (parent5) {
            parent5.classList.add("active") // li
            const parent6 = parent5.parentElement
            if (parent6) {
              parent6.classList.add("active") // li
            }
          }
        }
      }
    }
    return false
  }

  return (
    <React.Fragment>
      <div className="topnav">
        <nav
          className="navbar navbar-light navbar-expand-lg topnav-menu"
          id="navigation"
        >
          <Collapse
            isOpen={props.leftMenu}
            className="navbar-collapse"
            id="topnav-menu-content"
          >
            <ul className="navbar-nav">
              

              <li className="nav-item dropdown">
                <Link
                  to="/#"
                  onClick={e => {
                    e.preventDefault()
                    setstock(!stock)
                  }}
                  className="nav-link dropdown-toggle arrow-none"
                >
                  {props.t("Stock")} <div className="arrow-down"></div>
                </Link>
                <div
                className={classname("dropdown-menu", { show: stock })}
                  
                >
                 
                    <Col>
                      <div>
                        
                          <Link to="/pieces"  className="dropdown-item">{props.t("Pieces")}</Link>
                          <Link to="/huile"  className="dropdown-item">{props.t("Huile")}</Link>
                          <Link to="/pneu"   className="dropdown-item">{props.t("Pneus")}</Link>
                          <Link to="/piece-achetee"  className="dropdown-item">
                              <span>{props.t("Achats")}</span>
                          </Link>
                
                      </div>
                    </Col>
                    
                 
                </div>
              </li>

              <li className="nav-item dropdown">
                <Link to="/vehicule" className="nav-link dropdown-toggle arrow-none">
                  <span>{props.t("Vehicules")}</span>
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link
                  to="/#"
                  className="nav-link dropdown-toggle arrow-none"
                  onClick={e => {
                    e.preventDefault()
                    setjuridique(!juridique)
                  }}
                >
                  {props.t("Juridiques")} <div className="arrow-down"></div>
                </Link>
                <div
                  className={classname("dropdown-menu", { show: juridique })}
                >
                  
                  <Link to="/contrat"  className="dropdown-item">
                    {/* <i className="fas fa-file"></i> */}
                    <span>{props.t("Contrat")}</span>
                  </Link>
                
                  <Link to="/vignette" className="dropdown-item">
                    {/* <i className="fas fa-file-alt"></i> */}
                    <span>{props.t("Vignette")}</span>
                  </Link>
                
                  <Link to="/carte-grise" className="dropdown-item">
                    {/* <i className="fas fa-file-invoice"></i> */}
                    <span>{props.t("Carte Grise")}</span>
                  </Link>
                  
                </div>
              </li>

              <li className="nav-item dropdown">
                <Link
                  to="/#"
                  className="nav-link dropdown-toggle arrow-none"
                  onClick={e => {
                    e.preventDefault()
                    setassurance(!assurance)
                  }}
                >
                  {props.t("Assurances")} <div className="arrow-down"></div>
                </Link>
                <div
                  className={classname("dropdown-menu", { show: assurance })}
                >
                 
                  <Link to="/assurance"  className="dropdown-item">{props.t("Assurances")}</Link>
                
                  <Link to="/assureur"  className="dropdown-item">{props.t("Assureurs")}</Link>
                
                  <Link to="/sinistre"  className="dropdown-item" >{props.t("Sinistres")}</Link>
                
                  
                </div>
              </li>


              <li className="nav-item dropdown">
                <Link
                  to="/#"
                  className="nav-link dropdown-toggle arrow-none"
                  onClick={e => {
                    e.preventDefault()
                    setoperation(!operation)
                  }}
                >
                  {props.t("Operations")} <div className="arrow-down"></div>
                </Link>
                <div
                  className={classname("dropdown-menu", { show: operation })}
                >
                 
                  <Link to="/vidange" className="dropdown-item">
                    {/* <i className="fas fa-search"></i> */}
                    <span>{props.t("Vidange")}</span>
                  </Link>
               
                  <Link to="/pneumatique" className="dropdown-item">
                    {/* <i className="fas fa-search"></i> */}
                    <span>{props.t("Penumatique")}</span>
                  </Link>
                
                  
                </div>
              </li>

              <li className="nav-item dropdown">
                <Link
                  to="/#"
                  className="nav-link dropdown-toggle arrow-none"
                  onClick={e => {
                    e.preventDefault()
                    setpersonnel(!personnel)
                  }}
                >
                  {props.t("Personnel")} <div className="arrow-down"></div>
                </Link>
                <div
                  className={classname("dropdown-menu", { show: personnel })}
                >
                 
                  <Link to="/fournisseurs" className="dropdown-item" >
                    <span>{props.t("Fournisseurs")}</span>
                  </Link>
                  <Link to="/prestataire" className="dropdown-item" >{props.t("Prestataires")}</Link>
                  
                </div>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle arrow-none"
                  to="#"
                  onClick={e => {
                    e.preventDefault()
                    setintervention(!intervention)
                  }}
                >
                  {props.t("Interventions")} <div className="arrow-down"></div>
                </Link>

                <div className={classname("dropdown-menu mega-dropdown-menu px-2 dropdown-mega-menu-lg dropdown-menu-right", { show: intervention })}>

                  <Row>
                    <Col lg={4}>
                      <div>

                        <Link to="/demande-intervention" className="dropdown-item">
                            {/* <i className="fas fa-file-invoice"></i> */}
                            <span>{props.t("D.Intervention")}</span>
                          </Link>
                      
                          <Link to="/entretien" className="dropdown-item">
                            {/* <i className="fas fa-search"></i> */}
                            <span>{props.t("Entretien")}</span>
                          </Link>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div>

                       
                        <Link to="/interne" className="dropdown-item">{props.t("M.internes")}</Link>
                      
                        <Link to="/demande-piece" className="dropdown-item" >{props.t("Demande Piece")}</Link>
                   
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div>
                          <Link to="/externe" className="dropdown-item">{props.t("M.externes")}</Link>
                        
                      </div>
                    </Col>
                  </Row>
                </div>
              </li>
            </ul>
          </Collapse>
        </nav>
      </div>
    </React.Fragment>
  )
}

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout
  return { leftMenu }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Navbar))
)
import PropTypes from "prop-types"
import React, { useEffect, useRef , useCallback} from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const ref = useRef()
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }
    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement
      if (parent2) {
        parent2.classList.add("mm-show") // ul tag
        const parent3 = parent2.parentElement // li tag
        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false
    }
    scrollElement(item);
    return false
  }, []);
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname
    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname, activateParentDropdown])
  useEffect(() => {
    ref.current.recalculate()
  }, []);
  const scrollElement = (item) => {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  

  return (
    <React.Fragment>
      <SimpleBar ref={ref} className="vertical-simplebar">
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            


            {/* My Routes */}

            <li>
              <Link to="/dashboard" >
                <i className="fa fa-home"></i>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>

            <li>
              <Link to="/" className="has-arrow waves-effect">
                <i className="fas fa-landmark"></i>
                <span>{props.t("Stock")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/pieces">{props.t("Pieces")}</Link>
                </li>
                <li>
                  <Link to="/huile">{props.t("Huile")}</Link>
                </li>
                <li>
                  <Link to="/pneu" >{props.t("Pneus")}</Link>
                </li>
                <li>
                  <Link to="/piece-achetee">
                    <span>{props.t("Achats")}</span>
                  </Link>
                </li>
              </ul>
            </li>
            
            <li>
                <Link to="/vehicule" >
                  <i className="fa fa-truck"></i>
                  <span>{props.t("Vehicules")}</span>
                </Link>
            </li>
            <li>
              <Link to="/" className="has-arrow waves-effect">
                <i className="fa fa-file"></i>
                <span>{props.t("Juridiques")}</span>
              </Link>
              <ul className="sub-menu">
               
                <li>
                  <Link to="/contrat" className="waves-effect">
                    {/* <i className="fas fa-file"></i> */}
                    <span>{props.t("Contrat")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/vignette" className="waves-effect">
                    {/* <i className="fas fa-file-alt"></i> */}
                    <span>{props.t("Vignette")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/carte-grise" className="waves-effect">
                    {/* <i className="fas fa-file-invoice"></i> */}
                    <span>{props.t("Carte Grise")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/visite-technique" className="waves-effect">
                    {/* <i className="fas fa-file-invoice"></i> */}
                    <span>{props.t("Visite Techniques")}</span>
                  </Link>
                </li>
              </ul>
            </li>



           
            <li>
              <Link to="/" className="has-arrow waves-effect">
                <i className="fas fa-file-invoice"></i>
                <span>{props.t("Assurances")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/assurance">{props.t("Assurances")}</Link>
                </li>
                <li>
                  <Link to="/assureur">{props.t("Assureurs")}</Link>
                </li>
                <li>
                  <Link to="/sinistre" >{props.t("Sinistres")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/" className="has-arrow waves-effect">
                <i className="fas fa-wrench"></i>
                <span>{props.t("Interventions")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/demande-intervention" className="waves-effect">
                    {/* <i className="fas fa-file-invoice"></i> */}
                    <span>{props.t("Demande Intervention")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/entretien" className="waves-effect">
                    {/* <i className="fas fa-search"></i> */}
                    <span>{props.t("Entretien")}</span>
                  </Link>
                </li>
                
                <li>
                  <Link to="/" className="has-arrow waves-effect">
                    {/* <i className="fas fa-wrench"></i> */}
                    <span>{props.t("M. Interne")}</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/interne">{props.t("Liste des Maintenances")}</Link>
                    </li>
                    <li>
                      <Link to="/demande-piece" >{props.t("Demande Piece")}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/" className="has-arrow waves-effect">
                    {/* <i className="fas fa-route"></i> */}
                    <span>{props.t("M. Externe")}</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/externe">{props.t("Liste des Maintenances")}</Link>
                    </li>
                    <li>
                      <Link to="/prestataire">{props.t("Prestataires")}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/" className="has-arrow waves-effect">
                <i className="fas fa-cog"></i>
                <span>{props.t("Operations")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/vidange" className="waves-effect">
                    {/* <i className="fas fa-search"></i> */}
                    <span>{props.t("Vidange")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/pneumatique" className="waves-effect">
                    {/* <i className="fas fa-search"></i> */}
                    <span>{props.t("Penumatique")}</span>
                  </Link>
                </li>
              </ul>
            </li>


            <li>
              <Link to="/fournisseurs" >
                <i className="fa fa-users"></i>
                <span>{props.t("Fournisseurs")}</span>
              </Link>
            </li>

          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
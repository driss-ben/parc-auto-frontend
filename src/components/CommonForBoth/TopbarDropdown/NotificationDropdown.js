import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import {DOMAIN} from '../../../constants/Domain'
import SimpleBar from "simplebar-react"


//i18n
import { withTranslation } from "react-i18next"
import axios from "axios"

const NotificationDropdown = props => {

  const config = {
    headers : {
        'authentication' : localStorage.getItem('authorization')
    }
  }

  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)
  const [load, setload] = useState(true)
  const [nbrNotifications, setnbrNotifications] = useState(0)
  const [notifications, setnotifications] = useState([])

  const allNotifications = async () =>{
    await axios.get(DOMAIN + '/api/notification',config)
     .then((res)=>{
       setnotifications(res.data)
     })
  }
  const nbrNotificationNotRead = async () =>{
    await axios.get(DOMAIN + '/api/notification/not-read',config)
     .then((res)=>{
       setnbrNotifications(res.data);
     })
  }

  const alerteVehicule = async () =>{
      await axios.get(DOMAIN + '/api/vehicules/alert',config)
  }
  const setAllAsRead = async () =>{
    await axios.get(DOMAIN + '/api/notification/read',config)
    setload(!load)
  }

  
  useEffect(() => {
    alerteVehicule()
    allNotifications()
    nbrNotificationNotRead()
    
    return () => {}
  }, [load] )
  




  return (
    <>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon waves-effect"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="mdi mdi-bell-outline"></i>
          <span className="badge rounded-pill bg-danger ">
            {nbrNotifications !==0 ? nbrNotifications : null}
          </span>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu-lg dropdown-menu-end ">
        
          <div className="p-3">
            <Row className="align-items-center">
              <Col md='5'>
                <h6 className="m-0">{" "}{props.t("Notifications")} </h6>
              </Col>
              <Col>
                <Link to='#' 
                  type="button"
                    onClick={setAllAsRead}
                > marquer tous comme lu</Link>
              </Col>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            
                    { notifications.map(notification => {
                        switch (notification.title) {
                          case 'Assurance':
                            
                            break;
                          case 'Vidange':
                          
                            break;
                          case 'Pneumatique':
                            
                            break;
                          case 'Demande Intervention':
                            
                            break;
                        
                          default:
                            break;
                        }
                            return (
                            <Link key={notification.id} to="#" className='text-reset notification-item'>
                              <div className={`d-flex align-items-start ${notification.read!==true ? 'bg-light' : ''}`}>
                                <div className="flex-1 ">
                                  <h6 className="mt-0 mb-1 text-primary">
                                    {props.t(notification.title)}
                                  </h6>
                                  <div className="font-size-12 text-muted">
                                    <p className="mb-1">
                                      {props.t(notification.description)}
                                       
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Link>)
                        
                          })}
                
          </SimpleBar>

          
          
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any
}
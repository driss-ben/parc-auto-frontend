import PropTypes from 'prop-types'
import React, { useEffect,useState } from "react"

import { Row, Col, Alert, Container } from "reactstrap"

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// actions
import { loginUser, apiError, socialLogin } from "../../store/actions"

// import images
import logo from "../../assets/images/logo-sm-dark.png"
import { getUser, isLogin } from './services/Service'
import axios from 'axios'

import { DOMAIN } from "../../constants/Domain";

const Login = (props) => {

  const [error, seterror] = useState(null)
  useEffect(() => {
    document.body.className = "authentication-bg";
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = "";
    };
  });
  const createAccount = async() =>{
    axios.post(DOMAIN + '/api/add-admin')
  }
  // handleValidSubmit
  const handleValidSubmit = async (event, values) => {
      const result = await isLogin(values);
       
      if (result !== false) {
        const user = await getUser(values.username,localStorage.getItem('authorization'))
        
        localStorage.setItem('authUser',JSON.stringify(user) );
        seterror(false)
        document.location.href="/dashboard"
      } else {
        seterror(true)
      }
    
  }

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div className="card overflow-hidden">
                <div className="bg-login text-center">
                  <div className="bg-login-overlay"></div>
                  <div className="position-relative">
                    <h5 className="text-white font-size-20">Welcome Back !</h5>
                    <Link to="/" className="logo logo-admin mt-4">
                      <img src={logo} alt="" height="30" />
                    </Link>
                  </div>
                </div>
                <div className="card-body pt-5">
                  {error===true ?<Alert color='danger'>Les donnees sont incorrectes</Alert> : ''}
                    
                  <div className="p-2">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v)
                      }}
                    >
                      {props.error && typeof props.error === "string" ? (
                        <Alert color="danger">{props.error}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <AvField
                          name="username"
                          label="Email"
                          value=""
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Password"
                          value=""
                          type="password"
                          required
                          placeholder="Enter Password"
                        />
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3">
                        <button
                          className="btn btn-primary w-100 waves-effect waves-light"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted"><i
                          className="mdi mdi-lock me-1"></i> Forgot your password?</Link>
                      </div>
                    </AvForm>

                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
                <p>creer un compte admin ici <Link to="#" type='button'
                  onClick={createAccount}
                  className="fw-medium text-primary"> Compte Administrateur  </Link> </p>
                <p>© {new Date().getFullYear()} Qovex. Crafted with <i
                  className="mdi mdi-heart text-danger"></i> by Themesbrand
                        </p>
              </div>
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError, socialLogin })(Login)
)

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func
}
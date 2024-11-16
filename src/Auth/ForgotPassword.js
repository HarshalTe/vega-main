import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Col, InputGroup, InputGroupText, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../views/custom/CustomInput";
import * as Yup from "yup";
import { GoMail } from "react-icons/go";
import * as actions from "../redux/action";
import {useDispatch} from "react-redux";
import { connect } from "react-redux";
import { forgotPassword } from "../redux/action/ForgotCreators";
import history from "../myCreatedHistory";



const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => ({
  forgotPassword: (data, toggle) => { dispatch(forgotPassword(data, toggle))},
});
const ForgotPassword = (props) => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const toggle = () => {
    history.push(`/login`)
    window.location.reload()
    // navigate("/login");
  };
    const handleSubmit = (values, setSubmitting) => {
      let data = {
        email: values.email,
      };
      // dispatch(actions.forgotPassword(data, toggle));
      props.forgotPassword(data, toggle);
      setSubmitting(false);
      return;
    }; 
  return (
    <React.Fragment>
      <div>
        <div className="auth-wrapper align-items-center">
          <div className="container main-login-div">
            <div className="no-gutters justify-content-center row">
              <div className="bg-white col-md-6 col-lg-6 login-card">
                <div className="justify-content-center d-flex">
                  <h1 className="wlc-text text-center mt-5">
                    Reset Your Password
                  </h1>
                  {/* <img src={logo} width="250px" height="75px" /> */}
                </div>
                <div className="p-5">
                  <Formik
                    initialValues={{
                      email: "",
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={Yup.object().shape({
                      email: Yup.string()
                        .required("Enter Your Email")
                        .email("Invalid Email address"),
                    })}
                  >
                    {(formProps) => (
                      <Form className="mt-3">
                        <Row className="form-group">
                          <Col md={12}>
                            <InputGroup>
                              <InputGroupText addonType="prepend">
                                <GoMail />
                              </InputGroupText>
                              <Field
                                component={CustomInput}
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Username Or Email"
                                className={
                                  "form-control" +
                                  (formProps.errors.email &&
                                  formProps.touched.email
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="invalid-feedback"
                              />
                            </InputGroup>
                          </Col>
                          <p className="mt-2">
                            You will receive a link to create a new password via
                            email.
                          </p>
                        </Row>

                        <div className="mt-3 mb-3 row">
                          <div className="col-12">
                            <Button
                              type="submit"
                              className="signin"
                              size="md"
                              block
                            >
                              Sign In
                            </Button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                  {/* <div className="mt-3">
                    {props.login?.isLoading && <LinerLoader />}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);


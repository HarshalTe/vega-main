import React,{useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Button,
  Col,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../views/custom/CustomInput";
import * as Yup from "yup";
import { RiLockPasswordFill } from "react-icons/ri";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import * as actions from "../redux/action";
import {useSelector,useDispatch} from "react-redux";
import { connect } from "react-redux";
import { updatePassword } from "../redux/action/UpdateCreators";
import history from "../myCreatedHistory";



 
const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updatePassword: (data, token, toggle) => { dispatch(updatePassword(data, token, toggle))},
});
const UpdatePassword = (props) => {
  const dispatch = useDispatch();
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isRevealPwd1, setIsRevealPwd1] = useState(false);
  const toggle = () => {
    history.push(`/login`)
    window.location.reload()
  };
  const token = window.location.href.split("=")[1];
  // console.log("token",token)
  const handleSubmit = (values, setSubmitting) => {
    let data = {
      token: token,
      password: values.password,
      confirmation_password: values.password_confirmation,
    };
    console.log(data, values);
    props.updatePassword(data, token, toggle);

    setSubmitting(false);
    return;
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('This field is required'),
      password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('This field is required'),
  });

  return (
    <React.Fragment>
      <div>
        <div className="auth-wrapper align-items-center">
          <div className="container main-login-div">
            <div className="no-gutters justify-content-center row">
              <div className="bg-white col-md-6 col-lg-6 login-card">
                <div className="justify-content-center d-flex">
                  <h1 className="wlc-text text-center mt-5">
                    Update Your Password
                  </h1>
                  {/* <img src={logo} width="250px" height="75px" /> */}
                </div>
                <div className="p-5">
                  <Formik
                    initialValues={{
                      password: "",
                      password_confirmation: "",
                    }}
                    onSubmit={handleSubmit}
                    // validationSchema={Yup.object().shape({
                    //   password: Yup.string().required("This field is required"),
                    //   confirmation_password: Yup.string().when("password", {
                    //     is: (val) => (val && val.length > 0 ? true : false),
                    //     then: Yup.string().oneOf(
                    //       [Yup.ref("password")],
                    //       "Both password need to be the same"
                    //     ),
                    //   }),
                    // })}
                    validationSchema={validationSchema}
                  >
                    {(formProps) => (
                      <Form className="mt-3">
                        <Row className="form-group mt-3">
                          <Col md={12}>
                            <InputGroup>
                              <InputGroupText>
                                <RiLockPasswordFill />
                              </InputGroupText>
                              <Field
                                component={CustomInput}
                                type={isRevealPwd ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Password"
                                className={
                                  "form-control" +
                                  (formProps.errors.password &&
                                  formProps.touched.password
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="invalid-feedback"
                              />
                              <InputGroupText
                                onClick={() =>
                                  setIsRevealPwd((prevState) => !prevState)
                                }
                                style={{ cursor: "pointer" }}
                              >
                                {isRevealPwd ? (
                                  <AiOutlineEyeInvisible />
                                ) : (
                                  <AiOutlineEye />
                                )}
                              </InputGroupText>
                            </InputGroup>
                          </Col>
                        </Row>
                        <Row className="form-group mt-3">
                          <Col md={12}>
                            <InputGroup>
                              <InputGroupText>
                                <RiLockPasswordFill />
                              </InputGroupText>
                              <Field
                                component={CustomInput}
                                type={isRevealPwd1 ? "text" : "password"}
                                name="password_confirmation"
                                id="password_confirmation"
                                placeholder="Confirm Password"
                                className={
                                  "form-control" +
                                  (formProps.errors.password_confirmation &&
                                  formProps.touched.password_confirmation
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="password_confirmation"
                                component="div"
                                className="invalid-feedback"
                              />
                              <InputGroupText
                                onClick={() =>
                                  setIsRevealPwd1((prevState) => !prevState)
                                }
                                style={{ cursor: "pointer" }}
                              >
                                {isRevealPwd1 ? (
                                  <AiOutlineEyeInvisible />
                                ) : (
                                  <AiOutlineEye />
                                )}
                              </InputGroupText>
                            </InputGroup>
                          </Col>
                        </Row>
                        <div className="mt-3 mb-3 row">
                          <div className="col-12">
                            <Button
                              type="submit"
                              className="signin"
                              size="md"
                              block
                            >
                              Update Password
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
export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);


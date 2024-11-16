import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../redux/action";

import {
  Button,
  Col,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  FormGroup,
} from "reactstrap";
import dateFormat from "dateformat";
import CustomInput from "../../../views/custom/CustomInput";
import CustomSelect from "../../../views/custom/CustomSelect";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import swal from "sweetalert";

function CaseDetails(props) {
  const accessToken = `${props.login?.login?.token}`;
  console.log("objectProps",props)

  let data = {
    token: accessToken,
    id: props.data?.id,
    // user_id: props.login?.login?.user
    //   ? props.login?.login?.user?.id
    //   : props.login?.login?.customer
    //   ? props.login?.login?.customer.id
    //   : "",
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const authAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const assignCase = (values) => {
    let user;
    if (props.login?.login?.user) {
      user = {
        user_id: values.user_id,
        case_id: props.data?.id,
      };
    }
    if (props.login?.login?.customer) {
      user = {
        customer_id: values.user_id,
        case_id: props.data?.id,
      };
    }
    authAxios
      // .post(baseUrl + "passCase/" + data.id + "/" + values.user_id)
      .post(baseUrl + "passCase", user)
      .then((res) => {
        console.log("res of assigncase", res);
        swal("Successfully Assign Case").then(() => {
          toggle();
          props.onCasesGetData(data);
        });
      })
      .catch((err) => {
        console.log("error of assigncase", err.response);
      });
  };
  // console.log("objectdate",dateFormat("dd-mm-yyyy HH:MM:ss"))
  const assignCase2 = () => {
    let user;
    if (props.login?.login?.user) {
      user = {
        customer_id:"1",
        company_id: props?.data?.company_id,
        user_id: props.data?.user_id,
        case_id: props?.data?.id,
      };
    }
    if (props.login?.login?.customer) {
      user = {
        customer_id: props.login?.login?.customer?.id,
        case_id: props.data?.id,
      };
    }
    authAxios
      // .post(baseUrl + "passCase/" + data.id + "/" + values.user_id)
      .post(baseUrl + "passCase", user)
      .then((res) => {
        console.log("res of assigncase", res);
        swal("Successfully Assign Case").then(() => {
          toggle();
          props.onCasesGetData(data);
        });
      })
      .catch((err) => {
        console.log("error of assigncase", err.response);
      });
  };
  const handleSubmit = (values, { setSubmitting }) => {
    assignCase(values);

    // props.detailCasesData(data, toggle);
    // props.onUpdateCasesData(data, user, toggle);
    setSubmitting(true);
  };
  const handleSubmit2 = (values, { setSubmitting }) => {
    // assignCase(values);
    let user;
    if (props.login?.login?.user) {
      user = {
        customer_id:values.user_id,
        case_id: props?.data?.id,
      };
    }
    if (props.login?.login?.customer) {
      user = {
        customer_id: props.login?.login?.customer?.id,
        case_id: props.data?.id,
      };
    }
    authAxios
      // .post(baseUrl + "passCase/" + data.id + "/" + values.user_id)
      .post(baseUrl + "passCase", user)
      .then((res) => {
        console.log("res of assigncase", res);
        swal("Successfully Assign Case").then(() => {
          toggle();
          props.onCasesGetData(data);
        });
      })
      .catch((err) => {
        console.log("error of assigncase", err.response);
      });
    setSubmitting(true);
  };



  if (props.login?.login?.user?.role == "supervisor") {
    return (
      <div>
        <Button
          className="btn-success p-1"
          onClick={() => {
            toggle();
          }}
        >
          <i className="fa fa-info-circle" aria-hidden="true"></i>
        </Button>
        <Modal
          className="modal-info modal-lg"
          isOpen={modal}
          toggle={toggle}
          backdrop="static"
        >
          <ModalHeader toggle={toggle}>Reports Details</ModalHeader>

          <ModalBody className="">
            {props.data?.sent_for_checking_status == 1 ? (
              "Prepared by " + props.data?.prepared_by
            ) : (
              <Formik
                initialValues={{
                  user_id: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                  user_id: Yup.string().required("User is required"),
                })}
              >
                {(formProps) => (
                  <Form>
                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="user_id">Select Asign User</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="user_id"
                            id="user_id"
                            className={
                              "form-control" +
                              (formProps.errors.user_id &&
                              formProps.touched.user_id
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option value="">Select Asign User</option>
                            {props.users?.map((user) => {
                              if (user.role == "admin")
                                return (
                                  <option value={user.id}>{user.name}</option>
                                );
                            })}
                          </Field>

                          <ErrorMessage
                            name="user_id"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row style={{ justifyContent: "center" }}>
                      <Col md={4}>
                        <Button type="reset" color="danger" block>
                          <b>Reset</b>
                        </Button>
                      </Col>
                      <Col md={4}>
                        <Button
                          type="submit"
                          disabled={formProps.isSubmitting}
                          color="primary"
                          block
                        >
                          Assign Report
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            )}
          </ModalBody>
        </Modal>
      </div>
    );
  } else if (props.login?.login?.user?.role == "admin") {
    return (
      <div>
        <Button
          className="btn-success p-1"
          onClick={() => {
            toggle();
          }}
        >
          <i className="fa fa-info-circle" aria-hidden="true"></i>
        </Button>
        <Modal
          className="modal-info modal-lg"
          isOpen={modal}
          toggle={toggle}
          backdrop="static"
        >
          <ModalHeader toggle={toggle}>Reports Details</ModalHeader>

          <ModalBody className="">
            {props.data?.sent_for_checking_status == 1 &&
            props.data?.checked_status == 1 ? (
              <div className="d-flex flex-column">
                <span>{"Prepared by " + props.data?.prepared_by}</span>
                <span>{"Checked by " + props.data?.checked_by}</span>
                {props.data?.approved_status == 1 &&
                  props.data?.sent_for_approval_status == 1 && (
                    <div className="d-flex flex-column">
                      <span>{"Reviewed by " + props.data?.reviewed_by}</span>
                      <span>{"Approved by " + props.data?.approved_by}</span>
                    </div>
                  )}
              </div>
            ) : (
              <Formik
                initialValues={{
                  user_id: "",
                }}
                onSubmit={handleSubmit2}
                validationSchema={Yup.object().shape({
                  user_id: Yup.string().required("User is required"),
                })}
              >
                {(formProps) => (
                  <Form>
                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="user_id">Select Asign User</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="user_id"
                            id="user_id"
                            className={
                              "form-control" +
                              (formProps.errors.user_id &&
                              formProps.touched.user_id
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option value="">Select Asign User</option>
                            {props.customer?.filter(item=>item?.company?.name == props?.data?.company?.name)?.map((user) => {
                              if (user.role == "staff")
                                return (
                                  <option value={user.id}>{user.name}</option>
                                );
                            })}
                          </Field>

                          <ErrorMessage
                            name="user_id"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row style={{ justifyContent: "center" }}>
                      <Col md={4}>
                        <Button type="reset" color="danger" block>
                          <b>Reset</b>
                        </Button>
                      </Col>
                      <Col md={4}>
                        <Button
                          type="submit"
                          disabled={formProps.isSubmitting}
                          color="primary"
                          block
                          onClick={() => {
                                const user = new FormData();
              
                                // user.append("company_id", props.data?.company_id);
                                // user.append("user_id", props.data?.user_id);
                                // user.append("checked_by", props.login?.login?.user?.name);
                                user.append("checked_status", 1);
                                // user.append("sent_for_approval_status", 0);
                                // assignCase2()
                                props.onUpdateCasesData(data, user, toggle);
                              }}
                        >
                          Assign Report
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
              // <Button
              //   className="btn-warning p-1"
              //   onClick={() => {
              //     const user = new FormData();

              //     user.append("company_id", props.data?.company_id);
              //     user.append("user_id", props.data?.user_id);
              //     user.append("checked_by", props.login?.login?.user?.name);
              //     user.append("checked_status", 1);
              //     assignCase2()
              //     // props.onUpdateCasesData(data, user, toggle);
              //   }}
              // >
              //   Complete Reports
              // </Button>
              
            )}
          </ModalBody>
        </Modal>
      </div>
    );
  } else if (props.login?.login?.customer.role == "staff") {
    return (
      <div>
        <Button
          className="btn-success p-1"
          onClick={() => {
            toggle();
          }}
        >
          <i className="fa fa-info-circle" aria-hidden="true"></i>
        </Button>
        <Modal
          className="modal-info modal-lg"
          isOpen={modal}
          toggle={toggle}
          backdrop="static"
        >
          <ModalHeader toggle={toggle}>Reports Details</ModalHeader>

          <ModalBody className="">
            {props.data?.sent_for_approval_status == 1 && props.data?.reviewed_by != null ? (
              "Reviewed by " + props.data?.reviewed_by
            ) : (
              <Formik
                initialValues={{
                  user_id: "",
                }}
                // onSubmit={handleSubmit}
                onSubmit={(values, { setSubmitting }) => {
                  const user = new FormData();

                  // user.append("company_id", props.data?.company_id);
                  // user.append("user_id", props.data?.user_id);
                  // user.append(
                  //   "reviewed_by",
                  //   props.login?.login?.customer?.name
                  // );
                  user.append("sent_for_approval_status", 1);
                  assignCase(values)
                  props.onUpdateCasesData(data, user, toggle);
                }}
                validationSchema={Yup.object().shape({
                  user_id: Yup.string().required("User is required"),
                })}
              >
                {(formProps) => (
                  <Form>
                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="user_id">Select User</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="user_id"
                            id="user_id"
                            placeholder="Select User"
                            className={
                              "form-control" +
                              (formProps.errors.user_id &&
                              formProps.touched.user_id
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option value="">Select User</option>
                            {props.customer?.filter(item=>item?.company?.name == props?.data?.company?.name)?.map((cust) => {
                              if (
                                props.login?.login?.customer?.company_id ==
                                  cust.company_id &&
                                cust.role == "owner"
                              )
                                return (
                                  <option value={cust.id}>{cust.name}</option>
                                );
                            })}
                          </Field>

                          <ErrorMessage
                            name="user_id"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row style={{ justifyContent: "center" }}>
                      <Col md={4}>
                        <Button type="reset" color="danger" block>
                          <b>Reset</b>
                        </Button>
                      </Col>
                      <Col md={4}>
                        <Button
                          type="submit"
                          disabled={formProps.isSubmitting}
                          color="primary"
                          block
                        >
                          Assign Report
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            )}
          </ModalBody>
        </Modal>
      </div>
    );
  } else if (props.login?.login?.customer.role == "owner") {
    return (
      <div>
        <Button
          className="btn-success p-1"
          onClick={() => {
            toggle();
          }}
        >
          <i className="fa fa-info-circle" aria-hidden="true"></i>
        </Button>
        <Modal
          className="modal-info modal-lg"
          isOpen={modal}
          toggle={toggle}
          backdrop="static"
        >
          <ModalHeader toggle={toggle}>Report Details</ModalHeader>
          <ModalBody className="d-flex justify-content-center align-items-center">
            {props.data?.approved_status == 1 &&
            props.data?.sent_for_approval_status == 1 ? (
              <div className="d-flex flex-column">
                <span>{"Reviewed by " + props.data?.reviewed_by}</span>
                <span>{"Approved by " + props.data?.approved_by}</span>
              </div>
            ) : (
              <Button
                className="btn-warning p-1"
                onClick={() => {
                  const user = new FormData();

                  // user.append("company_id", props.data?.company_id);
                  // user.append("user_id", props.data?.user_id);
                  // user.append(
                  //   "approved_by",
                  //   props.login?.login?.customer?.name
                  // );
                  user.append("approved_status", 1);
                  assignCase2()
                  props.onUpdateCasesData(data, user, toggle);
                }}
              >
                Approve Report
              </Button>
            )}
          </ModalBody>{" "}
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
    cases: state.cases,
    cols: state.cols.cols,
    customer: state.customer.customer,
    rows: state.rows.rows,
    users: state.users.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUsersGetData: (data) => dispatch(actions.usersGetData(data)),
    onCasesGetData: (data) => dispatch(actions.casesGetData(data)),
    onDeleteCases: (data, id) => dispatch(actions.deleteCases(data, id)),
    onPostCasesData: (data, user, toggle) =>
      dispatch(actions.postCasesData(data, user, toggle)),
    detailCasesData: (data, toggle) =>
      dispatch(actions.detailCasesData(data, toggle)),
    onUpdateCasesData: (data, user, toggle) =>
      dispatch(actions.updateCasesData(data, user, toggle)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CaseDetails);

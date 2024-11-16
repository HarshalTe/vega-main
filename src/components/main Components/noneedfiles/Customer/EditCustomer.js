import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../../redux/action";

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
import CustomInput from "../../../../views/custom/CustomInput";
import CustomSelect from "../../../../views/custom/CustomSelect";

function EditCustomer(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
    id: props.data?.id,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Vendor:", values);

    const user = new FormData();

    user.append("name", values.name);
    user.append("email", values.email);
    user.append("mobile", values.mobile);
    user.append("pincode", values.pincode);
    user.append("aadhar_no", values.aadhar_no);
    user.append("pan_no", values.pan_no);
    user.append("remark", values.remark);
    user.append("gst_no", values.gst_no);
    user.append("doc_1", values.doc_1);
    user.append("doc_2", values.doc_2);

    user.append("password", values.password);
    user.append("role", "user");
    user.append("password_confirmation", values.password_confirmation);

    console.log("Data of Vendor:", user);
    props.onUpdateCustomerData(data, user, toggle);
    setSubmitting(true);
  };

  return (
    <div>
      <Button
        className="btn-warning p-1"
        onClick={() => {
          toggle();
        }}
      >
        <i className="fa fa-edit" aria-hidden="true"></i>
      </Button>
      <Modal
        className="modal-info modal-lg"
        isOpen={modal}
        toggle={toggle}
        backdrop="static"
      >
        <ModalHeader toggle={toggle}>Edit Vendor</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: props.data?.name,
              email: props.data?.email,
              mobile: props.data?.mobile,
              aadhar_no: props.data?.aadhar_no,
              pan_no: props.data?.pan_no,
              gst_no: props.data?.gst_no,
              pincode: props.data?.pincode,
              remark: props.data?.remark,
              doc_1: props.data?.doc_1,
              doc_2: props.data?.doc_2,
              password: "",
              password_confirmation: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              name: Yup.string().required(" Name is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="discount">Name</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Full Name"
                        className={
                          "form-control" +
                          (formProps.errors.name && formProps.touched.name
                            ? " is-invalid"
                            : "")
                        }
                      />

                      <ErrorMessage
                        name="name"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="email">Enter Email</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Email"
                        className="form-control"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="discount">Enter Phone</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="number"
                        name="mobile"
                        id="mobile"
                        placeholder="Enter Phone Number"
                        className={
                          "form-control" +
                          (formProps.errors.mobile && formProps.touched.mobile
                            ? " is-invalid"
                            : "")
                        }
                      />

                      <ErrorMessage
                        name="mobile"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="aadhar_no">Addhar No</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="number"
                        name="aadhar_no"
                        id="aadhar_no"
                        placeholder="Enter Addhar No"
                        className="form-control"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="pan_no">Enter Pan No</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="pan_no"
                        id="pan_no"
                        placeholder="Enter Pan no"
                        className="form-control"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="gst_no">Enter GST No</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="gst_no"
                        id="gst_no"
                        placeholder="Enter GST No"
                        className="form-control"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="password">Enter Password</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        className="form-control"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="password_confirmation">
                      Enter Confirm Password
                    </Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        placeholder="Enter Confirm Password"
                        className="form-control"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="pincode">Enter Pincode</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="number"
                        name="pincode"
                        id="pincode"
                        placeholder="Enter Pincode"
                        className="form-control"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="remark">Enter Remark</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="remark"
                        id="remark"
                        placeholder="Enter Remark"
                        className="form-control"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="doc_1">Select Document one</Label>
                    <FormGroup>
                      {props?.data?.doc_1 == "nofile.pdf" ? (
                        <InputGroup>
                          <input
                            component={CustomSelect}
                            type="file"
                            name="doc_1"
                            id="doc_1"
                            onChange={(event) => {
                              formProps.setFieldValue(
                                "doc_1",
                                event.currentTarget.files[0]
                              );
                            }}
                            className="form-group"
                          />
                        </InputGroup>
                      ) : (
                        <InputGroup>
                          <a
                            target={"_blank"}
                            href={`https://uditsolutions.in/franchise/storage/app/public/users/${props.data?.doc_1}`}
                            rel="noreferrer"
                          >
                            {props.data?.doc_1}
                          </a>
                          <input
                            component={CustomSelect}
                            type="file"
                            name="doc_1"
                            id="doc_1"
                            onChange={(event) => {
                              formProps.setFieldValue(
                                "doc_1",
                                event.currentTarget.files[0]
                              );
                            }}
                            className="form-group"
                          />
                        </InputGroup>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <Label for="doc_2">Select Document one</Label>
                    <FormGroup>
                      {props?.data?.doc_2 == "nofile.pdf" ? (
                        <InputGroup>
                          <input
                            component={CustomSelect}
                            type="file"
                            name="doc_2"
                            id="doc_2"
                            onChange={(event) => {
                              formProps.setFieldValue(
                                "doc_2",
                                event.currentTarget.files[0]
                              );
                            }}
                            className="form-group"
                          />
                        </InputGroup>
                      ) : (
                        <InputGroup>
                          <a
                            target={"_blank"}
                            href={`https://uditsolutions.in/franchise/storage/app/public/users/${props.data?.doc_2}`}
                            rel="noreferrer"
                          >
                            {props.data?.doc_2}
                          </a>
                          <input
                            component={CustomSelect}
                            type="file"
                            name="doc_2"
                            id="doc_2"
                            onChange={(event) => {
                              formProps.setFieldValue(
                                "doc_2",
                                event.currentTarget.files[0]
                              );
                            }}
                            className="form-group"
                          />
                        </InputGroup>
                      )}
                    </FormGroup>
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
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
    customer: state.customer.customer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCustomerGetData: (data) => dispatch(actions.customerGetData(data)),
    onDeleteCustomer: (data, id) => dispatch(actions.deleteCustomer(data, id)),
    onPostCustomerData: (data, user, toggle) =>
      dispatch(actions.postCustomerData(data, user, toggle)),
    onUpdateCustomerData: (data, user, toggle) =>
      dispatch(actions.updateCustomerData(data, user, toggle)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditCustomer);

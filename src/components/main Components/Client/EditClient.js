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
import CustomInput from "../../../views/custom/CustomInput";
import CustomSelect from "../../../views/custom/CustomSelect";

function EditClient(props) {
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
    user.append("company_id", values.company_id);
    user.append("name", values.name);
    user.append("email", values.email);
    user.append("role", values.role);
    user.append("type", values.type);
    user.append("phone", values.phone);
    user.append("pan_no", values.pan_no);
    user.append("gst_no", values.gst_no);
    user.append("emp_id", values.emp_id);
    user.append("address", values.address);
    user.append("location", values.location);
    user.append("is_active", values.is_active);
    if (values.password && values.password_confirmation !== "") {
      user.append("password", values.password);
      user.append("password_confirmation", values.password_confirmation);
    }

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
        <ModalHeader toggle={toggle}>Edit Client</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: props.data?.name,
              company_id: props.data?.company_id,
              email: props.data?.email,
              phone: props.data?.phone,
              pan_no: props.data?.pan_no,
              gst_no: props.data?.gst_no,
              role: props.data?.role,
              type: props.data?.type,
              emp_id: props.data?.emp_id,
              address: props.data?.address,
              location: props.data?.location,
              is_active: props.data?.is_active,
              password: "",
              password_confirmation: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required"),
              phone: Yup.string().required("mobile Number is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row className="form-group">
                  <Col md={10}>
                    <Label for="company_id">Select Company</Label>
                    <InputGroup>
                      <Field
                        component={CustomSelect}
                        type="select"
                        name="company_id"
                        id="company_id"
                        className={
                          "form-control" +
                          (formProps.errors.name && formProps.touched.name
                            ? " is-invalid"
                            : "")
                        }
                      >
                        <option value="">Select Company</option>
                        {props.company
                          ?.filter((com) => com.internal == 0)
                          .map((c) => (
                            <option value={c.id} key={c.id}>
                              {c.name}
                            </option>
                          ))}
                      </Field>
                      <ErrorMessage
                        name="company_id"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                </Row>
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
                    <Label for="phone">Enter Phone</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="number"
                        name="phone"
                        id="phone"
                        placeholder="Enter Phone Number"
                        className={
                          "form-control" +
                          (formProps.errors.phone && formProps.touched.phone
                            ? " is-invalid"
                            : "")
                        }
                      />

                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="emp_id">Employee ID</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="number"
                        name="emp_id"
                        id="emp_id"
                        placeholder="Enter Employee ID"
                        className="form-control"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                {/* <Row className="form-group">
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
                </Row> */}
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="address">Enter Address</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Enter Address"
                        className="form-control"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="location">Enter Location</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="location"
                        id="location"
                        placeholder="Enter Location"
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
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="role">Select Role</Label>
                    <InputGroup>
                      <Field
                        component={CustomSelect}
                        type="select"
                        name="role"
                        id="role"
                        placeholder="Select Role"
                        className="form-control"
                        className={
                          "form-control" +
                          (formProps.errors.role && formProps.touched.role
                            ? " is-invalid"
                            : "")
                        }
                      >
                        <option value="">Select Role</option>
                        <option value="owner">Owner</option>
                        <option value="staff">Staff</option>
                      </Field>

                      <ErrorMessage
                        name="role"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                  {/* <Col md={6}>
                    <Label for="type">Select Role Type</Label>
                    <InputGroup>
                      <Field
                        component={CustomSelect}
                        type="select"
                        name="type"
                        id="type"
                        placeholder="Select Role Type"
                        className="form-control"
                      >
                        <option value="">Select Type</option>
                        <option value="employee">Employee</option>
                        <option value="supervisor">Supervisor</option>
                      </Field>
                    </InputGroup>
                  </Col>
                 */}

                  <Col md={6}>
                    <Label for="is_active">Select Status</Label>
                    <InputGroup>
                      <Field
                        component={CustomSelect}
                        type="select"
                        name="is_active"
                        id="is_active"
                        placeholder="Select Role"
                        className="form-control"
                      >
                        <option value="">Select Status</option>
                        <option value={1}>Active</option>
                        <option value={0}>Passive</option>
                      </Field>
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
    company: state.company.company,
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
export default connect(mapStateToProps, mapDispatchToProps)(EditClient);

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

function EditUsers(props) {
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
    // // console.log("values in Users:", values);

    const user = new FormData();

    user.append("name", values.name);
    user.append("email", values.email);
    user.append("role", values.role);
    user.append("type", values.type);
    user.append("phone", values.phone);
    user.append("emp_id", values.emp_id);
    user.append("is_active", values.is_active);
    if (values.password && values.password_confirmation !== "") {
      user.append("password", values.password);
      user.append("password_confirmation", values.password_confirmation);
    }

    // // console.log("Data of Users:", user);
    props.onUpdateUsersData(data, user, toggle);
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
        <ModalHeader toggle={toggle}>Edit User</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: props.data?.name,
              email: props.data?.email,
              phone: props.data?.phone,
              role: props.data?.role,
              type: props.data?.type,
              emp_id: props.data?.emp_id,
              is_active: props.data?.is_active,
              password: props.data?.password,
              password_confirmation: props.data?.password_confirmation,
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
                      >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        {/* <option value="manager">Manager</option> */}
                        <option value="supervisor">Supervisor</option>
                      </Field>
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
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                        <option value="supervisor">Supervisor</option>
                      </Field>
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="form-group"> */}
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
    users: state.users.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUsersGetData: (data) => dispatch(actions.usersGetData(data)),
    onDeleteUsers: (data, id) => dispatch(actions.deleteUsers(data, id)),
    onPostUsersData: (data, user, toggle) =>
      dispatch(actions.postUsersData(data, user, toggle)),
    onUpdateUsersData: (data, user, toggle) =>
      dispatch(actions.updateUsersData(data, user, toggle)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditUsers);

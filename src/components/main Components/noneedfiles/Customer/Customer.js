import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Table,
  FormGroup,
} from "reactstrap";
import FA from "react-fontawesome";

import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../../../../views/custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../../redux/action";
import CustomSelect from "../../../../views/custom/CustomSelect";
import EditCustomer from "./EditCustomer";

function Customer(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
  };

  console.log("data", data);

  useEffect(() => {
    props.onCustomerGetData(data);
  }, []);

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Customer:", values);

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

    console.log("Data of Customer:", user);
    props.onPostCustomerData(data, user, toggle);
    setSubmitting(true);
    return;
  };

  //   console.log("user id", props.login?.login?.user?.id);

  return (
    <Card>
      <CardHeader className="bg-warning text-white">
        <div className="">
          <strong>User</strong>
          {/* <Input
            type="text"
            placeholder="Search By Name and Enrollment No"
            className="ml-5"
            style={{ width: "300px" }}
            value={searchTerm}
            onChange={handleChange}
          />
          <Input
            type="select"
            className="ml-5"
            style={{ width: "300px" }}
            value={filter}
            onChange={handleFilterChange}
          >
            <option>Select Filter</option>
            <option value="uploaded">Only Uploaded</option>
            <option value="notuploaded">Not Uploaded</option>
            <option value="uploaded&approved">Uploaded & Approved</option>
          </Input>
          {props.login?.login?.user.role !== "faculty" && (
            */}
          <Button
            className="btn-success  float-right"
            onClick={() => {
              toggle();
            }}
          >
            Add User
          </Button>
        </div>
        <Modal
          className="modal-info modal-lg"
          isOpen={modal}
          toggle={toggle}
          backdrop="static"
        >
          <ModalHeader toggle={toggle}>Add New User</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                email: "",
                mobile: "",
                aadhar_no: "",
                pan_no: "",
                gst_no: "",
                pincode: "",
                remark: "",
                doc_1: "",
                doc_2: "",
                password: "",
                password_confirmation: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Name is required"),

                password: Yup.string().required("Password is required"),
                mobile: Yup.string().required("mobile Number is required"),
                password_confirmation: Yup.string().required(
                  "Confirm Password is required"
                ),
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
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="doc_@">Select Docoment two</Label>
                      <FormGroup>
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
      </CardHeader>
      <CardBody>
        <table className="table table-sm" style={{ fontSize: "12px" }}>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Adhar No</th>
              <th scope="col">Pan No</th>
              <th scope="col">GST No</th>
              <th scope="col">Remark</th>
              <th scope="col">Address</th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody style={{ textTransform: "uppercase" }}>
            {props.customer.length > 0 ? (
              props.customer?.map((user, index) => {
                if (user.role == "user")
                  return (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      <td>{user.aadhar_no ? user.aadhar_no : "NO addhar"}</td>
                      <td>{user.pan_no ? user.pan_no : "No Pan"}</td>
                      <td>{user.gst_no ? user.gst_no : "No Gst"}</td>
                      <td>{user.remark ? user.remark : "No Remark"}</td>
                      <td>{user.pincode ? user.pincode : "NO pincode"}</td>

                      <td className="d-flex">
                        <EditCustomer data={user} />

                        <Button
                          className="btn-danger ml-3 p-1"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this Customer?"
                              )
                            )
                              props.onDeleteCustomer(data, user.id);
                          }}
                        >
                          <i
                            className="fa fa-trash-alt "
                            value={user.id}
                            aria-hidden="true"
                          ></i>
                        </Button>
                      </td>
                    </tr>
                  );
              })
            ) : (
              <tr>
                <td colSpan={3}>No users</td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
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
export default connect(mapStateToProps, mapDispatchToProps)(Customer);

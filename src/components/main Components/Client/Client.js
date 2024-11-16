/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
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
  Label,
  InputGroup,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
} from "reactstrap";

import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../../../views/custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../redux/action";
import CustomSelect from "../../../views/custom/CustomSelect";
import EditClient from "./EditClient";
import Loader from "../../loader/Loader2";

function Client(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
  };

  useEffect(() => {
    props.onCompanyGetData(data);
    props.onCustomerGetData(data);
  }, []);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // const filteredCustomer = props.customer?.customer?.filter(
  //   (user) =>
  //     user?.name?.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
  //     user?.address?.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
  //     user?.phone?.toLowerCase().includes(searchTerm?.trim().toLowerCase()) ||
  //     user?.location?.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
  //     user?.emp_id?.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
  //     user?.email?.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
  //     user?.company?.name
  //       ?.toLowerCase()
  //       .includes(searchTerm.trim().toLowerCase())
  // );

  const [state, setState] = useState({
    pageSize: 10, // <- 25 items will be shown on single page
    pageIndex: 0, // 0 is a default page to show
    items: props.customer?.isLoading ? [] : props.customer?.customer,
  });

  // useEffect(() => {
  //   if (searchTerm) {
  //     setState({
  //       pageSize: 10, // <- 25 items will be shown on single page
  //       pageIndex: 0,
  //       items: props.customer?.isLoading ? [] : filteredCustomer,
  //     });
  //   }
  // }, [searchTerm]);

  const handlePrevPageClick = (event) => {
    // console.log(state.items.length);
    setState((prevState) => ({
      ...state,
      pageIndex: prevState.pageIndex > 0 ? prevState.pageIndex - 1 : 0,
    }));
  };

  const handleNextPageClick = (event) => {
    console.log("pageIndex", state.pageIndex);
    console.log("pageSize", state.pageSize);

    setState((prevState) => ({
      ...state,
      pageIndex:
        prevState.pageIndex <
        Math.ceil(prevState.items.length / prevState.pageSize)
          ? prevState.pageIndex + 1
          : prevState.pageIndex,
    }));
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Customer:", values);

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
    user.append("password", values.password);
    user.append("password_confirmation", values.password_confirmation);

    console.log("Data of Customer:", user);
    props.onPostCustomerData(data, user, toggle);
    setSubmitting(true);
    return;
  };

  console.log("state", state);

  return (
    <Card>
      <CardHeader className="bg-warning text-white">
        <div className="d-flex justify-content-between align-items-center">
          <strong>Customer</strong>
          <Input
            type="text"
            placeholder="Search By Name, employee Id, Address, phone no and location"
            className=""
            style={{ width: "50%" }}
            value={searchTerm}
            onChange={handleChange}
          />
          <Button
            className="btn-success  float-right"
            onClick={() => {
              toggle();
            }}
          >
            Add Customer
          </Button>
        </div>
        <Modal
          className="modal-info modal-lg"
          isOpen={modal}
          toggle={toggle}
          backdrop="static"
        >
          <ModalHeader toggle={toggle}>Add New Customer</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                company_id: "",
                email: "",
                phone: "",
                pan_no: "",
                gst_no: "",
                role: "",
                type: "",
                address: "",
                location: "",
                emp_id: "",
                is_active: "",
                password: "",
                password_confirmation: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                company_id: Yup.string().required("Company_id is required"),
                name: Yup.string().required("Name is required"),
                role: Yup.string().required("Role is required"),
                password: Yup.string().required("Password is required"),
                phone: Yup.string().required("mobile Number is required"),
                password_confirmation: Yup.string().required(
                  "Confirm Password is required"
                ),
              })}
            >
              {(formProps) => (
                <Form>
                  <Row className="form-group">
                    <Col md={8}>
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
      </CardHeader>
      <CardBody style={{ overflow: "scroll" }}>
        <table
          className="table table-sm text-center"
          style={{ fontSize: "10px", overflow: "scroll" }}
        >
          <thead>
            <tr>
              <th scope="col">Customer Name</th>
              <th scope="col">Company Name</th>
              <th scope="col">Emoplyee Id</th>

              <th scope="col">Email</th>
              <th scope="col">Mobile</th>

              {/* <th scope="col">Gst No</th> */}
              {/* <th scope="col">Pan Card No</th> */}
              {/* <th scope="col">Address</th> */}
              <th scope="col">Location</th>
              <th scope="col">Role</th>
              {/* <th scope="col">Type</th> */}

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody style={{ textTransform: "uppercase" }}>
            {props.customer?.isLoading ? (
              <tr>
                <td colSpan={18}>
                  <Loader color={"primary"} />
                </td>
              </tr>
            ) : props.customer?.customer?.length > 0 ? (
              props.customer?.customer
                ?.filter(
                  (user) =>
                    user?.name
                      ?.toLowerCase()
                      .includes(searchTerm.trim().toLowerCase()) ||
                    user?.address
                      ?.toLowerCase()
                      .includes(searchTerm.trim().toLowerCase()) ||
                    user?.phone
                      ?.toLowerCase()
                      .includes(searchTerm.trim().toLowerCase()) ||
                    user?.location
                      ?.toLowerCase()
                      .includes(searchTerm.trim().toLowerCase()) ||
                    user?.emp_id
                      ?.toLowerCase()
                      .includes(searchTerm.trim().toLowerCase()) ||
                    user?.email
                      ?.toLowerCase()
                      .includes(searchTerm.trim().toLowerCase()) ||
                    user?.company?.name
                      ?.toLowerCase()
                      .includes(searchTerm.trim().toLowerCase())
                )
                .slice(
                  state.pageIndex * state.pageSize,
                  state.pageIndex * state.pageSize + state.pageSize
                )
                .map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.company?.name}</td>
                      <td>{user.emp_id}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      {/* <td>{user.gst_no}</td> */}
                      {/* <td>{user.pan_no}</td> */}
                      {/* <td>{user.address}</td> */}
                      <td>{user.location}</td>
                      <td>{user.role}</td>
                      {/* <td>{user.type}</td> */}

                      <td className="d-flex justify-content-center">
                        <EditClient data={user} />

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
                <td colSpan={3}>No Customers</td>
              </tr>
            )}
          </tbody>
          <nav>
            <Pagination>
              <PaginationItem>
                <PaginationLink
                  previous
                  tag="button"
                  onClick={(event) => handlePrevPageClick(event)}
                >
                  Back
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  next
                  tag="button"
                  onClick={(event) => handleNextPageClick(event)}
                >
                  Next
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </nav>
        </table>
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    customer: state.customer,
    company: state.company.company,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCompanyGetData: (data) => dispatch(actions.companyGetData(data)),
    onCustomerGetData: (data) => dispatch(actions.customerGetData(data)),
    onDeleteCustomer: (data, id) => dispatch(actions.deleteCustomer(data, id)),
    onPostCustomerData: (data, user, toggle) =>
      dispatch(actions.postCustomerData(data, user, toggle)),
    onUpdateCustomerData: (data, user, toggle) =>
      dispatch(actions.updateCustomerData(data, user, toggle)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Client);

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
} from "reactstrap";

import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../../../views/custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../redux/action";
import CustomSelect from "../../../views/custom/CustomSelect";
import EditUsers from "./EditUsers";
import Loader from "../../loader/Loader2";

function Users(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
  };

  // console.log("data", data);

  useEffect(() => {
    props.onUsersGetData(data);
  }, []);

  const [state, setState] = useState({
    pageSize: 10, // <- 25 items will be shown on single page
    pageIndex: 0, // 0 is a default page to show
    items: props.users?.isLoading ? [] : props.users?.users,
    // items: props?.cols?.cols,
  });

  const handlePrevPageClick = (event) => {
    // console.log(state.items.length);
    setState((prevState) => ({
      ...state,
      pageIndex: prevState.pageIndex > 0 ? prevState.pageIndex - 1 : 0,
    }));
  };

  const handleNextPageClick = (event) => {
    // console.log("pageIndex", state.pageIndex);
    // console.log("pageSize", state.pageSize);

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
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // console.log("values in Users:", values);

    const user = new FormData();

    user.append("name", values.name);
    user.append("email", values.email);
    user.append("role", values.role);
    user.append("type", values.type);
    user.append("phone", values.phone);
    user.append("emp_id", values.emp_id);
    user.append("is_active", values.is_active);
    user.append("password", values.password);
    user.append("password_confirmation", values.password_confirmation);

    console.log("Data of Users:", user);
    props.onPostUsersData(data, user, toggle);
    setSubmitting(true);
    return;
  };

  //   console.log("user id", props.login?.login?.user?.id);

  return (
    <Card>
      <CardHeader className="bg-warning text-white">
        <div className="">
          <strong>Users</strong>
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
                phone: "",
                pan_no: "",
                gst_no: "",
                role: "",
                type: "",
                emp_id: "",
                is_active: "",
                password: "",
                password_confirmation: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Name is required"),

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
                      <Label for="dob">Date of Birth</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="date"
                          name="dob"
                          id="dob"
                          // placeholder=""
                          className={
                            "form-control" +
                            (formProps.errors.dob && formProps.touched.dob
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
                      <Label for="pan">Pan no.</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="texy"
                          name="pan"
                          id="pan"
                          placeholder="Enter Pan No."
                          className="form-control"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    
                    <Col md={6}>
                      <Label for="Aadhaar">Aadhaar no.</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="Aadhaar"
                          id="Aadhaar"
                          placeholder="Enter Aadhaar no."
                          className="form-control"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="pan">Passport no.</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="pan"
                          id="pan"
                          placeholder="Enter Passport no."
                          className="form-control"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="qualification">Qualification</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="Text"
                          name="qualification"
                          id="qualification"
                          placeholder="Enter Qualification"
                          className="form-control"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="pan">Date of Joining</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="date"
                          name="pan"
                          id="pan"
                          placeholder="Enter Date of Joining"
                          className="form-control"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="qualification">Insurance No.</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="Text"
                          name="qualification"
                          id="qualification"
                          placeholder="Enter Insurance No."
                          className="form-control"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="pan">Date of Insurance</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="date"
                          name="pan"
                          id="pan"
                          placeholder="Enter Date of Insurance"
                          className="form-control"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="qualification">PF No.</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="Text"
                          name="qualification"
                          id="qualification"
                          placeholder="Enter PF No."
                          className="form-control"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="pan">Office Location</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="pan"
                          id="pan"
                          placeholder="Enter Office Location"
                          className="form-control"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={12}>
                      <Label for="personal_address">Personal Address</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="personal_address"
                          id="personal_address"
                          placeholder="Enter Personal Address"
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
                  */}
                    {/* </Row>
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
      </CardHeader>
      <CardBody>
        <table
          className="table table-sm text-center"
          style={{ fontSize: "12px" }}
        >
          <thead>
            <tr>
              <th scope="col">Users Name</th>
              <th scope="col">Emoplyee Id</th>

              <th scope="col">Email</th>
              <th scope="col">Mobile</th>

              <th scope="col">Role</th>
              {/* <th scope="col">Type</th> */}

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody style={{ textTransform: "uppercase" }}>
            {props.users?.isLoading ? (
              <tr>
                <td colSpan={18}>
                  <Loader color={"primary"} />
                </td>
              </tr>
            ) : props.users?.users?.length > 0 ? (
              props.users?.users
                ?.slice(
                  state.pageIndex * state.pageSize,
                  state.pageIndex * state.pageSize + state.pageSize
                )
                .map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.emp_id}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>

                      <td>{user.role}</td>
                      {/* <td>{user.type}</td> */}

                      <td className="d-flex justify-content-center">
                        <EditUsers data={user} />

                        <Button
                          className="btn-danger ml-3 p-1"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this Users?"
                              )
                            )
                              props.onDeleteUsers(data, user.id);
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
                <td colSpan={3}>No Userss</td>
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
    users: state.users,
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
export default connect(mapStateToProps, mapDispatchToProps)(Users);

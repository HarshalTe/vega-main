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
import CustomInput from "../../../views/custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../redux/action";
import CustomSelect from "../../../views/custom/CustomSelect";
import EditEnquiries from "./EditEnquiries";

function Enquiries(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
  };

  console.log("data", data);

  useEffect(() => {
    props.onLeadGetData(data);
    props.onFranchisorGetData(data);
    props.onCustomerGetData(data);
    props.onFranchiseGetData(data);
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
    console.log("values in Lead:", values);

    const user = new FormData();

    user.append("franchise_company_id", values.franchise_company_id);
    user.append("franchiser_id", values.franchiser_id);
    user.append("customer_id", values.customer_id);

    user.append("lead_status", 0);

    console.log("Data of Lead:", user);
    props.onPostLeadData(data, user, toggle);
    setSubmitting(true);
    return;
  };

  //   console.log("user id", props.login?.login?.user?.id);

  return (
    <Card>
      <CardHeader className="bg-warning text-white">
        <div className="">
          <strong>Enquiry</strong>
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
            Add Enquiry
          </Button>
        </div>
        <Modal
          className="modal-info modal-lg"
          isOpen={modal}
          toggle={toggle}
          backdrop="static"
        >
          <ModalHeader toggle={toggle}>Add New Enquiry</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                franchise_company_id: "",
                franchiser_id: "",
                customer_id: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                franchise_company_id: Yup.string().required(
                  "Franchise is required"
                ),
                franchiser_id: Yup.string().required("Franchiser is required"),
                customer_id: Yup.string().required("Customer is required"),
              })}
            >
              {(formProps) => (
                <Form>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="franchiser_id">Select Franchisor</Label>
                      <InputGroup>
                        <Field
                          component={CustomSelect}
                          type="select"
                          name="franchiser_id"
                          id="franchiser_id"
                          placeholder="Enter Full Name"
                          className={
                            "form-control" +
                            (formProps.errors.franchiser_id &&
                            formProps.touched.franchiser_id
                              ? " is-invalid"
                              : "")
                          }
                        >
                          <option>Select Franchisor</option>
                          {props.franchisor?.map((fran) => (
                            <option value={fran.id}>{fran.name}</option>
                          ))}
                        </Field>

                        <ErrorMessage
                          name="franchiser_id"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="franchise_company_id">Select Franchise</Label>
                      <InputGroup>
                        <Field
                          component={CustomSelect}
                          type="select"
                          name="franchise_company_id"
                          id="franchise_company_id"
                          placeholder="Enter Full Name"
                          className={
                            "form-control" +
                            (formProps.errors.franchise_company_id &&
                            formProps.touched.franchise_company_id
                              ? " is-invalid"
                              : "")
                          }
                        >
                          <option>Select Franchise</option>
                          {props.franchise?.map((fran) => {
                            if (fran.id == formProps.values.franchiser_id)
                              return (
                                <option value={fran.id}>{fran.name}</option>
                              );
                          })}
                        </Field>

                        <ErrorMessage
                          name="franchise_company_id"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="customer_id">Select Customer</Label>
                      <InputGroup>
                        <Field
                          component={CustomSelect}
                          type="select"
                          name="customer_id"
                          id="customer_id"
                          placeholder="Enter Full Name"
                          className={
                            "form-control" +
                            (formProps.errors.customer_id &&
                            formProps.touched.customer_id
                              ? " is-invalid"
                              : "")
                          }
                        >
                          <option>Select Customer</option>
                          {props.customer?.map((fran) => {
                            if (fran.role == "user")
                              return (
                                <option value={fran.id}>{fran.name}</option>
                              );
                          })}
                        </Field>

                        <ErrorMessage
                          name="customer_id"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                    {/* <Col md={6}>
                      <Label for="lead_status">Select Lead Status</Label>
                      <InputGroup>
                        <Field
                          component={CustomSelect}
                          type="select"
                          name="lead_status"
                          id="lead_status"
                          placeholder="Enter Full Name"
                          className="form-control"
                        >
                          <option>Select Customer</option>
                          <option value={1}>Yes</option>
                          <option value={0}>No</option>
                        </Field>
                      </InputGroup>
                    </Col> */}
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
              <th scope="col">Customer Name</th>
              <th scope="col">Franchise Name</th>
              <th scope="col">Franchisor Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Aadhar No</th>
              <th scope="col">Pan Card No</th>
              <th scope="col">Pincode</th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody style={{ textTransform: "uppercase" }}>
            {props.lead.length > 0 ? (
              props.lead
                ?.filter((user) => user.lead_status == 0)
                .map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.customer?.name}</td>
                      <td>{user.company?.name}</td>
                      <td>{user.franchiser?.name}</td>
                      <td>{user.customer?.email}</td>
                      <td>{user.customer?.mobile}</td>
                      <td>{user.customer?.aadhar_no}</td>
                      <td>{user.customer?.pan_no}</td>
                      <td>{user.customer?.pincode}</td>

                      <td className="d-flex">
                        <EditEnquiries data={user} />

                        <Button
                          className="btn-danger ml-3 p-1"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this Enqiries?"
                              )
                            )
                              props.onDeleteLead(data, user.id);
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
    lead: state.lead.lead,
    franchise: state.franchise.franchise,
    customer: state.customer.customer,
    franchisor: state.franchisor.franchisor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCustomerGetData: (data) => dispatch(actions.customerGetData(data)),
    onFranchiseGetData: (data) => dispatch(actions.franchiseGetData(data)),
    onFranchisorGetData: (data) => dispatch(actions.franchisorGetData(data)),
    onLeadGetData: (data) => dispatch(actions.leadGetData(data)),
    onDeleteLead: (data, id) => dispatch(actions.deleteLead(data, id)),
    onPostLeadData: (data, user, toggle) =>
      dispatch(actions.postLeadData(data, user, toggle)),
    onUpdateLeadData: (data, user, toggle) =>
      dispatch(actions.updateLeadData(data, user, toggle)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Enquiries);

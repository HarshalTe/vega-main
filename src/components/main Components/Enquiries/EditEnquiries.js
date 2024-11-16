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

function EditEnquiries(props) {
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

    user.append("franchise_company_id", values.franchise_company_id);
    user.append("franchiser_id", values.franchiser_id);
    user.append("customer_id", values.customer_id);

    user.append("lead_status", values.lead_status);

    console.log("Data of Vendor:", user);
    props.onUpdateLeadData(data, user, toggle);
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
        <ModalHeader toggle={toggle}>Edit Enquiries</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              franchise_company_id: props.data?.franchise_company_id,
              franchiser_id: props.data?.franchiser_id,
              customer_id: props.data?.customer_id,
              lead_status: props.data?.lead_status,
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
                        {props.franchise?.map((fran) => (
                          <option value={fran.id}>{fran.name}</option>
                        ))}
                      </Field>

                      <ErrorMessage
                        name="franchise_company_id"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
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
                        {props.franchise?.map((fran) => {
                          if (fran.id == formProps.values.franchiser_id)
                            return <option value={fran.id}>{fran.name}</option>;
                        })}
                      </Field>

                      <ErrorMessage
                        name="franchiser_id"
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
                            return <option value={fran.id}>{fran.name}</option>;
                        })}
                      </Field>

                      <ErrorMessage
                        name="customer_id"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditEnquiries);

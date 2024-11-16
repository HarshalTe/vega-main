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

function EditDocument(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
    id: props.data?.id,
  };
  console.log("props122",props)

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Users:", values);

    const user = new FormData();

    user.append("file_type", values.file_type);
    user.append("doc", values.doc);
    user.append("remarks", values.remarks);
    user.append("company_id", values.company_id);
    user.append("customer_id", values.customer_id);
    user.append("file_name", values.file_name);
    user.append("location", values.location);
    user.append("created_date", values.created_date);


    console.log("Data of Users:", user);
    props.onUpdateDocument(data, user, toggle);
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
              file_type:props?.data?.file_type,
              remarks:props?.data?.remarks,
              customer_id:props?.data?.customer_id,
              company_id:props?.data?.company_id,
              created_date:props?.data?.created_date,
              location:props?.data?.location,
              file_name:props?.data?.file_name,
              doc:props?.data?.doc,
              
              // password_confirmation: props.data?.password_confirmation,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              // name: Yup.string().required("Name is required"),
              // phone: Yup.string().required("mobile Number is required"),
            })}
          >
            {(formProps) => (
              <Form>
              <Row className="form-group">
                <Col md={6}>
                  <Label for="customer_id">Customer Name</Label>
                  <InputGroup>
                  <Field
                      component={CustomSelect}
                      type="select"
                      name="customer_id"
                      id="customer_id"
                      placeholder="Select Customer"
                      className={
                        "form-control" +
                        (formProps.errors.customer_id &&
                        formProps.touched.customer_id
                          ? " is-invalid"
                          : "")
                      }
                    >
                      <option value="">Select Customer</option>
                      {props.customer?.map((cust) => {
                        return (
                          <option value={cust.id}>{cust.name}</option>
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
                <Col md={6}>
                  <Label for="company_id">
                  Company Name
                  </Label>
                  <InputGroup>
                    <Field
                      component={CustomSelect}
                      type="select"
                      name="company_id"
                      id="company_id"
                      placeholder="Company Name"
                      className={
                        "form-control" +
                        (formProps.errors.company_id &&
                        formProps.touched.company_id
                          ? " is-invalid"
                          : "")
                      }
                    >
                    <option value="">Select Company</option>
                    {props.company?.map((cust) => {
                      return (
                        <option value={cust.id}>{cust.name}</option>
                      );
                    })}
                    </Field>

                    <ErrorMessage
                      name="company_id"
                      component="div"
                      className="invalid-feedback"
                    />
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <Label for="file_type">File Type</Label>
                  <InputGroup>
                    <Field
                      component={CustomSelect}
                      type="select"
                      name="file_type"
                      id="file_type"
                      placeholder="file type"
                      className={
                        "form-control" +
                        (formProps.errors.file_type &&
                        formProps.touched.file_type
                          ? " is-invalid"
                          : "")
                      }
                    >
                        <option value="">Select Customer</option>
                        <option value="Invoice">Invoice</option>
                        <option value="Quotation">Quotation</option>
                        <option value="Thermal Mapping Certificate">Thermal Mapping Certificate</option>
                        <option value="Calibration Certificate">Calibration Certificate</option>
                        <option value="Master Certificate">Master Certificate</option>
                        <option value="Agreement">Agreement</option>
                        <option value="Other Document">Other Document</option>
                    </Field>

                    <ErrorMessage
                      name="file_type"
                      component="div"
                      className="invalid-feedback"
                    />
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <Label for="file_name">File Name</Label>
                  <InputGroup>
                    <Field
                      component={CustomSelect}
                      type="text"
                      name="file_name"
                      id="file_name"
                      placeholder="File Name"
                      className={
                        "form-control" +
                        (formProps.errors.file_name &&
                        formProps.touched.file_name
                          ? " is-invalid"
                          : "")
                      }
                    >
                    </Field>

                    <ErrorMessage
                      name="file_name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <Label for="created_date">Created Date</Label>
                  <InputGroup>
                  <Field
                    component={CustomInput}
                    type="date"
                    name="created_date"
                    id="created_date"
                    placeholder="Enter Quotation Valid Till"
                    className={
                      "form-control" +
                      (formProps.errors.created_date &&
                      formProps.touched.created_date
                        ? " is-invalid"
                        : "")
                    }
                  />

                  <ErrorMessage
                    name="created_date"
                    component="div"
                    className="invalid-feedback"
                  />
                </InputGroup>
                  {/* <InputGroup>
                    <Field
                      component={CustomSelect}
                      type="text"
                      name="file_name"
                      id="file_name"
                      placeholder="File Name"
                      className={
                        "form-control" +
                        (formProps.errors.file_name &&
                        formProps.touched.file_name
                          ? " is-invalid"
                          : "")
                      }
                    >
                    </Field>

                    <ErrorMessage
                      name="file_name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </InputGroup> */}
                </Col>
                <Col md={6}>
                  <Label for="location">Location</Label>
                  <InputGroup>
                    <Field
                      component={CustomSelect}
                      type="text"
                      name="location"
                      id="location"
                      placeholder="Location"
                      className={
                        "form-control" +
                        (formProps.errors.location &&
                        formProps.touched.location
                          ? " is-invalid"
                          : "")
                      }
                    >
                    </Field>

                    <ErrorMessage
                      name="location"
                      component="div"
                      className="invalid-feedback"
                    />
                  </InputGroup>
                </Col>
              </Row>
                          <Row className="form-group">
              {/* <Row className="form-group"> */}
              <Col md={6}>
              <Label for="doc">Upload File</Label>
                <InputGroup>
                  <input
                    component={CustomInput}
                    type="file"
                    name="doc"
                    id="doc"
                    onChange={(event) => {
                      formProps.setFieldValue(
                        "doc",
                        event.currentTarget.files[0]
                      );
                    }}
                    className="form-group"
                  />
                </InputGroup>
            </Col>
              {/* </Row> */}
                <Col md={6}>
                  <Label for="remarks">
                  Remarks
                  </Label>
                  <InputGroup>
                    <Field
                      component={CustomSelect}
                      type="text"
                      name="remarks"
                      id="remarks"
                      placeholder="Remarks"
                      className={
                        "form-control" +
                        (formProps.errors.remarks &&
                        formProps.touched.remarks
                          ? " is-invalid"
                          : "")
                      }
                    >
                    </Field>

                    <ErrorMessage
                      name="remarks"
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
    quotation: state.quotation,
    cols: state.cols.cols,
    customer: state.customer.customer,
    rows: state.rows.rows,
    company: state.company.company,
    document: state.document,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateDocument: (data, user, toggle) => dispatch(actions.updateDocument(data, user, toggle)),
    // onDeleteUsers: (data, id) => dispatch(actions.deleteUsers(data, id)),
    // onPostUsersData: (data, user, toggle) =>
    //   dispatch(actions.postUsersData(data, user, toggle)),
    // onUpdateUsersData: (data, user, toggle) =>
    //   dispatch(actions.updateUsersData(data, user, toggle)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditDocument);

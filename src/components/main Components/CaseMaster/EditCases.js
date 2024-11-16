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

function EditCases(props) {
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
    console.log("values in cases:", values);

    const user = new FormData();

    user.append("company_id", values.company_id);
    user.append("user_id", values.user_id);
    user.append("identification_no", values.identification_no);
    user.append("company_address_id", values.company_address_id);
    user.append("report_no", values.report_no);
    user.append("type_of_room", values.type_of_room);
    user.append("type_of_cycle", values.type_of_cycle);
    user.append("is_humidity", values.is_humidity);
    // user.append("extras", JSON.stringify(values.extras));

    console.log("Data of cases:", user);
    props.onUpdateCasesData(data, user, toggle);
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
        <ModalHeader toggle={toggle}>Edit Reports</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              company_id: props.data?.company?.id,
              user_id: props.login?.login?.user?.id,
              identification_no: props.data?.identification_no,
              company_address_id: props.data?.company_address_id,
              report_no: props.data?.report_no,
              type_of_room: props.data?.type_of_room,
              type_of_cycle: props.data?.type_of_cycle,
              is_humidity: props.data?.is_humidity,
              extras:{
                "pos2_3": "",
              "pos1_3": "",
              "pos2_2": "",
              "mkt3": "",
              "pos1_2":""
            }
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              company_id: Yup.string().required("Customer is required"),
              identification_no: Yup.string().required(
                "Identification No is required"
              ),
              report_no: Yup.string().required("Report No is required"),
              type_of_room: Yup.string().required(
                "Type of Room no is required"
              ),
              type_of_cycle: Yup.string().required(
                "Type of Cycle no is required"
              ),
            })}
          >
            {(formProps) => (
              <Form>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="company_id">Select Customer</Label>
                    <InputGroup>
                      <Field
                        component={CustomSelect}
                        type="select"
                        name="company_id"
                        id="company_id"
                        placeholder="Select Customer"
                        className={
                          "form-control" +
                          (formProps.errors.company_id &&
                          formProps.touched.company_id
                            ? " is-invalid"
                            : "")
                        }
                      >
                        <option value="">Select Customer</option>
                        {props.company?.map((cust) => (
                          <option value={cust.id}>{cust.name}</option>
                        ))}
                      </Field>

                      <ErrorMessage
                        name="company_id"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="identification_no">Identification No</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="identification_no"
                        id="identification_no"
                        placeholder="Enter Identification No"
                        className={
                          "form-control" +
                          (formProps.errors.identification_no &&
                          formProps.touched.identification_no
                            ? " is-invalid"
                            : "")
                        }
                      />

                      <ErrorMessage
                        name="identification_no"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="form-group">
                      <Col md={12}>
                        <Label for="company_address_id">
                          Select Customer Address
                        </Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="company_address_id"
                            id="company_address_id"
                            placeholder="Select Customer Address"
                            className={
                              "form-control" +
                              (formProps.errors.company_address_id &&
                              formProps.touched.company_address_id
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option value="">Select Customer Address</option>
                            {props.company
                              ?.filter(
                                (c) => c.id == formProps.values.company_id
                              )
                              .map((cust) =>
                                cust.addresses?.map((addr) => (
                                  <option
                                    value={addr.id}
                                  >{`${addr.location} ${addr.area} ${addr.city}`}</option>
                                ))
                              )}
                          </Field>

                          <ErrorMessage
                            name="company_address_id"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="report_no">Report No</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="report_no"
                        id="report_no"
                        placeholder="Enter Report No"
                        className={
                          "form-control" +
                          (formProps.errors.report_no &&
                          formProps.touched.report_no
                            ? " is-invalid"
                            : "")
                        }
                      />

                      <ErrorMessage
                        name="report_no"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>

                  <Col md={6}>
                    <Label for="type_of_room">Select Type of Room</Label>
                    <InputGroup>
                      <Field
                        component={CustomSelect}
                        type="select"
                        name="type_of_room"
                        id="type_of_room"
                        placeholder="Select Type of Room"
                        className={
                          "form-control" +
                          (formProps.errors.type_of_room &&
                          formProps.touched.type_of_room
                            ? " is-invalid"
                            : "")
                        }
                      >
                        <option value="">Select Type of Room</option>
                        {props.rows
                          ?.filter((row) => row.col_id == 1)
                          .map((row) => (
                            <option value={row.name}>{row.name}</option>
                          ))}
                      </Field>

                      <ErrorMessage
                        name="type_of_room"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                </Row>

                <Row className="form-group">
                  <Col md={6}>
                    <Label for="type_of_cycle">Select Type of Cycle</Label>
                    <InputGroup>
                      <Field
                        component={CustomSelect}
                        type="select"
                        name="type_of_cycle"
                        id="type_of_cycle"
                        placeholder="Select Type of Cycle"
                        className={
                          "form-control" +
                          (formProps.errors.type_of_cycle &&
                          formProps.touched.type_of_cycle
                            ? " is-invalid"
                            : "")
                        }
                      >
                        <option value="">Select Type of Cycle</option>
                        {props.rows
                          ?.filter((row) => row.col_id == 2)
                          .map((row) => (
                            <option value={row.name}>{row.name}</option>
                          ))}
                      </Field>

                      <ErrorMessage
                        name="type_of_cycle"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                        <Label for="is_humidity">Humidity</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="is_humidity"
                            id="is_humidity"
                            placeholder="Select"
                            className={
                              "form-control" +
                              (formProps.errors.is_humidity &&
                              formProps.touched.is_humidity
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option value="">Select Humidity</option>
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                          </Field>

                          <ErrorMessage
                            name="is_humidity"
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
    cases: state.cases,
    cols: state.cols.cols,
    customer: state.customer.customer,
    rows: state.rows.rows,
    company: state.company.company,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCasesGetData: (data) => dispatch(actions.casesGetData(data)),
    onDeleteCases: (data, id) => dispatch(actions.deleteCases(data, id)),
    onPostCasesData: (data, user, toggle) =>
      dispatch(actions.postCasesData(data, user, toggle)),
    onUpdateCasesData: (data, user, toggle) =>
      dispatch(actions.updateCasesData(data, user, toggle)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditCases);

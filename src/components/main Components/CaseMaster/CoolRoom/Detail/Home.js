/* eslint-disable eqeqeq */
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Label,
  InputGroup,
} from "reactstrap";

import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../../../../../views/custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../../../redux/action";

import CustomSelect from "../../../../../views/custom/CustomSelect";
import { useParams } from "react-router-dom";

function Home(props) {
  const accessToken = `${props.login?.login?.token}`;
  const param = useParams();

  let data = {
    token: accessToken,
    id: param?.id,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    props.toggle("area");
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Cases:", values);
    setSubmitting(true);

    const user = new FormData();

    user.append("customer_id", values.customer_id);
    user.append("user_id", values.user_id);
    user.append("mapping_start_date", values.mapping_start_date);
    user.append("mapping_end_date", values.mapping_end_date);
    user.append("next_due_date", values.next_due_date);

    console.log("Data of cases:", user);
    props.onUpdateCasesData(data, user, toggle, setSubmitting);
    // props.toggle("area");
    return;
  };

  return (
    <Card>
      <CardHeader className="bg-warning text-white">
        <div className="">
          <i className="fa fa-home mr-1" />
          <strong>Cases</strong>
        </div>
      </CardHeader>
      <CardBody>
        {props.cases?.cases
          ?.filter((c) => c.id == param.id)
          .map((user) => {
            return (
              <Formik
                key={user.id}
                initialValues={{
                  customer_id: user.company_id ?? "",
                  company_address_id: user.company_address_id ?? "",
                  user_id: user.user_id ?? "",
                  identification_no: user.identification_no ?? "",
                  report_no: user.report_no ?? "",
                  type_of_room: user.type_of_room ?? "",
                  type_of_cycle: user.type_of_cycle ?? "",
                  mapping_start_date: user.mapping_start_date ?? "",
                  mapping_end_date: user.mapping_end_date ?? "",
                  next_due_date: user.next_due_date ?? "",
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                  mapping_start_date: Yup.string().required(
                    "Mapping start Date  is required"
                  ),
                  mapping_end_date: Yup.string().required(
                    "Mapping end Date  is required"
                  ),
                  next_due_date: Yup.string().required(
                    "Next Due Date  is required"
                  ),
                })}
              >
                {(formProps) => {
                  return (
                    <Form>
                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="customer_id">Select Customer</Label>
                          <InputGroup>
                            {/* {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : ( */}
                            <Field
                              component={CustomSelect}
                              type="select"
                              name="customer_id"
                              id="customer_id"
                              placeholder="Select Customer"
                              disabled
                              className={
                                "form-control" +
                                (formProps.errors.customer_id &&
                                formProps.touched.customer_id
                                  ? " is-invalid"
                                  : "")
                              }
                            >
                              <option value="">Select Customer</option>
                              {props.company?.map((cust) => (
                                <option value={cust.id}>{cust.name}</option>
                              ))}
                            </Field>
                            {/* )} */}
                          </InputGroup>
                        </Col>
                        <Col md={6}>
                          <Label for="identification_no">
                            Identification No
                          </Label>
                          <InputGroup>
                            {/* {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : ( */}
                            <Field
                              component={CustomInput}
                              type="text"
                              name="identification_no"
                              id="identification_no"
                              placeholder="Enter Identification No"
                              disabled
                              className={
                                "form-control" +
                                (formProps.errors.identification_no &&
                                formProps.touched.identification_no
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            {/* )} */}
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
                              disabled
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
                                  (c) => c.id == formProps.values.customer_id
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
                            {/* {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : ( */}
                            <Field
                              component={CustomInput}
                              type="text"
                              name="report_no"
                              id="report_no"
                              placeholder="Enter Report No"
                              disabled
                              className={
                                "form-control" +
                                (formProps.errors.report_no &&
                                formProps.touched.report_no
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            {/* )} */}
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="type_of_room">Select Type of Room</Label>
                          <InputGroup>
                            {/* {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : ( */}
                            <Field
                              component={CustomSelect}
                              type="select"
                              name="type_of_room"
                              id="type_of_room"
                              placeholder="Select Type of Room"
                              disabled
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
                                  <option key={row.id} value={row.name}>
                                    {row.name}
                                  </option>
                                ))}
                            </Field>
                            {/* )} */}

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
                          <Label for="type_of_cycle">
                            Select Type of Cycle
                          </Label>
                          <InputGroup>
                            {/* {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : ( */}
                            <Field
                              component={CustomSelect}
                              type="select"
                              name="type_of_cycle"
                              id="type_of_cycle"
                              disabled
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
                                  <option key={row.id} value={row.name}>
                                    {row.name}
                                  </option>
                                ))}
                            </Field>
                            {/* )} */}

                            <ErrorMessage
                              name="type_of_cycle"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="mapping_start_date">
                            Mapping Start Date
                          </Label>
                          <InputGroup>
                            {/* {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : ( */}
                            <Field
                              component={CustomInput}
                              type="date"
                              name="mapping_start_date"
                              id="mapping_start_date"
                              placeholder="Enter mapping start date"
                              className={
                                "form-control" +
                                (formProps.errors.mapping_start_date &&
                                formProps.touched.mapping_start_date
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            {/* )} */}

                            <ErrorMessage
                              name="mapping_start_date"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                        <Col md={6}>
                          <Label for="mapping_end_date">Mapping End Date</Label>
                          <InputGroup>
                            {/* {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : ( */}
                            <Field
                              component={CustomInput}
                              type="date"
                              name="mapping_end_date"
                              id="mapping_end_date"
                              className={
                                "form-control" +
                                (formProps.errors.mapping_end_date &&
                                formProps.touched.mapping_end_date
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            {/* )} */}

                            <ErrorMessage
                              name="mapping_end_date"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="next_due_date">Next Due Date</Label>
                          <InputGroup>
                            {/* {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : ( */}
                            <Field
                              component={CustomInput}
                              type="text"
                              name="next_due_date"
                              id="next_due_date"
                              className={
                                "form-control" +
                                (formProps.errors.next_due_date &&
                                formProps.touched.next_due_date
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            {/* )} */}

                            <ErrorMessage
                              name="next_due_date"
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
                  );
                }}
              </Formik>
            );
          })}
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    cases: state.cases,
    editcase: state.cases.editcase,
    cols: state.cols.cols,
    customer: state.customer.customer,
    rows: state.rows.rows,
    company: state.company.company,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCustomerGetData: (data) => dispatch(actions.customerGetData(data)),
    onRowsGetData: (data) => dispatch(actions.rowsGetData(data)),
    onColsGetData: (data) => dispatch(actions.colsGetData(data)),
    onCasesGetData: (data) => dispatch(actions.casesGetData(data)),
    onDeleteCases: (data, id) => dispatch(actions.deleteCases(data, id)),
    onPostCasesData: (data, user, toggle) =>
      dispatch(actions.postCasesData(data, user, toggle)),
    onUpdateCasesData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateCasesData(data, user, toggle, setSubmitting)),
    casesEditGetData: (data) => dispatch(actions.casesEditGetData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

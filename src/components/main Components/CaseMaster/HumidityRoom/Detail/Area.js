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
import Loader2 from "../../../../loader/Loader2";
import CustomSelect from "../../../../../views/custom/CustomSelect";
import { useParams } from "react-router-dom";

function Area(props) {
  const accessToken = `${props.login?.login?.token}`;
  const param = useParams();

  let data = {
    token: accessToken,
    id: param?.id,
  };
  const [modal, setModal] = useState(false);

  const toggle = () => {
    props.toggle("cycle");
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Cases:", values);

    setSubmitting(true);
    const user = new FormData();
    user.append("customer_id", values.customer_id);
    user.append("user_id", values.user_id);

    user.append("cycle", values.cycle);
    user.append("capacity", values.capacity);
    user.append("model_no", values.model_no);
    user.append("set_point", values.set_point);
    user.append("operating_range", values.operating_range);
    user.append("min_operating_range", values.min_operating_range);
    user.append("max_operating_range", values.max_operating_range);
    user.append("min_operating_range1", values.min_operating_range1);
    user.append("max_operating_range1", values.max_operating_range1);
    user.append("load_status", values.load_status);
    user.append("usage_area", values.usage_area);
    user.append(
      "continuous_cycle_start_date",
      values.continuous_cycle_start_date
    );
    user.append("continuous_cycle_end_date", values.continuous_cycle_end_date);
    user.append("no_of_cycles", values.no_of_cycles);
    user.append(
      "calibration_certificate_no",
      values.calibration_certificate_no
    );
    user.append(
      "details_of_master_instrument",
      values.details_of_master_instrument
    );

    console.log("Data of cases:", user);
    props.onUpdateCasesData(data, user, toggle, setSubmitting);

    return;
  };

  return (
    <Card>
      <CardHeader className="bg-success text-white">
        <div className="">
          <i className="fa fa-home mr-1" />
          <strong>
            Area/Equipment Details For "{props.editcase?.type_of_room}" (PQ),
            Mapping And Cycle Detail
          </strong>
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
                  customer_id: user.customer_id,
                  user_id: user.user_id,
                  capacity: user.capacity ? user.capacity : "",
                  model_no: user.model_no ? user.model_no : "",
                  operating_range: user.operating_range
                    ? user.operating_range
                    : "",
                  min_operating_range: user.min_operating_range
                    ? user.min_operating_range
                    : "",
                  max_operating_range: user.max_operating_range
                    ? user.max_operating_range
                    : "",
                  min_operating_range1: user.min_operating_range1
                    ? user.min_operating_range1
                    : "",
                  max_operating_range1: user.max_operating_range1
                    ? user.max_operating_range1
                    : "",
                  usage_area: user.usage_area ? user.usage_area : "",
                  cycle: user.cycle ? user.cycle : "",
                  load_status: user.load_status
                    ? user.load_status
                    : user.type_of_cycle == "(OQ)"
                    ? "Loaded"
                    : "Empty",
                  continuous_cycle_start_date: user.continuous_cycle_start_date
                    ? user.continuous_cycle_start_date
                    : "",
                  continuous_cycle_end_date: user.continuous_cycle_end_date
                    ? user.continuous_cycle_end_date
                    : "",
                  no_of_cycles: user.no_of_cycles ? user.no_of_cycles : "",
                  set_point: user.set_point ? user.set_point : "(Ambient)",
                  calibration_certificate_no: user.calibration_certificate_no
                    ? user.calibration_certificate_no
                    : "As Per Attached Annexure",
                  details_of_master_instrument:
                    user.details_of_master_instrument
                      ? user.details_of_master_instrument
                      : "Wireless Data Logger",
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                  continuous_cycle_start_date:
                    Yup.string().required("required"),
                  continuous_cycle_end_date: Yup.string().required("required"),
                  no_of_cycles: Yup.string().required("required"),
                  details_of_master_instrument:
                    Yup.string().required("required"),
                  calibration_certificate_no: Yup.string().required("required"),
                })}
              >
                {(formProps) => {
                  return (
                    <Form>
                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="capacity">Location</Label>
                          <InputGroup>
                            {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : (
                              <Field
                                component={CustomInput}
                                type="text"
                                name="capacity"
                                id="capacity"
                                placeholder="Enter Location"
                                className={
                                  "form-control" +
                                  (formProps.errors.capacity &&
                                  formProps.touched.capacity
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                            )}
                          </InputGroup>
                        </Col>
                        <Col md={6}>
                          <Label for="model_no">CFA</Label>
                          <InputGroup>
                            {/* {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : ( */}
                            <Field
                              component={CustomInput}
                              type="text"
                              name="model_no"
                              id="model_no"
                              placeholder="CFA"
                              className={
                                "form-control" +
                                (formProps.errors.model_no &&
                                formProps.touched.model_no
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            {/* )} */}
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="min_operating_range">
                            Acceptable Starting Operating Range Temperature (°C)
                          </Label>
                          <InputGroup>
                            {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : (
                              <Field
                                component={CustomInput}
                                type="number"
                                name="min_operating_range"
                                id="min_operating_range"
                                placeholder="Enter Starting Operating Range"
                                className={
                                  "form-control" +
                                  (formProps.errors.min_operating_range &&
                                  formProps.touched.min_operating_range
                                    ? " is-invalid"
                                    : "")
                                }
                              ></Field>
                            )}
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="max_operating_range">
                            Acceptable Ending Operating Range Temperature (°C)
                          </Label>
                          <InputGroup>
                            {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : (
                              <Field
                                component={CustomInput}
                                type="number"
                                name="max_operating_range"
                                id="max_operating_range"
                                placeholder="Enter Ending Operating Range"
                                className={
                                  "form-control" +
                                  (formProps.errors.max_operating_range &&
                                  formProps.touched.max_operating_range
                                    ? " is-invalid"
                                    : "")
                                }
                              ></Field>
                            )}
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="min_operating_range1">
                            {/* Second Acceptable Starting Operating Range Temperature (°C) */}
                          Acceptable Starting Operating Range Humidity %RH 
                          </Label>
                          <InputGroup>
                            {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : (
                              <Field
                                component={CustomInput}
                                type="number"
                                name="min_operating_range1"
                                id="min_operating_range1"
                                placeholder="Enter Starting Operating Range"
                                className={
                                  "form-control" +
                                  (formProps.errors.min_operating_range1 &&
                                  formProps.touched.min_operating_range1
                                    ? " is-invalid"
                                    : "")
                                }
                              ></Field>
                            )}
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="max_operating_range1">
                          {/* Second Acceptable Ending Operating Range Temperature (°C) */}
                          Acceptable Ending Operating Range Humidity %RH 
                          </Label>
                          <InputGroup>
                            {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : (
                              <Field
                                component={CustomInput}
                                type="number"
                                name="max_operating_range1"
                                id="max_operating_range1"
                                placeholder="Enter Ending Operating Range"
                                className={
                                  "form-control" +
                                  (formProps.errors.max_operating_range1 &&
                                  formProps.touched.max_operating_range1
                                    ? " is-invalid"
                                    : "")
                                }
                              ></Field>
                            )}
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="cycle">Cycle Duration</Label>
                          <InputGroup>
                            {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : (
                              <Field
                                component={CustomInput}
                                type="text"
                                name="cycle"
                                id="cycle"
                                placeholder="Enter Cycle Duration"
                                className={
                                  "form-control" +
                                  (formProps.errors.cycle &&
                                  formProps.touched.cycle
                                    ? " is-invalid"
                                    : "")
                                }
                              ></Field>
                            )}
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="usage_area">Usage Of The Area</Label>
                          <InputGroup>
                            <Field
                              component={CustomSelect}
                              type="select"
                              name="usage_area"
                              id="usage_area"
                              placeholder="Usage Of The Area"
                              className={
                                "form-control" +
                                (formProps.errors.usage_area &&
                                formProps.touched.usage_area
                                  ? " is-invalid"
                                  : "")
                              }
                            >
                              <option value="">Usage Of The Area</option>
                              {props.rows
                                ?.filter((row) => row.col_id == 9)
                                .map((row) => (
                                  <option key={row.id} value={row.name}>
                                    {row.name}
                                  </option>
                                ))}
                            </Field>

                            <ErrorMessage
                              name="usage_area"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="operating_range">
                            No. of Sensing Point
                          </Label>
                          <InputGroup>
                            {/* {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : ( */}
                            <Field
                              component={CustomInput}
                              type="text"
                              name="set_point"
                              id="set_point"
                              placeholder="Enter No of Sensing Point"
                              className={
                                "form-control" +
                                (formProps.errors.set_point &&
                                formProps.touched.set_point
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            {/* )} */}
                            <ErrorMessage
                              name="set_point"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                        <Col md={6}>
                          <Label for="load_status">Load Status</Label>
                          <InputGroup>
                            {/* {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : ( */}
                            <Field
                              component={CustomSelect}
                              type="select"
                              name="load_status"
                              id="load_status"
                              placeholder="Select Load Status"
                              className={
                                "form-control" +
                                (formProps.errors.load_status &&
                                formProps.touched.load_status
                                  ? " is-invalid"
                                  : "")
                              }
                            >
                              <option value="">Select Load Status</option>
                              {props.rows
                                ?.filter((row) => row.col_id == 4)
                                .map((row) => (
                                  <option key={row.id} value={row.name}>
                                    {row.name}
                                  </option>
                                ))}
                            </Field>

                            {/* )} */}

                            <ErrorMessage
                              name="load_status"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="continuous_cycle_start_date">
                            Mapping Cycle Start Date
                          </Label>
                          <InputGroup>
                            {/* {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : ( */}
                            <Field
                              component={CustomInput}
                              type="date"
                              name="continuous_cycle_start_date"
                              id="continuous_cycle_start_date"
                              placeholder="Enter Mapping Cycle Start Date"
                              className={
                                "form-control" +
                                (formProps.errors.continuous_cycle_start_date &&
                                formProps.touched.continuous_cycle_start_date
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            {/* )} */}

                            <ErrorMessage
                              name="continuous_cycle_start_date"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                        <Col md={6}>
                          <Label for="continuous_cycle_end_date">
                            Mapping Cycle End Date
                          </Label>
                          <InputGroup>
                            {/* {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : ( */}
                            <Field
                              component={CustomInput}
                              type="date"
                              name="continuous_cycle_end_date"
                              id="continuous_cycle_end_date"
                              className={
                                "form-control" +
                                (formProps.errors.continuous_cycle_end_date &&
                                formProps.touched.continuous_cycle_end_date
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            {/* )} */}

                            <ErrorMessage
                              name="	continuous_cycle_end_date"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="no_of_cycles">
                            No. Of Cycles Performed
                          </Label>
                          <InputGroup>
                            {/* {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : ( */}
                            <Field
                              component={CustomInput}
                              type="number"
                              name="no_of_cycles"
                              id="no_of_cycles"
                              placeholder="No. Of Cycles Performed"
                              className={
                                "form-control" +
                                (formProps.errors.no_of_cycles &&
                                formProps.touched.no_of_cycles
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            {/* )} */}

                            <ErrorMessage
                              name="no_of_cycles"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="details_of_master_instrument">
                            Details of master instrument
                          </Label>
                          <InputGroup>
                            {/* {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : ( */}
                            <Field
                              component={CustomInput}
                              type="text"
                              name="details_of_master_instrument"
                              id="details_of_master_instrument"
                              placeholder="details of master instrument"
                              className={
                                "form-control" +
                                (formProps.errors
                                  .details_of_master_instrument &&
                                formProps.touched.details_of_master_instrument
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            {/* )} */}

                            <ErrorMessage
                              name="details_of_master_instrument"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="calibration_certificate_no">
                            Calibration Certificate No
                          </Label>
                          <InputGroup>
                            {/* {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : ( */}
                            <Field
                              component={CustomInput}
                              type="text"
                              name="calibration_certificate_no"
                              id="calibration_certificate_no"
                              placeholder="Calibration Certificate No"
                              className={
                                "form-control" +
                                (formProps.errors.calibration_certificate_no &&
                                formProps.touched.calibration_certificate_no
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            {/* )} */}

                            <ErrorMessage
                              name="calibration_certificate_no"
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
export default connect(mapStateToProps, mapDispatchToProps)(Area);

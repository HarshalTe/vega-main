/* eslint-disable eqeqeq */
import React, { useState } from "react";
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
} from "reactstrap";
import dateFormat from "dateformat";

import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../../../../../views/custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../../../redux/action";

import Loader from "../../../../loader/Loader2";
import { useParams } from "react-router-dom";
import EditMappingCycle from "./EditMappingCycle";
import CustomSelect from "../../../../../views/custom/CustomSelect";

function MappingCycle(props) {
  const accessToken = `${props.login?.login?.token}`;
  const param = useParams();

  let data = {
    token: accessToken,
    id: param?.id,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const continuousCycle = [
    "Continuous Operation Test Cycle",
    "Continuous Operation Test Cycle-I",
    "Continuous Operation Test Cycle-II",
  ];

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Cycle:", values);

    const user = new FormData();

    user.append("set_limit_cross_out_time", values.set_limit_cross_out_time);
    user.append("set_limit_cross_in_time", values.set_limit_cross_in_time);

    user.append("do_off_time", values.do_off_time);
    user.append("dcp_on_time", values.dcp_on_time);
    user.append("excersion", values.excersion);
    user.append("recovery", values.recovery);
    user.append("start_date", values.start_date);
    user.append("end_date", values.end_date);

    user.append("door_open_test_name", values.door_open_test_name);
    user.append("set_temp", values.set_temp);
    user.append("x_min_excersion", values.x_min_excersion);
    user.append("x_max_excersion", values.x_max_excersion);
    user.append("y_min_excersion", values.y_min_excersion);
    user.append("y_max_excersion", values.y_max_excersion);
    user.append("x_min_recovery", values.x_min_recovery);
    user.append("x_max_recovery", values.x_max_recovery);
    user.append("y_min_recovery", values.y_min_recovery);
    user.append("y_max_recovery", values.y_max_recovery);
    user.append("case_id", param.id);

    console.log("Data of Cycle:", user);
    props.onPostCycleData(data, user, toggle);
    setSubmitting(true);
    return;
  };

  return (
    <Card>
      <CardHeader className="bg-warning text-white">
        <div className="">
          <strong>Detail of Mapping Cycle</strong>

          <Button
            className="btn-success  float-right"
            onClick={() => {
              toggle();
            }}
          >
            Add
          </Button>
        </div>
        <Modal
          className="modal-info modal-lg"
          isOpen={modal}
          toggle={toggle}
          backdrop="static"
        >
          <ModalHeader toggle={toggle}>Add New Mapping Cycle</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                case_id: param.id,
                do_off_time: "",
                start_date: "",
                end_date: "",
                set_limit_cross_out_time: "",
                dcp_on_time: "",
                set_limit_cross_in_time: "",
                excersion: "",
                recovery: "",
                door_open_test_name: "",
                set_temp: "",
                x_min_excersion: "",
                x_max_excersion: "",
                y_min_excersion: "",
                y_max_excersion: "",
                x_min_recovery: "",
                x_max_recovery: "",
                y_min_recovery: "",
                y_max_recovery: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                start_date: Yup.string().required("Start Date is required"),
                end_date: Yup.string().required("End Date is required"),
                // set_limit_cross_out_time: Yup.string().required("required"),

                // set_limit_cross_in_time: Yup.string().required("required"),
              })}
            >
              {(formProps) => {
                formProps.values.case_id = props.editcase.id;
                return (
                  <Form>
                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="door_open_test_name">
                          Name Of The Cycle
                        </Label>
                        <InputGroup>
                        <Field
                          component={CustomSelect}
                          type="select"
                          name="door_open_test_name"
                          id="door_open_test_name"
                          placeholder="Name Of The Cycle"
                          className="form-control"
                        >
                          <option value="">Select Name of Cycle</option>
                          <option value="Continuous Operation Test Cycle">
                            {" "}
                            Continuous Operation Test Cycle
                          </option>
                          <option value="Continuous Operation Test Cycle-I">
                            {" "}
                            Continuous Operation Test Cycle-I
                          </option>
                          <option value="Continuous Operation Test Cycle-II">
                            {" "}
                            Continuous Operation Test Cycle-II
                          </option>
                          <option value="Continuous Operation Test Cycle-III">
                            {" "}
                            Continuous Operation Test Cycle-III
                          </option>
                          <option value="Door Open Test Cycle">
                            Door Open Test Cycle
                          </option>
                          <option value="Door Open Test Cycle-I">
                            Door Open Test Cycle-I
                          </option>
                          <option value="Door Open Test Cycle-II">
                            Door Open Test Cycle-II
                          </option>
                          <option value="Door Open Test Cycle-III">
                            Door Open Test Cycle-III
                          </option>
                          <option value="Power Failure Test Cycle">
                            Power Failure Test Cycle
                          </option>
                          <option value="Power Failure Test Cycle-I">
                            Power Failure Test Cycle-I
                          </option>
                          <option value="Power Failure Test Cycle-II">
                            Power Failure Test Cycle-II
                          </option>
                          <option value="Power Failure Test Cycle-III">
                            Power Failure Test Cycle-III
                          </option>
                          <option value="Start Up Study Test Cycle">
                            Start Up Study Test Cycle
                          </option>
                          <option value="Start Up Study Test Cycle-I">
                            Start Up Study Test Cycle-I
                          </option>
                          <option value="Start Up Study Test Cycle-II">
                            Start Up Study Test Cycle-II
                          </option>
                          <option value="Start Up Study Test Cycle-III">
                            Start Up Study Test Cycle-III
                          </option>
                          <option value="Relative Humidity Test Cycle">
                          Relative Humidity Test Cycle
                          </option>
                          <option value="Relative Humidity Test Cycle-I">
                          Relative Humidity Test Cycle-I
                          </option>
                          <option value="Relative Humidity Test Cycle-II">
                          Relative Humidity Test Cycle-II
                          </option>
                          <option value="Relative Humidity Test Cycle-III">
                          Relative Humidity Test Cycle-III
                          </option>
                          <option value="Equilibrium Test">
                            Equilibrium Test
                          </option>
                        </Field>
                        </InputGroup>
                      </Col>
                      <Col md={6}>
                        <Label for="set_temp">Set Temp.</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="set_temp"
                            id="set_temp"
                            placeholder="Enter Set Temp."
                            className="form-control"
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="start_date">Start Date</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="date"
                            name="start_date"
                            id="start_date"
                            placeholder=""
                            className={
                              "form-control" +
                              (formProps.errors.start_date &&
                              formProps.touched.start_date
                                ? " is-invalid"
                                : "")
                            }
                          />

                          <ErrorMessage
                            name="start_date"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                      <Col md={6}>
                        <Label for="end_date">End Date</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="date"
                            name="end_date"
                            id="end_date"
                            placeholder=""
                            className={
                              "form-control" +
                              (formProps.errors.end_date &&
                              formProps.touched.end_date
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="end_date"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="dcp_on_time">Start/On/Open time</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="time"
                            step="1"
                            name="dcp_on_time"
                            id="dcp_on_time"
                            className={
                              "form-control" +
                              (formProps.errors.dcp_on_time &&
                              formProps.touched.dcp_on_time
                                ? " is-invalid"
                                : "")
                            }
                          />

                          <ErrorMessage
                            name="dcp_on_time"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                      <Col md={6}>
                        <Label for="set_limit_cross_out_time">
                          Set limit cross out time
                        </Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="time"
                            step="1"
                            name="set_limit_cross_out_time"
                            id="set_limit_cross_out_time"
                            placeholder="Set limit cross out time"
                            className="form-control"
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="do_off_time">End/Off/Close Time</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="time"
                            step="1"
                            name="do_off_time"
                            id="do_off_time"
                            placeholder="DO/P-OFF Time"
                            className={
                              "form-control" +
                              (formProps.errors.do_off_time &&
                              formProps.touched.do_off_time
                                ? " is-invalid"
                                : "")
                            }
                          />

                          <ErrorMessage
                            name="do_off_time"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                      <Col md={6}>
                        <Label for="set_limit_cross_in_time">
                          set limit cross end time
                        </Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="time"
                            step="1"
                            name="set_limit_cross_in_time"
                            id="set_limit_cross_in_time"
                            placeholder="set limit cross in time"
                            className="form-control"
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="recovery">Recording Interval</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="recovery"
                            id="recovery"
                            placeholder="Recording Interval"
                            className="form-control"
                          >
                            <option value="">Select Recording Interval</option>
                            {props.rows
                              ?.filter((row) => row.col_id == 6)
                              .map((row) => (
                                <option key={row.id} value={row.name}>
                                  {row.name}
                                </option>
                              ))}
                          </Field>
                        </InputGroup>
                      </Col>
                    </Row>
                    {!continuousCycle.includes(
                      formProps.values.door_open_test_name
                    ) && formProps.values.door_open_test_name !== "" ? (
                      <>
                        <Row className="form-group">
                          <Col md={6}>
                            <Label for="x_min_excersion">X Min Excursion</Label>
                            <InputGroup>
                              <Field
                                component={CustomInput}
                                type="number"
                                name="x_min_excersion"
                                id="x_min_excersion"
                                placeholder="X Min Excursion"
                                className="form-control"
                              />
                            </InputGroup>
                          </Col>

                          <Col md={6}>
                            <Label for="x_max_excersion">X Max Excursion</Label>
                            <InputGroup>
                              <Field
                                component={CustomInput}
                                type="number"
                                name="x_max_excersion"
                                id="x_max_excersion"
                                placeholder="X Max Excursion"
                                className="form-control"
                              />
                            </InputGroup>
                          </Col>
                        </Row>

                        {/* <Row className="form-group">
                          <Col md={6}>
                            <Label for="y_min_excersion">Y Min Excursion</Label>
                            <InputGroup>
                              <Field
                                component={CustomInput}
                                type="number"
                                name="y_min_excersion"
                                id="y_min_excersion"
                                placeholder="Y Min Excursion"
                                className="form-control"
                              />
                            </InputGroup>
                          </Col>

                          <Col md={6}>
                            <Label for="y_max_excersion">Y Max Excursion</Label>
                            <InputGroup>
                              <Field
                                component={CustomInput}
                                type="number"
                                name="y_max_excersion"
                                id="y_max_excersion"
                                placeholder="Y Max Excursion"
                                className="form-control"
                              />
                            </InputGroup>
                          </Col>
                        </Row> */}

                        <Row className="form-group">
                          <Col md={6}>
                            <Label for="x_min_recovery">X Min Recovery</Label>
                            <InputGroup>
                              <Field
                                component={CustomInput}
                                type="number"
                                name="x_min_recovery"
                                id="x_min_recovery"
                                placeholder="X Min Recovery"
                                className="form-control"
                              />
                            </InputGroup>
                          </Col>

                          <Col md={6}>
                            <Label for="x_max_recovery">X Max Recovery</Label>
                            <InputGroup>
                              <Field
                                component={CustomInput}
                                type="number"
                                name="x_max_recovery"
                                id="x_max_recovery"
                                placeholder="X Max Recovery"
                                className="form-control"
                              />
                            </InputGroup>
                          </Col>
                        </Row>

                        {/* <Row className="form-group">
                          <Col md={6}>
                            <Label for="y_min_recovery">Y Min Recovery</Label>
                            <InputGroup>
                              <Field
                                component={CustomInput}
                                type="number"
                                name="y_min_recovery"
                                id="y_min_recovery"
                                placeholder="Y Min Recovery"
                                className="form-control"
                              />
                            </InputGroup>
                          </Col>

                          <Col md={6}>
                            <Label for="y_max_recovery">Y Max Recovery</Label>
                            <InputGroup>
                              <Field
                                component={CustomInput}
                                type="number"
                                name="y_max_recovery"
                                id="y_max_recovery"
                                placeholder="Y Max Recovery"
                                className="form-control"
                              />
                            </InputGroup>
                          </Col>
                        </Row> */}
                      </>
                    ) : (
                      ""
                    )}

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
              <th scope="col">Name of Cycle</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              {/* <th scope="col">Cycle Start Time (HH:MM:SS)</th> */}
              {/* <th scope="col">Recording Interval </th> */}
              <th scope="col">Off/Close Time</th>
              <th scope="col">Set Limit Cross Out Time</th>

              <th scope="col">On/Open Time</th>
              <th scope="col">Set Limit Cross In Time</th>

              <th scope="col">Excursion</th>
              <th scope="col">Recovery</th>
              <th scope="col">Set Temp</th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody style={{ textTransform: "uppercase" }}>
            {props.cycle?.isLoading ? (
              <tr>
                <td colSpan={18}>
                  <Loader color={"primary"} />
                </td>
              </tr>
            ) : props.cycle?.cycle?.length > 0 ? (
              props.cycle?.cycle
                .filter((c) => c.case_id == param.id)
                ?.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.door_open_test_name}</td>
                      <td>{dateFormat(user.start_date, "dd-mm-yyyy")}</td>
                      <td> {dateFormat(user.end_date, "dd-mm-yyyy")}</td>
                      <td>{user.do_off_time}</td>
                      <td>{user.set_limit_cross_out_time==null?"N/A":user.set_limit_cross_out_time}</td>
                      <td>{user.dcp_on_time}</td>
                      <td>{user.set_limit_cross_in_time==null?"N/A":user.set_limit_cross_in_time}</td>
                      <td>{user.excersion}</td>
                      <td>{user.recovery}</td>
                      <td>{user.set_temp}</td>

                      <td className="d-flex justify-content-center">
                        <EditMappingCycle data={user} />

                        {/* <Button
                          className="btn-danger ml-3 p-1"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this Cycle?"
                              )
                            )
                              props.onDeleteCycle(data, user.id);
                          }}
                        >
                          <i
                            className="fa fa-trash-alt "
                            value={user.id}
                            aria-hidden="true"
                          ></i>
                        </Button> */}
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td colSpan={3}>No Cycles</td>
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
    cycle: state.cycle,
    editcase: state.cases.editcase,
    rows: state.rows.rows,
    testType: state.testType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCycleGetData: (data) => dispatch(actions.cycleGetData(data)),
    onDeleteCycle: (data, id) => dispatch(actions.deleteCycle(data, id)),
    onPostCycleData: (data, user, toggle) =>
      dispatch(actions.postCycleData(data, user, toggle)),
    onUpdateCycleData: (data, user, toggle) =>
      dispatch(actions.updateCycleData(data, user, toggle)),
    casesEditGetData: (data) => dispatch(actions.casesEditGetData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MappingCycle);

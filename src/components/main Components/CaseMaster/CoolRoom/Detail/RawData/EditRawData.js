/* eslint-disable eqeqeq */
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Col,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import dateFormat from "dateformat";

// import DeleteButton from "../../../Helpers/DeleteButton";
import * as actions from "../../../../../../redux/action";
import CustomInput from "../../../../../../views/custom/CustomInput";
import CustomSelect from "../../../../../../views/custom/CustomSelect";

function EditRawData(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
    raw_id: props.data?.id,
    caseId: props.caseId,
    id: props.caseId,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in cases:", values);

    const user = new FormData();

    user.append("case_id", values.case_id);
    user.append("date", values.date);
    user.append("sensor", values.sensor);
    user.append("temp", values.temp);
    user.append("time", values.time);
    user.append("test_type_id", values.test_type_id);

    console.log("Data of cases:", user);
    props.updateRawDataData(data, user, toggle, setSubmitting);
    setSubmitting(true);
  };

  return (
    <div>
      <Button
        className="p-1 mr-2"
        color="warning"
        onClick={() => {
          toggle();
        }}
      >
        <i className="fa fa-edit" aria-hidden="true"></i>
      </Button>
      {/* <DeleteButton
        id={props.data?.id}
        deleteFunction={() => props.deleteRawData(data, props.data?.id)}
      /> */}
      <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Cases</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              case_id: props.data?.case_id,
              date: props.data?.date
                ? dateFormat(props.data?.date, "yyyy-mm-dd")
                : "",
              sensor: props.data?.sensor,
              temp: props.data?.temp,
              test_type_id: props.data?.test_type_id,
              time: props.data?.time,
            }}
            onSubmit={handleSubmit}
          >
            {(formProps) => (
              <Form>
                <Row className="form-group">
                  <Col md={12}>
                    <Label for="test_type_id">Select Test Type</Label>
                    <InputGroup>
                      <Field
                        component={CustomSelect}
                        type="select"
                        name="test_type_id"
                        id="test_type_id"
                        placeholder="Select Test Type"
                        className={
                          "form-control" +
                          (formProps.errors.test_type_id &&
                          formProps.touched.test_type_id
                            ? " is-invalid"
                            : "")
                        }
                      >
                        <option value="">Select Test Type</option>
                        {props.testType?.testType
                          ?.filter((row) => row.type_room == props.type_room)
                          .map((row) => (
                            <option value={row.id}>
                              {row.id}: {row.name}
                            </option>
                          ))}
                      </Field>

                      <ErrorMessage
                        name="test_type_id"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="sensor">Sensor</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="sensor"
                        id="sensor"
                        placeholder="Enter Sensor"
                        className={
                          "form-control" +
                          (formProps.errors.sensor && formProps.touched.sensor
                            ? " is-invalid"
                            : "")
                        }
                      />

                      <ErrorMessage
                        name="sensor"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>

                  <Col md={6}>
                    <Label for="temp">Temperature</Label>
                    <InputGroup>
                      <Field
                        component={CustomSelect}
                        type="text"
                        name="temp"
                        id="temp"
                        placeholder="Temperature"
                        className={
                          "form-control" +
                          (formProps.errors.temp && formProps.touched.temp
                            ? " is-invalid"
                            : "")
                        }
                      ></Field>

                      <ErrorMessage
                        name="temp"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                </Row>

                <Row className="form-group">
                  <Col md={6}>
                    <Label for="date">Select Date</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="date"
                        name="date"
                        id="date"
                        className={
                          "form-control" +
                          (formProps.errors.date && formProps.touched.date
                            ? " is-invalid"
                            : "")
                        }
                      />

                      <ErrorMessage
                        name="date"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="time">Time</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="time"
                        step="1"
                        name="time"
                        id="time"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="time"
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
    testType: state.testType,
    editcase: state.cases.editcase,
    rawData: state.rawData,
    tests: state.tests,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRawDataGetData: (data) => dispatch(actions.rawDataGetData(data)),
    deleteRawData: (data, id) => dispatch(actions.deleteRawData(data, id)),
    postRawDataData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postRawDataData(data, user, toggle, setSubmitting)),
    updateRawDataData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateRawDataData(data, user, toggle, setSubmitting)),
    rawDataUpdateAll: (data, user, toggle, setSubmitting) =>
      dispatch(actions.rawDataUpdateAll(data, user, toggle, setSubmitting)),
    casesEditGetData: (data) => dispatch(actions.casesEditGetData(data)),
    rawDataDeleteAll: (data, user) =>
      dispatch(actions.rawDataDeleteAll(data, user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditRawData);

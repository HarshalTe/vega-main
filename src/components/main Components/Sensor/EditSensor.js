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
import { imageUrl } from "../../../shared/imageUrl";

function EditSensor({ user, ...props }) {
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
    // console.log("values in sensor:", values);

    const user = new FormData();

    user.append("name", values.name);
    user.append("date", values.date);
    user.append("file", values.file);

    // console.log("Data of Vendor:", user);
    props.onUpdateSensorData(data, user, toggle);
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
        <ModalHeader toggle={toggle}>Edit Sensor</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: props.data?.name ?? "",
              date: props.data?.date ?? "",
              file: props.data?.file ?? "",
            }}
            onSubmit={handleSubmit}
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
                    <Label for="date">Select Date</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="date"
                        name="date"
                        id="date"
                        placeholder="Enter Date"
                        className="form-control"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="file">Upload File</Label>
                    {props.data?.file == "nofile.pdf" ? (
                      <InputGroup>
                        <input
                          component={CustomInput}
                          type="file"
                          name="file"
                          id="file"
                          onChange={(event) => {
                            formProps.setFieldValue(
                              "file",
                              event.currentTarget.files[0]
                            );
                          }}
                          className="form-group"
                        />
                      </InputGroup>
                    ) : (
                      <InputGroup>
                        <a
                          target={"_blank"}
                          href={`${imageUrl}Sensorfiles/${props.data?.file}`}
                          rel="noreferrer"
                        >
                          {props.data?.file}
                        </a>
                        <input
                          component={CustomInput}
                          type="file"
                          name="file"
                          id="file"
                          onChange={(event) => {
                            formProps.setFieldValue(
                              "file",
                              event.currentTarget.files[0]
                            );
                          }}
                          className="form-group"
                        />
                      </InputGroup>
                    )}
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
    sensor: state.sensor.sensor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSensorGetData: (data) => dispatch(actions.sensorGetData(data)),
    onDeleteSensor: (data, id) => dispatch(actions.deleteSensor(data, id)),
    onPostSensorData: (data, user, toggle) =>
      dispatch(actions.postSensorData(data, user, toggle)),
    onUpdateSensorData: (data, user, toggle) =>
      dispatch(actions.updateSensorData(data, user, toggle)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditSensor);

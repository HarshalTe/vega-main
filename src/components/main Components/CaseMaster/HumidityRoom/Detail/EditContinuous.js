import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  InputGroup,
  FormGroup,
} from "reactstrap";
import CustomSelect from "../../../../../views/custom/CustomSelect";

import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../../../../../views/custom/CustomInput";

import { connect } from "react-redux";
import * as actions from "../../../../../redux/action";

function Editcontinuous(props) {
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
    console.log("values in TestType:", values);

    const user = new FormData();
    user.append("name", values.name);
    user.append("type_room", props?.editcase?.type_of_room);

    console.log("Data of TestType:", user);
    props.onUpdateTestTypeData(data, user, toggle);
    setSubmitting(true);
    return;
  };

  return (
    <>
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
        <ModalHeader toggle={toggle}>Edit Test Cycle</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: props.data?.name,
            }}
            onSubmit={handleSubmit}
          >
            {(formProps) => {
              return (
                <Form>
                  <Row className="form-group">
                    <Col md={12}>
                      <Label for="name">Test Cycle Name</Label>
                      <FormGroup>
                        <InputGroup>
                        <Field
                                  component={CustomSelect}
                                  type="select"
                                  name="name"
                                  id="name"
                                  placeholder="Enter Cycle Name"
                                  className={
                                    "form-control" +
                                    (formProps.errors.name &&
                                      formProps.touched.name
                                      ? " is-invalid"
                                      : "")
                                    }
                                    >
                                  <option value="">Select Cycle Name</option>
                                  <option value="CONTINUOUS OPERATION TEST CYCLE">
                                  CONTINUOUS OPERATION TEST CYCLE
                                  </option>
                                  <option value="CONTINUOUS OPERATION TEST CYCLE-I">
                                  CONTINUOUS OPERATION TEST CYCLE-I
                                  </option>
                                  <option value="CONTINUOUS OPERATION TEST CYCLE-II">
                                  CONTINUOUS OPERATION TEST CYCLE-II
                                  </option>
                                  <option value="CONTINUOUS OPERATION TEST CYCLE-III">
                                  CONTINUOUS OPERATION TEST CYCLE-III
                                  </option>
                                  <option value="START UP STUDY TEST CYCLE">
                                  START UP STUDY TEST CYCLE
                                  </option>
                                  <option value="START UP STUDY TEST CYCLE-I">
                                  START UP STUDY TEST CYCLE-I
                                  </option>
                                  <option value="START UP STUDY TEST CYCLE-II">
                                  START UP STUDY TEST CYCLE-II
                                  </option>
                                  <option value="START UP STUDY TEST CYCLE-III">
                                  START UP STUDY TEST CYCLE-III
                                  </option>
                                  <option value="DOOR OPEN TEST CYCLE">
                                  DOOR OPEN TEST CYCLE
                                  </option>
                                  <option value="DOOR OPEN TEST CYCLE-I">
                                  DOOR OPEN TEST CYCLE-I
                                  </option>
                                  <option value="DOOR OPEN TEST CYCLE-II">
                                  DOOR OPEN TEST CYCLE-II
                                  </option>
                                  <option value="DOOR OPEN TEST CYCLE-III">
                                  DOOR OPEN TEST CYCLE-III
                                  </option>
                                  <option value="POWER FAILURE TEST CYCLE">
                                  POWER FAILURE TEST CYCLE
                                  </option>
                                  <option value="POWER FAILURE TEST CYCLE-I">
                                  POWER FAILURE TEST CYCLE-I
                                  </option>
                                  <option value="POWER FAILURE TEST CYCLE-II">
                                  POWER FAILURE TEST CYCLE-II
                                  </option>
                                  <option value="POWER FAILURE TEST CYCLE-III">
                                  POWER FAILURE TEST CYCLE-III
                                  </option>
                                  <option value="RELATIVE HUMIDITY TEST CYCLE-I">
                                  RELATIVE HUMIDITY TEST CYCLE-I
                                  </option>
                                  <option value="RELATIVE HUMIDITY TEST CYCLE-II">
                                  RELATIVE HUMIDITY TEST CYCLE-II
                                  </option>
                                  <option value="RELATIVE HUMIDITY TEST CYCLE-III">
                                  RELATIVE HUMIDITY TEST CYCLE-III
                                  </option>
                                </Field>
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </FormGroup>
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
        </ModalBody>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    testType: state.testType,
    editcase: state.cases.editcase,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTestTypeGetData: (data) => dispatch(actions.testTypeGetData(data)),
    onDeleteTestType: (data, id) => dispatch(actions.deleteTestType(data, id)),
    onPostTestTypeData: (data, user, toggle) =>
      dispatch(actions.postTestTypeData(data, user, toggle)),
    onUpdateTestTypeData: (data, user, toggle) =>
      dispatch(actions.updateTestTypeData(data, user, toggle)),
    casesEditGetData: (data) => dispatch(actions.casesEditGetData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Editcontinuous);

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

import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../../../../../views/custom/CustomInput";

import { connect } from "react-redux";
import * as actions from "../../../../../redux/action";

function ReeferEditcontinuous(props) {
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
    user.append("type_room", "Reefer Vehicle");
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
                    <Col md={6}>
                      <Label for="name">Test Cycle Name</Label>
                      <FormGroup>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="name"
                            id="name"
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReeferEditcontinuous);

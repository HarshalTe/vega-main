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

import { Formik, Form } from "formik";
import CustomInput from "../../../../views/custom/CustomInput";

import { connect } from "react-redux";
import * as actions from "../../../../redux/action";
import { imageUrl } from "../../../../../shared/imageUrl";

function EditData(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
    id: props.data?.id,
  };

  console.log("data", data);

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in File:", values);

    const user = new FormData();
    user.append("case_id", values.case_id);
    user.append("user_id", values.user_id);
    user.append("file_1", values.file_1);
    user.append("file_2", values.file_2);

    console.log("Data of File:", user);
    props.onUpdateFileData(data, user, toggle);
    setSubmitting(true);
    return;
  };

  //   console.log("user id", props.login?.login?.user?.id);

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
        <ModalHeader toggle={toggle}>Edit Mapping File</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              case_id: props.editcase.id,
              file_1: "",
              file_2: "",
              user_id: props.editcase.user_id,
            }}
            onSubmit={handleSubmit}
          >
            {(formProps) => {
              formProps.values.case_id = props.editcase.id;
              return (
                <Form>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="file_1">Upload Data Logger Image</Label>
                      <FormGroup>
                        {props?.data?.file_1 == "nofile.pdf" ? (
                          <InputGroup>
                            <input
                              component={CustomInput}
                              type="file"
                              name="file_1"
                              id="file_1"
                              onChange={(event) => {
                                formProps.setFieldValue(
                                  "file_1",
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
                              href={`${imageUrl}${props.editcase?.identification_no}/${props.data?.file_1}`}
                              rel="noreferrer"
                            >
                              {props.data?.file_1}
                            </a>
                            <input
                              component={CustomInput}
                              type="file"
                              name="file_1"
                              id="file_1"
                              onChange={(event) => {
                                formProps.setFieldValue(
                                  "file_1",
                                  event.currentTarget.files[0]
                                );
                              }}
                              className="form-group"
                            />
                          </InputGroup>
                        )}
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <Label for="file_2">Upload Position Logger Image</Label>
                      <FormGroup>
                        {props?.data?.file_2 == "nofile.pdf" ? (
                          <InputGroup>
                            <input
                              component={CustomInput}
                              type="file"
                              name="file_2"
                              id="file_2"
                              onChange={(event) => {
                                formProps.setFieldValue(
                                  "file_2",
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
                              href={`${imageUrl}${props.editcase?.identification_no}/${props.data?.file_2}`}
                              rel="noreferrer"
                            >
                              {props.data?.file_2}
                            </a>
                            <input
                              component={CustomInput}
                              type="file"
                              name="file_2"
                              id="file_2"
                              onChange={(event) => {
                                formProps.setFieldValue(
                                  "file_2",
                                  event.currentTarget.files[0]
                                );
                              }}
                              className="form-group"
                            />
                          </InputGroup>
                        )}
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
    file: state.file,
    editcase: state.cases.editcase,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFileGetData: (data) => dispatch(actions.fileGetData(data)),
    onDeleteFile: (data, id) => dispatch(actions.deleteFile(data, id)),
    onPostFileData: (data, user, toggle) =>
      dispatch(actions.postFileData(data, user, toggle)),
    onUpdateFileData: (data, user, toggle) =>
      dispatch(actions.updateFileData(data, user, toggle)),
    casesEditGetData: (data) => dispatch(actions.casesEditGetData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditData);

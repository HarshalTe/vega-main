/* eslint-disable eqeqeq */
import { LinearProgress } from "@material-ui/core";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Col,
  FormGroup,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import swal from "sweetalert";
import DeleteButton from "../../../../../Helpers/DeleteButton";
import * as actions from "../../../../../redux/action";
import { baseUrl } from "../../../../../shared/baseUrl";
import CustomInput from "../../../../../views/custom/CustomInput";
import CustomSelect from "../../../../../views/custom/CustomSelect";
import { imageUrl } from "./../../../../../shared/imageUrl";

function EditData(props) {
  const accessToken = `${props.login?.login?.token}`;
  let data = {
    token: accessToken,
    id: props.data.case_id,
  };

  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const authAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const toggle = () => {
    setModal(!modal);
  };

  const deleteData = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setIsLoading(true);
        authAxios
          .delete(`/cases-images/${props.data.id}`)
          .then((res) => {
            swal("Poof! Your data has been deleted!", {
              icon: "success",
            });
            props.casesEditGetData(data);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            swal("Oops! Something went wrong!", {
              icon: "error",
            });
          });
      } else {
        swal("Your data is safe!");
      }
    });
  };

  const handleSubmit2 = (values, { setSubmitting }) => {
    console.log("values in File:", values);
    setIsLoading(true);
    setSubmitting(true);
    const user = new FormData();

    user.append("id", props.data.id);
    user.append("case_id", values.case_id);
    user.append("name", values.name);
    user.append("file", values.file);

    authAxios
      .post(baseUrl + `cases-images`, user)
      .then((res) => {
        console.log("res of Case Image", res);
        props.onCasesGetData(data);
        props.casesEditGetData(data);
        swal(`Successfully Updated ${values.name}`).then(() => {
          toggle();
          setSubmitting(false);
          setIsLoading(false);
        });
      })
      .catch((err) => {
        console.log("error of  Case Image", err.response);
        setSubmitting(false);
        setIsLoading(false);
      });

    return;
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
      <DeleteButton
        id={props.data?.id}
        deleteFunction={() => deleteData(data, props.data?.id)}
      />
      <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Layout Image Data</ModalHeader>
        {isLoading ? <LinearProgress /> : ""}
        <ModalBody>
          <Formik
            initialValues={{
              case_id: props.data?.case_id,
              name: props.data?.name,
              file: props.data?.file,
            }}
            onSubmit={handleSubmit2}
          >
            {(formProps) => {
              return (
                <Form>
                  <Row className="form-group">
                    <Col md={12}>
                      <Label for="name">
                        Enter Layout Name (Like schematic_1 or isometric_1 )
                      </Label>
                      <InputGroup>
                        <Field
                          component={CustomSelect}
                          type="select"
                          name="name"
                          id="name"
                          placeholder="Enter Layout Name"
                          className={
                            "form-control" +
                            (formProps.errors.name && formProps.touched.name
                              ? " is-invalid"
                              : "")
                          }
                        >
                          <option value="">Select Layout Name</option>
                          <option value="schematic_1">
                            Schematic Layout 1
                          </option>
                          <option value="schematic_2">
                            Schematic Layout 2
                          </option>
                          <option value="schematic_3">
                            Schematic Layout 3
                          </option>
                          <option value="schematic_4">
                            Schematic Layout 4
                          </option>
                          <option value="schematic_5">
                            Schematic Layout 5
                          </option>
                          <option value="schematic_6">
                            Schematic Layout 6
                          </option>
                          <option value="schematic_7">
                            Schematic Layout 7
                          </option>
                          <option value="isometric_1">
                            Isometric Layout 1
                          </option>
                          <option value="isometric_2">
                            Isometric Layout 2
                          </option>
                          <option value="isometric_3">
                            Isometric Layout 3
                          </option>
                          <option value="isometric_4">
                            Isometric Layout 4
                          </option>
                          <option value="isometric_5">
                            Isometric Layout 5
                          </option>
                          <option value="isometric_6">
                            Isometric Layout 6
                          </option>
                          <option value="postion_logger_1">
                            Position Logger 1
                          </option>
                          <option value="postion_logger_2">
                            Position Logger 2
                          </option>
                          <option value="postion_logger_3">
                            Position Logger 3
                          </option>
                          <option value="postion_logger_4">
                            Position Logger 4
                          </option>
                          <option value="postion_logger_5">
                            Position Logger 5
                          </option>
                          <option value="hot_spot">
                                  Hot and Cold Spot - Range 1
                                  </option>
                                  <option value="cold_spot">
                                  Hot and Cold Spot - Range 2
                                  </option>
                                  <option value="cold_spot3">
                                  Hot and Cold Spot - Range 3
                                  </option>
                        </Field>

                        <ErrorMessage
                          name="name"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={12}>
                      <Label for="file">Upload Image</Label>
                      <FormGroup>
                        {props?.data?.file == "nofile.pdf" ? (
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
                              target={"blank"}
                              href={`${imageUrl}Cases-Files/${props.data?.file}`}
                              rel="noreferrer"
                            >
                              <span style={{ overflow: "hidden" }}>
                                {props.data?.file}
                              </span>
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    cases: state.cases,
    editcase: state.cases.editcase,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateCasesData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateCasesData(data, user, toggle, setSubmitting)),
    onCasesGetData: (data) => dispatch(actions.casesGetData(data)),
    casesEditGetData: (data) => dispatch(actions.casesEditGetData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditData);

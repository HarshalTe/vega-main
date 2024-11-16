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

import { Formik, Form } from "formik";
import CustomInput from "../../../../../views/custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../../../redux/action";
import Loader2 from "../../../../loader/Loader2";

import { useParams } from "react-router-dom";
import { FormGroup } from "@material-ui/core";
import { imageUrl } from "../../../../../shared/imageUrl";

function Annexures(props) {
  const accessToken = `${props.login?.login?.token}`;
  const param = useParams();

  let data = {
    token: accessToken,
    id: param?.id,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    props.toggle("final");
  };

  const user_id = props.editcase?.user_id ?? "";

  const userCertificate =
    props.users
      ?.filter((user) => user?.files?.length > 0)
      ?.filter((user) => user?.id == user_id)?.length > 0
      ? props.users
          ?.filter((user) => user?.files?.length > 0)
          ?.filter((user) => user?.id == user_id)[0]?.files
      : [];

  const sensorData =
    props.editsensor?.length > 0 ? props.editsensor.map((s) => s.sensor) : [];

  const sensorCertificate =
    props.sensor.length > 0
      ? props.sensor.filter((s) => sensorData.includes(s.name)).length > 0
        ? props.sensor.filter((s) => sensorData.includes(s.name))
        : []
      : [];

  // console.log("sensorCertificate", sensorCertificate);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in File:", values);

    setSubmitting(true);
    const user = new FormData();
    user.append("customer_id", values.customer_id);
    user.append("user_id", values.user_id);
    user.append("file_3", values.file_3);
    user.append("file_4", values.file_4);
    user.append("file_5", values.file_5);

    console.log("Data of File:", user);
    props.onUpdateCasesData(data, user, toggle, setSubmitting);
    return;
  };

  console.log("userCertificate", userCertificate);

  return (
    <Card>
      <CardHeader className="bg-success text-white">
        <div className="">
          <i className="fa fa-home mr-1" />
          <strong>List Of Annexures</strong>
        </div>
      </CardHeader>

      {props.cases?.cases
        ?.filter((c) => c.id == param.id)
        .map((user) => {
          return (
            <>
              <CardBody>
                <Formik
                  initialValues={{
                    customer_id: user.customer_id ? user.customer_id : "",
                    user_id: user.user_id ? user.user_id : "",
                    file_3: user.file_3,
                    file_4: user.file_4,
                    file_5: user.file_5,
                  }}
                  onSubmit={handleSubmit}
                >
                  {(formProps) => {
                    return (
                      <Form>
                        <Row className="form-group">
                          <Col md={6}>
                            <Label for="file_3">Raw Data File</Label>
                            <FormGroup>
                              {user.file_3 == "nofile.pdf" ? (
                                <InputGroup>
                                  <input
                                    component={CustomInput}
                                    type="file"
                                    name="file_3"
                                    id="file_3"
                                    onChange={(event) => {
                                      formProps.setFieldValue(
                                        "file_3",
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
                                    href={`${imageUrl}${user.identification_no}/${user.file_3}`}
                                    rel="noreferrer"
                                  >
                                    {user?.file_3}
                                  </a>
                                  <input
                                    component={CustomInput}
                                    type="file"
                                    name="file_3"
                                    id="file_3"
                                    onChange={(event) => {
                                      formProps.setFieldValue(
                                        "file_3",
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
                            <Label for="file_4">
                              Data Loggers Details & Master Traceability Reports
                            </Label>
                            <FormGroup>
                              {
                                // props.cases?.isLoading ? (
                                //   <Loader2 />
                                // ) :
                                user.file_4 == "nofile.pdf" ? (
                                  <InputGroup>
                                    <input
                                      component={CustomInput}
                                      type="file"
                                      name="file_4"
                                      id="file_4"
                                      onChange={(event) => {
                                        formProps.setFieldValue(
                                          "file_4",
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
                                      href={`${imageUrl}${user.identification_no}/${user.file_4}`}
                                      rel="noreferrer"
                                    >
                                      {user?.file_4}
                                    </a>
                                    <input
                                      component={CustomInput}
                                      type="file"
                                      name="file_4"
                                      id="file_4"
                                      onChange={(event) => {
                                        formProps.setFieldValue(
                                          "file_4",
                                          event.currentTarget.files[0]
                                        );
                                      }}
                                      className="form-group"
                                    />
                                  </InputGroup>
                                )
                              }
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Col md={6}>
                            <Label for="file_5">Training Certificate</Label>
                            <FormGroup>
                              {userCertificate?.length > 0
                                ? userCertificate?.map((file, index) => {
                                    return (
                                      <a
                                        target={"blank"}
                                        key={index}
                                        href={`${imageUrl}CompanyFiles/${file.file}`}
                                        rel="noreferrer"
                                      >
                                        {file.file}
                                      </a>
                                    );
                                  })
                                : "Please upload user certificate"}
                              {
                                // props.cases?.isLoading ? (
                                //   <Loader2 />
                                // ) :
                                user.file_5 == "nofile.pdf" ? (
                                  <InputGroup>
                                    <input
                                      component={CustomInput}
                                      type="file"
                                      name="file_5"
                                      id="file_5"
                                      onChange={(event) => {
                                        formProps.setFieldValue(
                                          "file_5",
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
                                      href={`${imageUrl}${user.identification_no}/${user.file_5}`}
                                      rel="noreferrer"
                                    >
                                      {user?.file_5}
                                    </a>
                                    <input
                                      component={CustomInput}
                                      type="file"
                                      name="file_5"
                                      id="file_5"
                                      onChange={(event) => {
                                        formProps.setFieldValue(
                                          "file_5",
                                          event.currentTarget.files[0]
                                        );
                                      }}
                                      className="form-group"
                                    />
                                  </InputGroup>
                                )
                              }
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
              </CardBody>

              <CardBody>
                <h5>List Of Annexures</h5>
                <p>
                  1. Annexure-1{" "}
                  <a
                    target={"_blank"}
                    href={`${imageUrl}${user.identification_no}/${user.file_3}`}
                    rel="noreferrer"
                  >
                    {user.file_3}
                  </a>
                </p>
                <p>
                  {" "}
                  2. Annexure-2{" "}
                  <a
                    target={"_blank"}
                    href={`${imageUrl}${user.identification_no}/${user.file_4}`}
                    rel="noreferrer"
                  >
                    {user.file_4}
                  </a>
                </p>
                <p>
                  {" "}
                  3. Annexure-3 {" "}
                          <a
                            target={"blank"}
                            href={`${imageUrl}${user.identification_no}/${user.file_5}`}
                            rel="noreferrer"
                            className="mr-3"
                          >
                            {user.file_5}
                          </a>
                </p>
                {/* <p>
                  {" "}
                  3. Annexure-3 :{" "}
                  {userCertificate?.length > 0
                    ? userCertificate?.map((file, index) => {
                        return (
                          <a
                            target={"blank"}
                            key={index}
                            href={`${imageUrl}${user.identification_no}/${user.file_5}`}
                            rel="noreferrer"
                            className="mr-3"
                          >
                            {file.file}
                          </a>
                        );
                      })
                    : "Please upload user certificate"}
                </p> */}
                <p>
                  4. Sensor Certificates:{" "}
                  <ul>
                    {sensorCertificate?.length > 0
                      ? sensorCertificate?.map((file, index) => {
                          return (
                            <li>
                              {file.name}
                              <a
                                target={"blank"}
                                key={index}
                                href={`${imageUrl}Sensorfiles/${file.file}`}
                                rel="noreferrer"
                                className="mr-3"
                              >
                                {" "}
                                {file.file}
                              </a>
                            </li>
                          );
                        })
                      : "Please upload Sensor certificate"}
                  </ul>
                </p>
              </CardBody>
            </>
          );
        })}
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    cases: state.cases,
    editcase: state.cases.editcase,
    users: state.users.users,
    editsensor: state.sensor.editsensor,
    sensor: state.sensor.sensor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateCasesData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateCasesData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Annexures);

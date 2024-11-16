import React, { useEffect, useState } from "react";
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
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import FA from "react-fontawesome";

import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../../../views/custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../redux/action";
import CustomSelect from "../../../views/custom/CustomSelect";

import Loader from "../../loader/Loader2";
import EditSensor from "./EditSensor";
import { imageUrl } from "../../../shared/imageUrl";

function Sensor(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
  };

  useEffect(() => {
    props.onSensorGetData(data);
  }, []);

  const [state, setState] = useState({
    pageSize: 10, // <- 25 items will be shown on single page
    pageIndex: 0, // 0 is a default page to show
    items: props.sensor?.isLoading ? [] : props.sensor?.sensor,
    // items: props?.cols?.cols,
  });

  const handlePrevPageClick = (event) => {
    // console.log(state.items.length);
    setState((prevState) => ({
      ...state,
      pageIndex: prevState.pageIndex > 0 ? prevState.pageIndex - 1 : 0,
    }));
  };

  const handleNextPageClick = (event) => {
    // console.log("pageIndex", state.pageIndex);
    // console.log("pageSize", state.pageSize);

    setState((prevState) => ({
      ...state,
      pageIndex:
        prevState.pageIndex <
        Math.ceil(prevState.items.length / prevState.pageSize)
          ? prevState.pageIndex + 1
          : prevState.pageIndex,
    }));
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // console.log("values in Sensor:", values);

    const user = new FormData();

    user.append("name", values.name);
    user.append("date", values.date);
    user.append("file", values.file);

    // console.log("Data of Sensor:", user);
    props.onPostSensorData(data, user, toggle);
    setSubmitting(true);
    return;
  };

  return (
    <Card>
      <CardHeader className="bg-warning text-white">
        <div className="">
          <strong>Senosor</strong>

          <Button
            className="btn-success  float-right"
            onClick={() => {
              toggle();
            }}
          >
            Add Senosor
          </Button>
        </div>
        <Modal
          className="modal-info modal-lg"
          isOpen={modal}
          toggle={toggle}
          backdrop="static"
        >
          <ModalHeader toggle={toggle}>Add New Senosor</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                date: "",
                file: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Name is required"),
                // date: Yup.string().required("Date is required"),
                file: Yup.string().required("File is required"),
              })}
            >
              {(formProps) => (
                <Form>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="discount">Sensor Name</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Enter Sensor Name"
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
                      <Label for="date">Date</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="date"
                          name="date"
                          id="date"
                          placeholder="Select Date"
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
                  </Row>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="file">Upload File</Label>
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
                          className={
                            "form-control" +
                            (formProps.errors.file && formProps.touched.file
                              ? " is-invalid"
                              : "")
                          }
                        />

                        <ErrorMessage
                          name="file"
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
      </CardHeader>
      <CardBody>
        <table
          className="table table-sm text-center"
          style={{ fontSize: "12px" }}
        >
          <thead>
            <tr>
              <th scope="col">Senosor Name</th>
              <th scope="col">Date</th>

              <th scope="col">File</th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody style={{ textTransform: "uppercase" }}>
            {props.sensor?.isLoading ? (
              <tr>
                <td colSpan={18}>
                  <Loader color={"primary"} />
                </td>
              </tr>
            ) : props.sensor?.sensor?.length > 0 ? (
              props.sensor?.sensor
                ?.slice(
                  state.pageIndex * state.pageSize,
                  state.pageIndex * state.pageSize + state.pageSize
                )
                .map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.date}</td>
                      <td>
                        {" "}
                        <a
                          target={"_blank"}
                          href={`${imageUrl}Sensorfiles/${user.file}`}
                          rel="noreferrer"
                        >
                          {user.file}
                        </a>
                      </td>

                      <td className="d-flex justify-content-center">
                        <EditSensor data={user} />

                        <Button
                          className="btn-danger ml-3 p-1"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this Sensor?"
                              )
                            )
                              props.onDeleteSensor(data, user.id);
                          }}
                        >
                          <i className="fa fa-trash-alt" aria-hidden="true"></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td colSpan={3}>No Sensors</td>
              </tr>
            )}
          </tbody>
          <nav>
            <Pagination>
              <PaginationItem>
                <PaginationLink
                  previous
                  tag="button"
                  onClick={(event) => handlePrevPageClick(event)}
                >
                  Back
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  next
                  tag="button"
                  onClick={(event) => handleNextPageClick(event)}
                >
                  Next
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </nav>
        </table>
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    sensor: state.sensor,
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
export default connect(mapStateToProps, mapDispatchToProps)(Sensor);

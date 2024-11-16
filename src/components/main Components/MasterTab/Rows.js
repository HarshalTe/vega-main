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

import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../../../views/custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../redux/action";
import Loader from "../../loader/Loader2";
import EditRows from "./EditRows";
import CustomSelect from "../../../views/custom/CustomSelect";

function Rows(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
  };

  console.log("data", data);

  useEffect(() => {
    props.onRowsGetData(data);
    props.onColsGetData(data);
  }, []);

  //!pagination
  const [state, setState] = useState({
    pageSize: 10, // <- 25 items will be shown on single page
    pageIndex: 0, // 0 is a default page to show
    items: props.rows?.isLoading ? [] : props.rows?.rows,
    // items: props?.rows?.rows,
  });

  const handlePrevPageClick = (event) => {
    // console.log(state.items.length);
    setState((prevState) => ({
      ...state,
      pageIndex: prevState.pageIndex > 0 ? prevState.pageIndex - 1 : 0,
    }));
  };

  const handleNextPageClick = (event) => {
    console.log("pageIndex", state.pageIndex);
    console.log("pageSize", state.pageSize);

    setState((prevState) => ({
      ...state,
      pageIndex:
        prevState.pageIndex <
        Math.ceil(prevState.items.length / prevState.pageSize)
          ? prevState.pageIndex + 1
          : prevState.pageIndex,
    }));
  };

  console.log("items", state.items.length);

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
    console.log("values in Rows:", values);

    const user = new FormData();

    user.append("name", values.name);
    user.append("col_id", values.col_id);

    console.log("Data of Rows:", user);
    props.onPostRowsData(data, user, toggle);
    setSubmitting(true);
    return;
  };

  //   console.log("user id", props.login?.login?.user?.id);

  return (
    <Card>
      <CardHeader className="bg-warning text-white">
        <div className="">
          <strong>Rows</strong>
          {/* <Input
            type="text"
            placeholder="Search By Name and Enrollment No"
            className="ml-5"
            style={{ width: "300px" }}
            value={searchTerm}
            onChange={handleChange}
          />
          <Input
            type="select"
            className="ml-5"
            style={{ width: "300px" }}
            value={filter}
            onChange={handleFilterChange}
          >
            <option>Select Filter</option>
            <option value="uploaded">Only Uploaded</option>
            <option value="notuploaded">Not Uploaded</option>
            <option value="uploaded&approved">Uploaded & Approved</option>
          </Input>
          {props.login?.login?.user.role !== "faculty" && (
            */}
          <Button
            className="btn-success  float-right"
            onClick={() => {
              toggle();
            }}
          >
            Add Rows
          </Button>
        </div>
        <Modal
          className="modal-info modal-lg"
          isOpen={modal}
          toggle={toggle}
          backdrop="static"
        >
          <ModalHeader toggle={toggle}>Add New Rows</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                col_id: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Name is required"),
                col_id: Yup.string().required("Col is required"),
              })}
            >
              {(formProps) => (
                <Form>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="col_id">Select Col</Label>
                      <InputGroup>
                        <Field
                          component={CustomSelect}
                          type="select"
                          name="col_id"
                          id="col_id"
                          placeholder="Enter Col"
                          className={
                            "form-control" +
                            (formProps.errors.col_id && formProps.touched.col_id
                              ? " is-invalid"
                              : "")
                          }
                        >
                          <option value="">Select Col</option>
                          {props.cols?.map((col) => (
                            <option value={col.id}>{col.name}</option>
                          ))}
                        </Field>

                        <ErrorMessage
                          name="col_id"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="name">Row Name</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Enter Row Name"
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
              <th scope="col">Rows Name</th>
              <th scope="col">Cols Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody style={{ textTransform: "uppercase" }}>
            {props.rows?.isLoading ? (
              <tr>
                <td colSpan={18}>
                  <Loader color={"primary"} />
                </td>
              </tr>
            ) : props.rows?.rows?.length > 0 ? (
              props.rows?.rows
                ?.slice(
                  state.pageIndex * state.pageSize,
                  state.pageIndex * state.pageSize + state.pageSize
                )
                .map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.col?.name}</td>

                      <td className="d-flex justify-content-center">
                        <EditRows data={user} />

                        <Button
                          className="btn-danger ml-3 p-1"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this Rows?"
                              )
                            )
                              props.onDeleteRows(data, user.id);
                          }}
                        >
                          <i
                            className="fa fa-trash-alt "
                            value={user.id}
                            aria-hidden="true"
                          ></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td colSpan={3}>No Rows</td>
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
    rows: state.rows,
    cols: state.cols.cols,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onColsGetData: (data) => dispatch(actions.colsGetData(data)),
    onRowsGetData: (data) => dispatch(actions.rowsGetData(data)),
    onDeleteRows: (data, id) => dispatch(actions.deleteRows(data, id)),
    onPostRowsData: (data, user, toggle) =>
      dispatch(actions.postRowsData(data, user, toggle)),
    onUpdateRowsData: (data, user, toggle) =>
      dispatch(actions.updateRowsData(data, user, toggle)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Rows);

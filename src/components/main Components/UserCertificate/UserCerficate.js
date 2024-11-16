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
import CustomSelect from "../../../views/custom/CustomSelect";
// import EditUsers from "./EditUsers";
import Loader from "../../loader/Loader2";
import swal from "sweetalert";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { imageUrl } from "../../../shared/imageUrl";

function UserCerficate(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
  };

  // // console.log("data", data);

  useEffect(() => {
    props.onUsersGetData(data);
  }, []);

  const [state, setState] = useState({
    pageSize: 10, // <- 25 items will be shown on single page
    pageIndex: 0, // 0 is a default page to show
    items: props.users?.isLoading ? [] : props.users?.users,
    // items: props?.cols?.cols,
  });

  const handlePrevPageClick = (event) => {
    // // // console.log(state.items.length);
    setState((prevState) => ({
      ...state,
      pageIndex: prevState.pageIndex > 0 ? prevState.pageIndex - 1 : 0,
    }));
  };

  const handleNextPageClick = (event) => {
    // // console.log("pageIndex", state.pageIndex);
    // // console.log("pageSize", state.pageSize);

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

  const authAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const deleteData = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        authAxios
          .delete(`/users-files/${id}`)
          .then((res) => {
            swal("Poof! Your data has been deleted!", {
              icon: "success",
            });
            props.onUsersGetData(data);
          })
          .catch((err) => {
            swal("Oops! Something went wrong!", {
              icon: "error",
            });
          });
      } else {
        swal("Your data is safe!");
      }
    });
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // // console.log("values in Users:", values);

    const user = new FormData();
    user.append("file", values.file);
    user.append("user_id", values.user_id);

    // console.log("Data of Users:", user);
    props.onPostCertificateData(data, user, toggle, setSubmitting);
    setSubmitting(true);
    return;
  };

  return (
    <Card>
      <CardHeader className="bg-warning text-white">
        <div className="">
          <strong>Users Certificate</strong>

          <Button
            className="btn-success  float-right"
            onClick={() => {
              toggle();
            }}
          >
            Add User Certificate
          </Button>
        </div>
        <Modal
          className="modal-info modal-lg"
          isOpen={modal}
          toggle={toggle}
          backdrop="static"
        >
          <ModalHeader toggle={toggle}>Add New User certificate</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                file: "",
                user_id: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                file: Yup.string().required("required"),
                user_id: Yup.string().required("required"),
              })}
            >
              {(formProps) => (
                <Form>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="user_id">Select User</Label>
                      <InputGroup>
                        <Field
                          component={CustomSelect}
                          type="select"
                          name="user_id"
                          id="user_id"
                          className={
                            "form-control" +
                            (formProps.errors.user_id &&
                            formProps.touched.user_id
                              ? " is-invalid"
                              : "")
                          }
                        >
                          <option value="">Select User</option>
                          {props.users?.users
                            // ?.filter((u) => u.role !== "admin")
                            .map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                        </Field>

                        <ErrorMessage
                          name="user_id"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="file">Upload Certificate</Label>
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
              <th scope="col">Users ID</th>
              <th scope="col">Users Name</th>
              <th scope="col">File</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody style={{ textTransform: "uppercase" }}>
            {props.users?.isLoading ? (
              <tr>
                <td colSpan={18}>
                  <Loader color={"primary"} />
                </td>
              </tr>
            ) : props.users?.users?.filter((user) => user?.files?.length > 0)
                .length > 0 ? (
              props.users?.users
                ?.filter((user) => user?.files?.length > 0)
                ?.slice(
                  state.pageIndex * state.pageSize,
                  state.pageIndex * state.pageSize + state.pageSize
                )
                .map((user, index) => {
                  return (
                    user.files?.length > 0 &&
                    user.files?.map((file, index) => {
                      return (
                        <tr key={index}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>
                            <Col>
                              <a
                                target={"blank"}
                                href={`${imageUrl}CompanyFiles/${file.file}`}
                                rel="noreferrer"
                              >
                                {file.file}
                              </a>
                            </Col>
                          </td>
                          <td className="">
                            <Button
                              className="btn-danger  p-1"
                              onClick={() => {
                                deleteData(file.id);
                              }}
                            >
                              <i
                                className="fa fa-trash-alt"
                                aria-hidden="true"
                              ></i>
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                    // <tr key={index}>
                    //   <td>{user.id}</td>
                    //   <td>{user.name}</td>
                    //   <td>
                    //     {user.files?.length > 0 &&
                    //       user.files?.map((file, index) => {
                    //         return (
                    //           <Col>
                    //             <a
                    //               target={"blank"}
                    //               href={`${imageUrl}CompanyFiles/${file.file}`}
                    //             rel="noreferrer">
                    //               {file.file}
                    //             </a>
                    //           </Col>
                    //         );
                    //       })}
                    //   </td>
                    // <td className="">

                    //   <Button
                    //     className="btn-danger  p-1"
                    //     onClick={() => {
                    //       if (
                    //         window.confirm(
                    //           "Are you sure you wish to delete this User Certificate?"
                    //         )
                    //       )
                    //         props.onDeleteCertificate(data, user.id);
                    //     }}
                    //   >
                    //     <i className="fa fa-trash-alt" aria-hidden="true"></i>
                    //   </Button>
                    // </td>
                    // </tr>
                  );
                })
            ) : (
              <tr>
                <td colSpan={3}>No Userss</td>
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
    users: state.users,
    certificate: state.certificate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUsersGetData: (data) => dispatch(actions.usersGetData(data)),
    onCertificateGetData: (data) => dispatch(actions.certificateGetData(data)),
    onDeleteCertificate: (data, id) =>
      dispatch(actions.deleteCertificate(data, id)),
    onPostCertificateData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postCertificateData(data, user, toggle, setSubmitting)),
    onUpdateCertificateData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.updateCertificateData(data, user, toggle, setSubmitting)
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserCerficate);

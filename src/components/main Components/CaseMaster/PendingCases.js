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
import CustomSelect from "../../../views/custom/CustomSelect";
import EditCases from "./EditCases";
import { Redirect } from "react-router-dom";
import CaseDetails from "./CaseDetails";

function Cases(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
  };

  //!pagination
  const [state, setState] = useState({
    pageSize: 10, // <- 25 items will be shown on single page
    pageIndex: 0, // 0 is a default page to show
    items: props.cases?.isLoading ? [] : props.cases?.cases,
  });

  const handlePrevPageClick = (event) => {
    setState((prevState) => ({
      ...state,
      pageIndex: prevState.pageIndex > 0 ? prevState.pageIndex - 1 : 0,
    }));
  };

  const handleNextPageClick = (event) => {
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

  const [id, setId] = useState(null);
  const [room, setRoom] = useState(null);
  const [redirect, setRedirect] = useState(false);

  async function handleRoute(e) {
    setRedirect(true);
    setId(e.id);
    setRoom(e.type_of_room);
  }

  const renderRedirect = () => {
    if (redirect && room == "Cool Room") {
      return <Redirect to={`/cases/cool-room/${id}`} {...props} />;
    } else if (redirect && room == "ViSi Cooler") {
      return <Redirect to={`/cases/visi-cooler/${id}`} {...props} />;
    } else if (redirect && room == "Reefer Vehicle") {
      return <Redirect to={`/cases/refer-vehicle/${id}`} {...props} />;
    } else if (redirect && room == "Cold Room") {
      return <Redirect to={`/cases/cold-room/${id}`} {...props} />;
    } else if (redirect && room == "Deep Freezer") {
      return <Redirect to={`/cases/deep-freezer/${id}`} {...props} />;
    } else if (redirect && room == "Refrigerator") {
      return <Redirect to={`/cases/refrigerator/${id}`} {...props} />;
    } else if (redirect && room == "Thermal Box") {
      return <Redirect to={`/cases/thermal-box/${id}`} {...props} />;
    } else if (redirect && room == "Oven") {
      return <Redirect to={`/cases/oven/${id}`} {...props} />;
    } else if (redirect && room == "Furnace") {
      return <Redirect to={`/cases/furnace/${id}`} {...props} />;
    } else if (redirect && room == "ETO") {
      return <Redirect to={`/cases/eto/${id}`} {...props} />;
    } else if (redirect && room == "Autoclave") {
      return <Redirect to={`/cases/autoclave/${id}`} {...props} />;
    } else if (redirect && room == "Stability Chamber") {
      return <Redirect to={`/cases/stability-chamber/${id}`} {...props} />;
    } else if (redirect && room == "Deep Freezer Room") {
      return <Redirect to={`/cases/deep-freezer-room/${id}`} {...props} />;
    } else if (redirect && room == "Warehouse") {
      return <Redirect to={`/cases/warehouse/${id}`} {...props} />;
    } else if (redirect && room == "Walk-In Cold Room") {
      return <Redirect to={`/cases/walk-in-cold-room/${id}`} {...props} />;
    } else if (redirect && room == "Walk-In Deep Freezer") {
      return <Redirect to={`/cases/walk-in-deep-freezer/${id}`} {...props} />;
    } else if (redirect && room == "Ambient Room") {
      return <Redirect to={`/cases/ambient-room/${id}`} {...props} />;
    }
  };

  if (props.login?.login?.user?.role == "admin") {
    return (
      <Card>
        {renderRedirect()}
        <CardHeader className="bg-warning text-white">
          <div className="">
            <strong>Reports</strong>
          </div>
        </CardHeader>
        <CardBody style={{ overflow: "scroll" }}>
          <table className="table table-sm" style={{ fontSize: "12px" }}>
            <thead>
              <tr>
                <th scope="col">Report ID</th>
                <th scope="col">Company Name</th>
                <th scope="col">Company Address</th>
                <th scope="col">Report No</th>
                <th scope="col">Identification No.</th>
                <th scope="col">Type of Room</th>
                <th scope="col">Type of Cycle</th>
                <th scope="col">Open</th>
                <th scope="col">Detail</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody style={{ textTransform: "uppercase" }}>
              {props.cases?.isLoading ? (
                <tr>
                  <td colSpan={18}>
                    <Loader color={"primary"} />
                  </td>
                </tr>
              ) : props.cases?.cases?.length > 0 ? (
                props.cases?.cases
                  .filter((user) => {
                    return (
                      user.checked_by == null &&
                      user.checked_status == 0 &&
                      user.sent_for_checking_status == 1
                    );
                  })?.reverse()
                  ?.slice(
                    state.pageIndex * state.pageSize,
                    state.pageIndex * state.pageSize + state.pageSize
                  )
                  .map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.company?.name}</td>
                        <td>{user.capacity}</td>
                        <td>{user.report_no}</td>
                        <td>{user.identification_no}</td>
                        <td>{user.type_of_room}</td>
                        <td>{user.type_of_cycle}</td>
                        <td>
                          {" "}
                          <Button
                            color="info"
                            size="sm"
                            onClick={(e) => handleRoute(user, e)}
                          >
                            <i className="fa fa-folder-open" />
                          </Button>
                        </td>
                        <td>
                          {" "}
                          <CaseDetails data={user} />
                        </td>

                        <td className="d-flex">
                          <EditCases data={user} />

                          <Button
                            className="btn-danger ml-3 p-1"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you wish to delete this Report?"
                                )
                              )
                                props.onDeleteCases(data, user.id);
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
                  <td colSpan={3}>No Reports</td>
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
  } else if (props.login?.login?.user?.role == "supervisor") {
    return (
      <Card>
        {renderRedirect()}
        <CardHeader className="bg-warning text-white">
          <div className="">
            <strong>Reports</strong>
          </div>
        </CardHeader>
        <CardBody style={{ overflow: "scroll" }}>
          <table className="table table-sm" style={{ fontSize: "12px" }}>
            <thead>
              <tr>
                <th scope="col">Report ID</th>
                <th scope="col">Company Name</th>
                <th scope="col">Company Address</th>
                <th scope="col">Report No</th>
                <th scope="col">Identification No.</th>
                <th scope="col">Type of Room</th>
                <th scope="col">Type of Cycle</th>
                <th scope="col">Open</th>
                <th scope="col">Detail</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody style={{ textTransform: "uppercase" }}>
              {props.cases?.isLoading ? (
                <tr>
                  <td colSpan={18}>
                    <Loader color={"primary"} />
                  </td>
                </tr>
              ) : props.cases?.cases?.length > 0 ? (
                props.cases?.cases
                  .filter((user) => {
                    return (
                      user.user_id == props.login?.login?.user?.id &&
                      //   user.prepared_by == null &&
                      user.sent_for_checking_status == 0
                    );
                  })?.reverse()
                  ?.slice(
                    state.pageIndex * state.pageSize,
                    state.pageIndex * state.pageSize + state.pageSize
                  )
                  .map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.company?.name}</td>
                        <td>{user.capacity}</td>
                        <td>{user.report_no}</td>
                        <td>{user.identification_no}</td>
                        <td>{user.type_of_room}</td>
                        <td>{user.type_of_cycle}</td>
                        <td>
                          {" "}
                          <Button
                            color="info"
                            size="sm"
                            onClick={(e) => handleRoute(user, e)}
                          >
                            <i className="fa fa-folder-open" />
                          </Button>
                        </td>
                        <td>
                          {" "}
                          <CaseDetails data={user} />
                        </td>

                        <td className="d-flex">
                          <EditCases data={user} />

                          <Button
                            className="btn-danger ml-3 p-1"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you wish to delete this Report?"
                                )
                              )
                                props.onDeleteCases(data, user.id);
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
                  <td colSpan={3}>No Reports</td>
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
  } else if (props.login?.login?.customer?.role == "staff") {
    return (
      <Card>
        {renderRedirect()}
        <CardHeader className="bg-warning text-white">
          <div className="">
            <strong>Reports</strong>
          </div>
        </CardHeader>
        <CardBody style={{ overflow: "scroll" }}>
          <table className="table table-sm" style={{ fontSize: "12px" }}>
            <thead>
              <tr>
                <th scope="col">Report ID</th>
                <th scope="col">Company Name</th>
                <th scope="col">Company Address</th>
                <th scope="col">Report No</th>
                <th scope="col">Identification No.</th>
                <th scope="col">Type of Room</th>
                <th scope="col">Type of Cycle</th>
                <th scope="col">Open</th>
                <th scope="col">Detail</th>
              </tr>
            </thead>
            <tbody style={{ textTransform: "uppercase" }}>
              {props.cases?.isLoading ? (
                <tr>
                  <td colSpan={18}>
                    <Loader color={"primary"} />
                  </td>
                </tr>
              ) : props.cases?.cases?.length > 0 ? (
                props.cases?.cases
                  .filter((user) => {
                    return (
                      user.company_id ==
                        props.login?.login?.customer?.company_id &&
                      user.checked_status == 1 &&
                      user.sent_for_approval_status == 0 &&
                      user.reviewed_by == null
                    );
                  })?.reverse()
                  ?.slice(
                    state.pageIndex * state.pageSize,
                    state.pageIndex * state.pageSize + state.pageSize
                  )
                  .map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.company?.name}</td>
                        <td>{user.capacity}</td>
                        <td>{user.report_no}</td>
                        <td>{user.identification_no}</td>
                        <td>{user.type_of_room}</td>
                        <td>{user.type_of_cycle}</td>
                        <td>
                          {" "}
                          <Button
                            color="info"
                            size="sm"
                            onClick={(e) => handleRoute(user, e)}
                          >
                            <i className="fa fa-folder-open" />
                          </Button>
                        </td>
                        <td>
                          {" "}
                          <CaseDetails data={user} />
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan={3}>No Reports</td>
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
  } else if (props.login?.login?.customer?.role == "owner") {
    return (
      <Card>
        {renderRedirect()}
        <CardHeader className="bg-warning text-white">
          <div className="">
            <strong>Reports</strong>
          </div>
        </CardHeader>
        <CardBody style={{ overflow: "scroll" }}>
          <table className="table table-sm" style={{ fontSize: "12px" }}>
            <thead>
              <tr>
                <th scope="col">Report ID</th>
                <th scope="col">Company Name</th>
                <th scope="col">Company Address</th>
                <th scope="col">Report No</th>
                <th scope="col">Identification No.</th>
                <th scope="col">Type of Room</th>
                <th scope="col">Type of Cycle</th>
                <th scope="col">Open</th>
                <th scope="col">Detail</th>
              </tr>
            </thead>
            <tbody style={{ textTransform: "uppercase" }}>
              {props.cases?.isLoading ? (
                <tr>
                  <td colSpan={18}>
                    <Loader color={"primary"} />
                  </td>
                </tr>
              ) : props.cases?.cases?.length > 0 ? (
                props.cases?.cases
                  .filter((user) => {
                    return (
                      user.company_id ==
                        props.login?.login?.customer?.company_id &&
                      user.checked_status == 1 &&
                      user.sent_for_approval_status == 1 &&
                      user.approved_status == 0
                    );
                  })?.reverse()
                  ?.slice(
                    state.pageIndex * state.pageSize,
                    state.pageIndex * state.pageSize + state.pageSize
                  )
                  .map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.company?.name}</td>
                        <td>{user.capacity}</td>
                        <td>{user.report_no}</td>
                        <td>{user.identification_no}</td>
                        <td>{user.type_of_room}</td>
                        <td>{user.type_of_cycle}</td>
                        <td>
                          {" "}
                          <Button
                            color="info"
                            size="sm"
                            onClick={(e) => handleRoute(user, e)}
                          >
                            <i className="fa fa-folder-open" />
                          </Button>
                        </td>
                        <td>
                          {" "}
                          <CaseDetails data={user} />
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan={3}>No Reports</td>
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
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    cases: state.cases,
    cols: state.cols.cols,
    company: state.company.company,
    rows: state.rows.rows,
    users: state.users.users,
  };
};

export default connect(mapStateToProps)(Cases);

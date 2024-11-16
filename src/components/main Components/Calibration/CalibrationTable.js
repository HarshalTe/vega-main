/* eslint-disable eqeqeq */
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Modal,
  Input,
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
// import EditCases from "./EditCases";
import { Redirect } from "react-router-dom";
import ApprovelDetails from "./ApprovelDetails";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
// import CaseDetails from "./CaseDetails";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
    <GridToolbarColumnsButton />
    <GridToolbarFilterButton />
    <GridToolbarDensitySelector />
    <GridToolbarExport />
  </GridToolbarContainer>
);
}

function CalibrationTable(props) {
  const [name, setName] = useState("");
  const [pageSize, setPageSize] = React.useState(20);
    const [searchFilter2, setSearchFilter2] = React.useState(false);
    const [selectionModel, setSelectionModel] = React.useState([]);
  const [searchFilter3, setSearchFilter3] = React.useState(false);

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
    setRoom(e.instrument_name);
  }

  const renderRedirect = () => {
    if (redirect && room != "Pressure Gauge") {
      // history.push(`/cases/visi-cooler/${id}`);
      return <Redirect to={`/calibration/data-logger/${id}`} {...props} />;
    } else if (redirect && room == "Pressure Gauge") {
      return <Redirect to={`/calibration/pressure-gauge/${id}`} {...props} />;
    }
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Cases:", values);

    const user = new FormData();

    user.append("name", values.name);
    user.append("address", values.address);
    user.append("cert_no", values.cert_no);
    user.append("service_no", values.service_no);
    user.append("calibration_date", values.calibration_date);
    user.append("next_due_date", values.next_due_date);
    user.append("instrument_name", values.instrument_name);

    console.log("Data of Cases:", user);
    props.onPostCalibrationData(data, user, toggle);
    setSubmitting(true);
    return;
  };

  const rows = props.rawData?.isLoading
  ? []
  : props.rawData?.rawData?.length > 0
  ? props.rawData?.rawData
  : [];
  const Dudupe = (user,e) => {
    console.log("values in Cases:", e,user);

    // const user = new FormData();

    // user.append("name", values.name);
    // user.append("address", values.address);
    // user.append("cert_no", values.cert_no);
    // user.append("service_no", values.service_no);
    // user.append("calibration_date", values.calibration_date);
    // user.append("next_due_date", values.next_due_date);
    // user.append("instrument_name", values.instrument_name);

    // console.log("Data of Cases:", user);
    delete user.id;
    delete user.created_at;
    delete user.updated_at;
    delete user.certificate_valid_upto;
    delete user.equipment;
    delete user.env_condition;
    delete user.calibration_frequency;
    props.onPostCalibrationDudupe(data, user, toggle);
    // setSubmitting(true);
    return;
  };

  // if (props.login?.login?.user?.role == "admin") {

    const rows1 = props.calibration?.isLoading
    ? []
   : props.calibration?.calibration?.length > 0
   ? props.calibration?.calibration
   .filter((user) => {
     return user;
   })?.reverse()?.slice(
     state.pageIndex * state.pageSize,
     state.pageIndex * state.pageSize + state.pageSize
   )
   .filter((item) => {
     console.log("object",name)
       return (
        (name && searchFilter2
          ? item?.id == name
              : item) ||
         (name && searchFilter2
           ? item?.company?.name
               ?.toLowerCase()
               .includes(name.trim().toLowerCase())
               : item) ||
         (name && searchFilter2
           ? item?.report_no
               ?.toLowerCase()
               .includes(name.trim().toLowerCase())
               : item) ||
         (name && searchFilter2
           ? item?.identification_no
               ?.toLowerCase()
               .includes(name.trim().toLowerCase())
               : item) ||
         (name && searchFilter2
           ? item?.type_of_room
               ?.toLowerCase()
               .includes(name.trim().toLowerCase())
               : item) ||
         (name && searchFilter2
           ? item?.type_of_cycle
               ?.toLowerCase()
               .includes(name.trim().toLowerCase())
               : item)
            );
                 })
                 : [];



                 const columns = [
                  // { field: "id", headerName: "ID", flex: 1 },
                  { field: "id", headerName: "id" },
                  { field: "name", headerName: "name",},
                  // { field: "address", headerName: "address", width: 200},
                  { field: "instrument_name", headerName: "instrument_name", flex: 1 },
                  { field: "cert_no", headerName: "cert_no", flex: 1 },
                  {
                    field: "service_no",
                    headerName: "service_no",
                    flex: 1,
                  },
                  { field: "calibration_date", headerName: "calibration_date", flex: 1 },
                  // { field: "next_due_date", headerName: "next_due_date", flex: 1 },
              
                  {
                    field: "actions",
                    headerName: "Actions",
                    flex: 1,
                    sortable: false,
                    disableClickEventBubbling: true,
                    renderCell: (params) => {
                      let user = params?.row
                      console.log("objectuser",user)
                      return (
                       <div className="d-flex">
                         <Button
                            color="info"
                            size="sm"
                            onClick={(e) => handleRoute(user, e)}
                          >
                            <i className="fa fa-folder-open" />
                          </Button>
                          <ApprovelDetails data={user} />
                          <Button
                            color="warning"
                            size="sm"
                            onClick={(e) => Dudupe(user, e)}
                          >
                            <i className="fa fa-copy" />
                          </Button>
                          <Button
                            className="btn-danger ml-3 p-1"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you wish to delete this Reports?"
                                )
                              )
                                props.onDeleteCalibration(data, user.id);
                            }}
                          >
                            <i
                              className="fa fa-trash-alt"
                              value={user.id}
                              aria-hidden="true"
                            ></i>
                          </Button>
                       </div>
                      );
                    },
                  },
                ];



 
 
    return (
      <Card>
        {renderRedirect()}
        <CardHeader className="bg-warning text-white">
          <div className="d-flex justify-content-between">
            <strong>Reports</strong>
            {/* <div className="d-flex" style={{"width":"50vw"}}>

            <Input
            type="text"
            name="sensor"
            id="sensor"
            placeholder="Search"
            className="form-control"
            value={name}
            onChange={(e) => {
              console.log("e", e.target.value);
              setName(e.target.value);
            }}
            style={{ width: "100%" }}
          />  
           <Button
              type="button"
              color="success"
              className="mr-2"
              onClick={() => {
                setSearchFilter2(true);
              }}
            >
              <b>Search</b>
            </Button>
            <Button
              type="reset"
              color="danger"
              onClick={() => {
                setName("");
                // setType("");
                setSearchFilter2(false);
              }}
              >
              <b>Reset</b>
            </Button>
            </div> */}
            <Button
              className="btn-success  float-right"
              onClick={() => {
                toggle();
              }}
            >
              Create Reports
            </Button>
          </div>
          <Modal
            className="modal-info modal-lg"
            isOpen={modal}
            toggle={toggle}
            backdrop="static"
          >
            <ModalHeader toggle={toggle}>Add New Report</ModalHeader>
            <ModalBody>
              <Formik
                initialValues={{
                  name: "",
                  address: "",
                  instrument_name: "",
                  cert_no: "",
                  service_no: "",
                  calibration_date: "",
                  next_due_date: "",
                }}
                onSubmit={handleSubmit}
                // validationSchema={Yup.object().shape({
                //   company_id: Yup.string().required("Company is required"),
                //   identification_no: Yup.string().required(
                //     "Identification No is required"
                //   ),
                //   report_no: Yup.string().required("Report No is required"),
                //   type_of_room: Yup.string().required(
                //     "Type of Room no is required"
                //   ),
                //   type_of_cycle: Yup.string().required(
                //     "Type of Cycle no is required"
                //   ),
                // })}
              >
                {(formProps) => (
                  <Form>
                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="name">Company Name</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="select"
                            name="name"
                            id="name"
                            placeholder="Company Name"
                            className={
                              "form-control" +
                              (formProps.errors.name &&
                              formProps.touched.name
                                ? " is-invalid"
                                : "")
                            }
                            >
                            <option value="">Select Company</option>
                            {props.company?.map((cust) => {
                              return (
                                <option value={cust.name}>{cust.name}</option>
                              );
                            })}
                            </Field>

                          <ErrorMessage
                            name="name"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                      <Col md={6}>
                        <Label for="instrument_name">Select Type of Instrument</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="instrument_name"
                            id="instrument_name"
                            placeholder="Instrument Name"
                            className={
                              "form-control" +
                              (formProps.errors.instrument_name &&
                              formProps.touched.instrument_name
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option value="">Select Instrument Name</option>
                            <option value="Data Logger">Other</option>
                            <option value="Pressure Gauge">Pressure Gauge</option>
                            {/* {props.rows
                              ?.filter((row) => row.col_id == 1)
                              .map((row) => (
                                <option value={row.name}>{row.name}</option>
                              ))} */}
                          </Field>

                          <ErrorMessage
                            name="instrument_name"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row className="form-group">
                    <Col md={6}>
                        <Label for="service_no">Service Request No.</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="service_no"
                            id="service_no"
                            placeholder="Enter Service Request No."
                            className={
                              "form-control" +
                              (formProps.errors.service_no &&
                              formProps.touched.service_no
                                ? " is-invalid"
                                : "")
                            }
                          />

                          <ErrorMessage
                            name="service_no"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>

                      <Col md={6}>
                        <Label for="cert_no">
                        Certificate No.
                        </Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="text"
                            name="cert_no"
                            id="cert_no"
                            placeholder="Certificate No."
                            className={
                              "form-control" +
                              (formProps.errors.cert_no &&
                              formProps.touched.cert_no
                                ? " is-invalid"
                                : "")
                            }
                          >
                          </Field>

                          <ErrorMessage
                            name="cert_no"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col md={12}>
                        <Label for="address">
                          Address
                        </Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="address"
                            id="address"
                            placeholder="Address"
                            className={
                              "form-control" +
                              (formProps.errors.address &&
                              formProps.touched.address
                                ? " is-invalid"
                                : "")
                            }
                            >
                            <option value="">Select Customer Address</option>
                            {props.company
                              ?.filter(
                                (c) => c.name == formProps.values.name
                              )
                              .map((cust) =>
                                cust.addresses?.map((addr) => (
                                  <option
                                    value={`${addr.location} ${addr.area} ${addr.city}`}
                                  >{`${addr.location} ${addr.area} ${addr.city}`}</option>
                                ))
                              )}
                          </Field>

                          <ErrorMessage
                            name="address"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    
                    </Row>

                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="calibration_date">Calibration Date</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="date"
                            name="calibration_date"
                            id="calibration_date"
                            placeholder="Calibration Date"
                            className={
                              "form-control" +
                              (formProps.errors.calibration_date &&
                              formProps.touched.calibration_date
                                ? " is-invalid"
                                : "")
                            }
                          >
                          </Field>

                          <ErrorMessage
                            name="calibration_date"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                      <Col md={6}>
                        <Label for="next_due_date">Next Due Date</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="date"
                            name="next_due_date"
                            id="next_due_date"
                            placeholder="Next Due Date"
                            className={
                              "form-control" +
                              (formProps.errors.next_due_date &&
                              formProps.touched.next_due_date
                                ? " is-invalid"
                                : "")
                            }
                          >
                          </Field>

                          <ErrorMessage
                            name="next_due_date"
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
        {/* <CardBody style={{ overflow: "scroll" }}>
          <table className="table table-sm" style={{ fontSize: "12px" }}>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Instrument Name</th>
                <th scope="col">Certificate No.</th>
                <th scope="col">Service Request No..</th>
                <th scope="col">Calibration Date</th>
                <th scope="col">Calibration Location</th>
                <th scope="col">Open</th>
                <th scope="col">Detail</th>
                <th scope="col">Copy</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody style={{ textTransform: "uppercase" }}>
              {(
              props.cases?.isLoading ? (
                <tr>
                  <td colSpan={18}>
                    <Loader color={"primary"} />
                  </td>
                </tr>
              ) : 
              rows1?.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{user?.id}</td>
                        <td>{user?.name}</td>
                        <td>{user?.address}</td>
                        <td>{user?.instrument_name}</td>
                        <td>{user?.cert_no}</td>
                        <td>{user?.service_no}</td>
                        <td>{user?.calibration_date}</td>
                        <td>{user?.next_due_date}</td>
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
                          <ApprovelDetails data={user} />
                        </td>

                        <td>
                          {" "}
                          <Button
                            color="warning"
                            size="sm"
                            onClick={(e) => Dudupe(user, e)}
                          >
                            <i className="fa fa-copy" />
                          </Button>
                        </td>
                        

                        <td className="d-flex">

                          <Button
                            className="btn-danger ml-3 p-1"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you wish to delete this Reports?"
                                )
                              )
                                props.onDeleteCalibration(data, user.id);
                            }}
                          >
                            <i
                              className="fa fa-trash-alt"
                              value={user.id}
                              aria-hidden="true"
                            ></i>
                          </Button>
                        </td>
                      </tr>
                    );
                  })
              ) 
              }
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
        </CardBody> */}
        <CardBody style={{ height: "550px", width: "100%" }}>
        <DataGrid
          rows={rows1}
          columns={columns}
          // loading={props.rawData?.isLoading ? true : false}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          disableSelectionOnClick
          components={{
            Toolbar: CustomToolbar,
          }}
          checkboxSelection
          selectionModel={selectionModel}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
         
        />
      </CardBody>
      </Card>
    );
  
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    cases: state.cases,
    cols: state.cols.cols,
    company: state.company.company,
    rows: state.rows.rows,
    users: state.users.users,
    sensor: state.sensor.sensor,
    calibration: state.calibration,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCustomerGetData: (data) => dispatch(actions.customerGetData(data)),
    onUsersGetData: (data) => dispatch(actions.usersGetData(data)),
    onCompanyGetData: (data) => dispatch(actions.companyGetData(data)),
    onRowsGetData: (data) => dispatch(actions.rowsGetData(data)),
    onColsGetData: (data) => dispatch(actions.colsGetData(data)),
    calibrationGetData: (data) => dispatch(actions.calibrationGetData(data)),
    onPostCalibrationData: (data, user, toggle) => dispatch(actions.postCalibrationData(data, user, toggle)),
    onPostCalibrationDudupe: (data, user, toggle) => dispatch(actions.postCalibrationDudupe(data, user, toggle)),
    onDeleteCalibration: (data, user_id) => dispatch(actions.deleteCalibration(data, user_id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CalibrationTable);

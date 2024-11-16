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
import EditCases from "./EditCases";
import { Redirect } from "react-router-dom";
import CaseDetails from "./CaseDetails";

function Cases(props) {
  const [name, setName] = useState("");
    const [searchFilter2, setSearchFilter2] = React.useState(false);
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
  const [humidity, setHumidity] = useState(null);

  async function handleRoute(e) {
    setRedirect(true);
    setId(e.id);
    setRoom(e.type_of_room);
    setHumidity(e.is_humidity);
  }

  const renderRedirect = () => {
    if (redirect && room == "Cool Room") {
      // history.push(`/cases/visi-cooler/${id}`);
      return <Redirect to={`/cases/cool-room/${id}`} {...props} />;
    } else if (redirect && room == "ViSi Cooler") {
      return <Redirect to={`/cases/visi-cooler/${id}`} {...props} />;
    } else if (redirect && room == "Reefer Vehicle") {
      return <Redirect to={`/cases/refer-vehicle/${id}`} {...props} />;
    } else if (redirect && room == "Cold Room" && humidity == "0") {
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
    } else if (redirect && room == "Cold Room" && humidity == "1") {
      return <Redirect to={`/cases/humidity-cold-room/${id}`} {...props} />;
    }
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Cases:", values);

    const user = new FormData();

    user.append("company_id", values.company_id);
    user.append("company_address_id", values.company_address_id);
    user.append("user_id", values.user_id);
    user.append("identification_no", values.identification_no);
    user.append("report_no", values.report_no);
    user.append("type_of_room", values.type_of_room);
    user.append("type_of_cycle", values.type_of_cycle);
    user.append("is_humidity", values.is_humidity);
    user.append("extras", JSON.stringify(values.extras));
    user.append("prepared_by", props.login?.login?.user?.name);
    if (props.login?.login?.user?.role == "admin") {
      user.append("sent_for_checking_status", 1);
    }

    console.log("Data of Cases:", user);
    props.onPostCasesData(data, user, toggle);
    setSubmitting(true);
    return;
  };

  if (props.login?.login?.user?.role == "admin") {
    const rows1 = props.cases?.isLoading
    ? []
   : props.cases?.cases?.length > 0
   ? props.cases?.cases
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
 
 
    return (
      <Card>
        {renderRedirect()}
        <CardHeader className="bg-warning text-white">
          <div className="d-flex justify-content-between">
            <strong>Reports</strong>
            <div className="d-flex" style={{"width":"50vw"}}>

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
            </div>
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
                  company_id: "",
                  company_address_id: "",
                  user_id: props.login?.login?.user?.id,
                  identification_no: "",
                  report_no: "",
                  type_of_room: "",
                  type_of_cycle: "",
                  is_humidity: "",
                  extras:{
                    "pos2_3": "",
                  "pos1_3": "",
                  "pos2_2": "",
                  "mkt3": "",
                  "pos1_2":""
                }
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                  company_id: Yup.string().required("Company is required"),
                  identification_no: Yup.string().required(
                    "Identification No is required"
                  ),
                  report_no: Yup.string().required("Report No is required"),
                  type_of_room: Yup.string().required(
                    "Type of Room no is required"
                  ),
                  type_of_cycle: Yup.string().required(
                    "Type of Cycle no is required"
                  ),
                })}
              >
                {(formProps) => (
                  <Form>
                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="company_id">Select Customer</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="company_id"
                            id="company_id"
                            placeholder="Select Customer"
                            className={
                              "form-control" +
                              (formProps.errors.company_id &&
                              formProps.touched.company_id
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option value="">Select Customer</option>
                            {props.company?.map((cust) => (
                              <option value={cust.id}>{cust.name}</option>
                            ))}
                          </Field>

                          <ErrorMessage
                            name="company_id"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>

                      <Col md={6}>
                        <Label for="identification_no">Identification No</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="identification_no"
                            id="identification_no"
                            placeholder="Enter Identification No"
                            className={
                              "form-control" +
                              (formProps.errors.identification_no &&
                              formProps.touched.identification_no
                                ? " is-invalid"
                                : "")
                            }
                          />

                          <ErrorMessage
                            name="identification_no"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col md={12}>
                        <Label for="company_address_id">
                          Select Customer Address
                        </Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="company_address_id"
                            id="company_address_id"
                            placeholder="Select Customer Address"
                            className={
                              "form-control" +
                              (formProps.errors.company_address_id &&
                              formProps.touched.company_address_id
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option value="">Select Customer Address</option>
                            {props.company
                              ?.filter(
                                (c) => c.id == formProps.values.company_id
                              )
                              .map((cust) =>
                                cust.addresses?.map((addr) => (
                                  <option
                                    value={addr.id}
                                  >{`${addr.location} ${addr.area} ${addr.city}`}</option>
                                ))
                              )}
                          </Field>

                          <ErrorMessage
                            name="company_address_id"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="report_no">Report No</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="report_no"
                            id="report_no"
                            placeholder="Enter Report No"
                            className={
                              "form-control" +
                              (formProps.errors.report_no &&
                              formProps.touched.report_no
                                ? " is-invalid"
                                : "")
                            }
                          />

                          <ErrorMessage
                            name="report_no"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>

                      <Col md={6}>
                        <Label for="type_of_room">Select Type of Room</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="type_of_room"
                            id="type_of_room"
                            placeholder="Select Type of Room"
                            className={
                              "form-control" +
                              (formProps.errors.type_of_room &&
                              formProps.touched.type_of_room
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option value="">Select Type of Room</option>
                            {props.rows
                              ?.filter((row) => row.col_id == 1)
                              .map((row) => (
                                <option value={row.name}>{row.name}</option>
                              ))}
                          </Field>

                          <ErrorMessage
                            name="type_of_room"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="type_of_cycle">Select Type of Cycle</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="type_of_cycle"
                            id="type_of_cycle"
                            placeholder="Select Type of Cycle"
                            className={
                              "form-control" +
                              (formProps.errors.type_of_cycle &&
                              formProps.touched.type_of_cycle
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option value="">Select Type of Cycle</option>
                            {props.rows
                              ?.filter((row) => row.col_id == 2)
                              .map((row) => (
                                <option value={row.name}>{row.name}</option>
                              ))}
                          </Field>

                          <ErrorMessage
                            name="type_of_cycle"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                      <Col md={6}>
                        <Label for="is_humidity">Humidity</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="is_humidity"
                            id="is_humidity"
                            placeholder="Select"
                            className={
                              "form-control" +
                              (formProps.errors.is_humidity &&
                              formProps.touched.is_humidity
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option value="0">Select Humidity</option>
                           
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                          </Field>

                          <ErrorMessage
                            name="is_humidity"
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
              {(
              props.cases?.isLoading ? (
                <tr>
                  <td colSpan={18}>
                    <Loader color={"primary"} />
                  </td>
                </tr>
              ) : 
              rows1?.map((user, index) => {
                    // console.log(user,"ddddd")
                    return (
                      <tr key={index}>
                        <td>{user?.id}</td>
                        <td>{user?.company?.name}</td>
                        <td>{user?.capacity}</td>
                        <td>{user?.report_no}</td>
                        <td>{user?.identification_no}</td>
                        <td>{user?.type_of_room}</td>
                        <td>{user?.type_of_cycle}</td>
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
                                  "Are you sure you wish to delete this Reports?"
                                )
                              )
                                props.onDeleteCases(data, user.id);
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
        </CardBody>
      </Card>
    );
  } else if (props.login?.login?.user?.role == "supervisor") {
    const rows1 = props.cases?.isLoading
    ? []
   : props.cases?.cases?.length > 0
   ? props.cases?.cases
   .filter((user) => {
    return user.user_id == props.login?.login?.user?.id;
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
    return (
      <Card>
        {renderRedirect()}
        <CardHeader className="bg-warning text-white">
          <div className="d-flex justify-content-between">
            <strong>Reports</strong>
            <div className="d-flex" style={{"width":"50vw"}}>

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
    setSearchFilter2(false);
  }}
  >
  <b>Reset</b>
</Button>
</div>

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
                  company_id: "",
                  user_id: props.login?.login?.user?.id,
                  identification_no: "",
                  report_no: "",
                  type_of_room: "",
                  type_of_cycle: "",
                  is_humidity: "",
                  extras:{
                    "pos2_3": "",
                  "pos1_3": "",
                  "pos2_2": "",
                  "mkt3": "",
                  "pos1_2":""
                }
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                  company_id: Yup.string().required("Company is required"),
                  identification_no: Yup.string().required(
                    "Identification No is required"
                  ),
                  report_no: Yup.string().required("Report No is required"),
                  type_of_room: Yup.string().required(
                    "Type of Room no is required"
                  ),
                  type_of_cycle: Yup.string().required(
                    "Type of Cycle no is required"
                  ),
                })}
              >
                {(formProps) => (
                  <Form>
                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="company_id">Select Customer</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="company_id"
                            id="company_id"
                            placeholder="Select Customer"
                            className={
                              "form-control" +
                              (formProps.errors.company_id &&
                              formProps.touched.company_id
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option value="">Select Customer</option>
                            {props.company?.map((cust) => (
                              <option value={cust.id}>{cust.name}</option>
                            ))}
                          </Field>

                          <ErrorMessage
                            name="company_id"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                      <Col md={6}>
                        <Label for="identification_no">Identification No</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="identification_no"
                            id="identification_no"
                            placeholder="Enter Identification No"
                            className={
                              "form-control" +
                              (formProps.errors.identification_no &&
                              formProps.touched.identification_no
                                ? " is-invalid"
                                : "")
                            }
                          />

                          <ErrorMessage
                            name="identification_no"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col md={12}>
                        <Label for="company_address_id">
                          Select Customer Address
                        </Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="company_address_id"
                            id="company_address_id"
                            placeholder="Select Customer Address"
                            className={
                              "form-control" +
                              (formProps.errors.company_address_id &&
                              formProps.touched.company_address_id
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option value="">Select Customer Address</option>
                            {props.company
                              ?.filter(
                                (c) => c.id == formProps.values.company_id
                              )
                              .map((cust) =>
                                cust.addresses?.map((addr) => (
                                  <option
                                    value={addr.id}
                                  >{`${addr.location} ${addr.area} ${addr.city}`}</option>
                                ))
                              )}
                          </Field>

                          <ErrorMessage
                            name="company_address_id"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="report_no">Report No</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="report_no"
                            id="report_no"
                            placeholder="Enter Report No"
                            className={
                              "form-control" +
                              (formProps.errors.report_no &&
                              formProps.touched.report_no
                                ? " is-invalid"
                                : "")
                            }
                          />

                          <ErrorMessage
                            name="report_no"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>

                      <Col md={6}>
                        <Label for="type_of_room">Select Type of Room</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="type_of_room"
                            id="type_of_room"
                            placeholder="Select Type of Room"
                            className={
                              "form-control" +
                              (formProps.errors.type_of_room &&
                              formProps.touched.type_of_room
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option value="">Select Type of Room</option>
                            {props.rows
                              ?.filter((row) => row.col_id == 1)
                              .map((row) => (
                                <option value={row.name}>{row.name}</option>
                              ))}
                          </Field>

                          <ErrorMessage
                            name="type_of_room"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="type_of_cycle">Select Type of Cycle</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="type_of_cycle"
                            id="type_of_cycle"
                            placeholder="Select Type of Cycle"
                            className={
                              "form-control" +
                              (formProps.errors.type_of_cycle &&
                              formProps.touched.type_of_cycle
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option value="">Select Type of Cycle</option>
                            {props.rows
                              ?.filter((row) => row.col_id == 2)
                              .map((row) => (
                                <option value={row.name}>{row.name}</option>
                              ))}
                          </Field>

                          <ErrorMessage
                            name="type_of_cycle"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                      <Col md={6}>
                        <Label for="is_humidity">Humidity</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="is_humidity"
                            id="is_humidity"
                            placeholder="Select"
                            className={
                              "form-control" +
                              (formProps.errors.is_humidity &&
                              formProps.touched.is_humidity
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option value="0">Select Humidity</option>
                           
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                          </Field>

                          <ErrorMessage
                            name="is_humidity"
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
              {(props.cases?.isLoading ? (
                <tr>
                  <td colSpan={18}>
                    <Loader color={"primary"} />
                  </td>
                </tr>
              ) : 
              rows1.map((user, index) => {
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
              ) 
              // : (
              //   <tr>
              //     <td colSpan={3}>No Reports</td>
              //   </tr>
              // )
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
        </CardBody>
      </Card>
    );
  } else if (props.login?.login?.customer?.role == "staff") {
     const rows1 = props.cases?.isLoading
   ?
   []
  : props.cases?.cases?.length > 0
  ? props.cases?.cases?.filter((user) => {
    console.log("object",name)
    return (
      user.company_id == props.login?.login?.customer?.company_id &&
      user.checked_status == 1
    );
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


    return (
      <Card>
        {renderRedirect()}
        <CardHeader className="bg-warning text-white">
          <div className="d-flex justify-content-between">
            <strong>Reports</strong>
            <div className="d-flex" style={{"width":"50vw"}}>

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
            </div>
          </div>
        </CardHeader>
        <CardBody style={{ overflow: "scroll" }}>
          <table className="table table-sm" style={{ fontSize: "12px" }}>
            <thead>
              <tr>
                <th scope="col">Reports ID</th>
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
              { (props.cases?.isLoading ? (
                <tr>
                  <td colSpan={18}>
                    <Loader color={"primary"} />
                  </td>
                </tr>
              ) : 
                rows1.map((user, index) => {
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
              ) 
              // : (
              //   <tr>
              //     <td colSpan={3}>No Reports</td>
              //   </tr>
              // )
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
        </CardBody>
      </Card>
    );
  } else if (props.login?.login?.customer?.role == "owner") {
    const rows1 = props.cases?.isLoading
   ?
   []
  : props.cases?.cases?.length > 0
  ? props.cases?.cases?.filter((user) => {
    return (
      user.company_id ==
        props.login?.login?.customer?.company_id &&
      user.checked_status == 1 &&
      user.sent_for_approval_status == 1
    );
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

    return (
      <Card>
        {renderRedirect()}
        <CardHeader className="bg-warning text-white">
          <div className="d-flex justify-content-between">
            <strong>Reports</strong>
            <div className="d-flex" style={{"width":"50vw"}}>

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
            </div>
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
              {(props.cases?.isLoading ? (
                <tr>
                  <td colSpan={18}>
                    <Loader color={"primary"} />
                  </td>
                </tr>
              ) : 
              rows1.map((user, index) => {
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
              )
              //  : (
              //   <tr>
              //     <td colSpan={3}>No Reports</td>
              //   </tr>
              // )
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
    sensor: state.sensor.sensor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCustomerGetData: (data) => dispatch(actions.customerGetData(data)),
    onUsersGetData: (data) => dispatch(actions.usersGetData(data)),
    onCompanyGetData: (data) => dispatch(actions.companyGetData(data)),
    onRowsGetData: (data) => dispatch(actions.rowsGetData(data)),
    onColsGetData: (data) => dispatch(actions.colsGetData(data)),
    onCasesGetData: (data) => dispatch(actions.casesGetData(data)),
    onDeleteCases: (data, id) => dispatch(actions.deleteCases(data, id)),
    onPostCasesData: (data, user, toggle) =>
      dispatch(actions.postCasesData(data, user, toggle)),
    onUpdateCasesData: (data, user, toggle) =>
      dispatch(actions.updateCasesData(data, user, toggle)),
    casesEditGetData: (data) => dispatch(actions.casesEditGetData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cases);

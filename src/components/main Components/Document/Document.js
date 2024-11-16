/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Input,
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
  FormGroup,
  InputGroupAddon,
  Table,
} from "reactstrap";
import { DateFormat } from "../../DateFormat/DateFormat";
import dateFormat from "dateformat";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import CustomInput from "../../../views/custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../redux/action";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import CustomSelect from "../../../views/custom/CustomSelect";

// import QuotationPdf from "./QuotationPdf";
// import ShowQuotationPdf from "./ShowQuotationPdf";
import Loader2 from "../../loader/Loader2";
import EditDocument from "./EditDocument"
import { imageUrl } from "../../../shared/imageUrl";
// import EditQuotation from "./EditQuotation";
// import DuplicatedQuotationPdf from "./DuplicateQuotationPdf";
// import QuotationApproved from "./QuotationApproved";
function Document(props) {
  const accessToken = `${props.login?.login?.token}`;

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [searchFilter2, setSearchFilter2] = React.useState(false);
  const [searchFilter3, setSearchFilter3] = React.useState(false);
  let data = {
    token: accessToken,
  };

  const [showPdf, setShowPdf] = useState(false);

  useEffect(() => {
    props.documentGetData(data);
  }, []);
  // console.log("document",props.document,props,date1,dateFormat(date1, "dd-mm-yyyy"))

  //!pagination
  const [state, setState] = useState({
    pageSize: 10, // <- 25 items will be shown on single page
    pageIndex: 0, // 0 is a default page to show
    items: props.quotation?.isLoading ? [] : props.quotation?.quotation,
  });

  const handlePrevPageClick = (event) => {
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

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setShowPdf(false);
    setModal(!modal);
  };

  const rows1 = props.document?.isLoading
  ? []
  : props.document?.document?.length > 0
  ? props.document?.document?.filter((item) => {
    
      return (
        (name && searchFilter2
          ? item?.customer?.name
              ?.toLowerCase()
              .includes(name.trim().toLowerCase())
              : item) ||
        (name && searchFilter2
          ? item?.company?.name
              ?.toLowerCase()
              .includes(name.trim().toLowerCase())
              : item) ||
        (name && searchFilter2
          ? item?.file_name
              ?.toLowerCase()
              .includes(name.trim().toLowerCase())
              : item) ||
        (name && searchFilter2
          ? item?.location
              ?.toLowerCase()
              .includes(name.trim().toLowerCase())
              : item) ||
        (name && searchFilter2
          ? dateFormat(item.created_date,"dd-mm-yyyy")
              ?.toLowerCase()
              .includes(name.trim().toLowerCase())
              : item) ||
        (name && searchFilter2
          ? item?.file_type
              ?.toLowerCase()
              .includes(name.trim().toLowerCase())
              : item) ||
        (name && searchFilter2
          ? item?.remarks
              ?.toLowerCase()
              .includes(name.trim().toLowerCase())
              : item) 
           );
                })
                : [];


  const rows2 = props.document?.isLoading
  ? []
  : props.document?.document?.length > 0
  ? props.document?.document?.filter((item) => {
    
      return (
              (date1 != null && searchFilter3 && date2 != null
          ? DateFormat({ data: item.created_date }) >= DateFormat({ data: date1 }) && 
            DateFormat({ data: item.created_date }) <= DateFormat({ data: date2 })
          : item)
                  );
                })
                : [];

let rows = rows1
if (searchFilter3== true) {
  rows = rows2
  console.log(searchFilter3,"searchFilter3")
} else {
  rows = rows1
  console.log(searchFilter2,"searchFilter2")
}

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Quotation:", values);
    const user = new FormData();
    user.append("file_type", values.file_type);
    user.append("doc", values.doc);
    user.append("remarks", values.remarks);
    user.append("company_id", values.company_id);
    user.append("customer_id", values.customer_id);
    user.append("file_name", values.file_name);
    user.append("location", values.location);
    user.append("created_date", values.created_date);

    console.log("Data of Quotation:", user);
    props.onPostDocumentData(data, user, toggle);
    setSubmitting(true);
    // setShowPdf(true);
    // toggle();
    return;
  };

  return (
    <Card>
      <CardHeader className="bg-warning text-white">
        <div className="d-flex justify-content-between align-items-center">
          <strong>Document</strong>

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
            style={{ width: "15%" }}
          />
           <div>
            <Button
              type="button"
              color="success"
              className="mr-2"
              onClick={() => {
                setSearchFilter3(false);
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
           <Stack component="form" noValidate spacing={3} style={{background:"white",borderRadius:"5px"}}>
      <TextField
        id="date"
        label="Start Date"
        type="date"
        size="small"
        defaultValue={date1}
        sx={{ width: 140 }}
        onChange={(e) => {
          console.log("e", e.target.value);
          setDate1(e.target.value);
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Stack>
           <Stack component="form" noValidate spacing={3} style={{background:"white",borderRadius:"5px"}}>
      <TextField
        id="date"
        label="End Date"
        type="date"
        size="small"
        defaultValue={date2}
        sx={{ width: 140 }}
        onChange={(e) => {
          console.log("e", e.target.value);
          setDate2(e.target.value);
        }}
        InputLabelProps={{
          shrink: true,
        }}
        />
      </Stack>
          <div>
            <Button
              type="button"
              color="success"
              className="mr-2"
              onClick={() => {
                setSearchFilter2(false);
                setSearchFilter3(true);
                // console.log("object","searchFilter3")
              }}
              >
              <b>Search</b>
            </Button>
            <Button
              type="reset"
              color="danger"
              onClick={() => {
                setDate1(null);
                setDate2(null);
                setSearchFilter3(false);
              }}
            >
              <b>Reset</b>
            </Button>
          </div>

          

          <Button
            className="btn-success float-right"
            onClick={() => {
              toggle();
            }}
          >
            Create Document
          </Button>
        </div>
        <Modal
          className="modal-info modal-lg"
          isOpen={modal}
          toggle={toggle}
          backdrop="static"
        >
          <ModalHeader toggle={toggle}>Add New Document</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                customer_id: "",
                company_id: "",
                location: "",
                file_name: "",
                created_date: "",
                user_id: props.login?.login?.user?.id,
                quotation_no: "",
                remarks: "",
                company_name: "",
                quotation_date: "",
                quotation_valid_till: "",
                gstin: "",
                net_amount: "",
                cgst: "",
                gst: "",
                gst_type: "",
                total_tax_amount: "",
                total_order_amount: "",
                is_approved: "",
                row: "",
                file_type: "",
                details: [],
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
              })}
            >
              {(formProps) =>
                !showPdf ? (
                  <Form>
                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="customer_id">Customer Name</Label>
                        <InputGroup>
                        <Field
                            component={CustomSelect}
                            type="select"
                            name="customer_id"
                            id="customer_id"
                            placeholder="Select Customer"
                            className={
                              "form-control" +
                              (formProps.errors.customer_id &&
                              formProps.touched.customer_id
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option value="">Select Customer</option>
                            {props.customer?.map((cust) => {
                              return (
                                <option value={cust.id}>{cust.name}</option>
                              );
                            })}
                          </Field>

                          <ErrorMessage
                            name="customer_id"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                      <Col md={6}>
                        <Label for="company_id">
                        Company Name
                        </Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="company_id"
                            id="company_id"
                            placeholder="Company Name"
                            className={
                              "form-control" +
                              (formProps.errors.company_id &&
                              formProps.touched.company_id
                                ? " is-invalid"
                                : "")
                            }
                          >
                          <option value="">Select Company</option>
                          {props.company?.map((cust) => {
                            return (
                              <option value={cust.id}>{cust.name}</option>
                            );
                          })}
                          </Field>

                          <ErrorMessage
                            name="company_id"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                      <Col md={6}>
                        <Label for="file_type">File Type</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="file_type"
                            id="file_type"
                            placeholder="file type"
                            className={
                              "form-control" +
                              (formProps.errors.file_type &&
                              formProps.touched.file_type
                                ? " is-invalid"
                                : "")
                            }
                          >
                              <option value="">Select Customer</option>
                              <option value="Invoice">Invoice</option>
                              <option value="Quotation">Quotation</option>
                              <option value="Thermal Mapping Certificate">Thermal Mapping Certificate</option>
                              <option value="Calibration Certificate">Calibration Certificate</option>
                              <option value="Master Certificate">Master Certificate</option>
                              <option value="Agreement">Agreement</option>
                              <option value="Other Document">Other Document</option>
                          </Field>

                          <ErrorMessage
                            name="file_type"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                      <Col md={6}>
                        <Label for="file_name">File Name</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="text"
                            name="file_name"
                            id="file_name"
                            placeholder="File Name"
                            className={
                              "form-control" +
                              (formProps.errors.file_name &&
                              formProps.touched.file_name
                                ? " is-invalid"
                                : "")
                            }
                          >
                          </Field>

                          <ErrorMessage
                            name="file_name"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                      <Col md={6}>
                        <Label for="created_date">Created Date</Label>
                        <InputGroup>
                        <Field
                          component={CustomInput}
                          type="date"
                          name="created_date"
                          id="created_date"
                          placeholder="Enter Quotation Valid Till"
                          className={
                            "form-control" +
                            (formProps.errors.created_date &&
                            formProps.touched.created_date
                              ? " is-invalid"
                              : "")
                          }
                        />

                        <ErrorMessage
                          name="created_date"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                        {/* <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="text"
                            name="file_name"
                            id="file_name"
                            placeholder="File Name"
                            className={
                              "form-control" +
                              (formProps.errors.file_name &&
                              formProps.touched.file_name
                                ? " is-invalid"
                                : "")
                            }
                          >
                          </Field>

                          <ErrorMessage
                            name="file_name"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup> */}
                      </Col>
                      <Col md={6}>
                        <Label for="location">Location</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="text"
                            name="location"
                            id="location"
                            placeholder="Location"
                            className={
                              "form-control" +
                              (formProps.errors.location &&
                              formProps.touched.location
                                ? " is-invalid"
                                : "")
                            }
                          >
                          </Field>

                          <ErrorMessage
                            name="location"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                                <Row className="form-group">
                    {/* <Row className="form-group"> */}
                    <Col md={6}>
                    <Label for="doc">Upload File</Label>
                      <InputGroup>
                        <input
                          component={CustomInput}
                          type="file"
                          name="doc"
                          id="doc"
                          onChange={(event) => {
                            formProps.setFieldValue(
                              "doc",
                              event.currentTarget.files[0]
                            );
                          }}
                          className="form-group"
                        />
                      </InputGroup>
                  </Col>
                    {/* </Row> */}
                      <Col md={6}>
                        <Label for="remarks">
                        Remarks
                        </Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="text"
                            name="remarks"
                            id="remarks"
                            placeholder="Remarks"
                            className={
                              "form-control" +
                              (formProps.errors.remarks &&
                              formProps.touched.remarks
                                ? " is-invalid"
                                : "")
                            }
                          >
                          </Field>

                          <ErrorMessage
                            name="remarks"
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
                ) : (
                  <div
                    toggle={toggle}
                    data={formProps.values}
                    customer={props.customer}
                  />
                )
              }
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
              <th scope="col">Company Name</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Date</th>
              <th scope="col">File type</th>
              <th scope="col">File Name</th>
              <th scope="col">Location</th>
              <th scope="col">Remarks</th>
              <th scope="col">View Document</th>
              <th scope="col">Action</th>
             
            </tr>
          </thead>
          <tbody style={{ textTransform: "uppercase" }}>
            {rows.map((user, index) => {
                  return (
                    <tr key={index}>
                      {/* <td>{user.quotation_no}</td> */}
                      <td>{user?.company?.name}</td>
                      <td>{user?.customer?.name}</td>
                      <td>{dateFormat(user.created_date,"dd-mm-yyyy")}</td>
                      <td>{user?.file_type}</td>
                      <td>{user?.file_name}</td>
                      <td>{user?.location}</td>
                      <td>{user?.remarks}</td>
                      <td><a href={`${imageUrl}CustomerDocuments/${user?.doc}` } target="_blank"><Button>View</Button></a></td>
                      {/* <td>{user.created_date}</td> */}
                      {/* <td>{user.quotation_type}</td>
                      <td>{user.is_approved == 0 ? "No" : "Yes"}</td> */}

                      <td className="d-flex justify-content-center">
                        {/* <QuotationApproved data={user} />
                        <DuplicatedQuotationPdf data={user} />
                        <QuotationPdf data={user} customer={user.customer} />
                        <EditQuotation data={user} /> */}

                        <Button style={{margin: "0 10px"}}
                          className="btn-danger ml-2 p-1"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this Quotation?"
                              )
                            )
                              props.onDeleteDocument(data, user.id);
                          }}
                        >
                          <i
                            className="fa fa-trash-alt "
                            value={user.id}
                            aria-hidden="true"
                          ></i>
                        </Button>
                        
                        <EditDocument  data={user}/>
                       
                      </td>
                    </tr>
                  );
                })
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

const mapStateToProps = (state) => {
  return {
    login: state.login,
    quotation: state.quotation,
    cols: state.cols.cols,
    customer: state.customer.customer,
    rows: state.rows.rows,
    company: state.company.company,
    document: state.document,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    documentGetData: (data) => dispatch(actions.documentGetData(data)),
    onPostDocumentData: (data, user, toggle) => dispatch(actions.postDocumentData(data, user, toggle)),
    onDeleteDocument: (data, user_id) => dispatch(actions.deleteDocument(data, user_id)),
    // onColsGetData: (data) => dispatch(actions.colsGetData(data)),
    // onQuotationGetData: (data) => dispatch(actions.quotationGetData(data)),
    // onDeleteQuotation: (data, id) =>
    //   dispatch(actions.deleteQuotation(data, id)),
    // onPostQuotationData: (data, user, toggle, setShowPdf, setSubmitting) =>
    //   dispatch(
    //     actions.postQuotationData(data, user, toggle, setShowPdf, setSubmitting)
    //   ),
    // onUpdateQuotationData: (data, user, toggle, setSubmitting) =>
    //   dispatch(actions.updateQuotationData(data, user, toggle, setSubmitting)),
    // quotationEditGetData: (data) =>
    //   dispatch(actions.quotationEditGetData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Document);

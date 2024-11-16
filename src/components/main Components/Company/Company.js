/* eslint-disable eqeqeq */
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
  CardFooter,
} from "reactstrap";
import FA from "react-fontawesome";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import CustomInput from "../../../views/custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../redux/action";
import CustomSelect from "../../../views/custom/CustomSelect";
import EditCompany from "./EditCompany";
import Loader from "../../loader/Loader2";
import TextField from "../../../Helpers/TextField";

function Company(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
  };

  useEffect(() => {
    props.onCompanyGetData(data);
  }, []);

  const [state, setState] = useState({
    pageSize: 10, // <- 25 items will be shown on single page
    pageIndex: 0, // 0 is a default page to show
    items: props.company?.isLoading ? [] : props.company?.company,
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
    setModal(!modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Company:", values);

    const user = new FormData();
    values.files?.map((file, index) => {
      console.log("files", file);
      return user.append(`files[${index}]`, file);
    });

    user.append("name", values.name);
    user.append("addresses", JSON.stringify(values.addresses));
    user.append("is_active", values.is_active);
    user.append("internal", values.internal);
    user.append("pan_no", values.pan_no);
    user.append("gstin", values.gstin);
    user.append("bank", values.bank);
    user.append("branch", values.branch);
    user.append("beneficiary", values.beneficiary);
    user.append("current_ac", values.current_ac);
    user.append("ifsc_code", values.ifsc_code);

    console.log("Data of Company:", user);
    props.onPostCompanyData(data, user, toggle, setSubmitting);
    setSubmitting(true);
    return;
  };

  return (
    <Card>
      <CardHeader className="bg-warning text-white">
        <div className="">
          <strong>Company</strong>

          <Button
            className="btn-success  float-right"
            onClick={() => {
              toggle();
            }}
          >
            Add Company
          </Button>
        </div>
        <Modal
          className="modal-info modal-lg"
          isOpen={modal}
          toggle={toggle}
          backdrop="static"
        >
          <ModalHeader toggle={toggle}>Add New Company</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                is_active: "",
                internal: "",
                pan_no: "",
                gstin: "",
                bank: "",
                branch: "",
                beneficiary: "",
                current_ac: "",
                ifsc_code: "",
                files: [],
                addresses: [],
                billing_address: [
                  {
                    is_shipping: 0,
                    email: "",
                    phone: "",
                    address: "",
                    location: "",
                    area: "",
                    city: "",
                    state: "",
                    country: "",
                    pincode: "",
                    contact_name: "",
                    contact_number: "",
                  },
                ],
                shipping_address: [
                  {
                    is_shipping: 1,
                    email: "",
                    phone: "",
                    address: "",
                    location: "",
                    area: "",
                    city: "",
                    state: "",
                    country: "",
                    pincode: "",
                    contact_name: "",
                    contact_number: "",
                  },
                ],
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Required"),
              })}
            >
              {(formProps) => {
                var billing_address = formProps.values?.billing_address;
                var shipping_address = formProps.values?.shipping_address;
                var addresses = [...billing_address, ...shipping_address];
                formProps.values.addresses = addresses;
                console.log("formProps.values", formProps.values);
                return (
                  <Form enctype="multipart/form-data">
                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="discount">Name</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter Full Name"
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
                        <Label for="internal">Select Under Company</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="internal"
                            id="internal"
                            className="form-control"
                          >
                            <option value="">Select Under Company</option>
                            <option value={1}>Internal</option>
                            <option value={0}>External</option>
                          </Field>
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="pan_no">Enter Pan No</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="pan_no"
                            id="pan_no"
                            placeholder="Enter Pan no"
                            className={
                              "form-control" +
                              (formProps.errors.pan_no &&
                              formProps.touched.pan_no
                                ? " is-invalid"
                                : "")
                            }
                          />
                        </InputGroup>
                      </Col>
                      <Col md={6}>
                        <Label for="bank">Enter Bank Name</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="bank"
                            id="bank"
                            placeholder="Enter Bank Name"
                            className={
                              "form-control" +
                              (formProps.errors.bank && formProps.touched.bank
                                ? " is-invalid"
                                : "")
                            }
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="branch">Enter Branch</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="branch"
                            id="branch"
                            placeholder="Enter Branch"
                            className={
                              "form-control" +
                              (formProps.errors.branch &&
                              formProps.touched.branch
                                ? " is-invalid"
                                : "")
                            }
                          />
                        </InputGroup>
                      </Col>
                      <Col md={6}>
                        <Label for="beneficiary">Enter Beneficiary Name</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="beneficiary"
                            id="beneficiary"
                            placeholder="Enter Beneficiary Name"
                            className={
                              "form-control" +
                              (formProps.errors.beneficiary &&
                              formProps.touched.beneficiary
                                ? " is-invalid"
                                : "")
                            }
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="current_ac">Enter CURRENT ACC. NO</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="current_ac"
                            id="current_ac"
                            placeholder="Enter CURRENT ACC. NO"
                            className={
                              "form-control" +
                              (formProps.errors.current_ac &&
                              formProps.touched.current_ac
                                ? " is-invalid"
                                : "")
                            }
                          />
                        </InputGroup>
                      </Col>
                      <Col md={6}>
                        <Label for="ifsc_code">Enter IFSC Code</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="ifsc_code"
                            id="ifsc_code"
                            placeholder="Enter IFSC Code"
                            className={
                              "form-control" +
                              (formProps.errors.ifsc_code &&
                              formProps.touched.ifsc_code
                                ? " is-invalid"
                                : "")
                            }
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="gstin">Enter Gstin</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="gstin"
                            id="gstin"
                            placeholder="Enter Gstin"
                            className={
                              "form-control" +
                              (formProps.errors.gstin && formProps.touched.gstin
                                ? " is-invalid"
                                : "")
                            }
                          />
                        </InputGroup>
                      </Col>
                      <Col md={6}>
                        <Label for="is_active">Select Status</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="is_active"
                            id="is_active"
                            placeholder="Select Role"
                            className="form-control"
                          >
                            <option value="">Select Status</option>
                            <option value={1}>Active</option>
                            <option value={0}>Passive</option>
                          </Field>
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col md={10}>
                        <Label for="file">Upload Mutliple Agreement</Label>
                        <InputGroup>
                          <input
                            component={CustomInput}
                            type="file"
                            name="files"
                            id="files"
                            multiple
                            onChange={(e) => {
                              // console.log("files", e.target.files);
                              formProps.setFieldValue("files", [
                                ...e.target.files,
                              ]);
                            }}
                            className={
                              "form-control" +
                              (formProps.errors.files && formProps.touched.files
                                ? " is-invalid"
                                : "")
                            }
                          />

                          <ErrorMessage
                            name="files"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Col md={12} className="m-0 p-0">
                      <FieldArray
                        name="billing_address"
                        render={(arrayHelpers) => (
                          <>
                            <Card className="p-3" color="info">
                              {formProps.values.billing_address?.map(
                                (bill_add, billIndex) => {
                                  return (
                                    <div className="p-1">
                                      <Label>
                                        Billing Address {billIndex + 1}
                                      </Label>
                                      <Row className="form-group">
                                        <Col md={6}>
                                          <TextField
                                            name={`billing_address.${billIndex}.location`}
                                            placeholder="Enter Location"
                                            label="Enter Location"
                                            formProps={formProps}
                                          />
                                        </Col>
                                        <Col md={6}>
                                          <TextField
                                            name={`billing_address.${billIndex}.area`}
                                            label="Enter Area"
                                            formProps={formProps}
                                          />
                                        </Col>
                                      </Row>
                                      <Row className="form-group">
                                        <Col md={6}>
                                          <TextField
                                            name={`billing_address.${billIndex}.city`}
                                            label="Enter City"
                                            formProps={formProps}
                                          />
                                        </Col>
                                        <Col md={6}>
                                          <TextField
                                            name={`billing_address.${billIndex}.contact_name`}
                                            label="Enter Contact Person Name"
                                            formProps={formProps}
                                          />
                                        </Col>
                                      </Row>
                                      <Row className="form-group">
                                        <Col md={6}>
                                          <TextField
                                            name={`billing_address.${billIndex}.email`}
                                            type="email"
                                            label="Enter Email"
                                            formProps={formProps}
                                          />
                                        </Col>
                                        <Col md={6}>
                                          <TextField
                                            name={`billing_address.${billIndex}.phone`}
                                            label="Enter Mobile Number"
                                            formProps={formProps}
                                          />
                                        </Col>
                                      </Row>
                                      <div className="d-flex justify-content-end align-items-center p-2 pb-0">
                                        {formProps.values.billing_address
                                          ?.length ==
                                          billIndex + 1 && (
                                          <Button
                                            className="btn-success p-1"
                                            onClick={() => {
                                              arrayHelpers.push({
                                                is_shipping: 0,
                                                email: "",
                                                phone: "",
                                                address: "",
                                                location: "",
                                                area: "",
                                                city: "",
                                                state: "",
                                                country: "",
                                                pincode: "",
                                                contact_name: "",
                                                contact_number: "",
                                              });
                                            }}
                                          >
                                            <i className="fa fa-plus" />
                                          </Button>
                                        )}

                                        {formProps.values.billing_address
                                          ?.length > 1 && (
                                          <Button
                                            color="danger p-1 ml-3"
                                            size="sm"
                                            onClick={() =>
                                              arrayHelpers.remove(billIndex)
                                            }
                                          >
                                            <i className="fa fa-trash" />
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </Card>
                          </>
                        )}
                      />
                      <FieldArray
                        name="shipping_address"
                        render={(arrayHelpers) => (
                          <>
                            <Card className="p-3" color="warning">
                              {formProps.values.shipping_address?.map(
                                (bill_add, shipingIndex) => {
                                  return (
                                    <div className="p-1">
                                      <Label>
                                        Shipping Address {shipingIndex + 1}{" "}
                                      </Label>
                                      <Row className="form-group">
                                        <Col md={6}>
                                          <TextField
                                            name={`shipping_address.${shipingIndex}.location`}
                                            placeholder="Enter Location"
                                            label="Enter Location"
                                            formProps={formProps}
                                          />
                                        </Col>
                                        <Col md={6}>
                                          <TextField
                                            name={`shipping_address.${shipingIndex}.area`}
                                            label="Enter Area"
                                            formProps={formProps}
                                          />
                                        </Col>
                                      </Row>
                                      <Row className="form-group">
                                        <Col md={6}>
                                          <TextField
                                            name={`shipping_address.${shipingIndex}.city`}
                                            label="Enter City"
                                            formProps={formProps}
                                          />
                                        </Col>
                                        <Col md={6}>
                                          <TextField
                                            name={`shipping_address.${shipingIndex}.contact_name`}
                                            label="Enter Contact Person Name"
                                            formProps={formProps}
                                          />
                                        </Col>
                                      </Row>
                                      <Row className="form-group">
                                        <Col md={6}>
                                          <TextField
                                            name={`shipping_address.${shipingIndex}.email`}
                                            type="email"
                                            label="Enter Email"
                                            formProps={formProps}
                                          />
                                        </Col>
                                        <Col md={6}>
                                          <TextField
                                            name={`shipping_address.${shipingIndex}.phone`}
                                            label="Enter Mobile Number"
                                            formProps={formProps}
                                          />
                                        </Col>
                                      </Row>
                                      <div className="d-flex justify-content-end align-items-center p-2 pb-0">
                                        {formProps.values.shipping_address
                                          ?.length ==
                                          shipingIndex + 1 && (
                                          <Button
                                            className="btn-success p-1"
                                            onClick={() => {
                                              arrayHelpers.push({
                                                is_shipping: 1,
                                                email: "",
                                                phone: "",
                                                address: "",
                                                location: "",
                                                area: "",
                                                city: "",
                                                state: "",
                                                country: "",
                                                pincode: "",
                                                contact_name: "",
                                                contact_number: "",
                                              });
                                            }}
                                          >
                                            <i className="fa fa-plus" />
                                          </Button>
                                        )}

                                        {formProps.values.shipping_address
                                          ?.length > 1 && (
                                          <Button
                                            color="danger p-1 ml-3"
                                            size="sm"
                                            onClick={() =>
                                              arrayHelpers.remove(shipingIndex)
                                            }
                                          >
                                            <i className="fa fa-trash" />
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </Card>
                          </>
                        )}
                      />
                    </Col>

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
      </CardHeader>
      <CardBody style={{ overflow: "scroll" }}>
        <table
          className="table table-sm text-center"
          style={{ fontSize: "12px", overflow: "scroll" }}
        >
          <thead>
            <tr>
              <th scope="col">Company ID</th>
              <th scope="col">Company Name</th>
              <th scope="col">Under Company</th>
              <th scope="col">Is Active</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody style={{ textTransform: "uppercase" }}>
            {props.company?.isLoading ? (
              <tr>
                <td colSpan={18}>
                  <Loader color={"primary"} />
                </td>
              </tr>
            ) : props.company?.company?.length > 0 ? (
              props.company?.company
                ?.slice(
                  state.pageIndex * state.pageSize,
                  state.pageIndex * state.pageSize + state.pageSize
                )
                .map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.internal == 1 ? "internal" : "External"}</td>
                      <td>{user.is_active == 1 ? "active" : "passive"}</td>
                      <td className="d-flex justify-content-center">
                        <EditCompany data={user} />

                        <Button
                          className="btn-danger ml-3 p-1"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this Company?"
                              )
                            )
                              props.onDeleteCompany(data, user.id);
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
                <td colSpan={3}>No Companys</td>
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
    company: state.company,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCompanyGetData: (data) => dispatch(actions.companyGetData(data)),
    onDeleteCompany: (data, id) => dispatch(actions.deleteCompany(data, id)),
    onPostCompanyData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postCompanyData(data, user, toggle, setSubmitting)),
    onUpdateCompanyData: (data, user, toggle) =>
      dispatch(actions.updateCompanyData(data, user, toggle)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Company);

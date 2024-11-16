/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
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
  FormGroup,
  InputGroupAddon,
  Table,
} from "reactstrap";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import CustomInput from "../../../views/custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../redux/action";
import CustomSelect from "../../../views/custom/CustomSelect";

import QuotationPdf from "./QuotationPdf";
import ShowQuotationPdf from "./ShowQuotationPdf";
import Loader2 from "../../loader/Loader2";
import EditQuotation from "./EditQuotation";
import DuplicatedQuotationPdf from "./DuplicateQuotationPdf";
import QuotationApproved from "./QuotationApproved";
function Quotation(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
  };

  const [showPdf, setShowPdf] = useState(false);

  useEffect(() => {
    props.onCompanyGetData(data);
    props.onQuotationGetData(data);
    props.onRowsGetData(data);
    props.onCustomerGetData(data);
    props.onColsGetData(data);
  }, []);

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
    setShowPdf(false);
    setModal(!modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // console.log("values in Quotation:", values);

    let user = {
      customer_id: values.customer_id,
      company_id: values.company_id,
      user_id: values.user_id,
      quotation_no: values.quotation_no,
      quotation_type: values.type_of_quotation,
      quotation_date: values.quotation_date,
      gstin: values.gstin,
      quotation_valid_till: values.quotation_valid_till,
      net_amount: values.net_amount,
      cgst: values.cgst,
      gst: values.gst,
      total_tax_amount: values.total_tax_amount,
      total_order_amount: values.total_order_amount,
      // is_approved: values.is_approved,
      gst_type: values.gst_type,
      products: values.details,
    };

    // console.log("Data of Quotation:", user);
    props.onPostQuotationData(data, user, toggle, setShowPdf, setSubmitting);
    setSubmitting(true);
    // setShowPdf(true);
    // toggle();
    return;
  };

  return (
    <Card>
      <CardHeader className="bg-warning text-white">
        <div className="">
          <strong>Quotation</strong>

          <Button
            className="btn-success float-right"
            onClick={() => {
              toggle();
            }}
          >
            Create Quotation
          </Button>
        </div>
        <Modal
          className="modal-info modal-lg"
          isOpen={modal}
          toggle={toggle}
          backdrop="static"
        >
          <ModalHeader toggle={toggle}>Add New Quotation</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                customer_id: "",
                company_id: "",
                user_id: props.login?.login?.user?.id,
                quotation_no: "",
                type_of_quotation: "",
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
                details: [],
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                customer_id: Yup.string().required("required"),
                company_id: Yup.string().required("required"),
                quotation_no: Yup.string().required("required"),
                quotation_date: Yup.string().required("required"),
                quotation_valid_till: Yup.string().required("required"),
                type_of_quotation: Yup.string().required("required"),
                gstin: Yup.string().required("required"),
                gst_type: Yup.string().required("required"),
              })}
            >
              {(formProps) =>
                !showPdf ? (
                  <Form>
                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="customer_id">Select Customer</Label>
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
                        <Label for="company_id">Select Company</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="company_id"
                            id="company_id"
                            placeholder="Select Company"
                            className={
                              "form-control" +
                              (formProps.errors.company_id &&
                              formProps.touched.company_id
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option value="">Select Company</option>
                            {props.company
                              ?.filter((com) => com.internal == 1)
                              .map((cust) => {
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
                    </Row>
                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="type_of_quotation">
                          Select Quotation Type
                        </Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="type_of_quotation"
                            id="type_of_quotation"
                            placeholder="Select Quotation Type"
                            className={
                              "form-control" +
                              (formProps.errors.type_of_quotation &&
                              formProps.touched.type_of_quotation
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option value="">Select Quotation Type</option>
                            <option value="With Calculation">
                              With Calculation
                            </option>
                            <option value="Without Calculation">
                              Without Calculation
                            </option>
                          </Field>

                          <ErrorMessage
                            name="type_of_quotation"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>

                      <Col md={6}>
                        <Label for="quotation_no">Quotation No</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="quotation_no"
                            id="quotation_no"
                            placeholder="Enter Quotation No"
                            className={
                              "form-control" +
                              (formProps.errors.quotation_no &&
                              formProps.touched.quotation_no
                                ? " is-invalid"
                                : "")
                            }
                          />

                          <ErrorMessage
                            name="quotation_no"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="quotation_date">Quotation Date</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="date"
                            name="quotation_date"
                            id="quotation_date"
                            placeholder="Enter Quotation No"
                            className={
                              "form-control" +
                              (formProps.errors.quotation_date &&
                              formProps.touched.quotation_date
                                ? " is-invalid"
                                : "")
                            }
                          />

                          <ErrorMessage
                            name="quotation_date"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>

                      <Col md={6}>
                        <Label for="quotation_valid_till">
                          Quotation Valid Till
                        </Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="date"
                            name="quotation_valid_till"
                            id="quotation_valid_till"
                            placeholder="Enter Quotation Valid Till"
                            className={
                              "form-control" +
                              (formProps.errors.quotation_valid_till &&
                              formProps.touched.quotation_valid_till
                                ? " is-invalid"
                                : "")
                            }
                          />

                          <ErrorMessage
                            name="quotation_valid_till"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="gstin">GSTIN</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="gstin"
                            id="gstin"
                            placeholder="Enter GSTIN"
                            className={
                              "form-control" +
                              (formProps.errors.gstin && formProps.touched.gstin
                                ? " is-invalid"
                                : "")
                            }
                          />

                          <ErrorMessage
                            name="gstin"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                      <Col md={6}>
                        <Label for="gst_type">Select Gst Type</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="gst_type"
                            id="gst_type"
                            placeholder=""
                            className={
                              "form-control" +
                              (formProps.errors.gst_type &&
                              formProps.touched.gst_type
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option value="">Select Gst Type</option>
                            <option value="SGST">SGST</option>
                            <option value="IGST">IGST</option>
                          </Field>

                          <ErrorMessage
                            name="gst_type"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="row">Add Table Rows</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="number"
                            name="row"
                            id="row"
                            placeholder="Enter Table rows"
                            className={
                              "form-control" +
                              (formProps.errors.row && formProps.touched.row
                                ? " is-invalid"
                                : "")
                            }
                          />

                          <ErrorMessage
                            name="row"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12}>
                        <FieldArray
                          name="details"
                          render={(arrayHelpers) => (
                            <div>
                              <Row>
                                <Col md={10}>
                                  <FormGroup>
                                    <InputGroup>
                                      <InputGroupAddon addonType="append">
                                        <Button
                                          block
                                          className="btn-success"
                                          onClick={() => {
                                            for (
                                              let i = 1;
                                              i <= formProps.values.row;
                                              i++
                                            ) {
                                              arrayHelpers.push({
                                                desc: "",
                                                specs: "",
                                                qty: "",
                                                units: "",
                                                unit_price: "",
                                                total_amount: "",
                                                cgst: "",
                                                sgst: "",
                                                tax_amount: "",
                                                order_amount: "",
                                              });
                                            }
                                          }}
                                        >
                                          Add Rows
                                        </Button>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <div style={{ overflow: "scroll" }}>
                                <Table size="sm" className="text-center f-12">
                                  <thead>
                                    <tr>
                                      <th>Sr no</th>
                                      <th>Description Of Items</th>
                                      <th>Model/Specifications</th>
                                      <th>Qty</th>
                                      <th>Units</th>
                                      <th>Unit Price (INR)</th>
                                      <th>Total Amount(INR)</th>
                                      <th>Delete</th>
                                    </tr>
                                  </thead>
                                  <tbody className="text-center">
                                    {console.log(
                                      "values",
                                      formProps?.values?.details
                                    )}
                                    {formProps?.values?.details?.map(
                                      (detail, index) => {
                                        var sale_rate = Number(
                                          detail.unit_price
                                        );
                                        var quantity = Number(detail.qty);
                                        // var gst =
                                        //   (Number(detail.gst_rate) / 100) *
                                        //   sale_rate;
                                        var final = sale_rate * quantity;
                                        var cgst = (final * 9) / 100;
                                        var sgst = (final * 9) / 100;
                                        detail.total_amount = final;
                                        detail.sgst = sgst;
                                        detail.cgst = cgst;
                                        var tax_amount = sgst + cgst;
                                        detail.tax_amount = tax_amount;
                                        detail.order_amount =
                                          tax_amount + final;
                                        return (
                                          <tr
                                            key={index}
                                            className="text-center"
                                          >
                                            <td>{index + 1}</td>
                                            <td>
                                              <Field
                                                component={CustomInput}
                                                type="text"
                                                name={`details.${index}.desc`}
                                                id="desc"
                                                style={{ width: "150px" }}
                                              ></Field>
                                            </td>
                                            <td>
                                              <Field
                                                component={CustomInput}
                                                type="text"
                                                name={`details.${index}.specs`}
                                                id={`details.${index}.specs`}
                                              />
                                            </td>

                                            <td>
                                              <Field
                                                component={CustomInput}
                                                type="number"
                                                name={`details.${index}.qty`}
                                                id={`details.${index}.qty`}
                                                min="1"
                                                style={{ width: "80px" }}
                                              />
                                            </td>
                                            <td>
                                              <Field
                                                component={CustomInput}
                                                type="text"
                                                name={`details.${index}.units`}
                                                id={`details.${index}.units`}
                                                style={{ width: "100px" }}
                                              />
                                            </td>
                                            <td>
                                              <Field
                                                component={CustomInput}
                                                type="text"
                                                name={`details.${index}.unit_price`}
                                                id={`details.${index}.unit_price`}
                                              />
                                            </td>
                                            <td>
                                              <Field
                                                component={CustomInput}
                                                type="text"
                                                name={`details.${index}.total_amount`}
                                                id={`details.${index}.total_amount`}
                                              />
                                            </td>

                                            <td>
                                              <Button
                                                color="danger p-1"
                                                size="sm"
                                                onClick={() =>
                                                  arrayHelpers.remove(index)
                                                }
                                              >
                                                <i className="fa fa-trash" />
                                              </Button>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                    {formProps.values?.type_of_quotation ===
                                      "With Calculation" && (
                                      <>
                                        <tr>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td>Total Net Amount</td>
                                          <td>
                                            <i className="fa fa-rupee-sign" />{" "}
                                            {
                                              (formProps.values.net_amount =
                                                parseFloat(
                                                  formProps.values.details.reduce(
                                                    function (prev, cur) {
                                                      return (
                                                        prev + cur.total_amount
                                                      );
                                                    },
                                                    0
                                                  )
                                                ).toFixed(2))
                                            }
                                          </td>
                                          <td></td>
                                        </tr>
                                        <tr>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td>Add : CGST @ 9.00%</td>
                                          <td>
                                            <i className="fa fa-rupee-sign" />{" "}
                                            {
                                              (formProps.values.cgst =
                                                parseFloat(
                                                  formProps.values.details.reduce(
                                                    function (prev, cur) {
                                                      return prev + cur.cgst;
                                                    },
                                                    0
                                                  )
                                                ).toFixed(2))
                                            }
                                          </td>
                                          <td></td>
                                        </tr>
                                        <tr>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>

                                          <td></td>
                                          <td>
                                            Add : {formProps.values.gst_type} @
                                            9.00%
                                          </td>
                                          <td>
                                            <i className="fa fa-rupee-sign" />{" "}
                                            {
                                              (formProps.values.gst =
                                                parseFloat(
                                                  formProps.values.details.reduce(
                                                    function (prev, cur) {
                                                      return prev + cur.sgst;
                                                    },
                                                    0
                                                  )
                                                ).toFixed(2))
                                            }
                                          </td>
                                          <td></td>
                                        </tr>
                                        <tr>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td>Total Tax Amount</td>
                                          <td>
                                            <i className="fa fa-rupee-sign" />{" "}
                                            {
                                              (formProps.values.total_tax_amount =
                                                parseFloat(
                                                  formProps.values.details.reduce(
                                                    function (prev, cur) {
                                                      return (
                                                        prev + cur.tax_amount
                                                      );
                                                    },
                                                    0
                                                  )
                                                ).toFixed(2))
                                            }
                                          </td>
                                          <td></td>
                                        </tr>

                                        <tr>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td style={{ width: "200px" }}>
                                            Total Order Amount
                                          </td>
                                          <td>
                                            <i className="fa fa-rupee-sign" />{" "}
                                            {
                                              (formProps.values.total_order_amount =
                                                parseFloat(
                                                  formProps.values.details.reduce(
                                                    function (prev, cur) {
                                                      return (
                                                        prev + cur.order_amount
                                                      );
                                                    },
                                                    0
                                                  )
                                                ).toFixed(2))
                                            }
                                          </td>
                                          <td></td>
                                        </tr>
                                      </>
                                    )}
                                  </tbody>
                                </Table>
                              </div>
                            </div>
                          )}
                        />
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
                  <ShowQuotationPdf
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
              <th scope="col">Quote No</th>
              <th scope="col">Kind Attn</th>
              <th scope="col">Company Name</th>
              <th scope="col">Quote Date</th>
              <th scope="col">Quote Valid Till</th>
              <th scope="col">Quote Type</th>
              <th scope="col">Approved</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody style={{ textTransform: "uppercase" }}>
            {props.quotation?.isLoading ? (
              <tr>
                <td colSpan={18}>
                  <Loader2 color={"primary"} />
                </td>
              </tr>
            ) : props.quotation?.quotation?.length > 0 ? (
              props.quotation?.quotation
                ?.slice(
                  state.pageIndex * state.pageSize,
                  state.pageIndex * state.pageSize + state.pageSize
                )
                .map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.quotation_no}</td>
                      <td>{user.customer?.name}</td>
                      <td>{user.company?.name}</td>
                      <td>{user.quotation_date}</td>
                      <td>{user.quotation_valid_till}</td>
                      <td>{user.quotation_type}</td>
                      <td>{user.is_approved == 0 ? "No" : "Yes"}</td>

                      <td className="d-flex justify-content-center">
                        <QuotationApproved data={user} />
                        <DuplicatedQuotationPdf data={user} />
                        <QuotationPdf data={user} customer={user.customer} />
                        <EditQuotation data={user} />

                        <Button
                          className="btn-danger ml-2 p-1"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this Quotation?"
                              )
                            )
                              props.onDeleteQuotation(data, user.id);
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
                <td colSpan={3}>No Quotation</td>
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
    quotation: state.quotation,
    cols: state.cols.cols,
    customer: state.customer.customer,
    rows: state.rows.rows,
    company: state.company.company,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCompanyGetData: (data) => dispatch(actions.companyGetData(data)),
    onCustomerGetData: (data) => dispatch(actions.customerGetData(data)),
    onRowsGetData: (data) => dispatch(actions.rowsGetData(data)),
    onColsGetData: (data) => dispatch(actions.colsGetData(data)),
    onQuotationGetData: (data) => dispatch(actions.quotationGetData(data)),
    onDeleteQuotation: (data, id) =>
      dispatch(actions.deleteQuotation(data, id)),
    onPostQuotationData: (data, user, toggle, setShowPdf, setSubmitting) =>
      dispatch(
        actions.postQuotationData(data, user, toggle, setShowPdf, setSubmitting)
      ),
    onUpdateQuotationData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateQuotationData(data, user, toggle, setSubmitting)),
    quotationEditGetData: (data) =>
      dispatch(actions.quotationEditGetData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Quotation);

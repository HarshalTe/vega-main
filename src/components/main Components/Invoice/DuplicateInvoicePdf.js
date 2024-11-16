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

import ShowInvoicePdf from "./ShowInvoicePdf";

function DuplicateInvoicePdf(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
  };

  const [showPdf, setShowPdf] = useState(false);

  //!pagination

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setShowPdf(false);
    setModal(!modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Invoice:", values);
    let user = {
      customer_id: values.customer_id,
      company_id: values.company_id,
      user_id: values.user_id,
      invoice_no: values.invoice_no,
      invoice_type: values.type_of_invoice,
      date: values.invoice_date,
      invoice_gstin: values.inv_gstin,
      quotation_ref: values.quotation_ref_no,
      purchase_order_no: values.purchase_order_no,
      purchase_order_date: values.purchase_order_date,
      invoice_challan: values.challan_no,
      net_amount: values.net_amount,
      cgst: values.cgst,
      gst: values.gst,
      total_tax_amount: values.total_tax_amount,
      total_order_amount: values.total_order_amount,
      // is_paid: values.is_paid,
      products: values.details,
      gst_type: values.gst_type,
    };

    console.log("Data of Invoice:", user);
    props.onPostInvoiceData(data, user, toggle, setShowPdf, setSubmitting);
    setSubmitting(true);
    // setShowPdf(true);
    return;
  };

  return (
    <div>
      <Button
        className="btn-success p-1 mr-2"
        onClick={() => {
          toggle();
        }}
      >
        <i className="fa fa-angle-double-right" aria-hidden="true" />
      </Button>
      <Modal
        className="modal-info modal-lg"
        isOpen={modal}
        toggle={toggle}
        backdrop="static"
      >
        <ModalHeader toggle={toggle}>Add New Invoice</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              company_id: props.data.company_id,
              customer_id: props.data.customer_id,
              user_id: props.login?.login?.user?.id,
              invoice_no: props.data.invoice_no,
              type_of_invoice: "",
              invoice_date: props.data.date,
              quotation_ref_no: props.data.quotation_ref,
              purchase_order_no: props.data.purchase_order_no,
              purchase_order_date: props.data.purchase_order_date,
              inv_gstin: props.data.invoice_gstin,
              challan_no: props.data.invoice_challan,
              row: "",
              net_amount: "",
              cgst: "",
              gst: "",
              total_tax_amount: "",
              total_order_amount: "",
              is_paid: "",
              gst_type: "",
              details: [],
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              company_id: Yup.string().required("Company is required"),
              customer_id: Yup.string().required("Customer is required"),
              invoice_no: Yup.string().required("required"),
              invoice_date: Yup.string().required("required"),
              type_of_invoice: Yup.string().required("required"),
              quotation_ref_no: Yup.string().required("required"),
              purchase_order_no: Yup.string().required("required"),
              purchase_order_date: Yup.string().required("required"),
              inv_gstin: Yup.string().required("required"),
              challan_no: Yup.string().required("required"),
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
                            return <option value={cust.id}>{cust.name}</option>;
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
                      <Label for="type_of_invoice">Select Invoice Type</Label>
                      <InputGroup>
                        <Field
                          component={CustomSelect}
                          type="select"
                          name="type_of_invoice"
                          id="type_of_invoice"
                          placeholder="Select Invoice Type"
                          className={
                            "form-control" +
                            (formProps.errors.type_of_invoice &&
                            formProps.touched.type_of_invoice
                              ? " is-invalid"
                              : "")
                          }
                        >
                          <option value="">Select Invoice Type</option>
                          <option value="Profoma Invoice">
                            Profoma Invoice
                          </option>
                          <option value="Tax Invoice">Tax Invoice</option>
                        </Field>

                        <ErrorMessage
                          name="type_of_invoice"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>

                    <Col md={6}>
                      <Label for="invoice_no">Invoice No</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="invoice_no"
                          id="invoice_no"
                          placeholder="Enter Invoice No"
                          className={
                            "form-control" +
                            (formProps.errors.invoice_no &&
                            formProps.touched.invoice_no
                              ? " is-invalid"
                              : "")
                          }
                        />

                        <ErrorMessage
                          name="invoice_no"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="invoice_date">Invoice Date</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="date"
                          name="invoice_date"
                          id="invoice_date"
                          placeholder="Enter Invoice No"
                          className={
                            "form-control" +
                            (formProps.errors.invoice_date &&
                            formProps.touched.invoice_date
                              ? " is-invalid"
                              : "")
                          }
                        />

                        <ErrorMessage
                          name="invoice_date"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>

                    <Col md={6}>
                      <Label for="quotation_ref_no">
                        Quotation Reference No
                      </Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="quotation_ref_no"
                          id="quotation_ref_no"
                          placeholder="Enter Quotation Reference No"
                          className={
                            "form-control" +
                            (formProps.errors.quotation_ref_no &&
                            formProps.touched.quotation_ref_no
                              ? " is-invalid"
                              : "")
                          }
                        />

                        <ErrorMessage
                          name="quotation_ref_no"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="purchase_order_no">Purchase Order No.</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="purchase_order_no"
                          id="purchase_order_no"
                          placeholder="Enter Purchase Order No."
                          className={
                            "form-control" +
                            (formProps.errors.purchase_order_no &&
                            formProps.touched.purchase_order_no
                              ? " is-invalid"
                              : "")
                          }
                        />

                        <ErrorMessage
                          name="purchase_order_no"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>

                    <Col md={6}>
                      <Label for="purchase_order_date">
                        Purchase Order Date
                      </Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="date"
                          name="purchase_order_date"
                          id="purchase_order_date"
                          placeholder="Enter Purchase Order Date"
                          className={
                            "form-control" +
                            (formProps.errors.purchase_order_date &&
                            formProps.touched.purchase_order_date
                              ? " is-invalid"
                              : "")
                          }
                        />

                        <ErrorMessage
                          name="purchase_order_date"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="inv_gstin">Invoice GSTIN</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="inv_gstin"
                          id="inv_gstin"
                          placeholder="Enter Invoice GSTIN"
                          className={
                            "form-control" +
                            (formProps.errors.inv_gstin &&
                            formProps.touched.inv_gstin
                              ? " is-invalid"
                              : "")
                          }
                        />

                        <ErrorMessage
                          name="inv_gstin"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="challan_no">Challan No</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="challan_no"
                          id="challan_no"
                          placeholder="Enter Challan No"
                          className={
                            "form-control" +
                            (formProps.errors.challan_no &&
                            formProps.touched.challan_no
                              ? " is-invalid"
                              : "")
                          }
                        />

                        <ErrorMessage
                          name="challan_no"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
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
                                              hsc_code: "",
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
                                    <th>SAC/HSC Code</th>
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
                                      var sale_rate = Number(detail.unit_price);
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
                                      detail.order_amount = tax_amount + final;
                                      return (
                                        <tr key={index} className="text-center">
                                          <td>{index + 1}</td>
                                          <td>
                                            <Field
                                              component={CustomInput}
                                              type="text"
                                              name={`details.${index}.desc`}
                                              id="desc"
                                              style={{ width: "130px" }}
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
                                              type="text"
                                              name={`details.${index}.hsc_code`}
                                              id={`details.${index}.hsc_code`}
                                              style={{ width: "80px" }}
                                            ></Field>
                                          </td>
                                          <td>
                                            <Field
                                              component={CustomInput}
                                              type="number"
                                              name={`details.${index}.qty`}
                                              id={`details.${index}.qty`}
                                              min="1"
                                              style={{ width: "60px" }}
                                            />
                                          </td>
                                          <td>
                                            <Field
                                              component={CustomInput}
                                              type="text"
                                              name={`details.${index}.units`}
                                              id={`details.${index}.units`}
                                              style={{ width: "60px" }}
                                            />
                                          </td>
                                          <td>
                                            <Field
                                              component={CustomInput}
                                              type="text"
                                              name={`details.${index}.unit_price`}
                                              id={`details.${index}.unit_price`}
                                              style={{ width: "130px" }}
                                            />
                                          </td>
                                          <td>
                                            <Field
                                              component={CustomInput}
                                              type="text"
                                              name={`details.${index}.total_amount`}
                                              id={`details.${index}.total_amount`}
                                              style={{ width: "80px" }}
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

                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td style={{ width: "200px" }}>
                                      Total Net Amount
                                    </td>
                                    <td>
                                      <i className="fa fa-rupee-sign" />{" "}
                                      {
                                        (formProps.values.net_amount =
                                          parseFloat(
                                            formProps.values.details.reduce(
                                              function (prev, cur) {
                                                return prev + cur.total_amount;
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
                                    <td></td>
                                    <td>Add : CGST @ 9.00%</td>
                                    <td>
                                      <i className="fa fa-rupee-sign" />{" "}
                                      {
                                        (formProps.values.cgst = parseFloat(
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
                                    <td></td>
                                    <td>
                                      Add : {formProps.values.gst_type} @ 9.00%
                                    </td>
                                    <td>
                                      <i className="fa fa-rupee-sign" />{" "}
                                      {
                                        (formProps.values.gst = parseFloat(
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
                                    <td></td>
                                    <td>Total Tax Amount</td>
                                    <td>
                                      <i className="fa fa-rupee-sign" />{" "}
                                      {
                                        (formProps.values.total_tax_amount =
                                          parseFloat(
                                            formProps.values.details.reduce(
                                              function (prev, cur) {
                                                return prev + cur.tax_amount;
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
                                                return prev + cur.order_amount;
                                              },
                                              0
                                            )
                                          ).toFixed(2))
                                      }
                                    </td>
                                    <td></td>
                                  </tr>
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
                <ShowInvoicePdf
                  toggle={toggle}
                  data={formProps.values}
                  customer={props.customer}
                />
              )
            }
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    invoice: state.invoice,
    cols: state.cols.cols,
    customer: state.customer.customer,
    rows: state.rows.rows,
    company: state.company.company,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCustomerGetData: (data) => dispatch(actions.customerGetData(data)),
    onRowsGetData: (data) => dispatch(actions.rowsGetData(data)),
    onColsGetData: (data) => dispatch(actions.colsGetData(data)),
    onInvoiceGetData: (data) => dispatch(actions.invoiceGetData(data)),
    onDeleteInvoice: (data, id) => dispatch(actions.deleteInvoice(data, id)),
    onPostInvoiceData: (data, user, toggle) =>
      dispatch(actions.postInvoiceData(data, user, toggle)),
    onUpdateInvoiceData: (data, user, toggle) =>
      dispatch(actions.updateInvoiceData(data, user, toggle)),
    invoiceEditGetData: (data) => dispatch(actions.invoiceEditGetData(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DuplicateInvoicePdf);

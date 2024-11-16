import React from "react";
import * as actions from "../../../redux/action";
import { connect } from "react-redux";
import { Button } from "reactstrap";

function InvoicePaid({ data, ...props }) {
  const accessToken = `${props.login?.login?.token}`;

  let data2 = {
    token: accessToken,
    id: data.id,
  };

  console.log("data in Invoice:", data);
  const isInvoicePaid = () => {
    let user = {
      customer_id: data.customer_id,
      company_id: data.company_id,
      user_id: data.user_id,
      invoice_no: data.invoice_no,
      invoice_type: data.invoice_type,
      date: data.date,
      invoice_gstin: data.invoice_gstin,
      quotation_ref: data.quotation_ref,
      purchase_order_no: data.purchase_order_no,
      purchase_order_date: data.purchase_order_date,
      invoice_challan: data.invoice_challan,
      net_amount: data.net_amount,
      cgst: data.cgst,
      gst: data.gst,
      total_tax_amount: data.total_tax_amount,
      total_order_amount: data.total_order_amount,
      is_paid: 1,
      products: data.invoice_details,
    };

    console.log("Data of InvoicePaid:", user);
    props.onUpdateInvoiceData(data2, user);

    return;
  };
  return (
    <div>
      <Button
        className="btn-warning p-1 mr-2"
        onClick={() => {
          isInvoicePaid();
        }}
      >
        <i className="fa fa-dollar-sign" aria-hidden="true"></i>
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    invoice: state.invoice,
    cols: state.cols.cols,
    customer: state.customer.customer,
    company: state.company.company,
    rows: state.rows.rows,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCompanyGetData: (data) => dispatch(actions.companyGetData(data)),
    onCustomerGetData: (data) => dispatch(actions.customerGetData(data)),
    onRowsGetData: (data) => dispatch(actions.rowsGetData(data)),
    onColsGetData: (data) => dispatch(actions.colsGetData(data)),
    onInvoiceGetData: (data) => dispatch(actions.invoiceGetData(data)),
    onDeleteInvoice: (data, id) => dispatch(actions.deleteInvoice(data, id)),
    onPostInvoiceData: (data, user, toggle, setShowPdf, setSubmitting) =>
      dispatch(
        actions.postInvoiceData(data, user, toggle, setShowPdf, setSubmitting)
      ),
    onUpdateInvoiceData: (data, user) =>
      dispatch(actions.updateInvoiceData(data, user)),
    invoiceEditGetData: (data) => dispatch(actions.invoiceEditGetData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InvoicePaid);

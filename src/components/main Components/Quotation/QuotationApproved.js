import React from "react";
import * as actions from "../../../redux/action";
import { connect } from "react-redux";
import { Button } from "reactstrap";

function QuotationApproved({ data, ...props }) {
  const accessToken = `${props.login?.login?.token}`;

  let data2 = {
    token: accessToken,
    id: data.id,
  };

  const quotationApproved = () => {
    let user = {
      customer_id: data.customer_id,
      company_id: data.company_id,
      user_id: data.user_id,
      quotation_no: data.quotation_no,
      quotation_type: data.quotation_type,
      quotation_date: data.quotation_date,
      gstin: data.gstin,
      quotation_valid_till: data.quotation_valid_till,
      net_amount: data.net_amount,
      cgst: data.cgst,
      gst: data.gst,
      total_tax_amount: data.total_tax_amount,
      total_order_amount: data.total_order_amount,
      is_approved: 1,
      products: data.quotation_details,
    };

    console.log("Data of InvoicePaid:", user);
    props.onUpdateQuotationData(data2, user);

    return;
  };
  return (
    <div>
      <Button
        className="p-1 mr-2"
        onClick={() => {
          quotationApproved();
        }}
      >
        <i className="fa fa-check-square" aria-hidden="true"></i>
      </Button>
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(QuotationApproved);

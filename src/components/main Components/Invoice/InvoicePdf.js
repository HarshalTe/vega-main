/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import {
  ArttributeDetail,
  ArttributeP,
  ClientDetail,
  ClientH6,
  InvoiceAddress,
  InvoiceDetail,
  InvoiceH5,
  InvoiceH6,
  InvoicePrint,
  InvoicePTag,
  ISpan,
  PaymentDetail,
  Table,
  TBody,
  TD,
  TH,
  THead,
  TR,
  ValueDetail,
  ValueP,
  VegaDetail,
  VegaP,
} from "./InvoiceStyledComponent";
import logo from "../../../assets/images/logo2.png";
import "../CaseMaster/CoolRoom/FinalReport/FinalReport.css";
import printJS from "print-js";
import { connect } from "react-redux";
import { DateFormat } from "../../DateFormat/DateFormat";

var numberToWords = require("number-to-words");

function InvoicePdf({ data, customer, ...props }) {
  const [modal, setModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState([]);
  const [company, setCompany] = useState([]);

  const toggle = () => {
    setModal(!modal);
  };
  useEffect(() => {
    customer?.map((cust) => {
      if (data.customer_id == cust.id) {
        setNewCustomer(cust);
      }
    });
    props.company?.map((cust) => {
      if (data.company_id == cust.id) {
        setCompany(cust);
      }
    });
  }, []);
  const printMutliple = () => {
    console.log("print");
    printJS({
      printable: "InvoicePrint",
      type: "html",
      css: "../CaseMaster/CoolRoom/FinalReport/FinalReport.css",
      scanStyles: true,
      targetStyles: "[*]",
      font_size: "10pt",
      maxWidth: 1080,
      // base64: true,
      honorMarginPadding: false,
      // style: "@page { size: Letter landscape; options: true;  }",
      style: "@page {  options: footers;  }",
    });
  };

  return (
    <div className="invoice">
      <Button
        className="btn-info p-1 mr-2"
        onClick={() => {
          toggle();
        }}
      >
        <i className="fa fa-eye" aria-hidden="true"></i>
      </Button>
      <Modal
        className="modal-info modal-lg"
        isOpen={modal}
        toggle={toggle}
        backdrop="static"
      >
        <ModalHeader toggle={toggle}>View Invoice</ModalHeader>
        <ModalBody>
          <InvoicePrint id="InvoicePrint" className="test">
            <div className="d-flex justify-content-between p-1">
              <div>
                <div className="d-flex flex-column">
                  <InvoiceH6>{company?.name}</InvoiceH6>

                  {company.name ==
                    "VEGA CALIBRATION AND VALIDATION SERVICES LLP" && (
                    <InvoicePTag className="ml-5 pl-5">
                      (An ISO 9001:2015 Certified Company)
                    </InvoicePTag>
                  )}
                </div>
                <div>
                  <InvoiceAddress className="space-line">
                    {company?.address}
                  </InvoiceAddress>
                  {/* <InvoicePTag>Kachpada, Ramchandra Lane Extn.,</InvoicePTag>
              <InvoicePTag>Malad West. Mumbai-400064</InvoicePTag> */}
                  <InvoicePTag>Phone No : {company.phone}</InvoicePTag>
                  <InvoicePTag>
                    Email ID : support@vegacalibrations.com
                  </InvoicePTag>
                  <InvoicePTag>Website : www.vegacalibrations.com</InvoicePTag>
                </div>
              </div>
              <div className="d-flex flex-column justify-content-center">
                <InvoiceH5 className="text-center text-uppercase">
                  {data.invoice_type}
                </InvoiceH5>
                <div>
                  <img src={logo} alt="logo" height="100px" width="220px" />
                </div>
              </div>
            </div>
            <div className="d-flex w-100">
              {customer.map((cust) => {
                if (data.customer_id == cust.id)
                  return (
                    <ClientDetail key={cust.id}>
                      <ClientH6 className="client-h6">CLIENT DETAILS</ClientH6>
                      <div className="p-1">
                        <ISpan>
                          <ArttributeP>Kind Attn.</ArttributeP>
                          <ValueP>{cust.name}</ValueP>
                        </ISpan>
                        <ISpan>
                          <ArttributeP>Company Name</ArttributeP>
                          <ValueP>{cust?.company?.name}</ValueP>
                        </ISpan>
                        <ISpan>
                          <ArttributeP>Company Address</ArttributeP>
                          <ValueP>{cust?.company?.address}</ValueP>
                        </ISpan>
                        <ISpan>
                          <ArttributeP>Contact</ArttributeP>
                          <ValueP>{cust?.company?.phone}</ValueP>
                        </ISpan>
                        <ISpan>
                          <ArttributeP>Email ID</ArttributeP>
                          <ValueP>{cust.email}</ValueP>
                        </ISpan>
                      </div>
                    </ClientDetail>
                  );
              })}

              <InvoiceDetail>
                <ClientH6 className="client-h6">INVOICE DETAILS</ClientH6>
                <div className="p-1">
                  <ISpan>
                    <ArttributeDetail>Invoice No.</ArttributeDetail>
                    <ValueDetail>{data.invoice_no}</ValueDetail>
                  </ISpan>
                  <ISpan>
                    <ArttributeDetail>Invoice Date</ArttributeDetail>
                    <ValueDetail>
                      {" "}
                      <DateFormat data={data.date} />
                    </ValueDetail>
                  </ISpan>
                  <ISpan>
                    <ArttributeDetail>Quotation Reference No</ArttributeDetail>
                    <ValueDetail>{data.quotation_ref}</ValueDetail>
                  </ISpan>
                  <ISpan>
                    <ArttributeDetail>Purchase Order No.</ArttributeDetail>
                    <ValueDetail>{data.purchase_order_no}</ValueDetail>
                  </ISpan>
                  <ISpan>
                    <ArttributeDetail>Purchase Order Date</ArttributeDetail>
                    <ValueDetail>
                      <DateFormat data={data.purchase_order_date} />
                    </ValueDetail>
                  </ISpan>
                  <ISpan>
                    <ArttributeDetail>GSTIN</ArttributeDetail>
                    <ValueDetail>{data.invoice_gstin}</ValueDetail>
                  </ISpan>
                  <ISpan>
                    <ArttributeDetail>Challan No</ArttributeDetail>
                    <ValueDetail>{data.invoice_challan}</ValueDetail>
                  </ISpan>
                </div>
              </InvoiceDetail>
            </div>
            <Table className="table table-sm">
              <THead className="client-h6">
                <TR>
                  <TH>Sr. No</TH>
                  <TH>Description Of Items</TH>
                  <TH>Model/Specifications</TH>
                  <TH>SAC/HSC Code</TH>
                  <TH>Qty</TH>
                  <TH>Units</TH>
                  <TH>Unit Price (INR)</TH>
                  <TH>Total Amount ( INR)</TH>
                </TR>
              </THead>
              <TBody>
                {data.invoice_details?.map((detail, index) => {
                  return (
                    <TR key={index}>
                      <TD>{index + 1}</TD>
                      <TD>{detail.desc}</TD>
                      <TD>{detail.specs}</TD>
                      <TD>{detail.hsc_code}</TD>
                      <TD>{detail.qty}</TD>
                      <TD>{detail.units}</TD>
                      <TD>{detail.unit_price}</TD>
                      <TD width="100" className="text-right">
                        {parseFloat(detail.total_amount).toFixed(2)}
                      </TD>
                    </TR>
                  );
                })}
              </TBody>
            </Table>
            <div className="d-flex">
              <VegaDetail>
                <VegaP className="vega-p">VEGA DETAILS</VegaP>
                <div className="p-1">
                  <ISpan>
                    <ArttributeDetail>PAN No.</ArttributeDetail>
                    <ValueDetail>{company.pan_no}</ValueDetail>
                  </ISpan>
                  <ISpan>
                    <ArttributeDetail>GSTIN</ArttributeDetail>
                    <ValueDetail>{company.gstin}</ValueDetail>
                  </ISpan>
                  <ISpan>
                    <ArttributeDetail>BANK</ArttributeDetail>
                    <ValueDetail>{company.bank}</ValueDetail>
                  </ISpan>
                  <ISpan>
                    <ArttributeDetail>BRANCH</ArttributeDetail>
                    <ValueDetail>{company.branch}</ValueDetail>
                  </ISpan>
                  <ISpan>
                    <ArttributeDetail>BENEFICIARY NAME</ArttributeDetail>
                    <ValueDetail>{company.beneficiary}</ValueDetail>
                  </ISpan>
                  <ISpan>
                    <ArttributeDetail>CURRENT ACC. NO</ArttributeDetail>
                    <ValueDetail>{company.current_ac}</ValueDetail>
                  </ISpan>
                  <ISpan>
                    <ArttributeDetail>RTGS/NEFT IFSC Code</ArttributeDetail>
                    <ValueDetail>{company.ifsc_code}</ValueDetail>
                  </ISpan>
                </div>
              </VegaDetail>
              <PaymentDetail>
                <div className="">
                  <Table className="table table-sm">
                    <THead className="vega-p">
                      <TR>
                        <TH className="">TOTAL NET AMOUNT (INR)</TH>
                        <TH className="text-right p-1" width="100">
                          {" "}
                          <i className="fa fa-rupee-sign" /> {data?.net_amount}
                          {/* {parseFloat(
                            data.details?.reduce(function (prev, cur) {
                              return prev + cur.total_amount;
                            }, 0)
                          ).toFixed(2)} */}
                        </TH>
                      </TR>
                    </THead>
                    <TBody>
                      <tr className="text-right">
                        <td className="test-r font-weight-bold">
                          <span>Add : CGST @</span>
                          <span className="ml-3 mr-3">9.00%</span>
                        </td>
                        <td className="font-weight-bold">
                          <i className="fa fa-rupee-sign" /> {data?.cgst}
                          {/* {parseFloat(
                            data.details?.reduce(function (prev, cur) {
                              return prev + cur.cgst;
                            }, 0)
                          ).toFixed(2)} */}
                        </td>
                      </tr>
                      <tr className="text-right border-0">
                        <td className="test-r font-weight-bold">
                          <span>Add : {data?.gst_type} @</span>
                          <span className="ml-3 mr-3">9.00%</span>
                        </td>
                        <td className="font-weight-bold">
                          <i className="fa fa-rupee-sign" /> {data?.gst}
                          {/* {parseFloat(
                            data.details?.reduce(function (prev, cur) {
                              return prev + cur.sgst;
                            }, 0)
                          ).toFixed(2)} */}
                        </td>
                      </tr>
                      <TR className="light-blue">
                        <TH style={{ border: "1px solid black" }}>
                          TOTAL TAX AMOUNT (INR)
                        </TH>
                        <TH
                          className="text-right"
                          style={{ border: "1px solid black" }}
                        >
                          <i className="fa fa-rupee-sign" />{" "}
                          {data?.total_tax_amount}
                          {/* {parseFloat(
                            data.details?.reduce(function (prev, cur) {
                              return prev + cur.tax_amount;
                            }, 0)
                          ).toFixed(2)} */}
                        </TH>
                      </TR>
                      <TR>
                        <TH className="p-4">TOTAL ORDER AMOUNT (INR)</TH>
                        <TH className="text-right pt-4 pb-4 pl-2 ">
                          <i className="fa fa-rupee-sign" />{" "}
                          {data?.total_order_amount}
                          {/* {parseFloat(
                            data.details?.reduce(function (prev, cur) {
                              return prev + cur.order_amount;
                            }, 0)
                          ).toFixed(2)} */}
                        </TH>
                      </TR>
                    </TBody>
                  </Table>
                </div>
              </PaymentDetail>
            </div>

            <div className="test f-12 font-weight-bold p-1 pl-2">
              <span>Amount Chargeable (In Words) :</span>
              <span className="ml-3">
                {" "}
                {numberToWords.toWords(data.total_order_amount)} Only
              </span>
            </div>

            <div className="test p-1 ">
              <div
                style={{
                  color: "#4A469B",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                {company.name}
              </div>
              <div> Signature</div>
              <span className="font-weight-bold f-12">
                Authorised Signatory
              </span>
            </div>

            <div className="f-12 font-weight-bold text-center test vega-gray">
              THANK-YOU FOR YOUR BUSINESS WITH US.
            </div>
            <div className="f-12 font-weight-bold test text-center">
              SUBJECT TO MUMBAI JURISDICTION
            </div>
            <div className="f-12 font-weight-bold test text-center">
              This is a Computer Generated Invoice
            </div>
          </InvoicePrint>
        </ModalBody>
        <ModalFooter>
          <Button className="btn-warning" onClick={toggle}>
            Cancel
          </Button>
          <Button className="btn-danger" onClick={printMutliple}>
            Print
          </Button>
        </ModalFooter>
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
export default connect(mapStateToProps)(InvoicePdf);

import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import {
  ArttributeP,
  ClientDetail,
  ClientH6,
  QuotationDetail,
  QuotationH5,
  QuotationH6,
  QuotationPrint,
  QuotationPTag,
  ISpan,
  PaymentDetail,
  Table,
  TBody,
  TD,
  TH,
  THead,
  TR,
  ValueP,
  VegaDetail,
  VegaP,
  QuotationAddress,
} from "./QuotationStyledComponent";
import logo from "../../../assets/images/logo2.png";
import "../CaseMaster/CoolRoom/FinalReport/FinalReport.css";
import printJS from "print-js";
import { connect } from "react-redux";
import "../CaseMaster/CoolRoom/FinalReport/FinalReport.css";
import { DateFormat } from "../../DateFormat/DateFormat";
var numberToWords = require("number-to-words");

function ShowQuotationPdf({ toggle, data, customer, ...props }) {
  const [newCustomer, setNewCustomer] = useState([]);
  const [company, setCompany] = useState([]);

  useEffect(() => {
    customer.map((cust) => {
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

  // console.log(`newCustomer`, newCustomer);
  // console.log(`company`, company);
  // console.log(`data`, data);
  const printMutliple = () => {
    // console.log("print");
    printJS({
      printable: "QuotationPrint",
      type: "html",
      css: "../CaseMaster/CoolRoom/FinalReport/FinalReport.css",
      scanStyles: true,
      targetStyles: "[*]",
      font_size: "8pt",
      maxWidth: 1080,
      // base64: true,
      honorMarginPadding: false,
      // style: "@page { size: Letter landscape; }",
    });
  };

  return (
    <div className="quotation">
      {/* <Button onClick={toggle}>View Profoma Quotation</Button> */}
      {/* <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle} backdrop="static">
        <ModalHeader toggle={toggle}>View Quotation</ModalHeader>
        <ModalBody> */}
      <QuotationPrint id="QuotationPrint" className="test">
        <div className="d-flex justify-content-between p-1">
          <div>
            <div className="text-center">
              <QuotationH6>{company?.name}</QuotationH6>
              {company.name ===
                "VEGA CALIBRATION AND VALIDATION SERVICES LLP" && (
                <QuotationPTag>
                  (An ISO 9001:2015 Certified Company)
                </QuotationPTag>
              )}
            </div>
            <div>
              <QuotationAddress className="space-line">
                {company?.address}
              </QuotationAddress>

              <QuotationPTag>Phone No : {company?.phone}</QuotationPTag>
              <QuotationPTag>
                Email ID : support@vegacalibrations.com
              </QuotationPTag>
              <QuotationPTag>Website : www.vegacalibrations.com</QuotationPTag>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center">
            <QuotationH5 className="text-center">ESTIMATE</QuotationH5>
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
                      <ArttributeP>Phone</ArttributeP>
                      <ValueP>{cust?.company?.phone}</ValueP>
                    </ISpan>
                    <ISpan>
                      <ArttributeP>Client Email Id</ArttributeP>
                      <ValueP>{cust.email}</ValueP>
                    </ISpan>
                  </div>
                </ClientDetail>
              );
          })}

          <QuotationDetail>
            <ClientH6 className="client-h6">VEGA QUOTATION DETAILS</ClientH6>
            <div className="p-1">
              <ISpan>
                <ArttributeP>Quote No.</ArttributeP>
                <ValueP>{data.quotation_no}</ValueP>
              </ISpan>
              <ISpan>
                <ArttributeP>Quote Date</ArttributeP>
                <ValueP>
                  <DateFormat data={data.quotation_date} />
                </ValueP>
              </ISpan>
              <ISpan>
                <ArttributeP>Quote Valid Till</ArttributeP>
                <ValueP>{data.quotation_valid_till}</ValueP>
              </ISpan>

              <ISpan>
                <ArttributeP>GSTIN</ArttributeP>
                <ValueP>{data.gstin}</ValueP>
              </ISpan>
            </div>
          </QuotationDetail>
        </div>
        <Table className="table table-sm">
          <THead className="client-h6">
            <TR>
              <TH>Sr. No</TH>
              <TH>Description Of Items</TH>
              <TH>Model/Specifications</TH>
              <TH>Qty</TH>
              <TH>Units</TH>
              <TH>Unit Price (INR)</TH>
              <TH>Total Amount ( INR)</TH>
            </TR>
          </THead>
          <TBody>
            {data.details?.map((detail, index) => {
              return (
                <TR key={index}>
                  <TD>{index + 1}</TD>
                  <TD>{detail.desc}</TD>
                  <TD>{detail.specs}</TD>
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
        {data?.type_of_quotation === "With Calculation" && (
          <>
            <div className="d-flex">
              <VegaDetail>
                <div
                  style={{
                    color: "#4A469B",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  {company?.name}
                </div>
                <div> Signature</div>
                <div className="font-weight-bold f-12">
                  Authorised Signatory
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
                          <i className="fa fa-rupee-sign" />{" "}
                          {parseFloat(
                            data.details?.reduce(function (prev, cur) {
                              return prev + cur.total_amount;
                            }, 0)
                          ).toFixed(2)}
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
                          <i className="fa fa-rupee-sign" />{" "}
                          {parseFloat(
                            data.details?.reduce(function (prev, cur) {
                              return prev + cur.cgst;
                            }, 0)
                          ).toFixed(2)}
                        </td>
                      </tr>
                      <tr className="text-right border-0">
                        <td className="test-r font-weight-bold">
                          <span>Add : {data.gst_type} @</span>
                          <span className="ml-3 mr-3">9.00%</span>
                        </td>
                        <td className="font-weight-bold">
                          <i className="fa fa-rupee-sign" />{" "}
                          {parseFloat(
                            data.details?.reduce(function (prev, cur) {
                              return prev + cur.sgst;
                            }, 0)
                          ).toFixed(2)}
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
                          {parseFloat(
                            data.details?.reduce(function (prev, cur) {
                              return prev + cur.tax_amount;
                            }, 0)
                          ).toFixed(2)}
                        </TH>
                      </TR>
                      <TR>
                        <TH className="p-1">TOTAL ORDER AMOUNT (INR)</TH>
                        <TH className="text-right p-1">
                          <i className="fa fa-rupee-sign" />{" "}
                          {parseFloat(
                            data.details?.reduce(function (prev, cur) {
                              return prev + cur.order_amount;
                            }, 0)
                          ).toFixed(2)}
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
                {numberToWords.toWords(data.total_order_amount)} Only
              </span>{" "}
            </div>
          </>
        )}

        {data?.type_of_quotation === "Without Calculation" && (
          <div className="d-flex flex-column justify-content-center align-items-center test">
            <div
              style={{
                color: "#4A469B",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              {company?.name}
            </div>
            <div> Signature</div>
            <div className="font-weight-bold f-12">Authorised Signatory</div>
          </div>
        )}

        <div>
          <p className="f-12 font-weight-bold test text-center vega-gray p-0 m-0">
            TERMS AND CONDITIONS
          </p>

          <p className="test p-1 m-0 f-10">
            1. Calibration will be performed after confirmation of PO. Our
            Quotation Reference No. must appear on your Commercial Work Order
            (PO) or Delivery Challan
          </p>
          <p className="test p-1 m-0 f-10">
            2. The charges quoted are net. Presently GST 18% is applicable extra
            on above charges. However taxes as applicable at the time of
            providing services shall be payable by yourselves.
          </p>
          <p className="test p-1 m-0 f-10">
            3. We shall submit to you our calibration and validation reports
            giving NABL traceability certificate reference
          </p>
        </div>
        <div>
          <p className="f-12 font-weight-bold test text-center vega-gray p-0 m-0">
            PAYMENT TERMS
          </p>

          <p className="test p-1 m-0 f-10">
            1. 100% Payment to be made advance against Proforma Invoice.
          </p>
          <p className="test p-1 m-0 f-10">
            2. Reports will be delivered on receipt of payment
          </p>
        </div>
        <div className="f-12 font-weight-bold test text-center vega-gray p-0 m-0">
          LOOKING FORWARD FOR YOUR BUSINESS WITH US
        </div>
      </QuotationPrint>
      {/* </ModalBody> */}
      <ModalFooter>
        <Button className="btn-warning" onClick={toggle}>
          Cancel
        </Button>
        <Button className="btn-danger" onClick={printMutliple}>
          Print
        </Button>
      </ModalFooter>
      {/* </Modal> */}
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
export default connect(mapStateToProps)(ShowQuotationPdf);

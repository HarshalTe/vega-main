/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../../../redux/action";
import calibrationImg from "../../../../assets/vaga-images/vega calibration.png";
import "./FinalReport/FinalReport.css";
import Loader2 from "../../../loader/Loader2";
// import VegasGraph from "../../vegasGraph/VegasGraph";
// import FinalReportVegaGraph2 from "../../vegasGraph/FinalReportVegaGraph2";
import printJS from "print-js";
import { Button } from "reactstrap";
import dateFormat from "dateformat";
// import FinalReportVegaGraph from "../../vegasGraph/FinalReportVegaGraph";
import { DateFormat } from "../../../DateFormat/DateFormat";
import CircularLoader from "../../../loader/CircularLoader";
import { imageUrl } from "../../../../shared/imageUrl";
import mkt from "../../../../assets/mkt/newForImg.jpg";
import { DataTime } from "../../../DateFormat/DataTime";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { display } from "@mui/system";

const font14Bold = { fontSize: "20px", fontWeight: "600" };

function FinalReport2(props) {
  const accessToken = `${props.login?.login?.token}`;
  const param = useParams();

  let data = {
    token: accessToken,
    id: param?.id,
    caseId: param?.id,
  };
  React.useEffect(() => {}, []);

  let data2 = {
    token: accessToken,
    id: param?.id,
  };

  React.useEffect(() => {
    props.onSheetGetData(data2);
  }, []);
  const AcData = props.ac?.ac;

  const [blankpage, setBlankpage] = useState(false);
  // const [modal, setModal] = useState(false);

  // const toggle = () => {
  //   setModal(!modal);
  // };

  const addBlankPage = () => {
    // const user = new FormData();

    // user.append("blank_page", blankpage);
    // props.onUpdateCasesData(data, user, toggle);
    setBlankpage(!blankpage);
  };

  const rows = props.calibration?.isLoading
    ? []
    : props.calibration?.calibration?.length > 0
    ? props.calibration?.calibration.find((row, i) => {
        return row?.id == param?.id;
      })
    : [];
  const uniqueCalibrationPoints = [
    ...new Set(rows?.calibration_table?.map((record) => record?.type)),
  ];
  const printMutliple = () => {
    printJS({
      printable: "CoolRoomPrint",
      type: "html",
      css: "./FinalReport.css",
      scanStyles: true,
      targetStyles: "[*]",
      font_size: "10pt",
      maxWidth: 1080,

      base64: true,
      honorMarginPadding: false,
      style: "@page { size: A4 portrait;} ",
    });
  };
  function formatDate(dateString) {
    const parts = dateString?.split("-");
    if (parts) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    } 
  }
  return (
    <div className="position-relative" id="content">
      <Button
        color="warning w-20  m-3 float-right"
        onClick={printMutliple}
        block
        className="print-button"
      >
        <i className="fa fa-eye mr-2" />
        Print Certificate
      </Button>

      <Button
        color={blankpage ? "danger" : "success"}
        onClick={addBlankPage}
        block
        className=" w-20  m-3 float-left"
      >
        {blankpage ? (
          <i className="fa fa-trash-alt mr-2" />
        ) : (
          <i className="fa fa-plus-circle mr-2" />
        )}
        Blank Page
      </Button>
      <Button
        className="uparrow-button"
        color="info"
        onClick={(e) => window.scrollTo({ top: 0 })}
      >
        <i className="fa fa-arrow-alt-circle-up" />
      </Button>
      <div
        id="CoolRoomPrint"
        className="text-center  report-print d-flex flex-column justify-content-center w-100 p-2 mt-2 f-8"
      >
        {/* <div id="CoolRoomPrint"></div> */}
        {props.calibration?.isLoading ? (
          <Loader2 />
        ) : (
          props.calibration?.calibration
            ?.filter((c) => c.id == param.id)
            .map((user) => {
              console.log("user112", user);

              // console.log(Description, "QQQ", props, DescriptionF, DescriptionF2, DescriptionF3, DescriptionF4)
              return (
                <div id="aakash" key={user.id}>
                  <div className="">
                    {/* cccc */}
                    <div className="first-page mb-5 pdf-h-w-2" style={{"border": "1px solid"}}>
                      <div style={{ border: "1px solid black", width: "100%" }}>
                        <img
                          style={{ width: "inherit" }}
                          src={calibrationImg}
                        />
                      </div>
                      <div
                        style={{
                          border: "1px solid black",
                          width: "100%",
                          "font-weight": "700",
                          "text-decoration": "underline",
                        }}
                      >
                        CALIBRATION CERTIFICATE
                      </div>
                      <div
                        style={{ display: "flex", "justify-content": "unset" }}
                      >
                        <div  style={{ textAlign: "left", border: "1px solid","width":"50%"}}>
                          <div className="ml-1" style={{ "font-weight": "700" }}>
                            Name & Address Of Customer
                          </div>
                          <div className="ml-1" style={{ "font-weight": "700" }}>
                            {rows?.name}
                          </div>
                          <div className="ml-1"style={{ width: "50%" }}>
                          {rows?.address}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            "justify-content": "unset",
                            border: "1px solid",
                            width: "50%",
                          }}
                        >
                          <div className="ml-1"
                            style={{
                              textAlign: "left",
                              "font-weight": "700",
                              "margin-right": "30px",
                            }}
                          >
                            Certificate No.
                            <br />
                            Service Request No.
                            <br />
                            Calibration Date
                            <br />
                            Next Due Date
                            <br />
                            Issue Date
                            <br />
                            ULR No.
                          </div>
                          <div style={{ textAlign: "left" }}>
                          :{rows?.cert_no}
                            <br />
                          :{rows?.service_no}
                            <br />
                            :{formatDate(rows?.calibration_date)}
                            <br />
                            :{formatDate(rows?.next_due_date)}
                            <br />
                            :{formatDate(rows?.issue_date)}
                            <br />
                            :{rows?.basis_calibration}
                          </div>
                        </div>
                      </div>
                      <div  style={{ border: "1px solid black" }}>
                        <div>
                          <div className="ml-1"
                            style={{
                              textAlign: "left",
                              "margin-right": "30px",
                            }}
                          >
                            <b>Environmental Condition :</b>  &nbsp; &nbsp;Temperature
                            :{rows?.temperature} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;Humidity :{rows?.humidity}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{ display: "flex", "justify-content": "unset" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            "justify-content": "unset",
                            border: "1px solid",
                            width: "50%",
                          }}
                        >
                          <div className="ml-1"
                            style={{
                              textAlign: "left",
                              "font-weight": "700",
                              "margin-right": "30px",
                            }}
                          >
                            Location Of Calibration
                            <br />
                            Condition Of Item
                            <br />
                           
                            Date Of Reciept of Item 
                          </div>
                          <div style={{ textAlign: "left" }}>
                          :{rows?.calibration_location}
                            <br />
                            :{rows?.item_condition}
                            <br />
                            :{formatDate(rows?.item_date_receipt)}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            "justify-content": "unset",
                            border: "1px solid",
                            width: "50%",
                          }}
                        >
                          <div className="ml-1"
                            style={{
                              textAlign: "left",
                              "font-weight": "700",
                              "margin-right": "30px",
                            }}
                          >
                            Discipline
                            <br />
                            Calibration Procedure 
                            <br />
                            Reference Used 
                          </div>
                          <div style={{ textAlign: "left" }}>
                          :{rows?.discipline}
                            <br />
                            :{rows?.calibration_procedure}
                            <br />
                            :{rows?.reference_used}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          border: "1px solid black",
                          width: "100%",
                          "font-weight": "700",
                        }}
                      >
                        Details Of Unit Under Calibration (UUC)
                      </div>
                      <div
                        style={{
                          display: "flex",
                          "justify-content": "unset",
                          border: "1px solid",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            "justify-content": "unset",
                            width: "50%",
                          }}
                        >
                          <div className="ml-1"
                            style={{
                              textAlign: "left",
                              "font-weight": "700",
                              "margin-right": "30px",
                            }}
                          >
                            Instrument Name
                            <br />
                            Instrument ID 
                            <br />
                           
                            Make
                            <br />
                            Model
                          </div>
                          <div style={{ textAlign: "left" }}>
                          :{rows?.instrument_name}
                            <br />
                            :{rows?.instrument_id}
                            <br />
                            :{rows?.make}
                            <br />
                            :{rows?.model}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            "justify-content": "unset",
                            width: "50%",
                          }}
                        >
                          <div className="ml-1"
                            style={{
                              textAlign: "left",
                              "font-weight": "700",
                              "margin-right": "30px",
                            }}
                          >
                            Serial No.
                            <br />
                            Range
                            <br />
                            Least Count
                            <br />
                            Accuracy
                          </div>
                          <div style={{ textAlign: "left" }}>
                          :{rows?.serial_no}
                            <br />
                            :{rows?.range}
                            <br />
                            :{rows?.least_count}
                            <br />
                            :{rows?.accuracy}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          border: "1px solid black",
                          width: "100%",
                          "font-weight": "700",
                        }}
                      >
                        Reference Standard Used For Calibration
                      </div>
                      <div
                        style={{
                          display: "flex",
                          "justify-content": "unset",
                          border: "1px solid",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            "justify-content": "unset",
                          }}
                        >
                          <div className="ml-1"
                            style={{
                              textAlign: "left",
                              "font-weight": "700",
                              "margin-right": "30px",
                            }}
                          >
                            Standard Used
                            <br />
                            Make / Model
                            <br />
                            ID No.
                            <br />
                            Certificate No
                            <br />
                            Calibrated By
                            <br />
                            Valid Upto
                          </div>
                          <div style={{ textAlign: "left" }}>
                          :{rows?.standard_used}
                            <br />
                            :{rows?.make_table}
                            <br />
                            :{rows?.id_no}
                            <br />
                            :{rows?.certificate_table_no}
                            <br />
                            :{rows?.calibrated_by}
                            <br />
                            :{formatDate(rows?.valid_upto)}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          border: "1px solid black",
                          width: "100%",
                          "text-align": "left",
                        }}
                      >
                         &nbsp;The standard used are traceable to National /
                        International Standard through chain of calibration
                      </div>

                      <div
                        style={{
                          border: "1px solid black",
                          width: "100%",
                          "font-weight": "700",
                        }}
                      >
                        Calibration Results
                      </div>
                      <div>
                        <table style={{ width: "100%" }} border="2">
                          <tbody>
                            <tr style={{ "font-weight": "700" }}>
                              <td>Sr.No </td>
                              <td>
                                Range <br />
                                (Kg/cm^2)
                              </td>
                              <td>
                                Set Point
                                <br />
                                (Kg/cm^2)
                              </td>
                              <td>
                                Nominal Value on UUC <br /> (Kg/cm^2) <br />{" "}
                                (pe)
                              </td>
                              <td>M1 ↑</td>
                              <td>M2 ↑</td>
                              <td>M3 ↑</td>
                              <td>M4 ↑</td>
                              <td>
                                Mean Value (Kg/cm^2) (Miw)
                                <br />
                                ((M1+M3)/2 + (M2+M4)/2)/2
                              </td>
                              <td>
                                Deviation (Kg/cm^2)
                                <br />
                                (Miw-pe)
                              </td>
                              <td>
                                Hysterisis (Kg/cm^2) (h max)
                                <br />
                                (M2-M1) x (M4-M3)
                              </td>
                              <td>
                                Repeatabili ty (Kg/cm^2) (b max)
                                <br />
                                (M3-M1) x (M4-M2)
                              </td>
                              <td>
                                Expanded Uncertainty
                                <br />
                                (-+) (Kg/cm^2)
                              </td>
                            </tr>
                            {rows?.calibration_table?.map((row, i) => {
                              return (
                                <tr key={i}>
                                  <td>{i + 1}</td>
                                  <td>{row?.range}</td>
                                  <td>{row?.set_point}</td>
                                  <td>{row?.value_uuc}</td>
                                  <td>{row?.m1}</td>
                                  <td>{row?.m2}</td>
                                  <td>{row?.m3}</td>
                                  <td>{row?.m4}</td>
                                  <td>
                                    {((row?.m1 + row?.m3) / 2 +
                                      (row?.m2 + row?.m4) / 2) /
                                      2}
                                  </td>
                                  <td>
                                    {((row?.m1 + row?.m3) / 2 +
                                      (row?.m2 + row?.m4) / 2) /
                                      2 -
                                      row?.value_uuc}
                                  </td>
                                  <td>
                                    {(row?.m2 - row?.m1) * (row?.m4 - row?.m3)}
                                  </td>
                                  <td>
                                    {(row?.m3 - row?.m1) * (row?.m4 - row?.m2)}
                                  </td>
                                  <td>{row?.expanded_uncertainty}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      <div style={{"font-weight": "700","text-align": "left"}}>
                        &nbsp;Remarks :
                        </div>
                        <div style={{"text-align": "left"}}>
                          <ul>
                            <li>The reported expanded uncertainty in measurement is stated as the combined standard uncertainty in meaurement multiplied by the coverage factor k=2, which for
a normal distribution corresponds to a coverage probability of approximately 95%.</li>
                            <li>The Standard Readings mentioned are the average of 5 readings.</li>
                            <li>The Readings taken without any adjustments.</li>
                          </ul>
                        </div>
                        <div style={{"font-weight": "700","text-align": "left"}}>
                        &nbsp;Note :
                        </div>
                        <div style={{"text-align": "left"}}>
                          <ul>
                            <li>This certificate refers only to the particular item(s), submitted for calibration.</li>
                            <li>The calibration results reported in the certificate are valid at the time of and under the stated conditions of measurement.</li>
                            <li>Calibration points were selected as per customer specifications.</li>
                            <li>The results are reviewed and authorised by the authorized signatory.</li>
                            <li>The certificate should not be reproduced expect in full without the prior permission from the Technical Manager, Vega Calibration And Validation Services LLP., Mumbai - 400064.</li>
                          </ul>
                        </div>

                        <div
                        style={{
                          border: "2px solid black",
                          "font-weight": "700",
                          "height": "100px","margin": "0 27px",
                          "display": "flex","align-items": "center","justifyContent":"space-between"
                        }}
                      >
                        <div className="ml-5" style={{"height": "100%","display": "flex","flex-direction": "column","justify-content": "center"}}>
                          <div>Prepared By :{rows?.equipment}</div>
                          <span className="">
Reason : Authorised Signatory <br/>
Date/Time : { rows?.certificate_valid_upto? <DataTime data={rows?.certificate_valid_upto} />: "N/A"} <br/>
                                </span>
                          <div>Calibration Engineer</div>
                        </div>
                        <div className="mr-5" style={{"height": "100%","display": "flex","flex-direction": "column","justify-content": "center"}}>
                          <div>Authorised By :{rows?.env_condition}</div>
                          <span className="">
Reason : Authorised Signatory <br/>
Date/Time : { rows?.calibration_frequency? <DataTime data={rows?.calibration_frequency} />: "N/A"} <br/>
                                </span>
                          <div>Technical Manager</div>
                        </div>
                      </div>

                        <div
                        style={{
                          width: "100%",
                          "font-weight": "700",
                        }}
                      >
                        ** End Of Calibration Report **
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    cases: state.cases,
    editcase: state.cases.editcase,
    calibration: state.calibration,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCasesDataPageDetail: (data) =>
      dispatch(actions.getCasesDataPageDetail(data)),
    postCasesDataPageDetail: (data, user) =>
      dispatch(actions.postCasesDataPageDetail(data, user)),
    updatePageDetail: (data, user) =>
      dispatch(actions.updatePageDetail(data, user)),
    onUpdateCasesData: (data, user, toggle) =>
      dispatch(actions.updateCasesData(data, user, toggle)),
    onSheetGetData: (data2) => dispatch(actions.sheetGetData(data2)),
    onGetCasesDataAc: (data) => dispatch(actions.getCasesDataAc(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FinalReport2);

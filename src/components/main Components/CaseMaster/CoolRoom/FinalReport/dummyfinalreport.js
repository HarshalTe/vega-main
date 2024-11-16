import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../../../../redux/action";
import RHeader from "./RHeader";
import "./FinalReport.css";
import MainHeader from "./MainHeader";
import Loader2 from "../../../../loader/Loader2";
import VegasGraph from "../../vegasGraph/VegasGraph";
import printJS from "print-js";
import { Button } from "reactstrap";
import dateFormat from "dateformat";
import { imageUrl } from "./../../../../../shared/imageUrl";
function FinalReport(props) {
  const accessToken = `${props.login?.login?.token}`;
  const param = useParams();

  let data = {
    token: accessToken,
    id: param?.id,
  };

  const [blankpage, setBlankpage] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const addBlankPage = () => {
    // const user = new FormData();

    // user.append("blank_page", blankpage);
    // props.onUpdateCasesData(data, user, toggle);
    setBlankpage(!blankpage);
  };
  const p =
    props.parameterData.length > 0
      ? props.parameterData?.map((d) => d.avg)
      : [];
  const Minimum = Math.min(...p);

  const Maximum = Math.max(...p);

  const printMutliple = () => {
    printJS({
      printable: "CoolRoomPrint",
      type: "html",
      CSS: "./FinalReport.css",
      scanStyles: "true",
      targetStyles: "[*]",
    });
  };

  return (
    <div className="position-relative">
      <Button
        color="warning w-20  m-3 float-right"
        onClick={printMutliple}
        block
        className="print-button"
      >
        <i className="fa fa-eye mr-2" />
        Print Report
      </Button>

      <Button
        color={blankpage ? "danger" : "success"}
        onClick={addBlankPage}
        block
        className="print-button w-20  m-3 float-left"
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
        className="text-center report-print d-flex flex-column justify-content-center w-100 p-2 mt-2"
      >
        {props.cases?.isLoading ? (
          <Loader2 />
        ) : (
          props.cases?.cases
            ?.filter((c) => c.id == param.id)
            .map((user) => {
              return (
                <div id="aakash">
                  <div
                    id="first-page"
                    className="first-page mb-2  test pdf-h-w"
                  >
                    <RHeader />
                    <p>
                      Lab Add:C/105, Jaswanti Allied Business Center, Ramchandra
                      Lane Extn., Kachpada, Malad(W). Mumbai-400064
                    </p>
                    <p>
                      Email : support@vegacalibrations.com Website :
                      www.vegacalibrations.com{" "}
                    </p>
                    <h3 style={{ border: "1px solid black", width: "100%" }}>
                      Table of Content
                    </h3>
                    <table
                      className="table table-sm"
                      style={{ border: "1px solid black" }}
                    >
                      <thead>
                        <tr>
                          <td scope="col">Sr. No</td>
                          <td scope="col">Description </td>
                          <td scope="col">Page No. </td>
                        </tr>
                      </thead>
                      <tbody className="test">
                        <tr>
                          <td>01</td>
                          <td>
                            Area/Equipment Details For "{user.type_of_room}"{" "}
                            {user.type_of_cycle}, Mapping And Cycle Detail
                          </td>
                          <td>02-03</td>
                        </tr>
                        <tr>
                          <td>02</td>
                          <td>Location Diagram Of The Data Loggers </td>
                          <td>04-05</td>
                        </tr>
                        <tr>
                          <td>03</td>
                          <td>
                            Trend For Continuous Operation Test Cycle
                            (Temperature Vs Time){" "}
                          </td>
                          <td>06-08</td>
                        </tr>

                        <tr>
                          <td>04</td>
                          <td>
                            Trend For Door Open Test Cycle (Temperature Vs Time)
                          </td>
                          <td>09-011</td>
                        </tr>

                        <tr>
                          <td>05</td>
                          <td>
                            Trend For Power Failure Test Cycle (Temperature Vs
                            Time){" "}
                          </td>
                          <td>12-14</td>
                        </tr>

                        <tr>
                          <td>06</td>
                          <td>
                            Summary And Observation Report Of Parameters
                            Computed During Mapping (Temperature){" "}
                          </td>
                          <td>15-16</td>
                        </tr>

                        <tr>
                          <td>07</td>
                          <td>Observation And Concluding Remarks </td>
                          <td>17</td>
                        </tr>

                        <tr>
                          <td>08</td>
                          <td>Mean Kinetic Temperature (M.K.T) </td>
                          <td>18</td>
                        </tr>

                        <tr>
                          <td>09</td>
                          <td>
                            Location Diagram Indicating Position Of Loggers
                            Showing Maximum And Average Minimum Temperature Point{" "}
                          </td>
                          <td>19</td>
                        </tr>

                        <tr>
                          <td>10</td>
                          <td>
                            Summary And Observation Report Of Risk Analysis
                            Studies For "{user.type_of_room}"{" "}
                            {user.type_of_cycle}
                          </td>
                          <td>20-21</td>
                        </tr>

                        <tr>
                          <td>11</td>
                          <td>List Of Annexures </td>
                          <td>22</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p style={{ pageBreakAfter: "always", clear: "both" }}></p>

                  <div className="second-page   pdf-h-w ">
                    <RHeader />

                    <div className="second-page-data test">
                      <div className="test">
                        <div className="second-main test">
                          <div className="mb-50">
                            <p>Thermal Qualification Study For</p>
                            <p>
                              "{user.type_of_room}" {user.type_of_cycle}
                            </p>
                            <p>Identification No. : {user.identification_no}</p>
                            <p>Located At</p>
                            <p>{user?.company?.name}</p>
                            <p>{user.company?.address}</p>
                          </div>
                          <table
                            className="table test"
                            style={{ border: "2px solid black" }}
                          >
                            <thead
                              className="test"
                              style={{ border: "2px solid black" }}
                            >
                              <tr className="test">
                                <th scope="col" className="test">
                                  Thermal Qualification Study Performed On
                                </th>
                                <th scope="col" className="test">
                                  Thermal Qualification Study Next Due On
                                </th>
                              </tr>
                            </thead>
                            <tbody className="test">
                              <tr className="test">
                                <th className="test">
                                  {dateFormat(
                                    user.mapping_start_date,
                                    "dd-mm-yyyy"
                                  )}
                                </th>
                                <th className="test">
                                  {user.next_due_date}
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>

                  <div className="third-page ">
                    <RHeader />
                    <div className="p-1px third-page-header test">
                      <div className="test p-1">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex h-30p">
                              <span className="w-25 test-b test-r">
                                Objective{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Report No.{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Qualification Performed On{" "}
                              </span>
                              <span className="w-25 test-b">
                                Next Qualification Due On{" "}
                              </span>
                            </div>
                            <div className="d-flex h-50p">
                              <span className="w-25 test-r f-10 p-1">
                                Thermal Qualification Study For "
                                {user.type_of_room}" {user.type_of_cycle}
                              </span>
                              <span className="w-25 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 test-r">
                                {user.mapping_start_date}
                              </span>
                              <span className="w-25">{user.next_due_date}</span>
                            </div>
                          </div>

                          <div className="test p-1 text-left h-80p">
                            <div className="d-flex ml-2 p-1 text-left">
                              <span className="mr-1 f-12 w-30">
                                Name Of The Customer :
                              </span>
                              <span className=" f-12 w-100 text-left">
                                {user.company?.name}
                              </span>
                            </div>

                            <div className="d-flex ml-2 p-1 text-left">
                              <span className="mr-1 f-12 w-20 space-line text-left">
                                Customer address :
                              </span>
                              <span className="f-12 w-80 text-left">
                                {user.company?.address}
                              </span>
                            </div>
                          </div>

                          <div>
                            <h6> Details For "{user.type_of_room}" </h6>
                            <div className="test">
                              <div className="d-flex">
                                <span className="w-25 test-b test-r h-60p">
                                  ID No. Of The "{user.type_of_room}"
                                </span>
                                <span className="w-25 test-b test-r">
                                  Location
                                </span>
                                <span className="w-25 test-b test-r">
                                  Capacity
                                </span>
                                <span className="w-25 test-b test-r">
                                  Make / Model No.
                                </span>
                                <span className="w-25 test-b test-r">
                                  Acceptable Operating Range Temperature (°C){" "}
                                </span>
                                <span className="w-25 test-b">
                                  Usage Of The "{user.type_of_room}"{" "}
                                </span>
                              </div>
                              <div className="d-flex h-50p">
                                <span className="w-25 test-r">
                                  {user.identification_no}
                                </span>
                                <span className="w-25 test-r">
                                  {user.company?.location}
                                </span>
                                <span className="w-25 test-r">
                                  {user.capacity}
                                </span>
                                <span className="w-25 test-r">
                                  {user.model_no}
                                </span>
                                <span className="w-25 test-r">
                                  {user.operating_range}
                                </span>
                                <span className="w-25 ">{user.usage_area}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h6> </h6>
                            <div className="test mb-2">
                              <div className="d-flex">
                                <span className="w-25 test-b test-r h-50p">
                                  Mapping Cycle Start Date
                                </span>
                                <span className="w-25 test-b test-r">
                                  Mapping Cycle End Date{" "}
                                </span>
                                <span className="w-25 test-b test-r">
                                  No. Of Cycles Performed{" "}
                                </span>
                                <span className="w-25 test-b test-r">
                                  No. Of Sensing Point
                                </span>
                                <span className="w-25 test-b">Status</span>
                              </div>
                              <div className="d-flex  h-30p">
                                <span className="w-25 test-r">
                                  {user.continuous_cycle_start_date}
                                </span>
                                <span className="w-25 test-r">
                                  {user.continuous_cycle_end_date}
                                </span>
                                <span className="w-25 test-r">
                                  {user.no_of_cycles}
                                </span>
                                <span className="w-25 test-r">
                                  {user.set_point}
                                </span>
                                <span className="w-25">{user.load_status}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h6>Details Of The Mapping Cycle</h6>
                            <div className="test">
                              <div className="d-flex h-50p">
                                <span className="w-25 test-b test-r">
                                  Start Date
                                </span>
                                <span className="w-25 test-b test-r">
                                  End Date{" "}
                                </span>
                                <span className="w-25 test-b test-r">
                                  Set Temp.{" "}
                                </span>
                                <span className="w-25 test-b test-r">
                                  Name Of The Cycle
                                </span>
                                <span className="w-25 test-b test-r">
                                  Cycle Start Time (HH:MM:SS)
                                </span>
                                <span className="w-25 test-b test-r">
                                  Cycle End Time (HH:MM:SS)
                                </span>
                                <span className="w-25 test-b ">
                                  Recording Interval
                                </span>
                              </div>
                              {props.cycle
                                ?.filter((c) => c.case_id == param.id)
                                .map((cycle) => {
                                  return (
                                    <div className="d-flex test h-50p">
                                      <span className="w-25 test-r">
                                        {cycle.start_date}
                                      </span>
                                      <span className="w-25 test-r">
                                        {cycle.end_date}
                                      </span>
                                      <span className="w-25 test-r">
                                        {cycle.set_temp}
                                      </span>
                                      <span className="w-25 test-r">
                                        {cycle.door_open_test_name}
                                      </span>
                                      <span className="w-25 test-r">
                                        {cycle.dcp_on_time}
                                      </span>
                                      <span className="w-25 test-r">
                                        {cycle.do_off_time}
                                      </span>
                                      <span className="w-25 ">
                                        {cycle.recovery}
                                      </span>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>

                          <div>
                            <h6>Details Of The Mapping Instrumentation </h6>
                            <div className="test">
                              <div className="d-flex h-30p">
                                <span className="w-25 test-b test-r">
                                  {" "}
                                  Sr. No.
                                </span>
                                <span className="w-25 test-b test-r">
                                  Master Instrument{" "}
                                </span>
                                <span className="w-25 test-b test-r">
                                  Identification No.{" "}
                                </span>

                                <span className="w-25 test-b">
                                  Calibration Certificate No.
                                </span>
                              </div>
                              <div className="d-flex h-30p">
                                <span className="w-25 test-r">01 </span>
                                <span className="w-25 test-r">
                                  {user.details_of_master_instrument}
                                </span>
                                <span className="w-25 test-r">
                                  {/* {user.identification_no} */}
                                  “As Shown In Diagram”
                                </span>

                                <span className="w-25 ">
                                  {user.calibration_certificate_no}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="test-t test-b mt-4 mb-50">
                              <div className="d-flex test h-30p">
                                <span className="w-50 test-r ">
                                  For M/s. Vega Calibration And Validation
                                  Services LLP.{" "}
                                </span>
                                <span className="w-50"> 3S CORPORATION </span>
                              </div>

                              <div className="d-flex test h-20p">
                                <span className="w-25 test-r">Prepared by</span>
                                <span className="w-25 test-r">Checked By </span>
                                <span className="w-25 test-r">
                                  Reviewed By{" "}
                                </span>
                                <span className="w-25 ">Approved By </span>
                              </div>
                              <div className="d-flex test">
                                <span className="w-25 test-r height-100">
                                  {user.prepared_by}
                                </span>
                                <span className="w-25 test-r height-100">
                                  {user.checked_by}
                                </span>
                                <span className="w-25 test-r height-100">
                                  {user.reviewed_by}
                                </span>
                                <span className="w-25 height-100">
                                  {user.approved_by}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>

                  <div className="fourth-page pdf-h-w">
                    <RHeader />
                    <div className="p-1px test">
                      <div className="test h-90v">
                        <MainHeader />
                        <div className="d-flex justify-content-center align-items-center ">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Location Diagram Of Data Loggers
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>

                  <div className="fifth-page pdf-h-w">
                    <RHeader />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="d-flex h-100v">
                          <h4 className="font-weight-bold w-100 text-underline text-left mt-2">
                            Location Diagram Indicating Position Of Loggers
                            <img
                              src={`${imageUrl}${user.identification_no}/${user.file_1}`}
                              className="h-80v w-100"
                              alt=""
                            />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>

                  <div className="sixth-page pdf-h-w">
                    <RHeader />
                    <div className="p-1px test">
                      <div className="test ">
                        <div className="test">
                          <div className="d-flex test">
                            <span className="test-b test-r w-33">
                              Objective : Thermal Qualification Study For"
                              {user.type_of_room}" {user.type_of_cycle}
                            </span>
                            <span className="test-b test-r w-33">
                              Type Of Cycle:{" "}
                              {user.door_type_test[0]?.door_open_test_name}
                            </span>
                            <span className="test-b w-33">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex">
                            <span className="w-60 test-b test-r">
                              Customer Name : {user?.company?.name}
                            </span>
                            <span className="w-40 test-b">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                        </div>

                        <div className="test h-40p">
                          {user.company?.address}
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-80v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Temperature Vs Time) <br />{" "}
                            {user.door_type_test[0]?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>

                  <div className="seventh-page pdf-h-w">
                    <RHeader />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex h-40p">
                              <span className="w-40 test-b test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test h-80p">
                              <span className="w-40 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 test-r">
                                {user.door_type_test[0]?.door_open_test_name}
                              </span>
                              <span className="w-25 test-r">
                                {user.door_type_test[0]?.start_date}{" "}
                                {user.door_type_test[0]?.dcp_on_time}
                              </span>
                              <span className="w-25">
                                {user.door_type_test[0]?.end_date}{" "}
                                {user.door_type_test[0]?.do_off_time}
                              </span>
                            </div>
                          </div>
                          <div className=" d-flex flex-column text-left ml-3 h-80p">
                            <div className="d-flex ml-2 p-1 text-left">
                              <span className="mr-1 f-12 w-30 space-line text-left">
                                Customer Name :
                              </span>
                              <span className="f-12 w-100 text-left">
                                {user.company?.name}
                              </span>
                            </div>

                            <div className="d-flex ml-2 p-1 text-left">
                              <span className="mr-1 f-12 w-30 space-line text-left">
                                Customer address :
                              </span>
                              <span className="f-12 w-70 text-left">
                                {user.company.address}
                              </span>
                            </div>
                          </div>
                        </div>
                        <VegasGraph
                          test_id={5}
                          testName="CONTINUOUS OPERATION TEST CYCLE (WITH AMBIENT)"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>

                  <div className="eightth-page pdf-h-w">
                    <RHeader />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test h-80p">
                              <span className="w-40 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 test-r">
                                {user.door_type_test[0]?.door_open_test_name}
                              </span>
                              <span className="w-25 test-r">
                                {user.door_type_test[0]?.start_date}{" "}
                                {user.door_type_test[0]?.dcp_on_time}
                              </span>
                              <span className="w-25">
                                {user.door_type_test[0]?.end_date}{" "}
                                {user.door_type_test[0]?.do_off_time}
                              </span>
                            </div>
                          </div>
                          <div className=" d-flex flex-column text-left ml-3 h-80p">
                            <div className="d-flex ml-2 p-1 text-left">
                              <span className="mr-1 f-12 w-30 space-line text-left">
                                Customer Name :
                              </span>
                              <span className="f-12 w-100">
                                {user.company?.name}
                              </span>
                            </div>

                            <div className="d-flex ml-2 p-1 text-left">
                              <span className="mr-1 f-12 w-30 space-line text-left">
                                Customer address :
                              </span>
                              <span className="f-12 w-70 text-left">
                                {user.company.address}
                              </span>
                            </div>
                          </div>
                        </div>
                        <VegasGraph
                          test_id={6}
                          testName="CONTINUOUS OPERATION TEST CYCLE (WITHOUT AMBIENT)"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>

                  <div className="nineth-page pdf-h-w">
                    <RHeader />
                    <div className="p-1px test">
                      <div className="test ">
                        <div className="test">
                          <div className="d-flex">
                            <span className="test-b test-r w-33">
                              Objective : Thermal Qualification Study For
                              {user.type_of_room} {user.type_of_cycle}
                            </span>
                            <span className="test-b test-r w-33">
                              Type Of Cycle:{" "}
                              {user.door_type_test[1]?.door_open_test_name}
                            </span>
                            <span className="test-b w-33">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex">
                            <span className="w-60 test-b test-r">
                              Customer Name : {user.company?.name}
                            </span>
                            <span className="w-40 test-b">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                          <div className="test h-50p">
                            Customer Address : {user.company?.address}
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-80v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Temperature Vs Time)
                            <br />
                            {user.door_type_test[1]?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>

                  <div className="tenth-page pdf-h-w">
                    <RHeader />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex h-50p">
                              <span className="w-40 test-b test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test h-80p">
                              <span className="w-40 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 test-r">
                                {user.door_type_test[1]?.door_open_test_name}
                              </span>
                              <span className="w-25 test-r">
                                {user.door_type_test[1]?.start_date}{" "}
                                {user.door_type_test[1]?.dcp_on_time}
                              </span>
                              <span className="w-25">
                                {user.door_type_test[1]?.end_date}{" "}
                                {user.door_type_test[1]?.do_off_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex h-40p">
                              <span className="w-25 test-b test-r">
                                Door Open Time{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Door Close Time{" "}
                              </span>
                              <span className="w-25 test-b">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex h-40p">
                              <span className="w-25 test-r">
                                {user.door_type_test[1]?.dcp_on_time}
                              </span>
                              <span className="w-25 test-r">
                                {
                                  user.door_type_test[1]
                                    ?.set_limit_cross_out_time
                                }
                              </span>
                              <span className="w-25 test-r">
                                {user.door_type_test[1]?.do_off_time}
                              </span>
                              <span className="w-25">
                                {
                                  user.door_type_test[1]
                                    ?.set_limit_cross_in_time
                                }
                              </span>
                            </div>
                          </div>
                          <div className=" d-flex flex-column text-left ml-3 h-80p">
                            <div className="d-flex ml-2 p-1 text-left">
                              <span className="mr-1 f-12 w-30 space-line text-left">
                                Customer Name :
                              </span>
                              <span className="f-12 w-100 text-left">
                                {user.company?.name}
                              </span>
                            </div>

                            <div className="d-flex ml-2 p-1 text-left">
                              <span className="mr-1 f-12 w-30 space-line text-left">
                                Customer address :
                              </span>
                              <span className="f-12 w-70 text-left">
                                {user.company.address}
                              </span>
                            </div>
                          </div>
                        </div>
                        <VegasGraph
                          test_id={7}
                          testName="DOOR OPEN TEST CYCLE (WITH AMBIENT)"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>

                  <div className="eleventh-page pdf-h-w">
                    <RHeader />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex h-50p">
                              <span className="w-40 test-b test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test h-80p">
                              <span className="w-40 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 test-r">
                                {user.door_type_test[1]?.door_open_test_name}
                              </span>
                              <span className="w-25 test-r">
                                {user.door_type_test[1]?.start_date}{" "}
                                {user.door_type_test[1]?.dcp_on_time}
                              </span>
                              <span className="w-25">
                                {user.door_type_test[1]?.end_date}{" "}
                                {user.door_type_test[1]?.do_off_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex h-40p">
                              <span className="w-25 test-b test-r">
                                Door Open Time{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Door Close Time{" "}
                              </span>
                              <span className="w-25 test-b">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex h-40p">
                              <span className="w-25 test-r">
                                {user.door_type_test[1]?.dcp_on_time}
                              </span>
                              <span className="w-25 test-r">
                                {
                                  user.door_type_test[1]
                                    ?.set_limit_cross_out_time
                                }
                              </span>
                              <span className="w-25 test-r">
                                {user.door_type_test[1]?.do_off_time}
                              </span>
                              <span className="w-25">
                                {
                                  user.door_type_test[1]
                                    ?.set_limit_cross_in_time
                                }
                              </span>
                            </div>
                          </div>
                          <div className=" d-flex flex-column text-left ml-3 h-80p">
                            <div className="d-flex ml-2 p-1 text-left">
                              <span className="mr-1 f-12 w-30 space-line text-left">
                                Customer Name :
                              </span>
                              <span className="f-12 w-100 text-left">
                                {user.company?.name}
                              </span>
                            </div>

                            <div className="d-flex ml-2 p-1 text-left">
                              <span className="mr-1 f-12 w-30 space-line text-left">
                                Customer address :
                              </span>
                              <span className="f-12 w-70 text-left">
                                {user.company.address}
                              </span>
                            </div>
                          </div>
                        </div>
                        <VegasGraph
                          test_id={8}
                          testName="DOOR OPEN TEST CYCLE (WITHOUT AMBIENT)"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>

                  <div className="twelveth-page pdf-h-w">
                    <RHeader />
                    <div className="p-1px test">
                      <div className="test ">
                        <div className="test">
                          <div className="d-flex">
                            <span className="test-b test-r w-33">
                              Objective : Thermal Qualification Study For{" "}
                              {user.type_of_room} {user.type_of_cycle}
                            </span>
                            <span className="test-b test-r w-33">
                              Type Of Cycle:{" "}
                              {user.door_type_test[2]?.door_open_test_name}
                            </span>
                            <span className="test-b w-33">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex">
                            <span className="w-60 test-b test-r">
                              Customer Name : {user.company?.name}
                            </span>
                            <span className="w-40 test-b">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                          <div className="test h-50p">
                            Customer Address : {user.company?.address}
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-80v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Temperature Vs Time)
                            <br />
                            {user.door_type_test[2]?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>

                  <div className="thirteen-page pdf-h-w">
                    <RHeader />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex h-50p">
                              <span className="w-40 test-b test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test h-80p">
                              <span className="w-40 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 test-r">
                                {user.door_type_test[2]?.door_open_test_name}
                              </span>
                              <span className="w-25 test-r">
                                {user.door_type_test[2]?.start_date}{" "}
                                {user.door_type_test[2]?.dcp_on_time}
                              </span>
                              <span className="w-25">
                                {user.door_type_test[2]?.end_date}{" "}
                                {user.door_type_test[2]?.do_off_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex h-40p">
                              <span className="w-25 test-b test-r">
                                Power OFF Time{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Power ON Time{" "}
                              </span>
                              <span className="w-25 test-b">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex h-40p">
                              <span className="w-25 test-r">
                                {user.door_type_test[2]?.dcp_on_time}
                              </span>
                              <span className="w-25 test-r">
                                {
                                  user.door_type_test[2]
                                    ?.set_limit_cross_out_time
                                }
                              </span>
                              <span className="w-25 test-r">
                                {user.door_type_test[2]?.do_off_time}
                              </span>
                              <span className="w-25">
                                {
                                  user.door_type_test[2]
                                    ?.set_limit_cross_in_time
                                }
                              </span>
                            </div>
                          </div>
                          <div className=" d-flex flex-column text-left ml-3 h-80p">
                            <div className="d-flex ml-2 p-1 text-left">
                              <span className="mr-1 f-12 w-30 space-line text-left">
                                Customer Name :
                              </span>
                              <span className="f-12 w-100 text-left">
                                {user.company?.name}
                              </span>
                            </div>

                            <div className="d-flex ml-2 p-1 text-left">
                              <span className="mr-1 f-12 w-30 space-line text-left">
                                Customer address :
                              </span>
                              <span className="f-12 w-70 text-left">
                                {user.company.address}
                              </span>
                            </div>
                          </div>
                        </div>
                        <VegasGraph
                          test_id={9}
                          testName="POWER FAILURE TEST CYCLE (WITH AMBIENT)"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>

                  <div className="fourteen-page pdf-h-w">
                    <RHeader />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex h-50p">
                              <span className="w-40 test-b test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test h-80p">
                              <span className="w-40 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 test-r">
                                {user.door_type_test[2]?.door_open_test_name}
                              </span>
                              <span className="w-25 test-r">
                                {user.door_type_test[2]?.start_date}{" "}
                                {user.door_type_test[2]?.dcp_on_time}
                              </span>
                              <span className="w-25">
                                {user.door_type_test[2]?.end_date}{" "}
                                {user.door_type_test[2]?.do_off_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-25 test-b test-r h-40p">
                                Power OFF Time{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 test-b test-r">
                                Power ON Time{" "}
                              </span>
                              <span className="w-25 test-b">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex">
                              <span className="w-25 test-r h-40">
                                {user.door_type_test[2]?.dcp_on_time}
                              </span>
                              <span className="w-25 test-r">
                                {
                                  user.door_type_test[2]
                                    ?.set_limit_cross_out_time
                                }
                              </span>
                              <span className="w-25 test-r">
                                {user.door_type_test[2]?.do_off_time}
                              </span>
                              <span className="w-25">
                                {
                                  user.door_type_test[2]
                                    ?.set_limit_cross_in_time
                                }
                              </span>
                            </div>
                          </div>
                          <div className=" d-flex flex-column text-left ml-3 h-80p">
                            <div className="d-flex ml-2 p-1 text-left">
                              <span className="mr-1 f-12 w-30 space-line text-left">
                                Customer Name :
                              </span>
                              <span className="f-12 w-100 text-left">
                                {user.company?.name}
                              </span>
                            </div>

                            <div className="d-flex ml-2 p-1 text-left">
                              <span className="mr-1 f-12 w-30 space-line text-left">
                                Customer address :
                              </span>
                              <span className="f-12 w-70 text-left">
                                {user.company.address}
                              </span>
                            </div>
                          </div>
                        </div>
                        <VegasGraph
                          test_id={10}
                          testName="POWER FAILURE TEST CYCLE (WITHOUT AMBIENT)"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>

                  <div className="15-page pdf-h-w">
                    <RHeader />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="d-flex justify-content-center align-items-center h-80v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Summary and Observation Report Of Parameters
                            Computed
                            <br /> During Mapping (Temperature)
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>

                  <div className="16-page pdf-h-w">
                    <RHeader />
                    <div className="p-1px test">
                      <div className="test">
                        <MainHeader />
                        <div className="d-flex flex-column h-80v">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 mb-4 text-left">
                            Summary of Parameters Computed During Mapping
                            (Temperature)
                          </h4>

                          <div className="text-center p-2">
                            <div className="d-flex test w-100">
                              <span className="w-40 h-50p test font-weight-bold d-flex align-items-center justify-content-center para">
                                Position
                              </span>

                              {props.parameterData?.length > 0 &&
                                props.parameterData?.map((par) => {
                                  return (
                                    <span className="w-20 h-50p test font-weight-bold d-flex align-items-center justify-content-center parameter">
                                      {par.sensor}
                                    </span>
                                  );
                                })}
                            </div>
                            <div className="d-flex w-100">
                              <div className="w-40 text-center d-flex flex-column font-weight-bold temperature">
                                <span className="test w-100 h-70p d-flex align-items-center justify-content-center">
                                  AVERAGE MINIMUM TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-70p d-flex align-items-center justify-content-center">
                                  AVERAGE MAXIMUM TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-70p d-flex align-items-center justify-content-center">
                                  AVERAGE TEMPERATURE °C{" "}
                                </span>
                              </div>
                              {props.parameterData?.length > 0 &&
                                props.parameterData?.map((par) => {
                                  return (
                                    <div className="d-flex flex-column w-20">
                                      <span className="w-100 test h-70p d-flex align-items-center justify-content-center">
                                        {Math.round(par.min)}
                                      </span>
                                      <span className="w-100 test h-70p d-flex align-items-center justify-content-center">
                                        {Math.round(par.max)}
                                      </span>

                                      {par.avg == Maximum ? (
                                        <span className="w-100 test h-70p d-flex align-items-center justify-content-center bg-red">
                                          {Math.round(par.avg)}
                                        </span>
                                      ) : par.avg == Minimum ? (
                                        <span className="w-100 test h-70p d-flex align-items-center justify-content-center bg-green">
                                          {Math.round(par.avg)}
                                        </span>
                                      ) : (
                                        <span className="w-100 test h-70p d-flex align-items-center justify-content-center">
                                          {Math.round(par.avg)}
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                            </div>
                            <div className="d-flex mt-5 justify-content-end font-weight-bold text-white f-12">
                              <div
                                className="bg-red"
                                style={{
                                  padding: "10px",
                                  marginRight: "30px",
                                }}
                              >
                                <p>Average Maximum Temperature Point</p>
                                <p>HOT SPOT (TOP)</p>
                              </div>
                              <div
                                className="bg-green "
                                style={{
                                  padding: "10px",
                                }}
                              >
                                <p>Average Minimum Temperature Point</p>
                                <p>HOT SPOT (TOP)</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>

                  <div className="17-page pdf-h-w">
                    <RHeader />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="text-left h-90v">
                          <div className="ml-3 mb-50">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                              Observation and Concluding Remarks
                            </h4>
                            <p className="space-line">
                              {user.concluding_remark}
                            </p>
                          </div>

                          <div className="mb-100 ml-3">
                            <h4 className="font-weight-bold text-underline">
                              Conclusion
                            </h4>
                            <p className="space-line">{user.conclusion}</p>
                          </div>

                          <div>
                            <div className="test-t test-b mt-4 mb-100">
                              <div className="d-flex test">
                                <span className="w-50 test-r">
                                  For M/s. Vega Calibration And Validation
                                  Services LLP.{" "}
                                </span>
                                <span className="w-50">
                                  {" "}
                                  {user?.company?.name}{" "}
                                </span>
                              </div>

                              <div className="d-flex test">
                                <span className="w-25 test-r">Prepared by</span>
                                <span className="w-25 test-r">Checked By </span>
                                <span className="w-25 test-r">
                                  Reviewed By{" "}
                                </span>
                                <span className="w-25 ">Approved By </span>
                              </div>
                              <div className="d-flex test">
                                <span className="w-25 test-r height-150">
                                  {user.prepared_by}
                                </span>
                                <span className="w-25 test-r height-150">
                                  {user.checked_by}
                                </span>
                                <span className="w-25 test-r height-150">
                                  {user.reviewed_by}
                                </span>
                                <span className="w-25 height-150">
                                  {user.approved_by}
                                </span>
                              </div>
                              <p className="p-3 font-smaller">
                                Note : The results reported in this certificate
                                are valid at the time of temperature mapping
                                activity
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>

                  <div className="18-page pdf-h-w">
                    <RHeader />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="text-left h-90v">
                          <div className="ml-3">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                              MEAN KINETIC TEMPERATURE (M.K.T)
                            </h4>
                          </div>

                          <div>
                            <div className="test-t test-b mt-4 mb-100">
                              <div className="test p-100px text-center">
                                {" "}
                                ΔH__ -ln (℮ -ΔH/RT1+ ℮ -ΔH/RT2+ … + ℮ -ΔH/RTn )
                                n{" "}
                              </div>

                              <div className="test p-100px">
                                <p>
                                  TK: Mean kinetic temperature in °K ΔH:
                                  Activation Energy for degradation reaction
                                  typically taken as 83.122 kJ/mole R is the
                                  universal gas constant = 8.3122x 10-3 kJ per
                                  degree per mol T1 to Tn are the average
                                  temperatures at each of the sample points in
                                  °K n is the number of temperature sample
                                  points M . K . T = -
                                  {props.editcase?.mkt ?? ""} "A single derived
                                  temperature that, if maintained over a defined
                                  period of time, affords the same thermal
                                  challenge to a drug substance or drug product
                                  as would be experienced over a range of both
                                  higher and lower temperatures for an
                                  equivalent defined period.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>

                  <div className="19-page pdf-h-w">
                    <RHeader />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className=" h-100v">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                            Location Diagram Indicating Position Of Loggers
                          </h4>
                          <img
                            src={`${imageUrl}${user.identification_no}/${user.file_2}`}
                            className=""
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>

                  <div className="20-page pdf-h-w">
                    <RHeader />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="d-flex justify-content-center align-items-center h-80v">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2">
                            Summary And Observation Report Of Risk Analysis
                            Studies For "{user.type_of_room}"
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>

                  <div className="21-page pdf-h-w">
                    <RHeader />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="d-flex flex-column justify-content-start text-left  ml-2 h-80v">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                            Observation Remarks
                          </h4>
                          <p className="space-line">
                            {user.obeservation_remark}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>

                  <div className="22-page pdf-h-w">
                    <RHeader />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="d-flex flex-column justify-content-start text-left  ml-2 h-80v">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                            List Of Annexures
                          </h4>
                          <p>
                            1. Annexure-1{" "}
                            <a
                              target={"_blank"}
                              href={`${imageUrl}${user.identification_no}/${user.file_3}`}
                              rel="noreferrer"
                            >
                              {user.file_3}
                            </a>
                          </p>
                          <p>
                            {" "}
                            2. Annexure-2{" "}
                            <a
                              target={"_blank"}
                              href={`${imageUrl}${user.identification_no}/${user.file_4}`}
                              rel="noreferrer"
                            >
                              {user.file_4}
                            </a>
                          </p>
                          <p>
                            {" "}
                            3. Annexure-3{" "}
                            <a
                              target={"_blank"}
                              href={`${imageUrl}${user.identification_no}/${user.file_5}`}
                              rel="noreferrer"
                            >
                              {user.file_5}
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="page-break"></div>
                  {user.blank_page ||
                    (blankpage && (
                      <div className="23-page pdf-h-w ">
                        <RHeader />
                        <div className="p-1px test">
                          <div className="test h-100v">
                            <MainHeader />
                          </div>
                        </div>
                      </div>
                    ))}
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
    cols: state.cols.cols,
    company: state.company.company,
    customer: state.customer.customer,
    rows: state.rows.rows,
    cycle: state.cycle.cycle,
    parameterData: state.tests.parameterData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateCasesData: (data, user, toggle) =>
      dispatch(actions.updateCasesData(data, user, toggle)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FinalReport);

/* eslint-disable eqeqeq */
import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../../../../redux/action";

import "./FinalReport.css";

function MainHeader(props) {
  // const accessToken = `${props.login?.login?.token}`;
  const param = useParams();

  // let data = {
  //   token: accessToken,
  //   id: param?.id,
  // };
  const companyAddress = props.companyAddress ?? "";

  return (
    <div className="test ">
      {props.cases?.cases
        ?.filter((c) => c.id == param.id)
        .map((user) => {
          return (
            <div key={user.id}>
              <div className="d-flex test">
                <span className="test-b test-r w-40">
                  Objective : Thermal Qualification Study For"
                  {user.type_of_room}" {user.type_of_cycle}
                </span>
                <span className="test-b test-r w-33">
                  Type Of Cycle: Continuous Operation Test Cycle{" "}
                </span>
                <span className="test-b w-33">
                  Identification No. : {user.identification_no}
                </span>
              </div>

              <div className="d-flex test text-left ">
                <span className="w-60  test-r font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                <span className="w-40 test-b">
                  Report Number : {user.report_no}
                </span>
              </div>
              <div className="test w-100 f-14 text-left">
                Customer Address : {companyAddress}
              </div>
            </div>
          );
        })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    cases: state.cases,
    editcase: state.cases.editcase,
    cols: state.cols.cols,
    companyAddress: state.cases.companyAddress,
    company: state.company.company,
    rows: state.rows.rows,
    cycle: state.cycle.cycle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    companyGetData: (data) => dispatch(actions.companyGetData(data)),
    onRowsGetData: (data) => dispatch(actions.rowsGetData(data)),
    onColsGetData: (data) => dispatch(actions.colsGetData(data)),
    onCasesGetData: (data) => dispatch(actions.casesGetData(data)),
    casesEditGetData: (data) => dispatch(actions.casesEditGetData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);

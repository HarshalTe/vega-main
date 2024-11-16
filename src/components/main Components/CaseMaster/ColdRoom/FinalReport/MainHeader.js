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
    <div>
      {props.cases?.cases
        ?.filter((c) => c.id == param.id)
        .map((user) => {
          return (
            <div key={user.id}>
               <div className="row"> 
                   <div className="col-4" style={{border:'1px solid black',fontSize:'13px'}}>
                      <span style={{fontSize:'13px',fontWeight:'bold'}}>
                         Objective : Thermal Qualification Study For"
                        {user.type_of_room}" {user.type_of_cycle}
                      </span>
                   </div>
                   <div className="col-4" style={{border:'1px solid black',fontSize:'13px'}}>
                      <span style={{fontSize:'13px',fontWeight:'bold'}}>
                           Type Of Cycle: Continuous Operation Test Cycle{" "}
                      </span>
                   </div>
                   <div className="col-4" style={{border:'1px solid black',fontSize:'13px'}}>
                      <span style={{fontSize:'13px',fontWeight:'bold'}}>
                            Identification No. : {user.identification_no}
                      </span>
                   </div>
               </div>
               <div className="row">
                   <div className="col-6"  style={{border:'1px solid black',fontSize:'13px'}}>
                      <span style={{fontSize:'13px',fontWeight:'bold'}}>
                        Customer Name : {user?.company?.name}
                      </span>
                   </div>
                   <div className="col-6"  style={{border:'1px solid black',fontSize:'13px'}}>
                       <span style={{fontSize:'13px',fontWeight:'bold'}}>
                        Report Number : {user.report_no}
                      </span>
                    </div>   
               </div>
               <div className="row">
                   <div className="col-12" style={{border:'1px solid black',fontSize:'13px'}}>
                      <span style={{fontSize:'13px',fontWeight:'bold'}}>
                           Customer Address : {companyAddress}
                      </span>
                   </div>
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

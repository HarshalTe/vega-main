/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import classnames from "classnames";
import * as actions from "../../../../redux/action";

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";

import FormCalibration from "./Detail/FormCalibration2";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
// import MappingCycle from "./Detail/MappingCycle";
// import MappingCycle from "../CoolRoom/Detail/MappingCycle";

import FinalReport from "./FinalCertificate2";

// import Graph from "./Detail/Graph";

const PressureGauge = (props) => {
  const [activeTab, setActiveTab] = useState(
    props.login?.login?.user ? "FormCalibration" : "final"
  );
  console.log(props,"props11q1")

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const accessToken = `${props.login?.login?.token}`;
  const param = useParams();

  let data = {
    token: accessToken,
    id: param?.id,
    caseId: param?.id,
  };

  useEffect(() => {
    props.onCycleGetData(data);
    props.onTestsGetData(data);
    props.onTestTypeGetData(data);
    props.testsEditGetData(data);
    props.casesEditGetData(data);
    props.getCompanyAddress(param?.id);
    props.sensorEditGetData(data);
    // props.onRawDataGetData(data);
  }, []);
  
    return (
      <React.Fragment>
        <Nav tabs fill>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "FormCalibration",
              })}
              onClick={() => {
                toggle("FormCalibration");
              }}
            >
              Details Of Calibration
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "final",
              })}
              onClick={() => {
                toggle("final");
              }}
            >
              Final Calibration
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="FormCalibration" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <FormCalibration toggle={toggle} />
              </Col>
            </Row>
          </TabPane>
          
          <TabPane tabId="final" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <FinalReport toggle={toggle} />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }

const mapStateToProps = (state) => {
  return {
    login: state.login,
    cases: state.cases.cases,
    editcase: state.cases.editcase,
    cols: state.cols.cols,
    customer: state.customer.customer,
    rows: state.rows.rows,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanyAddress: (id) => dispatch(actions.getCompanyAddress(id)),
    onRawDataGetData: (data) => dispatch(actions.rawDataGetData(data)),
    sensorEditGetData: (data) => dispatch(actions.sensorEditGetData(data)),
    testsEditGetData: (data) => dispatch(actions.testsEditGetData(data)),
    onTestsGetData: (data) => dispatch(actions.testsGetData(data)),
    onTestTypeGetData: (data) => dispatch(actions.testTypeGetData(data)),
    onCycleGetData: (data) => dispatch(actions.cycleGetData(data)),
    onCustomerGetData: (data) => dispatch(actions.customerGetData(data)),
    onRowsGetData: (data) => dispatch(actions.rowsGetData(data)),
    onColsGetData: (data) => dispatch(actions.colsGetData(data)),
    onCasesGetData: (data) => dispatch(actions.casesGetData(data)),
    onDeleteCases: (data, id) => dispatch(actions.deleteCases(data, id)),
    onPostCasesData: (data, user, toggle) =>
      dispatch(actions.postCasesData(data, user, toggle)),
    onUpdateCasesData: (data, user, toggle) =>
      dispatch(actions.updateCasesData(data, user, toggle)),
    casesEditGetData: (data) => dispatch(actions.casesEditGetData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PressureGauge);

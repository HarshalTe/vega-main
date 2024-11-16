import React, { Component, useEffect, useState } from "react";
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

import ReeferArea from "./ReeferDetail/ReeferArea";

import Annexures from "../ColdRoom/Detail/Annexures";
import Home from "../CoolRoom/Detail/Home";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import MappingCycle from "../CoolRoom/Detail/MappingCycle";
import FinalReport from "../CoolRoom/FinalReport/FinalReport";
import ReeferData from "./ReeferDetail/ReeferData";
import ReeferContinuous from "./ReeferDetail/ReeferContinuous";
import ReeferDoor from "./ReeferDetail/ReeferDoor";
import ReeferPower from "./ReeferDetail/ReeferPower";
import ReeferParameter from "./ReeferDetail/ReeferParameter";
import Parameter from "./ReeferDetail/Parameter";
import ReeferRemark from "./ReeferDetail/ReeferRemark";
import ReeferMean from "./ReeferDetail/ReeferMean";
import ReeferRisk from "./ReeferDetail/ReeferRisk";
import ReeferFinalReport from "./ReeferFinalReport/ReeferFinalReport";
import RawData from "../../RawData/RawData";
import ReeferStartupStatic from "./ReeferDetail/ReeferStartupStatic";

const ReeferVehicle = (props) => {
  const [activeTab, setActiveTab] = useState(
    props.login?.login?.user ? "home" : "final"
  );

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
  };

  useEffect(() => {
    props.onCycleGetData(data);
    props.onTestsGetData(data);
    // props.onCasesGetData(data);
    props.onTestTypeGetData(data);
    // props.testsEditGetData(data);
    props.casesEditGetData(data);
    props.getCompanyAddress(param?.id);
    props.sensorEditGetData(data);
  }, []);

  if (props.login?.login?.user) {
    return (
      <React.Fragment>
        <Nav tabs fill>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "home",
              })}
              onClick={() => {
                toggle("home");
              }}
            >
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "area",
              })}
              onClick={() => {
                toggle("area");
              }}
            >
              Area
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "cycle",
              })}
              onClick={() => {
                toggle("cycle");
              }}
            >
              Detail of Mapping Cycle
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "data",
              })}
              onClick={() => {
                toggle("data");
              }}
            >
              Data Loggers & Postion of Loggers
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "continuous",
              })}
              onClick={() => {
                toggle("continuous");
              }}
            >
              Continuous Operation
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "static",
              })}
              onClick={() => {
                toggle("static");
              }}
            >
              Start Up Study Test
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "door",
              })}
              onClick={() => {
                toggle("door");
              }}
            >
              Door Open
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "power",
              })}
              onClick={() => {
                toggle("power");
              }}
            >
              Power Failure
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "raw",
              })}
              onClick={() => {
                toggle("raw");
              }}
            >
              Raw Data
            </NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "parameter",
              })}
              onClick={() => {
                toggle("parameter");
              }}
            >
              Report of Parameters
            </NavLink>
          </NavItem> */}
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "parameter2",
              })}
              onClick={() => {
                toggle("parameter2");
              }}
            >
              Report of Parameters
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "remark",
              })}
              onClick={() => {
                toggle("remark");
              }}
            >
              Oberservation and Concluding Remark
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "mean",
              })}
              onClick={() => {
                toggle("mean");
              }}
            >
              Mean Kinetic
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "risk",
              })}
              onClick={() => {
                toggle("risk");
              }}
            >
              Risk Analysis
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "annexures",
              })}
              onClick={() => {
                toggle("annexures");
              }}
            >
              Annexures
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
              Final Report
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="home" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <Home toggle={toggle} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="area" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <ReeferArea toggle={toggle} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="cycle" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <MappingCycle toggle={toggle} />
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="data" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <ReeferData toggle={toggle} />
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="continuous" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <ReeferContinuous toggle={toggle} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="static" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <ReeferStartupStatic toggle={toggle} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="door" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <ReeferDoor toggle={toggle} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="power" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <ReeferPower toggle={toggle} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="raw" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <RawData toggle={toggle} type_room="Reefer Vehicle" />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="parameter" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <ReeferParameter toggle={toggle} type_room="Reefer Vehicle"/>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="parameter2" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <Parameter toggle={toggle} type_room="Reefer Vehicle"/>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="remark" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <ReeferRemark toggle={toggle} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="mean" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <ReeferMean toggle={toggle} />
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="risk" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <ReeferRisk toggle={toggle} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="annexures" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <Annexures toggle={toggle} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="final" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <ReeferFinalReport type_room="Reefer Vehicle" toggle={toggle} />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  } else if (props.login?.login?.customer) {
    return (
      <React.Fragment>
        <Nav tabs fill>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "final",
              })}
              onClick={() => {
                toggle("final");
              }}
            >
              Final Report
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="final" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <ReeferFinalReport toggle={toggle} />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }
};

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
export default connect(mapStateToProps, mapDispatchToProps)(ReeferVehicle);

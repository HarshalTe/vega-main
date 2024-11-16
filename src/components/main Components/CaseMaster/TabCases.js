import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import * as actions from "../../../redux/action";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import Cases from "./Cases";
import CompletedCases from "./CompletedCases";
import PendingCases from "./PendingCases";
import OngoingCases from "./OngoingCases";

const TabCases = (props) => {
  const [activeTab, setActiveTab] = useState("cases");

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
  };

  useEffect(() => {
    props.onCasesGetData(data);
    props.onUsersGetData(data);
    props.onRowsGetData(data);
    props.onCompanyGetData(data);
    props.onCustomerGetData(data);
    props.onColsGetData(data);
    props.onSensorGetData(data);
  }, []);

  if (props.login?.login?.user) {
    return (
      <React.Fragment>
        <Nav tabs fill>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "cases",
              })}
              onClick={() => {
                toggle("cases");
              }}
            >
              Reports
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "ongoing",
              })}
              onClick={() => {
                toggle("ongoing");
              }}
            >
              Onging Reports
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "pending",
              })}
              onClick={() => {
                toggle("pending");
              }}
            >
              Pending Reports
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "completed",
              })}
              onClick={() => {
                toggle("completed");
              }}
            >
              Completed Reports
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="cases" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <Cases toggle={toggle} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="ongoing" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <OngoingCases toggle={toggle} />
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="pending" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <PendingCases toggle={toggle} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="completed" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <CompletedCases toggle={toggle} />
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
                active: activeTab === "cases",
              })}
              onClick={() => {
                toggle("cases");
              }}
            >
              Cases
            </NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "onging",
              })}
              onClick={() => {
                toggle("onging");
              }}
            >
              Onging Cases
            </NavLink>
          </NavItem> */}
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "pending",
              })}
              onClick={() => {
                toggle("pending");
              }}
            >
              Pending Cases
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "completed",
              })}
              onClick={() => {
                toggle("completed");
              }}
            >
              Completed Cases
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="cases" className="bg-white">
            <Row>
              <Col sm="12" className="p-4 ">
                <Cases toggle={toggle} />
              </Col>
            </Row>
          </TabPane>
          {/* <TabPane tabId="ongoing" className="bg-white">
            <Row>
              <Col sm="12" className="p-4 ">
                <OngoingCases toggle={toggle} />
              </Col>
            </Row>
          </TabPane> */}

          <TabPane tabId="pending">
            <Row>
              <Col sm="12">
                <PendingCases toggle={toggle} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="completed">
            <Row>
              <Col sm="12">
                <CompletedCases toggle={toggle} />
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
    cases: state.cases,
    cols: state.cols.cols,
    company: state.company.company,
    rows: state.rows.rows,
    users: state.users.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSensorGetData: (data) => dispatch(actions.sensorGetData(data)),
    onCustomerGetData: (data) => dispatch(actions.customerGetData(data)),
    onUsersGetData: (data) => dispatch(actions.usersGetData(data)),
    onCompanyGetData: (data) => dispatch(actions.companyGetData(data)),
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
export default connect(mapStateToProps, mapDispatchToProps)(TabCases);

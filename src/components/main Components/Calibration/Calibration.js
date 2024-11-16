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
import CalibrationTable from "./CalibrationTable";
// import CompletedCases from "./CompletedCases";
// import PendingCases from "./PendingCases";
// import OngoingCases from "./OngoingCases";

const Calibration = (props) => {
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
    props.calibrationGetData(data);
    props.onUsersGetData(data);
    props.onRowsGetData(data);
    props.onCompanyGetData(data);
    props.onCustomerGetData(data);
    props.onColsGetData(data);
    props.onSensorGetData(data);
  }, []);


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
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="cases" className="bg-white">
            <Row>
              <Col sm="12" className="p-4">
                <CalibrationTable toggle={toggle} />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </React.Fragment>
    );

};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    cases: state.cases,
    cols: state.cols.cols,
    company: state.company.company,
    rows: state.rows.rows,
    users: state.users.users,
    calibration: state.calibration,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    calibrationGetData: (data) => dispatch(actions.calibrationGetData(data)),
    onPostCalibrationData: (data, user, toggle) => dispatch(actions.postCalibrationData(data, user, toggle)),
    onDeleteCalibration: (data, user_id) => dispatch(actions.deleteCalibration(data, user_id)),


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
export default connect(mapStateToProps, mapDispatchToProps)(Calibration);

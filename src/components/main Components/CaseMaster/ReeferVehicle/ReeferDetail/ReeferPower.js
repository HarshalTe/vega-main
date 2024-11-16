import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Label,
  InputGroup,
  FormGroup,
} from "reactstrap";

import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../../../../../views/custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../../../redux/action";
import Loader2 from "../../../../loader/Loader2";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../../../shared/baseUrl";
import swal from "sweetalert";

import ReeferGraph2 from "../ReeferGraph/ReeferGraph2";
import CircularProgress from "@material-ui/core/CircularProgress";
import Switch from "@mui/material/Switch";
import ON_TOGGLE3 from "../../../../../redux/action/ActionType3"
import ON_TOGGLE32 from "../../../../../redux/action/ActionType32"
import ON_TOGGLE33 from "../../../../../redux/action/ActionType33"
import { useDispatch } from "react-redux";
function ReeferPower(props) {
  const accessToken = `${props.login?.login?.token}`;
const param = useParams();

let data = {
  token: accessToken,
  id: param?.id,
  caseId: param?.id,
};
  React.useEffect(() => {
    props.getCasesDataPageDetail(data)
  },[]);
  const isEqualPage = function(data){
    return data?.case_id==param?.id
  }
  
  const pageIndex = props?.page?.page
  
  const idPage=pageIndex.filter(isEqualPage)
  const userIdPage=idPage[0]?.id
  
  const [checked, setChecked] = React.useState(idPage[0]?.power_cycle_1==1?false:true);
  const [checked2, setChecked2] = React.useState(idPage[0]?.power_cycle_2==1?false:true);
  const [checked3, setChecked3] = React.useState(idPage[0]?.power_cycle_3==1?false:true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    // dispatch(ON_TOGGLE2(checked))
    console.log(checked,"checked111222",userIdPage,event.target.checked)
    let user={
      "id": userIdPage,
    "power_cycle_1": event.target.checked==false? 1 : 0,
    }
    props.updatePageDetail(data,user)
  }
  const handleChange2 = (event) => {
    setChecked2(event.target.checked);
    // dispatch(ON_TOGGLE22(checked2))
    let user={
      "id": userIdPage,
    "power_cycle_2": event.target.checked==false? 1 : 0,
    }
    props.updatePageDetail(data,user)
  }
  const handleChange3 = (event) => {
    setChecked3(event.target.checked);
    // dispatch(ON_TOGGLE23(checked3))
    let user={
      "id": userIdPage,
    "power_cycle_3": event.target.checked==false? 1 : 0,
    }
    props.updatePageDetail(data,user)
  }
  
  
  const [postLoading, setPostLoading] = useState(false);

  const authAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const powerOnGraphData1 =
    props.editcase?.door_type_test?.length > 0
      ? props.editcase?.door_type_test.filter(
          (item) => 
          item.door_open_test_name === "Power Failure Test Cycle" ||
          item.door_open_test_name === "Power Failure Test Cycle-I"
        ).length > 0
        ? props.editcase?.door_type_test.filter(
            (item) => 
            item.door_open_test_name === "Power Failure Test Cycle" ||
            item.door_open_test_name === "Power Failure Test Cycle-I"
          )[0]
        : []
      : [];
  const powerOnGraphData2 =
    props.editcase?.door_type_test?.length > 0
      ? props.editcase?.door_type_test.filter(
          (item) => item.door_open_test_name === "Power Failure Test Cycle-II"
        ).length > 0
        ? props.editcase?.door_type_test.filter(
            (item) => item.door_open_test_name === "Power Failure Test Cycle-II"
          )[0]
        : []
      : [];
  const powerOnGraphData3 =
    props.editcase?.door_type_test?.length > 0
      ? props.editcase?.door_type_test.filter(
          (item) => item.door_open_test_name === "Power Failure Test Cycle-III"
        ).length > 0
        ? props.editcase?.door_type_test.filter(
            (item) => item.door_open_test_name === "Power Failure Test Cycle-III"
          )[0]
        : []
      : [];

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Cases:", values);

    const user = new FormData();

    user.append("case_id", values.case_id);
    user.append("sensor", values.sensor);
    user.append("file", values.file);

    console.log("Data of cases:", user);
    setPostLoading(true);

    authAxios
      .post("/import", user)
      .then((res) => {
        console.log("res of excel upload", res);
        swal("Successfully uploaded Excel").then(() => {
          props.onTestsGetData(data);
          props.onRawDataGetData(data);
          props.testsEditGetData(data);
          setSubmitting(false);
          setPostLoading(false);
          return (
            <>
              <ReeferGraph2 />
            </>
          );
        });
      })
      .catch((err) => {
        console.log("error of excel upload", err.response);
        setSubmitting(false);
        setPostLoading(false);
      });
    setSubmitting(true);
    return;
  };
  const graphID =  props.testType?.testType?.length > 0 ? 
  props.testType?.testType
    ?.filter(
      (type) =>
      type.type_room == "Reefer Vehicle" &&
      !type.name
      ?.toLowerCase()
      .includes("WITHOUT AMBIENT".trim().toLowerCase())
      ):[]
      
const graphID1 = graphID?.length > 0 ?
  graphID?.filter(
      (item) =>
        item?.name === "POWER FAILURE TEST CYCLE" ||
        item?.name === "POWER FAILURE TEST CYCLE-I"
    )
  : [];
const graphID2 = graphID?.length > 0 ?
  graphID?.filter(
      (item) =>
        item?.name === "POWER FAILURE TEST CYCLE-II"
    )
  : [];
const graphID3 = graphID?.length > 0 ?
  graphID?.filter(
      (item) =>
        item?.name === "POWER FAILURE TEST CYCLE-III"
    )
  : [];
  console.log("object222",graphID,graphID1,graphID2,graphID3,"ee",graphID1[0]?.id,graphID3[0]?.id)

  return (
    <Card>
      <CardHeader className="bg-success text-white">
        <div className="">
          <i className="fa fa-home mr-1" />
          <strong>
            Trend For Power Failure Test Cycle (Temperature Vs Time){" "}
          </strong>
        </div>
        Show
          <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
      />
      Hide
      </CardHeader>
      <CardBody>
        {/* <Formik
          initialValues={{
            file: "",
            sensor: "",
            case_id: param?.id,
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object().shape({
            sensor: Yup.string().required("required"),
            file: Yup.string().required("required"),
          })}
        >
          {(formProps) => {
            return (
              <Form>
                <Row className="form-group">
                  <Col
                    md={4}
                    className="d-flex flex-column justify-content-end"
                  >
                    <Label for="sensor">Sensor Name</Label>
                    <FormGroup>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="sensor"
                          id="sensor"
                          placeholder="Sensor Name"
                          className={
                            "form-control" +
                            (formProps.errors.sensor && formProps.touched.sensor
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="sensor"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <Label for="capacity">Excel File</Label>
                    <InputGroup>
                      {props.cases?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <input
                          component={CustomInput}
                          type="file"
                          name="file"
                          id="file"
                          onChange={(event) => {
                            formProps.setFieldValue(
                              "file",
                              event.currentTarget.files[0]
                            );
                          }}
                          className={
                            "form-control" +
                            (formProps.errors.file && formProps.touched.file
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                      <ErrorMessage
                        name="file"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>

                  <Col
                    md={4}
                    className="d-flex justify-content-start align-items-end"
                  >
                    {postLoading && <CircularProgress />}
                  </Col>
                </Row>

                <Row style={{ justifyContent: "center" }}>
                  <Col md={4}>
                    <Button type="reset" color="danger" block>
                      <b>Reset</b>
                    </Button>
                  </Col>
                  <Col md={4}>
                    <Button
                      type="submit"
                      disabled={formProps.isSubmitting}
                      color="primary"
                      block
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik> */}
      </CardBody>
      {/* <ReeferGraph2
        test_id={graphID1[0]?.id}
        testName="POWER FAILURE TEST CYCLE-I (WITH AMBIENT)"
        x_min_excersion={powerOnGraphData1?.x_min_excersion ?? ""}
        x_max_excersion={powerOnGraphData1?.x_max_excersion ?? ""}
        y_min_excersion={powerOnGraphData1?.y_min_excersion ?? ""}
        y_max_excersion={powerOnGraphData1?.y_max_excersion ?? ""}
        x_min_recovery={powerOnGraphData1?.x_min_recovery ?? ""}
        x_max_recovery={powerOnGraphData1?.x_max_recovery ?? ""}
        y_min_recovery={powerOnGraphData1?.y_min_recovery ?? ""}
        y_max_recovery={powerOnGraphData1?.y_max_recovery ?? ""}
      />
      <ReeferGraph2
        test_id={graphID1[0]?.id}
        testName="POWER FAILURE TEST CYCLE-I (WITHOUT AMBIENT)"
        x_min_excersion={powerOnGraphData1?.x_min_excersion ?? ""}
        x_max_excersion={powerOnGraphData1?.x_max_excersion ?? ""}
        y_min_excersion={powerOnGraphData1?.y_min_excersion ?? ""}
        y_max_excersion={powerOnGraphData1?.y_max_excersion ?? ""}
        x_min_recovery={powerOnGraphData1?.x_min_recovery ?? ""}
        x_max_recovery={powerOnGraphData1?.x_max_recovery ?? ""}
        y_min_recovery={powerOnGraphData1?.y_min_recovery ?? ""}
        y_max_recovery={powerOnGraphData1?.y_max_recovery ?? ""}
      /> */}
      <CardHeader className="bg-success text-white">
        <div className="">
          <i className="fa fa-home mr-1" />
          <strong>
            Trend For Power Failure Test Cycle-II (Temperature Vs Time){" "}
          </strong>
        </div>
        Show
        <Switch
      checked={checked2}
      onChange={handleChange2}
      inputProps={{ 'aria-label': 'controlled' }}
      />
      Hide
      </CardHeader>
      {/* <ReeferGraph2
        test_id={graphID2[0]?.id}
        testName="POWER FAILURE TEST CYCLE-II (WITH AMBIENT)"
        x_min_excersion={powerOnGraphData2?.x_min_excersion ?? ""}
        x_max_excersion={powerOnGraphData2?.x_max_excersion ?? ""}
        y_min_excersion={powerOnGraphData2?.y_min_excersion ?? ""}
        y_max_excersion={powerOnGraphData2?.y_max_excersion ?? ""}
        x_min_recovery={powerOnGraphData2?.x_min_recovery ?? ""}
        x_max_recovery={powerOnGraphData2?.x_max_recovery ?? ""}
        y_min_recovery={powerOnGraphData2?.y_min_recovery ?? ""}
        y_max_recovery={powerOnGraphData2?.y_max_recovery ?? ""}
      />
      <ReeferGraph2
        test_id={graphID2[0]?.id}
        testName="POWER FAILURE TEST CYCLE-II (WITHOUT AMBIENT)"
        x_min_excersion={powerOnGraphData2?.x_min_excersion ?? ""}
        x_max_excersion={powerOnGraphData2?.x_max_excersion ?? ""}
        y_min_excersion={powerOnGraphData2?.y_min_excersion ?? ""}
        y_max_excersion={powerOnGraphData2?.y_max_excersion ?? ""}
        x_min_recovery={powerOnGraphData2?.x_min_recovery ?? ""}
        x_max_recovery={powerOnGraphData2?.x_max_recovery ?? ""}
        y_min_recovery={powerOnGraphData2?.y_min_recovery ?? ""}
        y_max_recovery={powerOnGraphData2?.y_max_recovery ?? ""}
      /> */}
      <CardHeader className="bg-success text-white">
        <div className="">
          <i className="fa fa-home mr-1" />
          <strong>
            Trend For Power Failure Test Cycle-III (Temperature Vs Time){" "}
          </strong>
        </div>
        Show
        <Switch
      checked={checked3}
      onChange={handleChange3}
      inputProps={{ 'aria-label': 'controlled' }}
      />
      Hide
      </CardHeader>
      {/* <ReeferGraph2
        test_id={graphID3[0]?.id}
        testName="POWER FAILURE TEST CYCLE-III (WITH AMBIENT)"
        x_min_excersion={powerOnGraphData3?.x_min_excersion ?? ""}
        x_max_excersion={powerOnGraphData3?.x_max_excersion ?? ""}
        y_min_excersion={powerOnGraphData3?.y_min_excersion ?? ""}
        y_max_excersion={powerOnGraphData3?.y_max_excersion ?? ""}
        x_min_recovery={powerOnGraphData3?.x_min_recovery ?? ""}
        x_max_recovery={powerOnGraphData3?.x_max_recovery ?? ""}
        y_min_recovery={powerOnGraphData3?.y_min_recovery ?? ""}
        y_max_recovery={powerOnGraphData3?.y_max_recovery ?? ""}
      />
      <ReeferGraph2
        test_id={graphID3[0]?.id}
        testName="POWER FAILURE TEST CYCLE-III (WITHOUT AMBIENT)"
        x_min_excersion={powerOnGraphData3?.x_min_excersion ?? ""}
        x_max_excersion={powerOnGraphData3?.x_max_excersion ?? ""}
        y_min_excersion={powerOnGraphData3?.y_min_excersion ?? ""}
        y_max_excersion={powerOnGraphData3?.y_max_excersion ?? ""}
        x_min_recovery={powerOnGraphData3?.x_min_recovery ?? ""}
        x_max_recovery={powerOnGraphData3?.x_max_recovery ?? ""}
        y_min_recovery={powerOnGraphData3?.y_min_recovery ?? ""}
        y_max_recovery={powerOnGraphData3?.y_max_recovery ?? ""}
      /> */}
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    cases: state.cases,
    editcase: state.cases.editcase,
    tests: state.tests.tests,
    testType: state.testType,
    page: state.page,
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCasesDataPageDetail: (data) => dispatch(actions.getCasesDataPageDetail(data)),
    postCasesDataPageDetail: (data, user) =>dispatch(actions.postCasesDataPageDetail(data, user)),
    updatePageDetail: (data, user) =>dispatch(actions.updatePageDetail(data, user)),
    onRawDataGetData: (data) => dispatch(actions.rawDataGetData(data)),
    testsEditGetData: (data) => dispatch(actions.testsEditGetData(data)),
    onTestsGetData: (data) => dispatch(actions.testsGetData(data)),
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
export default connect(mapStateToProps, mapDispatchToProps)(ReeferPower);

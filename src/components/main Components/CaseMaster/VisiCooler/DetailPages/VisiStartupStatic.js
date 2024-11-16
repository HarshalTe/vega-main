import React, { useState } from "react";
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

import { Formik, Form, ErrorMessage, Field } from "formik";
import CustomInput from "../../../../../views/custom/CustomInput";
import FinalReportVegaGraph2 from "../../vegasGraph/FinalReportVegaGraph2";
import * as Yup from "yup";
import { connect } from "react-redux";

import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../../../shared/baseUrl";
import swal from "sweetalert";

import FinalReportVegaGraph from "../../vegasGraph/FinalReportVegaGraph";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as actions from "../../../../../redux/action";
import Loader2 from "../../../../loader/Loader2";
import Switch from "@mui/material/Switch";
import ON_TOGGLE42 from "../../../../../redux/action/ActionType42"
import ON_TOGGLE43 from "../../../../../redux/action/ActionType43"
import ON_TOGGLE4 from "../../../../../redux/action/ActionType4"
import { useDispatch } from "react-redux";

function VisiStartupStatic(props) {
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
    
    const [checked, setChecked] = React.useState(idPage[0]?.static_cycle_1==1?false:true);
    const [checked2, setChecked2] = React.useState(idPage[0]?.static_cycle_2==1?false:true);
    const [checked3, setChecked3] = React.useState(idPage[0]?.static_cycle_3==1?false:true);
  
    const handleChange = (event) => {
      setChecked(event.target.checked);
      // dispatch(ON_TOGGLE2(checked))
      console.log(checked,"checked111222",userIdPage,event.target.checked)
      let user={
        "id": userIdPage,
      "static_cycle_1": event.target.checked==false? 1 : 0,
      }
      props.updatePageDetail(data,user)
    }
    const handleChange2 = (event) => {
      setChecked2(event.target.checked);
      // dispatch(ON_TOGGLE22(checked2))
      let user={
        "id": userIdPage,
      "static_cycle_2": event.target.checked==false? 1 : 0,
      }
      props.updatePageDetail(data,user)
    }
    const handleChange3 = (event) => {
      setChecked3(event.target.checked);
      // dispatch(ON_TOGGLE23(checked3))
      let user={
        "id": userIdPage,
      "static_cycle_3": event.target.checked==false? 1 : 0,
      }
      props.updatePageDetail(data,user)
    }
  // const [checked, setChecked] = React.useState(true);
  // const [checked2, setChecked2] = React.useState(true);
  // const [checked3, setChecked3] = React.useState(true);
  // // console.log(props,"dddddd")
  
  // const handleChange = (event) => {
  //   setChecked(event.target.checked);
  //   dispatch(ON_TOGGLE4(checked))
  //   console.log(checked,"checked")
  // }
  // const handleChange2 = (event) => {
  //   setChecked2(event.target.checked);
  //   dispatch(ON_TOGGLE42(checked2))
  //   console.log(checked2,"checked")
  // }
  // const handleChange3 = (event) => {
  //   setChecked3(event.target.checked);
  //   dispatch(ON_TOGGLE43(checked3))
  //   console.log(checked3,"checked")
  // }
  const dispatch = useDispatch();

  const [postLoading, setPostLoading] = useState(false);

  const authAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const staticGraphData1 =
  props.editcase?.door_type_test?.length > 0
  ? props.editcase?.door_type_test.filter(
    (item) => 
    item.door_open_test_name === "Start Up Study Test Cycle"||
    item.door_open_test_name === "Start Up Study Test Cycle-I"
    ).length > 0
    ? props.editcase?.door_type_test.filter(
      (item) => 
      item.door_open_test_name === "Start Up Study Test Cycle"||
      item.door_open_test_name === "Start Up Study Test Cycle-I"
      )[0]
      : []
      : [];
  const staticGraphData2 =
  props.editcase?.door_type_test?.length > 0
  ? props.editcase?.door_type_test.filter(
    (item) => item.door_open_test_name === "Start Up Study Test Cycle-II"
    ).length > 0
    ? props.editcase?.door_type_test.filter(
      (item) => item.door_open_test_name === "Start Up Study Test Cycle-II"
      )[0]
      : []
      : [];
  const staticGraphData3 =
  props.editcase?.door_type_test?.length > 0
  ? props.editcase?.door_type_test.filter(
    (item) => item.door_open_test_name === "Start Up Study Test Cycle-III"
    ).length > 0
    ? props.editcase?.door_type_test.filter(
      (item) => item.door_open_test_name === "Start Up Study Test Cycle-III"
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
          setSubmitting(false);
          props.onTestsGetData(data);
          props.onRawDataGetData(data);
          props.testsEditGetData(data);
          setPostLoading(false);
          return (
            <>
              <FinalReportVegaGraph />
            </>
          );
        });
      })
      .catch((err) => {
        console.log("error of excel upload", err.response);
        setPostLoading(false);
        setSubmitting(false);
      });
    setSubmitting(true);
    // props.toggle("area");
    return;
  };
  const graphID =  props.testType?.testType?.length > 0 ? 
  props.testType?.testType
    ?.filter(
      (type) =>
      type.type_room == props?.editcase?.type_of_room &&
      !type.name
      ?.toLowerCase()
      .includes("WITHOUT AMBIENT".trim().toLowerCase())
      ):[]
      
const graphID1 = graphID?.length > 0 ?
  graphID?.filter(
      (item) =>
        item?.name === "START UP STUDY TEST CYCLE" ||
        item?.name === "START UP STUDY TEST CYCLE-I"
    )
  : [];
const graphID2 = graphID?.length > 0 ?
  graphID?.filter(
      (item) =>
        item?.name === "START UP STUDY TEST CYCLE-II"
    )
  : [];
const graphID3 = graphID?.length > 0 ?
  graphID?.filter(
      (item) =>
        item?.name === "START UP STUDY TEST CYCLE-III"
    )
  : [];
  console.log("object222",graphID,graphID1,graphID2,graphID3,"ee",graphID1[0]?.id,graphID3[0]?.id)

  return (
    <Card>
      <CardHeader className="bg-success text-white">
        <div className="">
          <i className="fa fa-home mr-1" />
          <strong>
            Trend For Start Up Study Test Cycle (Temperature Vs Time)
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
      <br/>
      {/* <CardBody>
      </CardBody> */}
      {/* <FinalReportVegaGraph2
        test_id={graphID1[0]?.id}
        testName="START UP STUDY TEST CYCLE-I (WITH AMBIENT)"
        x_min_excersion={staticGraphData1?.x_min_excersion ?? ""}
        x_max_excersion={staticGraphData1?.x_max_excersion ?? ""}
        y_min_excersion={staticGraphData1?.y_min_excersion ?? ""}
        y_max_excersion={staticGraphData1?.y_max_excersion ?? ""}
        x_min_recovery={staticGraphData1?.x_min_recovery ?? ""}
        x_max_recovery={staticGraphData1?.x_max_recovery ?? ""}
        y_min_recovery={staticGraphData1?.y_min_recovery ?? ""}
        y_max_recovery={staticGraphData1?.y_max_recovery ?? ""}
        />
        <FinalReportVegaGraph2
        test_id={graphID1[0]?.id}
        testName="START UP STUDY TEST CYCLE-I (WITHOUT AMBIENT)"
        x_min_excersion={staticGraphData1?.x_min_excersion ?? ""}
        x_max_excersion={staticGraphData1?.x_max_excersion ?? ""}
        y_min_excersion={staticGraphData1?.y_min_excersion ?? ""}
        y_max_excersion={staticGraphData1?.y_max_excersion ?? ""}
        x_min_recovery={staticGraphData1?.x_min_recovery ?? ""}
        x_max_recovery={staticGraphData1?.x_max_recovery ?? ""}
        y_min_recovery={staticGraphData1?.y_min_recovery ?? ""}
        y_max_recovery={staticGraphData1?.y_max_recovery ?? ""}
      /> */}
       <CardHeader className="bg-success text-white">
        <div className="">
          <i className="fa fa-home mr-1" />
          <strong>
            Trend For Start Up Study Test Cycle-II (Temperature Vs Time)
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
      <br/>
      {/* <FinalReportVegaGraph2
        test_id={graphID2[0]?.id}
        testName="START UP STUDY TEST CYCLE-II (WITH AMBIENT)"
        x_min_excersion={staticGraphData2?.x_min_excersion ?? ""}
        x_max_excersion={staticGraphData2?.x_max_excersion ?? ""}
        y_min_excersion={staticGraphData2?.y_min_excersion ?? ""}
        y_max_excersion={staticGraphData2?.y_max_excersion ?? ""}
        x_min_recovery={staticGraphData2?.x_min_recovery ?? ""}
        x_max_recovery={staticGraphData2?.x_max_recovery ?? ""}
        y_min_recovery={staticGraphData2?.y_min_recovery ?? ""}
        y_max_recovery={staticGraphData2?.y_max_recovery ?? ""}
      />
      <FinalReportVegaGraph2
        test_id={graphID2[0]?.id}
        testName="START UP STUDY TEST CYCLE-II (WITHOUT AMBIENT)"
        x_min_excersion={staticGraphData2?.x_min_excersion ?? ""}
        x_max_excersion={staticGraphData2?.x_max_excersion ?? ""}
        y_min_excersion={staticGraphData2?.y_min_excersion ?? ""}
        y_max_excersion={staticGraphData2?.y_max_excersion ?? ""}
        x_min_recovery={staticGraphData2?.x_min_recovery ?? ""}
        x_max_recovery={staticGraphData2?.x_max_recovery ?? ""}
        y_min_recovery={staticGraphData2?.y_min_recovery ?? ""}
        y_max_recovery={staticGraphData2?.y_max_recovery ?? ""}
      /> */}
       <CardHeader className="bg-success text-white">
        <div className="">
          <i className="fa fa-home mr-1" />
          <strong>
            Trend For Start Up Study Test Cycle-III (Temperature Vs Time)
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
      {/* <FinalReportVegaGraph2
        test_id={graphID3[0]?.id}
        testName="START UP STUDY TEST CYCLE-III (WITH AMBIENT)"
        x_min_excersion={staticGraphData3?.x_min_excersion ?? ""}
        x_max_excersion={staticGraphData3?.x_max_excersion ?? ""}
        y_min_excersion={staticGraphData3?.y_min_excersion ?? ""}
        y_max_excersion={staticGraphData3?.y_max_excersion ?? ""}
        x_min_recovery={staticGraphData3?.x_min_recovery ?? ""}
        x_max_recovery={staticGraphData3?.x_max_recovery ?? ""}
        y_min_recovery={staticGraphData3?.y_min_recovery ?? ""}
        y_max_recovery={staticGraphData3?.y_max_recovery ?? ""}
      />
      <FinalReportVegaGraph2
        test_id={graphID3[0]?.id}
        testName="START UP STUDY TEST CYCLE-III (WITHOUT AMBIENT)"
        x_min_excersion={staticGraphData3?.x_min_excersion ?? ""}
        x_max_excersion={staticGraphData3?.x_max_excersion ?? ""}
        y_min_excersion={staticGraphData3?.y_min_excersion ?? ""}
        y_max_excersion={staticGraphData3?.y_max_excersion ?? ""}
        x_min_recovery={staticGraphData3?.x_min_recovery ?? ""}
        x_max_recovery={staticGraphData3?.x_max_recovery ?? ""}
        y_min_recovery={staticGraphData3?.y_min_recovery ?? ""}
        y_max_recovery={staticGraphData3?.y_max_recovery ?? ""}
      /> */}
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    cases: state.cases,
    editcase: state.cases.editcase,
    testType: state.testType,
    tests: state.tests,
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
    onTestTypeGetData: (data) => dispatch(actions.testTypeGetData(data)),
    onDeleteTestType: (data, id) => dispatch(actions.deleteTestType(data, id)),
    onPostTestTypeData: (data, user, toggle) =>
      dispatch(actions.postTestTypeData(data, user, toggle)),
    onUpdateTestTypeData: (data, user, toggle) =>
      dispatch(actions.updateTestTypeData(data, user, toggle)),
    casesEditGetData: (data) => dispatch(actions.casesEditGetData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VisiStartupStatic);

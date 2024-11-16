/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../../../../redux/action";
import RHeader from "../FinalReport/RHeader";
// import "./FinalReport.css";
import "../FinalReport/FinalReport.css";
import MainHeader from "../FinalReport/MainHeader";
import Loader2 from "../../../../loader/Loader2";
import VegasGraph from "../../vegasGraph/VegasGraph";
import FinalReportVegaGraph2 from "../../vegasGraph/FinalReportVegaGraph2";
import printJS from "print-js";
import { Button } from "reactstrap";
import dateFormat from "dateformat";
import FinalReportVegaGraph from "../../vegasGraph/FinalReportVegaGraph";
import { DateFormat } from "../../../../DateFormat/DateFormat";
import CircularLoader from "../../../../loader/CircularLoader";
import { imageUrl } from "./../../../../../shared/imageUrl";
import mkt from "../../../../../assets/mkt/newForImg.jpg";
import { DataTime } from "../../../../../../src/components/DateFormat/DataTime";
import { useSelector } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { display } from "@mui/system";


const font14Bold={fontSize:"20px",fontWeight:"600"}


function FinalReport(props) {
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
    

    
    const idPage=pageIndex?.filter(isEqualPage)
    // const userIdPage=idPage[0]?.id


  const myState = idPage[0]?.door_cycle_1==0?false:true
  const myState12 = idPage[0]?.door_cycle_2==0?false:true
  const myState13 = idPage[0]?.door_cycle_3==0?false:true
  const myState2 = idPage[0]?.continuous_cycle_1==0?false:true
  const myState22 = idPage[0]?.continuous_cycle_2==0?false:true
  const myState23 = idPage[0]?.continuous_cycle_3==0?false:true
  const myState3 = idPage[0]?.power_cycle_1==0?false:true
  const myState32 = idPage[0]?.power_cycle_2==0?false:true
  const myState33 = idPage[0]?.power_cycle_3==0?false:true
  const myState4 = idPage[0]?.static_cycle_1==0?false:true
  const myState42 = idPage[0]?.static_cycle_2==0?false:true
  const myState43 = idPage[0]?.static_cycle_3==0?false:true
  const myState5 = idPage[0]?.remark==0?false:true
  const myState6 = idPage[0]?.risk==0?false:true
  const myStateAc = idPage[0]?.ac==0?false:true
  // const myState = useSelector((state) => state.checked);
  // const myState12 = useSelector((state) => state.checked12);
  // const myState13 = useSelector((state) => state.checked13);
  // const myState2 = useSelector((state) => state.checked2);
  // const myState22 = useSelector((state) => state.checked22);
  // const myState23 = useSelector((state) => state.checked23);
  // const myState3 = useSelector((state) => state.checked3);
  // const myState32 = useSelector((state) => state.checked32);
  // const myState33 = useSelector((state) => state.checked33);
  // const myState4 = useSelector((state) => state.checked4);
  // const myState42 = useSelector((state) => state.checked42);
  // const myState43 = useSelector((state) => state.checked43);
  // const myState5 = useSelector((state) => state.checked5);
  // const myState6 = useSelector((state) => state.checked6);
  // const myStateAc = useSelector((state) => state.checkedAc);
  // console.log("Door open", myState, "1",props);
  // console.log("Door open2", myState12, "1");
  // console.log("Door open3", myState13, "1");
  // console.log("Continuous Operation", myState2, "2");
  // console.log("Continuous Operation2", myState22, "2");
  // console.log("Continuous Operation3", myState23, "2");
  // console.log("Power Failure", myState3, "3");
  // console.log("Power Failure2", myState32, "3");
  // console.log("Power Failure3", myState33, "3");
  // console.log("startup", myState4, "4");
  // console.log("startup2", myState42, "4");
  // console.log("startup3", myState43, "4");
  // console.log("remark", myState5, "5");
  // console.log("risk", myState6, "6");
  // console.log("AC", myStateAc, "7");
  const ExcelFields = useSelector((state) => state.excelFields);

  const MyState = ""+myState
  const MyState2 = ""+myState2
  const MyState22 = ""+myState22
  const MyState23 = ""+myState23
  const MyState3 = ""+myState3
  const MyState32 = ""+myState32
  const MyState33 = ""+myState33
  const MyState4 = ""+myState4
  const MyState42 = ""+myState42
  const MyState43 = ""+myState43
  const MyState5 = ""+myState5
  const MyState6 = ""+myState6
  const MyState12 = ""+myState12
  const MyState13 = ""+myState13
  const MyStateAc = ""+myStateAc
  // const accessToken = `${props.login?.login?.token}`;
  let data2 = {
    token: accessToken,
    id: param?.id,
  };
  
  React.useEffect(() => {
    props.onSheetGetData(data2)


  },[])
  const AcData=props.ac?.ac
  
  
  const isEqual = function(data){
    // console.log("object",data.cases_id)
    return data.cases_id==param.id
  }
  
  const paraAc=AcData.filter(isEqual)
  // console.log(props.ac?.ac,"kkk",props,param.id,paraAc);
  // let data = {
  //   token: accessToken,
  //   id: param?.id,
  // };

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
  const p =
    props.parameterData?.length > 0
      ? props.parameterData
        ?.filter(
          (c) =>
            !c?.sensor?.toLowerCase().includes("AMB".trim().toLowerCase())
        )
        .map((d) => d.avg)
      : [];
  const Minimum = Math.min(...p);

  const Maximum = Math.max(...p);

  const user_id = props.editcase?.user_id ?? "";

  const userCertificate =
    props.users
      ?.filter((user) => user?.files?.length > 0)
      ?.filter((user) => user?.id == user_id)?.length > 0
      ? props.users
        ?.filter((user) => user?.files?.length > 0)
        ?.filter((user) => user?.id == user_id)[0]?.files
      : [];

  const sensorData =
    props.editsensor?.length > 0 ? props.editsensor.map((s) => s.sensor) : [];

  const sensorCertificate =
    props.sensor.length > 0
      ? props.sensor.filter((s) => sensorData.includes(s.name)).length > 0
        ? props.sensor.filter((s) => sensorData.includes(s.name))
        : []
      : [];
  function hasDecimal(num) {
    return !!(num % 1);
  }

  const companyAddress = props.companyAddress ?? "";

  const schematic_1 =
  props.editcase?.files?.length > 0
    ? props.editcase?.files?.filter((item) => item.name == "schematic_1")[0]
    : "";
const isometric_1 =
  props.editcase?.files?.length > 0
    ? props.editcase?.files?.filter((item) => item.name == "isometric_1")[0]
    : "";
  const schematic_2 =
  props.editcase?.files?.length > 0
    ? props.editcase?.files?.filter((item) => item.name == "schematic_2")[0]
    : "";
const isometric_2 =
  props.editcase?.files?.length > 0
    ? props.editcase?.files?.filter((item) => item.name == "isometric_2")[0]
    : "";
  const schematic_3 =
  props.editcase?.files?.length > 0
    ? props.editcase?.files?.filter((item) => item.name == "schematic_3")[0]
    : "";
const isometric_3 =
  props.editcase?.files?.length > 0
    ? props.editcase?.files?.filter((item) => item.name == "isometric_3")[0]
    : "";
  const schematic_4 =
  props.editcase?.files?.length > 0
    ? props.editcase?.files?.filter((item) => item.name == "schematic_4")[0]
    : "";
const isometric_4 =
  props.editcase?.files?.length > 0
    ? props.editcase?.files?.filter((item) => item.name == "isometric_4")[0]
    : "";
  const schematic_5 =
  props.editcase?.files?.length > 0
    ? props.editcase?.files?.filter((item) => item.name == "schematic_5")[0]
    : "";
const isometric_5 =
  props.editcase?.files?.length > 0
    ? props.editcase?.files?.filter((item) => item.name == "isometric_5")[0]
    : "";
  const schematic_6 =
  props.editcase?.files?.length > 0
    ? props.editcase?.files?.filter((item) => item.name == "schematic_6")[0]
    : "";
const isometric_6 =
  props.editcase?.files?.length > 0
    ? props.editcase?.files?.filter((item) => item.name == "isometric_6")[0]
    : "";
  const schematic_7 =
  props.editcase?.files?.length > 0
    ? props.editcase?.files?.filter((item) => item.name == "schematic_7")[0]
    : "";

  const filterDiagram = props.editcase?.files?.length > 0
    ? props.editcase?.files?.filter((item) => item?.name != "hot_spot" && item?.name != "cold_spot")
    : "";
  const filterDiagram2 = props.editcase?.files?.length > 0
    ? props.editcase?.files?.filter((item) => item?.name != "schematic_1" && item?.name != "schematic_2" && item?.name != "schematic_3" && item?.name != "schematic_4" && item?.name != "schematic_5" && item?.name != "schematic_6" && item?.name != "schematic_7" && item?.name != "isometric_1" && item?.name != "isometric_2" && item?.name != "isometric_3" && item?.name != "isometric_4" && item?.name != "isometric_5" && item?.name != "isometric_6" && item?.name != "postion_logger_1" && item?.name != "postion_logger_2" && item?.name != "postion_logger_3" && item?.name != "postion_logger_4" && item?.name != "postion_logger_5")
    : "";
// console.log("filterDiagram",filterDiagram2,filterDiagram,props.editcase?.files)

  const postion_logger_1 =
  props.editcase?.files?.length > 0
    ? props.editcase?.files?.filter((item) => item.name == "postion_logger_1")[0]
    : "";
  const postion_logger_2 =
  props.editcase?.files?.length > 0
    ? props.editcase?.files?.filter((item) => item.name == "postion_logger_2")[0]
    : "";
  const postion_logger_3 =
  props.editcase?.files?.length > 0
    ? props.editcase?.files?.filter((item) => item.name == "postion_logger_3")[0]
    : "";
  const postion_logger_4 =
  props.editcase?.files?.length > 0
    ? props.editcase?.files?.filter((item) => item.name == "postion_logger_4")[0]
    : "";
  const postion_logger_5 =
  props.editcase?.files?.length > 0
    ? props.editcase?.files?.filter((item) => item.name == "postion_logger_5")[0]
    : "";

  // // console.log("companyAddress", props.editcase?.files?.length,props?.sheet?.sheet?.data.length);

  const hotSpotImage =
    props.editcase?.files?.length > 0
      ? props.editcase?.files.filter((item) => item.name == "hot_spot")[0]
      : "";
  const coldSpotImage =
    props.editcase?.files?.length > 0
      ? props.editcase?.files.filter((item) => item.name == "cold_spot")[0]
      : "";
  const postiionLogger1 =
    props.editcase?.files?.length > 0
      ? props.editcase?.files.filter(
        (item) => item.name == "postion_logger_1"
      )[0]
      : "";
  const postiionLogger2 =
    props.editcase?.files?.length > 0
      ? props.editcase?.files.filter(
        (item) => item.name == "postion_logger_2"
      )[0]
      : "";
  const postiionLogger3 =
    props.editcase?.files?.length > 0
      ? props.editcase?.files.filter(
        (item) => item.name == "postion_logger_3"
      )[0]
      : "";
  const postiionLogger4 =
    props.editcase?.files?.length > 0
      ? props.editcase?.files.filter(
        (item) => item.name == "postion_logger_4"
      )[0]
      : "";
  const postiionLogger5 =
    props.editcase?.files?.length > 0
      ? props.editcase?.files.filter(
        (item) => item.name == "postion_logger_5"
      )[0]
      : "";

      const staticGraphData =
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

  const continuousGraphData =
    props.editcase?.door_type_test?.length > 0
      ? props.editcase?.door_type_test.filter(
        (item) =>
          item.door_open_test_name === "Continuous Operation Test Cycle"||
          item.door_open_test_name === "Continuous Operation Test Cycle-I"
      ).length > 0
        ? props.editcase?.door_type_test.filter(
          (item) =>
            item.door_open_test_name === "Continuous Operation Test Cycle"||
            item.door_open_test_name === "Continuous Operation Test Cycle-I"
        )[0]
        : []
      : [];
  const continuousGraphData2 =
    props.editcase?.door_type_test?.length > 0
      ? props.editcase?.door_type_test.filter(
        (item) =>
          item.door_open_test_name === "Continuous Operation Test Cycle-II"
      ).length > 0
        ? props.editcase?.door_type_test.filter(
          (item) =>
            item.door_open_test_name === "Continuous Operation Test Cycle-II"
        )[0]
        : []
      : [];
  const continuousGraphData3 =
    props.editcase?.door_type_test?.length > 0
      ? props.editcase?.door_type_test.filter(
        (item) =>
          item.door_open_test_name === "Continuous Operation Test Cycle-III"
      ).length > 0
        ? props.editcase?.door_type_test.filter(
          (item) =>
            item.door_open_test_name === "Continuous Operation Test Cycle-III"
        )[0]
        : []
      : [];


  const doorOpenGraphData1 =
    props.editcase?.door_type_test?.length > 0
      ? props.editcase?.door_type_test.filter(
        (item) =>
          item.door_open_test_name === "Door Open Test Cycle" ||
          item.door_open_test_name === "Door Open Test Cycle-I"
      ).length > 0
        ? props.editcase?.door_type_test.filter(
          (item) =>
            item.door_open_test_name === "Door Open Test Cycle" ||
            item.door_open_test_name === "Door Open Test Cycle-I"
        )[0]
        : []
      : [];

  const doorOpenGraphData2 =
    props.editcase?.door_type_test?.length > 0
      ? props.editcase?.door_type_test.filter(
        (item) => item.door_open_test_name === "Door Open Test Cycle-II"
      ).length > 0
        ? props.editcase?.door_type_test.filter(
          (item) => item.door_open_test_name === "Door Open Test Cycle-II"
        )[0]
        : []
      : [];

  const doorOpenGraphData3 =
    props.editcase?.door_type_test?.length > 0
      ? props.editcase?.door_type_test.filter(
        (item) => item.door_open_test_name === "Door Open Test Cycle-III"
      ).length > 0
        ? props.editcase?.door_type_test.filter(
          (item) => item.door_open_test_name === "Door Open Test Cycle-III"
        )[0]
        : []
      : [];

      const powerOnGraphData =
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

        const graphID =  props.testType?.testType?.length > 0 ? 
    props.testType?.testType
      ?.filter(
        (type) =>
        type.type_room == props?.editcase?.type_of_room &&
        !type.name
        ?.toLowerCase()
        .includes("WITHOUT AMBIENT".trim().toLowerCase())
        ):[]
        
const Continuous1 = graphID?.length > 0 ?
    graphID?.filter(
        (item) =>
          item?.name === "CONTINUOUS OPERATION TEST CYCLE" ||
          item?.name === "CONTINUOUS OPERATION TEST CYCLE-I"
      )
    : [];
const Continuous2 = graphID?.length > 0 ?
    graphID?.filter(
        (item) =>
          item?.name === "CONTINUOUS OPERATION TEST CYCLE-II"
      )
    : [];
const Continuous3 = graphID?.length > 0 ?
    graphID?.filter(
        (item) =>
          item?.name === "CONTINUOUS OPERATION TEST CYCLE-III"
      )
    : [];

        
const door1 = graphID?.length > 0 ?
    graphID?.filter(
        (item) =>
          item?.name === "DOOR OPEN TEST CYCLE" ||
          item?.name === "DOOR OPEN TEST CYCLE-I"
      )
    : [];
const door2 = graphID?.length > 0 ?
    graphID?.filter(
        (item) =>
          item?.name === "DOOR OPEN TEST CYCLE-II"
      )
    : [];
const door3 = graphID?.length > 0 ?
    graphID?.filter(
        (item) =>
          item?.name === "DOOR OPEN TEST CYCLE-III"
      )
    : [];

    const static1 = graphID?.length > 0 ?
    graphID?.filter(
        (item) =>
          item?.name === "START UP STUDY TEST CYCLE" ||
          item?.name === "START UP STUDY TEST CYCLE-I"
      )
    : [];
const static2 = graphID?.length > 0 ?
    graphID?.filter(
        (item) =>
          item?.name === "START UP STUDY TEST CYCLE-II"
      )
    : [];
const static3 = graphID?.length > 0 ?
    graphID?.filter(
        (item) =>
          item?.name === "START UP STUDY TEST CYCLE-III"
      )
    : [];

    const power1 = graphID?.length > 0 ?
  graphID?.filter(
      (item) =>
        item?.name === "POWER FAILURE TEST CYCLE" ||
        item?.name === "POWER FAILURE TEST CYCLE-I"
    )
  : [];
const power2 = graphID?.length > 0 ?
  graphID?.filter(
      (item) =>
        item?.name === "POWER FAILURE TEST CYCLE-II"
    )
  : [];
const power3 = graphID?.length > 0 ?
  graphID?.filter(
      (item) =>
        item?.name === "POWER FAILURE TEST CYCLE-III"
    )
  : [];

 

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
      style: "@page { size: A4 landscape;} ",
      
      
    });
  };
  //   const Description=[{sr:1,name:`Area/Equipment Details For "${props.cases?.cases[4].type_of_room}" ${props.cases?.cases[4].type_of_cycle} Mapping And Cycle Detail`,
  //   pageNo:2,state:`true`},
  // {sr:1,name:`Location Diagram Of The Data Loggers`,pageNo:2},
  // {sr:1,name:` Trend For Continuous Operation Test Cycle(Temperature Vs Time)`,pageNo:3,state:`myState2`},
  // {sr:1,name:`Trend For START UP STUDY TEST CYCLE (Temperature VsTime)`,pageNo:3,state:`myState4`},
  // {sr:1,name:`Trend For Door Open Test Cycle (Temperature VsTime)`,pageNo:2,state:`myState`},
  // // {sr:1,name:`Trend For Door Open Test Cycle-II (Temperature VsTime)`,pageNo:3,state:`myState`},
  // // {sr:1,name:`Trend For Door Open Test Cycle-III (Temperature VsTime)`,pageNo:3,state:`myState`},
  // {sr:1,name:`Trend For Power Failure Test Cycle (Temperature VsTime)`,pageNo:3,state:`myState3`},
  // {sr:1,name:`Summary And Observation Report Of ParametersComputed During Mapping (Temperature)`,pageNo:2,state:`true`},
  // {sr:1,name:`Observation And Concluding Remarks`,pageNo:1,state:`true`},
  // {sr:1,name:`Mean Kinetic Temperature (M.K.T)`,pageNo:1,state:`true`},
  // {sr:1,name:`Location Diagram Indicating Position Of LoggersShowing Maximum And Average Minimum Temperature Point`,pageNo:1,state:`true`},
  // {sr:1,name:`Summary And Observation Report Of Risk AnalysisStudies For "${props.cases?.cases[4].type_of_room}"`,pageNo:2,state:`true`},
  // {sr:1,name:`List Of Annexures`,pageNo:1,state:`true`}]

  // const isFalse = function(state1){
  // // console.log(state1.state,"llll")
  // return state1.state!==`myState`
  // }
  // const isFalse2 = function(state1){
  // console.log(state1.state,"llll")
  // return state1.state!==`myState2`
  // }
  // const isFalse3 = function(state1){
  // console.log(state1.state,"llll")
  // return state1.state!==`myState3`
  // }
  // const isFalse4 = function(state1){
  // console.log(state1.state,"llll")
  // return state1.state!==`myState4`
  // }

  // const DescriptionF = MyState=='false'?Description.filter(isFalse):Description
  // const DescriptionF2 =MyState2=='false'?DescriptionF.filter(isFalse2):DescriptionF
  // const DescriptionF3 =MyState3=='false'?DescriptionF2.filter(isFalse3):DescriptionF2
  // const DescriptionF4 =MyState4=='false'?DescriptionF3.filter(isFalse4):DescriptionF3

  // console.log(Description,"QQQ",props,DescriptionF,DescriptionF2,DescriptionF3,DescriptionF4)


  const pageNo = [
    {id:1,no:1,page:"remark"},
    {id:2,no:1,page:"remark"},
    {id:2,no:1,page:"remark"},
    {id:4,no:1,page:"remark"},
    {id:5,no:1,page:"remark"},
    {id:6,no:1,page:"remark"},
    {id:7,no:1,page:"remark"},
    {id:8,no:1,page:"remark"},
    {id:9,no:1,page:"remark"},
    {id:10,no:1,page:"remark"},
    {id:11,no:1,page:"remark"},
    {id:12,no:1,page:"remark"},
    {id:13,no:1,page:"remark"},
    {id:15,no:1,page:"remark"},
    {id:16,no:1,page:"remark"},
    {id:17,no:1,page:"remark"},
    {id:18,no:1,page:"remark"},
  ]


  return (
    <div className="position-relative" id="content">
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
        {props.cases?.isLoading ? (
          <Loader2 />
        ) : (
          props.cases?.cases
            ?.filter((c) => c.id == param.id)
            .map((user) => {
              console.log("user112",user)
              const Description = [
              { sr: 1, name: `Area/Equipment Details For "${user.type_of_room}" ${user.type_of_cycle} Mapping And Cycle Detail`,pageNo: 3, state: `true`},
              { sr: 1, name: `Details Of "Air-Conditioning System"`, pageNo: 1 ,state:`myStateAc` },
              { sr: 1, name: `Location Diagram And Location Chart Of The Loggers`, pageNo:  Math.ceil((props?.sheet?.sheet?.data?.length/20)+filterDiagram?.length)+1 },
              { sr: 1, name: `Trend For Start Up Study Test Cycle-I (Temperature VsTime)`, pageNo: 3, state: `myState4` },
              { sr: 1, name: `Trend For Start Up Study Test Cycle-II (Temperature VsTime)`, pageNo: 3, state: `myState42` },
              { sr: 1, name: `Trend For Start Up Study Test Cycle-III (Temperature VsTime)`, pageNo: 3, state: `myState43` },
              { sr: 1, name: `Trend For Continuous Operation Test Cycle-I (Temperature Vs Time)`, pageNo: 3, state: `myState2` },
              { sr: 1, name: `Trend For Continuous Operation Test Cycle -II(Temperature Vs Time)`, pageNo: 3, state: `myState22` },
              { sr: 1, name: `Trend For Continuous Operation Test Cycle -III(Temperature Vs Time)`, pageNo: 3, state: `myState23` },
              { sr: 1, name: `Trend For Door Open Test Cycle-I (Temperature VsTime)`, pageNo: 3, state: `myState` },
              { sr: 1, name: `Trend For Door Open Test Cycle-II (Temperature VsTime)`, pageNo: 3, state: `myState12` },
              { sr: 1, name: `Trend For Door Open Test Cycle-III (Temperature VsTime)`, pageNo: 3, state: `myState13` },
              { sr: 1, name: `Trend For Power Failure Test Cycle-I (Temperature VsTime)`, pageNo: 3, state: `myState3` },
              { sr: 1, name: `Trend For Power Failure Test Cycle-II (Temperature VsTime)`, pageNo: 3, state: `myState32` },
              { sr: 1, name: `Trend For Power Failure Test Cycle-III (Temperature VsTime)`, pageNo: 3, state: `myState33` },
              { sr: 1, name: `Summary And Observation Report Of Parameters Computed During Mapping (Temperature)`, pageNo: (Math.ceil(props?.parameterData?.length/15)==0?1:Math.ceil(props?.parameterData?.length/15))+1, state: `true` },
              { sr: 1, name: `Observation And Concluding Remarks`, pageNo: 1, state: `myState5` },
              { sr: 1, name: `Mean Kinetic Temperature (M.K.T)`, pageNo: 1, state: `true` },
              { sr: 1, name: `Location Diagram Indicating Position Of Loggers Showing Maximum And Average Minimum Temperature Point`, pageNo: filterDiagram2?.length == 0 ? 1 :filterDiagram2?.length , state: `true` },
              { sr: 1, name: `Summary And Observation Report Of Risk Analysis Studies For "${user.type_of_room}"`, pageNo: 2 , state: `myState6`},
              { sr: 1, name: `List Of Annexures`, pageNo: 1, state: `true` }]

              const isFalse = function (state1) {
                // console.log(state1.state, "llll")
                return state1.state !== `myState`
              }
              const isFalse2 = function (state1) {
                // console.log(state1.state, "llll")
                return state1.state !== `myState2`
              }
              const isFalse22 = function (state1) {
                // console.log(state1.state, "llll")
                return state1.state !== `myState22`
              }
              const isFalse23 = function (state1) {
                // console.log(state1.state, "llll")
                return state1.state !== `myState23`
              }
              const isFalse3 = function (state1) {
                // console.log(state1.state, "llll")
                return state1.state !== `myState3`
              }
              const isFalse32 = function (state1) {
                // console.log(state1.state, "llll")
                return state1.state !== `myState32`
              }
              const isFalse33 = function (state1) {
                // console.log(state1.state, "llll")
                return state1.state !== `myState33`
              }
              const isFalse4 = function (state1) {
                // console.log(state1.state, "llll")
                return state1.state !== `myState4`
              }
              const isFalse42 = function (state1) {
                // console.log(state1.state, "llll")
                return state1.state !== `myState42`
              }
              const isFalse43 = function (state1) {
                // console.log(state1.state, "llll")
                return state1.state !== `myState43`
              }
              const isFalse5 = function (state1) {
                // console.log(state1.state, "llll")
                return state1.state !== `myState5`
              }
              const isFalse6 = function (state1) {
                // console.log(state1.state, "llll")
                return state1.state !== `myState6`
              }
              const isFalse7 = function (state1) {
                // console.log(state1.state, "llll")
                return state1.state !== `myState12`
              }
              const isFalse8 = function (state1) {
                // console.log(state1.state, "llll")
                return state1.state !== `myState13`
              }
              const isFalseAc = function (state1) {
                // console.log(state1.state, "llll")
                return state1.state !== `myStateAc`
              }

              const DescriptionF = MyState == 'false' ? Description.filter(isFalse) : Description
              const DescriptionF2 = MyState2 == 'false' ? DescriptionF.filter(isFalse2) : DescriptionF
              const DescriptionF22 = MyState22 == 'false' ? DescriptionF2.filter(isFalse22) : DescriptionF2
              const DescriptionF23 = MyState23 == 'false' ? DescriptionF22.filter(isFalse23) : DescriptionF22
              const DescriptionF3 = MyState3 == 'false' ? DescriptionF23.filter(isFalse3) : DescriptionF23
              const DescriptionF323 = MyState32 == 'false' ? DescriptionF3.filter(isFalse32) : DescriptionF3
              const DescriptionF333 = MyState33 == 'false' ? DescriptionF323.filter(isFalse33) : DescriptionF323
              const DescriptionF31 = MyState5 == 'false' ? DescriptionF333.filter(isFalse5) : DescriptionF333
              const DescriptionF32 = MyState6 == 'false' ? DescriptionF31.filter(isFalse6) : DescriptionF31
              const DescriptionF12 = MyState12 == 'false' ? DescriptionF32.filter(isFalse7) : DescriptionF32
              const DescriptionF13 = MyState13 == 'false' ? DescriptionF12.filter(isFalse8) : DescriptionF12
              const DescriptionF42 = MyState42 == 'false' ? DescriptionF13.filter(isFalse42) : DescriptionF13
              const DescriptionF43 = MyState43 == 'false' ? DescriptionF42.filter(isFalse43) : DescriptionF42
              const DescriptionFAc = MyStateAc == 'false' ? DescriptionF43.filter(isFalseAc) : DescriptionF43
              const DescriptionF4 = MyState4 == 'false' ? DescriptionFAc.filter(isFalse4) : DescriptionFAc

              // console.log(Description, "QQQ", props, DescriptionF, DescriptionF2, DescriptionF3, DescriptionF4)
              return (
                <div id="aakash" key={user.id}>
                  <div  className="" >
                 

                        <FinalReportVegaGraph
                          test_id={power1[0]?.id}
                          testName="POWER FAILURE TEST CYCLE-I (WITH AMBIENT)"
                          mxHeight={320}
                          x_min_excersion={
                            powerOnGraphData?.x_min_excersion ?? ""
                          }
                          x_max_excersion={
                            powerOnGraphData?.x_max_excersion ?? ""
                          }
                          y_min_excersion={
                            powerOnGraphData?.y_min_excersion ?? ""
                          }
                          y_max_excersion={
                            powerOnGraphData?.y_max_excersion ?? ""
                          }
                          x_min_recovery={
                            powerOnGraphData?.x_min_recovery ?? ""
                          }
                          x_max_recovery={
                            powerOnGraphData?.x_max_recovery ?? ""
                          }
                          y_min_recovery={
                            powerOnGraphData?.y_min_recovery ?? ""
                          }
                          y_max_recovery={
                            powerOnGraphData?.y_max_recovery ?? ""
                          }
                        />
                     
                   
                        <FinalReportVegaGraph
                          test_id={power1[0]?.id}
                          testName="POWER FAILURE TEST CYCLE-I (WITHOUT AMBIENT)"
                          mxHeight={320}
                          x_min_excersion={
                            powerOnGraphData?.x_min_excersion ?? ""
                          }
                          x_max_excersion={
                            powerOnGraphData?.x_max_excersion ?? ""
                          }
                          y_min_excersion={
                            powerOnGraphData?.y_min_excersion ?? ""
                          }
                          y_max_excersion={
                            powerOnGraphData?.y_max_excersion ?? ""
                          }
                          x_min_recovery={
                            powerOnGraphData?.x_min_recovery ?? ""
                          }
                          x_max_recovery={
                            powerOnGraphData?.x_max_recovery ?? ""
                          }
                          y_min_recovery={
                            powerOnGraphData?.y_min_recovery ?? ""
                          }
                          y_max_recovery={
                            powerOnGraphData?.y_max_recovery ?? ""
                          }
                        />
                      
                        <FinalReportVegaGraph
                          test_id={power2[0]?.id}
                          testName="POWER FAILURE TEST CYCLE-II (WITH AMBIENT)"
                          mxHeight={320}
                          x_min_excersion={
                            powerOnGraphData2?.x_min_excersion ?? ""
                          }
                          x_max_excersion={
                            powerOnGraphData2?.x_max_excersion ?? ""
                          }
                          y_min_excersion={
                            powerOnGraphData2?.y_min_excersion ?? ""
                          }
                          y_max_excersion={
                            powerOnGraphData2?.y_max_excersion ?? ""
                          }
                          x_min_recovery={
                            powerOnGraphData2?.x_min_recovery ?? ""
                          }
                          x_max_recovery={
                            powerOnGraphData2?.x_max_recovery ?? ""
                          }
                          y_min_recovery={
                            powerOnGraphData2?.y_min_recovery ?? ""
                          }
                          y_max_recovery={
                            powerOnGraphData2?.y_max_recovery ?? ""
                          }
                          />
                     
  
                        <FinalReportVegaGraph
                          test_id={power2[0]?.id}
                          testName="POWER FAILURE TEST CYCLE-II (WITHOUT AMBIENT)"
                          mxHeight={320}
                          x_min_excersion={
                            powerOnGraphData2?.x_min_excersion ?? ""
                          }
                          x_max_excersion={
                            powerOnGraphData2?.x_max_excersion ?? ""
                          }
                          y_min_excersion={
                            powerOnGraphData2?.y_min_excersion ?? ""
                          }
                          y_max_excersion={
                            powerOnGraphData2?.y_max_excersion ?? ""
                          }
                          x_min_recovery={
                            powerOnGraphData2?.x_min_recovery ?? ""
                          }
                          x_max_recovery={
                            powerOnGraphData2?.x_max_recovery ?? ""
                          }
                          y_min_recovery={
                            powerOnGraphData2?.y_min_recovery ?? ""
                          }
                          y_max_recovery={
                            powerOnGraphData2?.y_max_recovery ?? ""
                          }
                        />
                     
                        <FinalReportVegaGraph
                          test_id={power3[0]?.id}
                          testName="POWER FAILURE TEST CYCLE-III (WITH AMBIENT)"
                          mxHeight={320}
                          x_min_excersion={
                            powerOnGraphData3?.x_min_excersion ?? ""
                          }
                          x_max_excersion={
                            powerOnGraphData3?.x_max_excersion ?? ""
                          }
                          y_min_excersion={
                            powerOnGraphData3?.y_min_excersion ?? ""
                          }
                          y_max_excersion={
                            powerOnGraphData3?.y_max_excersion ?? ""
                          }
                          x_min_recovery={
                            powerOnGraphData3?.x_min_recovery ?? ""
                          }
                          x_max_recovery={
                            powerOnGraphData3?.x_max_recovery ?? ""
                          }
                          y_min_recovery={
                            powerOnGraphData3?.y_min_recovery ?? ""
                          }
                          y_max_recovery={
                            powerOnGraphData3?.y_max_recovery ?? ""
                          }
                          />
                      
                        <FinalReportVegaGraph
                          test_id={power3[0]?.id}
                          testName="POWER FAILURE TEST CYCLE-III (WITHOUT AMBIENT)"
                          mxHeight={320}
                          x_min_excersion={
                            powerOnGraphData3?.x_min_excersion ?? ""
                          }
                          x_max_excersion={
                            powerOnGraphData3?.x_max_excersion ?? ""
                          }
                          y_min_excersion={
                            powerOnGraphData3?.y_min_excersion ?? ""
                          }
                          y_max_excersion={
                            powerOnGraphData3?.y_max_excersion ?? ""
                          }
                          x_min_recovery={
                            powerOnGraphData3?.x_min_recovery ?? ""
                          }
                          x_max_recovery={
                            powerOnGraphData3?.x_max_recovery ?? ""
                          }
                          y_min_recovery={
                            powerOnGraphData3?.y_min_recovery ?? ""
                          }
                          y_max_recovery={
                            powerOnGraphData3?.y_max_recovery ?? ""
                          }
                          />
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
    companyAddress: state.cases.companyAddress,
    cols: state.cols.cols,
    company: state.company.company,
    customer: state.customer.customer,
    rows: state.rows.rows,
    cycle: state.cycle.cycle,
    parameterData: state.tests.parameterData,
    users: state.users.users,
    rawData: state.rawData,
    editsensor: state.sensor.editsensor,
    ac: state.ac,
    sensor: state.sensor.sensor,
    sheet:state.sheet,
    testType: state.testType,
    page: state.page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCasesDataPageDetail: (data) => dispatch(actions.getCasesDataPageDetail(data)),
    postCasesDataPageDetail: (data, user) =>dispatch(actions.postCasesDataPageDetail(data, user)),
    updatePageDetail: (data, user) =>dispatch(actions.updatePageDetail(data, user)),
    onUpdateCasesData: (data, user, toggle) =>
      dispatch(actions.updateCasesData(data, user, toggle)),
      onSheetGetData: (data2) =>
      dispatch(actions.sheetGetData(data2)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FinalReport);

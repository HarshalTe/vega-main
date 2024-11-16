/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../../../../redux/action";
import RHeader from "./RHeader";
import "./FinalReport.css";
import MainHeader from "./MainHeader";
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
import FinalReportVegaGraphHumidity from "../../vegasGraph/FinalReportVegaGraphHumidity";


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
    props.onGetCasesDataAc(data)

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
    props.sensorsGetData(data2)

  },[])
  const test = props.testType?.testType
  ?.filter(
    (row) =>
      row.type_room == props?.type_room
       &&
      !row.name
        ?.toLowerCase()
        .includes(
          "WITHOUT AMBIENT".trim().toLowerCase()
        )
  )
  const test2 = test?.filter((row) =>row.name == "RELATIVE HUMIDITY TEST CYCLE-I")
  let dataPara = {
    token: accessToken,
    id: param?.id,
    testId1: test?.filter((row) =>row.name == "RELATIVE HUMIDITY TEST CYCLE-I")[0]?.id,
    // testId2: test?.filter((row) =>row.name == "RELATIVE HUMIDITY TEST CYCLE-II")[0]?.id,
    // testId3: test?.filter((row) =>row.name == "RELATIVE HUMIDITY TEST CYCLE-III")[0]?.id,
  };
  
  React.useEffect(() => {
  props.parameterGetData1(dataPara)
  // props.parameterGetData2(dataPara)
  // props.parameterGetData3(dataPara)

  },[]);

  const AcData=props.ac?.ac

  function getTimeInSeconds(timeString) {
    // console.log("doorOpenGraphData",timeString)
    if (timeString != null) {
      const timeParts = timeString?.split(":");
      const hours = parseInt(timeParts[0]);
      const minutes = parseInt(timeParts[1]);
      const seconds = parseInt(timeParts[2]);
    
      return (hours * 60 * 60) + (minutes * 60) + seconds;
      
    } else {
      return timeString;
    }
  }
  
  
  const isEqual = function(data){
    // console.log("object",data.cases_id)
    return data?.cases_id==param.id
  }
  
  const paraAc=AcData?.filter(isEqual)
  const index = paraAc?.length-1

  // console.log(props.ac?.ac,"kkk",props,param.id,paraAc);
  // let data = {
  //   token: accessToken,
  //   id: param?.id,
  // };
  const sensors = props?.sheet?.sensor?.data?.length > 0
  ? props?.sheet?.sensor?.data?.filter((row)=>row.case_id== param?.id)
   :[] ;
  console.log("objectsnesors",sensors,props?.sheet?.sensor)

  const [blankpage, setBlankpage] = useState(false);
  const p1 =
  props.parameter?.parameter1?.length > 0
    ? props?.parameter?.parameter1
        ?.filter(
          (c) =>
            !c?.sensor?.toLowerCase().includes("AMB".trim().toLowerCase())
        )
        ?.map((d) => d.avg)
        : [];
        
  const pMax1 = Math.max(...p1);
  const pMin1 = Math.min(...p1);
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

  console.log("props.parameter.parameter1",props.parameter)

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
                    {/* cccc */}
                  <div style={{height:"630px",lineHeight:"12px"}} className="first-page mb-5 pdf-h-w-2">
                    <RHeader user={user} />
                    <div className="p-0">
                      Lab Add:C/105, Jaswanti Allied Business Center, Ramchandra
                      Lane Extn., Kachpada, Malad(W). Mumbai-400064
                    </div>
                    <div className="p-0">
                      Email : support@vegacalibrations.com Website :
                      www.vegacalibrations.com{" "}
                    </div>

                    <div style={{ border: "1px solid black", width: "100%" }}>
                      <h5>
                      Table of Content
                      </h5>
                  
                    <table
                      className="table table-sm"
                      style={{ lineHeight:"10px" }}
                    >
                      <thead>
                        <tr>
                          <th scope="col">Sr. No</th>
                          <th scope="col">Description </th>
                          <th scope="col">Page No. </th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        <tr>
                          <td>{DescriptionF4[0]?.sr}</td>
                          <td>
                            {DescriptionF4[0]?.name}
                          </td>
                          <td>{DescriptionF4[0]?.pageNo}</td>
                        </tr>
                        <tr>
                          <td>{DescriptionF4[1]?.sr + DescriptionF4[0]?.sr}</td>
                          <td>{DescriptionF4[1]?.name} </td>
                          <td>{1 + DescriptionF4[0]?.pageNo}</td>
                        </tr>
                        <tr>
                          <td>{DescriptionF4[2]?.sr + DescriptionF4[1]?.sr + DescriptionF4[0]?.sr}</td>
                          <td>{DescriptionF4[2]?.name}
                          </td>
                          <td>{1 + DescriptionF4[1]?.pageNo + DescriptionF4[0]?.pageNo}</td>
                        </tr>

                        <tr>
                          <td>{DescriptionF4[3]?.sr + DescriptionF4[2]?.sr + DescriptionF4[1]?.sr + DescriptionF4[0]?.sr}</td>
                          <td>
                            {DescriptionF4[3]?.name}
                          </td>
                          <td>{1 + DescriptionF4[2]?.pageNo + DescriptionF4[1]?.pageNo + DescriptionF4[0]?.pageNo}</td>
                        </tr>
                        <tr  >
                          <td>{DescriptionF4[4]?.sr + DescriptionF4[3]?.sr + DescriptionF4[2]?.sr + DescriptionF4[1]?.sr + DescriptionF4[0]?.sr}</td>
                          <td>
                            {DescriptionF4[4]?.name}
                          </td>
                          <td>{1 + DescriptionF4[3]?.pageNo + DescriptionF4[2]?.pageNo + DescriptionF4[1]?.pageNo + DescriptionF4[0]?.pageNo}</td>
                        </tr>

                        <tr>
                          <td>{DescriptionF4[5]?.sr + DescriptionF4[4]?.sr + DescriptionF4[3]?.sr + DescriptionF4[2]?.sr + DescriptionF4[1]?.sr + DescriptionF4[0]?.sr}</td>
                          <td>
                            {DescriptionF4[5]?.name}
                          </td>
                          <td>{1 + DescriptionF4[4]?.pageNo + DescriptionF4[3]?.pageNo + DescriptionF4[2]?.pageNo + DescriptionF4[1]?.pageNo + DescriptionF4[0]?.pageNo}</td>
                        </tr>

                        <tr style={DescriptionF4[6]?.pageNo == undefined ? { display: "none" } : {}}>
                          <td>{DescriptionF4[6]?.sr + DescriptionF4[5]?.sr + DescriptionF4[4]?.sr + DescriptionF4[3]?.sr + DescriptionF4[2]?.sr + DescriptionF4[1]?.sr + DescriptionF4[0]?.sr}</td>
                          <td>
                            {DescriptionF4[6]?.name}
                          </td>
                          <td>{1 + DescriptionF4[5]?.pageNo + DescriptionF4[4]?.pageNo + DescriptionF4[3]?.pageNo + DescriptionF4[2]?.pageNo + DescriptionF4[1]?.pageNo + DescriptionF4[0]?.pageNo}</td>
                        </tr>

                        <tr style={DescriptionF4[7]?.pageNo == undefined ? { display: "none" } : {}}>
                          <td>{DescriptionF4[7]?.pageNo == undefined ? " " : DescriptionF4[7]?.sr + DescriptionF4[6]?.sr + DescriptionF4[5]?.sr + DescriptionF4[4]?.sr + DescriptionF4[3]?.sr + DescriptionF4[2]?.sr + DescriptionF4[1]?.sr + DescriptionF4[0]?.sr}</td>
                          <td>
                            {DescriptionF4[7]?.name}
                          </td>
                          <td>{DescriptionF4[7]?.pageNo == undefined ? " " : 1 + DescriptionF4[6]?.pageNo + DescriptionF4[5]?.pageNo + DescriptionF4[4]?.pageNo + DescriptionF4[3]?.pageNo + DescriptionF4[2]?.pageNo + DescriptionF4[1]?.pageNo + DescriptionF4[0]?.pageNo}</td>
                        </tr>

                        <tr style={DescriptionF4[8]?.pageNo == undefined ? { display: "none" } : {}}>
                          <td>{DescriptionF4[8]?.pageNo == undefined ? " " : DescriptionF4[8]?.sr + DescriptionF4[7]?.sr + DescriptionF4[6]?.sr + DescriptionF4[5]?.sr + DescriptionF4[4]?.sr + DescriptionF4[3]?.sr + DescriptionF4[2]?.sr + DescriptionF4[1]?.sr + DescriptionF4[0]?.sr}</td>
                          <td>
                            {DescriptionF4[8]?.name}
                          </td>
                          <td>{DescriptionF4[8]?.pageNo == undefined ? " " : 1 + DescriptionF4[7]?.pageNo + DescriptionF4[6]?.pageNo + DescriptionF4[5]?.pageNo + DescriptionF4[4]?.pageNo + DescriptionF4[3]?.pageNo + DescriptionF4[2]?.pageNo + DescriptionF4[1]?.pageNo + DescriptionF4[0]?.pageNo}</td>
                        </tr>

                        <tr style={DescriptionF4[9]?.pageNo == undefined ? { display: "none" } : {}}>
                          <td>{DescriptionF4[9]?.pageNo == undefined ? " " : DescriptionF4[9]?.sr + DescriptionF4[8]?.sr + DescriptionF4[7]?.sr + DescriptionF4[6]?.sr + DescriptionF4[5]?.sr + DescriptionF4[4]?.sr + DescriptionF4[3]?.sr + DescriptionF4[2]?.sr + DescriptionF4[1]?.sr + DescriptionF4[0]?.sr}</td>
                          <td>{DescriptionF4[9]?.name} </td>
                          <td>{DescriptionF4[9]?.pageNo == undefined ? " " : 1 + DescriptionF4[8]?.pageNo + DescriptionF4[7]?.pageNo + DescriptionF4[6]?.pageNo + DescriptionF4[5]?.pageNo + DescriptionF4[4]?.pageNo + DescriptionF4[3]?.pageNo + DescriptionF4[2]?.pageNo + DescriptionF4[1]?.pageNo + DescriptionF4[0]?.pageNo}</td>
                        </tr>

                        <tr style={DescriptionF4[10]?.pageNo == undefined ? { display: "none" } : {}}>
                          <td>{DescriptionF4[10]?.pageNo == undefined ? " " : DescriptionF4[10]?.sr + DescriptionF4[9]?.sr + DescriptionF4[8]?.sr + DescriptionF4[7]?.sr + DescriptionF4[6]?.sr + DescriptionF4[5]?.sr + DescriptionF4[4]?.sr + DescriptionF4[3]?.sr + DescriptionF4[2]?.sr + DescriptionF4[1]?.sr + DescriptionF4[0]?.sr}</td>
                          <td>{DescriptionF4[10]?.name}</td>
                          <td>{DescriptionF4[10]?.pageNo == undefined ? " " : 1 + DescriptionF4[9]?.pageNo + DescriptionF4[8]?.pageNo + DescriptionF4[7]?.pageNo + DescriptionF4[6]?.pageNo + DescriptionF4[5]?.pageNo + DescriptionF4[4]?.pageNo + DescriptionF4[3]?.pageNo + DescriptionF4[2]?.pageNo + DescriptionF4[1]?.pageNo + DescriptionF4[0]?.pageNo}</td>
                        </tr>

                        <tr style={DescriptionF4[11]?.pageNo == undefined ? { display: "none" } : {}}>
                          <td>{DescriptionF4[11]?.pageNo == undefined ? " " : DescriptionF4[11]?.sr + DescriptionF4[10]?.sr + DescriptionF4[9]?.sr + DescriptionF4[8]?.sr + DescriptionF4[7]?.sr + DescriptionF4[6]?.sr + DescriptionF4[5]?.sr + DescriptionF4[4]?.sr + DescriptionF4[3]?.sr + DescriptionF4[2]?.sr + DescriptionF4[1]?.sr + DescriptionF4[0]?.sr}</td>
                          <td>
                            {DescriptionF4[11]?.name}
                          </td>
                          <td>{DescriptionF4[11]?.pageNo == undefined ? " " : 1 + DescriptionF4[10]?.pageNo + DescriptionF4[9]?.pageNo + DescriptionF4[8]?.pageNo + DescriptionF4[7]?.pageNo + DescriptionF4[6]?.pageNo + DescriptionF4[5]?.pageNo + DescriptionF4[4]?.pageNo + DescriptionF4[3]?.pageNo + DescriptionF4[2]?.pageNo + DescriptionF4[1]?.pageNo + DescriptionF4[0]?.pageNo}</td>
                        </tr>

                        <tr style={DescriptionF4[12]?.pageNo == undefined ? { display: "none" } : {}}>
                          <td>{DescriptionF4[12]?.pageNo == undefined ? " " : DescriptionF4[12]?.sr + DescriptionF4[11]?.sr + DescriptionF4[10]?.sr + DescriptionF4[9]?.sr + DescriptionF4[8]?.sr + DescriptionF4[7]?.sr + DescriptionF4[6]?.sr + DescriptionF4[5]?.sr + DescriptionF4[4]?.sr + DescriptionF4[3]?.sr + DescriptionF4[2]?.sr + DescriptionF4[1]?.sr + DescriptionF4[0]?.sr}</td>
                          <td>
                            {DescriptionF4[12]?.name}
                          </td>
                          <td>{DescriptionF4[12]?.pageNo == undefined ? " " : 1 + DescriptionF4[11]?.pageNo + DescriptionF4[10]?.pageNo + DescriptionF4[9]?.pageNo + DescriptionF4[8]?.pageNo + DescriptionF4[7]?.pageNo + DescriptionF4[6]?.pageNo + DescriptionF4[5]?.pageNo + DescriptionF4[4]?.pageNo + DescriptionF4[3]?.pageNo + DescriptionF4[2]?.pageNo + DescriptionF4[1]?.pageNo + DescriptionF4[0]?.pageNo}</td>
                        </tr>

                        <tr style={DescriptionF4[13]?.pageNo == undefined ? { display: "none" } : {}}>
                          <td>{DescriptionF4[13]?.pageNo == undefined ? " " : DescriptionF4[13]?.sr + DescriptionF4[12]?.sr + DescriptionF4[11]?.sr + DescriptionF4[10]?.sr + DescriptionF4[9]?.sr + DescriptionF4[8]?.sr + DescriptionF4[7]?.sr + DescriptionF4[6]?.sr + DescriptionF4[5]?.sr + DescriptionF4[4]?.sr + DescriptionF4[3]?.sr + DescriptionF4[2]?.sr + DescriptionF4[1]?.sr + DescriptionF4[0]?.sr}</td>
                          <td>{DescriptionF4[13]?.name}</td>
                          <td>{DescriptionF4[13]?.pageNo == undefined ? "" : 1 + DescriptionF4[12]?.pageNo + DescriptionF4[11]?.pageNo + DescriptionF4[10]?.pageNo + DescriptionF4[9]?.pageNo + DescriptionF4[8]?.pageNo + DescriptionF4[7]?.pageNo + DescriptionF4[6]?.pageNo + DescriptionF4[5]?.pageNo + DescriptionF4[4]?.pageNo + DescriptionF4[3]?.pageNo + DescriptionF4[2]?.pageNo + DescriptionF4[1]?.pageNo + DescriptionF4[0]?.pageNo}</td>
                        </tr>
                        <tr style={DescriptionF4[14]?.pageNo == undefined ? { display: "none" } : {}}>
                          <td>{DescriptionF4[14]?.pageNo == undefined ? " " : DescriptionF4[14]?.sr + DescriptionF4[13]?.sr + DescriptionF4[12]?.sr + DescriptionF4[11]?.sr + DescriptionF4[10]?.sr + DescriptionF4[9]?.sr + DescriptionF4[8]?.sr + DescriptionF4[7]?.sr + DescriptionF4[6]?.sr + DescriptionF4[5]?.sr + DescriptionF4[4]?.sr + DescriptionF4[3]?.sr + DescriptionF4[2]?.sr + DescriptionF4[1]?.sr + DescriptionF4[0]?.sr}</td>
                          <td>{DescriptionF4[14]?.name}</td>
                          <td>{DescriptionF4[14]?.pageNo == undefined ? "" : 1 + DescriptionF4[13]?.pageNo + DescriptionF4[12]?.pageNo + DescriptionF4[11]?.pageNo + DescriptionF4[10]?.pageNo + DescriptionF4[9]?.pageNo + DescriptionF4[8]?.pageNo + DescriptionF4[7]?.pageNo + DescriptionF4[6]?.pageNo + DescriptionF4[5]?.pageNo + DescriptionF4[4]?.pageNo + DescriptionF4[3]?.pageNo + DescriptionF4[2]?.pageNo + DescriptionF4[1]?.pageNo + DescriptionF4[0]?.pageNo}</td>
                        </tr>
                        <tr style={DescriptionF4[15]?.pageNo == undefined ? { display: "none" } : {}}>
                          <td>{DescriptionF4[15]?.sr +DescriptionF4[14]?.sr + DescriptionF4[13]?.sr + DescriptionF4[12]?.sr + DescriptionF4[11]?.sr + DescriptionF4[10]?.sr + DescriptionF4[9]?.sr + DescriptionF4[8]?.sr + DescriptionF4[7]?.sr + DescriptionF4[6]?.sr + DescriptionF4[5]?.sr + DescriptionF4[4]?.sr + DescriptionF4[3]?.sr + DescriptionF4[2]?.sr + DescriptionF4[1]?.sr + DescriptionF4[0]?.sr}</td>
                          <td>{DescriptionF4[15]?.name}</td>
                          <td>{DescriptionF4[15]?.pageNo == undefined ? "" :1 + DescriptionF4[14]?.pageNo + DescriptionF4[13]?.pageNo + DescriptionF4[12]?.pageNo + DescriptionF4[11]?.pageNo + DescriptionF4[10]?.pageNo + DescriptionF4[9]?.pageNo + DescriptionF4[8]?.pageNo + DescriptionF4[7]?.pageNo + DescriptionF4[6]?.pageNo + DescriptionF4[5]?.pageNo + DescriptionF4[4]?.pageNo + DescriptionF4[3]?.pageNo + DescriptionF4[2]?.pageNo + DescriptionF4[1]?.pageNo + DescriptionF4[0]?.pageNo}</td>
                        </tr>
                        <tr style={DescriptionF4[16]?.pageNo == undefined ? { display: "none" } : {}}>
                          <td>{DescriptionF4[16]?.sr +DescriptionF4[15]?.sr +DescriptionF4[14]?.sr + DescriptionF4[13]?.sr + DescriptionF4[12]?.sr + DescriptionF4[11]?.sr + DescriptionF4[10]?.sr + DescriptionF4[9]?.sr + DescriptionF4[8]?.sr + DescriptionF4[7]?.sr + DescriptionF4[6]?.sr + DescriptionF4[5]?.sr + DescriptionF4[4]?.sr + DescriptionF4[3]?.sr + DescriptionF4[2]?.sr + DescriptionF4[1]?.sr + DescriptionF4[0]?.sr}</td>
                          <td>{DescriptionF4[16]?.name}</td>
                          <td>{1 + DescriptionF4[15]?.pageNo +  DescriptionF4[14]?.pageNo + DescriptionF4[13]?.pageNo + DescriptionF4[12]?.pageNo + DescriptionF4[11]?.pageNo + DescriptionF4[10]?.pageNo + DescriptionF4[9]?.pageNo + DescriptionF4[8]?.pageNo + DescriptionF4[7]?.pageNo + DescriptionF4[6]?.pageNo + DescriptionF4[5]?.pageNo + DescriptionF4[4]?.pageNo + DescriptionF4[3]?.pageNo + DescriptionF4[2]?.pageNo + DescriptionF4[1]?.pageNo + DescriptionF4[0]?.pageNo}</td>
                        </tr>
                        <tr style={DescriptionF4[17]?.pageNo == undefined ? { display: "none" } : {}}>
                          <td>{DescriptionF4[17]?.sr +DescriptionF4[16]?.sr +DescriptionF4[15]?.sr +DescriptionF4[14]?.sr + DescriptionF4[13]?.sr + DescriptionF4[12]?.sr + DescriptionF4[11]?.sr + DescriptionF4[10]?.sr + DescriptionF4[9]?.sr + DescriptionF4[8]?.sr + DescriptionF4[7]?.sr + DescriptionF4[6]?.sr + DescriptionF4[5]?.sr + DescriptionF4[4]?.sr + DescriptionF4[3]?.sr + DescriptionF4[2]?.sr + DescriptionF4[1]?.sr + DescriptionF4[0]?.sr}</td>
                          <td>{DescriptionF4[17]?.name}</td>
                          <td>{1 + DescriptionF4[16]?.pageNo + DescriptionF4[15]?.pageNo + DescriptionF4[14]?.pageNo + DescriptionF4[13]?.pageNo + DescriptionF4[12]?.pageNo + DescriptionF4[11]?.pageNo + DescriptionF4[10]?.pageNo + DescriptionF4[9]?.pageNo + DescriptionF4[8]?.pageNo + DescriptionF4[7]?.pageNo + DescriptionF4[6]?.pageNo + DescriptionF4[5]?.pageNo + DescriptionF4[4]?.pageNo + DescriptionF4[3]?.pageNo + DescriptionF4[2]?.pageNo + DescriptionF4[1]?.pageNo + DescriptionF4[0]?.pageNo}</td>
                        </tr>
                        <tr style={DescriptionF4[18]?.pageNo == undefined ? { display: "none" } : {}}>
                          <td>{DescriptionF4[18]?.sr +DescriptionF4[17]?.sr +DescriptionF4[16]?.sr +DescriptionF4[15]?.sr +DescriptionF4[14]?.sr + DescriptionF4[13]?.sr + DescriptionF4[12]?.sr + DescriptionF4[11]?.sr + DescriptionF4[10]?.sr + DescriptionF4[9]?.sr + DescriptionF4[8]?.sr + DescriptionF4[7]?.sr + DescriptionF4[6]?.sr + DescriptionF4[5]?.sr + DescriptionF4[4]?.sr + DescriptionF4[3]?.sr + DescriptionF4[2]?.sr + DescriptionF4[1]?.sr + DescriptionF4[0]?.sr}</td>
                          <td>{DescriptionF4[18]?.name}</td>
                          <td>{1 + DescriptionF4[17]?.pageNo + DescriptionF4[16]?.pageNo + DescriptionF4[15]?.pageNo + DescriptionF4[14]?.pageNo + DescriptionF4[13]?.pageNo + DescriptionF4[12]?.pageNo + DescriptionF4[11]?.pageNo + DescriptionF4[10]?.pageNo + DescriptionF4[9]?.pageNo + DescriptionF4[8]?.pageNo + DescriptionF4[7]?.pageNo + DescriptionF4[6]?.pageNo + DescriptionF4[5]?.pageNo + DescriptionF4[4]?.pageNo + DescriptionF4[3]?.pageNo + DescriptionF4[2]?.pageNo + DescriptionF4[1]?.pageNo + DescriptionF4[0]?.pageNo}</td>
                        </tr>
                        <tr style={DescriptionF4[19]?.pageNo == undefined ? { display: "none" } : {}}>
                          <td>{DescriptionF4[19]?.sr +DescriptionF4[18]?.sr +DescriptionF4[17]?.sr +DescriptionF4[16]?.sr +DescriptionF4[15]?.sr +DescriptionF4[14]?.sr + DescriptionF4[13]?.sr + DescriptionF4[12]?.sr + DescriptionF4[11]?.sr + DescriptionF4[10]?.sr + DescriptionF4[9]?.sr + DescriptionF4[8]?.sr + DescriptionF4[7]?.sr + DescriptionF4[6]?.sr + DescriptionF4[5]?.sr + DescriptionF4[4]?.sr + DescriptionF4[3]?.sr + DescriptionF4[2]?.sr + DescriptionF4[1]?.sr + DescriptionF4[0]?.sr}</td>
                          <td>{DescriptionF4[19]?.name}</td>
                          <td>{1 + DescriptionF4[18]?.pageNo + DescriptionF4[17]?.pageNo + DescriptionF4[16]?.pageNo + DescriptionF4[15]?.pageNo + DescriptionF4[14]?.pageNo + DescriptionF4[13]?.pageNo + DescriptionF4[12]?.pageNo + DescriptionF4[11]?.pageNo + DescriptionF4[10]?.pageNo + DescriptionF4[9]?.pageNo + DescriptionF4[8]?.pageNo + DescriptionF4[7]?.pageNo + DescriptionF4[6]?.pageNo + DescriptionF4[5]?.pageNo + DescriptionF4[4]?.pageNo + DescriptionF4[3]?.pageNo + DescriptionF4[2]?.pageNo + DescriptionF4[1]?.pageNo + DescriptionF4[0]?.pageNo}</td>
                        </tr>
                        <tr style={DescriptionF4[20]?.pageNo == undefined ? { display: "none" } : {}}>
                          <td>{DescriptionF4[20]?.sr +DescriptionF4[19]?.sr +DescriptionF4[18]?.sr +DescriptionF4[17]?.sr +DescriptionF4[16]?.sr +DescriptionF4[15]?.sr + DescriptionF4[14]?.sr + DescriptionF4[13]?.sr + DescriptionF4[12]?.sr + DescriptionF4[11]?.sr + DescriptionF4[10]?.sr + DescriptionF4[9]?.sr + DescriptionF4[8]?.sr + DescriptionF4[7]?.sr + DescriptionF4[6]?.sr + DescriptionF4[5]?.sr + DescriptionF4[4]?.sr + DescriptionF4[3]?.sr + DescriptionF4[2]?.sr + DescriptionF4[1]?.sr + DescriptionF4[0]?.sr}</td>
                          <td>{DescriptionF4[20]?.name}</td>
                          <td>{1 + DescriptionF4[19]?.pageNo + DescriptionF4[18]?.pageNo + DescriptionF4[17]?.pageNo + DescriptionF4[16]?.pageNo + DescriptionF4[15]?.pageNo + DescriptionF4[14]?.pageNo + DescriptionF4[13]?.pageNo + DescriptionF4[12]?.pageNo + DescriptionF4[11]?.pageNo + DescriptionF4[10]?.pageNo + DescriptionF4[9]?.pageNo + DescriptionF4[8]?.pageNo + DescriptionF4[7]?.pageNo + DescriptionF4[6]?.pageNo + DescriptionF4[5]?.pageNo + DescriptionF4[4]?.pageNo + DescriptionF4[3]?.pageNo + DescriptionF4[2]?.pageNo + DescriptionF4[1]?.pageNo + DescriptionF4[0]?.pageNo}</td>
                        </tr>
                      </tbody>
                    </table>
                    </div>

                  </div>

                  <p style={{ pageBreakAfter: "always", clear: "both" }}></p>

                  <div className="second-page pdf-h-w-232">
                    <RHeader user={user} />

                    <div className="second-page-data pdf-h-w-232 test ">
                      <div className="test pdf-h-w-232">
                        <div className="second-main test pdf-h-w-232">
                          <div className="mb-50 f-24 ">
                            <div >Thermal Qualification Study For</div>
                            <div style={{fontWeight:600}}>
                              "{user.type_of_room}" {user.type_of_cycle}
                            </div>
                            <div >Identification No. : {user.identification_no}</div>
                            <div >Located At</div>
                            <div style={{fontWeight:600}}>{user?.company?.name}</div>
                            <div >{companyAddress}</div>
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
                            <tbody className="test f-17">
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
                  <div className="third-page" style={{"lineHeight":"14px"}}>
                    <RHeader user={user} />
                    <div className="p-1px third-page-header test f-12">
                      <div className="test p-1">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-40 test-b p-1 test-r">
                                Objective{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Report No.{" "}
                              </span>
                              <span className="w-20 test-b p-1 test-r">
                                Qualification Performed On{" "}
                              </span>
                              <span className="w-20 test-b">
                                Next Qualification Due On{" "}
                              </span>
                            </div>
                            <div className="d-flex ">
                              <span className="w-40 test-r f-12 p-1">
                                Thermal Qualification Study For "
                                {user.type_of_room}" {user.type_of_cycle}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-20 p-1 test-r">
                                {dateFormat(
                                  user.mapping_start_date,
                                  "dd-mm-yyyy"
                                )}
                              </span>
                              <span className="w-20">
                                {" "}
                                {user.next_due_date}
                              </span>
                            </div>
                          </div>

                          <div className="test text-left w-100">
                            <div className="ml-2 ">
                              <span className="mr-1 f-12 font-weight-bold">
                                Name Of The Customer :
                              </span>
                              <span className=" f-12 font-weight-bold">
                                {user.company?.name}
                              </span>
                            </div>

                            <div className="">
                              <span className=" f-12">
                                Customer address :
                              </span>
                              <span className="f-12 w-80">
                                {companyAddress}
                              </span>
                            </div>
                          </div>

                          <div>
                            <h6 className="font-weight-bold">
                              Details For "{user.type_of_room}"
                            </h6>
                            <div className="test">
                              <span className="d-flex">
                                <span className="w-25 test-b test-r p-1">
                                  ID No. Of The "{user.type_of_room}"
                                </span>
                                {/* <span className="w-15 test-b p-1 test-r">
                                Activity/CFA
                                </span> */}
                                <span className="w-15 test-b test-r p-1">
                                  Location
                                </span>
                                {/* <span className="w-25 test-b test-r p-1">
                                  Capacity
                                </span> */}
                                <span className="w-25 test-b test-r p-1">
                                Dimensions Mtr
                                <span className="d-flex test-t ">
                                    <span className="w-33 test-r">L</span>
                                    <span className="w-33 test-r">W</span>
                                    <span className="w-34 ">H</span>
                                  </span>
                                </span>
                                <span className="w-15 test-b test-r p-1">
                                Volume Of Area (Mtr.³)
                                </span>
                                <span className="w-30 test-b test-r p-1">
                                  Acceptable Operating Range Temperature (°C) / Humidity %RH{" "}
                                </span>
                                <span className="w-35 test-b p-1">
                                  Usage Of The "{user.type_of_room}"{" "}
                                </span>
                              </span>
                              <div className="d-flex">
                                <span className="w-25 test-r p-1">
                                  {user.identification_no}
                                </span>
                                {/* <span className="w-15 p-1 test-r">
                                {user.model_no}
                                </span> */}
                                {/* <span className="w-25 test-r p-1">
                                  {user.company?.location}
                                </span> */}
                                <span className="w-15 test-r p-1">
                                  {user.capacity}
                                </span>
                                <span className="w-25  d-flex test-r">
                                  <span className="w-33 p-1 test-r">
                                  {paraAc[index]?.volume_area[0]?.length}
                                  </span>
                                  <span className="w-33 p-1 test-r">
                                    {paraAc[index]?.volume_area[0]?.width}
                                  </span>
                                  <span className="w-33 p-1 ">
                                    {paraAc[index]?.volume_area[0]?.height}
                                  </span>
                                </span>
                                <span className="w-15 test-r p-1">
                                {(paraAc[index]?.volume_area[0]?.length*paraAc[index]?.volume_area[0]?.width*paraAc[index]?.volume_area[0]?.height).toFixed(2)} (Mtr.³)
                                </span>
                                <span className="w-30 test-r p-1">
                                  {user.min_operating_range}°C to{" "}
                                  {user.max_operating_range}°C {" "} / {" "} {user.min_operating_range}%RH to{" "}
                                  {user.max_operating_range}%RH
                                </span>
                                <span className="w-35 p-1">
                                  {user.usage_area}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h6 className="h-10p"> </h6>
                            <div className="test mb-2">
                              <div className="d-flex">
                                <span className="w-25 test-b p-1 test-r">
                                  Mapping Cycle Start Date
                                </span>
                                <span className="w-25 test-b p-1 test-r">
                                  Mapping Cycle End Date{" "}
                                </span>
                                <span className="w-25 test-b p-1 test-r">
                                  No. Of Cycles Performed{" "}
                                </span>
                                <span className="w-25 test-b p-1 test-r">
                                  No. Of Sensing Point
                                </span>
                                <span className="w-25 test-b p-1">Status</span>
                              </div>
                              <div className="d-flex">
                                <span className="w-25 p-1 test-r">
                                  {dateFormat(
                                    user.continuous_cycle_start_date,
                                    "dd-mm-yyyy"
                                  )}
                                </span>
                                <span className="w-25 p-1 test-r">
                                  {dateFormat(
                                    user.continuous_cycle_end_date,
                                    "dd-mm-yyyy"
                                  )}
                                </span>
                                <span className="w-25 p-1 test-r">
                                  {user.no_of_cycles}
                                </span>
                                <span className="w-25 p-1 test-r">
                                  {user.set_point}
                                </span>
                                <span className="w-25 p-1">
                                  {user.load_status}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h6 className="font-weight-bold">
                              Details Of The Mapping Cycle
                            </h6>
                            <table className="test table-sm w-100">
                              <thead>
                                <tr className="test">
                                  <th scope="col" className="test">
                                    Start Date
                                  </th>
                                  <th scope="col" className="test">
                                    End Date{" "}
                                  </th>
                                  <th scope="col" className="test">
                                    Set Temp.{" "}
                                  </th>
                                  <th scope="col" className="test">
                                    Name Of The Cycle
                                  </th>
                                  <th scope="col" className="test">
                                    Cycle Start Time (HH:MM:SS)
                                  </th>
                                  <th scope="col" className="test">
                                    Cycle End Time (HH:MM:SS)
                                  </th>
                                  <th scope="col" className="test">
                                    Recording Interval
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {props.cycle
                                  ?.filter((c) => c.case_id == param.id)
                                  .map((cycle) => {
                                    return (
                                      <tr className="test" key={cycle.id}>
                                        <td className="test">
                                          {dateFormat(
                                            cycle.start_date,
                                            "dd-mm-yyyy"
                                          )}
                                        </td>
                                        <td className="test">
                                          {dateFormat(
                                            cycle.end_date,
                                            "dd-mm-yyyy"
                                          )}
                                        </td>
                                        <td className="test">
                                          {cycle.set_temp}
                                        </td>
                                        <td className="test">
                                          {cycle.door_open_test_name}
                                        </td>
                                        <td className="test">
                                          {cycle.dcp_on_time}
                                        </td>
                                        <td className="test">
                                          {/* {cycle.set_limit_cross_in_time} */}
              {getTimeInSeconds(cycle?.do_off_time) > getTimeInSeconds(cycle?.set_limit_cross_in_time) ? cycle?.do_off_time : cycle?.set_limit_cross_in_time}
                                        </td>
                                        <td className="test">
                                          {cycle.recovery}

                                        </td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                          </div>

                          <div>
                            <h6 className="font-weight-bold">
                              Details Of The Mapping Instrumentation
                            </h6>
                            <div className="test">
                              <div className="d-flex">
                                <span className="w-25 test-b p-1 test-r">
                                  Sr. No.
                                </span>
                                <span className="w-25 test-b p-1 test-r">
                                  Master Instrument{" "}
                                </span>
                                <span className="w-25 test-b p-1 test-r">
                                  Identification No.{" "}
                                </span>

                                <span className="w-25 test-b p-1">
                                  Calibration Certificate No.
                                </span>
                              </div>
                              <div className="d-flex">
                                <span className="w-25 p-1 test-r">01 </span>
                                <span className="w-25 p-1 test-r">
                                  {user.details_of_master_instrument}
                                </span>
                                <span className="w-25 p-1 test-r">
                                  As Shown In Diagram
                                </span>

                                <span className="w-25 p-1">
                                  {user.calibration_certificate_no}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="test-t test-b mt-2 mb-30">
                              <div className="d-flex test ">
                                <span className="w-50 test-r p-1">
                                  For M/s. Vega Calibration And Validation
                                  Services LLP.{" "}
                                </span>
                                <span className="w-50 p-1">
                                  {" "}
                                  {user.company?.name}
                                </span>
                              </div>

                              <div className="d-flex test">
                                <span className="w-25 p-1 test-r">
                                  Prepared by
                                </span>
                                <span className="w-25 p-1 test-r">
                                  Checked By{" "}
                                </span>
                                <span className="w-25 p-1 test-r">
                                  Reviewed By
                                </span>
                                <span className="w-25 p-1 ">Approved By </span>
                              </div>
                              {/* cccc */}
                              <div className="d-flex test" style={{"lineHeight":""}}>
                                <span className="w-25 pl-3 pr-3 test-r">
                                Digitally Signed By : {user.prepared_by} <br/>
Reason : Authorised Signatory <br/>
Date/Time : { user.prepared_by_time? <DataTime data={user.prepared_by_time} />: "N/A"} <br/>
                                </span>
                                <span className="w-25 pl-3 pr-3 pb-1 pt-1 test-r">
                                Digitally Signed By : {user.checked_by} <br/>
Reason : Authorised Signatory <br/>
Date/Time :{ user.checked_by_time? <DataTime data={user.checked_by_time} />: "N/A"} <br/>
                                </span>
                                <span className="w-25 pl-3 pr-3 pb-1 pt-1 test-r">
                                Digitally Signed By : {user.reviewed_by} <br/>
Reason : Authorised Signatory <br/>
Date/Time : { user.reviewed_by_time? <DataTime data={user.reviewed_by_time} />: "N/A"}<br/>
                                </span>
                                <span className="w-25 pl-3 pr-3 pb-1 pt-1">
                                Digitally Signed By : {user.approved_by} <br/>
Reason : Authorised Signatory <br/>
Date/Time : { user.approved_by_time? <DataTime data={user.approved_by_time} />: "N/A"} <br/>
                                </span>
                            </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>

                  {myStateAc== true ? (
                    <div className="fourth-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test h-90v">
                        <MainHeader />
                        <div className="d-flex justify-content-center align-items-center ">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Details Of "Air-Conditioning System"
                          </h4>
                        </div>
                        <table style={{border:"2px Solid", width:"97%",margin:"1vw"}}>
                          <tbody>

                            <tr style={{border:"2px Solid"}}>
                              <td style={{border:"2px Solid"}}>Volume Of Area (Length*Width*Height)</td>
                              <td style={{border:"2px Solid"}}>{paraAc[index]?.volume_area[0]?.length} X {paraAc[index]?.volume_area[0]?.width} X {paraAc[index]?.volume_area[0]?.height} ={(paraAc[index]?.volume_area[0]?.length*paraAc[index]?.volume_area[0]?.width*paraAc[index]?.volume_area[0]?.height).toFixed(2)} (Mtr.³)</td>
                            </tr>
                            <tr style={{border:"2px Solid"}}>
                              <td>Type Of Air Conditioning Unit</td>
                              <td style={{border:"2px Solid"}}>{paraAc[index]?.ac_unit_type}</td>
                            </tr>
                            <tr style={{border:"2px Solid"}}>
                              <td>Total Installed Cooling Capacity
                                (Including Split AC's If Any)</td>
                              <td style={{border:"2px Solid"}} >{paraAc[index]?.installed_cooling_capacity}</td>
                            </tr>
                            <tr style={{border:"2px Solid"}}>
                              <td>Total No Of Cooling Units Installed</td>
                              <td style={{border:"2px Solid"}}>{paraAc[index]?.cooling_units_installed}</td>
                            </tr>
                            <tr style={{border:"2px Solid"}} >
                              <td>No Of Blowers Installed</td>
                              <td style={{border:"2px Solid"}}>{paraAc[index]?.no_blowers_installed==0  || paraAc[index]?.no_blowers_installed== null?"N/A":paraAc[index]?.no_blowers_installed}</td>
                            </tr>
                            <tr style={{border:"2px Solid"}}>
                              <td>Type Of Switching For Standby
                                Unit(Automatic/Manual)</td>
                              <td style={{border:"2px Solid"}}>{paraAc[index]?.switching_type}</td>
                            </tr>
                            <tr style={{border:"2px Solid"}}>
                              <td style={{border:"2px Solid"}}>Identification Number Of Individual
                                AC & Its Operating period</td>
                              <td>
                                <table style={{width:"97%",display:"flex", justifyContent:"space-around" }}>
                                    {paraAc[index]?.indication_number?.map((i)=>{
                                      console.log("object",i)
                                      return(
                                        <div style={{border:"2px Solid",width: "inherit"}} >
                                 <div  style={{border:"2px Solid",width: "inherit"}}>{i.value_name}</div>
                                 <div  style={{border:"2px Solid",width: "inherit"}}>{i.value}</div>
                                        </div>
                                      )
                                    })}

                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                                    ) : (
                                      ""
                                    )}

                  <div className="fourth-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test h-90v">
                        <MainHeader />
                        <div className="d-flex justify-content-center align-items-center ">
                          <h4 style={{display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "382px"}} className="font-weight-bold w-100 text-underline">
                            Location Diagram And Location Chart
                          </h4>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  <div class="page-break"></div>


                 
                 
                     {schematic_1 ? (
                       <div className="fifth-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="">
                          <h4 className="font-weight-bold text-underline text-left p-2">
                            Location Diagram Indicating Position Of Loggers (Schematic)
                          </h4>
                          {/* style={myState===true?{visibility:"hidden"}:{}}  */}
                          <img
                            src={`${imageUrl}Cases-Files//${schematic_1?.file}`}
                            className="image"
                            alt=""
                            />
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}
                    {schematic_2 ? (
                  <div className="fifth-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="">
                          <h4 className="font-weight-bold text-underline text-left p-2">
                            Location Diagram Indicating Position Of Loggers (Schematic)
                          </h4>
                          {/* style={myState===true?{visibility:"hidden"}:{}}  */}
                          <img
                            src={`${imageUrl}Cases-Files//${schematic_2?.file}`}
                            className="image"
                            alt=""
                            />
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                  
                  ) : (
                    ""
                  )}

                  {schematic_3 ? (
                    <div className="fifth-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="">
                          <h4 className="font-weight-bold text-underline text-left p-2">
                            Location Diagram Indicating Position Of Loggers (Schematic)
                          </h4>
                          {/* style={myState===true?{visibility:"hidden"}:{}}  */}
                          <img
                            src={`${imageUrl}Cases-Files//${schematic_3?.file}`}
                            className="image"
                            alt=""
                            />
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}
                  {schematic_4 ? (
                    <div className="fifth-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="">
                          <h4 className="font-weight-bold text-underline text-left p-2">
                            Location Diagram Indicating Position Of Loggers (Schematic)
                          </h4>
                          {/* style={myState===true?{visibility:"hidden"}:{}}  */}
                          <img
                            src={`${imageUrl}Cases-Files//${schematic_4?.file}`}
                            className="image"
                            alt=""
                            />
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}
                  {schematic_5 ? (
                    <div className="fifth-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="">
                          <h4 className="font-weight-bold text-underline text-left p-2">
                            Location Diagram Indicating Position Of Loggers (Schematic)
                          </h4>
                          {/* style={myState===true?{visibility:"hidden"}:{}}  */}
                          <img
                            src={`${imageUrl}Cases-Files//${schematic_5?.file}`}
                            className="image"
                            alt=""
                            />
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}
                  {schematic_6 ? (
                 
                    <div className="fifth-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="">
                          <h4 className="font-weight-bold text-underline text-left p-2">
                            Location Diagram Indicating Position Of Loggers (Schematic)
                          </h4>
                          {/* style={myState===true?{visibility:"hidden"}:{}}  */}
                          <img
                            src={`${imageUrl}Cases-Files//${schematic_6?.file}`}
                            className="image"
                            alt=""
                            />
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                            ) : (
                               ""
                             )}
                  {schematic_7 ? (
                    <div className="fifth-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="">
                          <h4 className="font-weight-bold text-underline text-left p-2">
                            Location Diagram Indicating Position Of Loggers (Schematic)
                          </h4>
                          {/* style={myState===true?{visibility:"hidden"}:{}}  */}
                          <img
                            src={`${imageUrl}Cases-Files//${schematic_7?.file}`}
                            className="image"
                            alt=""
                            />
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}
                  {isometric_1 ? (

                    <div   className="fifth-page pdf-h-w">
                            <RHeader user={user} />
                            <div className="p-1px test">
                              <div className="test ">
                                <MainHeader />
                                <div className="">
                                  <h4 className="font-weight-bold text-underline text-left p-2">
                                    Location Diagram Indicating Position Of Loggers (Isometric)
                                  </h4>
                                  <img
                                    src={`${imageUrl}Cases-Files//${isometric_1?.file}`}
                                    className="image"
                                    alt=""
                                    />
                                </div>
                              </div>
                            </div>
                              <div class="page-break"></div>
                          </div>
                            ) : (
                              ""
                            )}
                  {isometric_2 ? (
                    <div   className="fifth-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="">
                          <h4 className="font-weight-bold text-underline text-left p-2">
                            Location Diagram Indicating Position Of Loggers (Isometric)
                          </h4>
                          <img
                            src={`${imageUrl}Cases-Files//${isometric_2?.file}`}
                            className="image"
                            alt=""
                            />
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}
                  {isometric_3 ? (
                    <div   className="fifth-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="">
                          <h4 className="font-weight-bold text-underline text-left p-2">
                            Location Diagram Indicating Position Of Loggers (Isometric)
                          </h4>
                          <img
                            src={`${imageUrl}Cases-Files//${isometric_3?.file}`}
                            className="image"
                            alt=""
                            />
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}
                  {isometric_4 ? (
                    <div   className="fifth-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="">
                          <h4 className="font-weight-bold text-underline text-left p-2">
                            Location Diagram Indicating Position Of Loggers (Isometric)
                          </h4>
                          <img
                            src={`${imageUrl}Cases-Files//${isometric_4?.file}`}
                            className="image"
                            alt=""
                            />
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                            ) : (
                            ""
                            )}
                  {isometric_5 ? (
                    <div   className="fifth-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="">
                          <h4 className="font-weight-bold text-underline text-left p-2">
                            Location Diagram Indicating Position Of Loggers (Isometric)
                          </h4>
                          <img
                            src={`${imageUrl}Cases-Files//${isometric_5?.file}`}
                            className="image"
                            alt=""
                            />
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                            ) : (
                            ""
                            )}
                  {isometric_6 ? (
                    <div   className="fifth-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="">
                          <h4 className="font-weight-bold text-underline text-left p-2">
                            Location Diagram Indicating Position Of Loggers (Isometric)
                          </h4>
                          <img
                            src={`${imageUrl}Cases-Files//${isometric_6?.file}`}
                            className="image"
                            alt=""
                            />
                        </div>
                      </div>
                    </div>
                      <div class="page-break"></div>
                  </div>
                    ) : (
                    ""
                  )}
                  {postiionLogger1 ? (
                    <div className="30-page pdf-h-w-2 test">
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                              Location Diagram Indicating Position Of Loggers
                            </h4>
                            <img
                              src={`${imageUrl}Cases-Files//${postiionLogger1.file}`}
                              className="image w-50"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <div class="page-break"></div>
                    </div>
                  ) : (
                    ""
                  )}


                  {postiionLogger2 ? (
                    <div className="31-page pdf-h-w-2 test">
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                              Location Diagram Indicating Position Of Loggers
                            </h4>
                            <img
                              src={`${imageUrl}Cases-Files//${postiionLogger2.file}`}
                              className="image w-50"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <div class="page-break"></div>
                    </div>
                  ) : (
                    ""
                  )}


                  {postiionLogger3 ? (
                    <div className="32-page pdf-h-w-2 test">
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                              Location Diagram Indicating Position Of Loggers
                            </h4>
                            <img
                              src={`${imageUrl}Cases-Files//${postiionLogger3.file}`}
                              className="image w-50"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <div class="page-break"></div>
                    </div>
                  ) : (
                    ""
                  )}

                  {postiionLogger4 ? (
                    <div className="33-page pdf-h-w-2 test">
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                              Location Diagram Indicating Position Of Loggers
                            </h4>
                            <img
                              src={`${imageUrl}Cases-Files//${postiionLogger4.file}`}
                              className="image w-50"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <div class="page-break"></div>
                    </div>
                  ) : (
                    ""
                  )}

                  {postiionLogger5 ? (
                    <div className="34-page pdf-h-w-2 test">
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                              Location Diagram Indicating Position Of Loggers
                            </h4>
                            <img
                              src={`${imageUrl}Cases-Files//${postiionLogger5.file}`}
                              className="image w-50"
                              alt=""
                              />
                          </div>
                        </div>
                      </div>
                      <div class="page-break"></div>
                    </div>
                  ) : (
                    ""
                    )}
                   
                   {/* cccc */}
{ props?.sheet?.sheet?.data?.length > 0 ? (
  <div  className="34-page pdf-h-w" style={{"lineHeight":"19px"}}>
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                              Location Diagram Indicating Position Of Loggers
                            </h4>
                            <div style={{"width": "100%"}}>
      <table  style={{"width": "100%"}} sx={{ minWidth: 650 }} aria-label="simple table">
        <thead>
          <tr style={{border:"1px solid"}}>
            <th style={{border:"1px solid"}}>Sr. No.</th>
            <th style={{border:"1px solid"}}>LOGGER ID NO.</th>
            <th style={{border:"1px solid"}}  align="center">POSITION</th>
            <th style={{border:"1px solid"}} align="center">Distance From Left Side Wall (Mtr.)</th>
            <th style={{border:"1px solid"}} align="center">Distance From Front Side Wall (Mtr.)</th>
            <th style={{border:"1px solid"}} align="center">Distance From Ground (Mtr.)</th>
          </tr>
        </thead>
        <tbody>
          {props?.sheet?.sheet?.data?.slice(0,20)?.map((row,i) => (
            <tr style={{border:"1px solid"}}
            key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <th style={{border:"1px solid"}}  component="th" scope="row">
                {i+1}
              </th>
              <th style={{border:"1px solid"}} component="th" scope="row">
                {row.logger_id_no}
              </th>
              <th style={{border:"1px solid"}} align="center">{row.position}</th>
              <th style={{border:"1px solid"}} align="center">{row.left_side_wall}</th>
              <th style={{border:"1px solid"}} align="center">{row.front_side_wall}</th>
              <th style={{border:"1px solid"}} align="center">{row.distance_from_ground}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                          </div>
                        </div>
                      </div>
                      <div class="page-break"></div>
                    </div>
                  ) : (
                    ""
                    )}
{ props?.sheet?.sheet?.data?.slice(20,40).length > 0 ? (
  <div  className="34-page pdf-h-w" style={{"lineHeight":"19px"}}>
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                              Location Diagram Indicating Position Of Loggers
                            </h4>
                            <div style={{"width": "100%"}}>
      <table  style={{"width": "100%"}} sx={{ minWidth: 650 }} aria-label="simple table">
        <thead>
          <tr style={{border:"1px solid"}}>
            <th style={{border:"1px solid"}}>Sr. No.</th>
            <th style={{border:"1px solid"}}>LOGGER ID NO.</th>
            <th style={{border:"1px solid"}}  align="center">POSITION</th>
            <th style={{border:"1px solid"}} align="center">Distance From Left Side Wall (Mtr.)</th>
            <th style={{border:"1px solid"}} align="center">Distance From Front Side Wall (Mtr.)</th>
            <th style={{border:"1px solid"}} align="center">Distance From Ground (Mtr.)</th>
          </tr>
        </thead>
        <tbody>
          {props?.sheet?.sheet?.data?.slice(20,40)?.map((row,i) => (
            <tr style={{border:"1px solid"}}
            key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <th style={{border:"1px solid"}}  component="th" scope="row">
                {i+21}
              </th>
              <th style={{border:"1px solid"}} component="th" scope="row">
                {row.logger_id_no}
              </th>
              <th style={{border:"1px solid"}} align="center">{row.position}</th>
              <th style={{border:"1px solid"}} align="center">{row.left_side_wall}</th>
              <th style={{border:"1px solid"}} align="center">{row.front_side_wall}</th>
              <th style={{border:"1px solid"}} align="center">{row.distance_from_ground}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                          </div>
                        </div>
                      </div>
<div class="page-break"></div>
                    </div>
                  ) : (
                    ""
                    )}

{ props?.sheet?.sheet?.data?.slice(40,60).length > 0 ? (
  <div  className="34-page pdf-h-w" style={{"lineHeight":"19px"}}>
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                              Location Diagram Indicating Position Of Loggers
                            </h4>
                            <div style={{"width": "100%"}}>
      <table  style={{"width": "100%"}} sx={{ minWidth: 650 }} aria-label="simple table">
        <thead>
          <tr style={{border:"1px solid"}}>
            <th style={{border:"1px solid"}}>Sr. No.</th>
            <th style={{border:"1px solid"}}>LOGGER ID NO.</th>
            <th style={{border:"1px solid"}}  align="center">POSITION</th>
            <th style={{border:"1px solid"}} align="center">Distance From Left Side Wall (Mtr.)</th>
            <th style={{border:"1px solid"}} align="center">Distance From Front Side Wall (Mtr.)</th>
            <th style={{border:"1px solid"}} align="center">Distance From Ground (Mtr.)</th>
          </tr>
        </thead>
        <tbody>
          {props?.sheet?.sheet?.data?.slice(40,60)?.map((row,i) => (
            <tr style={{border:"1px solid"}}
            key={i}
            sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <th style={{border:"1px solid"}}  component="th" scope="row">
                {i+41}
              </th>
              <th style={{border:"1px solid"}} component="th" scope="row">
                {row.logger_id_no}
              </th>
              <th style={{border:"1px solid"}} align="center">{row.position}</th>
              <th style={{border:"1px solid"}} align="center">{row.left_side_wall}</th>
              <th style={{border:"1px solid"}} align="center">{row.front_side_wall}</th>
              <th style={{border:"1px solid"}} align="center">{row.distance_from_ground}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                          </div>
                        </div>
                      </div>
                      <div class="page-break"></div>
                    </div>
                  ) : (
                    ""
                    )}
{ props?.sheet?.sheet?.data?.slice(60,80).length > 0 ? (
  <div  className="34-page pdf-h-w" style={{"lineHeight":"19px"}}>
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                              Location Diagram Indicating Position Of Loggers
                            </h4>
                            <div style={{"width": "100%"}}>
      <table  style={{"width": "100%"}} sx={{ minWidth: 650 }} aria-label="simple table">
        <thead>
          <tr style={{border:"1px solid"}}>
            <th style={{border:"1px solid"}}>Sr. No.</th>
            <th style={{border:"1px solid"}}>LOGGER ID NO.</th>
            <th style={{border:"1px solid"}}  align="center">POSITION</th>
            <th style={{border:"1px solid"}} align="center">Distance From Left Side Wall (Mtr.)</th>
            <th style={{border:"1px solid"}} align="center">Distance From Front Side Wall (Mtr.)</th>
            <th style={{border:"1px solid"}} align="center">Distance From Ground (Mtr.)</th>
          </tr>
        </thead>
        <tbody>
          {props?.sheet?.sheet?.data?.slice(60,80)?.map((row,i) => (
            <tr style={{border:"1px solid"}}
            key={i}
            sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <th style={{border:"1px solid"}}  component="th" scope="row">
                {i+61}
              </th>
              <th style={{border:"1px solid"}} component="th" scope="row">
                {row.logger_id_no}
              </th>
              <th style={{border:"1px solid"}} align="center">{row.position}</th>
              <th style={{border:"1px solid"}} align="center">{row.left_side_wall}</th>
              <th style={{border:"1px solid"}} align="center">{row.front_side_wall}</th>
              <th style={{border:"1px solid"}} align="center">{row.distance_from_ground}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                          </div>
                        </div>
                      </div>
                      <div class="page-break"></div>
                    </div>
                  ) : (
                    ""
                    )}
{ props?.sheet?.sheet?.data?.slice(80,100).length > 0 ? (
  <div  className="34-page pdf-h-w" style={{"lineHeight":"19px"}}>
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                              Location Diagram Indicating Position Of Loggers
                            </h4>
                            <div style={{"width": "100%"}}>
      <table  style={{"width": "100%"}} sx={{ minWidth: 650 }} aria-label="simple table">
        <thead>
          <tr style={{border:"1px solid"}}>
            <th style={{border:"1px solid"}}>Sr. No.</th>
            <th style={{border:"1px solid"}}>LOGGER ID NO.</th>
            <th style={{border:"1px solid"}}  align="center">POSITION</th>
            <th style={{border:"1px solid"}} align="center">Distance From Left Side Wall (Mtr.)</th>
            <th style={{border:"1px solid"}} align="center">Distance From Front Side Wall (Mtr.)</th>
            <th style={{border:"1px solid"}} align="center">Distance From Ground (Mtr.)</th>
          </tr>
        </thead>
        <tbody>
          {props?.sheet?.sheet?.data?.slice(80,100)?.map((row,i) => (
            <tr style={{border:"1px solid"}}
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <th style={{border:"1px solid"}}  component="th" scope="row">
                {i+81}
              </th>
              <th style={{border:"1px solid"}} component="th" scope="row">
                {row.logger_id_no}
              </th>
              <th style={{border:"1px solid"}} align="center">{row.position}</th>
              <th style={{border:"1px solid"}} align="center">{row.left_side_wall}</th>
              <th style={{border:"1px solid"}} align="center">{row.front_side_wall}</th>
              <th style={{border:"1px solid"}} align="center">{row.distance_from_ground}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                          </div>
                        </div>
                      </div>
                      <div class="page-break"></div>
                    </div>
                  ) : (
                    ""
                    )}
{ props?.sheet?.sheet?.data?.slice(100,120).length > 0 ? (
  <div  className="34-page pdf-h-w" style={{"lineHeight":"19px"}}>
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                              Location Diagram Indicating Position Of Loggers
                            </h4>
                            <div style={{"width": "100%"}}>
      <table  style={{"width": "100%"}} sx={{ minWidth: 650 }} aria-label="simple table">
        <thead>
          <tr style={{border:"1px solid"}}>
            <th style={{border:"1px solid"}}>Sr. No.</th>
            <th style={{border:"1px solid"}}>LOGGER ID NO.</th>
            <th style={{border:"1px solid"}}  align="center">POSITION</th>
            <th style={{border:"1px solid"}} align="center">Distance From Left Side Wall (Mtr.)</th>
            <th style={{border:"1px solid"}} align="center">Distance From Front Side Wall (Mtr.)</th>
            <th style={{border:"1px solid"}} align="center">Distance From Ground (Mtr.)</th>
          </tr>
        </thead>
        <tbody>
          {props?.sheet?.sheet?.data?.slice(100,120)?.map((row,i) => (
            <tr style={{border:"1px solid"}}
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <th style={{border:"1px solid"}}  component="th" scope="row">
                {i+101}
              </th>
              <th style={{border:"1px solid"}} component="th" scope="row">
                {row.logger_id_no}
              </th>
              <th style={{border:"1px solid"}} align="center">{row.position}</th>
              <th style={{border:"1px solid"}} align="center">{row.left_side_wall}</th>
              <th style={{border:"1px solid"}} align="center">{row.front_side_wall}</th>
              <th style={{border:"1px solid"}} align="center">{row.distance_from_ground}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                          </div>
                        </div>
                      </div>
                      <div class="page-break"></div>
                    </div>
                  ) : (
                    ""
                  )}
{ props?.sheet?.sheet?.data?.slice(120,140).length > 0 ? (
  <div  className="34-page pdf-h-w" style={{"lineHeight":"19px"}}>
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                              Location Diagram Indicating Position Of Loggers
                            </h4>
                            <div style={{"width": "100%"}}>
      <table  style={{"width": "100%"}} sx={{ minWidth: 650 }} aria-label="simple table">
        <thead>
          <tr style={{border:"1px solid"}}>
            <th style={{border:"1px solid"}}>Sr. No.</th>
            <th style={{border:"1px solid"}}>LOGGER ID NO.</th>
            <th style={{border:"1px solid"}}  align="center">POSITION</th>
            <th style={{border:"1px solid"}} align="center">Distance From Left Side Wall (Mtr.)</th>
            <th style={{border:"1px solid"}} align="center">Distance From Front Side Wall (Mtr.)</th>
            <th style={{border:"1px solid"}} align="center">Distance From Ground (Mtr.)</th>
          </tr>
        </thead>
        <tbody>
          {props?.sheet?.sheet?.data?.slice(120,140)?.map((row,i) => (
            <tr style={{border:"1px solid"}}
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <th style={{border:"1px solid"}}  component="th" scope="row">
                {i+121}
              </th>
              <th style={{border:"1px solid"}} component="th" scope="row">
                {row.logger_id_no}
              </th>
              <th style={{border:"1px solid"}} align="center">{row.position}</th>
              <th style={{border:"1px solid"}} align="center">{row.left_side_wall}</th>
              <th style={{border:"1px solid"}} align="center">{row.front_side_wall}</th>
              <th style={{border:"1px solid"}} align="center">{row.distance_from_ground}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                          </div>
                        </div>
                      </div>
                      <div class="page-break"></div>
                    </div>
                  ) : (
                    ""
                  )}
{ props?.sheet?.sheet?.data?.slice(140,160).length > 0 ? (
  <div  className="34-page pdf-h-w" style={{"lineHeight":"19px"}}>
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                              Location Diagram Indicating Position Of Loggers
                            </h4>
                            <div style={{"width": "100%"}}>
      <table  style={{"width": "100%"}} sx={{ minWidth: 650 }} aria-label="simple table">
        <thead>
          <tr style={{border:"1px solid"}}>
            <th style={{border:"1px solid"}}>Sr. No.</th>
            <th style={{border:"1px solid"}}>LOGGER ID NO.</th>
            <th style={{border:"1px solid"}}  align="center">POSITION</th>
            <th style={{border:"1px solid"}} align="center">Distance From Left Side Wall (Mtr.)</th>
            <th style={{border:"1px solid"}} align="center">Distance From Front Side Wall (Mtr.)</th>
            <th style={{border:"1px solid"}} align="center">Distance From Ground (Mtr.)</th>
          </tr>
        </thead>
        <tbody>
          {props?.sheet?.sheet?.data?.slice(140,160)?.map((row,i) => (
            <tr style={{border:"1px solid"}}
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <th style={{border:"1px solid"}}  component="th" scope="row">
                {i+141}
              </th>
              <th style={{border:"1px solid"}} component="th" scope="row">
                {row.logger_id_no}
              </th>
              <th style={{border:"1px solid"}} align="center">{row.position}</th>
              <th style={{border:"1px solid"}} align="center">{row.left_side_wall}</th>
              <th style={{border:"1px solid"}} align="center">{row.front_side_wall}</th>
              <th style={{border:"1px solid"}} align="center">{row.distance_from_ground}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                          </div>
                        </div>
                      </div>
                      <div class="page-break"></div>
                    </div>
                  ) : (
                    ""
                  )}
{ props?.sheet?.sheet?.data?.slice(160,180).length > 0 ? (
  <div  className="34-page pdf-h-w" style={{"lineHeight":"19px"}}>
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                              Location Diagram Indicating Position Of Loggers
                            </h4>
                            <div style={{"width": "100%"}}>
      <table  style={{"width": "100%"}} sx={{ minWidth: 650 }} aria-label="simple table">
        <thead>
          <tr style={{border:"1px solid"}}>
            <th style={{border:"1px solid"}}>Sr. No.</th>
            <th style={{border:"1px solid"}}>LOGGER ID NO.</th>
            <th style={{border:"1px solid"}}  align="center">POSITION</th>
            <th style={{border:"1px solid"}} align="center">Distance From Left Side Wall (Mtr.)</th>
            <th style={{border:"1px solid"}} align="center">Distance From Front Side Wall (Mtr.)</th>
            <th style={{border:"1px solid"}} align="center">Distance From Ground (Mtr.)</th>
          </tr>
        </thead>
        <tbody>
          {props?.sheet?.sheet?.data?.slice(160,180)?.map((row,i) => (
            <tr style={{border:"1px solid"}}
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <th style={{border:"1px solid"}}  component="th" scope="row">
                {i+161}
              </th>
              <th style={{border:"1px solid"}} component="th" scope="row">
                {row.logger_id_no}
              </th>
              <th style={{border:"1px solid"}} align="center">{row.position}</th>
              <th style={{border:"1px solid"}} align="center">{row.left_side_wall}</th>
              <th style={{border:"1px solid"}} align="center">{row.front_side_wall}</th>
              <th style={{border:"1px solid"}} align="center">{row.distance_from_ground}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                          </div>
                        </div>
                      </div>
                      <div class="page-break"></div>
                    </div>
                  ) : (
                    ""
                  )}
{ props?.sheet?.sheet?.data?.slice(180,200).length > 0 ? (
  <div  className="34-page pdf-h-w" style={{"lineHeight":"19px"}}>
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                              Location Diagram Indicating Position Of Loggers
                            </h4>
                            <div style={{"width": "100%"}}>
      <table  style={{"width": "100%"}} sx={{ minWidth: 650 }} aria-label="simple table">
        <thead>
          <tr style={{border:"1px solid"}}>
            <th style={{border:"1px solid"}}>Sr. No.</th>
            <th style={{border:"1px solid"}}>LOGGER ID NO.</th>
            <th style={{border:"1px solid"}}  align="center">POSITION</th>
            <th style={{border:"1px solid"}} align="center">Distance From Left Side Wall (Mtr.)</th>
            <th style={{border:"1px solid"}} align="center">Distance From Front Side Wall (Mtr.)</th>
            <th style={{border:"1px solid"}} align="center">Distance From Ground (Mtr.)</th>
          </tr>
        </thead>
        <tbody>
          {props?.sheet?.sheet?.data?.slice(180,200)?.map((row,i) => (
            <tr style={{border:"1px solid"}}
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <th style={{border:"1px solid"}}  component="th" scope="row">
                {i+181}
              </th>
              <th style={{border:"1px solid"}} component="th" scope="row">
                {row.logger_id_no}
              </th>
              <th style={{border:"1px solid"}} align="center">{row.position}</th>
              <th style={{border:"1px solid"}} align="center">{row.left_side_wall}</th>
              <th style={{border:"1px solid"}} align="center">{row.front_side_wall}</th>
              <th style={{border:"1px solid"}} align="center">{row.distance_from_ground}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                          </div>
                        </div>
                      </div>
                      <div class="page-break"></div>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* sensors */}

                  { sensors?.length > 0 ? (
  <div  className="34-page pdf-h-w" style={{"lineHeight":"19px"}}>
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                            Naming Convention Used For The Data Loggers In The Report
                            </h4>
                            <div style={{"width": "100%"}}>
      <table  style={{"width": "100%"}} sx={{ minWidth: 650 }} aria-label="simple table">
        <tbody>
          {sensors?.slice(0,20)?.map((row,i) => (
            <tr style={{border:"1px solid"}}
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <th style={{border:"1px solid"}}  component="th" scope="row">
                {i == 0 ? "Sr. No.": i}
              </th>
              <th style={{border:"1px solid"}} component="th" scope="row">
                {row.logger_id_no}
              </th>
              <th style={{border:"1px solid"}} align="center">{row.logger_id}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_date}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_next_date}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_cert_no}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  { sensors?.slice(20,40)?.length > 0 ? (
  <div  className="34-page pdf-h-w" style={{"lineHeight":"19px"}}>
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                            Naming Convention Used For The Data Loggers In The Report
                            </h4>
                            <div style={{"width": "100%"}}>
      <table  style={{"width": "100%"}} sx={{ minWidth: 650 }} aria-label="simple table">
        <tbody>
          {sensors?.slice(20,40)?.map((row,i) => (
            <tr style={{border:"1px solid"}}
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <th style={{border:"1px solid"}}  component="th" scope="row">
                {i == 0 ? "Sr. No.": i}
              </th>
              <th style={{border:"1px solid"}} component="th" scope="row">
                {row.logger_id_no}
              </th>
              <th style={{border:"1px solid"}} align="center">{row.logger_id}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_date}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_next_date}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_cert_no}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  { sensors?.slice(40,60)?.length > 0 ? (
  <div  className="34-page pdf-h-w" style={{"lineHeight":"19px"}}>
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                            Naming Convention Used For The Data Loggers In The Report
                            </h4>
                            <div style={{"width": "100%"}}>
      <table  style={{"width": "100%"}} sx={{ minWidth: 650 }} aria-label="simple table">
        <tbody>
          {sensors?.slice(40,60)?.map((row,i) => (
            <tr style={{border:"1px solid"}}
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <th style={{border:"1px solid"}}  component="th" scope="row">
                {i == 0 ? "Sr. No.": i}
              </th>
              <th style={{border:"1px solid"}} component="th" scope="row">
                {row.logger_id_no}
              </th>
              <th style={{border:"1px solid"}} align="center">{row.logger_id}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_date}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_next_date}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_cert_no}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  { sensors?.slice(60,80)?.length > 0 ? (
  <div  className="34-page pdf-h-w" style={{"lineHeight":"19px"}}>
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                            Naming Convention Used For The Data Loggers In The Report
                            </h4>
                            <div style={{"width": "100%"}}>
      <table  style={{"width": "100%"}} sx={{ minWidth: 650 }} aria-label="simple table">
        <tbody>
          {sensors?.slice(60,80)?.map((row,i) => (
            <tr style={{border:"1px solid"}}
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <th style={{border:"1px solid"}}  component="th" scope="row">
                {i == 0 ? "Sr. No.": i}
              </th>
              <th style={{border:"1px solid"}} component="th" scope="row">
                {row.logger_id_no}
              </th>
              <th style={{border:"1px solid"}} align="center">{row.logger_id}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_date}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_next_date}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_cert_no}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  { sensors?.slice(80,100)?.length > 0 ? (
  <div  className="34-page pdf-h-w" style={{"lineHeight":"19px"}}>
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                            Naming Convention Used For The Data Loggers In The Report
                            </h4>
                            <div style={{"width": "100%"}}>
      <table  style={{"width": "100%"}} sx={{ minWidth: 650 }} aria-label="simple table">
        <tbody>
          {sensors?.slice(80,100)?.map((row,i) => (
            <tr style={{border:"1px solid"}}
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <th style={{border:"1px solid"}}  component="th" scope="row">
                {i == 0 ? "Sr. No.": i}
              </th>
              <th style={{border:"1px solid"}} component="th" scope="row">
                {row.logger_id_no}
              </th>
              <th style={{border:"1px solid"}} align="center">{row.logger_id}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_date}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_next_date}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_cert_no}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  { sensors?.slice(100,120)?.length > 0 ? (
  <div  className="34-page pdf-h-w" style={{"lineHeight":"19px"}}>
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                            Naming Convention Used For The Data Loggers In The Report
                            </h4>
                            <div style={{"width": "100%"}}>
      <table  style={{"width": "100%"}} sx={{ minWidth: 650 }} aria-label="simple table">
        <tbody>
          {sensors?.slice(100,120)?.map((row,i) => (
            <tr style={{border:"1px solid"}}
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <th style={{border:"1px solid"}}  component="th" scope="row">
                {i == 0 ? "Sr. No.": i}
              </th>
              <th style={{border:"1px solid"}} component="th" scope="row">
                {row.logger_id_no}
              </th>
              <th style={{border:"1px solid"}} align="center">{row.logger_id}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_date}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_next_date}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_cert_no}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  { sensors?.slice(120,140)?.length > 0 ? (
  <div  className="34-page pdf-h-w" style={{"lineHeight":"19px"}}>
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                            Naming Convention Used For The Data Loggers In The Report
                            </h4>
                            <div style={{"width": "100%"}}>
      <table  style={{"width": "100%"}} sx={{ minWidth: 650 }} aria-label="simple table">
        <tbody>
          {sensors?.slice(120,140)?.map((row,i) => (
            <tr style={{border:"1px solid"}}
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <th style={{border:"1px solid"}}  component="th" scope="row">
                {i == 0 ? "Sr. No.": i}
              </th>
              <th style={{border:"1px solid"}} component="th" scope="row">
                {row.logger_id_no}
              </th>
              <th style={{border:"1px solid"}} align="center">{row.logger_id}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_date}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_next_date}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_cert_no}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  { sensors?.slice(140,160)?.length > 0 ? (
  <div  className="34-page pdf-h-w" style={{"lineHeight":"19px"}}>
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                            Naming Convention Used For The Data Loggers In The Report
                            </h4>
                            <div style={{"width": "100%"}}>
      <table  style={{"width": "100%"}} sx={{ minWidth: 650 }} aria-label="simple table">
        <tbody>
          {sensors?.slice(140,160)?.map((row,i) => (
            <tr style={{border:"1px solid"}}
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <th style={{border:"1px solid"}}  component="th" scope="row">
                {i == 0 ? "Sr. No.": i}
              </th>
              <th style={{border:"1px solid"}} component="th" scope="row">
                {row.logger_id_no}
              </th>
              <th style={{border:"1px solid"}} align="center">{row.logger_id}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_date}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_next_date}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_cert_no}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  { sensors?.slice(160,180)?.length > 0 ? (
  <div  className="34-page pdf-h-w" style={{"lineHeight":"19px"}}>
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                            Naming Convention Used For The Data Loggers In The Report
                            </h4>
                            <div style={{"width": "100%"}}>
      <table  style={{"width": "100%"}} sx={{ minWidth: 650 }} aria-label="simple table">
        <tbody>
          {sensors?.slice(160,180)?.map((row,i) => (
            <tr style={{border:"1px solid"}}
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <th style={{border:"1px solid"}}  component="th" scope="row">
                {i == 0 ? "Sr. No.": i}
              </th>
              <th style={{border:"1px solid"}} component="th" scope="row">
                {row.logger_id_no}
              </th>
              <th style={{border:"1px solid"}} align="center">{row.logger_id}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_date}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_next_date}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_cert_no}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  { sensors?.slice(180,200)?.length > 0 ? (
  <div  className="34-page pdf-h-w" style={{"lineHeight":"19px"}}>
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                            Naming Convention Used For The Data Loggers In The Report
                            </h4>
                            <div style={{"width": "100%"}}>
      <table  style={{"width": "100%"}} sx={{ minWidth: 650 }} aria-label="simple table">
        <tbody>
          {sensors?.slice(180,200)?.map((row,i) => (
            <tr style={{border:"1px solid"}}
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <th style={{border:"1px solid"}}  component="th" scope="row">
                {i == 0 ? "Sr. No.": i}
              </th>
              <th style={{border:"1px solid"}} component="th" scope="row">
                {row.logger_id_no}
              </th>
              <th style={{border:"1px solid"}} align="center">{row.logger_id}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_date}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_next_date}</th>
              <th style={{border:"1px solid"}} align="center">{row.calibration_cert_no}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

{/* START UP STUDY Test Start here */}
{myState4 == true  ? (
                    <div className="nineth-page pdf-h-w"
                  >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <div className="test">
                          <div className="d-flex">
                            <span className="test-b p-2 test-r w-40">
                              Objective : Thermal Qualification Study For
                              {user.type_of_room} {user.type_of_cycle}
                            </span>
                            <span className="test-b p-1 test-r w-30">
                              Type Of Cycle:{" "}
                              {staticGraphData?.door_open_test_name}
                            </span>
                            <span className="test-b p-1 w-30">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex text-left">
                            <span className="w-60 test-b p-2 test-r font-weight-bold">
                              Customer Name : {user.company?.name}
                            </span>
                            <span className="w-40 test-b p-2">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                          <div className="test p-2 text-left">
                            Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-70v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Temperature Vs Time)
                            <br />
                            {staticGraphData?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                                <div class="page-break"></div>
                  </div>

                              ) : (
                                ""
                              )}
                  {myState4 == true  ? (
                    <div className="tenth-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {staticGraphData?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={staticGraphData?.start_date}
                                />{" "}
                                {staticGraphData?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat data={staticGraphData?.end_date} />{" "}
                                {staticGraphData?.do_off_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <FinalReportVegaGraph2
                          test_id={static1[0]?.id}
                          testName="START UP STUDY TEST CYCLE-I (WITH AMBIENT)"
                          mxHeight={320}
                          x_min_excersion={
                            staticGraphData.x_min_excersion ?? ""
                          }
                          x_max_excersion={
                            staticGraphData.x_max_excersion ?? ""
                          }
                          y_min_excersion={
                            staticGraphData.y_min_excersion ?? ""
                          }
                          y_max_excersion={
                            staticGraphData.y_max_excersion ?? ""
                          }
                          x_min_recovery={staticGraphData.x_min_recovery ?? ""}
                          x_max_recovery={staticGraphData.x_max_recovery ?? ""}
                          y_min_recovery={staticGraphData.y_min_recovery ?? ""}
                          y_max_recovery={staticGraphData.y_max_recovery ?? ""}
                        />
                      </div>
                    </div>
                            <div class="page-break"></div>
                  </div>
                          ) : (
                            ""
                            )}

                  {myState4 == true  ? (
                    <div className="eleventh-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {staticGraphData?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={staticGraphData?.start_date}
                                />{" "}
                                {staticGraphData?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat data={staticGraphData?.end_date} />{" "}
                                {staticGraphData?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <FinalReportVegaGraph2
                          test_id={static1[0]?.id}
                          testName="START UP STUDY TEST CYCLE-I (WITHOUT AMBIENT)"
                          mxHeight={320}
                          x_min_excersion={
                            staticGraphData.x_min_excersion ?? ""
                          }
                          x_max_excersion={
                            staticGraphData.x_max_excersion ?? ""
                          }
                          y_min_excersion={
                            staticGraphData.y_min_excersion ?? ""
                          }
                          y_max_excersion={
                            staticGraphData.y_max_excersion ?? ""
                          }
                          x_min_recovery={staticGraphData.x_min_recovery ?? ""}
                          x_max_recovery={staticGraphData.x_max_recovery ?? ""}
                          y_min_recovery={staticGraphData.y_min_recovery ?? ""}
                          y_max_recovery={staticGraphData.y_max_recovery ?? ""}
                        />
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                  ) : (
                    ""
                  )}
                  {/* II */}
                    {myState42 == true  ? (
                      
                      <div className="nineth-page pdf-h-w" 
                  >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <div className="test">
                          <div className="d-flex">
                            <span className="test-b p-2 test-r w-40">
                              Objective : Thermal Qualification Study For
                              {user.type_of_room} {user.type_of_cycle}
                            </span>
                            <span className="test-b p-1 test-r w-30">
                              Type Of Cycle:{" "}
                              {staticGraphData2?.door_open_test_name}
                            </span>
                            <span className="test-b p-1 w-30">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex text-left">
                            <span className="w-60 test-b p-2 test-r font-weight-bold">
                              Customer Name : {user.company?.name}
                            </span>
                            <span className="w-40 test-b p-2">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                          <div className="test p-2 text-left">
                            Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-70v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Temperature Vs Time)
                            <br />
                            {staticGraphData2?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
<div class="page-break"></div>
                  </div>

) : (
  ""
)}
                    {myState42 == true  ? (
                      <div className="tenth-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {staticGraphData2?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={staticGraphData2?.start_date}
                                />{" "}
                                {staticGraphData2?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat data={staticGraphData2?.end_date} />{" "}
                                {staticGraphData2?.do_off_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <FinalReportVegaGraph2
                          test_id={static2[0]?.id}
                          testName="START UP STUDY TEST CYCLE-II (WITH AMBIENT)"
                          mxHeight={320}
                          x_min_excersion={
                            staticGraphData2.x_min_excersion ?? ""
                          }
                          x_max_excersion={
                            staticGraphData2.x_max_excersion ?? ""
                          }
                          y_min_excersion={
                            staticGraphData2.y_min_excersion ?? ""
                          }
                          y_max_excersion={
                            staticGraphData2.y_max_excersion ?? ""
                          }
                          x_min_recovery={staticGraphData2.x_min_recovery ?? ""}
                          x_max_recovery={staticGraphData2.x_max_recovery ?? ""}
                          y_min_recovery={staticGraphData2.y_min_recovery ?? ""}
                          y_max_recovery={staticGraphData2.y_max_recovery ?? ""}
                        />
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                              ) : (
                                ""
                              )}


                    {myState42 == true  ? (
                      <div className="eleventh-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {staticGraphData2?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={staticGraphData2?.start_date}
                                />{" "}
                                {staticGraphData2?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat data={staticGraphData2?.end_date} />{" "}
                                {staticGraphData2?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <FinalReportVegaGraph2
                          test_id={static2[0]?.id}
                          testName="START UP STUDY TEST CYCLE-II (WITHOUT AMBIENT)"
                          mxHeight={320}
                          x_min_excersion={
                            staticGraphData2.x_min_excersion ?? ""
                          }
                          x_max_excersion={
                            staticGraphData2.x_max_excersion ?? ""
                          }
                          y_min_excersion={
                            staticGraphData2.y_min_excersion ?? ""
                          }
                          y_max_excersion={
                            staticGraphData2.y_max_excersion ?? ""
                          }
                          x_min_recovery={staticGraphData2.x_min_recovery ?? ""}
                          x_max_recovery={staticGraphData2.x_max_recovery ?? ""}
                          y_min_recovery={staticGraphData2.y_min_recovery ?? ""}
                          y_max_recovery={staticGraphData2.y_max_recovery ?? ""}
                        />
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                  ) : (
                    ""
                  )}
                  {/* III */}
                    {myState43 == true  ? (
                      <div className="nineth-page pdf-h-w" 
                      >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <div className="test">
                          <div className="d-flex">
                            <span className="test-b p-2 test-r w-40">
                              Objective : Thermal Qualification Study For
                              {user.type_of_room} {user.type_of_cycle}
                            </span>
                            <span className="test-b p-1 test-r w-30">
                              Type Of Cycle:{" "}
                              {staticGraphData3?.door_open_test_name}
                            </span>
                            <span className="test-b p-1 w-30">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex text-left">
                            <span className="w-60 test-b p-2 test-r font-weight-bold">
                              Customer Name : {user.company?.name}
                            </span>
                            <span className="w-40 test-b p-2">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                          <div className="test p-2 text-left">
                            Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-70v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Temperature Vs Time)
                            <br />
                            {staticGraphData3?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                                  <div class="page-break"></div>
                  </div>

                                ) : (
                                  ""
                                )}
                    {myState43 == true  ? (
                      <div className="tenth-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {staticGraphData3?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={staticGraphData3?.start_date}
                                />{" "}
                                {staticGraphData3?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat data={staticGraphData3?.end_date} />{" "}
                                {staticGraphData3?.do_off_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <FinalReportVegaGraph2
                          test_id={static3[0]?.id}
                          testName="START UP STUDY TEST CYCLE-III (WITH AMBIENT)"
                          mxHeight={320}
                          x_min_excersion={
                            staticGraphData3.x_min_excersion ?? ""
                          }
                          x_max_excersion={
                            staticGraphData3.x_max_excersion ?? ""
                          }
                          y_min_excersion={
                            staticGraphData3.y_min_excersion ?? ""
                          }
                          y_max_excersion={
                            staticGraphData3.y_max_excersion ?? ""
                          }
                          x_min_recovery={staticGraphData3.x_min_recovery ?? ""}
                          x_max_recovery={staticGraphData3.x_max_recovery ?? ""}
                          y_min_recovery={staticGraphData3.y_min_recovery ?? ""}
                          y_max_recovery={staticGraphData3.y_max_recovery ?? ""}
                        />
                      </div>
                    </div>
                  <div class="page-break"></div>
                  </div>
                              ) : (
                                ""
                              )}

                    {myState43 == true  ? (
                      <div className="eleventh-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {staticGraphData3?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={staticGraphData3?.start_date}
                                />{" "}
                                {staticGraphData3?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat data={staticGraphData3?.end_date} />{" "}
                                {staticGraphData3?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <FinalReportVegaGraph2
                          test_id={static3[0]?.id}
                          testName="START UP STUDY TEST CYCLE-III (WITHOUT AMBIENT)"
                          mxHeight={320}
                          x_min_excersion={
                            staticGraphData3.x_min_excersion ?? ""
                          }
                          x_max_excersion={
                            staticGraphData3.x_max_excersion ?? ""
                          }
                          y_min_excersion={
                            staticGraphData3.y_min_excersion ?? ""
                          }
                          y_max_excersion={
                            staticGraphData3.y_max_excersion ?? ""
                          }
                          x_min_recovery={staticGraphData3.x_min_recovery ?? ""}
                          x_max_recovery={staticGraphData3.x_max_recovery ?? ""}
                          y_min_recovery={staticGraphData3.y_min_recovery ?? ""}
                          y_max_recovery={staticGraphData3.y_max_recovery ?? ""}
                        />
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}
                  {/* START UP STUDY Test End Here */}


                  {myState2 == true  ? (
                    <div  className="sixth-page pdf-h-w" >
                    <RHeader user={user} />
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
                              {continuousGraphData?.door_open_test_name}
                            </span>
                            <span className="test-b w-33">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex text-left">
                            <span className="w-60 test-b test-r font-weight-bold pl-2">
                              Customer Name : {user?.company?.name}
                            </span>
                            <span className="w-40 test-b pl-2">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                        </div>

                        <div className="test p-2 text-left">
                          Customer Address: {companyAddress}
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-80v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Temperature Vs Time) <br />{" "}
                            {continuousGraphData?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                  ) : (
                    ""
                  )}
                  

                  {myState2 == true  ? (
                    <div className="seventh-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        {/* <div className="seventh-page" > */}
                    {/* <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test"> */}
                        {/* <div className="test">
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {continuousGraphData?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={continuousGraphData?.start_date}
                                />{" "}
                                {continuousGraphData?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat
                                  data={continuousGraphData?.end_date}
                                />{" "}
                                {continuousGraphData?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div> */}
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {continuousGraphData?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={continuousGraphData?.start_date}
                                  />{" "}
                                {continuousGraphData?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat
                                  data={continuousGraphData?.end_date}
                                />{" "}
                                {continuousGraphData?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                          <FinalReportVegaGraph2
                            test_id={Continuous1[0]?.id}
                            testName="CONTINUOUS OPERATION TEST CYCLE (WITH AMBIENT)"
                            className=""
                            mxHeight={350}
                            x_min_excersion={""}
                            x_max_excersion={""}
                            y_min_excersion={""}
                            y_max_excersion={""}
                            x_min_recovery={""}
                            x_max_recovery={""}
                            y_min_recovery={""}
                            y_max_recovery={""}
                          />
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                  ) : (
                    ""
                  )}
                  {myState2 == true  ? (
                    <div className="eightth-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {continuousGraphData?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={continuousGraphData?.start_date}
                                  />{" "}
                                {continuousGraphData?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat
                                  data={continuousGraphData?.end_date}
                                />{" "}
                                {continuousGraphData?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <FinalReportVegaGraph2
                          test_id={Continuous1[0]?.id}
                          testName="CONTINUOUS OPERATION TEST CYCLE (WITHOUT AMBIENT)"
                          mxHeight={380}
                          x_min_excersion={""}
                          x_max_excersion={""}
                          y_min_excersion={""}
                          y_max_excersion={""}
                          x_min_recovery={""}
                          x_max_recovery={""}
                          y_min_recovery={""}
                          y_max_recovery={""}
                        />
                      </div>
                    </div>
                            <div class="page-break"></div>
                  </div>
                          ) : (
                            ""
                          )}
                          {/* continuous humidity 1 */}
                  {myState2 == true  ? (
                    <div  className="sixth-page pdf-h-w" >
                    <RHeader user={user} />
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
                              {continuousGraphData?.door_open_test_name}
                            </span>
                            <span className="test-b w-33">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex text-left">
                            <span className="w-60 test-b test-r font-weight-bold pl-2">
                              Customer Name : {user?.company?.name}
                            </span>
                            <span className="w-40 test-b pl-2">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                        </div>

                        <div className="test p-2 text-left">
                          Customer Address: {companyAddress}
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-80v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Humidity Vs Time) <br />{" "}
                            {continuousGraphData?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                  ) : (
                    ""
                  )}
                  

                  {myState2 == true  ? (
                    <div className="seventh-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        {/* <div className="seventh-page" > */}
                    {/* <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test"> */}
                        {/* <div className="test">
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {continuousGraphData?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={continuousGraphData?.start_date}
                                />{" "}
                                {continuousGraphData?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat
                                  data={continuousGraphData?.end_date}
                                />{" "}
                                {continuousGraphData?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div> */}
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {continuousGraphData?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={continuousGraphData?.start_date}
                                  />{" "}
                                {continuousGraphData?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat
                                  data={continuousGraphData?.end_date}
                                />{" "}
                                {continuousGraphData?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                          <FinalReportVegaGraphHumidity
                            test_id={Continuous1[0]?.id}
                            testName="CONTINUOUS OPERATION TEST CYCLE (WITH AMBIENT)"
                            className=""
                            mxHeight={350}
                            x_min_excersion={""}
                            x_max_excersion={""}
                            y_min_excersion={""}
                            y_max_excersion={""}
                            x_min_recovery={""}
                            x_max_recovery={""}
                            y_min_recovery={""}
                            y_max_recovery={""}
                          />
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                  ) : (
                    ""
                  )}
                  {myState2 == true  ? (
                    <div className="eightth-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {continuousGraphData?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={continuousGraphData?.start_date}
                                  />{" "}
                                {continuousGraphData?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat
                                  data={continuousGraphData?.end_date}
                                />{" "}
                                {continuousGraphData?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <FinalReportVegaGraphHumidity
                          test_id={Continuous1[0]?.id}
                          testName="CONTINUOUS OPERATION TEST CYCLE (WITHOUT AMBIENT)"
                          mxHeight={380}
                          x_min_excersion={""}
                          x_max_excersion={""}
                          y_min_excersion={""}
                          y_max_excersion={""}
                          x_min_recovery={""}
                          x_max_recovery={""}
                          y_min_recovery={""}
                          y_max_recovery={""}
                        />
                      </div>
                    </div>
                            <div class="page-break"></div>
                  </div>
                          ) : (
                            ""
                          )}
                  {/* II */}
                  {myState22 == true  ? (
                    <div className="sixth-page pdf-h-w" >
                    <RHeader user={user} />
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
                              {continuousGraphData2?.door_open_test_name}
                            </span>
                            <span className="test-b w-33">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex text-left">
                            <span className="w-60 test-b test-r font-weight-bold pl-2">
                              Customer Name : {user?.company?.name}
                            </span>
                            <span className="w-40 test-b pl-2">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                        </div>

                        <div className="test p-2 text-left">
                          Customer Address: {companyAddress}
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-80v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Temperature Vs Time) <br />{" "}
                            {continuousGraphData2?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                  <div class="page-break"></div>
                  </div>
                  ) : (
                    ""
                  )}

                  {myState22 == true  ? (

                  <div className="seventh-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {continuousGraphData2?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={continuousGraphData2?.start_date}
                                />{" "}
                                {continuousGraphData2?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat
                                  data={continuousGraphData2?.end_date}
                                />{" "}
                                {continuousGraphData2?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div className="">
                          <FinalReportVegaGraph2
                            test_id={Continuous2[0]?.id}
                            testName="CONTINUOUS OPERATION TEST CYCLE-II (WITH AMBIENT)"
                            className=""
                            mxHeight={350}
                            x_min_excersion={""}
                            x_max_excersion={""}
                            y_min_excersion={""}
                            y_max_excersion={""}
                            x_min_recovery={""}
                            x_max_recovery={""}
                            y_min_recovery={""}
                            y_max_recovery={""}
                          />
                        </div>
                      </div>
                    </div>
                  <div class="page-break"></div>
                  </div>
                  ) : (
                    ""
                  )}

                  {myState22 == true  ? (
                  <div className="eightth-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {continuousGraphData2?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={continuousGraphData2?.start_date}
                                />{" "}
                                {continuousGraphData2?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat
                                  data={continuousGraphData2?.end_date}
                                  />{" "}
                                {continuousGraphData2?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <FinalReportVegaGraph2
                          test_id={Continuous2[0]?.id}
                          testName="CONTINUOUS OPERATION TEST CYCLE-II (WITHOUT AMBIENT)"
                          mxHeight={380}
                          x_min_excersion={""}
                          x_max_excersion={""}
                          y_min_excersion={""}
                          y_max_excersion={""}
                          x_min_recovery={""}
                          x_max_recovery={""}
                          y_min_recovery={""}
                          y_max_recovery={""}
                        />
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                  ) : (
                    ""
                  )}
                  {/* continue humidity 2 */}
                  {myState22 == true  ? (
                    <div className="sixth-page pdf-h-w" >
                    <RHeader user={user} />
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
                              {continuousGraphData2?.door_open_test_name}
                            </span>
                            <span className="test-b w-33">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex text-left">
                            <span className="w-60 test-b test-r font-weight-bold pl-2">
                              Customer Name : {user?.company?.name}
                            </span>
                            <span className="w-40 test-b pl-2">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                        </div>

                        <div className="test p-2 text-left">
                          Customer Address: {companyAddress}
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-80v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Humidity Vs Time) <br />{" "}
                            {continuousGraphData2?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                  <div class="page-break"></div>
                  </div>
                  ) : (
                    ""
                  )}

                  {myState22 == true  ? (

                  <div className="seventh-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {continuousGraphData2?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={continuousGraphData2?.start_date}
                                />{" "}
                                {continuousGraphData2?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat
                                  data={continuousGraphData2?.end_date}
                                />{" "}
                                {continuousGraphData2?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div className="">
                          <FinalReportVegaGraphHumidity
                            test_id={Continuous2[0]?.id}
                            testName="CONTINUOUS OPERATION TEST CYCLE-II (WITH AMBIENT)"
                            className=""
                            mxHeight={350}
                            x_min_excersion={""}
                            x_max_excersion={""}
                            y_min_excersion={""}
                            y_max_excersion={""}
                            x_min_recovery={""}
                            x_max_recovery={""}
                            y_min_recovery={""}
                            y_max_recovery={""}
                          />
                        </div>
                      </div>
                    </div>
                  <div class="page-break"></div>
                  </div>
                  ) : (
                    ""
                  )}

                  {myState22 == true  ? (
                  <div className="eightth-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {continuousGraphData2?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={continuousGraphData2?.start_date}
                                />{" "}
                                {continuousGraphData2?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat
                                  data={continuousGraphData2?.end_date}
                                  />{" "}
                                {continuousGraphData2?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <FinalReportVegaGraphHumidity
                          test_id={Continuous2[0]?.id}
                          testName="CONTINUOUS OPERATION TEST CYCLE-II (WITHOUT AMBIENT)"
                          mxHeight={380}
                          x_min_excersion={""}
                          x_max_excersion={""}
                          y_min_excersion={""}
                          y_max_excersion={""}
                          x_min_recovery={""}
                          x_max_recovery={""}
                          y_min_recovery={""}
                          y_max_recovery={""}
                        />
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                  ) : (
                    ""
                  )}
                  {/* continue 3 */}
                  {myState23 == true  ? (
                    <div className="sixth-page pdf-h-w">
                    <RHeader user={user} />
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
                              {continuousGraphData3?.door_open_test_name}
                            </span>
                            <span className="test-b w-33">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex text-left">
                            <span className="w-60 test-b test-r font-weight-bold pl-2">
                              Customer Name : {user?.company?.name}
                            </span>
                            <span className="w-40 test-b pl-2">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                        </div>

                        <div className="test p-2 text-left">
                          Customer Address: {companyAddress}
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-80v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Temperature Vs Time) <br />{" "}
                            {continuousGraphData3?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>

                          ) : (
                            ""
                          )}
                  {myState23 == true  ? (
                    <div className="seventh-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {continuousGraphData3?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={continuousGraphData3?.start_date}
                                />{" "}
                                {continuousGraphData3?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat
                                  data={continuousGraphData3?.end_date}
                                />{" "}
                                {continuousGraphData3?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div className="">
                          <FinalReportVegaGraph2
                            test_id={Continuous3[0]?.id}
                            testName="CONTINUOUS OPERATION TEST CYCLE -III (WITH AMBIENT)"
                            className=""
                            mxHeight={350}
                            x_min_excersion={""}
                            x_max_excersion={""}
                            y_min_excersion={""}
                            y_max_excersion={""}
                            x_min_recovery={""}
                            x_max_recovery={""}
                            y_min_recovery={""}
                            y_max_recovery={""}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}

                  {myState23 == true  ? (
                    
                    <div className="eightth-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {continuousGraphData3?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={continuousGraphData2?.start_date}
                                />{" "}
                                {continuousGraphData3?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat
                                  data={continuousGraphData3?.end_date}
                                />{" "}
                                {continuousGraphData3?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <FinalReportVegaGraph2
                          test_id={Continuous3[0]?.id}
                          testName="CONTINUOUS OPERATION TEST CYCLE-III (WITHOUT AMBIENT)"
                          mxHeight={380}
                          x_min_excersion={""}
                          x_max_excersion={""}
                          y_min_excersion={""}
                          y_max_excersion={""}
                          x_min_recovery={""}
                          x_max_recovery={""}
                          y_min_recovery={""}
                          y_max_recovery={""}
                        />
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                          ) : (
                            ""
                            )}
                  {/* Humidity continue 3 */}
                  {myState23 == true  ? (
                    <div className="sixth-page pdf-h-w">
                    <RHeader user={user} />
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
                              {continuousGraphData3?.door_open_test_name}
                            </span>
                            <span className="test-b w-33">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex text-left">
                            <span className="w-60 test-b test-r font-weight-bold pl-2">
                              Customer Name : {user?.company?.name}
                            </span>
                            <span className="w-40 test-b pl-2">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                        </div>

                        <div className="test p-2 text-left">
                          Customer Address: {companyAddress}
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-80v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Humidity Vs Time) <br />{" "}
                            {continuousGraphData3?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>

                          ) : (
                            ""
                          )}
                  {myState23 == true  ? (
                    <div className="seventh-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {continuousGraphData3?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={continuousGraphData3?.start_date}
                                />{" "}
                                {continuousGraphData3?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat
                                  data={continuousGraphData3?.end_date}
                                />{" "}
                                {continuousGraphData3?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div className="">
                          <FinalReportVegaGraphHumidity
                            test_id={Continuous3[0]?.id}
                            testName="CONTINUOUS OPERATION TEST CYCLE -III (WITH AMBIENT)"
                            className=""
                            mxHeight={350}
                            x_min_excersion={""}
                            x_max_excersion={""}
                            y_min_excersion={""}
                            y_max_excersion={""}
                            x_min_recovery={""}
                            x_max_recovery={""}
                            y_min_recovery={""}
                            y_max_recovery={""}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}

                  {myState23 == true  ? (
                    
                    <div className="eightth-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {continuousGraphData3?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={continuousGraphData2?.start_date}
                                />{" "}
                                {continuousGraphData3?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat
                                  data={continuousGraphData3?.end_date}
                                />{" "}
                                {continuousGraphData3?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <FinalReportVegaGraphHumidity
                          test_id={Continuous3[0]?.id}
                          testName="CONTINUOUS OPERATION TEST CYCLE-III (WITHOUT AMBIENT)"
                          mxHeight={380}
                          x_min_excersion={""}
                          x_max_excersion={""}
                          y_min_excersion={""}
                          y_max_excersion={""}
                          x_min_recovery={""}
                          x_max_recovery={""}
                          y_min_recovery={""}
                          y_max_recovery={""}
                        />
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                          ) : (
                            ""
                            )}


                  {/* Door Open Test Start here */}
                  
                    {myState == true  ? (
                      <div className="12-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <div className="test">
                          <div className="d-flex">
                            <span className="test-b p-1 test-r w-40">
                              Objective : Thermal Qualification Study For
                              {user.type_of_room} {user.type_of_cycle}
                            </span>
                            <span className="test-b p-1 test-r w-30">
                              Type Of Cycle:{" "}
                              {doorOpenGraphData1?.door_open_test_name}
                            </span>
                            <span className="test-b p-1 w-30">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex text-left">
                            <span className="w-60 test-b font-weight-bold p-2 test-r">
                              Customer Name : {user.company?.name}
                            </span>
                            <span className="w-40 test-b p-2">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                          <div className="test text-left p-2">
                            Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-70v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Temperature Vs Time)
                            <br />
                            {doorOpenGraphData1?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                                <div class="page-break"></div>
                  </div>

                              ) : (
                                ""
                              )}
                    {myState == true  ? (
                      <div className="13-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-30 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-30 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-30 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-30 p-2 test-r">
                                {doorOpenGraphData1?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={doorOpenGraphData1?.start_date}
                                />{" "}
                                {doorOpenGraphData1?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat
                                  data={doorOpenGraphData1?.end_date}
                                />{" "}
                                {getTimeInSeconds(doorOpenGraphData1?.do_off_time) > getTimeInSeconds(doorOpenGraphData1?.set_limit_cross_in_time) ? doorOpenGraphData1?.do_off_time : doorOpenGraphData1?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          {/* { console.log("doorOpenGraphData",doorOpenGraphData1?.do_off_time > doorOpenGraphData1?.set_limit_cross_in_time ?doorOpenGraphData1?.set_limit_cross_in_time:doorOpenGraphData1?.do_off_time,"w",doorOpenGraphData1?.do_off_time,doorOpenGraphData1?.set_limit_cross_in_time ) } */}
                          {/* { console.log("doorOpenGraphData",getTimeInSeconds(doorOpenGraphData1?.do_off_time) > getTimeInSeconds(doorOpenGraphData1?.set_limit_cross_in_time) ? doorOpenGraphData1?.do_off_time : doorOpenGraphData1?.set_limit_cross_in_time ) } */}
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-25 test-b p-1 test-r">
                                Door Open Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Door Close Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex ">
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData1?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData1?.set_limit_cross_out_time==null?"N/A":doorOpenGraphData1?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData1?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {doorOpenGraphData1?.set_limit_cross_in_time==null?"N/A":doorOpenGraphData1?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div
                          >
                          <FinalReportVegaGraph
                            test_id={door1[0]?.id}
                            testName="DOOR OPEN TEST CYCLE-I (WITH AMBIENT)"
                            mxHeight={320}
                            x_min_excersion={
                              doorOpenGraphData1?.x_min_excersion ?? ""
                            }
                            x_max_excersion={
                              doorOpenGraphData1?.x_max_excersion ?? ""
                            }
                            y_min_excersion={
                              doorOpenGraphData1?.y_min_excersion ?? ""
                            }
                            y_max_excersion={
                              doorOpenGraphData1?.y_max_excersion ?? ""
                            }
                            x_min_recovery={
                              doorOpenGraphData1?.x_min_recovery ?? ""
                            }
                            x_max_recovery={
                              doorOpenGraphData1?.x_max_recovery ?? ""
                            }
                            y_min_recovery={
                              doorOpenGraphData1?.y_min_recovery ?? ""
                            }
                            y_max_recovery={
                              doorOpenGraphData1?.y_max_recovery ?? ""
                            }
                            />
                        </div>
                      </div>
                    </div>
                              <div class="page-break"></div>
                  </div>
                            ) : (
                              ""
                            )}


                    {myState == true  ? (
                      
                      <div className="14-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-30 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-30 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-30 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-30 p-2 test-r">
                                {doorOpenGraphData1?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={doorOpenGraphData1?.start_date}
                                />{" "}
                                {doorOpenGraphData1?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat
                                  data={doorOpenGraphData1?.end_date}
                                />{" "}
                                {getTimeInSeconds(doorOpenGraphData1?.do_off_time) > getTimeInSeconds(doorOpenGraphData1?.set_limit_cross_in_time) ? doorOpenGraphData1?.do_off_time : doorOpenGraphData1?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-25 test-b p-1 test-r">
                                Door Open Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Door Close Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex ">
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData1?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData1?.set_limit_cross_out_time==null?"N/A":doorOpenGraphData1?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData1?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {doorOpenGraphData1?.set_limit_cross_in_time==null?"N/A":doorOpenGraphData1?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div
                        >
                          <FinalReportVegaGraph
                            test_id={door1[0]?.id}
                            testName="DOOR OPEN TEST CYCLE-I (WITHOUT AMBIENT)"
                            mxHeight={320}
                            x_min_excersion={
                              doorOpenGraphData1?.x_min_excersion ?? ""
                            }
                            x_max_excersion={
                              doorOpenGraphData1?.x_max_excersion ?? ""
                            }
                            y_min_excersion={
                              doorOpenGraphData1?.y_min_excersion ?? ""
                            }
                            y_max_excersion={
                              doorOpenGraphData1?.y_max_excersion ?? ""
                            }
                            x_min_recovery={
                              doorOpenGraphData1?.x_min_recovery ?? ""
                            }
                            x_max_recovery={
                              doorOpenGraphData1?.x_max_recovery ?? ""
                            }
                            y_min_recovery={
                              doorOpenGraphData1?.y_min_recovery ?? ""
                            }
                            y_max_recovery={
                              doorOpenGraphData1?.y_max_recovery ?? ""
                            }
                            />
                        </div>
                      </div>
                    </div>
                  <div class="page-break"></div>
                  </div>
                              ) : (
                                ""
                              )}
                    {myState == true  ? (
                      <div className="12-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <div className="test">
                          <div className="d-flex">
                            <span className="test-b p-1 test-r w-40">
                              Objective : Thermal Qualification Study For
                              {user.type_of_room} {user.type_of_cycle}
                            </span>
                            <span className="test-b p-1 test-r w-30">
                              Type Of Cycle:{" "}
                              {doorOpenGraphData1?.door_open_test_name}
                            </span>
                            <span className="test-b p-1 w-30">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex text-left">
                            <span className="w-60 test-b font-weight-bold p-2 test-r">
                              Customer Name : {user.company?.name}
                            </span>
                            <span className="w-40 test-b p-2">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                          <div className="test text-left p-2">
                            Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-70v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Humidity Vs Time)
                            <br />
                            {doorOpenGraphData1?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                                <div class="page-break"></div>
                  </div>

                              ) : (
                                ""
                              )}
                    {myState == true  ? (
                      <div className="13-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-30 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-30 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-30 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-30 p-2 test-r">
                                {doorOpenGraphData1?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={doorOpenGraphData1?.start_date}
                                />{" "}
                                {doorOpenGraphData1?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat
                                  data={doorOpenGraphData1?.end_date}
                                />{" "}
                                {getTimeInSeconds(doorOpenGraphData1?.do_off_time) > getTimeInSeconds(doorOpenGraphData1?.set_limit_cross_in_time) ? doorOpenGraphData1?.do_off_time : doorOpenGraphData1?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          {/* { console.log("doorOpenGraphData",doorOpenGraphData1?.do_off_time > doorOpenGraphData1?.set_limit_cross_in_time ?doorOpenGraphData1?.set_limit_cross_in_time:doorOpenGraphData1?.do_off_time,"w",doorOpenGraphData1?.do_off_time,doorOpenGraphData1?.set_limit_cross_in_time ) } */}
                          {/* { console.log("doorOpenGraphData",getTimeInSeconds(doorOpenGraphData1?.do_off_time) > getTimeInSeconds(doorOpenGraphData1?.set_limit_cross_in_time) ? doorOpenGraphData1?.do_off_time : doorOpenGraphData1?.set_limit_cross_in_time ) } */}
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-25 test-b p-1 test-r">
                                Door Open Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Door Close Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex ">
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData1?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData1?.set_limit_cross_out_time==null?"N/A":doorOpenGraphData1?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData1?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {doorOpenGraphData1?.set_limit_cross_in_time==null?"N/A":doorOpenGraphData1?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div
                          >
                          <FinalReportVegaGraphHumidity
                            test_id={door1[0]?.id}
                            testName="DOOR OPEN TEST CYCLE-I (WITH AMBIENT)"
                            mxHeight={320}
                            x_min_excersion={
                              doorOpenGraphData1?.x_min_excersion ?? ""
                            }
                            x_max_excersion={
                              doorOpenGraphData1?.x_max_excersion ?? ""
                            }
                            y_min_excersion={
                              doorOpenGraphData1?.y_min_excersion ?? ""
                            }
                            y_max_excersion={
                              doorOpenGraphData1?.y_max_excersion ?? ""
                            }
                            x_min_recovery={
                              doorOpenGraphData1?.x_min_recovery ?? ""
                            }
                            x_max_recovery={
                              doorOpenGraphData1?.x_max_recovery ?? ""
                            }
                            y_min_recovery={
                              doorOpenGraphData1?.y_min_recovery ?? ""
                            }
                            y_max_recovery={
                              doorOpenGraphData1?.y_max_recovery ?? ""
                            }
                            />
                        </div>
                      </div>
                    </div>
                              <div class="page-break"></div>
                  </div>
                            ) : (
                              ""
                            )}


                    {myState == true  ? (
                      
                      <div className="14-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-30 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-30 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-30 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-30 p-2 test-r">
                                {doorOpenGraphData1?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={doorOpenGraphData1?.start_date}
                                />{" "}
                                {doorOpenGraphData1?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat
                                  data={doorOpenGraphData1?.end_date}
                                />{" "}
                                {getTimeInSeconds(doorOpenGraphData1?.do_off_time) > getTimeInSeconds(doorOpenGraphData1?.set_limit_cross_in_time) ? doorOpenGraphData1?.do_off_time : doorOpenGraphData1?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-25 test-b p-1 test-r">
                                Door Open Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Door Close Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex ">
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData1?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData1?.set_limit_cross_out_time==null?"N/A":doorOpenGraphData1?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData1?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {doorOpenGraphData1?.set_limit_cross_in_time==null?"N/A":doorOpenGraphData1?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div
                        >
                          <FinalReportVegaGraphHumidity
                            test_id={door1[0]?.id}
                            testName="DOOR OPEN TEST CYCLE-I (WITHOUT AMBIENT)"
                            mxHeight={320}
                            x_min_excersion={
                              doorOpenGraphData1?.x_min_excersion ?? ""
                            }
                            x_max_excersion={
                              doorOpenGraphData1?.x_max_excersion ?? ""
                            }
                            y_min_excersion={
                              doorOpenGraphData1?.y_min_excersion ?? ""
                            }
                            y_max_excersion={
                              doorOpenGraphData1?.y_max_excersion ?? ""
                            }
                            x_min_recovery={
                              doorOpenGraphData1?.x_min_recovery ?? ""
                            }
                            x_max_recovery={
                              doorOpenGraphData1?.x_max_recovery ?? ""
                            }
                            y_min_recovery={
                              doorOpenGraphData1?.y_min_recovery ?? ""
                            }
                            y_max_recovery={
                              doorOpenGraphData1?.y_max_recovery ?? ""
                            }
                            />
                        </div>
                      </div>
                    </div>
                  <div class="page-break"></div>
                  </div>
                              ) : (
                                ""
                              )}

                    {myState12 == true  ? (
                      
                      <div className="15-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <div className="test">
                          <div className="d-flex">
                            <span className="test-b test-r w-40">
                              Objective : Thermal Qualification Study For
                              {user.type_of_room} {user.type_of_cycle}
                            </span>
                            <span className="test-b test-r w-30">
                              Type Of Cycle:{" "}
                              {doorOpenGraphData2?.door_open_test_name}
                            </span>
                            <span className="test-b w-30">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex text-left">
                            <span className="w-60 test-b p-1 test-r font-weight-bold">
                              Customer Name : {user.company?.name}
                            </span>
                            <span className="w-40 test-b p-1">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                          <div className="test p-2 text-left">
                            Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-70v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Temperature Vs Time)
                            <br />
                            {doorOpenGraphData2?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}

                    {myState12 == true  ? (
                      <div className="16-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40 p-1 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData2?.door_open_test_name}
                              </span>
                              <span className="w-25 p-1 test-r">
                                <DateFormat
                                  data={doorOpenGraphData2?.start_date}
                                />{" "}
                                {doorOpenGraphData2?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1">
                                <DateFormat
                                  data={doorOpenGraphData2?.end_date}
                                />{" "}
                                {getTimeInSeconds(doorOpenGraphData2?.do_off_time) > getTimeInSeconds(doorOpenGraphData2?.set_limit_cross_in_time) ? doorOpenGraphData2?.do_off_time : doorOpenGraphData2?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-25 p-1 test-b test-r">
                                Door Open Time{" "}
                              </span>
                              <span className="w-25 p-1 test-b test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 p-1 test-b test-r">
                                Door Close Time{" "}
                              </span>
                              <span className="w-25 p-1 test-b">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex">
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData2?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData2?.set_limit_cross_out_time==null?"N/A":doorOpenGraphData2?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData2?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {doorOpenGraphData2?.set_limit_cross_in_time==null?"N/A":doorOpenGraphData2?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div
                          >
                          <FinalReportVegaGraph
                            test_id={door2[0]?.id}
                            testName="DOOR OPEN TEST CYCLE-II (WITH AMBIENT)"
                            x_min_excersion={
                              doorOpenGraphData2?.x_min_excersion ?? ""
                            }
                            x_max_excersion={
                              doorOpenGraphData2?.x_max_excersion ?? ""
                            }
                            y_min_excersion={
                              doorOpenGraphData2?.y_min_excersion ?? ""
                            }
                            y_max_excersion={
                              doorOpenGraphData2?.y_max_excersion ?? ""
                            }
                            x_min_recovery={
                              doorOpenGraphData2?.x_min_recovery ?? ""
                            }
                            x_max_recovery={
                              doorOpenGraphData2?.x_max_recovery ?? ""
                            }
                            y_min_recovery={
                              doorOpenGraphData2?.y_min_recovery ?? ""
                            }
                            y_max_recovery={
                              doorOpenGraphData2?.y_max_recovery ?? ""
                            }
                          />
                        </div>
                      </div>
                    </div>
                            <div class="page-break"></div>
                  </div>

                          ) : (
                            ""
                          )}
                    {myState12 == true  ? (
                      <div className="17-page pdf-h-w " >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-30 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-30 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test">
                              <span className="w-40 p-1 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-30 p-1 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-30 p-1 test-r">
                                {doorOpenGraphData2?.door_open_test_name}
                              </span>
                              <span className="w-25 p-1 test-r">
                                <DateFormat
                                  data={doorOpenGraphData2?.start_date}
                                />{" "}
                                {doorOpenGraphData2?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1">
                                <DateFormat
                                  data={doorOpenGraphData2?.end_date}
                                />{" "}
                                {getTimeInSeconds(doorOpenGraphData2?.do_off_time) > getTimeInSeconds(doorOpenGraphData2?.set_limit_cross_in_time) ? doorOpenGraphData2?.do_off_time : doorOpenGraphData2?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-25 p-1 test-b test-r">
                                Door Open Time{" "}
                              </span>
                              <span className="w-25 p-1 test-b test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 p-1 test-b test-r">
                                Door Close Time{" "}
                              </span>
                              <span className="w-25 p-1 test-b">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex">
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData2?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData2?.set_limit_cross_out_time==null?"N/A":doorOpenGraphData2?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData2?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {doorOpenGraphData2?.set_limit_cross_in_time==null?"N/A":doorOpenGraphData2?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div
                        >
                          <FinalReportVegaGraph
                            test_id={door2[0]?.id}
                            testName="DOOR OPEN TEST CYCLE-II (WITHOUT AMBIENT)"
                            x_min_excersion={
                              doorOpenGraphData2?.x_min_excersion ?? ""
                            }
                            x_max_excersion={
                              doorOpenGraphData2?.x_max_excersion ?? ""
                            }
                            y_min_excersion={
                              doorOpenGraphData2?.y_min_excersion ?? ""
                            }
                            y_max_excersion={
                              doorOpenGraphData2?.y_max_excersion ?? ""
                            }
                            x_min_recovery={
                              doorOpenGraphData2?.x_min_recovery ?? ""
                            }
                            x_max_recovery={
                              doorOpenGraphData2?.x_max_recovery ?? ""
                            }
                            y_min_recovery={
                              doorOpenGraphData2?.y_min_recovery ?? ""
                            }
                            y_max_recovery={
                              doorOpenGraphData2?.y_max_recovery ?? ""
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
) : (
  ""
)}
                    {myState12 == true  ? (
                      
                      <div className="15-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <div className="test">
                          <div className="d-flex">
                            <span className="test-b test-r w-40">
                              Objective : Thermal Qualification Study For
                              {user.type_of_room} {user.type_of_cycle}
                            </span>
                            <span className="test-b test-r w-30">
                              Type Of Cycle:{" "}
                              {doorOpenGraphData2?.door_open_test_name}
                            </span>
                            <span className="test-b w-30">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex text-left">
                            <span className="w-60 test-b p-1 test-r font-weight-bold">
                              Customer Name : {user.company?.name}
                            </span>
                            <span className="w-40 test-b p-1">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                          <div className="test p-2 text-left">
                            Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-70v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Humidity Vs Time)
                            <br />
                            {doorOpenGraphData2?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}

                    {myState12 == true  ? (
                      <div className="16-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40 p-1 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData2?.door_open_test_name}
                              </span>
                              <span className="w-25 p-1 test-r">
                                <DateFormat
                                  data={doorOpenGraphData2?.start_date}
                                />{" "}
                                {doorOpenGraphData2?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1">
                                <DateFormat
                                  data={doorOpenGraphData2?.end_date}
                                />{" "}
                                {getTimeInSeconds(doorOpenGraphData2?.do_off_time) > getTimeInSeconds(doorOpenGraphData2?.set_limit_cross_in_time) ? doorOpenGraphData2?.do_off_time : doorOpenGraphData2?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-25 p-1 test-b test-r">
                                Door Open Time{" "}
                              </span>
                              <span className="w-25 p-1 test-b test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 p-1 test-b test-r">
                                Door Close Time{" "}
                              </span>
                              <span className="w-25 p-1 test-b">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex">
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData2?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData2?.set_limit_cross_out_time==null?"N/A":doorOpenGraphData2?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData2?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {doorOpenGraphData2?.set_limit_cross_in_time==null?"N/A":doorOpenGraphData2?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div
                          >
                          <FinalReportVegaGraphHumidity
                            test_id={door2[0]?.id}
                            testName="DOOR OPEN TEST CYCLE-II (WITH AMBIENT)"
                            x_min_excersion={
                              doorOpenGraphData2?.x_min_excersion ?? ""
                            }
                            x_max_excersion={
                              doorOpenGraphData2?.x_max_excersion ?? ""
                            }
                            y_min_excersion={
                              doorOpenGraphData2?.y_min_excersion ?? ""
                            }
                            y_max_excersion={
                              doorOpenGraphData2?.y_max_excersion ?? ""
                            }
                            x_min_recovery={
                              doorOpenGraphData2?.x_min_recovery ?? ""
                            }
                            x_max_recovery={
                              doorOpenGraphData2?.x_max_recovery ?? ""
                            }
                            y_min_recovery={
                              doorOpenGraphData2?.y_min_recovery ?? ""
                            }
                            y_max_recovery={
                              doorOpenGraphData2?.y_max_recovery ?? ""
                            }
                          />
                        </div>
                      </div>
                    </div>
                            <div class="page-break"></div>
                  </div>

                          ) : (
                            ""
                          )}
                    {myState12 == true  ? (
                      <div className="17-page pdf-h-w " >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-30 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-30 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test">
                              <span className="w-40 p-1 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-30 p-1 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-30 p-1 test-r">
                                {doorOpenGraphData2?.door_open_test_name}
                              </span>
                              <span className="w-25 p-1 test-r">
                                <DateFormat
                                  data={doorOpenGraphData2?.start_date}
                                />{" "}
                                {doorOpenGraphData2?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1">
                                <DateFormat
                                  data={doorOpenGraphData2?.end_date}
                                />{" "}
                                {getTimeInSeconds(doorOpenGraphData2?.do_off_time) > getTimeInSeconds(doorOpenGraphData2?.set_limit_cross_in_time) ? doorOpenGraphData2?.do_off_time : doorOpenGraphData2?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-25 p-1 test-b test-r">
                                Door Open Time{" "}
                              </span>
                              <span className="w-25 p-1 test-b test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 p-1 test-b test-r">
                                Door Close Time{" "}
                              </span>
                              <span className="w-25 p-1 test-b">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex">
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData2?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData2?.set_limit_cross_out_time==null?"N/A":doorOpenGraphData2?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData2?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {doorOpenGraphData2?.set_limit_cross_in_time==null?"N/A":doorOpenGraphData2?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div
                        >
                          <FinalReportVegaGraphHumidity
                            test_id={door2[0]?.id}
                            testName="DOOR OPEN TEST CYCLE-II (WITHOUT AMBIENT)"
                            x_min_excersion={
                              doorOpenGraphData2?.x_min_excersion ?? ""
                            }
                            x_max_excersion={
                              doorOpenGraphData2?.x_max_excersion ?? ""
                            }
                            y_min_excersion={
                              doorOpenGraphData2?.y_min_excersion ?? ""
                            }
                            y_max_excersion={
                              doorOpenGraphData2?.y_max_excersion ?? ""
                            }
                            x_min_recovery={
                              doorOpenGraphData2?.x_min_recovery ?? ""
                            }
                            x_max_recovery={
                              doorOpenGraphData2?.x_max_recovery ?? ""
                            }
                            y_min_recovery={
                              doorOpenGraphData2?.y_min_recovery ?? ""
                            }
                            y_max_recovery={
                              doorOpenGraphData2?.y_max_recovery ?? ""
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
) : (
  ""
)}

                    {myState13 == true  ? (
                      <div className="18-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <div className="test">
                          <div className="d-flex">
                            <span className="test-b test-r w-40">
                              Objective : Thermal Qualification Study For
                              {user.type_of_room} {user.type_of_cycle}
                            </span>
                            <span className="test-b test-r w-30">
                              Type Of Cycle:{" "}
                              {doorOpenGraphData3?.door_open_test_name}
                            </span>
                            <span className="test-b w-30">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex text-left">
                            <span className="w-60 test-b test-r p-2 font-weight-bold">
                              Customer Name : {user.company?.name}
                            </span>
                            <span className="w-40 test-b p-2">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                          <div className="test p-2 text-left">
                            Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-70v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Temperature Vs Time)
                            <br />
                            {doorOpenGraphData3?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}

                    {myState13 == true  ? (
                      
                      <div className="19-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-30 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-30 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test">
                              <span className="w-40 p-1 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-30 p-1 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-30 p-1 test-r">
                                {doorOpenGraphData3?.door_open_test_name}
                              </span>
                              <span className="w-25 p-1 test-r">
                                <DateFormat
                                  data={doorOpenGraphData3?.start_date}
                                  />{" "}
                                {doorOpenGraphData3?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1">
                                <DateFormat
                                  data={doorOpenGraphData3?.end_date}
                                />{" "}
                                {getTimeInSeconds(doorOpenGraphData3?.do_off_time) > getTimeInSeconds(doorOpenGraphData3?.set_limit_cross_in_time) ? doorOpenGraphData3?.do_off_time : doorOpenGraphData3?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-25 p-1 test-b test-r">
                                Door Open Time{" "}
                              </span>
                              <span className="w-25 p-1 test-b test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 p-1 test-b test-r">
                                Door Close Time{" "}
                              </span>
                              <span className="w-25 p-1 test-b">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex">
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData3?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData3?.set_limit_cross_out_time==null?"N/A":doorOpenGraphData3?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData3?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {doorOpenGraphData3?.set_limit_cross_in_time==null?"N/A":doorOpenGraphData3?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div
                        >
                          <FinalReportVegaGraph
                            test_id={door3[0]?.id}
                            testName="DOOR OPEN TEST CYCLE-III (WITH AMBIENT)"
                            x_min_excersion={
                              doorOpenGraphData3?.x_min_excersion ?? ""
                            }
                            x_max_excersion={
                              doorOpenGraphData3?.x_max_excersion ?? ""
                            }
                            y_min_excersion={
                              doorOpenGraphData3?.y_min_excersion ?? ""
                            }
                            y_max_excersion={
                              doorOpenGraphData3?.y_max_excersion ?? ""
                            }
                            x_min_recovery={
                              doorOpenGraphData3?.x_min_recovery ?? ""
                            }
                            x_max_recovery={
                              doorOpenGraphData3?.x_max_recovery ?? ""
                            }
                            y_min_recovery={
                              doorOpenGraphData3?.y_min_recovery ?? ""
                            }
                            y_max_recovery={
                              doorOpenGraphData3?.y_max_recovery ?? ""
                            }
                            />
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                              ) : (
                              ""
                              )}

                    {myState13 == true  ? (
                      <div className="20-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-30 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-30 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40 p-1 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-30 p-1 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-30 p-1 test-r">
                                {doorOpenGraphData3?.door_open_test_name}
                              </span>
                              <span className="w-25 p-1 test-r">
                                <DateFormat
                                  data={doorOpenGraphData3?.start_date}
                                />{" "}
                                {doorOpenGraphData3?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1">
                                <DateFormat
                                  data={doorOpenGraphData3?.end_date}
                                />{" "}
                                {getTimeInSeconds(doorOpenGraphData3?.do_off_time) > getTimeInSeconds(doorOpenGraphData3?.set_limit_cross_in_time) ? doorOpenGraphData3?.do_off_time : doorOpenGraphData3?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-25 test-b p-1 test-r">
                                Door Open Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Door Close Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex">
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData3?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData3?.set_limit_cross_out_time==null?"N/A":doorOpenGraphData3?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData3?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {doorOpenGraphData3?.set_limit_cross_in_time==null?"N/A":doorOpenGraphData3?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div

>
                          <FinalReportVegaGraph
                            test_id={door3[0]?.id}
                            testName="DOOR OPEN TEST CYCLE-III (WITHOUT AMBIENT)"
                            x_min_excersion={
                              doorOpenGraphData3?.x_min_excersion ?? ""
                            }
                            x_max_excersion={
                              doorOpenGraphData3?.x_max_excersion ?? ""
                            }
                            y_min_excersion={
                              doorOpenGraphData3?.y_min_excersion ?? ""
                            }
                            y_max_excersion={
                              doorOpenGraphData3?.y_max_excersion ?? ""
                            }
                            x_min_recovery={
                              doorOpenGraphData3?.x_min_recovery ?? ""
                            }
                            x_max_recovery={
                              doorOpenGraphData3?.x_max_recovery ?? ""
                            }
                            y_min_recovery={
                              doorOpenGraphData3?.y_min_recovery ?? ""
                            }
                            y_max_recovery={
                              doorOpenGraphData3?.y_max_recovery ?? ""
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                              ) : (
                                ""
                              )}
                    {myState13 == true  ? (
                      <div className="18-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <div className="test">
                          <div className="d-flex">
                            <span className="test-b test-r w-40">
                              Objective : Thermal Qualification Study For
                              {user.type_of_room} {user.type_of_cycle}
                            </span>
                            <span className="test-b test-r w-30">
                              Type Of Cycle:{" "}
                              {doorOpenGraphData3?.door_open_test_name}
                            </span>
                            <span className="test-b w-30">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex text-left">
                            <span className="w-60 test-b test-r p-2 font-weight-bold">
                              Customer Name : {user.company?.name}
                            </span>
                            <span className="w-40 test-b p-2">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                          <div className="test p-2 text-left">
                            Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-70v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Humidity Vs Time)
                            <br />
                            {doorOpenGraphData3?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}

                    {myState13 == true  ? (
                      
                      <div className="19-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-30 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-30 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test">
                              <span className="w-40 p-1 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-30 p-1 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-30 p-1 test-r">
                                {doorOpenGraphData3?.door_open_test_name}
                              </span>
                              <span className="w-25 p-1 test-r">
                                <DateFormat
                                  data={doorOpenGraphData3?.start_date}
                                  />{" "}
                                {doorOpenGraphData3?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1">
                                <DateFormat
                                  data={doorOpenGraphData3?.end_date}
                                />{" "}
                                {getTimeInSeconds(doorOpenGraphData3?.do_off_time) > getTimeInSeconds(doorOpenGraphData3?.set_limit_cross_in_time) ? doorOpenGraphData3?.do_off_time : doorOpenGraphData3?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-25 p-1 test-b test-r">
                                Door Open Time{" "}
                              </span>
                              <span className="w-25 p-1 test-b test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 p-1 test-b test-r">
                                Door Close Time{" "}
                              </span>
                              <span className="w-25 p-1 test-b">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex">
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData3?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData3?.set_limit_cross_out_time==null?"N/A":doorOpenGraphData3?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData3?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {doorOpenGraphData3?.set_limit_cross_in_time==null?"N/A":doorOpenGraphData3?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div
                        >
                          <FinalReportVegaGraphHumidity
                            test_id={door3[0]?.id}
                            testName="DOOR OPEN TEST CYCLE-III (WITH AMBIENT)"
                            x_min_excersion={
                              doorOpenGraphData3?.x_min_excersion ?? ""
                            }
                            x_max_excersion={
                              doorOpenGraphData3?.x_max_excersion ?? ""
                            }
                            y_min_excersion={
                              doorOpenGraphData3?.y_min_excersion ?? ""
                            }
                            y_max_excersion={
                              doorOpenGraphData3?.y_max_excersion ?? ""
                            }
                            x_min_recovery={
                              doorOpenGraphData3?.x_min_recovery ?? ""
                            }
                            x_max_recovery={
                              doorOpenGraphData3?.x_max_recovery ?? ""
                            }
                            y_min_recovery={
                              doorOpenGraphData3?.y_min_recovery ?? ""
                            }
                            y_max_recovery={
                              doorOpenGraphData3?.y_max_recovery ?? ""
                            }
                            />
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                              ) : (
                              ""
                              )}

                    {myState13 == true  ? (
                      <div className="20-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-30 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-30 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40 p-1 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-30 p-1 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-30 p-1 test-r">
                                {doorOpenGraphData3?.door_open_test_name}
                              </span>
                              <span className="w-25 p-1 test-r">
                                <DateFormat
                                  data={doorOpenGraphData3?.start_date}
                                />{" "}
                                {doorOpenGraphData3?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1">
                                <DateFormat
                                  data={doorOpenGraphData3?.end_date}
                                />{" "}
                                {getTimeInSeconds(doorOpenGraphData3?.do_off_time) > getTimeInSeconds(doorOpenGraphData3?.set_limit_cross_in_time) ? doorOpenGraphData3?.do_off_time : doorOpenGraphData3?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-25 test-b p-1 test-r">
                                Door Open Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Door Close Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex">
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData3?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData3?.set_limit_cross_out_time==null?"N/A":doorOpenGraphData3?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {doorOpenGraphData3?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {doorOpenGraphData3?.set_limit_cross_in_time==null?"N/A":doorOpenGraphData3?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div

>
                          <FinalReportVegaGraphHumidity
                            test_id={door3[0]?.id}
                            testName="DOOR OPEN TEST CYCLE-III (WITHOUT AMBIENT)"
                            x_min_excersion={
                              doorOpenGraphData3?.x_min_excersion ?? ""
                            }
                            x_max_excersion={
                              doorOpenGraphData3?.x_max_excersion ?? ""
                            }
                            y_min_excersion={
                              doorOpenGraphData3?.y_min_excersion ?? ""
                            }
                            y_max_excersion={
                              doorOpenGraphData3?.y_max_excersion ?? ""
                            }
                            x_min_recovery={
                              doorOpenGraphData3?.x_min_recovery ?? ""
                            }
                            x_max_recovery={
                              doorOpenGraphData3?.x_max_recovery ?? ""
                            }
                            y_min_recovery={
                              doorOpenGraphData3?.y_min_recovery ?? ""
                            }
                            y_max_recovery={
                              doorOpenGraphData3?.y_max_recovery ?? ""
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                              ) : (
                                ""
                              )}
                  {/* Door Open Test End Here */}

                  {myState3 == true  ? (

                  <div className="15-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <div className="test">
                          <div className="d-flex">
                            <span className="test-b p-1 test-r w-40">
                              Objective : Thermal Qualification Study For{" "}
                              {user.type_of_room} {user.type_of_cycle}
                            </span>
                            <span className="test-b p-1 test-r w-30">
                              Type Of Cycle:{" "}
                              {powerOnGraphData?.door_open_test_name}
                            </span>
                            <span className="test-b p-1 w-30">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex text-left">
                            <span className="w-60 test-b p-2 test-r font-weight-bold">
                              Customer Name : {user.company?.name}
                            </span>
                            <span className="w-40 test-b p-2">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                          <div className="test p-2 text-left">
                            Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-70v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Temperature Vs Time)
                            <br />
                            {powerOnGraphData?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                  ) : (
                    ""
                  )}

                    {myState3 == true  ? (
                      <div className="16-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40  p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2  test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {powerOnGraphData?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={powerOnGraphData?.start_date}
                                />{" "}
                                {powerOnGraphData?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat data={powerOnGraphData?.end_date} />{" "}
                                {getTimeInSeconds(powerOnGraphData?.do_off_time) > getTimeInSeconds(powerOnGraphData?.set_limit_cross_in_time) ? powerOnGraphData?.do_off_time : powerOnGraphData?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-25 test-b p-1 test-r">
                                Power OFF Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Power ON Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex ">
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData?.set_limit_cross_out_time==null?"N/A":powerOnGraphData?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {powerOnGraphData?.set_limit_cross_in_time==null?"N/A":powerOnGraphData?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
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
                      </div>
                    </div>
                            <div class="page-break"></div>
                  </div>

                          ) : (
                            ""
                          )}
                    {myState3 == true  ? (
                      <div className="17-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {powerOnGraphData?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={powerOnGraphData?.start_date}
                                />{" "}
                                {powerOnGraphData?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat data={powerOnGraphData?.end_date} />{" "}
                                {getTimeInSeconds(powerOnGraphData?.do_off_time) > getTimeInSeconds(powerOnGraphData?.set_limit_cross_in_time) ? powerOnGraphData?.do_off_time : powerOnGraphData?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-25 test-b p-1 test-r ">
                                Power OFF Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Power ON Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex">
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData?.set_limit_cross_out_time==null?"N/A":powerOnGraphData?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {powerOnGraphData?.set_limit_cross_in_time==null?"N/A":powerOnGraphData?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
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
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}
                  {myState3 == true  ? (

                  <div className="15-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <div className="test">
                          <div className="d-flex">
                            <span className="test-b p-1 test-r w-40">
                              Objective : Thermal Qualification Study For{" "}
                              {user.type_of_room} {user.type_of_cycle}
                            </span>
                            <span className="test-b p-1 test-r w-30">
                              Type Of Cycle:{" "}
                              {powerOnGraphData?.door_open_test_name}
                            </span>
                            <span className="test-b p-1 w-30">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex text-left">
                            <span className="w-60 test-b p-2 test-r font-weight-bold">
                              Customer Name : {user.company?.name}
                            </span>
                            <span className="w-40 test-b p-2">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                          <div className="test p-2 text-left">
                            Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-70v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Humidity Vs Time)
                            <br />
                            {powerOnGraphData?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                  ) : (
                    ""
                  )}

                    {myState3 == true  ? (
                      <div className="16-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40  p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2  test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {powerOnGraphData?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={powerOnGraphData?.start_date}
                                />{" "}
                                {powerOnGraphData?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat data={powerOnGraphData?.end_date} />{" "}
                                {getTimeInSeconds(powerOnGraphData?.do_off_time) > getTimeInSeconds(powerOnGraphData?.set_limit_cross_in_time) ? powerOnGraphData?.do_off_time : powerOnGraphData?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-25 test-b p-1 test-r">
                                Power OFF Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Power ON Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex ">
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData?.set_limit_cross_out_time==null?"N/A":powerOnGraphData?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {powerOnGraphData?.set_limit_cross_in_time==null?"N/A":powerOnGraphData?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <FinalReportVegaGraphHumidity
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
                      </div>
                    </div>
                            <div class="page-break"></div>
                  </div>

                          ) : (
                            ""
                          )}
                    {myState3 == true  ? (
                      <div className="17-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {powerOnGraphData?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={powerOnGraphData?.start_date}
                                />{" "}
                                {powerOnGraphData?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat data={powerOnGraphData?.end_date} />{" "}
                                {getTimeInSeconds(powerOnGraphData?.do_off_time) > getTimeInSeconds(powerOnGraphData?.set_limit_cross_in_time) ? powerOnGraphData?.do_off_time : powerOnGraphData?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-25 test-b p-1 test-r ">
                                Power OFF Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Power ON Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex">
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData?.set_limit_cross_out_time==null?"N/A":powerOnGraphData?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {powerOnGraphData?.set_limit_cross_in_time==null?"N/A":powerOnGraphData?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <FinalReportVegaGraphHumidity
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
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}
                  {/* II */}
                    {myState32 == true  ? (
                      
                      <div className="15-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <div className="test">
                          <div className="d-flex">
                            <span className="test-b p-1 test-r w-40">
                              Objective : Thermal Qualification Study For{" "}
                              {user.type_of_room} {user.type_of_cycle}
                            </span>
                            <span className="test-b p-1 test-r w-30">
                              Type Of Cycle:{" "}
                              {powerOnGraphData2?.door_open_test_name}
                            </span>
                            <span className="test-b p-1 w-30">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex text-left">
                            <span className="w-60 test-b p-2 test-r font-weight-bold">
                              Customer Name : {user.company?.name}
                            </span>
                            <span className="w-40 test-b p-2">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                          <div className="test p-2 text-left">
                            Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-70v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Temperature Vs Time)
                            <br />
                            {powerOnGraphData2?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                              <div class="page-break"></div>
                  </div>

                            ) : (
                              ""
                            )}
                    {myState32 == true  ? (
                      <div className="16-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40  p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2  test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {powerOnGraphData2?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={powerOnGraphData2?.start_date}
                                />{" "}
                                {powerOnGraphData2?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat data={powerOnGraphData2?.end_date} />{" "}
                                {getTimeInSeconds(powerOnGraphData2?.do_off_time) > getTimeInSeconds(powerOnGraphData2?.set_limit_cross_in_time) ? powerOnGraphData2?.do_off_time : powerOnGraphData2?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-25 test-b p-1 test-r">
                                Power OFF Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Power ON Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex ">
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData2?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData2?.set_limit_cross_out_time==null?"N/A":powerOnGraphData2?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData2?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {powerOnGraphData2?.set_limit_cross_in_time==null?"N/A":powerOnGraphData2?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
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
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>

) : (
  ""
  )}
  {myState32 == true  ? (
                  <div className="17-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {powerOnGraphData2?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={powerOnGraphData2?.start_date}
                                />{" "}
                                {powerOnGraphData2?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat data={powerOnGraphData2?.end_date} />{" "}
                                {getTimeInSeconds(powerOnGraphData2?.do_off_time) > getTimeInSeconds(powerOnGraphData2?.set_limit_cross_in_time) ? powerOnGraphData2?.do_off_time : powerOnGraphData2?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-25 test-b p-1 test-r ">
                                Power OFF Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Power ON Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex">
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData2?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData2?.set_limit_cross_out_time==null?"N/A":powerOnGraphData2?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData2?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {powerOnGraphData2?.set_limit_cross_in_time==null?"N/A":powerOnGraphData2?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
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
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}
                    {myState32 == true  ? (
                      
                      <div className="15-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <div className="test">
                          <div className="d-flex">
                            <span className="test-b p-1 test-r w-40">
                              Objective : Thermal Qualification Study For{" "}
                              {user.type_of_room} {user.type_of_cycle}
                            </span>
                            <span className="test-b p-1 test-r w-30">
                              Type Of Cycle:{" "}
                              {powerOnGraphData2?.door_open_test_name}
                            </span>
                            <span className="test-b p-1 w-30">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex text-left">
                            <span className="w-60 test-b p-2 test-r font-weight-bold">
                              Customer Name : {user.company?.name}
                            </span>
                            <span className="w-40 test-b p-2">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                          <div className="test p-2 text-left">
                            Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-70v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Humidity Vs Time)
                            <br />
                            {powerOnGraphData2?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                              <div class="page-break"></div>
                  </div>

                            ) : (
                              ""
                            )}
                    {myState32 == true  ? (
                      <div className="16-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40  p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2  test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {powerOnGraphData2?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={powerOnGraphData2?.start_date}
                                />{" "}
                                {powerOnGraphData2?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat data={powerOnGraphData2?.end_date} />{" "}
                                {getTimeInSeconds(powerOnGraphData2?.do_off_time) > getTimeInSeconds(powerOnGraphData2?.set_limit_cross_in_time) ? powerOnGraphData2?.do_off_time : powerOnGraphData2?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-25 test-b p-1 test-r">
                                Power OFF Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Power ON Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex ">
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData2?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData2?.set_limit_cross_out_time==null?"N/A":powerOnGraphData2?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData2?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {powerOnGraphData2?.set_limit_cross_in_time==null?"N/A":powerOnGraphData2?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <FinalReportVegaGraphHumidity
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
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>

) : (
  ""
  )}
  {myState32 == true  ? (
                  <div className="17-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {powerOnGraphData2?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={powerOnGraphData2?.start_date}
                                />{" "}
                                {powerOnGraphData2?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat data={powerOnGraphData2?.end_date} />{" "}
                                {getTimeInSeconds(powerOnGraphData2?.do_off_time) > getTimeInSeconds(powerOnGraphData2?.set_limit_cross_in_time) ? powerOnGraphData2?.do_off_time : powerOnGraphData2?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-25 test-b p-1 test-r ">
                                Power OFF Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Power ON Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex">
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData2?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData2?.set_limit_cross_out_time==null?"N/A":powerOnGraphData2?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData2?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {powerOnGraphData2?.set_limit_cross_in_time==null?"N/A":powerOnGraphData2?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <FinalReportVegaGraphHumidity
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
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}
                  {/* III */}
                    {myState33 == true  ? (
                      <div className="15-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <div className="test">
                          <div className="d-flex">
                            <span className="test-b p-1 test-r w-40">
                              Objective : Thermal Qualification Study For{" "}
                              {user.type_of_room} {user.type_of_cycle}
                            </span>
                            <span className="test-b p-1 test-r w-30">
                              Type Of Cycle:{" "}
                              {powerOnGraphData3?.door_open_test_name}
                            </span>
                            <span className="test-b p-1 w-30">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex text-left">
                            <span className="w-60 test-b p-2 test-r font-weight-bold">
                              Customer Name : {user.company?.name}
                            </span>
                            <span className="w-40 test-b p-2">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                          <div className="test p-2 text-left">
                            Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-70v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Temperature Vs Time)
                            <br />
                            {powerOnGraphData3?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                  <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}

                    {myState33 == true  ? (
                      <div className="16-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40  p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2  test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {powerOnGraphData3?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={powerOnGraphData3?.start_date}
                                />{" "}
                                {powerOnGraphData3?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat data={powerOnGraphData3?.end_date} />{" "}
                                {getTimeInSeconds(powerOnGraphData3?.do_off_time) > getTimeInSeconds(powerOnGraphData3?.set_limit_cross_in_time) ? powerOnGraphData3?.do_off_time : powerOnGraphData3?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-25 test-b p-1 test-r">
                                Power OFF Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Power ON Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex ">
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData3?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData3?.set_limit_cross_out_time==null?"N/A":powerOnGraphData3?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData3?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {powerOnGraphData3?.set_limit_cross_in_time==null?"N/A":powerOnGraphData3?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
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
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                          ) : (
                              ""
                            )}

                    {myState33 == true  ? (
                      <div className="17-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {powerOnGraphData3?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={powerOnGraphData3?.start_date}
                                />{" "}
                                {powerOnGraphData3?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat data={powerOnGraphData3?.end_date} />{" "}
                                {getTimeInSeconds(powerOnGraphData3?.do_off_time) > getTimeInSeconds(powerOnGraphData3?.set_limit_cross_in_time) ? powerOnGraphData3?.do_off_time : powerOnGraphData3?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-25 test-b p-1 test-r ">
                                Power OFF Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Power ON Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex">
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData3?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData3?.set_limit_cross_out_time==null?"N/A":powerOnGraphData3?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData3?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {powerOnGraphData3?.set_limit_cross_in_time==null?"N/A":powerOnGraphData3?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
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
                    <div class="page-break"></div>
                  </div>
                          ) : (
                            ""
                          )}
                    {myState33 == true  ? (
                      <div className="15-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <div className="test">
                          <div className="d-flex">
                            <span className="test-b p-1 test-r w-40">
                              Objective : Thermal Qualification Study For{" "}
                              {user.type_of_room} {user.type_of_cycle}
                            </span>
                            <span className="test-b p-1 test-r w-30">
                              Type Of Cycle:{" "}
                              {powerOnGraphData3?.door_open_test_name}
                            </span>
                            <span className="test-b p-1 w-30">
                              Identification No. : {user.identification_no}
                            </span>
                          </div>

                          <div className="d-flex text-left">
                            <span className="w-60 test-b p-2 test-r font-weight-bold">
                              Customer Name : {user.company?.name}
                            </span>
                            <span className="w-40 test-b p-2">
                              Report Number : {user.report_no}
                            </span>
                          </div>
                          <div className="test p-2 text-left">
                            Customer Address : {companyAddress}
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-70v">
                          <h4 className="font-weight-bold w-100 text-underline">
                            Trend For The Cycle: (Humidity Vs Time)
                            <br />
                            {powerOnGraphData3?.door_open_test_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                  <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}

                    {myState33 == true  ? (
                      <div className="16-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test ">
                              <span className="w-40  p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2  test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {powerOnGraphData3?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={powerOnGraphData3?.start_date}
                                />{" "}
                                {powerOnGraphData3?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat data={powerOnGraphData3?.end_date} />{" "}
                                {getTimeInSeconds(powerOnGraphData3?.do_off_time) > getTimeInSeconds(powerOnGraphData3?.set_limit_cross_in_time) ? powerOnGraphData3?.do_off_time : powerOnGraphData3?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-25 test-b p-1 test-r">
                                Power OFF Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Power ON Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex ">
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData3?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData3?.set_limit_cross_out_time==null?"N/A":powerOnGraphData3?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData3?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {powerOnGraphData3?.set_limit_cross_in_time==null?"N/A":powerOnGraphData3?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <FinalReportVegaGraphHumidity
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
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                          ) : (
                              ""
                            )}

                    {myState33 == true  ? (
                      <div className="17-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <div className="test">
                          <div className="test">
                            <div className="d-flex ">
                              <span className="w-40 test-b p-1 test-r">
                                Report Number{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Identification No.{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Type Of Cycle{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Start Date/Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 ">
                                End Date/Time{" "}
                              </span>
                            </div>

                            <div className="d-flex test">
                              <span className="w-40 p-2 test-r">
                                {user.report_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {user.identification_no}
                              </span>
                              <span className="w-25 p-2 test-r">
                                {powerOnGraphData3?.door_open_test_name}
                              </span>
                              <span className="w-25 p-2 test-r">
                                <DateFormat
                                  data={powerOnGraphData3?.start_date}
                                />{" "}
                                {powerOnGraphData3?.dcp_on_time}
                              </span>
                              <span className="w-25 p-2">
                                <DateFormat data={powerOnGraphData3?.end_date} />{" "}
                                {getTimeInSeconds(powerOnGraphData3?.do_off_time) > getTimeInSeconds(powerOnGraphData3?.set_limit_cross_in_time) ? powerOnGraphData3?.do_off_time : powerOnGraphData3?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className="test">
                            <div className="d-flex">
                              <span className="w-25 test-b p-1 test-r ">
                                Power OFF Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Set Limit Cross Out Time{" "}
                              </span>
                              <span className="w-25 test-b p-1 test-r">
                                Power ON Time{" "}
                              </span>
                              <span className="w-25 test-b p-1">
                                Set Limit Cross In Time{" "}
                              </span>
                            </div>

                            <div className="d-flex">
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData3?.dcp_on_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData3?.set_limit_cross_out_time==null?"N/A":powerOnGraphData3?.set_limit_cross_out_time}
                              </span>
                              <span className="w-25 p-1 test-r">
                                {powerOnGraphData3?.do_off_time}
                              </span>
                              <span className="w-25 p-1">
                                {powerOnGraphData3?.set_limit_cross_in_time==null?"N/A":powerOnGraphData3?.set_limit_cross_in_time}
                              </span>
                            </div>
                          </div>
                          <div className=" ml-4 d-flex flex-column text-left">
                <span className="w-60 font-weight-bold">
                  Customer Name : {user?.company?.name}
                </span>
                Customer Address : {companyAddress}
                          </div>
                        </div>
                        <FinalReportVegaGraphHumidity
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
                    <div class="page-break"></div>
                  </div>
                          ) : (
                            ""
                          )}
                           
                  

                  {/* III end */}


                    <RHeader user={user} />
                  <div className="18-page pdf-h-w">
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="d-flex justify-content-center align-items-center h-70v">
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


                                  <RHeader user={user} />
                  <div className="19-page pdf-h-w">
                    <div className="p-1px test">
                      <div className="test">
                        <MainHeader />
                        <div className="d-flex flex-column ">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 mb-4 text-left">
                            Summary of Parameters Computed During Mapping
                            (Temperature)
                          </h4>

                          <div className="text-center p-2">
                            <div>
                            <div className="d-flex test w-100">
                              <span className="w-58 h-50p test font-weight-bold d-flex align-items-center justify-content-center para">
                                Position
                              </span>

                              {props.parameterData?.length > 0 &&
                                props.parameterData?.slice(0,15).map((par) => {
                                  return (
                                    <span
                                      key={par.id}
                                      className="w-20 h-50p test font-weight-bold d-flex align-items-center justify-content-center parameter"
                                    >
                                      {par.sensor}
                                    </span>
                                  );
                                })}
                            </div>
                            <div className="d-flex w-100">
                              <div className="w-58  text-center d-flex flex-column font-weight-bold temperature">
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MINIMUM TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MAXIMUM TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE TEMPERATURE °C{" "}
                                </span>
                                <span className="test w-100 h-60p d-flex align-items-center justify-content-center">
                                  (MAX-MIN)TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  STANDARD DEVIATION °C{" "}
                                </span>
                              </div>
                              {props.parameterData?.slice(0,15).map((par) => {
                                return (
                                  <div className="d-flex flex-column w-20">
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.min.toFixed(2)}
                                    </span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.max.toFixed(2)}
                                    </span>
                                    {par.avg == Maximum ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-red text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : par.avg == Minimum ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-green text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    )}
                                    <span className="w-100 test h-60p d-flex align-items-center justify-content-center">{(par.max - par.min).toFixed(2)}</span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.std.toFixed(2)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            </div>
                            <div className="d-flex mt-5 justify-content-end font-weight-bold text-white f-12 text-center">
                              <div
                                className="bg-red"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                  marginRight: "30px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Maximum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  HOT SPOT ({props.editcase?.pos1})
                                </p>
                              </div>
                              <div
                                className="bg-green"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Minimum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  COLD SPOT ({props.editcase?.pos2})
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>
{props.parameterData?.slice(15,30).length > 0 ? (
  <div className="19-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <MainHeader />
                        <div className="d-flex flex-column ">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 mb-4 text-left">
                            Summary of Parameters Computed During Mapping
                            (Temperature)
                          </h4>

                          <div className="text-center p-2">
                            <div>
                            <div className="d-flex test w-100">
                              <span className="w-58 h-50p test font-weight-bold d-flex align-items-center justify-content-center para">
                                Position
                              </span>

                              {props.parameterData?.length > 0 &&
                                props.parameterData?.slice(15,30).map((par) => {
                                  return (
                                    <span
                                      key={par.id}
                                      className="w-20 h-50p test font-weight-bold d-flex align-items-center justify-content-center parameter"
                                    >
                                      {par.sensor}
                                    </span>
                                  );
                                })}
                            </div>
                            <div className="d-flex w-100">
                              <div className="w-58  text-center d-flex flex-column font-weight-bold temperature">
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MINIMUM TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MAXIMUM TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE TEMPERATURE °C{" "}
                                </span>
                                <span className="test w-100 h-60p d-flex align-items-center justify-content-center">
                                  (MAX-MIN)TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  STANDARD DEVIATION °C{" "}
                                </span>
                              </div>
                              {props.parameterData?.slice(15,30).map((par) => {
                                return (
                                  <div className="d-flex flex-column w-20">
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.min.toFixed(2)}
                                    </span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.max.toFixed(2)}
                                    </span>
                                    {par.avg == Maximum ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-red text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : par.avg == Minimum ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-green text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    )}
                                    <span className="w-100 test h-60p d-flex align-items-center justify-content-center">{(par.max - par.min).toFixed(2)}</span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.std.toFixed(2)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            </div>
                            <div className="d-flex mt-5 justify-content-end font-weight-bold text-white f-12 text-center">
                              <div
                                className="bg-red"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                  marginRight: "30px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Maximum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  HOT SPOT ({props.editcase?.pos1})
                                </p>
                              </div>
                              <div
                                className="bg-green"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Minimum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  COLD SPOT ({props.editcase?.pos2})
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                                    ) : (
                                      ""
                                    )}
{props.parameterData?.slice(30,45).length > 0 ? (
  <div className="19-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <MainHeader />
                        <div className="d-flex flex-column ">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 mb-4 text-left">
                            Summary of Parameters Computed During Mapping
                            (Temperature)
                          </h4>

                          <div className="text-center p-2">
                            <div>
                            <div className="d-flex test w-100">
                              <span className="w-58 h-50p test font-weight-bold d-flex align-items-center justify-content-center para">
                                Position
                              </span>

                              {props.parameterData?.length > 0 &&
                                props.parameterData?.slice(30,45).map((par) => {
                                  return (
                                    <span
                                    key={par.id}
                                    className="w-20 h-50p test font-weight-bold d-flex align-items-center justify-content-center parameter"
                                    >
                                      {par.sensor}
                                    </span>
                                  );
                                })}
                            </div>
                            <div className="d-flex w-100">
                              <div className="w-58  text-center d-flex flex-column font-weight-bold temperature">
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MINIMUM TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MAXIMUM TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE TEMPERATURE °C{" "}
                                </span>
                                <span className="test w-100 h-60p d-flex align-items-center justify-content-center">
                                  (MAX-MIN)TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  STANDARD DEVIATION °C{" "}
                                </span>
                              </div>
                              {props.parameterData?.slice(30,45).map((par) => {
                                return (
                                  <div className="d-flex flex-column w-20">
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.min.toFixed(2)}
                                    </span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.max.toFixed(2)}
                                    </span>
                                    {par.avg == Maximum ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-red text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : par.avg == Minimum ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-green text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    )}
                                    <span className="w-100 test h-60p d-flex align-items-center justify-content-center">{(par.max - par.min).toFixed(2)}</span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.std.toFixed(2)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            </div>
                             <div className="d-flex mt-5 justify-content-end font-weight-bold text-white f-12 text-center">
                              <div
                                className="bg-red"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                  marginRight: "30px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Maximum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  HOT SPOT ({props.editcase?.pos1})
                                </p>
                              </div>
                              <div
                                className="bg-green"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Minimum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  COLD SPOT ({props.editcase?.pos2})
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}
{props.parameterData?.slice(45,60).length > 0 ? (
  <div className="19-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <MainHeader />
                        <div className="d-flex flex-column ">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 mb-4 text-left">
                            Summary of Parameters Computed During Mapping
                            (Temperature)
                          </h4>

                          <div className="text-center p-2">
                            <div>
                            <div className="d-flex test w-100">
                              <span className="w-58 h-50p test font-weight-bold d-flex align-items-center justify-content-center para">
                                Position
                              </span>

                              {props.parameterData?.length > 0 &&
                                props.parameterData?.slice(45,60).map((par) => {
                                  return (
                                    <span
                                    key={par.id}
                                    className="w-20 h-50p test font-weight-bold d-flex align-items-center justify-content-center parameter"
                                    >
                                      {par.sensor}
                                    </span>
                                  );
                                })}
                            </div>
                            <div className="d-flex w-100">
                              <div className="w-58  text-center d-flex flex-column font-weight-bold temperature">
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MINIMUM TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MAXIMUM TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE TEMPERATURE °C{" "}
                                </span>
                                <span className="test w-100 h-60p d-flex align-items-center justify-content-center">
                                  (MAX-MIN)TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  STANDARD DEVIATION °C{" "}
                                </span>
                              </div>
                              {props.parameterData?.slice(45,60).map((par) => {
                                return (
                                  <div className="d-flex flex-column w-20">
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.min.toFixed(2)}
                                    </span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.max.toFixed(2)}
                                    </span>
                                    {par.avg == Maximum ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-red text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : par.avg == Minimum ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-green text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    )}
                                    <span className="w-100 test h-60p d-flex align-items-center justify-content-center">{(par.max - par.min).toFixed(2)}</span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.std.toFixed(2)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            </div>
                            <div className="d-flex mt-5 justify-content-end font-weight-bold text-white f-12 text-center">
                              <div
                                className="bg-red"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                  marginRight: "30px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Maximum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  HOT SPOT ({props.editcase?.pos1})
                                </p>
                              </div>
                              <div
                                className="bg-green"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Minimum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  COLD SPOT ({props.editcase?.pos2})
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}

{props.parameterData?.slice(60,75).length > 0 ? (
  <div className="19-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <MainHeader />
                        <div className="d-flex flex-column ">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 mb-4 text-left">
                            Summary of Parameters Computed During Mapping
                            (Temperature)
                          </h4>

                          <div className="text-center p-2">
                            <div>
                            <div className="d-flex test w-100">
                              <span className="w-58 h-50p test font-weight-bold d-flex align-items-center justify-content-center para">
                                Position
                              </span>

                              {props.parameterData?.length > 0 &&
                                props.parameterData?.slice(60,75).map((par) => {
                                  return (
                                    <span
                                      key={par.id}
                                      className="w-20 h-50p test font-weight-bold d-flex align-items-center justify-content-center parameter"
                                      >
                                      {par.sensor}
                                    </span>
                                  );
                                })}
                            </div>
                            <div className="d-flex w-100">
                              <div className="w-58  text-center d-flex flex-column font-weight-bold temperature">
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MINIMUM TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MAXIMUM TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE TEMPERATURE °C{" "}
                                </span>
                                <span className="test w-100 h-60p d-flex align-items-center justify-content-center">
                                  (MAX-MIN)TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  STANDARD DEVIATION °C{" "}
                                </span>
                              </div>
                              {props.parameterData?.slice(60,75).map((par) => {
                                return (
                                  <div className="d-flex flex-column w-20">
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.min.toFixed(2)}
                                    </span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.max.toFixed(2)}
                                    </span>
                                    {par.avg == Maximum ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-red text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : par.avg == Minimum ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-green text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    )}
                                    <span className="w-100 test h-60p d-flex align-items-center justify-content-center">{(par.max - par.min).toFixed(2)}</span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.std.toFixed(2)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            </div>
                            <div className="d-flex mt-5 justify-content-end font-weight-bold text-white f-12 text-center">
                              <div
                                className="bg-red"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                  marginRight: "30px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Maximum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  HOT SPOT ({props.editcase?.pos1})
                                </p>
                              </div>
                              <div
                                className="bg-green"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Minimum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  COLD SPOT ({props.editcase?.pos2})
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                                ) : (
                                  ""
                                )}
{props.parameterData?.slice(75,90).length > 0 ? (
  <div className="19-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <MainHeader />
                        <div className="d-flex flex-column ">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 mb-4 text-left">
                            Summary of Parameters Computed During Mapping
                            (Temperature)
                          </h4>

                          <div className="text-center p-2">
                            <div>
                            <div className="d-flex test w-100">
                              <span className="w-58 h-50p test font-weight-bold d-flex align-items-center justify-content-center para">
                                Position
                              </span>

                              {props.parameterData?.length > 0 &&
                                props.parameterData?.slice(75,90).map((par) => {
                                  return (
                                    <span
                                      key={par.id}
                                      className="w-20 h-50p test font-weight-bold d-flex align-items-center justify-content-center parameter"
                                    >
                                      {par.sensor}
                                    </span>
                                  );
                                })}
                            </div>
                            <div className="d-flex w-100">
                              <div className="w-58  text-center d-flex flex-column font-weight-bold temperature">
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MINIMUM TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MAXIMUM TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE TEMPERATURE °C{" "}
                                </span>
                                <span className="test w-100 h-60p d-flex align-items-center justify-content-center">
                                  (MAX-MIN)TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  STANDARD DEVIATION °C{" "}
                                </span>
                              </div>
                              {props.parameterData?.slice(75,90).map((par) => {
                                return (
                                  <div className="d-flex flex-column w-20">
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.min.toFixed(2)}
                                    </span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.max.toFixed(2)}
                                    </span>
                                    {par.avg == Maximum ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-red text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : par.avg == Minimum ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-green text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    )}
                                    <span className="w-100 test h-60p d-flex align-items-center justify-content-center">{(par.max - par.min).toFixed(2)}</span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.std.toFixed(2)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            </div>
                            <div className="d-flex mt-5 justify-content-end font-weight-bold text-white f-12 text-center">
                              <div
                                className="bg-red"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                  marginRight: "30px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Maximum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  HOT SPOT ({props.editcase?.pos1})
                                </p>
                              </div>
                              <div
                                className="bg-green"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Minimum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  COLD SPOT ({props.editcase?.pos2})
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  <div class="page-break"></div>
                  </div>
                                        ) : (
                                          ""
                                        )}

{props.parameterData?.slice(90,105).length > 0 ? (
  <div className="19-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <MainHeader />
                        <div className="d-flex flex-column ">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 mb-4 text-left">
                            Summary of Parameters Computed During Mapping
                            (Temperature)
                          </h4>

                          <div className="text-center p-2">
                            <div>
                            <div className="d-flex test w-100">
                              <span className="w-58 h-50p test font-weight-bold d-flex align-items-center justify-content-center para">
                                Position
                              </span>

                              {props.parameterData?.length > 0 &&
                                props.parameterData?.slice(90,105).map((par) => {
                                  return (
                                    <span
                                      key={par.id}
                                      className="w-20 h-50p test font-weight-bold d-flex align-items-center justify-content-center parameter"
                                    >
                                      {par.sensor}
                                    </span>
                                  );
                                })}
                            </div>
                            <div className="d-flex w-100">
                              <div className="w-58  text-center d-flex flex-column font-weight-bold temperature">
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MINIMUM TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MAXIMUM TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE TEMPERATURE °C{" "}
                                </span>
                                <span className="test w-100 h-60p d-flex align-items-center justify-content-center">
                                  (MAX-MIN)TEMPERATURE °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  STANDARD DEVIATION °C{" "}
                                </span>
                              </div>
                              {props.parameterData?.slice(90,105).map((par) => {
                                return (
                                  <div className="d-flex flex-column w-20">
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.min.toFixed(2)}
                                    </span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.max.toFixed(2)}
                                    </span>
                                    {par.avg == Maximum ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-red text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : par.avg == Minimum ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-green text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    )}
                                    <span className="w-100 test h-60p d-flex align-items-center justify-content-center">{(par.max - par.min).toFixed(2)}</span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.std.toFixed(2)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            </div>
                            <div className="d-flex mt-5 justify-content-end font-weight-bold text-white f-12 text-center">
                              <div
                                className="bg-red"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                  marginRight: "30px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Maximum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  HOT SPOT ({props.editcase?.pos1})
                                </p>
                              </div>
                              <div
                                className="bg-green"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Minimum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  COLD SPOT ({props.editcase?.pos2})
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                      ) : (
                        ""
                      )}
                                  <RHeader user={user} />
                  <div className="19-page pdf-h-w">
                    <div className="p-1px test">
                      <div className="test">
                        <MainHeader />
                        <div className="d-flex flex-column ">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 mb-4 text-left">
                            Summary of Parameters Computed During Mapping
                            (Humidity)
                          </h4>

                          <div className="text-center p-2">
                            <div>
                            <div className="d-flex test w-100">
                              <span className="w-58 h-50p test font-weight-bold d-flex align-items-center justify-content-center para">
                                Position
                              </span>

                              {props.parameter.parameter1?.length > 0 &&
                                props.parameter.parameter1?.slice(0,15).map((par) => {
                                  return (
                                    <span
                                      key={par.id}
                                      className="w-20 h-50p test font-weight-bold d-flex align-items-center justify-content-center parameter"
                                    >
                                      {par.sensor}
                                    </span>
                                  );
                                })}
                            </div>
                            <div className="d-flex w-100">
                              <div className="w-58  text-center d-flex flex-column font-weight-bold temperature">
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MINIMUM HUMIDITY °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MAXIMUM HUMIDITY °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE HUMIDITY °C{" "}
                                </span>
                                <span className="test w-100 h-60p d-flex align-items-center justify-content-center">
                                  (MAX-MIN)HUMIDITY °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  STANDARD DEVIATION °C{" "}
                                </span>
                              </div>
                              {props.parameter.parameter1?.slice(0,15).map((par) => {
                                return (
                                  <div className="d-flex flex-column w-20">
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.min.toFixed(2)}
                                    </span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.max.toFixed(2)}
                                    </span>
                                    {par.avg == pMax1 ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-red text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : par.avg == pMin1 ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-green text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    )}
                                    <span className="w-100 test h-60p d-flex align-items-center justify-content-center">{(par.max - par.min).toFixed(2)}</span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.std.toFixed(2)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            </div>
                            <div className="d-flex mt-5 justify-content-end font-weight-bold text-white f-12 text-center">
                              <div
                                className="bg-red"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                  marginRight: "30px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Maximum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  HOT SPOT ({props.editcase?.pos1})
                                </p>
                              </div>
                              <div
                                className="bg-green"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Minimum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  COLD SPOT ({props.editcase?.pos2})
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="page-break"></div>
{props.parameter.parameter1?.slice(15,30).length > 0 ? (
  <div className="19-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <MainHeader />
                        <div className="d-flex flex-column ">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 mb-4 text-left">
                            Summary of Parameters Computed During Mapping
                            (Temperature)
                          </h4>

                          <div className="text-center p-2">
                            <div>
                            <div className="d-flex test w-100">
                              <span className="w-58 h-50p test font-weight-bold d-flex align-items-center justify-content-center para">
                                Position
                              </span>

                              {props.parameter.parameter1?.length > 0 &&
                                props.parameter.parameter1?.slice(15,30).map((par) => {
                                  return (
                                    <span
                                      key={par.id}
                                      className="w-20 h-50p test font-weight-bold d-flex align-items-center justify-content-center parameter"
                                    >
                                      {par.sensor}
                                    </span>
                                  );
                                })}
                            </div>
                            <div className="d-flex w-100">
                              <div className="w-58  text-center d-flex flex-column font-weight-bold temperature">
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MINIMUM HUMIDITY °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MAXIMUM HUMIDITY °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE HUMIDITY °C{" "}
                                </span>
                                <span className="test w-100 h-60p d-flex align-items-center justify-content-center">
                                  (MAX-MIN)HUMIDITY °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  STANDARD DEVIATION °C{" "}
                                </span>
                              </div>
                              {props.parameter.parameter1?.slice(15,30).map((par) => {
                                return (
                                  <div className="d-flex flex-column w-20">
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.min.toFixed(2)}
                                    </span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.max.toFixed(2)}
                                    </span>
                                    {par.avg == pMax1 ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-red text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : par.avg == pMin1 ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-green text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    )}
                                    <span className="w-100 test h-60p d-flex align-items-center justify-content-center">{(par.max - par.min).toFixed(2)}</span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.std.toFixed(2)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            </div>
                            <div className="d-flex mt-5 justify-content-end font-weight-bold text-white f-12 text-center">
                              <div
                                className="bg-red"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                  marginRight: "30px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Maximum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  HOT SPOT ({props.editcase?.pos1})
                                </p>
                              </div>
                              <div
                                className="bg-green"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Minimum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  COLD SPOT ({props.editcase?.pos2})
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                                    ) : (
                                      ""
                                    )}
{props.parameter.parameter1?.slice(30,45).length > 0 ? (
  <div className="19-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <MainHeader />
                        <div className="d-flex flex-column ">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 mb-4 text-left">
                            Summary of Parameters Computed During Mapping
                            (Temperature)
                          </h4>

                          <div className="text-center p-2">
                            <div>
                            <div className="d-flex test w-100">
                              <span className="w-58 h-50p test font-weight-bold d-flex align-items-center justify-content-center para">
                                Position
                              </span>

                              {props.parameter.parameter1?.length > 0 &&
                                props.parameter.parameter1?.slice(30,45).map((par) => {
                                  return (
                                    <span
                                    key={par.id}
                                    className="w-20 h-50p test font-weight-bold d-flex align-items-center justify-content-center parameter"
                                    >
                                      {par.sensor}
                                    </span>
                                  );
                                })}
                            </div>
                            <div className="d-flex w-100">
                              <div className="w-58  text-center d-flex flex-column font-weight-bold temperature">
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MINIMUM HUMIDITY °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MAXIMUM HUMIDITY °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE HUMIDITY °C{" "}
                                </span>
                                <span className="test w-100 h-60p d-flex align-items-center justify-content-center">
                                  (MAX-MIN)HUMIDITY °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  STANDARD DEVIATION °C{" "}
                                </span>
                              </div>
                              {props.parameter.parameter1?.slice(30,45).map((par) => {
                                return (
                                  <div className="d-flex flex-column w-20">
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.min.toFixed(2)}
                                    </span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.max.toFixed(2)}
                                    </span>
                                    {par.avg == pMax1 ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-red text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : par.avg == pMin1 ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-green text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    )}
                                    <span className="w-100 test h-60p d-flex align-items-center justify-content-center">{(par.max - par.min).toFixed(2)}</span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.std.toFixed(2)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            </div>
                             <div className="d-flex mt-5 justify-content-end font-weight-bold text-white f-12 text-center">
                              <div
                                className="bg-red"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                  marginRight: "30px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Maximum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  HOT SPOT ({props.editcase?.pos1})
                                </p>
                              </div>
                              <div
                                className="bg-green"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Minimum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  COLD SPOT ({props.editcase?.pos2})
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}
{props.parameter.parameter1?.slice(45,60).length > 0 ? (
  <div className="19-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <MainHeader />
                        <div className="d-flex flex-column ">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 mb-4 text-left">
                            Summary of Parameters Computed During Mapping
                            (Temperature)
                          </h4>

                          <div className="text-center p-2">
                            <div>
                            <div className="d-flex test w-100">
                              <span className="w-58 h-50p test font-weight-bold d-flex align-items-center justify-content-center para">
                                Position
                              </span>

                              {props.parameter.parameter1?.length > 0 &&
                                props.parameter.parameter1?.slice(45,60).map((par) => {
                                  return (
                                    <span
                                    key={par.id}
                                    className="w-20 h-50p test font-weight-bold d-flex align-items-center justify-content-center parameter"
                                    >
                                      {par.sensor}
                                    </span>
                                  );
                                })}
                            </div>
                            <div className="d-flex w-100">
                              <div className="w-58  text-center d-flex flex-column font-weight-bold temperature">
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MINIMUM HUMIDITY °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MAXIMUM HUMIDITY °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE HUMIDITY °C{" "}
                                </span>
                                <span className="test w-100 h-60p d-flex align-items-center justify-content-center">
                                  (MAX-MIN)HUMIDITY °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  STANDARD DEVIATION °C{" "}
                                </span>
                              </div>
                              {props.parameter.parameter1?.slice(45,60).map((par) => {
                                return (
                                  <div className="d-flex flex-column w-20">
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.min.toFixed(2)}
                                    </span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.max.toFixed(2)}
                                    </span>
                                    {par.avg == pMax1 ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-red text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : par.avg == pMin1 ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-green text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    )}
                                    <span className="w-100 test h-60p d-flex align-items-center justify-content-center">{(par.max - par.min).toFixed(2)}</span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.std.toFixed(2)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            </div>
                            <div className="d-flex mt-5 justify-content-end font-weight-bold text-white f-12 text-center">
                              <div
                                className="bg-red"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                  marginRight: "30px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Maximum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  HOT SPOT ({props.editcase?.pos1})
                                </p>
                              </div>
                              <div
                                className="bg-green"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Minimum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  COLD SPOT ({props.editcase?.pos2})
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                    ) : (
                      ""
                    )}

{props.parameter.parameter1?.slice(60,75).length > 0 ? (
  <div className="19-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <MainHeader />
                        <div className="d-flex flex-column ">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 mb-4 text-left">
                            Summary of Parameters Computed During Mapping
                            (Temperature)
                          </h4>

                          <div className="text-center p-2">
                            <div>
                            <div className="d-flex test w-100">
                              <span className="w-58 h-50p test font-weight-bold d-flex align-items-center justify-content-center para">
                                Position
                              </span>

                              {props.parameter.parameter1?.length > 0 &&
                                props.parameter.parameter1?.slice(60,75).map((par) => {
                                  return (
                                    <span
                                      key={par.id}
                                      className="w-20 h-50p test font-weight-bold d-flex align-items-center justify-content-center parameter"
                                      >
                                      {par.sensor}
                                    </span>
                                  );
                                })}
                            </div>
                            <div className="d-flex w-100">
                              <div className="w-58  text-center d-flex flex-column font-weight-bold temperature">
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MINIMUM HUMIDITY °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MAXIMUM HUMIDITY °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE HUMIDITY °C{" "}
                                </span>
                                <span className="test w-100 h-60p d-flex align-items-center justify-content-center">
                                  (MAX-MIN)HUMIDITY °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  STANDARD DEVIATION °C{" "}
                                </span>
                              </div>
                              {props.parameter.parameter1?.slice(60,75).map((par) => {
                                return (
                                  <div className="d-flex flex-column w-20">
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.min.toFixed(2)}
                                    </span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.max.toFixed(2)}
                                    </span>
                                    {par.avg == pMax1 ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-red text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : par.avg == pMin1 ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-green text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    )}
                                    <span className="w-100 test h-60p d-flex align-items-center justify-content-center">{(par.max - par.min).toFixed(2)}</span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.std.toFixed(2)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            </div>
                            <div className="d-flex mt-5 justify-content-end font-weight-bold text-white f-12 text-center">
                              <div
                                className="bg-red"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                  marginRight: "30px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Maximum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  HOT SPOT ({props.editcase?.pos1})
                                </p>
                              </div>
                              <div
                                className="bg-green"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Minimum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  COLD SPOT ({props.editcase?.pos2})
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                                ) : (
                                  ""
                                )}
{props.parameter.parameter1?.slice(75,90).length > 0 ? (
  <div className="19-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <MainHeader />
                        <div className="d-flex flex-column ">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 mb-4 text-left">
                            Summary of Parameters Computed During Mapping
                            (Temperature)
                          </h4>

                          <div className="text-center p-2">
                            <div>
                            <div className="d-flex test w-100">
                              <span className="w-58 h-50p test font-weight-bold d-flex align-items-center justify-content-center para">
                                Position
                              </span>

                              {props.parameter.parameter1?.length > 0 &&
                                props.parameter.parameter1?.slice(75,90).map((par) => {
                                  return (
                                    <span
                                      key={par.id}
                                      className="w-20 h-50p test font-weight-bold d-flex align-items-center justify-content-center parameter"
                                    >
                                      {par.sensor}
                                    </span>
                                  );
                                })}
                            </div>
                            <div className="d-flex w-100">
                              <div className="w-58  text-center d-flex flex-column font-weight-bold temperature">
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MINIMUM HUMIDITY °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MAXIMUM HUMIDITY °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE HUMIDITY °C{" "}
                                </span>
                                <span className="test w-100 h-60p d-flex align-items-center justify-content-center">
                                  (MAX-MIN)HUMIDITY °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  STANDARD DEVIATION °C{" "}
                                </span>
                              </div>
                              {props.parameter.parameter1?.slice(75,90).map((par) => {
                                return (
                                  <div className="d-flex flex-column w-20">
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.min.toFixed(2)}
                                    </span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.max.toFixed(2)}
                                    </span>
                                    {par.avg == pMax1 ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-red text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : par.avg == pMin1 ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-green text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    )}
                                    <span className="w-100 test h-60p d-flex align-items-center justify-content-center">{(par.max - par.min).toFixed(2)}</span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.std.toFixed(2)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            </div>
                            <div className="d-flex mt-5 justify-content-end font-weight-bold text-white f-12 text-center">
                              <div
                                className="bg-red"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                  marginRight: "30px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Maximum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  HOT SPOT ({props.editcase?.pos1})
                                </p>
                              </div>
                              <div
                                className="bg-green"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Minimum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  COLD SPOT ({props.editcase?.pos2})
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  <div class="page-break"></div>
                  </div>
                                        ) : (
                                          ""
                                        )}

{props.parameter.parameter1?.slice(90,105).length > 0 ? (
  <div className="19-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test">
                        <MainHeader />
                        <div className="d-flex flex-column ">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 mb-4 text-left">
                            Summary of Parameters Computed During Mapping
                            (Temperature)
                          </h4>

                          <div className="text-center p-2">
                            <div>
                            <div className="d-flex test w-100">
                              <span className="w-58 h-50p test font-weight-bold d-flex align-items-center justify-content-center para">
                                Position
                              </span>

                              {props.parameter.parameter1?.length > 0 &&
                                props.parameter.parameter1?.slice(90,105).map((par) => {
                                  return (
                                    <span
                                      key={par.id}
                                      className="w-20 h-50p test font-weight-bold d-flex align-items-center justify-content-center parameter"
                                    >
                                      {par.sensor}
                                    </span>
                                  );
                                })}
                            </div>
                            <div className="d-flex w-100">
                              <div className="w-58  text-center d-flex flex-column font-weight-bold temperature">
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MINIMUM HUMIDITY °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE MAXIMUM HUMIDITY °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  AVERAGE HUMIDITY °C{" "}
                                </span>
                                <span className="test w-100 h-60p d-flex align-items-center justify-content-center">
                                  (MAX-MIN)HUMIDITY °C
                                </span>
                                <span className="test w-100 h-50p d-flex align-items-center justify-content-center">
                                  STANDARD DEVIATION °C{" "}
                                </span>
                              </div>
                              {props.parameter.parameter1?.slice(90,105).map((par) => {
                                return (
                                  <div className="d-flex flex-column w-20">
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.min.toFixed(2)}
                                    </span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.max.toFixed(2)}
                                    </span>
                                    {par.avg == pMax1 ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-red text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : par.avg == pMin1 ? (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center bg-green text-white">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    ) : (
                                      <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                        {par.avg.toFixed(2)}
                                      </span>
                                    )}
                                    <span className="w-100 test h-60p d-flex align-items-center justify-content-center">{(par.max - par.min).toFixed(2)}</span>
                                    <span className="w-100 test h-50p d-flex align-items-center justify-content-center">
                                      {par.std.toFixed(2)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            </div>
                            <div className="d-flex mt-5 justify-content-end font-weight-bold text-white f-12 text-center">
                              <div
                                className="bg-red"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                  marginRight: "30px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Maximum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  HOT SPOT ({props.editcase?.pos1})
                                </p>
                              </div>
                              <div
                                className="bg-green"
                                style={{
                                  "width": "23vw",
                                  padding: "10px",
                                }}
                              >
                                <p className="p-0 m-0">
                                  Average Minimum Temperature Point
                                </p>
                                <p className="p-0 m-0">
                                  COLD SPOT ({props.editcase?.pos2})
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                      ) : (
                        ""
                      )}
                      
                           


{myState5 == true ? (
  
  <div className="20-page pdf-h-w" >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="text-left ">
                          <div className="ml-3 mb-10">
                            <h4 className="font-weight-bold w-100 text-underline mt-1 ml-2 text-left">
                              Observation and Concluding Remarks
                            </h4>
                            <p className="space-line">
                              {user.concluding_remark}
                            </p>
                          </div>

                          <div className="mb-10 ml-3">
                            <h4 className="font-weight-bold text-underline">
                              Conclusion
                            </h4>
                            <p className="space-line">{user.conclusion}</p>
                          </div>

                          <div>
                            <div className="test-t test-b2 mt-2 mb-10">
                              <div className="d-flex test">
                                <span className="w-50 pl-3 test-r">
                                  For M/s. Vega Calibration And Validation
                                  Services LLP.{" "}
                                </span>
                                <span className="w-50 pl-1">
                                  {" "}
                                  {user?.company?.name}{" "}
                                </span>
                              </div>

                              <div className="d-flex test">
                                <span className="w-25 pl-3 test-r">
                                  Prepared by
                                </span>
                                <span className="w-25 pl-3 test-r">
                                  Checked By{" "}
                                </span>
                                <span className="w-25 pl-3 test-r">
                                  Reviewed By{" "}
                                </span>
                                <span className="w-25 pl-3 ">Approved By </span>
                              </div>
                              <div className="d-flex test" style={{"lineHeight":""}}>
                                <span className="w-25 pl-3 test-r">
                                Digitally Signed By : {user.prepared_by} <br/>
Reason : Authorised Signatory <br/>
Date/Time : { user.prepared_by_time? <DataTime data={user.prepared_by_time} />: "N/A"} <br/>
                                </span>
                                <span className="w-25 pl-3 test-r">
                                Digitally Signed By : {user.checked_by} <br/>
Reason : Authorised Signatory <br/>
Date/Time :{ user.checked_by_time? <DataTime data={user.checked_by_time} />: "N/A"} <br/>
                                </span>
                                <span className="w-25 pl-3 test-r">
                                Digitally Signed By : {user.reviewed_by} <br/>
Reason : Authorised Signatory <br/>
Date/Time : { user.reviewed_by_time? <DataTime data={user.reviewed_by_time} />: "N/A"}<br/>
                                </span>
                                <span className="w-25 pl-3">
                                Digitally Signed By : {user.approved_by} <br/>
Reason : Authorised Signatory <br/>
Date/Time : { user.approved_by_time? <DataTime data={user.approved_by_time} />: "N/A"} <br/>
                                </span>
                            </div>
                              <p className="pl-3 font-smaller" style={{"color":"red"}}>
                                Note : The results reported in this certificate
                                are valid at the time of temperature mapping
                                activity
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  <div class="page-break"></div>
                  </div>

                    ) : (
                      ""
                    )}
                    

                  <div className="21-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="text-left ">
                          <div className="ml-3">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 ">
                              MEAN KINETIC TEMPERATURE (M.K.T)
                            </h4>
                          </div>

                          <div className="pr-4 pt-2 pb-2 pl-4">
                            <div className="test-t test-b2 mt-4 mb-50">
                              <div className="test p-4 text-center">
                                {" "}
                                <img
                                  src={mkt}
                                  alt="mkt"
                                  style={{ maxWidth: "350px" }}
                                />
                                {/* ΔH__ -ln (℮ -ΔH/RT1+ ℮ -ΔH/RT2+ … + ℮ -ΔH/RTn ) */}
                              </div>

                              <div className="test p-4">
                                <p className="p-0 m-0">
                                  TK: Mean kinetic temperature in °K
                                </p>
                                <p className="p-0 m-0">
                                  ΔH: Activation Energy for degradation reaction
                                  typically taken as 8.3144 kJ/mole
                                </p>
                                <p className="p-0 m-0">
                                  R is the universal gas constant = 8.3144x 10-3
                                  kJ per degree per mol{" "}
                                </p>
                                <p className="p-0 m-0">
                                  T1 to Tn are the average temperatures at each
                                  of the sample points in °K{" "}
                                </p>
                                <p className="p-0 m-0">
                                  n is the number of temperature sample points
                                </p>
                                <p className="p-0 m-0">
                                  M . K . T = {props.editcase?.mkt ?? ""}
                                </p>
                                <p className="p-0 m-0">
                                  "A single derived temperature that, if
                                  maintained over a defined period of time,
                                  affords the same thermal
                                </p>
                                <p className="p-0 m-0">
                                  challenge to a drug substance or drug product
                                  as would be experienced over a range of both
                                  higher and
                                </p>
                                <p className="p-0 m-0">
                                  {" "}
                                  lower temperatures for an equivalent defined
                                  period.
                                </p>
                              </div>
                              <div style={{"color":"red"}}>
                            Note: All Parameters Are Computed Based On The Attached Raw Data.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                              <div class="page-break"></div>
                  {/* {hotSpotImage.id < 0 ? ( */}
                  <div className="22-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                            {/* Location Diagram Indicating Position Of Loggers */}
                            Location Chart Indicating Position Of Maximum and Minimum Average Temperature Point
                          </h4>
                          {/* <img
                            src={`${imageUrl}${user.identification_no}/${user.file_2}`}
                            className="image w-80"
                            alt=""
                          /> */}
                          {hotSpotImage && (
                            <img
                            src={`${imageUrl}Cases-Files//${hotSpotImage.file}`}
                            className={`image ${coldSpotImage ? "w-100" : "w-100"
                          }`}
                          alt=""
                          />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="page-break"></div>
                  {/* ):""} */}

                  {coldSpotImage?.id < 0 ? (
                  <div className="22-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                          Location Chart Indicating Position Of Maximum and Minimum Average Temperature Point
                            {/* Location Diagram Indicating Position Of Loggers */}
                          </h4>
                          {/* <img
                            src={`${imageUrl}${user.identification_no}/${user.file_2}`}
                            className="image w-80"
                            alt=""
                          /> */}
                          {coldSpotImage && (
                            <img
                              src={`${imageUrl}Cases-Files//${coldSpotImage.file}`}
                              className={`image ${hotSpotImage ? "w-100" : "w-100"
                                }`}
                                alt=""
                                />
                          )}
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>
                  ):""}

                  {/* position logger images start here */}

                  {/* {postiionLogger1 ? (
                    <div className="23-page pdf-h-w">
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                        <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                            Location Diagram Indicating Position Of Loggers
                            </h4>
                            <img
                              src={`${imageUrl}Cases-Files//${postiionLogger1.file}`}
                              className="image w-50"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                    )}

                    <div class="page-break"></div>

                  {postiionLogger2 ? (
                    <div className="24-page pdf-h-w">
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                        <MainHeader />
                          <div className="">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                              Location Diagram Indicating Position Of Loggers
                            </h4>
                            <img
                              src={`${imageUrl}Cases-Files//${postiionLogger2.file}`}
                              className="image w-50"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                    )}
                    
                  <div class="page-break"></div>

                  {postiionLogger3 ? (
                    <div className="25-page pdf-h-w">
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                        <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                              Location Diagram Indicating Position Of Loggers
                              </h4>
                            <img
                              src={`${imageUrl}Cases-Files//${postiionLogger3.file}`}
                              className="image w-50"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div class="page-break"></div>
                  
                  {postiionLogger4 ? (
                    <div className="26-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                              Location Diagram Indicating Position Of Loggers
                            </h4>
                            <img
                            src={`${imageUrl}Cases-Files//${postiionLogger4.file}`}
                              className="image w-50"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      </div>
                  ) : (
                    ""
                  )}
                  <div class="page-break"></div>

                  {postiionLogger5 ? (
                    <div className="26-page pdf-h-w">
                      <RHeader user={user} />
                      <div className="p-1px test">
                        <div className="test ">
                          <MainHeader />
                          <div className="">
                            <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                              Location Diagram Indicating Position Of Loggers
                            </h4>
                            <img
                              src={`${imageUrl}Cases-Files//${postiionLogger5.file}`}
                              className="image w-50"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )} */}
{myState6==true ? (
  
  <div className="27-page pdf-h-w"
                 >
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="d-flex justify-content-center align-items-center h-70v">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2">
                            Summary And Observation Report Of Risk Analysis
                            Studies For "{user.type_of_room}"
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div class="page-break"></div>
                  </div>

) : (
  ""
)}
{myState6==true ? (
  
  <div className="28-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="d-flex flex-column justify-content-start text-left  ml-2 h-70v">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                            Observation Remarks
                          </h4>
                          <p className="space-line p-2">
                            {user.obeservation_remark}
                          </p>
                        </div>
                      </div>
                    </div>
<div class="page-break"></div>
                  </div>

) : (
  ""
)}


                  <div className="29-page pdf-h-w">
                    <RHeader user={user} />
                    <div className="p-1px test">
                      <div className="test ">
                        <MainHeader />
                        <div className="d-flex flex-column justify-content-start text-left  ml-2 h-70v">
                          <h4 className="font-weight-bold w-100 text-underline mt-2 ml-2 text-left">
                            List Of Annexures
                          </h4>
                          <div>
                            1. Annexure-1{" "}
                            <a
                              target={"blank"}
                              href={`${imageUrl}${user.identification_no}/${user.file_3}`}
                              rel="noreferrer"
                            >
                              {user.file_3}
                            </a>
                          </div>
                          <div>
                            {" "}
                            2. Annexure-2{" "}
                            <a
                              target={"blank"}
                              href={`${imageUrl}${user.identification_no}/${user.file_4}`}
                              rel="noreferrer"
                              >
                              {user.file_4}
                            </a>
                          </div>
                          <p>
                  {" "}
                  3. Annexure-3 {" "}
                          <a
                            target={"blank"}
                            href={`${imageUrl}${user.identification_no}/${user.file_5}`}
                            rel="noreferrer"
                            className="mr-3"
                          >
                            {user.file_5}
                          </a>
                </p>
                          {/* <div>
                            {" "}
                            3. Annexure-3 User Certificate:
                            {userCertificate?.length > 0
                              ? userCertificate?.map((file, index) => {
                                return (
                                  <a
                                  target={"blank"}
                                  key={index}
                                  href={`${imageUrl}CompanyFiles/${file.file}`}
                                  rel="noreferrer"
                                  className="mr-3"
                                  >
                                    {file.file}
                                  </a>
                                );
                              })
                              : "Please upload user certificate"}
                          </div> */}
                          {/* <div>
                            4. Sensor Certificates:{" "}
                            <ul>
                              {sensorCertificate?.length > 0
                                ? sensorCertificate?.map((file, index) => {
                                  return (
                                    <li>
                                      {file.name}
                                      <a
                                        target={"blank"}
                                        key={index}
                                        href={`${imageUrl}Sensorfiles/${file.file}`}
                                        rel="noreferrer"
                                        className="mr-3"
                                      >
                                        {" "}
                                        {file.file}
                                      </a>
                                    </li>
                                  );
                                })
                                : "Please upload Sensor certificate"}
                            </ul>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div class="page-break"></div>
                  {pageSize > 0 &&
                    Array(pageSize)
                    ?.fill(0)
                    ?.map((_, index) => (
                      <>
                          <div className="30-page pdf-h-w">
                            <RHeader user={user} />
                            <div className="p-1px test">
                              <div className="test">
                              <MainHeader />
                                <div>
                                <table className="test table table-sm">
                                <thead>
                                <tr>
                                <th scope="col" className="test">
                                Sr No.
                                        </th>
                                        <th scope="col" className="test">
                                          ID
                                        </th>
                                        <th scope="col" className="test">
                                          Test Type Id
                                        </th>
                                        <th scope="col" className="test">
                                          Sensor
                                        </th>
                                        <th scope="col" className="test">
                                          Date
                                          </th>
                                        <th scope="col" className="test">
                                          Time
                                        </th>
                                        <th scope="col" className="test">
                                          Temp
                                        </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      {props.rawData?.isLoading ? (
                                        <CircularLoader />
                                      ) : props.rawData?.rawData?.length > 0 ? (
                                        props.rawData?.rawData
                                          ?.slice(index * 15, (index + 1) * 15)
                                          .map((data, rawIndex) => {
                                            return (
                                              <tr key={index * 15 + rawIndex}>
                                                <td className="test">
                                                  {index * 15 + rawIndex + 1}
                                                </td>
                                                <td className="test">
                                                  {data?.id}
                                                </td>

                                                <td className="test">
                                                  {data?.test_type_id}
                                                </td>

                                                <td className="test">
                                                  {data?.sensor}
                                                </td>

                                                <td className="test">
                                                  <DateFormat
                                                    data={data?.date}
                                                  />
                                                </td>

                                                <td className="test">
                                                  {data?.time}
                                                </td>

                                                <td className="test">
                                                  {data?.temp}
                                                </td>
                                              </tr>
                                            );
                                          })
                                      ) : (
                                        "Please upload raw data"
                                        )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="page-break"></div>
                        </>
                      ))} */}

                  <div class="page-break"></div>
                  {user.blank_page ||
                    (blankpage && (
                      <div className="30-page pdf-h-w">
                        <RHeader user={user} />
                        <div className="p-1px test">
                          <div className="test h-90v">
                            <MainHeader />
                          </div>
                        </div>
                      </div>
                    ))}
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
    parameter: state.parameter,
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
    onGetCasesDataAc: (data) => dispatch(actions.getCasesDataAc(data)),
    sensorsGetData: (data2) =>
    dispatch(actions.sensorsGetData(data2)),
    parameterGetData1: (dataPara) => dispatch(actions.parameterGetData1(dataPara)),

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FinalReport);

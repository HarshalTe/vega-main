/* eslint-disable eqeqeq */
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  InputGroup,
  FormGroup,
} from "reactstrap";

import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../../../../../views/custom/CustomInput";
import { connect } from "react-redux";
import * as actions from "../../../../../redux/action";
import Switch from "@mui/material/Switch";
import ON_TOGGLE6 from "../../../../../redux/action/ActionType6"
import { useDispatch } from "react-redux";
// import Loader2 from "../../../../loader/Loader2";
import { useParams } from "react-router-dom";

function Risk(props) {
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
  
  const [checked, setChecked] = React.useState(idPage[0]?.risk==1?false:true);
  // const [checked, setChecked] = React.useState(false);
  // console.log(checked,"checked")
  
  // const handleChange = (event) => {
  //   dispatch(ON_TOGGLE6(checked))
  //   setChecked(event.target.checked);
  // }
  const handleChange = (event) => {
    setChecked(event.target.checked);
    // dispatch(ON_TOGGLE2(checked))
    console.log(checked,"checked111222",userIdPage,event.target.checked)
    let user={
      "id": userIdPage,
    "risk": event.target.checked==false? 1 : 0,
    }
    props.updatePageDetail(data,user)
  }
  const dispatch = useDispatch();

  console.log(props,"rrr")
  const Atime=[]
  const door1No= (props.cycle.cycle[1]?.dcp_on_time)
  const door1Off= (props.cycle.cycle[1]?.do_off_time)
  const door1NoS=door1No?.slice(3,5)
  const door1OffS=door1Off?.slice(3,5)
  const time1=parseInt(door1OffS)-parseInt(door1NoS)
  Atime.push(time1)
  
  const door2No= (props.cycle.cycle[2]?.dcp_on_time)
  const door2Off= (props.cycle.cycle[2]?.do_off_time)
  const door2NoS=door2No?.slice(3,5)
  const door2OffS=door2Off?.slice(3,5)
  const time2=parseInt(door2OffS)-parseInt(door2NoS)
  Atime.push(time2)
  
  const door3No= (props.cycle.cycle[3]?.dcp_on_time)
  const door3Off= (props.cycle.cycle[3]?.do_off_time)
  const door3NoS=door3No?.slice(3,5)
  const door3OffS=door3Off?.slice(3,5)
  const time3=parseInt(door3OffS)-parseInt(door3NoS)
  Atime.push(time3)

  const avTime= (Atime[0]+Atime[1]+Atime[2])/Atime.length


  const AsetTime=[]
  const door1In= (props.cycle.cycle[1]?.set_limit_cross_in_time)
  const door1Out= (props.cycle.cycle[1]?.set_limit_cross_out_time)
  const door1InS=door1In?.slice(3,5)
  const door1OutS=door1Out?.slice(3,5)
  const timeSet1=parseInt(door1InS)-parseInt(door1OutS)
  AsetTime.push(timeSet1)
  
  const door2In= (props.cycle.cycle[2]?.set_limit_cross_in_time)
  const door2Out= (props.cycle.cycle[2]?.set_limit_cross_out_time)
  const door2InS=door2In?.slice(3,5)
  const door2OutS=door2Out?.slice(3,5)
  const timeSet2=parseInt(door2InS)-parseInt(door2OutS)
  AsetTime.push(timeSet2)
  
  const door3In= (props.cycle.cycle[3]?.set_limit_cross_in_time)
  const door3Out= (props.cycle.cycle[3]?.set_limit_cross_out_time)
  const door3InS=door3In?.slice(3,5)
  const door3OutS=door3Out?.slice(3,5)
  const timeSet3=parseInt(door3InS)-parseInt(door3OutS)
  AsetTime.push(timeSet3)
  
  const avSetTime= ""+(AsetTime[0]+AsetTime[1]+AsetTime[2])/AsetTime.length
   const RavSetTime=avSetTime?.slice(0,5);
  console.log(timeSet1,timeSet2,timeSet3,AsetTime,avSetTime,"vvv")
  
  const power1No= (props.cycle.cycle[4]?.dcp_on_time)
  const power1Off= (props.cycle.cycle[4]?.do_off_time)
  const power1NoS=power1No?.slice(3,5)
  const power1OffS=power1Off?.slice(3,5)
  const pTime=parseInt(power1OffS)-parseInt(power1NoS)
  console.log(RavSetTime,"bbb")

  const doorOpenGraphData1 =
  props.cycle?.cycle?.length > 0
      ? props.cycle?.cycle?.filter(
          (item) =>
            item.door_open_test_name === "Door Open Test Cycle"  && item.case_id == param.id  ||
            item.door_open_test_name === "Door Open Test Cycle-I" && item.case_id == param.id 
        )[0]
    : [];
  const doorOpenGraphData2 =
  props.cycle?.cycle?.length > 0
      ? props.cycle?.cycle?.filter(
          (item) =>
            item.door_open_test_name === "Door Open Test Cycle-II"  && item.case_id == param.id
            // item.door_open_test_name === "Door Open Test Cycle-I" && item.case_id == param.id 
        )[0]
    : [];
  const doorOpenGraphData3 =
  props.cycle?.cycle?.length > 0
      ? props.cycle?.cycle?.filter(
          (item) =>
            item.door_open_test_name === "Door Open Test Cycle-III"  && item.case_id == param.id
            // item.door_open_test_name === "Door Open Test Cycle-I" && item.case_id == param.id 
        )[0]
    : [];
                  // console.log("12345",doorOpenGraphData1.dcp_on_time,doorOpenGraphData1.set_limit_cross_out_time,doorOpenGraphData1.do_off_time,doorOpenGraphData1.set_limit_cross_in_time,doorOpenGraphData2,doorOpenGraphData3,props.cycle?.cycle?.length)
                  
                  
                  // const fisrtDoor= doorOpenGraphData1.dcp_on_time;
                  
const powerOnGraphData1 =
props.cycle?.cycle?.length > 0
      ? props.cycle?.cycle?.filter(
          (item) =>
          item.door_open_test_name === "Power Failure Test Cycle"  && item.case_id == param.id  ||
            item.door_open_test_name === "Power Failure Test Cycle-I" && item.case_id == param.id 
        )[0]
        : [];
  const powerOnGraphData2 =
  props.cycle?.cycle?.length > 0
      ? props.cycle?.cycle?.filter(
          (item) =>
          item.door_open_test_name === "Power Failure Test Cycle-II"  && item.case_id == param.id
            // item.door_open_test_name === "Door Open Test Cycle-I" && item.case_id == param.id 
        )[0]
    : [];
  const powerOnGraphData3 =
  props.cycle?.cycle?.length > 0
      ? props.cycle?.cycle?.filter(
        (item) =>
        item.door_open_test_name === "Power Failure Test Cycle-III"  && item.case_id == param.id
        // item.door_open_test_name === "Door Open Test Cycle-I" && item.case_id == param.id 
        )[0]
        : [];
        console.log("12345",powerOnGraphData1,powerOnGraphData2,powerOnGraphData3,doorOpenGraphData1)
        
        // Convert a time in hh:mm format to minutes
function timeToMins(time) {
  var b = time?.split(':');
  if (b!=undefined) {
    return b[0]*60 + +b[1];
  } else {
    console.log("object",b)
  }
}

// Convert minutes to a time in format hh:mm
// Returned value is in range 00  to 24 hrs
function timeFromMins(mins) {
  function z(n){return (n<10? '0':'') + n;}
  var h = (mins/60 |0) % 24;
  var m = mins % 60;
  return z(h) + ':' + z(m);
}

// Add two times in hh:mm formatooo
function addTimes(t0, t1) {
  return timeFromMins(timeToMins(t0) - timeToMins(t1));
}

// const power1 = addTimes(powerOnGraphData1?.set_limit_cross_out_time, powerOnGraphData1?.dcp_on_time)
const power1 = powerOnGraphData1?.id>0 ? [addTimes(powerOnGraphData1?.set_limit_cross_out_time, powerOnGraphData1?.dcp_on_time),addTimes(powerOnGraphData1?.set_limit_cross_in_time,powerOnGraphData1?.do_off_time)] : null
const power2 = powerOnGraphData2?.id>0 ? [addTimes(powerOnGraphData2?.set_limit_cross_out_time, powerOnGraphData2?.dcp_on_time),addTimes(powerOnGraphData2?.set_limit_cross_in_time,powerOnGraphData2?.do_off_time)] : null
const power3 = powerOnGraphData3?.id>0 ? [addTimes(powerOnGraphData3?.set_limit_cross_out_time, powerOnGraphData3?.dcp_on_time),addTimes(powerOnGraphData3?.set_limit_cross_in_time,powerOnGraphData3?.do_off_time)] : null

console.log("object12345",power1,power2)  
// const ApowerF = parseInt(power1[0].slice(-2))+ parseInt(power1[0].slice(-2))
const ApowerF = power1 != undefined ? (power2 != null  & power3 != null?
(parseInt(power1[0].slice(-2))+ parseInt(power2[0].slice(-2))+parseInt(power3[0].slice(-2)))/3
: power2 != null ? (parseInt(power1[0].slice(-2))+ parseInt(power2[0].slice(-2)))/2
: power3 != null ? (parseInt(power1[0].slice(-2))+ parseInt(power3[0].slice(-2)))/2
: parseInt(power1[0].slice(-2))):""

const ApowerL = power1 != undefined?(power2 != null & power3 != null?
(parseInt(power1[1].slice(-2))+ parseInt(power2[1].slice(-2))+parseInt(power3[1].slice(-2)))/3
: power2 != null ? (parseInt(power1[1].slice(-2))+ parseInt(power2[1].slice(-2)))/2
: power3 != null ? (parseInt(power1[1].slice(-2))+ parseInt(power3[1].slice(-2)))/2
: parseInt(power1[1].slice(-2))):""

console.log("object12345",power1,power2,power3,ApowerF,ApowerL)


const door1 = doorOpenGraphData1?.id>0 ? [addTimes(doorOpenGraphData1?.set_limit_cross_out_time, doorOpenGraphData1?.dcp_on_time),addTimes(doorOpenGraphData1?.set_limit_cross_in_time,doorOpenGraphData1?.do_off_time)] : null
const door2 = doorOpenGraphData2?.id>0 ? [addTimes(doorOpenGraphData2?.set_limit_cross_out_time, doorOpenGraphData2?.dcp_on_time),addTimes(doorOpenGraphData2?.set_limit_cross_in_time,doorOpenGraphData2?.do_off_time)] : null
const door3 = doorOpenGraphData3?.id>0 ? [addTimes(doorOpenGraphData3?.set_limit_cross_out_time, doorOpenGraphData3?.dcp_on_time),addTimes(doorOpenGraphData3?.set_limit_cross_in_time,doorOpenGraphData3?.do_off_time)] : null

// const AdoorF = parseInt(door1[0].slice(-2))+ parseInt(door1[0].slice(-2))
const AdoorF =door1 != undefined?(door2 != null & door3 != null?
(parseInt(door1[0].slice(-2))+ parseInt(door2[0].slice(-2))+parseInt(door3[0].slice(-2)))/3
: door2 != null ? (parseInt(door1[0].slice(-2))+ parseInt(door2[0].slice(-2)))/2
: door3 != null ? (parseInt(door1[0].slice(-2))+ parseInt(door3[0].slice(-2)))/2
: parseInt(door1[0].slice(-2))):""

const AdoorL = door1 != undefined? (door2 != null & door3 != null?
(parseInt(door1[1].slice(-2))+ parseInt(door2[1].slice(-2))+parseInt(door3[1].slice(-2)))/3
: door2 & door3==null ? (parseInt(door1[1].slice(-2))+ parseInt(door2[1].slice(-2)))/2
: door3 & door2==null ? (parseInt(door1[1].slice(-2))+ parseInt(door3[1].slice(-2)))/2
: parseInt(door1[1].slice(-2))):""

console.log("object12345",door1,door2,door3,AdoorF,AdoorL)

// console.log("object12345",door1,door2,door3,AdoorF,AdoorL)

  const [modal, setModal] = useState(false);

  const toggle = () => {
    props.toggle("annexures");
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Cases:", values);

    const user = new FormData();
    user.append("customer_id", values.customer_id);

    user.append("user_id", values.user_id);

    user.append("obeservation_remark", values.obeservation_remark);

    console.log("Data of cases:", user);
    props.onUpdateCasesData(data, user, toggle, setSubmitting);
    setSubmitting(true);
    // props.toggle("area");
    return;
  };
  return (
    <Card>
      <CardHeader className="bg-success text-white">
        <div className="">
          <i className="fa fa-home mr-1" />
          <strong>
            Summary And Observation Report Of Risk Analysis Studies For "
            {props.editcase?.type_of_room}"
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
        <h2>Observation Remarks</h2>
        {props.cases?.cases
          ?.filter((c) => c.id == param.id)
          .map((user) => {
            // console.log("object23",user.type_of_room)
            return (
              <Formik
                key={user.id}
                initialValues={{
                  obeservation_remark: 
                  user.obeservation_remark
                    ? 
                    user.obeservation_remark
                    : `For Temperature Range: ${user.min_operating_range}°C to ${user.max_operating_range}°C
1. During Door Open Test Cycle, Door is Open for  ${ Math.round(door1==null?"": door1[0])} mins (Excursion Period) and after retention, normal operation range recovered within ${ Math.round(door1==null?"": door1[1])} mins.

2.During Power Failure Test Cycle, Power is OFF for ${Math.round(power1==null?"": power1[0])} mins (Excursion Period) and after retention, normal operation range recovered within ${Math.round(power1==null?"": power1[1])} mins.
                    
For Humidity Range: ${user.min_operating_range1}%RH to ${user.max_operating_range1}%RH
1. During Door Open Test Cycle, Door is Open for  ${ Math.round(door1==null?"": door1[0])} mins (Excursion Period) and after retention, normal operation range recovered within ${ Math.round(door1==null?"": door1[1])} mins.
                                         
2.During Power Failure Test Cycle, Power is OFF for ${Math.round(power1==null?"": power1[0])} mins (Excursion Period) and after retention, normal operation range recovered within ${Math.round(power1==null?"": power1[1])} mins.`,
                    // obeservation_remark: user.obeservation_remark
                  //   ? user.obeservation_remark
                  //   : user.type_of_room == "Cool Room"
                  //   ? "1. During Door Open Test Cycle, when Door was Opened, Excursion was observed after 9 mins and when Power Supply was Switched ON, Normal Operation Range was recovered within 6 mins., \n\n 2.During Power Failure Test Cycle, when Power Supply was Switched OFF, Excursion was observed after 25 mins and when Power Supply was Switched ON, Normal Operation Range was recovered within 11 mins."
                  //   : user.type_of_room == "ViSi Cooler"
                  //   ? "1. During Door Open Test Cycles, when Door was Opened, Excursion was observed after 4 mins and when Power Supply was Switched ON, Normal Operation Range was recovered within 10 mins., \n\n 2. During Power Failure Test Cycle, when Power Supply was Switched OFF, Excursion was observed after 22 mins and when Power Supply was Switched ON, Normal Operation Range was recovered within 14 mins."
                  //   : "",
                  customer_id: user.customer_id,
                  user_id: user.user_id,
                }}
                onSubmit={handleSubmit}
              >
                {(formProps) => {
                  return (
                    <Form>
                      <Row className="form-group">
                        <Col md={12}>
                          <FormGroup>
                            <InputGroup>
                              {/* {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : ( */}
                              <Field
                                component={CustomInput}
                                type="textarea"
                                name="obeservation_remark"
                                id="obeservation_remark"
                                placeholder="Enter obeservation remark"
                                rows={10}
                                className={
                                  "form-control" +
                                  (formProps.errors.obeservation_remark &&
                                  formProps.touched.obeservation_remark
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              {/* )} */}
                              <ErrorMessage
                                name="obeservation_remark"
                                component="div"
                                className="invalid-feedback"
                              />
                            </InputGroup>
                          </FormGroup>
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
              </Formik>
            );
          })}
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    cases: state.cases,
    editcase: state.cases.editcase,
    cols: state.cols.cols,
    cycle: state.cycle,
    customer: state.customer.customer,
    rows: state.rows.rows,
    page: state.page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCasesDataPageDetail: (data) => dispatch(actions.getCasesDataPageDetail(data)),
    postCasesDataPageDetail: (data, user) =>dispatch(actions.postCasesDataPageDetail(data, user)),
    updatePageDetail: (data, user) =>dispatch(actions.updatePageDetail(data, user)),
    onUpdateCasesData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateCasesData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Risk);

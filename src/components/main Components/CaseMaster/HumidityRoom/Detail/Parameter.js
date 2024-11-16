/* eslint-disable eqeqeq */
import React from "react";
import { connect } from "react-redux";
/* eslint-disable eqeqeq */
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Label,
  InputGroup,
} from "reactstrap";

import { Formik, Form, Field } from "formik";
import CustomInput from "../../../../../views/custom/CustomInput";
import * as Yup from "yup";
import * as actions from "../../../../../redux/action";

import { useParams } from "react-router-dom";
import Loader2 from "../../../../loader/Loader2";

function Parameter(props) {
  const accessToken = `${props.login?.login?.token}`;
  const param = useParams();

  let data = {
    token: accessToken,
    id: param?.id,
  };

  const toggle = () => {};

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Cases:", values);
    setSubmitting(true);

  values.extras.pos2_2 = values.Pos2_2;
  values.extras.pos1_2 = values.Pos1_2;

    const user = new FormData();

    user.append("customer_id", values.customer_id);
    user.append("user_id", values.user_id);
    user.append("pos1", values.pos1);
    user.append("pos2", values.pos2);
    user.append("extras", JSON.stringify(values.extras));

    console.log("Data of cases:", user);
    props.onUpdateCasesData(data, user, toggle, setSubmitting);

    return;
  };

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
  
  let dataPara = {
    token: accessToken,
    id: param?.id,
    testId1: test?.filter((row) =>row.name == "CONTINUOUS OPERATION TEST CYCLE")[0]?.id ,
  };
  
  React.useEffect(() => {
  props.parameterGetData1(dataPara)
  props.parameterGetDataHumidity(dataPara)
  },[]);

  console.log("dataPara",dataPara,test,props.testType?.testType)



  const parameterData = props.test?.isLoading
    ? []
    : props.parameterData?.length > 0
    ? props.parameterData
    : [];
    
    
    const p =
    parameterData
    ?.filter(
      (c) => !c?.sensor?.toLowerCase().includes("AMB".trim().toLowerCase())
      )
      .map((d) => d.avg) ?? [];
      const Minimum = Math.min(...p);
      
      const Maximum = Math.max(...p);
      
      // const p1 =
      // props.parameter?.parameter1?.length > 0
      //   ? props?.parameter?.parameter1
      //       ?.filter(
      //         (c) =>
      //           !c?.sensor?.toLowerCase().includes("AMB".trim().toLowerCase())
      //       )
      //       ?.map((d) => d.avg)
      //       : [];
            
      // const pMax1 = Math.max(...p1);
      // const pMin1 = Math.min(...p1);

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
    
      const p2 =
      props.parameter?.parameterHumidity?.length > 0
        ? props?.parameter?.parameterHumidity
            ?.filter(
              (c) =>
                !c?.sensor?.toLowerCase().includes("AMB".trim().toLowerCase())
            )
            ?.map((d) => d.avg)
            : [];
            
      const pMax2 = Math.max(...p2);
      const pMin2 = Math.min(...p2);





      // console.log(parameterData,"dddddd",p,"iiiiiiiiii")
      return (
        <Card>
      <CardHeader className="bg-success text-white">
        <div className="">
          <i className="fa fa-home mr-1" />
          <strong>
            Summary And Observation Report Of Parameters Computed During Mapping
            (Temperature)
          </strong>
        </div>
      </CardHeader>

      <CardBody>
      <div className="m-3">
          {props.cases?.cases
            ?.filter((c) => c.id == param.id)
            .map((user) => {
              // console.log(user,"dddddd",p,"iiiiiiiiii")
              return (
                <Formik
                  key={user.id}
                  initialValues={{
                    customer_id: user.customer_id,
                    user_id: user.user_id,
                    pos1: user.pos1 ?? "",
                    pos2: user.pos2 ?? "",
                    extras:user.extras
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={Yup.object().shape({
                    // pos1: Yup.string().required("required"),
                  })}
                >
                  {(formProps) => {
                    return (
                      <Form>
                        <Row className="form-group">
                          <Col md={6}>
                            <Label for="pos1">Position 1</Label>
                            <InputGroup>
                              <Field
                                component={CustomInput}
                                type="text"
                                name="pos1"
                                id="pos1"
                                placeholder="Enter Position 1"
                                className={
                                  "form-control" +
                                  (formProps.errors.pos1 &&
                                  formProps.touched.pos1
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                            </InputGroup>
                          </Col>
                          <Col md={6}>
                            <Label for="pos2">Position 2</Label>
                            <InputGroup>
                              <Field
                                component={CustomInput}
                                type="text"
                                name="pos2"
                                id="pos2"
                                placeholder="Enter Position 2"
                                className={
                                  "form-control" +
                                  (formProps.errors.pos2 &&
                                  formProps.touched.pos2
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                            </InputGroup>
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
        </div>
      {/* one */}
      <CardBody>

      <h6>
          Cycle - I : Temperature Range: {props.editcase?.min_operating_range}°C
          to {props.editcase?.max_operating_range}°C{" "}
        </h6>
        {props.parameter?.isLoading1 ? (
          <Loader2 />
        ) : props.parameter.parameter1?.length > 0 ? (
          <div>

          <div className="text-center">
          <div className="d-flex test w-100">
            <span className="w-40 test para">Position</span>

            {props.parameter.parameter1?.map((par) => {
              return (
                <span className="w-20 test parameter" key={par.id}>
                  {par.sensor}
                </span>
              );
            })}
          </div>
          <div className="d-flex w-100">
            <div className="w-40 f-8 text-center  d-flex flex-column temperature font-weight-bold">
              <span className="test w-100 h-26p">AVERAGE MINIMUM TEMPERATURE °C</span>
              <span className="test w-100 h-26p">AVERAGE MAXIMUM TEMPERATURE °C</span>

              <span className="test w-100 h-26p">
                AVERAGE TEMPERATURE °C{" "}
              </span>
              <span className="test w-100 h-26p">
                (MAX-MIN)TEMPERATURE °C{" "}
              </span>
              <span className="test w-100 h-26p">STANDARD DEVIATION °C </span>
            </div>
            {props.parameter.parameter1?.map((par, id, array) => {
              return (
                <div className="d-flex flex-column w-20" key={par.id}>
                  <span className="w-100 test">{par.min.toFixed(2)}</span>
                  <span className="w-100 test">{par.max.toFixed(2)}</span>
                  {par.avg == pMax1 ? (
                    <span
                    className="w-100 test text-white"
                    style={{ backgroundColor: "red" }}
                    >
                      {par.avg.toFixed(2)}
                    </span>
                  ) : par.avg == pMin1 ? (
                    <span
                    className="w-100 test text-white"
                    style={{ backgroundColor: "green" }}
                    >
                      {par.avg.toFixed(2)}
                    </span>
                  ) : (
                    <span className="w-100 test">{par.avg.toFixed(2)}</span>
                    )}
                    <span className="w-100 test">{(par.max - par.min).toFixed(2)}</span>
                  <span className="w-100 test">{par.std.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        <br/>
        </div>
       
        </div>
        ) : (
          <span
            className="text-red text-center"
            style={{ color: "red", fontWeight: "bold", textAlign: "center" }}
          >
            Data Not Found Please Upload Raw Data
          </span>
        )}

<div className="d-flex mt-5 justify-content-end font-weight-bold text-white f-12 text-center">
          <div
            style={{
              backgroundColor: "red",
              padding: "10px",
              marginRight: "30px",
            }}
          >
            <p className="p-0 m-0">Average Maximum Temperature Point</p>
            <p className="p-0 m-0">HOT SPOT</p>
            <p className="p-0 m-0">HOT SPOT ({props.editcase?.pos1})</p>
          </div>
          <div style={{ backgroundColor: "green", padding: "10px" }}>
            <p className="p-0 m-0">Average Minimum Temperature Point</p>
            <p className="p-0 m-0">COLD SPOT</p>
            <p className="p-0 m-0">COLD SPOT ({props.editcase?.pos2})</p>
          </div>
        </div>

      </CardBody>


      <div className="m-3">
          {props.cases?.cases
            ?.filter((c) => c.id == param.id)
            .map((user) => {
              // console.log(user,"dddddd",p,"iiiiiiiiii")
              return (
                <Formik
                  key={user.id}
                  initialValues={{
                    customer_id: user.customer_id,
                    user_id: user.user_id,
                    pos1_2: user.extras.pos1_2 ?? "",
                    pos2_2: user.extras.pos2_2 ?? "",
                    extras:user.extras
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={Yup.object().shape({
                    // pos1: Yup.string().required("required"),
                  })}
                >
                  {(formProps) => {
                    return (
                      <Form>
                        <Row className="form-group">
                          <Col md={6}>
                            <Label for="pos1_2">Position 1</Label>
                            <InputGroup>
                              <Field
                                component={CustomInput}
                                type="text"
                                name="pos1_2"
                                id="pos1_2"
                                placeholder="Enter Position 1"
                                className={
                                  "form-control" +
                                  (formProps.errors.pos1_2 &&
                                  formProps.touched.pos1_2
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                            </InputGroup>
                          </Col>
                          <Col md={6}>
                            <Label for="pos2_2">Position 2</Label>
                            <InputGroup>
                              <Field
                                component={CustomInput}
                                type="text"
                                name="pos2_2"
                                id="pos2_2"
                                placeholder="Enter Position 2"
                                className={
                                  "form-control" +
                                  (formProps.errors.pos2_2 &&
                                  formProps.touched.pos2_2
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                            </InputGroup>
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
        </div>
        <h6>
          Cycle - II : Humidity Range: {props.editcase?.min_operating_range1}
          %RH to {props.editcase?.max_operating_range1}%RH{" "}
        </h6>
        {props.parameter?.isLoadingHumidity ? (
          
          <Loader2 />
          ) : props.parameter.parameterHumidity?.length > 0 ? (

              <div>

            <div className="text-center">
            <div className="d-flex test w-100">
              <span className="w-40 test para">Position</span>

              {props.parameter.parameterHumidity?.map((par) => {
              return (
                <span className="w-20 test parameter" key={par.id}>
                  {par.sensor}
                </span>
              );
            })}
          </div>
          <div className="d-flex w-100">
            <div className="w-40 f-8 text-center  d-flex flex-column temperature font-weight-bold">
              <span className="test w-100 h-26p">AVERAGE MINIMUM TEMPERATURE °C</span>
              <span className="test w-100 h-26p">AVERAGE MAXIMUM TEMPERATURE °C</span>

              <span className="test w-100 h-26p">
                AVERAGE TEMPERATURE °C{" "}
              </span>
              <span className="test w-100 h-26p">
                (MAX-MIN)TEMPERATURE °C{" "}
              </span>
              <span className="test w-100 h-26p">STANDARD DEVIATION °C </span>
            </div>
            {props.parameter.parameterHumidity?.map((par, id, array) => {
              return (
                <div className="d-flex flex-column w-20" key={par.id}>
                  <span className="w-100 test">{par.min.toFixed(2)}</span>
                  <span className="w-100 test">{par.max.toFixed(2)}</span>
                  {par.avg == pMax2 ? (
                    <span
                    className="w-100 test text-white"
                    style={{ backgroundColor: "red" }}
                    >
                      {par.avg.toFixed(2)}
                    </span>
                  ) : par.avg == pMin2 ? (
                    <span
                    className="w-100 test text-white"
                    style={{ backgroundColor: "green" }}
                    >
                      {par.avg.toFixed(2)}
                    </span>
                  ) : (
                    <span className="w-100 test">{par.avg.toFixed(2)}</span>
                    )}
                    <span className="w-100 test">{(par.max - par.min).toFixed(2)}</span>
                  <span className="w-100 test">{par.std.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
          <br/>
          </div>
            {/* <div style={props.parameter.parameter1?.slice(15,30).length==0?{"display":"none"}:{}} className="text-center">
            <div className="d-flex test w-100">
              <span className="w-40 test para">Position</span>

              {props.parameter.parameter1?.slice(15,30).map((par) => {
                // console.log(props.parameter.parameter1?.slice(30,45).length,props.parameter.parameter1?.slice(0,15).length,"parpar",par)
                return (
                  <span className="w-20 test parameter" key={par.id}>
                    {par.sensor}
                  </span>
                );
              })}
            </div>
            <div className="d-flex w-100">
              <div className="w-40 f-8 text-center  d-flex flex-column temperature font-weight-bold">
                <span className="test w-100 h-26p">AVERAGE MINIMUM TEMPERATURE °C</span>
                <span className="test w-100 h-26p">AVERAGE MAXIMUM TEMPERATURE °C</span>

                <span className="test w-100 h-26p">
                  AVERAGE TEMPERATURE °C{" "}
                </span>
                <span className="test w-100 h-26p">
                  (MAX-MIN)TEMPERATURE °C{" "}
                </span>
                <span className="test w-100 h-26p">STANDARD DEVIATION °C </span>
              </div>
              {props.parameter.parameter1?.slice(15,30).map((par, id, array) => {
                return (
                  <div className="d-flex flex-column w-20" key={par.id}>
                    <span className="w-100 test">{par.min.toFixed(2)}</span>
                    <span className="w-100 test">{par.max.toFixed(2)}</span>
                    {par.avg == pMax1 ? (
                      <span
                      className="w-100 test text-white"
                      style={{ backgroundColor: "red" }}
                      >
                        {par.avg.toFixed(2)}
                      </span>
                    ) : par.avg == pMin1 ? (
                      <span
                      className="w-100 test text-white"
                      style={{ backgroundColor: "green" }}
                      >
                        {par.avg.toFixed(2)}
                      </span>
                    ) : (
                      <span className="w-100 test">{par.avg.toFixed(2)}</span>
                      )}
                      <span className="w-100 test">{(par.max - par.min).toFixed(2)}</span>
                    <span className="w-100 test">{par.std.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          <br/>
          </div> */}
            {/* <div style={props.parameter.parameter1?.slice(30,45).length==0?{"display":"none"}:{}} className="text-center">
            <div className="d-flex test w-100">
              <span className="w-40 test para">Position</span>

              {props.parameter.parameter1?.slice(30,45).map((par) => {
                // console.log(props.parameter.parameter1?.slice(30,45).length,props.parameter.parameter1?.slice(0,15).length,"parpar",par)
                return (
                  <span className="w-20 test parameter" key={par.id}>
                    {par.sensor}
                  </span>
                );
              })}
            </div>
            <div className="d-flex w-100">
              <div className="w-40 f-8 text-center  d-flex flex-column temperature font-weight-bold">
                <span className="test w-100 h-26p">AVERAGE MINIMUM TEMPERATURE °C</span>
                <span className="test w-100 h-26p">AVERAGE MAXIMUM TEMPERATURE °C</span>

                <span className="test w-100 h-26p">
                  AVERAGE TEMPERATURE °C{" "}
                </span>
                <span className="test w-100 h-26p">
                  (MAX-MIN)TEMPERATURE °C{" "}
                </span>
                <span className="test w-100 h-26p">STANDARD DEVIATION °C </span>
              </div>
              {props.parameter.parameter1?.slice(30,45).map((par, id, array) => {
                return (
                  <div className="d-flex flex-column w-20" key={par.id}>
                    <span className="w-100 test">{par.min.toFixed(2)}</span>
                    <span className="w-100 test">{par.max.toFixed(2)}</span>
                    {par.avg == pMax1 ? (
                      <span
                      className="w-100 test text-white"
                      style={{ backgroundColor: "red" }}
                      >
                        {par.avg.toFixed(2)}
                      </span>
                    ) : par.avg == pMin1 ? (
                      <span
                      className="w-100 test text-white"
                      style={{ backgroundColor: "green" }}
                      >
                        {par.avg.toFixed(2)}
                      </span>
                    ) : (
                      <span className="w-100 test">{par.avg.toFixed(2)}</span>
                      )}
                      <span className="w-100 test">{(par.max - par.min).toFixed(2)}</span>
                    <span className="w-100 test">{par.std.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          <br/>
          </div> */}
            {/* <div style={props.parameter.parameter1?.slice(45,60).length==0?{"display":"none"}:{}} className="text-center">
            <div className="d-flex test w-100">
              <span className="w-40 test para">Position</span>

              {props.parameter.parameter1?.slice(45,60).map((par) => {
                return (
                  <span className="w-20 test parameter" key={par.id}>
                    {par.sensor}
                  </span>
                );
              })}
            </div>
            <div className="d-flex w-100">
              <div className="w-40 f-8 text-center  d-flex flex-column temperature font-weight-bold">
                <span className="test w-100 h-26p">AVERAGE MINIMUM TEMPERATURE °C</span>
                <span className="test w-100 h-26p">AVERAGE MAXIMUM TEMPERATURE °C</span>

                <span className="test w-100 h-26p">
                  AVERAGE TEMPERATURE °C{" "}
                </span>
                <span className="test w-100 h-26p">
                  (MAX-MIN)TEMPERATURE °C{" "}
                </span>
                <span className="test w-100 h-26p">STANDARD DEVIATION °C </span>
              </div>
              {props.parameter.parameter1?.slice(45,60).map((par, id, array) => {
                return (
                  <div className="d-flex flex-column w-20" key={par.id}>
                    <span className="w-100 test">{par.min.toFixed(2)}</span>
                    <span className="w-100 test">{par.max.toFixed(2)}</span>
                    {par.avg == pMax1 ? (
                      <span
                      className="w-100 test text-white"
                      style={{ backgroundColor: "red" }}
                      >
                        {par.avg.toFixed(2)}
                      </span>
                    ) : par.avg == pMin1 ? (
                      <span
                      className="w-100 test text-white"
                      style={{ backgroundColor: "green" }}
                      >
                        {par.avg.toFixed(2)}
                      </span>
                    ) : (
                      <span className="w-100 test">{par.avg.toFixed(2)}</span>
                      )}
                      <span className="w-100 test">{(par.max - par.min).toFixed(2)}</span>
                    <span className="w-100 test">{par.std.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          <br/>
          </div> */}
            {/* <div style={props.parameter.parameter1?.slice(60,75).length==0?{"display":"none"}:{}} className="text-center">
            <div className="d-flex test w-100">
              <span className="w-40 test para">Position</span>

              {props.parameter.parameter1?.slice(60,75).map((par) => {
                return (
                  <span className="w-20 test parameter" key={par.id}>
                    {par.sensor}
                  </span>
                );
              })}
            </div>
            <div className="d-flex w-100">
              <div className="w-40 f-8 text-center  d-flex flex-column temperature font-weight-bold">
                <span className="test w-100 h-26p">AVERAGE MINIMUM TEMPERATURE °C</span>
                <span className="test w-100 h-26p">AVERAGE MAXIMUM TEMPERATURE °C</span>

                <span className="test w-100 h-26p">
                  AVERAGE TEMPERATURE °C{" "}
                </span>
                <span className="test w-100 h-26p">
                  (MAX-MIN)TEMPERATURE °C{" "}
                </span>
                <span className="test w-100 h-26p">STANDARD DEVIATION °C </span>
              </div>
              {props.parameter.parameter1?.slice(60,75).map((par, id, array) => {
                return (
                  <div className="d-flex flex-column w-20" key={par.id}>
                    <span className="w-100 test">{par.min.toFixed(2)}</span>
                    <span className="w-100 test">{par.max.toFixed(2)}</span>
                    {par.avg == pMax1 ? (
                      <span
                      className="w-100 test text-white"
                      style={{ backgroundColor: "red" }}
                      >
                        {par.avg.toFixed(2)}
                      </span>
                    ) : par.avg == pMin1 ? (
                      <span
                      className="w-100 test text-white"
                      style={{ backgroundColor: "green" }}
                      >
                        {par.avg.toFixed(2)}
                      </span>
                    ) : (
                      <span className="w-100 test">{par.avg.toFixed(2)}</span>
                      )}
                      <span className="w-100 test">{(par.max - par.min).toFixed(2)}</span>
                    <span className="w-100 test">{par.std.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          <br/>
          </div> */}
            {/* <div style={props.parameter.parameter1?.slice(75,90).length==0?{"display":"none"}:{}} className="text-center">
            <div className="d-flex test w-100">
              <span className="w-40 test para">Position</span>

              {props.parameter.parameter1?.slice(75,90).map((par) => {
                return (
                  <span className="w-20 test parameter" key={par.id}>
                    {par.sensor}
                  </span>
                );
              })}
            </div>
            <div className="d-flex w-100">
              <div className="w-40 f-8 text-center  d-flex flex-column temperature font-weight-bold">
                <span className="test w-100 h-26p">AVERAGE MINIMUM TEMPERATURE °C</span>
                <span className="test w-100 h-26p">AVERAGE MAXIMUM TEMPERATURE °C</span>

                <span className="test w-100 h-26p">
                  AVERAGE TEMPERATURE °C{" "}
                </span>
                <span className="test w-100 h-26p">
                  (MAX-MIN)TEMPERATURE °C{" "}
                </span>
                <span className="test w-100 h-26p">STANDARD DEVIATION °C </span>
              </div>
              {props.parameter.parameter1?.slice(75,90).map((par, id, array) => {
                return (
                  <div className="d-flex flex-column w-20" key={par.id}>
                    <span className="w-100 test">{par.min.toFixed(2)}</span>
                    <span className="w-100 test">{par.max.toFixed(2)}</span>
                    {par.avg == pMax1 ? (
                      <span
                      className="w-100 test text-white"
                      style={{ backgroundColor: "red" }}
                      >
                        {par.avg.toFixed(2)}
                      </span>
                    ) : par.avg == pMin1 ? (
                      <span
                      className="w-100 test text-white"
                      style={{ backgroundColor: "green" }}
                      >
                        {par.avg.toFixed(2)}
                      </span>
                    ) : (
                      <span className="w-100 test">{par.avg.toFixed(2)}</span>
                      )}
                      <span className="w-100 test">{(par.max - par.min).toFixed(2)}</span>
                    <span className="w-100 test">{par.std.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          <br/>
          </div> */}
            {/* <div style={props.parameter.parameter1?.slice(90,105).length==0?{"display":"none"}:{}} className="text-center">
            <div className="d-flex test w-100">
              <span className="w-40 test para">Position</span>

              {props.parameter.parameter1?.slice(90,105).map((par) => {
                return (
                  <span className="w-20 test parameter" key={par.id}>
                    {par.sensor}
                  </span>
                );
              })}
            </div>
            <div className="d-flex w-100">
              <div className="w-40 f-8 text-center  d-flex flex-column temperature font-weight-bold">
                <span className="test w-100 h-26p">AVERAGE MINIMUM TEMPERATURE °C</span>
                <span className="test w-100 h-26p">AVERAGE MAXIMUM TEMPERATURE °C</span>

                <span className="test w-100 h-26p">
                  AVERAGE TEMPERATURE °C{" "}
                </span>
                <span className="test w-100 h-26p">
                  (MAX-MIN)TEMPERATURE °C{" "}
                </span>
                <span className="test w-100 h-26p">STANDARD DEVIATION °C </span>
              </div>
              {props.parameter.parameter1?.slice(90,105).map((par, id, array) => {
                return (
                  <div className="d-flex flex-column w-20" key={par.id}>
                    <span className="w-100 test">{par.min.toFixed(2)}</span>
                    <span className="w-100 test">{par.max.toFixed(2)}</span>
                    {par.avg == pMax1 ? (
                      <span
                      className="w-100 test text-white"
                      style={{ backgroundColor: "red" }}
                      >
                        {par.avg.toFixed(2)}
                      </span>
                    ) : par.avg == pMin1 ? (
                      <span
                      className="w-100 test text-white"
                      style={{ backgroundColor: "green" }}
                      >
                        {par.avg.toFixed(2)}
                      </span>
                    ) : (
                      <span className="w-100 test">{par.avg.toFixed(2)}</span>
                      )}
                      <span className="w-100 test">{(par.max - par.min).toFixed(2)}</span>
                    <span className="w-100 test">{par.std.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          <br/>
          </div> */}
          </div>
        ) : (
          <span
            className="text-red text-center"
            style={{ color: "red", fontWeight: "bold", textAlign: "center" }}
          >
            Data Not Found Please Upload Raw Data
          </span>
        )}
        {/* two */}
       

        <div className="d-flex mt-5  justify-content-end font-weight-bold text-white f-12">
          <div
            style={{
              backgroundColor: "red",
              padding: "10px",
              marginRight: "30px",
              fontSize: "12px",
            }}
          >
            <p>Average Maximum Temperature Point</p>
            <p>HOT SPOT ({props.editcase?.extras?.pos1_2})</p>
          </div>
          <div
            style={{
              backgroundColor: "green",
              padding: "10px",
              fontSize: "12px",
            }}
          >
            <p>Average Minimum Temperature Point</p>
            <p>COLD SPOT ({props.editcase?.extras?.pos2_2})</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    cases: state.cases,
    parameterData: state.tests.parameterData,
    tests: state.tests,
    editcase: state.cases.editcase,
    parameter: state.parameter,
    testType: state.testType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCustomerGetData: (data) => dispatch(actions.customerGetData(data)),
    onRowsGetData: (data) => dispatch(actions.rowsGetData(data)),
    onColsGetData: (data) => dispatch(actions.colsGetData(data)),
    onCasesGetData: (data) => dispatch(actions.casesGetData(data)),
    onDeleteCases: (data, id) => dispatch(actions.deleteCases(data, id)),
    onPostCasesData: (data, user, toggle) =>
      dispatch(actions.postCasesData(data, user, toggle)),
    onUpdateCasesData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateCasesData(data, user, toggle, setSubmitting)),
    casesEditGetData: (data) => dispatch(actions.casesEditGetData(data)),
    parameterGetData1: (dataPara) => dispatch(actions.parameterGetData1(dataPara)),
    parameterGetDataHumidity: (dataPara) => dispatch(actions.parameterGetDataHumidity(dataPara)),

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Parameter);

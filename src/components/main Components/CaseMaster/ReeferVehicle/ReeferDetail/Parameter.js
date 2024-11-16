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

  let data = {
    token: accessToken,
    id: param?.id,
    testId1: test?.filter((row) =>row.name == "CONTINUOUS OPERATION TEST CYCLE-I")[0]?.id,
    testId2: test?.filter((row) =>row.name == "CONTINUOUS OPERATION TEST CYCLE-II")[0]?.id,
    testId3: test?.filter((row) =>row.name == "CONTINUOUS OPERATION TEST CYCLE-III")[0]?.id,
  };
  
  React.useEffect(() => {
  props.parameterGetData1(data)
  props.parameterGetData2(data)
  props.parameterGetData3(data)

  },[]);


  // let data = {
  //   token: accessToken,
  //   id: param?.id,
  // };

  const toggle = () => {};

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Cases:", values);
    setSubmitting(true);

    const user = new FormData();

    user.append("customer_id", values.customer_id);
    user.append("user_id", values.user_id);
    user.append("pos1", values.pos1);
    user.append("pos2", values.pos2);
    // user.append("extras", JSON.stringify(values.extras));


    console.log("Data of cases:", user);
    props.onUpdateCasesData(data, user, toggle, setSubmitting);

    return;
  };

  const handleSubmit2 = (values, { setSubmitting }) => {
    console.log("values in Cases:", values);
    values.extras.pos2_2 = values.pos2_2;
    values.extras.pos1_2 = values.pos1_2;
  
    setSubmitting(true);

    const user = new FormData();

    user.append("customer_id", values.customer_id);
    user.append("user_id", values.user_id);
    user.append("extras", JSON.stringify(values.extras));


    console.log("Data of cases:", user);
    props.onUpdateCasesData(data, user, toggle, setSubmitting);

    return;
  };
  const handleSubmit3 = (values, { setSubmitting }) => {
    console.log("values in Cases:", values);
    values.extras.pos2_3 = values.pos2_3;
    values.extras.pos1_3 = values.pos1_3;
  
    setSubmitting(true);

    const user = new FormData();

    user.append("customer_id", values.customer_id);
    user.append("user_id", values.user_id);
    user.append("extras", JSON.stringify(values.extras));


    console.log("Data of cases:", user);
    props.onUpdateCasesData(data, user, toggle, setSubmitting);

    return;
  };

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
  props.parameter?.parameter2?.length > 0
    ? props?.parameter?.parameter2
        ?.filter(
          (c) =>
            !c?.sensor?.toLowerCase().includes("AMB".trim().toLowerCase())
        )
        ?.map((d) => d.avg)
        : [];
        
  const pMax2 = Math.max(...p2);
  const pMin2 = Math.min(...p2);

  const p3 =
  props.parameter?.parameter3?.length > 0
    ? props?.parameter?.parameter3
        ?.filter(
          (c) =>
            !c?.sensor?.toLowerCase().includes("AMB".trim().toLowerCase())
        )
        ?.map((d) => d.avg)
        : [];
        
  const pMax3 = Math.max(...p3);
  const pMin3 = Math.min(...p3);
      
      // console.log(parameterData,"dddddd",p,"iiiiiiiiii",Maximum,Minimum)
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
        <h6>
          Cycle - I : Temperature Range: {props.editcase?.min_operating_range}
          °C to {props.editcase?.max_operating_range}°C{" "}
        </h6>
        {props.parameter?.isLoading2 ? (
          <Loader2 />
        ) : props.parameter?.parameter1?.length > 0 ? (
          <div>

          <div className="text-center">
          <div className="d-flex test w-100">
            <span className="w-40 test para">Position</span>

            {props.parameter?.parameter1?.map((par) => {
              // console.log(parameterData?.slice(30,45).length,parameterData?.slice(0,15).length,"parpar",par)
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
            <p className="p-0 m-0">HOT SPOT ({props.editcase?.pos1})</p>
          </div>
          <div style={{ backgroundColor: "green", padding: "10px" }}>
            <p className="p-0 m-0">Average Minimum Temperature Point</p>
            <p className="p-0 m-0">COLD SPOT ({props.editcase?.pos2})</p>
          </div>
        </div>
      </CardBody>
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
                    pos1_2: user.extras.pos1_2 ?? "",
                    pos2_2: user.extras.pos2_2 ?? "",
                    extras:user.extras
                  }}
                  onSubmit={handleSubmit2}
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
          Cycle - II : Temperature Range: {props.editcase?.min_operating_range1}
          °C to {props.editcase?.max_operating_range1}°C{" "}
        </h6>
        {props.parameter?.isLoading2 ? (
          <Loader2 />
        ) : props.parameter.parameter2?.length > 0 ? (
          <div>

          <div className="text-center">
          <div className="d-flex test w-100">
            <span className="w-40 test para">Position</span>

            {props.parameter.parameter2?.map((par) => {
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
            {props.parameter.parameter2?.map((par, id, array) => {
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
              fontSize: "12px",
            }}
          >
            <p className="p-0 m-0">Average Maximum Temperature Point</p>
            <p className="p-0 m-0">HOT SPOT ({props.editcase?.extras?.pos1_2})</p>
          </div>
          <div
            style={{
              backgroundColor: "green",
              padding: "10px",
              fontSize: "12px",
            }}
          >
            <p className="p-0 m-0">Average Minimum Temperature Point</p>
            <p className="p-0 m-0">COLD SPOT ({props.editcase?.extras?.pos2_2})</p>
          </div>
        </div>
      </CardBody>
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
                    pos1_3: user.extras.pos1_3 ?? "",
                    pos2_3: user.extras.pos2_3 ?? "",
                    extras:user.extras
                  }}
                  onSubmit={handleSubmit3}
                  validationSchema={Yup.object().shape({
                    // pos1: Yup.string().required("required"),
                  })}
                >
                  {(formProps) => {
                    return (
                      <Form>
                        <Row className="form-group">
                          <Col md={6}>
                            <Label for="pos1_3">Position 1</Label>
                            <InputGroup>
                              <Field
                                component={CustomInput}
                                type="text"
                                name="pos1_3"
                                id="pos1_3"
                                placeholder="Enter Position 1"
                                className={
                                  "form-control" +
                                  (formProps.errors.pos1_3 &&
                                  formProps.touched.pos1_3
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                            </InputGroup>
                          </Col>
                          <Col md={6}>
                            <Label for="pos2_3">Position 2</Label>
                            <InputGroup>
                              <Field
                                component={CustomInput}
                                type="text"
                                name="pos2_3"
                                id="pos2_3"
                                placeholder="Enter Position 2"
                                className={
                                  "form-control" +
                                  (formProps.errors.pos2_3 &&
                                  formProps.touched.pos2_3
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
          Cycle - III : Temperature Range: {props.editcase?.min_operating_range2}
          °C to {props.editcase?.max_operating_range2}°C{" "}
        </h6>
        {props.parameter?.isLoading3 ? (
          <Loader2 />
        ) : props.parameter.parameter3?.length > 0 ? (
          <div>

          <div className="text-center">
          <div className="d-flex test w-100">
            <span className="w-40 test para">Position</span>

            {props.parameter.parameter3?.map((par) => {
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
         
        {props.parameter.parameter3?.map((par, id, array) => {
              return (
                <div className="d-flex flex-column w-20" key={par.id}>
                  <span className="w-100 test">{par.min.toFixed(2)}</span>
                  <span className="w-100 test">{par.max.toFixed(2)}</span>
                  {par.avg == pMax3 ? (
                    <span
                    className="w-100 test text-white"
                    style={{ backgroundColor: "red" }}
                    >
                      {par.avg.toFixed(2)}
                    </span>
                  ) : par.avg == pMin3 ? (
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
              fontSize: "12px",
            }}
          >
            <p className="p-0 m-0">Average Maximum Temperature Point</p>
            <p className="p-0 m-0">HOT SPOT ({props.editcase?.extras?.pos1_3})</p>
          </div>
          <div
            style={{
              backgroundColor: "green",
              padding: "10px",
              fontSize: "12px",
            }}
          >
            <p className="p-0 m-0">Average Minimum Temperature Point</p>
            <p className="p-0 m-0">COLD SPOT ({props.editcase?.extras?.pos2_3})</p>
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
    testType: state.testType,
    parameter: state.parameter,
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

    parameterGetData1: (data) => dispatch(actions.parameterGetData1(data)),
    parameterGetData2: (data) => dispatch(actions.parameterGetData2(data)),
    parameterGetData3: (data) => dispatch(actions.parameterGetData3(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Parameter);

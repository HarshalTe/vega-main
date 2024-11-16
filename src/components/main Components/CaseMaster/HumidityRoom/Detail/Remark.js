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
import ON_TOGGLE5 from "../../../../../redux/action/ActionType5"
import Loader2 from "../../../../loader/Loader2"
import { useDispatch } from "react-redux";

import { useParams } from "react-router-dom";

function Remark(props) {

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
    
    const [checked, setChecked] = React.useState(idPage[0]?.remark==1?false:true);
    const handleChange = (event) => {
      setChecked(event.target.checked);
      // dispatch(ON_TOGGLE2(checked))
      console.log(checked,"checked111222",userIdPage,event.target.checked)
      let user={
        "id": userIdPage,
      "remark": event.target.checked==false? 1 : 0,
      }
      props.updatePageDetail(data,user)
    }

  // const [checked, setChecked] = React.useState(false);
  // console.log(checked,"checked")
  
  // const handleChange = (event) => {
  //   dispatch(ON_TOGGLE5(checked))
  //   setChecked(event.target.checked);
  // }
  const dispatch = useDispatch();

  console.log("parm", param);
  const [modal, setModal] = useState(false);

  const toggle = () => {
    props.toggle("mean");
  };

  const parameterData = props.test?.isLoading
    ? []
    : props.parameterData?.length > 0
    ? props.parameterData
    : [];

    // const parameterData = props.test?.isLoading
    // ? []
    // : props.parameterData?.length > 0
    // ? props.parameterData
    // : [];
  
    const p2 =
      parameterData
      ?.filter(
        (c) => !c?.sensor?.toLowerCase().includes("AMB".trim().toLowerCase())
        )
        .map((d) => d) ?? [];
        const Minimum2 = Math.min(...p2);
        
        const Maximum2 = Math.max(...p2);

  // const [maxPoint, setMaxPoint] = useState("");

  const p = p2?.map((d) => d.avg) ?? [];
  const Minimum = Math.min(...p);

  const Maximum = Math.max(...p);

  const maxPoint = 
  p2?.filter((par) => par.avg == Maximum)
    .map((par) => {
      return par.sensor;
    });

  const minPoint = p2?.filter((par) => par.avg == Minimum)
    .map((par) => {
      return par.sensor;
    });
    const pH =
    props.parameter?.parameter1?.length > 0
      ? props?.parameter?.parameter1
          ?.filter(
            (c) =>
              !c?.sensor?.toLowerCase().includes("AMB".trim().toLowerCase())
          )
          ?.map((d) => d.avg)
          : [];
    const pMax2 = Math.max(...pH);
    const pMin2 = Math.min(...pH);
    const pMax2Point =
  props.parameter?.parameterHumidity?.length > 0
    ? props.parameter?.parameterHumidity
        ?.filter((par) => par.avg == pMax2)
        .map((par) => {
          return par.sensor;
        })
    : "";
  const pMin2Point =
  props.parameter?.parameterHumidity?.length > 0
    ? props.parameter?.parameterHumidity
        ?.filter((par) => par.avg == pMin2)
        .map((par) => {
          return par.sensor;
        })
    : "";

    console.log("pMin2Point",pMin2Point,pMax2Point,maxPoint,minPoint)

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Cases:", values);

    const user = new FormData();
    user.append("customer_id", values.customer_id);

    user.append("user_id", values.user_id);

    user.append("concluding_remark", values.concluding_remark);
    user.append("conclusion", values.conclusion);

    console.log("Data of cases:", user);
    props.onUpdateCasesData(data, user, toggle, setSubmitting);
    setSubmitting(true);
    // props.toggle("area");
    return;
  };

  console.log("object111",`1.	Point  ${maxPoint.length}   (Average Temperature: ${Maximum.toFixed(2)} °C)  shown in Red color has registered MAXIMUM TEMPERATURE in`,`Point ${minPoint} (Average Temperature: ${Minimum.toFixed(2)})`)

  console.log("maxPoint",props);

  return (
    <Card>
      <CardHeader className="bg-success text-white">
        <div className="">
          <i className="fa fa-home mr-1" />
          <strong>Observation And Concluding Remarks</strong>
        </div>
        Show
            <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
        />
        Hide
      </CardHeader>
      {minPoint.length == 0 ? (
                                    <Loader2 />
                                    ) : (  
        
      <CardBody>
        {props.cases?.cases
          ?.filter((c) => c.id == param.id)
          .map((user) => {
            return (
              <Formik
                key={user.id}
                initialValues={{
                  concluding_remark:
                   user.concluding_remark
                    ? user.concluding_remark
                    : 
                    `For Temperature Range: ${
                      user.min_operating_range
                    } °C to ${
                      user.max_operating_range
                    }  °C
1. Point ${maxPoint} (Average Maximum Temperature: ${Maximum.toFixed(
                        2
                      )}°C) shown in Red color has registered MAXIMUM TEMPERATURE in ${
                        props.editcase?.type_of_cycle == "(PQ)"
                          ? "Loaded"
                          : "Empty"
                      } condition. So a daily temperature monitoring instrument is suggested to be placed at the location of ${maxPoint}. When only maximum limit needs to be controlled then treat point ${maxPoint} as a HOT SPOT in ${
                        props.editcase?.type_of_cycle == "(PQ)"
                          ? "Loaded"
                          : "Empty"
                      } condition.
                      
2. Point ${minPoint} (Average Minimum Temperature: ${Minimum.toFixed(
                        2
                      )}°C) shown in Green color has registered MINIMUM TEMPERATURE in ${
                        props.editcase?.type_of_cycle == "(PQ)"
                          ? "Loaded"
                          : "Empty"
                          
                      } condition. So a daily temperature monitoring instrument is suggested to be placed at the location of ${minPoint}. When only minimum limit needs to be controlled then treat point ${minPoint} as a COLD SPOT in ${
                        props.editcase?.type_of_cycle == "(PQ)"
                          ? "Loaded"
                          : "Empty"
                      } condition.\n\n  For Temperature Range: ${
                        user.min_operating_range1
                      } °C to ${
                        user.max_operating_range1
                      } °C \n 1. Point ${pMax2Point}	(Average Maximum Temperature: ${pMax2.toFixed(
                        2
                      )}°C)	shown in Red color has registered MAXIMUM TEMPERATURE in ${
                        props.editcase?.type_of_cycle == "(PQ)"
                          ? "Loaded"
                          : "Empty"
                      } condition.So a daily temperature monitoring instrument is suggested to be placed at the location of ${pMax2Point}. When only maximum limit needs to be controlled then treat point ${pMax2Point} as a HOT SPOT in ${
                        props.editcase?.type_of_cycle == "(PQ)"
                          ? "Loaded"
                          : "Empty"
                        } condition.\n\n 2. Point ${pMin2Point} (Average Minimum Temperature: ${pMin2.toFixed(
                        2
                      )}°C)	shown in Green color has registered MINIMUM TEMPERATURE in ${
                        props.editcase?.type_of_cycle == "(PQ)"
                        ? "Loaded"
                          : "Empty"
                      } condition. So a daily temperature monitoring instrument is suggested to be placed at the location of ${pMin2Point}. When only minimum limit needs to be controlled then treat point ${pMin2Point} as a COLD SPOT in ${
                        props.editcase?.type_of_cycle == "(PQ)"
                          ? "Loaded"
                          : "Empty"
                      } condition.`,
                  conclusion:
                   user.conclusion
                    ? user.conclusion
                    :
                     `The above given ${
                        props.editcase?.type_of_room
                      } is monitored for temperature uniformity for ${props?.cases?.editcase?.cycle} in ${
                        props.editcase?.type_of_cycle == "(PQ)"
                          ? "Loaded"
                          : "Empty"
                      } condition and results found are as per the acceptance criteria. So the ${
                        props.editcase?.type_of_room
                      } is in compliance with the defined criteria and qualified for its further use.`,
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
                          <h3 style={{ textDecoration: "underline" }}>
                            Observation and Concluding Remarks
                          </h3>

                          <FormGroup>
                            <InputGroup>
                              {/* {props.cases?.isLoading ? (
                            <Loader2 />
                          ) : ( */}
                              <Field
                                component={CustomInput}
                                type="textarea"
                                name="concluding_remark"
                                id="concluding_remark"
                                placeholder="Enter obeservation and Concluding remark"
                                rows={10}
                                className={
                                  "form-control" +
                                  (formProps.errors.concluding_remark &&
                                  formProps.touched.concluding_remark
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              {/* )} */}
                              <ErrorMessage
                                name="concluding_remark"
                                component="div"
                                className="invalid-feedback"
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="form-group">
                        <Col md={12}>
                          <h4 style={{ textDecoration: "underline" }}>
                            Conclusion
                          </h4>

                          <FormGroup>
                            <InputGroup>
                              {/* {props.cases?.isLoading ? (
                            <Loader2 />
                          ) : ( */}
                              <Field
                                component={CustomInput}
                                type="textarea"
                                name="conclusion"
                                id="conclusion"
                                placeholder="Enter Conclusion"
                                rows={3}
                                className={
                                  "form-control" +
                                  (formProps.errors.conclusion &&
                                  formProps.touched.conclusion
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              {/* )} */}
                              <ErrorMessage
                                name="conclusion"
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
                                    )}
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    cases: state.cases,
    editcase: state.cases.editcase,
    cols: state.cols.cols,
    customer: state.customer.customer,
    rows: state.rows.rows,
    parameterData: state.tests.parameterData,
    tests: state.tests,
    page: state.page,
    parameter: state.parameter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCasesDataPageDetail: (data) => dispatch(actions.getCasesDataPageDetail(data)),
    postCasesDataPageDetail: (data, user) =>dispatch(actions.postCasesDataPageDetail(data, user)),
    updatePageDetail: (data, user) =>dispatch(actions.updatePageDetail(data, user)),
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Remark);

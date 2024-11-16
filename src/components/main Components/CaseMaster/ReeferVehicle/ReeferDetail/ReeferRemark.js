/* eslint-disable eqeqeq */
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
import { connect } from "react-redux";
import * as actions from "../../../../../redux/action";
import ON_TOGGLE5 from "../../../../../redux/action/ActionType5"
import { useDispatch } from "react-redux";
import Switch from "@mui/material/Switch";

import { useParams } from "react-router-dom";
import Loader2 from "../../../../loader/Loader2";

function ReeferRemark(props) {
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
  const dispatch = useDispatch();

  console.log("parm", param);
  const [modal, setModal] = useState(false);

  const toggle = () => {
    props.toggle("mean");
  };

  const p =
    props.parameterData?.neg?.length > 0
      ? props.parameterData?.neg?.map((d) => d.avg)
      : [];
  const negMinimum = Math.min(...p);

  const negMaximum = Math.max(...p);

  const maxNegPoint =
    props.parameterData?.neg?.length > 0
      ? props.parameterData?.neg
          ?.filter((par) => par.avg == negMaximum)
          .map((par) => {
            return par.sensor;
          })
      : "";

  const minNegPoint =
    props.parameterData?.neg?.length > 0
      ? props.parameterData?.neg
          ?.filter((par) => par.avg == negMinimum)
          .map((par) => {
            return par.sensor;
          })
      : "";

  const q =
    props.parameterData?.pos?.length > 0
      ? props.parameterData?.pos?.map((d) => d.avg)
      : [];
  const posMinimum = Math.min(...q);

  const posMaximum = Math.max(...q);

  const maxPosPoint =
    props.parameterData?.pos?.length > 0
      ? props.parameterData?.pos
          ?.filter((par) => par.avg == posMaximum)
          .map((par) => {
            return par.sensor;
          })
      : "";

  const minPosPoint =
    props.parameterData?.pos?.length > 0
      ? props.parameterData?.pos
          ?.filter((par) => par.avg == posMinimum)
          .map((par) => {
            return par.sensor;
          })
      : "";

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

  // console.log("Refer vehicle Point", maxPosPoint);
  console.log("maximum", posMaximum, "minimum", posMinimum,props);

  const p1 =
  props.parameter?.parameter1?.length > 0
    ? props?.parameter?.parameter1
        ?.filter(
          (c) =>
            !c?.sensor?.toLowerCase().includes("AMB".trim().toLowerCase())
        )
        ?.map((d) => d.avg)
        : [];
  const pArray1 =
  props.parameter?.parameter1?.length > 0
    ? props?.parameter?.parameter1
        ?.filter(
          (c) =>
            !c?.sensor?.toLowerCase().includes("AMB".trim().toLowerCase())
        )
        ?.map((d) => d)
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

  const pArray2 =
  props.parameter?.parameter2?.length > 0
    ? props?.parameter?.parameter2
        ?.filter(
          (c) =>
            !c?.sensor?.toLowerCase().includes("AMB".trim().toLowerCase())
        )
        ?.map((d) => d)
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

  const pArray3 =
  props.parameter?.parameter3?.length > 0
    ? props?.parameter?.parameter3
        ?.filter(
          (c) =>
            !c?.sensor?.toLowerCase().includes("AMB".trim().toLowerCase())
        )
        ?.map((d) => d)
        : [];
        
        const pMax3 = Math.max(...p3);
        const pMin3 = Math.min(...p3);

        
  const pMax1Point =
  pArray1?.length > 0
    ? pArray1
        ?.filter((par) => par.avg == pMax1)
        .map((par) => {
          return par.sensor;
        })
        : "";
  const pMin1Point =
  pArray1?.length > 0
  ? pArray1
        ?.filter((par) => par.avg == pMin1)
        .map((par) => {
          return par.sensor;
        })
        : "";
        const pMax2Point =
        pArray2?.length > 0
    ? pArray2
        ?.filter((par) => par.avg == pMax2)
        .map((par) => {
          return par.sensor;
        })
    : "";

    
    const pMin2Point =
    pArray2?.length > 0
    ? pArray2
        ?.filter((par) => par.avg == pMin2)
        .map((par) => {
          return par.sensor;
        })
        : "";
  const pMax3Point =
  pArray3?.length > 0
    ? pArray3
        ?.filter((par) => par.avg == pMax3)
        .map((par) => {
          return par.sensor;
        })
        : "";
        const pMin3Point =
        pArray3?.length > 0
        ? pArray3
        ?.filter((par) => par.avg == pMin3)
        .map((par) => {
          return par.sensor;
        })
        : "";
        
        // console.log("pMin3Point",p1,pMin1Point,pMax1Point,pMin3Point,pMin2Point,pMax1,pArray1)
        
        
        console.log(pMax1Point,pMax1.toFixed(2),pMax2Point,pMax2.toFixed(2),pMax3Point,pMax3.toFixed(2),"pMax2Point",pMax3Point,"l",pMax1Point.length + pMax2Point.length + pMax3Point.length != 3, pMax1Point.length , pMax2Point.length , pMax3Point.length)

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
       {pMax1Point.length + pMax2Point.length + pMax3Point.length != 3 ? (
                                    <Loader2 />
                                    ) : (  
                                      <CardBody>
        {props.cases?.cases
          ?.filter((c) => c.id == param.id)
          .map((user) => {
            return (
              <Formik
                initialValues={{
                  concluding_remark:
                  //  user.concluding_remark
                  //   ? user.concluding_remark
                  //   : 
                    `For Temperature Range: ${
                        user.min_operating_range
                      } °C to ${
                        user.max_operating_range
                      }  °C	\n 1. Point ${pMax1Point}	(Average Maximum Temperature: ${pMax1.toFixed(
                        2
                      )}°C) shown in Red color has registered MAXIMUM TEMPERATURE in ${
                        props.editcase?.type_of_cycle == "(PQ)"
                          ? "Loaded"
                          : "Empty"
                      } condition. So a daily temperature monitoring instrument is suggested to be placed at the location of  ${pMax1Point}. When only maximum limit needs to be controlled then treat point ${pMax1Point} as a HOT SPOT in ${
                        props.editcase?.type_of_cycle == "(PQ)"
                          ? "Loaded"
                          : "Empty"
                      } condition.

2. Point ${pMin1Point} (Average Minimum Temperature: ${pMin1.toFixed(
                        2
                      )}°C) shown in Green color has registered MINIMUM TEMPERATURE in ${
                        props.editcase?.type_of_cycle == "(PQ)"
                          ? "Loaded"
                          : "Empty"
                      } condition. So a daily temperature monitoring instrument is suggested to be placed at the location of ${pMin1Point}. When only minimum limit needs to be controlled then treat point ${pMin1Point} as a COLD SPOT in ${
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
                      } condition.\n\n  For Temperature Range: ${
                        user.min_operating_range2
                      } °C to ${
                        user.max_operating_range2
                      } °C \n 1. Point ${pMax3Point}	(Average Maximum Temperature: ${pMax3.toFixed(
                        2
                      )}°C)	shown in Red color has registered MAXIMUM TEMPERATURE in ${
                        props.editcase?.type_of_cycle == "(PQ)"
                          ? "Loaded"
                          : "Empty"
                      } condition.So a daily temperature monitoring instrument is suggested to be placed at the location of ${pMax3Point}. When only maximum limit needs to be controlled then treat point ${pMax3Point} as a HOT SPOT in ${
                        props.editcase?.type_of_cycle == "(PQ)"
                          ? "Loaded"
                          : "Empty"
                        } condition.\n\n 2. Point ${pMin3Point} (Average Minimum Temperature: ${pMin3.toFixed(
                        2
                      )}°C)	shown in Green color has registered MINIMUM TEMPERATURE in ${
                        props.editcase?.type_of_cycle == "(PQ)"
                        ? "Loaded"
                          : "Empty"
                      } condition. So a daily temperature monitoring instrument is suggested to be placed at the location of ${pMin3Point}. When only minimum limit needs to be controlled then treat point ${pMin3Point} as a COLD SPOT in ${
                        props.editcase?.type_of_cycle == "(PQ)"
                          ? "Loaded"
                          : "Empty"
                      } condition.`,

                  conclusion: user.conclusion
                    ? user.conclusion
                    : `The above mentioned  ${props.editcase?.type_of_room} ${
                      props.editcase?.identification_no ?? ""
                    } is monitored for temperature uniformity for 12 Hours for range  ${
                      user.min_operating_range ?? ""
                    } °C to ${user.max_operating_range ?? ""} °C, ${
                        user.min_operating_range1 ?? ""
                      } °C to ${
                        user.max_operating_range1 ?? ""
                      }°C and  ${
                        user.min_operating_range2 ?? ""
                      } °C to ${
                        user.max_operating_range2 ?? ""
                      }°C respectively in ${
                        props.editcase?.type_of_cycle == "(PQ)"
                          ? "Loaded"
                          : "Empty"
                        } condition and results found are as per the acceptance criteria. So the  ${
                        props.editcase?.type_of_room
                      } ${
                        props.editcase?.vehicle_model ?? ""
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
export default connect(mapStateToProps, mapDispatchToProps)(ReeferRemark);

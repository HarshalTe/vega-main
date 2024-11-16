/* eslint-disable eqeqeq */
import React, { useState } from "react";
import moment from "moment";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Label,
  InputGroup,
  Table,
} from "reactstrap";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { Formik, Form, Field, ErrorMessage,FieldArray } from "formik";
import CustomInput from "../../../../../views/custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../../../redux/action";
import Loader2 from "../../../../loader/Loader2";
import CustomSelect from "../../../../../views/custom/CustomSelect";
import { useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import ON_TOGGLE_AC from "../../../../../redux/action/ActionTypeAc"
import Switch from "@mui/material/Switch";
import { useDispatch } from "react-redux";

function DetailsAirConditioning(props) {
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

  const [checked, setChecked] = React.useState(idPage[0]?.ac==1?false:true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    // dispatch(ON_TOGGLE_AC(checked))
    let user={
      "id": userIdPage,
    "ac": event.target.checked==false? 1 : 0,
    }
    props.updatePageDetail(data,user)
  }
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const toggle = () => {
    props.toggle("cycle");
  };

  React.useEffect(()=>{
    props.onGetCasesDataAc(data)
  },[])


  const acData=props.ac.ac
const isCase=acData.some((caseId)=>{
  console.log("data11",caseId.cases_id)

  return caseId.cases_id==param?.id})

  // console.log(data,props,"data11",acData,isCase)
  // filter

  const isEqual = function(data){
    // console.log("object",data.cases_id)
    return data?.cases_id==param.id
  }

  const AcData=props?.ac?.ac

  
  const paraAc=AcData?.filter(isEqual)
  const index = paraAc?.length-1
  // console.log("data11",AcData,paraAc,paraAc[index]);
  const userId=paraAc[index]?.id
  console.log("userId",userId)
  
  const handleReset = (userId)=>{
    console.log("userId",userId)
    props.onDeleteCasesAc(data,userId)

  }
  
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Cases:", values);

    const user2 = {
      "cases_id": data.id,
      "volume_area": [
        {
            "length": values.volume_area_length,
            "width": values.volume_area_width,
            "height": values.volume_area_height,
        }
    ],
      "ac_unit_type": values.ac_unit_type,
      "installed_cooling_capacity": values.installed_cooling_capacity,
      "cooling_units_installed": values.cooling_units_installed,
      "no_blowers_installed": values.no_blowers_installed,
      "switching_type": values.switching_type,
      "indication_number": values.indication_number,
  }
    
    console.log("object333",user2,values.indication_number)
    setSubmitting(true);
    console.log("Data of cases:",data,values.volume_area);
    
    props.onPostCasesDataAc(data, user2, toggle);
    
    return;
  };
  
  return (
    <Card>
      <CardHeader className="bg-success text-white">
        <div className="">
          <i className="fa fa-home mr-1" />
          <strong>
          Details Of "Air-Conditioning System"
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
        {props.cases?.cases
          ?.filter((c) => c.id == param.id)
          .map((user) => {
            return (
              <Formik
              key={user.id}
              initialValues={{
                customer_id: user.customer_id,
                user_id: user.user_id,
                // volume_area: user.volume_area ? user.volume_area : "",//
                volume_area_length: paraAc[index]?.volume_area[0]?.length, 
                volume_area_width: paraAc[index]?.volume_area[0]?.width,
                volume_area_height: paraAc[index]?.volume_area[0]?.height,
                  // volume_area:
                  // [user.volume_area_length,user.volume_area_width,user.volume_area_height] ,
                  ac_unit_type: paraAc[index]?.ac_unit_type,
                  cooling_units_installed: paraAc[index]?.cooling_units_installed,
                  operating_range: user.operating_range
                  ? user.operating_range
                  : "",
                  installed_cooling_capacity: paraAc[index]?.installed_cooling_capacity,
                  max_operating_range: user.max_operating_range
                  ? user.max_operating_range
                  : "",
                  switching_type: paraAc[index]?.switching_type ? paraAc[index]?.switching_type : "",
                  // indication_number:["user.indication_number_a", "user.indication_number_b"],
                  indication_number:  paraAc[index]?.indication_number,
                  indication_number_b: user.indication_number_b ? user.indication_number_b : "",
                  indication_number_a: user.indication_number_a ? user.indication_number_a : "",
                  cycle: user.cycle ? user.cycle : "",
                  load_status: user.load_status
                  ? user.load_status
                  : user.type_of_cycle == "(OQ)"
                  ? "Loaded"
                  : "Empty",
                  continuous_cycle_start_date: user.continuous_cycle_start_date
                  ? user.continuous_cycle_start_date
                  : "",
                  continuous_cycle_end_date: user.continuous_cycle_end_date
                  ? user.continuous_cycle_end_date
                  : "",
                  no_blowers_installed: paraAc[index]?.no_blowers_installed ? paraAc[index]?.no_blowers_installed : "",
                  set_point: user.set_point ? user.set_point : "(Ambient)",
                  calibration_certificate_no: user.calibration_certificate_no
                  ? user.calibration_certificate_no
                  : "As Per Attached Annexure",
                  details_of_master_instrument:
                    user.details_of_master_instrument
                    ? user.details_of_master_instrument
                    : "Wireless Data Logger",
                  }}
                onSubmit={handleSubmit}
                onReset={()=>handleReset(userId)}
                // validationSchema={Yup.object().shape({
                  //   continuous_cycle_start_date:
                //     Yup.string().required("required"),
                //   continuous_cycle_end_date: Yup.string().required("required"),
                //   no_of_cycles: Yup.string().required("required"),
                //   details_of_master_instrument:
                //     Yup.string().required("required"),
                //   calibration_certificate_no: Yup.string().required("required"),
                // })}
              >
                {(formProps) => {
                  return (
                    <Form>
                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="volume_area_length">Volume Of Area Length</Label>
                          <InputGroup>
                            {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : (
                              <Field
                                component={CustomInput}
                                type="number"
                                name="volume_area_length"
                                id="volume_area_length"
                                placeholder="Volume Of Area Length"
                                className={
                                  "form-control" +
                                  (formProps.errors.volume_area_length &&
                                  formProps.touched.volume_area_length
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                            )}
                          </InputGroup>
                        </Col>
                        <Col md={6}>
                          <Label for="volume_area_width">Volume Of Area Width</Label>
                          <InputGroup>
                            {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : (
                              <Field
                                component={CustomInput}
                                type="number"
                                name="volume_area_width"
                                id="volume_area_width"
                                placeholder="Volume Of Area Width"
                                className={
                                  "form-control" +
                                  (formProps.errors.volume_area_width &&
                                  formProps.touched.volume_area_width
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                            )}
                          </InputGroup>
                        </Col>
                        <Col md={6}>
                          <Label for="volume_area_height">Volume Of Area Height</Label>
                          <InputGroup>
                            {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : (
                              <Field
                                component={CustomInput}
                                type="number"
                                name="volume_area_height"
                                id="volume_area_height"
                                placeholder="Volume Of Area Height"
                                className={
                                  "form-control" +
                                  (formProps.errors.volume_area_height &&
                                  formProps.touched.volume_area_height
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                            )}
                          </InputGroup>
                        </Col>
                        <Col md={6}>
                          <Label for="ac_unit_type">Type Of Air Conditioning Unit</Label>
                          <InputGroup>
                            {/* {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : ( */}
                            <Field
                              component={CustomInput}
                              type="text"
                              name="ac_unit_type"
                              id="ac_unit_type"
                              placeholder="Type Of Air Conditioning Unit"
                              className={
                                "form-control" +
                                (formProps.errors.ac_unit_type &&
                                formProps.touched.ac_unit_type
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            {/* )} */}
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="installed_cooling_capacity">
                          Total Installed Cooling Capacity (Including Split AC's If Any)
                          </Label>
                          <InputGroup>
                            {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : (
                              <Field
                                component={CustomInput}
                                type="text"
                                name="installed_cooling_capacity"
                                id="installed_cooling_capacity"
                                placeholder="Total Installed Cooling Capacity (Including Split AC's If Any)"
                                className={
                                  "form-control" +
                                  (formProps.errors.installed_cooling_capacity &&
                                  formProps.touched.installed_cooling_capacity
                                    ? " is-invalid"
                                    : "")
                                }
                              ></Field>
                            )}
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="cooling_units_installed">
                          Total No Of Cooling Units Installed
                          </Label>
                          <InputGroup>
                            {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : (
                              <Field
                                component={CustomInput}
                                type="text"
                                name="cooling_units_installed"
                                id="cooling_units_installed"
                                placeholder="Total No Of Cooling Units Installed"
                                className={
                                  "form-control" +
                                  (formProps.errors.cooling_units_installed &&
                                  formProps.touched.cooling_units_installed
                                    ? " is-invalid"
                                    : "")
                                }
                              ></Field>
                            )}
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="no_blowers_installed">No Of Blowers Installed</Label>
                          <InputGroup>
                            {props.cases?.isLoading ? (
                              <Loader2 />
                            ) : (
                              <Field
                                component={CustomInput}
                                type="text"
                                name="no_blowers_installed"
                                id="no_blowers_installed"
                                placeholder="No Of Blowers Installed"
                                className={
                                  "form-control" +
                                  (formProps.errors.no_blowers_installed &&
                                  formProps.touched.no_blowers_installed
                                    ? " is-invalid"
                                    : "")
                                }
                              ></Field>
                            )}
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="switching_type">Type Of Switching For Standby Unit(Automatic/Manual)</Label>
                          <InputGroup>
                            <Field
                              component={CustomSelect}
                              type="text"
                              name="switching_type"
                              id="switching_type"
                              placeholder="Type Of Switching For Standby Unit(Automatic/Manual)"
                              className={
                                "form-control" +
                                (formProps.errors.switching_type &&
                                formProps.touched.switching_type
                                  ? " is-invalid"
                                  : "")
                              }
                            >
                              {/* <option value="">Type Of Switching For Standby Unit</option>
                              <option key={1} value={"Automatic"}>
                                    {"Automatic"}
                                  </option>
                              <option key={2} value={"Manual"}>
                                    {"Manual"}
                                  </option> */}
                              {/* {props.rows
                                ?.filter((row) => row.col_id == 9)
                                .map((row) => (
                                  <option key={row.id} value={row.name}>
                                    {row.name}
                                  </option>
                                ))} */}
                            </Field>

                            <ErrorMessage
                              name="usage_area"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                     <Row>
                     <Label for="operating_range">
                          Identification Number Of Individual AC & Its Switching Frequency
                          </Label>
                      <Col md={12} className="pb-4">
                    <FieldArray
                      name="indication_number"
                      render={(arrayHelpers) => (
                        <div>
                          <Row>
                            <Col md={2}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="value_name"
                                name="value_name"
                                label="Value Name"
                                value={formProps.values.value_name}
                                onChange={formProps.handleChange}
                              />
                            </Col>
                            <Col md={2}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="value"
                                name="value"
                                label="Value"
                                value={formProps.values.value}
                                onChange={formProps.handleChange}
                              />
                            </Col>
                           

                            <Col>
                              <Button
                                color="success"
                                variant="contained"
                                onClick={() => {
                                  arrayHelpers.push({
                                    value_name: formProps.values.value_name,
                                    value: formProps.values.value,
                                   
                                  });
                                  {
                                    formProps.setFieldValue("value_name", "");
                                    formProps.setFieldValue("value", "");
                                  }
                                }}
                                size="large"
                              >
                                <AddIcon fontSize="inherit" />
                              </Button>
                            </Col>
                          </Row>
                          <Table
                            size="sm"
                            className="mt-3"
                            bordered
                            style={{ textAlign: "center" ,width:"400px"}}
                          >
                            <thead>
                              <tr>
                                <th>Sr No.</th>
                                <th>Value name</th>
                                <th>Value</th>
                               
                              </tr>
                            </thead>

                            <tbody>
                              {/* {console.log(
                                "values",
                                formProps?.values?.indication_number
                              )} */}
                              {formProps?.values?.indication_number?.map(
                                (document, index) => {
                                  return (
                                    <tr key={index} >
                                      <td>{index + 1}</td>

                                      <td>
                                        <TextField
                                          fullWidth
                                          disabled
                                          size="small"
                                          label="Value name"
                                          variant="outlined"
                                          name={`document.${index}.value_name`}
                                          value={document.value_name}
                                          id="value_name"
                                          // onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          disabled
                                          size="small"
                                          label="Value"
                                          variant="outlined"
                                          name={`document.${index}.value`}
                                          value={document.value}
                                          id="value"
                                          // onChange={formProps.handleChange}
                                        />
                                      </td>

                                      <td>
                                        <Button
                                          color="error"
                                          size="large"
                                          variant="outlined"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          <DeleteIcon fontSize="inherit" />
                                        </Button>
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                            </tbody>
                          </Table>
                        </div>
                      )}
                    />
                  </Col>
                </Row>

{/* {/*  */}

                      <Row style={{ justifyContent: "center" }}>
                        <Col md={4}>
                          <Button
                           type="reset"
                           disabled={formProps.isResetting}
                            color="danger" 
                            block>
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
    customer: state.customer.customer,
    rows: state.rows.rows,
    ac:state.ac,
    page: state.page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCasesDataPageDetail: (data) => dispatch(actions.getCasesDataPageDetail(data)),
    postCasesDataPageDetail: (data, user) =>dispatch(actions.postCasesDataPageDetail(data, user)),
    updatePageDetail: (data, user) =>dispatch(actions.updatePageDetail(data, user)),
    onCustomerGetData: (data) => dispatch(actions.customerGetData(data)),
    onGetCasesDataAc: (data) => dispatch(actions.getCasesDataAc(data)),
    onRowsGetData: (data) => dispatch(actions.rowsGetData(data)),
    onColsGetData: (data) => dispatch(actions.colsGetData(data)),
    onCasesGetData: (data) => dispatch(actions.casesGetData(data)),
    onDeleteCases: (data, id) => dispatch(actions.deleteCases(data, id)),
    onPostCasesDataAc: (data, user, toggle) =>
      dispatch(actions.postCasesDataAc(data, user, toggle)),
      onDeleteCasesAc: (data,userId) =>
      dispatch(actions.deleteCasesAc(data,userId)),
      // onUpdateCasesDataAc: (data, user, toggle, setSubmitting) =>
      // dispatch(actions.updateCasesDataAc(data, user, toggle, setSubmitting)),
    casesEditGetData: (data) => dispatch(actions.casesEditGetData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailsAirConditioning);

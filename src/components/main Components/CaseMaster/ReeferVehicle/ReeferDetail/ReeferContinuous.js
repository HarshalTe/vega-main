import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  InputGroup,
  Pagination,
  PaginationItem,
  PaginationLink,
  FormGroup,
} from "reactstrap";
import CustomSelect from "../../../../../views/custom/CustomSelect";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Formik, Form, ErrorMessage, Field } from "formik";
import CustomInput from "../../../../../views/custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../../../redux/action";

import Loader from "../../../../loader/Loader2";
import { useParams } from "react-router-dom";
import ReeferEditcontinuous from "./ReeferEditcontinuous";

import axios from "axios";
import { baseUrl } from "../../../../../shared/baseUrl";
import Loader2 from "../../../../loader/Loader2";

import ReeferGraph from "../ReeferGraph/ReeferGraph";
import ReeferGraph2 from "../ReeferGraph/ReeferGraph2";
import swal from "sweetalert";
import Switch from "@mui/material/Switch";
import ON_TOGGLE2 from "../../../../../redux/action/ActionType2"
import ON_TOGGLE22 from "../../../../../redux/action/ActionType22"
import ON_TOGGLE23 from "../../../../../redux/action/ActionType23"
import { useDispatch } from "react-redux";

function ReeferContinuous(props) {
  
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
    
    const [checked, setChecked] = React.useState(idPage[0]?.continuous_cycle_1==1?false:true);
    const [checked2, setChecked2] = React.useState(idPage[0]?.continuous_cycle_2==1?false:true);
    const [checked3, setChecked3] = React.useState(idPage[0]?.continuous_cycle_3==1?false:true);
  
    const handleChange = (event) => {
      setChecked(event.target.checked);
      // dispatch(ON_TOGGLE2(checked))
      console.log(checked,"checked111222",userIdPage,event.target.checked)
      let user={
        "id": userIdPage,
      "continuous_cycle_1": event.target.checked==false? 1 : 0,
      }
      props.updatePageDetail(data,user)
    }
    const handleChange2 = (event) => {
      setChecked2(event.target.checked);
      // dispatch(ON_TOGGLE22(checked2))
      let user={
        "id": userIdPage,
      "continuous_cycle_2": event.target.checked==false? 1 : 0,
      }
      props.updatePageDetail(data,user)
    }
    const handleChange3 = (event) => {
      setChecked3(event.target.checked);
      // dispatch(ON_TOGGLE23(checked3))
      let user={
        "id": userIdPage,
      "continuous_cycle_3": event.target.checked==false? 1 : 0,
      }
      props.updatePageDetail(data,user)
    }
    const togglePost=()=>{
      let user={
        "id": userIdPage,
        // "case_id": param?.id,
        "continuous_cycle_1": 1,
        "door_cycle_1": 1,
        "power_cycle_1": 1,
        "ac": 1,
        "risk": 1,
        "remark": 1
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
              <ReeferGraph />
            </>
          );
        });
      })
      .catch((err) => {
        setPostLoading(false);
        setSubmitting(false);
        console.log("error of excel upload", err.response);
      });
    setSubmitting(true);
    // props.toggle("area");
    return;
  };

  const [state, setState] = useState({
    pageSize: 10, // <- 25 items will be shown on single page
    pageIndex: 0, // 0 is a default page to show
    items: props.testType?.isLoading ? [] : props.testType?.testType,
  });

  const handlePrevPageClick = (event) => {
    // console.log(state.items.length);
    setState((prevState) => ({
      ...state,
      pageIndex: prevState.pageIndex > 0 ? prevState.pageIndex - 1 : 0,
    }));
  };

  const handleNextPageClick = (event) => {
    console.log("pageIndex", state.pageIndex);
    console.log("pageSize", state.pageSize);

    setState((prevState) => ({
      ...state,
      pageIndex:
        prevState.pageIndex <
        Math.ceil(prevState.items.length / prevState.pageSize)
          ? prevState.pageIndex + 1
          : prevState.pageIndex,
    }));
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit2 = (values, { setSubmitting }) => {
    console.log("values in TestType:", values);

    const user = new FormData();

    user.append("name", values.name);
    user.append("type_room", "Reefer Vehicle");

    console.log("Data of TestType:", user);
    props.onPostTestTypeData(data, user, toggle);
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
  console.log("object222",graphID,Continuous1,Continuous2,Continuous3,"ee",Continuous1[0]?.id)

  return (
    <Card className="pb-3">
      <CardHeader className="bg-warning text-white">
        <div className="">
          <strong>Graph of Test Cycles</strong>
          <Button
            className="btn-success  float-right"
            onClick={() => {
              toggle();
            }}
          >
            Add
          </Button>
          <Button
            className="btn-orange mr-1 float-right"
            onClick={() => {
              togglePost();
            }}
          >
            Add Page
          </Button>
        </div>
        Show
            <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
        />
        Hide
        <Modal
          className="modal-info modal-lg"
          isOpen={modal}
          toggle={toggle}
          backdrop="static"
        >
          <ModalHeader toggle={toggle}>Add New Test Cycle</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                name: "",
              }}
              onSubmit={handleSubmit2}
            >
              {(formProps) => {
                return (
                  <Form>
                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="name">Test Cycle Name</Label>
                        <FormGroup>
                          <InputGroup>
                          <Field
                                  component={CustomSelect}
                                  type="select"
                                  name="name"
                                  id="name"
                                  placeholder="Enter Cycle Name"
                                  className={
                                    "form-control" +
                                    (formProps.errors.name &&
                                      formProps.touched.name
                                      ? " is-invalid"
                                      : "")
                                    }
                                    >
                                  <option value="">Select Cycle Name</option>
                                  <option value="CONTINUOUS OPERATION TEST CYCLE">
                                  CONTINUOUS OPERATION TEST CYCLE
                                  </option>
                                  <option value="CONTINUOUS OPERATION TEST CYCLE-I">
                                  CONTINUOUS OPERATION TEST CYCLE-I
                                  </option>
                                  <option value="CONTINUOUS OPERATION TEST CYCLE-II">
                                  CONTINUOUS OPERATION TEST CYCLE-II
                                  </option>
                                  <option value="CONTINUOUS OPERATION TEST CYCLE-III">
                                  CONTINUOUS OPERATION TEST CYCLE-III
                                  </option>
                                  <option value="START UP STUDY TEST CYCLE">
                                  START UP STUDY TEST CYCLE
                                  </option>
                                  <option value="START UP STUDY TEST CYCLE-I">
                                  START UP STUDY TEST CYCLE-I
                                  </option>
                                  <option value="START UP STUDY TEST CYCLE-II">
                                  START UP STUDY TEST CYCLE-II
                                  </option>
                                  <option value="START UP STUDY TEST CYCLE-III">
                                  START UP STUDY TEST CYCLE-III
                                  </option>
                                  <option value="DOOR OPEN TEST CYCLE">
                                  DOOR OPEN TEST CYCLE
                                  </option>
                                  <option value="DOOR OPEN TEST CYCLE-I">
                                  DOOR OPEN TEST CYCLE-I
                                  </option>
                                  <option value="DOOR OPEN TEST CYCLE-II">
                                  DOOR OPEN TEST CYCLE-II
                                  </option>
                                  <option value="DOOR OPEN TEST CYCLE-III">
                                  DOOR OPEN TEST CYCLE-III
                                  </option>
                                  <option value="POWER FAILURE TEST CYCLE">
                                  POWER FAILURE TEST CYCLE
                                  </option>
                                  <option value="POWER FAILURE TEST CYCLE-I">
                                  POWER FAILURE TEST CYCLE-I
                                  </option>
                                  <option value="POWER FAILURE TEST CYCLE-II">
                                  POWER FAILURE TEST CYCLE-II
                                  </option>
                                  <option value="POWER FAILURE TEST CYCLE-III">
                                  POWER FAILURE TEST CYCLE-III
                                  </option>
                                </Field>
                            <ErrorMessage
                              name="name"
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
          </ModalBody>
        </Modal>
      </CardHeader>
      <CardBody>
        <table
          className="table table-sm text-center"
          style={{ fontSize: "12px" }}
        >
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Test Cycle Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody style={{ textTransform: "uppercase" }}>
            {props.testType?.isLoading ? (
              <tr>
                <td colSpan={18}>
                  <Loader color={"primary"} />
                </td>
              </tr>
            ) : props.testType?.testType?.length > 0 ? (
              props.testType?.testType
                ?.filter(
                  (type) =>
                    type.type_room == "Reefer Vehicle" &&
                    !type.name
                      ?.toLowerCase()
                      .includes("WITHOUT AMBIENT".trim().toLowerCase())
                )
                .map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>

                      <td className="d-flex justify-content-center">
                        <ReeferEditcontinuous data={user} />

                        <Button
                          className="btn-danger ml-3 p-1"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this Test Cycle?"
                              )
                            )
                              props.onDeleteTestType(data, user.id);
                          }}
                        >
                          <i
                            className="fa fa-trash-alt "
                            value={user.id}
                            aria-hidden="true"
                          ></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td colSpan={3}>No Test Cycle Name</td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>

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
      {/* <ReeferGraph
        test_id={Continuous1[0]?.id}
        testName="CONTINUOUS OPERATION TEST CYCLE-I (WITH AMBIENT)"
        x_min_excersion={""}
        x_max_excersion={""}
        y_min_excersion={""}
        y_max_excersion={""}
        x_min_recovery={""}
        x_max_recovery={""}
        y_min_recovery={""}
        y_max_recovery={""}
      />
      <ReeferGraph
        test_id={Continuous1[0]?.id}
        testName="CONTINUOUS OPERATION TEST CYCLE-I (WITHOUT AMBIENT)"
        x_min_excersion={""}
        x_max_excersion={""}
        y_min_excersion={""}
        y_max_excersion={""}
        x_min_recovery={""}
        x_max_recovery={""}
        y_min_recovery={""}
        y_max_recovery={""}
      /> */}
      <CardHeader className="bg-success text-white">
        <div className="">
          <i className="fa fa-home mr-1" />
          <strong>CONTINUOUS OPERATION TEST CYCLE-II (Temperature Vs Time)</strong>
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
        test_id={Continuous2[0]?.id}
        testName="CONTINUOUS OPERATION TEST CYCLE-II (WITH AMBIENT)"
        x_min_excersion={""}
        x_max_excersion={""}
        y_min_excersion={""}
        y_max_excersion={""}
        x_min_recovery={""}
        x_max_recovery={""}
        y_min_recovery={""}
        y_max_recovery={""}
      />
      <ReeferGraph2
        test_id={Continuous2[0]?.id}
        testName="CONTINUOUS OPERATION TEST CYCLE-II (WITHOUT AMBIENT)"
        x_min_excersion={""}
        x_max_excersion={""}
        y_min_excersion={""}
        y_max_excersion={""}
        x_min_recovery={""}
        x_max_recovery={""}
        y_min_recovery={""}
        y_max_recovery={""}
      /> */}
       <CardHeader className="bg-success text-white">
        <div className="">
          <i className="fa fa-home mr-1" />
          <strong>CONTINUOUS OPERATION TEST CYCLE-III (Temperature Vs Time)</strong>
        </div>
        Show
        <Switch
      checked={checked3}
      onChange={handleChange3}
      inputProps={{ 'aria-label': 'controlled' }}
      />
      Hide
      </CardHeader>
      {/* <ReeferGraph
        test_id={Continuous3[0]?.id}
        testName="CONTINUOUS OPERATION TEST CYCLE-III (WITH AMBIENT)"
        x_min_excersion={""}
        x_max_excersion={""}
        y_min_excersion={""}
        y_max_excersion={""}
        x_min_recovery={""}
        x_max_recovery={""}
        y_min_recovery={""}
        y_max_recovery={""}
      />
      <ReeferGraph
        test_id={Continuous2[0]?.id}
        testName="CONTINUOUS OPERATION TEST CYCLE-III (WITHOUT AMBIENT)"
        x_min_excersion={""}
        x_max_excersion={""}
        y_min_excersion={""}
        y_max_excersion={""}
        x_min_recovery={""}
        x_max_recovery={""}
        y_min_recovery={""}
        y_max_recovery={""}
      /> */}
      
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    testType: state.testType,
    editcase: state.cases.editcase,
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
export default connect(mapStateToProps, mapDispatchToProps)(ReeferContinuous);

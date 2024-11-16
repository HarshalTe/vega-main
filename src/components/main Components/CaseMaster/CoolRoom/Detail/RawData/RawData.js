/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
  FormGroup,
  InputGroup,
} from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../../../../../../redux/action";

import { NavLink, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import CircularProgress from "@material-ui/core/CircularProgress";
import Loader2 from "../../../../../loader/Loader2";
import EditRawData from "./EditRawData";
import * as Yup from "yup";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  getDefaultGridFilterModel,
} from "@mui/x-data-grid";
import { ErrorMessage, Field, Form, Formik } from "formik";
import CustomInput from "../../../../../../views/custom/CustomInput";
import CustomSelect from "../../../../../../views/custom/CustomSelect";
import axios from "axios";
import { baseUrl } from "../../../../../../shared/baseUrl";
import swal from "sweetalert";
import VegasGraph from "../../../../CaseMaster/vegasGraph/VegasGraph";

import { DateFormat } from "../../../../../DateFormat/DateFormat";
import dateFormat from "dateformat";
import moment from "moment";
import { imageUrl } from "../../../../../../shared/imageUrl";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

// export default function BasicDatePicker() {
  
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function RawData(props) {
  const [pageSize, setPageSize] = React.useState(20);
  const accessToken = `${props.login?.login?.token}`;
  const param = useParams();
  const [value2, setValue2] = React.useState(dayjs(''));

  const handleChange = (newValue) => {
    setValue2(newValue);
  };
  const [value3, setValue3] = React.useState(dayjs(''));
  
  const handleChange3 = (newValue) => {
    setValue3(newValue);
  };
  
  // const date = moment(data);
  // const validDate = date.isValid();
  // validDate ? dateFormat(data, "mm/dd/yyyy") ;
  // console.log("date", date);
  // console.log("validDate", validDate);
  
  const [value, setValue] = React.useState();
  let data = {
    token: accessToken,
    caseId: param?.id,
    id: param?.id,
  };
  
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "test_type_id", headerName: "Test Type Id", flex: 1 },
    { field: "sensor", headerName: "Sensor", flex: 1 },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      valueFormatter: ({ value }) => <DateFormat data={value} />,
      renderCell: ({ value }) => <DateFormat data={value} />,
    },
    { field: "time", headerName: "Time", flex: 1 },
    { field: "temp", headerName: "Temp", flex: 1 },
    
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <EditRawData
          data={params.row}
          index={params.row?.id}
          type_room={props.type_room}
          caseId={param?.id}
          />
          );
      },
    },
  ];

  const [selectionModel, setSelectionModel] = React.useState([]);
  
  const [searchFilter, setSearchFilter] = React.useState(false);
  const [searchFilter2, setSearchFilter2] = React.useState(false);
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [startTime, setStartTime] = React.useState();
  const [endTime, setEndTime] = React.useState(startTime);
  const [sensorValue, setSensorValue] = useState("");
  const [tempValue, setTempValue] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  
  useEffect(() => {
    props.onRawDataGetData(data);
  }, []);
  
  
  // useEffect with clean up
  // useEffect(() => {
    //   const rawData = props.onRawDataGetData(data);
    //   return () => {
      //     rawData.cancel();
  //   };
  // }, []);
  
  async function deleteMethod() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete All!",
    }).then((result) => {
      if (result.isConfirmed) {
        let user = {
          test_ids: selectionModel,
        };
        props.rawDataDeleteAll(data, user);
      }
    });
  }
  const startD = `${value2.$D}`
  const startM = `${value2.$M+1}`
  const startMonth = startM.length===2?startM:`0${startM}`
  const startDay = startD.length===2?startD:`0${startD}`
  const startYear=`${value2.$y}`
  // console.log(startD,startM,startMonth,startDay,startYear,"sssss")
  // console.log(`${startMonth}/${startDay}/${startYear}`,"sssss")
  // const StartDate= `${startMonth}/${startDay}/${startYear}`
  const StartDate= `${startYear}-${startMonth}-${startDay}`
  // console.log(StartDate,"jjjjjjjjjjj")
  
  
  // console.log(value2,"jjjjjj")
  const endD = `${value3.$D}`
  const endM = `${value3.$M+1}`
  const endMonth = endM.length===2?endM:`0${endM}`
  const endDay = endD.length===2?endD:`0${endD}`
  const endYear=`${value3.$y}`
  // console.log(startD,startM,startMonth,startDay,startYear,"sssss")
  // console.log(`${startMonth}/${startDay}/${startYear}`,"sssss")
  // const EndDate= `${endMonth}/${endDay}/${endYear}`
  const EndDate= `${endYear}-${endMonth}-${endDay}`
  
  const startDateTime=StartDate+" "+startTime
  const endDateTime=EndDate+" "+endTime
  // console.log(EndDate,"jjjjjjjjjjj")
  console.log(value2,value3,startTime,endTime,"jjjjjj",EndDate,StartDate,startDateTime,endDateTime)
  console.log("object222",props.type_room,data,"props",props)
  
  // const fUser = {"start_date":"StartDate",
  // "end_date":"EndDate",
  // "start_time":"startTime",
  // "end_time":"endTime"}
  
  const fUser = {
    "start_date":"2022-05-04",
    "end_date":"2022-05-05",
    "start_time":"11:00:00",
    "end_time":"12:00:00"
  }
  
  const filterApi = () => {
    console.log("swal",data,fUser)
    axios
    .put(baseUrl + `case-sensors/${data.caseId}`, fUser, {
      headers: {
        Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((data) => {
        console.log("swal",data);
        swal("Successfully Updated Invoice!").then(() => {
          if (toggle) {
            toggle();
          }
          
        });
      })
      .catch((error) => {
        console.log(error);
      });
    };
    
    const rows = props.rawData?.isLoading
    ? []
    : props.rawData?.rawData?.length > 0
    ? props.rawData?.rawData?.filter((item) => {
      // console.log(item,"jjjjjjjj")
      
        return (
          // (startDate && searchFilter
          //   ? DateFormat({ data: item.date }) >= DateFormat({ data: startDate })
          //   : item) &&
          // (endDate && searchFilter
          //   ? DateFormat({ data: item.date }) <= DateFormat({ data: endDate })
          //   : item) &&
          // (startTime && searchFilter ? item.time >= startTime : item) &&
          // (endTime && searchFilter ? item.time <= endTime : item) &&
          (sensorValue && searchFilter2
            ? item?.sensor
                ?.toLowerCase()
                .includes(sensorValue.trim().toLowerCase())
                : item) &&
                (tempValue && searchFilter2
            ? item?.temp?.toLowerCase().includes(tempValue.trim().toLowerCase())
            : item)
            // &&
            // (StartDate && searchFilter && EndDate
            // ? DateFormat({ data: item.date }) >= DateFormat({ data: StartDate }) && 
            // DateFormat({ data: item.date }) <= DateFormat({ data: EndDate })
            // : item)&&
            // (startTime && endTime && searchFilter
            //   ? item.time >= startTime && item.time <= endTime
            //   // ?.toLowerCase()
            //         // .includes(startTime.trim().toLowerCase())
            //         : item)
            
                    );
                  })
                  : [];

    console.log(rows,"jjjjjjjj")
    // console.log(rows?.id,"kkkkk")

    // const rowTime = function(time){
    //   console.log(time?.filter_datetime,"timeprops")
    // }
    // const row = rows.map(rowTime)


  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const toggle2 = () => {
    setModal2(!modal2);
  };
  
  const time1 = "2015-03-25T18:00:00Z"
  const time2 = "2015-03-25T19:00:00Z"

  if (time1 > time2) {
    console.log("object",time1)
  } else {
    console.log("object",time2)
    
  }
  




  const authAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  
  const handleSubmit2 = (values, { setSubmitting }) => {
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
          props.onRawDataGetData(data);
          props.onTestsGetData(data);
          props.testsEditGetData(data);
          setSubmitting(false);
          setPostLoading(false);
          toggle2();
          return (
            <>
              <VegasGraph />
            </>
          );
        });
      })
      .catch((err) => {
        console.log("error of excel upload", err.response);
        setSubmitting(false);
        setPostLoading(false);
      });
    setSubmitting(true);
    // props.toggle("area");
    return;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in cases:", values);
    
    let user = {
      test_ids: selectionModel,
      test_type_id: values.test_type_id,
    };
    console.log("Data of cases:", user);
    props.rawDataUpdateAll(data, user, toggle, setSubmitting);
    setSubmitting(true);
  };
  const filtetData =()=>{
    let user={
      "start_date":StartDate,
      "end_date":EndDate,
      "start_time":startTime,
      "end_time":endTime
    }
console.log("objectRow",data,user)
   props.onFiltetData(data,user)
  }
  
  console.log("selectionModel", selectionModel);
  
  
  return (
    <Card className="pb-3">
      <CardHeader className="bg-warning text-white">
        <div className=" d-flex justify-content-between align-items-center">
          <strong>Raw Data</strong>

          <Input
            type="text"
            name="sensor"
            id="sensor"
            placeholder="Search by sensor"
            className="form-control"
            value={sensorValue}
            onChange={(e) => {
              console.log("e", e.target.value);
              setSensorValue(e.target.value);
            }}
            style={{ width: "20%" }}
          />
          <Input
            type="text"
            name="temp"
            id="temp"
            value={tempValue}
            placeholder="Search by Temperature"
            className="form-control"
            onChange={(e) => {
              console.log("e", e.target.value);
              setTempValue(e.target.value);
            }}
            style={{ width: "20%" }}
          />
          <div>
            <Button
              type="button"
              color="success"
              className="mr-2"
              onClick={() => {
                setSearchFilter2(true);
              }}
            >
              <b>Search</b>
            </Button>
            <Button
              type="reset"
              color="danger"
              onClick={() => {
                setSensorValue("");
                setTempValue("");
                setSearchFilter2(false);
              }}
            >
              <b>Reset</b>
            </Button>
          </div>
        </div>
        <Modal
          className="modal-info modal-lg"
          isOpen={modal}
          toggle={toggle}
          backdrop="static"
        >
          <ModalHeader toggle={toggle}>Edit Test Type</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                test_type_id: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                test_type_id: Yup.string().required("Test Type Id is required"),
              })}
            >
              {(formProps) => {
                return (
                  <Form>
                    <Row className="form-group">
                      <Col md={12}>
                        <Label for="test_type_id">Select Test Type</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="test_type_id"
                            id="test_type_id"
                            placeholder="Select Test Type"
                            className={
                              "form-control" +
                              (formProps.errors.test_type_id &&
                              formProps.touched.test_type_id
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option value="">Select Test Type</option>
                            {props.testType?.testType
                              ?.filter(
                                (row) =>
                                  row?.type_room == props?.editcase?.type_of_room &&
                                  !row.name
                                    ?.toLowerCase()
                                    .includes(
                                      "WITHOUT AMBIENT".trim().toLowerCase()
                                    )
                              )
                              .map((row) => (
                                <option value={row.id}>
                                  {row.id}: {row.name}
                                </option>
                              ))}
                          </Field>

                          <ErrorMessage
                            name="test_type_id"
                            component="div"
                            className="invalid-feedback"
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
          </ModalBody>
        </Modal>
      </CardHeader>
      <CardBody className="p-0 pr-4 mt-4">
        <Modal className="modal-info modal-lg" isOpen={modal2} toggle={toggle2}>
          <ModalHeader toggle={toggle2}>Upload Raw Data</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                file: "",
                // sensor: "",
                case_id: param?.id,
              }}
              onSubmit={handleSubmit2}
              validationSchema={Yup.object().shape({
                // sensor: Yup.string().required("required"),
                file: Yup.string().required("required"),
              })}
            >
              {(formProps) => {
                return (
                  <Form>
                    <Row className="form-group">
                      <Col md={8}>
                        <Label for="capacity">
                          Excel File (Your File Name will be sensor Name)
                        </Label>
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
            </Formik>
          </ModalBody>
        </Modal>
        <div className="d-flex justify-content-end ">
          <a href={`${imageUrl}demo/tests.xlsx`} download="DemoData">
            <Button className="btn mr-3">Demo Data</Button>
          </a>
          <Button
            className="btn-info mr-3"
            onClick={() => {
              toggle2();
            }}
          >
            Upload Raw Data
          </Button>
          <Button
            className="btn-success mr-3"
            onClick={() => {
              toggle();
            }}
            disabled={selectionModel.length == 0}
          >
            Edit Test Type
          </Button>
          <Button
            color="danger"
            className="p-2 text-right"
            size="sm"
            onClick={deleteMethod}
            disabled={selectionModel.length == 0}
          >
            <i className="fa fa-trash-alt mr-2" /> Delete All
          </Button>
        </div>
        <div className="m-2">
          <Row className="form-group d-flex justify-content-between align-items-end">
            <Col md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Select Start Date"
          inputFormat="MM/DD/YYYY"
          value={value2}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
         </Stack>
    </LocalizationProvider>
              {/* <Label>Select Start Date</Label>
              <Input
                // type="date"
                name="start_date"
                placeholder="mm/dd/yyyy"
                label="mm/dd/yyyy"
                id="start_date"
                step="1"
                className="form-control"
                value={startDate}
                onChange={(e) => {
              // ?DateFormat(startDate, "mm/dd/yyyy")

                  setStartDate(e.target.value);
                }}
                style={{ width: "100%" }}
              /> */}
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Basic example"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          // setValue(newValue)
        }}
        // onChange={(e) => {
        //   // ?DateFormat(startDate, "mm/dd/yyyy")

        //   setValue(e.target.value);
        // }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider> */}

            </Col>
            <Col md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Select End Date"
          inputFormat="MM/DD/YYYY"
          value={value3}
          onChange={handleChange3}
          renderInput={(params) => <TextField {...params} />}
        />
         </Stack>
    </LocalizationProvider>
              {/* <Label>Select End Date</Label>
              <Input
                type="date"
                name="end_date"
                id="end_date"
                step="1"
                className="form-control"
                value={endDate > startDate ? endDate : startDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                style={{ width: "100%" }}
              /> */}
            </Col>
            <Col md={2}>
              <Label>Select Start Time</Label>
              <Input
                type="time"
                name="start_time"
                id="start_time"
                step="1"
                className="form-control"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                }}
                style={{ width: "100%" }}
              />
            </Col>
            <Col md={2}>
              <Label>Select End Time</Label>
              <Input
                type="time"
                name="end_time"
                id="end_time"
                step="1"
                placeholder="Time"
                className="form-control"
                // value={endTime > startTime ? endTime : startTime}
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
                style={{ width: "100%" }}
              />
            </Col>
            <Col md={2}>
              <Button
                type="button"
                color="success"
                className="mr-2"
                onClick={() => {
                  setSearchFilter(true);
                  filtetData()
                }}
              >
                <b>Search</b>
              </Button>
              <Button
                type="reset"
                color="danger"
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                  setStartTime("");
                  setEndTime("");
                  setSearchFilter(false);
                }}
              >
                <b>Reset</b>
              </Button>
            </Col>
          </Row>
        </div>
      </CardBody>
      <CardBody style={{ height: "550px", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={props.rawData?.isLoading ? true : false}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          disableSelectionOnClick
          components={{
            Toolbar: CustomToolbar,
          }}
          checkboxSelection
          selectionModel={selectionModel}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
        />
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    testType: state.testType,
    editcase: state.cases.editcase,
    rawData: state.rawData,
    tests: state.tests,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    testsEditGetData: (data) => dispatch(actions.testsEditGetData(data)),
    onFiltetData: (data,user) => dispatch(actions.filtetData(data,user)),
    onTestsGetData: (data) => dispatch(actions.testsGetData(data)),
    onRawDataGetData: (data) => dispatch(actions.rawDataGetData(data)),
    deleteRawData: (data, id) => dispatch(actions.deleteRawData(data, id)),
    postRawDataData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postRawDataData(data, user, toggle, setSubmitting)),
    updateRawDataData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateRawDataData(data, user, toggle, setSubmitting)),
    rawDataUpdateAll: (data, user, toggle, setSubmitting) =>
      dispatch(actions.rawDataUpdateAll(data, user, toggle, setSubmitting)),
    casesEditGetData: (data) => dispatch(actions.casesEditGetData(data)),
    rawDataDeleteAll: (data, user) =>
      dispatch(actions.rawDataDeleteAll(data, user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RawData);

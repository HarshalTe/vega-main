/* eslint-disable eqeqeq */
import React, { useState } from "react";
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
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Formik, Form, ErrorMessage, Field } from "formik";
import CustomInput from "../../../../../views/custom/CustomInput";
import { connect } from "react-redux";
import * as actions from "../../../../../redux/action";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../../../shared/baseUrl";
import swal from "sweetalert";
import { LinearProgress } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { DateFormat } from "../../../../DateFormat/DateFormat";
import EditData from "../Edit/EditData";
import CustomSelect from "../../../../../views/custom/CustomSelect";
import { imageUrl } from "../../../../../shared/imageUrl";
import { useDispatch } from "react-redux";
import ExcelFields from "../../../../../redux/action/ExcelFields";

function Data(props) {
  const [pageSize, setPageSize] = React.useState(20);
  const dispatch = useDispatch();
  const accessToken = `${props.login?.login?.token}`;
  const param = useParams();

  let data = {
    token: accessToken,
    id: param?.id,
  };

  console.log(data,"11211")

  React.useEffect(() => {
    props.onSheetGetData(data);
  }, []);

  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggle = () => {
    // props.toggle("continuous");
    setModal(!modal);
  };
  const toggle2 = () => {
    // props.toggle("");
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "file",
      headerName: "Image File",
      width: 300,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <a
            target={"blank"}
            href={`${imageUrl}Cases-Files/${params?.row?.file}`}
            rel="noreferrer"
          >
            {params?.row?.file}
          </a>
        );
      },
    },
    {
      field: "created_at",
      headerName: "Created Date",
      flex: 1,
      renderCell: (params) => {
        return <DateFormat data={params?.row?.created_at} />;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <EditData
            data={params.row}
            index={params.row?.id}
            caseId={param?.id}
          />
        );
      },
    },
  ];

  const rows = props.cases?.isLoading
    ? []
    : props.editcase?.files?.length > 0
    ? props.editcase?.files
    : [];

  const [selectionModel, setSelectionModel] = React.useState([]);

  const authAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  

  // const handleSubmit = (values, { setSubmitting }) => {
  //   console.log("values in File:", values);

  //   setSubmitting(true);
  //   const user = new FormData();

  //   user.append("customer_id", values.customer_id);
  //   user.append("user_id", values.user_id);
  //   user.append("file_1", values.file_1);
  //   user.append("file_2", values.file_2);

  //   console.log("Data of File:", user);
  //   props.onUpdateCasesData(data, user, toggle2, setSubmitting);
  //   return;
  // };

  const handleSubmit2 = (values, { setSubmitting }) => {
    console.log("values in File:", values);
    setIsLoading(true);
    setSubmitting(true);
    const user = new FormData();

    user.append("case_id", values.case_id);
    user.append("name", values.name);
    user.append("file", values.file);

    authAxios
      .post(baseUrl + "cases-images", user)
      .then((res) => {
        console.log("res of Case Image", res);
        swal(`Successfully Uploaded ${values.name}`).then(() => {
          toggle();
          props.onCasesGetData(data);
          props.casesEditGetData(data);
          setSubmitting(false);
          setIsLoading(false);
        });
      })
      .catch((err) => {
        console.log("error of  Case Image", err.response);
        setSubmitting(false);
        setIsLoading(false);
      });

    return;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    
    console.log("values in Cases:", values);

    const user = new FormData();

    user.append("case_id", values.case_id);
    user.append("sheet", values.fileExcel);

 

    console.log("Data of cases:", user, values.fileExcel,values.case_id);

    authAxios
      .post("data-loggers-upload", user)
      .then((res) => {
        console.log("res of excel upload", res);
        swal("Successfully uploaded Excel").then(() => {
          // props.onRawDataGetData(data);
          props.onSheetGetData(data);
          // props.testsEditGetData(data);
          setSubmitting(false);
          toggle2();
        });
      })
      .catch((err) => {
        console.log("error of excel upload", err.response);
        setSubmitting(false);
      });
    setSubmitting(true);
    // props.toggle("area");
    return;
  };
  console.log("object221",props?.sheet?.sheet?.data?.length)
  const handleDelete = (values, { setSubmitting }) => {
    
    console.log("values in Cases:", values);

    const user = new FormData();

    user.append("case_id", values.case_id);
    user.append("sheet", values.fileExcel);

 
    console.log("Data of cases:", user, values.fileExcel,values.case_id);

    authAxios
      .post("data-loggers-upload", user)
      .then((res) => {
        console.log("res of excel upload", res);
        swal("Successfully uploaded Excel").then(() => {
          // props.onRawDataGetData(data);
          props.onSheetGetData(data);
          // props.testsEditGetData(data);
          setSubmitting(false);
          toggle2();
        });
      })
      .catch((err) => {
        console.log("error of excel upload", err.response);
        setSubmitting(false);
      });
    setSubmitting(true);
    // props.toggle("area");
    return;
  };
  
  const fieldsExcelSubmit = (values)=>{

    const dataE=[
      {"execl_fields_1":values.execl_fields_1,
        "execl_fields_2":values.execl_fields_2,
        "execl_fields_3":values.execl_fields_3}
    ]
    console.log("ExcelFields","data",dataE)
    dispatch(ExcelFields(dataE))
  }


  return (
    <Card>
      <CardHeader className="bg-warning text-white">
        <div className="d-flex" style={{"justifyContent":"space-between"}}>
          <strong>Data and Position of Loggers</strong>
          <div>

          <Button
            className="btn-success  float-right"
            onClick={() => {
              toggle();
            }}
          >
            Add Layout Image
          </Button>
          <a href={`${imageUrl}demo/data_loggers.xlsx`} download="DemoData">
            <Button className="btn mr-3">Demo Data</Button>
          </a>
            </div>
        </div>
        <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add New Layout Image Data</ModalHeader>
          {isLoading ? ( // if true show spinner
            <LinearProgress />
          ) : (
            ""
          )}
          <ModalBody>
            {props.cases?.cases
              ?.filter((c) => c.id == param.id)
              .map((user) => {
                return (
                  <Formik
                    key={user.id}
                    initialValues={{
                      case_id: user.id,
                      name: "",
                      file: "",
                    }}
                    onSubmit={handleSubmit2}
                    >
                    {(formProps) => {
                      return (
                        <Form>
                          <Row className="form-group">
                            <Col md={6}>
                              <Label for="name">
                                Enter Layout Name (Like schematic_1 or
                                isometric_1 )
                              </Label>
                              <InputGroup>
                                <Field
                                  component={CustomSelect}
                                  type="select"
                                  name="name"
                                  id="name"
                                  placeholder="Enter Layout Name"
                                  className={
                                    "form-control" +
                                    (formProps.errors.name &&
                                      formProps.touched.name
                                      ? " is-invalid"
                                      : "")
                                    }
                                    >
                                  <option value="">Select Layout Name</option>
                                  <option value="schematic_1">
                                    Schematic Layout 1
                                  </option>
                                  <option value="schematic_2">
                                    Schematic Layout 2
                                  </option>
                                  <option value="schematic_3">
                                    Schematic Layout 3
                                  </option>
                                  <option value="schematic_4">
                                    Schematic Layout 4
                                  </option>
                                  <option value="schematic_5">
                                    Schematic Layout 5
                                  </option>
                                  <option value="schematic_6">
                                    Schematic Layout 6
                                  </option>
                                  <option value="schematic_7">
                                    Schematic Layout 7
                                  </option>
                                  <option value="isometric_1">
                                    Isometric Layout 1
                                  </option>
                                  <option value="isometric_2">
                                    Isometric Layout 2
                                  </option>
                                  <option value="isometric_3">
                                    Isometric Layout 3
                                  </option>
                                  <option value="isometric_4">
                                    Isometric Layout 4
                                  </option>
                                  <option value="isometric_5">
                                    Isometric Layout 5
                                  </option>
                                  <option value="isometric_6">
                                    Isometric Layout 6
                                  </option>
                                  <option value="postion_logger_1">
                                    Position Logger 1
                                  </option>
                                  <option value="postion_logger_2">
                                    Position Logger 2
                                  </option>
                                  <option value="postion_logger_3">
                                    Position Logger 3
                                  </option>
                                  <option value="postion_logger_4">
                                    Position Logger 4
                                  </option>
                                  <option value="postion_logger_5">
                                    Position Logger 5
                                  </option>
                                  <option value="hot_spot">
                                  Hot and Cold Spot - Range 1
                                  </option>
                                  <option value="cold_spot">
                                  Hot and Cold Spot - Range 2
                                  </option>
                                  <option value="cold_spot3">
                                  Hot and Cold Spot - Range 3
                                  </option>
                                </Field>

                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="invalid-feedback"
                                  />
                              </InputGroup>
                            </Col>
                            <Col md={6}>
                              <Label for="file">Upload Image</Label>
                              <FormGroup>
                                {user.file == "nofile.pdf" ? (
                                  <InputGroup>
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
                                      className="form-group"
                                    />
                                  </InputGroup>
                                ) : (
                                  <InputGroup>
                                    <a
                                      target={"blank"}
                                      href={`${imageUrl}Cases-Files/${user.file}`}
                                      rel="noreferrer"
                                      >
                                      {user?.file}
                                    </a>
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
                                      className="form-group"
                                    />
                                  </InputGroup>
                                )}
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
          </ModalBody>
        </Modal>
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
                  case_id: user.id,
                  user_id: user.user_id,
                  file_1: user.file_1,
                  file_2: user.file_2,
                  fileExcel: user.fileExcel,
                  execl_fields_1:user.execl_fields_1,
                  execl_fields_2:user.execl_fields_2,
                  execl_fields_3:user.execl_fields_3,
                }}
                onSubmit={handleSubmit}
                onReset={handleDelete}
                >
                {(formProps) => {
                  return (
                    <>

                    
                    <Form>
                      <Row className="form-group">
                            <Col md={6}>
                            <Label for="file">Upload Excel</Label>
                      <div style={props?.sheet?.sheet?.data?.length >= 1 ?{color:"red"}:{display:"none"}}>Alert: Already uploded Excel</div>
                          <InputGroup>
                           
                         
                            <input
                              component={CustomInput}
                              type="file"
                              name="fileExcel"
                              placeholder=""
                              id="fileExcel"
                              onChange={(event) => {
                                formProps.setFieldValue(
                                  "fileExcel",
                                  event.currentTarget.files[0]
                                  );
                                }}
                                className={
                                "form-control" +
                                (formProps.errors.fileExcel && formProps.touched.fileExcel
                                  ? " is-invalid"
                                  : "")
                              }
                              />
                          <ErrorMessage
                            name="file"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                              </Col>
                      <Col md={6}></Col>
                      </Row>
                    <Row style={{ justifyContent: "center" }}>
                        <Col md={4}>
                          <Button

                           type="reset" color="danger" block>
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
                    </>
                  );

                }}
              </Formik>
            );
          })}
      </CardBody>
  
      <CardBody style={{ height: "550px", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={props.cases?.isLoading ? true : false}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          disableSelectionOnClick
          // checkboxSelection
          // autoHeight
        />
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    cases: state.cases,
    editcase: state.cases.editcase,
    sheet: state.sheet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateCasesData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateCasesData(data, user, toggle, setSubmitting)),
      onSheetGetData: (data) =>
      dispatch(actions.sheetGetData(data)),
    onCasesGetData: (data) => dispatch(actions.casesGetData(data)),
    casesEditGetData: (data) => dispatch(actions.casesEditGetData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Data);

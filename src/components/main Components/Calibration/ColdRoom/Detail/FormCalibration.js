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

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import CustomInput from "../../../../../views/custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../../../redux/action";
import Loader2 from "../../../../loader/Loader2";
import CustomSelect from "../../../../../views/custom/CustomSelect";
import { useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import ON_TOGGLE_AC from "../../../../../redux/action/ActionTypeAc";
import Switch from "@mui/material/Switch";
import { useDispatch } from "react-redux";

function FormCalibration(props) {
  const accessToken = `${props.login?.login?.token}`;
  const param = useParams();

  let data = {
    token: accessToken,
    id: param?.id,
    caseId: param?.id,
  };
  React.useEffect(() => {
    props.calibrationGetData(data);
  }, []);
  const isEqualPage = function (data) {
    return data?.case_id == param?.id;
  };

 
 
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const toggle = () => {
    props.toggle("final");
  };



  const rows= props.calibration?.isLoading
    ? []
   : props.calibration?.calibration?.length > 0
   ? props.calibration?.calibration
   .find((row,i) => {
     return row?.id== param?.id
   })
   : [];

   console.log("object",rows,props,param?.id)


  // console.log(data,props,"data11",acData,isCase)
  // filter

  const isEqual = function (data) {
    // console.log("object",data.cases_id)
    return data?.cases_id == param.id;
  };



  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Cases:", values);

    const user2 = {
      name: values.name,
      address: values.address,
      cert_no: values.cert_no,
      service_no: values.service_no,
      calibration_date: values.calibration_date,
      next_due_date: values.next_due_date,
      issue_date: values.issue_date,
      humidity: values.humidity,
      calibration_location: values.calibration_location,
      item_condition: values.item_condition,
      item_date_receipt: values.item_date_receipt,
      discipline: values.discipline,
      calibration_procedure: values.calibration_procedure,
      reference_used: values.reference_used,
      serial_no: values.serial_no,
      instrument_id: values.instrument_id,
      range: values.range,
      make: values.make,
      least_count: values.least_count,
      model: values.model,
      accuracy: values.accuracy,
      standard_used: values.standard_used,
      calibrated_by: values.calibrated_by,
      valid_upto: values.valid_upto,
      issued_to: values.issued_to,
      instrument_name: values.instrument_name,
      parameter: values.parameter,
      location: values.location,
      uuc_condition: values.uuc_condition,
      challan_no: values.challan_no,
      next_calibration_date: values.next_calibration_date,
      receipt_date: values.receipt_date,
      calibration_frequency: values.calibration_frequency,
      env_condition: values.env_condition,
      temperature: values.temperature,
      basis_calibration: values.basis_calibration,
      equipment: values.equipment,
      make_table: values.make_table,
      id_no: values.id_no,
      certificate_table_no: values.certificate_table_no,
      certificate_valid_upto: values.certificate_valid_upto,
      case_id: values.case_id,
      is_pressure_guage: values.is_pressure_guage,
      calibration_table: values.calibration_table,
    };

    console.log("object333", user2, values.calibration_table);
    setSubmitting(true);
    console.log("Data of cases:", data, values.volume_area);

    props.updateCalibration(data, user2, toggle);

    return;
  };

  return (
    <Card>
      <CardHeader className="bg-success text-white">
        <div className="">
          <i className="fa fa-home mr-1" />
          <strong>Details Of Form</strong>
        </div>
      </CardHeader>
      <CardBody>
        <Formik
          // key={user.id}
          initialValues={{
            name: rows.name,
            address: rows.address,
            cert_no: rows.cert_no,
            service_no: rows.service_no,
            calibration_date: rows.calibration_date,
            next_due_date: rows.next_due_date,
            issue_date: rows.issue_date,
            humidity: rows.humidity,
            calibration_location: rows.calibration_location,
            item_condition: rows.item_condition,
            item_date_receipt: rows.item_date_receipt,
            discipline: rows.discipline,
            calibration_procedure: rows.calibration_procedure,
            reference_used: rows.reference_used,
            serial_no: rows.serial_no,
            instrument_id: rows.instrument_id,
            range: rows.range,
            make: rows.make,
            least_count: rows.least_count,
            model: rows.model,
            accuracy: rows.accuracy,
            standard_used: rows.standard_used,
            calibrated_by: rows.calibrated_by,
            valid_upto: rows.valid_upto,
            issued_to: rows.issued_to,
            instrument_name: rows.instrument_name,
            parameter: rows.parameter,
            location: rows.location,
            uuc_condition: rows.uuc_condition,
            challan_no: rows.challan_no,
            next_calibration_date: rows.next_calibration_date,
            receipt_date: rows.receipt_date,
            calibration_frequency: rows.calibration_frequency,
            env_condition: rows.env_condition,
            temperature: rows.temperature,
            basis_calibration: rows.basis_calibration,
            equipment: rows.equipment,
            make_table: rows.make_table,
            id_no: rows.id_no,
            certificate_table_no: rows.certificate_table_no,
            certificate_valid_upto: rows.certificate_valid_upto,
            case_id: rows.case_id,
            is_pressure_guage: rows.is_pressure_guage,
            calibration_table: rows.calibration_table,
            // calibration_table: [],
          }}
          onSubmit={handleSubmit}
          // onReset={() => handleReset(userId)}
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
                        <Label for="name">Company Name</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="select"
                            name="name"
                            id="name"
                            placeholder="Company Name"
                            className={
                              "form-control" +
                              (formProps.errors.name &&
                              formProps.touched.name
                                ? " is-invalid"
                                : "")
                            }
                            >
                            <option value="">Select Company</option>
                            {props.company?.map((cust) => {
                              return (
                                <option value={cust.name}>{cust.name}</option>
                              );
                            })}
                            </Field>

                          <ErrorMessage
                            name="name"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                            <Col md={6}>
                        <Label for="address">
                          Address
                        </Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="address"
                            id="address"
                            placeholder="Address"
                            className={
                              "form-control" +
                              (formProps.errors.address &&
                              formProps.touched.address
                                ? " is-invalid"
                                : "")
                            }
                            >
                            <option value="">Select Customer Address</option>
                            {props.company
                              ?.filter(
                                (c) => c.name == formProps.values.name
                              )
                              .map((cust) =>
                                cust.addresses?.map((addr) => (
                                  <option
                                    value={`${addr.location} ${addr.area} ${addr.city}`}
                                  >{`${addr.location} ${addr.area} ${addr.city}`}</option>
                                ))
                              )}
                          </Field>

                          <ErrorMessage
                            name="address"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                  <Col md={6}>
                    <Label for="cert_no">Certificate No.</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="cert_no"
                          id="cert_no"
                          placeholder="Certificate No."
                          className={
                            "form-control" +
                            (formProps.errors.cert_no &&
                            formProps.touched.cert_no
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="service_no">Service Request No.</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="service_no"
                          id="service_no"
                          placeholder="Service Request No."
                          className={
                            "form-control" +
                            (formProps.errors.service_no &&
                            formProps.touched.service_no
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="calibration_date">Calibration Date</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="date"
                          name="calibration_date"
                          id="calibration_date"
                          placeholder="Calibration Date"
                          className={
                            "form-control" +
                            (formProps.errors.calibration_date &&
                            formProps.touched.calibration_date
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="next_due_date">Next Due Date</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="date"
                          name="next_due_date"
                          id="next_due_date"
                          placeholder="Next Due Date"
                          className={
                            "form-control" +
                            (formProps.errors.next_due_date &&
                            formProps.touched.next_due_date
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="issue_date">Issue Date</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="date"
                          name="issue_date"
                          id="issue_date"
                          placeholder="Issue Date"
                          className={
                            "form-control" +
                            (formProps.errors.issue_date &&
                            formProps.touched.issue_date
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="basis_calibration">ULR No.</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="basis_calibration"
                          id="basis_calibration"
                          placeholder="ULR No."
                          className={
                            "form-control" +
                            (formProps.errors.basis_calibration &&
                            formProps.touched.basis_calibration
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="humidity">Environmental Condition</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="humidity"
                          id="humidity"
                          placeholder="humidity"
                          className={
                            "form-control" +
                            (formProps.errors.humidity &&
                            formProps.touched.humidity
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="temperature">Environmental Condition</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="temperature"
                          id="temperature"
                          placeholder="temperature"
                          className={
                            "form-control" +
                            (formProps.errors.temperature &&
                            formProps.touched.temperature
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="calibration_location">
                      Location Of Calibration
                    </Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="calibration_location"
                          id="calibration_location"
                          placeholder="calibration_location"
                          className={
                            "form-control" +
                            (formProps.errors.calibration_location &&
                            formProps.touched.calibration_location
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="discipline">Discipline</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="discipline"
                          id="discipline"
                          placeholder="Discipline"
                          className={
                            "form-control" +
                            (formProps.errors.discipline &&
                            formProps.touched.discipline
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="item_condition">Condition Of Item</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="item_condition"
                          id="item_condition"
                          placeholder="Condition Of Item"
                          className={
                            "form-control" +
                            (formProps.errors.item_condition &&
                            formProps.touched.item_condition
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="calibration_procedure">
                      Calibration Procedure
                    </Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="calibration_procedure"
                          id="calibration_procedure"
                          placeholder="Calibration Procedure"
                          className={
                            "form-control" +
                            (formProps.errors.calibration_procedure &&
                            formProps.touched.calibration_procedure
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="item_date_receipt">
                      Date Of Reciept of Item
                    </Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="date"
                          name="item_date_receipt"
                          id="item_date_receipt"
                          placeholder="Date Of Reciept of Item"
                          className={
                            "form-control" +
                            (formProps.errors.item_date_receipt &&
                            formProps.touched.item_date_receipt
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="reference_used">Reference Used</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="reference_used"
                          id="reference_used"
                          placeholder="Reference Used"
                          className={
                            "form-control" +
                            (formProps.errors.reference_used &&
                            formProps.touched.reference_used
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="instrument_name">Instrument Name</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="instrument_name"
                          id="instrument_name"
                          placeholder="Instrument Name"
                          className={
                            "form-control" +
                            (formProps.errors.instrument_name &&
                            formProps.touched.instrument_name
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="serial_no">Serial No.</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="serial_no"
                          id="serial_no"
                          placeholder="Serial No."
                          className={
                            "form-control" +
                            (formProps.errors.serial_no &&
                            formProps.touched.serial_no
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="instrument_id">Instrument ID</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="instrument_id"
                          id="instrument_id"
                          placeholder="Instrument ID"
                          className={
                            "form-control" +
                            (formProps.errors.instrument_id &&
                            formProps.touched.instrument_id
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="range">Range</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="range"
                          id="range"
                          placeholder="Range"
                          className={
                            "form-control" +
                            (formProps.errors.range && formProps.touched.range
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="make">Make</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="make"
                          id="make"
                          placeholder="Make"
                          className={
                            "form-control" +
                            (formProps.errors.make && formProps.touched.make
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="least_count">Least Count</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="least_count"
                          id="least_count"
                          placeholder="Least Count"
                          className={
                            "form-control" +
                            (formProps.errors.least_count &&
                            formProps.touched.least_count
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="model">Model</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="model"
                          id="model"
                          placeholder="Model"
                          className={
                            "form-control" +
                            (formProps.errors.model && formProps.touched.model
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="accuracy">Accuracy</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="accuracy"
                          id="accuracy"
                          placeholder="Accuracy"
                          className={
                            "form-control" +
                            (formProps.errors.accuracy &&
                            formProps.touched.accuracy
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="standard_used">Standard Used</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="standard_used"
                          id="standard_used"
                          placeholder="Standard Used"
                          className={
                            "form-control" +
                            (formProps.errors.standard_used &&
                            formProps.touched.standard_used
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="make_table">Make / Model</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="make_table"
                          id="make_table"
                          placeholder="Make / Model"
                          className={
                            "form-control" +
                            (formProps.errors.make_table &&
                            formProps.touched.make_table
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="id_no">ID No.</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="id_no"
                          id="id_no"
                          placeholder="ID No."
                          className={
                            "form-control" +
                            (formProps.errors.id_no && formProps.touched.id_no
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="certificate_table_no">Certificate No.</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="certificate_table_no"
                          id="certificate_table_no"
                          placeholder="Certificate No."
                          className={
                            "form-control" +
                            (formProps.errors.certificate_table_no &&
                            formProps.touched.certificate_table_no
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="calibrated_by">Calibrated By</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="text"
                          name="calibrated_by"
                          id="calibrated_by"
                          placeholder="Calibrated By"
                          className={
                            "form-control" +
                            (formProps.errors.calibrated_by &&
                            formProps.touched.calibrated_by
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="valid_upto">Valid Upto</Label>
                    <InputGroup>
                      {props.calibration?.isLoading ? (
                        <Loader2 />
                      ) : (
                        <Field
                          component={CustomInput}
                          type="date"
                          name="valid_upto"
                          id="valid_upto"
                          placeholder="Valid Upto"
                          className={
                            "form-control" +
                            (formProps.errors.valid_upto &&
                            formProps.touched.valid_upto
                              ? " is-invalid"
                              : "")
                          }
                        />
                      )}
                    </InputGroup>
                  </Col>
                </Row>
                {console.log(formProps.values.calibration_table)}

                <Row className="form-group"></Row>
                <Row>
                  <Label for="calibration_table">
                    Calibration Results Table
                  </Label>
                  <Col md={12} className="pb-4">
                    <FieldArray
                      name="calibration_table"
                      render={(arrayHelpers) => (
                        <div>
                          <Row>
                            <Col md={2}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="type"
                                name="type"
                                label="Type"
                                value={formProps.values.type}
                                onChange={formProps.handleChange}
                              />
                            </Col>
                            <Col md={2}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="range"
                                name="range"
                                label="Range"
                                value={formProps.values.range}
                                onChange={formProps.handleChange}
                              />
                            </Col>
                            <Col md={2}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="unit"
                                name="unit"
                                label="Unit"
                                value={formProps.values.unit}
                                onChange={formProps.handleChange}
                              />
                            </Col>
                            <Col md={2}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="calibration_point"
                                name="calibration_point"
                                label="Calibration Point"
                                value={formProps.values.calibration_point}
                                onChange={formProps.handleChange}
                              />
                            </Col>
                            <Col md={2}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="standard_reading"
                                name="standard_reading"
                                label="Standard Reading"
                                value={formProps.values.standard_reading}
                                onChange={formProps.handleChange}
                              />
                            </Col>
                            <Col md={2}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="uuc_reading"
                                name="uuc_reading"
                                label="UUC Reading"
                                value={formProps.values.uuc_reading}
                                onChange={formProps.handleChange}
                              />
                            </Col>
                            <Col md={2}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="deviation"
                                name="deviation"
                                label="Deviation"
                                value={formProps.values.deviation}
                                onChange={formProps.handleChange}
                              />
                            </Col>
                            <Col md={2}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="expanded_uncertainty"
                                name="expanded_uncertainty"
                                label="Expanded Uncertainty"
                                value={formProps.values.expanded_uncertainty}
                                onChange={formProps.handleChange}
                              />
                            </Col>

                            <Col>
                              <Button
                                color="success"
                                variant="contained"
                                onClick={() => {  
                                  arrayHelpers.push({
                                    range: formProps.values.range,
                                    type: formProps.values.type,
                                    unit: formProps.values.unit,
                                    calibration_point:
                                      formProps.values.calibration_point,
                                    standard_reading:
                                      formProps.values.standard_reading,
                                    uuc_reading: formProps.values.uuc_reading,
                                    deviation: formProps.values.deviation,
                                    expanded_uncertainty:
                                      formProps.values.expanded_uncertainty,
                                  });
                                  {
                                    formProps.setFieldValue("unit", "");
                                    formProps.setFieldValue("type", "");
                                    formProps.setFieldValue("range", "");
                                    formProps.setFieldValue(
                                      "calibration_point",
                                      ""
                                    );
                                    formProps.setFieldValue(
                                      "standard_reading",
                                      ""
                                    );
                                    formProps.setFieldValue("uuc_reading", "");
                                    formProps.setFieldValue("deviation", "");
                                    formProps.setFieldValue(
                                      "expanded_uncertainty",
                                      ""
                                    );
                                  }
                                }}
                                size="large"
                              >
                                <AddIcon fontSize="inherit" />
                              </Button>
                            </Col>
                          </Row>
                          <Table
                            size="xl"
                            className="mt-3"
                            bordered
                            style={{ textAlign: "center" }}
                          >
                            <thead>
                              <tr>
                                <th>Sr No.</th>
                                <th>Type</th>
                                <th>Range</th>
                                <th>Unit</th>
                                <th>Calibration Point</th>
                                <th>Standard Reading</th>
                                <th>UUC Reading</th>
                                <th>Deviation</th>
                                <th>Expanded Uncertainty</th>
                              </tr>
                            </thead>

                            <tbody>
                              {formProps?.values?.calibration_table?.map(
                                (document, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>{index + 1}</td>

                                      <td>
                                        <TextField
                                          fullWidth
                                          size="small"
                                          label="Type"
                                          variant="outlined"
                                          name={`document.${index}.type`}
                                          value={document.type}
                                          id="type"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                        fullWidth
                                          size="small"
                                          label="Range"
                                          variant="outlined"
                                          name={`document.${index}.range`}
                                          value={document.range}
                                          id="range"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          size="small"
                                          label="Unit"
                                          variant="outlined"
                                          name={`document.${index}.unit`}
                                          value={document.unit}
                                          id="unit"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          size="small"
                                          label="Calibration Point"
                                          variant="outlined"
                                          name={`document.${index}.calibration_point`}
                                          value={document.calibration_point}
                                          id="calibration_point"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          size="small"
                                          label="Standard Reading"
                                          variant="outlined"
                                          name={`document.${index}.standard_reading`}
                                          value={document.standard_reading}
                                          id="standard_reading"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          size="small"
                                          label="UUC Reading"
                                          variant="outlined"
                                          name={`document.${index}.uuc_reading`}
                                          value={document.uuc_reading}
                                          id="uuc_reading"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          size="small"
                                          label="Deviation"
                                          variant="outlined"
                                          name={`document.${index}.deviation`}
                                          value={document.deviation}
                                          id="deviation"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          size="small"
                                          label="Expanded Uncertainty"
                                          variant="outlined"
                                          name={`document.${index}.expanded_uncertainty`}
                                          value={document.expanded_uncertainty}
                                          id="expanded_uncertainty"
                                          onChange={formProps.handleChange}
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
                      block
                    >
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
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    cases: state.cases,
    calibration: state.calibration,
    company: state.company.company,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
   
    updateCalibration: (data, user, toggle) =>
      dispatch(actions.updateCalibration(data, user, toggle)),
      calibrationGetData: (data) =>
      dispatch(actions.calibrationGetData(data)),
   
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FormCalibration);

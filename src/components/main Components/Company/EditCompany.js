/* eslint-disable eqeqeq */
import { ErrorMessage, Field, Formik, Form, FieldArray } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../redux/action";

import {
  Button,
  Col,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  FormGroup,
  Card,
} from "reactstrap";
import CustomInput from "../../../views/custom/CustomInput";
import CustomSelect from "../../../views/custom/CustomSelect";
import TextField from "../../../Helpers/TextField";
import { imageUrl } from "../../../shared/imageUrl";

function EditCompany(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
    id: props.data?.id,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Vendor:", values);

    const user = new FormData();
    values.files?.map((file, index) => {
      console.log("files", file);
      return user.append(`files[${index}]`, file);
    });

    user.append("name", values.name);
    user.append("addresses", JSON.stringify(values.addresses));
    // user.append("delete_addresses", JSON.stringify(values.delete_addresses));
    user.append("is_active", values.is_active);
    user.append("internal", values.internal);
    user.append("pan_no", values.pan_no);
    user.append("gstin", values.gstin);
    user.append("bank", values.bank);
    user.append("branch", values.branch);
    user.append("beneficiary", values.beneficiary);
    user.append("current_ac", values.current_ac);
    user.append("ifsc_code", values.ifsc_code);

    console.log("Data of Vendor:", user);
    props.onUpdateCompanyData(data, user, toggle, setSubmitting);
    setSubmitting(true);
  };

  return (
    <div>
      <Button
        className="btn-warning p-1"
        onClick={() => {
          toggle();
        }}
      >
        <i className="fa fa-edit" aria-hidden="true"></i>
      </Button>
      <Modal
        className="modal-info modal-lg"
        isOpen={modal}
        toggle={toggle}
        // backdrop="static"
      >
        <ModalHeader toggle={toggle}>Edit Company</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: props.data?.name,
              is_active: props.data?.is_active,
              internal: props.data?.internal,
              pan_no: props.data?.pan_no,
              gstin: props.data?.gstin,
              bank: props.data?.bank,
              branch: props.data?.branch,
              beneficiary: props.data?.beneficiary,
              current_ac: props.data?.current_ac,
              ifsc_code: props.data?.ifsc_code,
              files: props.data?.files ?? [],
              addresses: [],
              billing_address:
                props.data?.addresses?.filter((a) => a.is_shipping == 0)
                  .length > 0
                  ? props.data?.addresses?.filter((a) => a.is_shipping == 0)
                  : [
                      {
                        is_shipping: 0,
                        email: "",
                        phone: "",
                        address: "",
                        location: "",
                        area: "",
                        city: "",
                        state: "",
                        country: "",
                        pincode: "",
                        contact_name: "",
                        contact_number: "",
                      },
                    ],
              shipping_address:
                props.data?.addresses?.filter((a) => a.is_shipping == 1)
                  .length > 0
                  ? props.data?.addresses?.filter((a) => a.is_shipping == 1)
                  : [
                      {
                        is_shipping: 1,
                        email: "",
                        phone: "",
                        address: "",
                        location: "",
                        area: "",
                        city: "",
                        state: "",
                        country: "",
                        pincode: "",
                        contact_name: "",
                        contact_number: "",
                      },
                    ],
              delete_addresses: [],
            }}
            onSubmit={handleSubmit}
          >
            {(formProps) => {
              var billing_address = formProps.values?.billing_address;
              var shipping_address = formProps.values?.shipping_address;
              var addresses = [...billing_address, ...shipping_address];
              formProps.values.addresses = addresses;
              var billing_actual_address =
                formProps.values.billing_address?.filter(
                  (bill_add) => bill_add.location !== 0
                );
              console.log("formProps.values", formProps.values);
              // console.log("Deleted billing_address", billing_actual_address);

              return (
                <Form enctype="multipart/form-data">
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="discount">Name</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Enter Full Name"
                          className={
                            "form-control" +
                            (formProps.errors.name && formProps.touched.name
                              ? " is-invalid"
                              : "")
                          }
                        />

                        <ErrorMessage
                          name="name"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="internal">Select Under Company</Label>
                      <InputGroup>
                        <Field
                          component={CustomSelect}
                          type="select"
                          name="internal"
                          id="internal"
                          className="form-control"
                        >
                          <option value="">Select Under Company</option>
                          <option value={1}>Internal</option>
                          <option value={0}>External</option>
                        </Field>
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="pan_no">Enter Pan No</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="pan_no"
                          id="pan_no"
                          placeholder="Enter Pan no"
                          className={
                            "form-control" +
                            (formProps.errors.pan_no && formProps.touched.pan_no
                              ? " is-invalid"
                              : "")
                          }
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="bank">Enter Bank Name</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="bank"
                          id="bank"
                          placeholder="Enter Bank Name"
                          className={
                            "form-control" +
                            (formProps.errors.bank && formProps.touched.bank
                              ? " is-invalid"
                              : "")
                          }
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="branch">Enter Branch</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="branch"
                          id="branch"
                          placeholder="Enter Branch"
                          className={
                            "form-control" +
                            (formProps.errors.branch && formProps.touched.branch
                              ? " is-invalid"
                              : "")
                          }
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="beneficiary">Enter Beneficiary Name</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="beneficiary"
                          id="beneficiary"
                          placeholder="Enter Beneficiary Name"
                          className={
                            "form-control" +
                            (formProps.errors.beneficiary &&
                            formProps.touched.beneficiary
                              ? " is-invalid"
                              : "")
                          }
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="current_ac">Enter CURRENT ACC. NO</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="current_ac"
                          id="current_ac"
                          placeholder="Enter CURRENT ACC. NO"
                          className={
                            "form-control" +
                            (formProps.errors.current_ac &&
                            formProps.touched.current_ac
                              ? " is-invalid"
                              : "")
                          }
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="ifsc_code">Enter IFSC Code</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="ifsc_code"
                          id="ifsc_code"
                          placeholder="Enter IFSC Code"
                          className={
                            "form-control" +
                            (formProps.errors.ifsc_code &&
                            formProps.touched.ifsc_code
                              ? " is-invalid"
                              : "")
                          }
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="gstin">Enter Gstin</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="gstin"
                          id="gstin"
                          placeholder="Enter Gstin"
                          className={
                            "form-control" +
                            (formProps.errors.gstin && formProps.touched.gstin
                              ? " is-invalid"
                              : "")
                          }
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="is_active">Select Status</Label>
                      <InputGroup>
                        <Field
                          component={CustomSelect}
                          type="select"
                          name="is_active"
                          id="is_active"
                          placeholder="Select Role"
                          className="form-control"
                        >
                          <option value="">Select Status</option>
                          <option value={1}>Active</option>
                          <option value={0}>Passive</option>
                        </Field>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={10}>
                      <Label for="file">Upload Mutliple Agreement</Label>
                      <InputGroup>
                        <input
                          component={CustomInput}
                          type="file"
                          name="files"
                          id="files"
                          multiple
                          onChange={(e) => {
                            // console.log("files", e.target.files);
                            formProps.setFieldValue("files", [
                              ...e.target.files,
                            ]);
                          }}
                          className={
                            "form-control" +
                            (formProps.errors.files && formProps.touched.files
                              ? " is-invalid"
                              : "")
                          }
                        />

                        <ErrorMessage
                          name="files"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    {props.data?.files?.length > 0 &&
                      props.data?.files?.map((file, index) => {
                        return (
                          <Col>
                            <a
                              target={"blank"}
                              href={`${imageUrl}CompanyFiles/${file.file}`}
                              rel="noreferrer"
                            >
                              {file.file}
                            </a>
                          </Col>
                        );
                      })}
                  </Row>

                  <Col md={12} className="m-0 p-0">
                    <FieldArray
                      name="billing_address"
                      render={(arrayHelpers) => (
                        <>
                          <Card className="p-3" color="info">
                            {billing_actual_address?.map(
                              (bill_add, billIndex) => {
                                return (
                                  <div className="p-1">
                                    <Label>
                                      Billing Address {billIndex + 1}
                                    </Label>
                                    <Row className="form-group">
                                      <Col md={6}>
                                        <TextField
                                          name={`billing_address.${billIndex}.location`}
                                          placeholder="Enter Location"
                                          label="Enter Location"
                                          formProps={formProps}
                                        />
                                      </Col>
                                      <Col md={6}>
                                        <TextField
                                          name={`billing_address.${billIndex}.area`}
                                          label="Enter Area"
                                          formProps={formProps}
                                        />
                                      </Col>
                                    </Row>
                                    <Row className="form-group">
                                      <Col md={6}>
                                        <TextField
                                          name={`billing_address.${billIndex}.city`}
                                          label="Enter City"
                                          formProps={formProps}
                                        />
                                      </Col>
                                      <Col md={6}>
                                        <TextField
                                          name={`billing_address.${billIndex}.contact_name`}
                                          label="Enter Contact Person Name"
                                          formProps={formProps}
                                        />
                                      </Col>
                                    </Row>
                                    <Row className="form-group">
                                      <Col md={6}>
                                        <TextField
                                          name={`billing_address.${billIndex}.email`}
                                          type="email"
                                          label="Enter Email"
                                          formProps={formProps}
                                        />
                                      </Col>
                                      <Col md={6}>
                                        <TextField
                                          name={`billing_address.${billIndex}.phone`}
                                          label="Enter Mobile Number"
                                          formProps={formProps}
                                        />
                                      </Col>
                                    </Row>
                                    <div className="d-flex justify-content-end align-items-center p-2 pb-0">
                                      {formProps.values.billing_address.filter(
                                        (b) => b.location !== 0
                                      )?.length ==
                                        billIndex + 1 && (
                                        <Button
                                          className="btn-success p-1"
                                          onClick={() => {
                                            arrayHelpers.push({
                                              is_shipping: 0,
                                              email: "",
                                              phone: "",
                                              address: "",
                                              location: "",
                                              area: "",
                                              city: "",
                                              state: "",
                                              country: "",
                                              pincode: "",
                                              contact_name: "",
                                              contact_number: "",
                                            });
                                          }}
                                        >
                                          <i className="fa fa-plus" />
                                        </Button>
                                      )}

                                      {formProps.values.billing_address.filter(
                                        (b) => b.location !== 0
                                      )?.length > 1 && (
                                        <Button
                                          color="danger p-1 ml-3"
                                          size="sm"
                                          onClick={() => {
                                            console.log("billIndex", billIndex);
                                            formProps.setFieldValue(
                                              `billing_address.${billIndex}.location`,
                                              0
                                            );
                                          }}
                                        >
                                          <i className="fa fa-trash" />
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </Card>
                        </>
                      )}
                    />
                    <FieldArray
                      name="shipping_address"
                      render={(arrayHelpers) => (
                        <>
                          <Card className="p-3" color="warning">
                            {formProps.values.shipping_address
                              ?.filter((bill_add) => bill_add.location !== 0)
                              .map((bill_add, shipingIndex) => {
                                return (
                                  <div className="p-1">
                                    <Label>
                                      Shipping Address {shipingIndex + 1}{" "}
                                    </Label>
                                    <Row className="form-group">
                                      <Col md={6}>
                                        <TextField
                                          name={`shipping_address.${shipingIndex}.location`}
                                          placeholder="Enter Location"
                                          label="Enter Location"
                                          formProps={formProps}
                                        />
                                      </Col>
                                      <Col md={6}>
                                        <TextField
                                          name={`shipping_address.${shipingIndex}.area`}
                                          label="Enter Area"
                                          formProps={formProps}
                                        />
                                      </Col>
                                    </Row>
                                    <Row className="form-group">
                                      <Col md={6}>
                                        <TextField
                                          name={`shipping_address.${shipingIndex}.city`}
                                          label="Enter City"
                                          formProps={formProps}
                                        />
                                      </Col>
                                      <Col md={6}>
                                        <TextField
                                          name={`shipping_address.${shipingIndex}.contact_name`}
                                          label="Enter Contact Person Name"
                                          formProps={formProps}
                                        />
                                      </Col>
                                    </Row>
                                    <Row className="form-group">
                                      <Col md={6}>
                                        <TextField
                                          name={`shipping_address.${shipingIndex}.email`}
                                          type="email"
                                          label="Enter Email"
                                          formProps={formProps}
                                        />
                                      </Col>

                                      <Col md={6}>
                                        <TextField
                                          name={`shipping_address.${shipingIndex}.phone`}
                                          label="Enter Mobile Number"
                                          formProps={formProps}
                                        />
                                      </Col>
                                    </Row>
                                    <div className="d-flex justify-content-end align-items-center p-2 pb-0">
                                      {formProps.values.shipping_address?.filter(
                                        (b) => b.location !== 0
                                      )?.length ==
                                        shipingIndex + 1 && (
                                        <Button
                                          className="btn-success p-1"
                                          onClick={() => {
                                            arrayHelpers.push({
                                              is_shipping: 1,
                                              email: "",
                                              phone: "",
                                              address: "",
                                              location: "",
                                              area: "",
                                              city: "",
                                              state: "",
                                              country: "",
                                              pincode: "",
                                              contact_name: "",
                                              contact_number: "",
                                            });
                                          }}
                                        >
                                          <i className="fa fa-plus" />
                                        </Button>
                                      )}

                                      {formProps.values.shipping_address.filter(
                                        (b) => b.location !== 0
                                      )?.length > 1 && (
                                        <Button
                                          color="danger p-1 ml-3"
                                          size="sm"
                                          onClick={() => {
                                            formProps.setFieldValue(
                                              `shipping_address.${shipingIndex}.location`,
                                              0
                                            );
                                            // arrayHelpers.remove(shipingIndex);
                                            // formProps.values?.delete_addresses?.push(
                                            //   bill_add.id
                                            // );
                                          }}
                                        >
                                          <i className="fa fa-trash" />
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                          </Card>
                        </>
                      )}
                    />
                  </Col>

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
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
    company: state.company.company,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCompanyGetData: (data) => dispatch(actions.companyGetData(data)),
    onDeleteCompany: (data, id) => dispatch(actions.deleteCompany(data, id)),
    onPostCompanyData: (data, user, toggle) =>
      dispatch(actions.postCompanyData(data, user, toggle)),
    onUpdateCompanyData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateCompanyData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditCompany);

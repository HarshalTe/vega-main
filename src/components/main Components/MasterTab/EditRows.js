import { ErrorMessage, Field, Formik, Form } from "formik";
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
} from "reactstrap";
import CustomInput from "../../../views/custom/CustomInput";
import CustomSelect from "../../../views/custom/CustomSelect";

function EditRows(props) {
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
    console.log("values in Col:", values);

    const user = new FormData();

    user.append("name", values.name);

    props.onUpdateRowsData(data, user, toggle);
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
        backdrop="static"
      >
        <ModalHeader toggle={toggle}>Edit Row</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: props.data?.name,
              col_id: props.data?.col?.id,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required"),
              col_id: Yup.string().required("Col is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="col_id">Select Col</Label>
                    <InputGroup>
                      <Field
                        component={CustomSelect}
                        type="select"
                        name="col_id"
                        id="col_id"
                        placeholder="Enter Col"
                        className={
                          "form-control" +
                          (formProps.errors.col_id && formProps.touched.col_id
                            ? " is-invalid"
                            : "")
                        }
                      >
                        <option value="">Select Col</option>
                        {props.cols?.map((col) => (
                          <option value={col.id}>{col.name}</option>
                        ))}
                      </Field>

                      <ErrorMessage
                        name="col_id"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="name">Row Name</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Row Name"
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
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
    rows: state.rows.rows,
    cols: state.cols.cols,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRowsGetData: (data) => dispatch(actions.rowsGetData(data)),
    onDeleteRows: (data, id) => dispatch(actions.deleteRows(data, id)),
    onPostRowsData: (data, user, toggle) =>
      dispatch(actions.postRowsData(data, user, toggle)),
    onUpdateRowsData: (data, user, toggle) =>
      dispatch(actions.updateRowsData(data, user, toggle)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditRows);

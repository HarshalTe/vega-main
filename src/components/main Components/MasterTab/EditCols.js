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

function EditCols(props) {
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

    props.onUpdateColsData(data, user, toggle);
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
        <ModalHeader toggle={toggle}>Edit Col</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: props.data?.name,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="name">Col Name</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Col Name"
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
    cols: state.cols.cols,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onColsGetData: (data) => dispatch(actions.colsGetData(data)),
    onDeleteCols: (data, id) => dispatch(actions.deleteCols(data, id)),
    onPostColsData: (data, user, toggle) =>
      dispatch(actions.postColsData(data, user, toggle)),
    onUpdateColsData: (data, user, toggle) =>
      dispatch(actions.updateColsData(data, user, toggle)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditCols);

import { ErrorMessage, Field } from "formik";
import React from "react";
import { InputGroup, Label } from "reactstrap";
import CustomInput from "../views/custom/CustomInput";

function TextField({
  formProps,
  label,
  type,
  name,
  placeholder,
  id,
  ...props
}) {
  return (
    <>
      <Label for={name ?? ""}>{label ?? ""}</Label>
      <InputGroup>
        <Field
          component={CustomInput}
          type={type ?? "text"}
          name={name ?? ""}
          id={id ?? name}
          placeholder={placeholder ? placeholder : label ?? ""}
          className={
            "form-control" +
            (formProps?.errors?.name && formProps?.touched?.name
              ? " is-invalid"
              : "")
          }
        />

        <ErrorMessage
          name={name}
          component="div"
          className="invalid-feedback"
        />
      </InputGroup>
    </>
  );
}

export default TextField;

import React from "react";
import { useFormikContext } from "formik";
import AppErrorMessage from "./AppErrorMessage";
import AppPhoneInput from "../AppPhoneInput/AppPhoneInput";

function AppFormPhoneField({ name, parentStyles, style, ...otherProps }) {
  const { touched, setFieldTouched, errors, values, setFieldValue } =
    useFormikContext();

  return (
    <>
      <AppPhoneInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        parentStyles={parentStyles}
        style={style}
        {...otherProps}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPhoneField;

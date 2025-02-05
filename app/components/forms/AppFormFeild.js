import React from "react";
import { useFormikContext } from "formik";
import AppErrorMessage from "./AppErrorMessage";
import AppInput from "../AppInput";

function AppFormField({
  name,
  isPassword,
  parentStyles,
  style,
  ...otherProps
}) {
  const { touched, setFieldTouched, errors, values, setFieldValue } =
    useFormikContext();
  return (
    <>
      <AppInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        isPassword={isPassword}
        parentStyles={parentStyles}
        style={style}
        {...otherProps}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;

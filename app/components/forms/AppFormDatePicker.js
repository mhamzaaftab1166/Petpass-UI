import React from "react";
import { useFormikContext } from "formik";
import AppErrorMessage from "./AppErrorMessage";
import AppDatePicker from "../AppDate/AppDate";

const AppFormDatePicker = ({ name, placeholder, parentStyles }) => {
  const { setFieldValue, values, errors, touched } = useFormikContext();

  return (
    <>
      <AppDatePicker
        value={values[name]}
        onChange={(date) => setFieldValue(name, date)}
        placeholder={placeholder}
        parentStyles={parentStyles}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormDatePicker;

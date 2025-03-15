// AppFormPassportPicker.js
import React from "react";
import { useFormikContext } from "formik";
import AppPassportPicker from "../AppPassport/AppPassportPicker";
import AppErrorMessage from "./AppErrorMessage"; 

const AppFormPassportPicker = ({ name, pickerName }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <AppPassportPicker
        passportUri={values[name]}
        pickerName={pickerName}
        onSelectPassport={(uri) => setFieldValue(name, uri)}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormPassportPicker;

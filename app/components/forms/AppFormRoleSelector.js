import React from "react";
import { useFormikContext } from "formik";
import AppRoleSelector from "../AppRoleSelector/AppRoleSelector";
import AppErrorMessage from "./AppErrorMessage";

const AppFormRoleSelector = ({ name, parentStyles }) => {
  const { setFieldValue, values, touched, errors } = useFormikContext();

  return (
    <>
      <AppRoleSelector
        value={values[name]}
        onSelect={(role) => setFieldValue(name, role)}
        parentStyles={parentStyles}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormRoleSelector;

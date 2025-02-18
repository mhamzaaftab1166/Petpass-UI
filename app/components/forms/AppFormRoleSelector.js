import React from "react";
import { useFormikContext } from "formik";
import AppRoleSelector from "../AppRoleSelector/AppRoleSelector";
import AppErrorMessage from "./AppErrorMessage";

const AppFormRoleSelector = ({ name, roles, parentStyles }) => {
  const { setFieldValue, values, touched, errors } = useFormikContext();

  return (
    <>
      <AppRoleSelector
        roles={roles}
        value={values[name]}
        onSelect={(role) => {
          if (!values[name]?.includes(role)) {
            setFieldValue(name, [...values[name], role]);
          } else {
            setFieldValue(
              name,
              values[name].filter((r) => r !== role)
            );
          }
        }}
        parentStyles={parentStyles}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormRoleSelector;

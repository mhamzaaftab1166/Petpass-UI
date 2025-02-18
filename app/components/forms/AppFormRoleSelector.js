import React from "react";
import { useFormikContext } from "formik";
import AppRoleSelector from "../AppRoleSelector/AppRoleSelector";
import AppErrorMessage from "./AppErrorMessage";

const AppFormRoleSelector = ({ name, roles, parentStyles }) => {
  const { setFieldValue, values, touched, errors } = useFormikContext();

  // Function to handle role selection based on isOne value
  const handleSelect = (role) => {
    if (roles.isOne) {
      // For single selection, store the role as a string.
      setFieldValue(name, role);
    } else {
      // For multiple selections, manage an array.
      if (!values[name]?.includes(role)) {
        setFieldValue(name, [...values[name], role]);
      } else {
        setFieldValue(
          name,
          values[name].filter((r) => r !== role)
        );
      }
    }
  };

  // For UI purposes, ensure that the value passed to AppRoleSelector is always an array.
  const selectedValue = roles.isOne
    ? values[name]
      ? [values[name]]
      : []
    : values[name] || [];

  return (
    <>
      <AppRoleSelector
        roles={roles.data}
        value={selectedValue} // Pass array to UI for highlighting
        onSelect={handleSelect}
        parentStyles={parentStyles}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormRoleSelector;

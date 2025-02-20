import React from "react";
import { useFormikContext } from "formik";
import AppErrorMessage from "./AppErrorMessage";
import AppRangePicker from "../AppRangePicker/AppRangePicker";

function AppFormRangeField({
  name,
  minValue,
  maxValue,
  label,
  style,
  parentStyles,
  editable = true,
  ...otherProps
}) {
  const { touched, setFieldTouched, errors, values, setFieldValue } =
    useFormikContext();

  const handleRangeChange = (range) => {
    setFieldValue(name, { start: range.from, end: range.to });
  };

  return (
    <>
      <AppRangePicker
        value={values[name]}
        onChange={handleRangeChange}
        minValue={minValue}
        maxValue={maxValue}
        label={label}
        parentStyles={parentStyles}
        style={style}
        editable={editable}
        {...otherProps}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormRangeField;

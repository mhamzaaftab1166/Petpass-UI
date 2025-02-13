import React from "react";
import { useFormikContext } from "formik";
import AppImagePicker from "../AppImagePicker/AppImagePicker";
import AppErrorMessage from "./AppErrorMessage"; // Adjust the path if needed

const AppFormImagePicker = ({ name }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <AppImagePicker
        imageUri={values[name]}
        onSelectImage={(uri) => setFieldValue(name, uri)}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormImagePicker;

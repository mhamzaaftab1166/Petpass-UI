import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import AppPicker from "../AppPicker/AppPicker";
import AppErrorMessage from "./AppErrorMessage";

function AppFormPicker({
  items,
  name,
  placeholder,
  width,
  PickerItemComponent,
  numColumns,
  setState,
}) {
  const { touched, setFieldValue, values, errors } = useFormikContext();

  useEffect(() => {
    if (values.country && setState) {
      setState(values.country);
    }
    if ( values.pet_type && setState) {
      setState(values.pet_type);
    }
  }, [values.country, values.pet_type, setState]);

  return (
    <>
      <AppPicker
        width={width}
        items={items}
        placeholder={placeholder}
        numColumns={numColumns}
        PickerItemComponent={PickerItemComponent}
        onSelectedItem={(item) => setFieldValue(name, item)}
        selectedItem={values[name]}
      ></AppPicker>
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;

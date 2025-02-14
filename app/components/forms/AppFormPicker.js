import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";

import AppPicker from "../AppPicker/AppPicker";
import AppErrorMessage from "./AppErrorMessage";

function AppFormPicker({
  items,
  name,
  placeholder,
  width,
  PickerItemComponent,
  numColumns,
}) {
  const [country, setCountry] = useState("");
  const { touched, setFieldValue, values, errors } = useFormikContext();

  useEffect(() => {
    if (values.country) {
      setCountry(values.country.value); // Set the country value based on the selected country
    }
  }, [values.country]); // Update when country value changes

  console.log(values, 'values');
  console.log(country, 'selected country value'); 

  console.log(values, 'values');
  

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

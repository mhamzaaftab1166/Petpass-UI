import React, { useEffect } from "react";
import { useFormikContext } from "formik";

function AutoUpdateFields({ selectedPetType }) {
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (selectedPetType) {
      setFieldValue("color", null);
      setFieldValue("pet_breed", null);
      
    }
  }, [selectedPetType, setFieldValue]);

  return null;
}

export default AutoUpdateFields;

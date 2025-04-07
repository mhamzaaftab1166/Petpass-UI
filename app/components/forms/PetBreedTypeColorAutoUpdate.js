import { useFormikContext } from "formik";
import { useRef, useEffect } from "react";

function ResetBreedColorOnTypeChange() {
  const { values, initialValues, setFieldValue } = useFormikContext();
  // Store the initial pet_type (if provided) on mount
  const initialPetTypeRef = useRef(initialValues.pet_type);

  useEffect(() => {
    // Compare current pet type with the initial pet type.
    // If they are different, reset pet_breed and color fields.
    if (
      initialPetTypeRef.current &&
      values.pet_type &&
      values.pet_type.value !== initialPetTypeRef.current.value
    ) {
      setFieldValue("pet_breed", "");
      setFieldValue("color", "");
    }
  }, [values.pet_type, setFieldValue]);

  return null;
}

export default ResetBreedColorOnTypeChange;

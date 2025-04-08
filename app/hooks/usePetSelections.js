import { useMemo } from "react";

const usePetSelections = ({
  petData,
  petTypes = [],
  petBreeds = [],
  petColors = [],
  petaddresses = [],
  petNuetered = [],
  petActiveness = [],
}) => {
  const selections = useMemo(() => {
    const petType =
      petTypes.find((type) => type.value === petData?.pet_type) || null;

    const petBreedData = petBreeds.find(
      (breed) => breed.value === petData?.pet_breed
    );
    const petBreed = petBreedData
      ? { label: petBreedData.label, value: petBreedData.value }
      : null;

    const petColorData = petColors.find(
      (color) => color.value === petData?.color
    );
    const petColor = petColorData
      ? { label: petColorData.label, value: petColorData.value }
      : null;

    const petAddress =
      petaddresses.find(
        (address) => address.value === petData?.pet_address?.id
      ) || null;

    const petNut =
      petNuetered.find((nut) => nut.value === petData?.nuetered) || "";

    const petActive =
      petActiveness.find(
        (active) => active.value === petData?.physically_active
      ) || "";

    return {
      petType,
      petBreed,
      petColor,
      petAddress,
      petNut,
      petActive,
    };
  }, [
    petData,
    petTypes,
    petBreeds,
    petColors,
    petaddresses,
    petNuetered,
    petActiveness,
  ]);

  return selections;
};

export default usePetSelections;

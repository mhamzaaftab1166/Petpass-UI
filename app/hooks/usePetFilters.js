import { useEffect, useState } from 'react';
import petServices from '../services/petServices';

const usePetTypesAndBreeds = (selectedPetTypes) => {
  const [petTypes, setPetTypes] = useState([]);
  const [petBreeds, setPetBreeds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    petServices
      .getPetsTypes()
      .then((types) => {
        setPetTypes(types?.pet_types || []);
      })
      .catch((error) => {
        console.log("Error fetching pet types: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedPetTypes && selectedPetTypes.length > 0) {
      const { value } = selectedPetTypes[0];
      setLoading(true);
      petServices
        .getPetsBreeds(value)
        .then((breeds) => {
          setPetBreeds(breeds?.pet_breeds || []);
        })
        .catch((error) => {
          console.error("Error fetching pet breeds: ", error);
          setPetBreeds([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setPetBreeds([]);
    }
  }, [selectedPetTypes]);

  return {
    petTypes,
    petBreeds,
    loading,
  };
};

export default usePetTypesAndBreeds;


import { useState } from "react";
import petServices from "../services/petServices";

const usePetLike = ({ petId, initialLike = false, initialSuperLike = false, onUpdate }) => {
  const [activeLike, setActiveLike] = useState(
    initialLike ? "like" : initialSuperLike ? "super_like" : null
  );

  const handleLike = async (type) => {
    const previousState = activeLike;

    if (activeLike === type) {
      setActiveLike(null);
      try {
        await petServices.removeLike(petId);
        if (typeof onUpdate === "function") {
          onUpdate();
        }
      } catch (error) {
        setActiveLike(previousState);
        console.log("Failed to remove like:", error);
      }
    } else {
      setActiveLike(type);
      try {
        await petServices.removeLike(petId);
        await petServices.addLike({ type }, petId);
        if (typeof onUpdate === "function") {
          onUpdate();
        }
      } catch (error) {
        setActiveLike(previousState);
        console.log("Failed to update like:", error);
      }
    }
  };

  return { activeLike, handleLike };
};

export default usePetLike;

import { useState } from "react";
import petServices from "../services/petServices";

const usePetLike = ({
  petId,
  initialLike = false,
  initialSuperLike = false,
  onUpdate,
  heartCount,
  superLikeCount,
}) => {
  const [activeLike, setActiveLike] = useState(
    initialLike ? "like" : initialSuperLike ? "super_like" : null
  );
  const [localHeartCount, setLocalHeartCount] = useState(
    typeof heartCount === "number" ? heartCount : undefined
  );
  const [localSuperLikeCount, setLocalSuperLikeCount] = useState(
    typeof superLikeCount === "number" ? superLikeCount : undefined
  );

  const handleLike = async (type) => {
    const previousActiveLike = activeLike;
    const previousHeartCount = localHeartCount;
    const previousSuperLikeCount = localSuperLikeCount;

    if (activeLike === type) {
      setActiveLike(null);
      if (type === "like" && typeof localHeartCount === "number") {
        setLocalHeartCount((prev) => prev - 1);
      } else if (
        type === "super_like" &&
        typeof localSuperLikeCount === "number"
      ) {
        setLocalSuperLikeCount((prev) => prev - 1);
      }
    } else {
      if (activeLike !== null) {
        if (activeLike === "like" && typeof localHeartCount === "number") {
          setLocalHeartCount((prev) => prev - 1);
        } else if (
          activeLike === "super_like" &&
          typeof localSuperLikeCount === "number"
        ) {
          setLocalSuperLikeCount((prev) => prev - 1);
        }
      }
      setActiveLike(type);
      if (type === "like" && typeof localHeartCount === "number") {
        setLocalHeartCount((prev) => prev + 1);
      } else if (
        type === "super_like" &&
        typeof localSuperLikeCount === "number"
      ) {
        setLocalSuperLikeCount((prev) => prev + 1);
      }
    }

    try {
      await petServices.removeLike(petId);
      if (activeLike !== type) {
        await petServices.addLike({ type }, petId);
      }
      if (typeof onUpdate === "function") {
        onUpdate();
      }
    } catch (error) {
      setActiveLike(previousActiveLike);
      setLocalHeartCount(previousHeartCount);
      setLocalSuperLikeCount(previousSuperLikeCount);
      console.log("Failed to update like:", error);
    }
  };

  return { activeLike, handleLike, localHeartCount, localSuperLikeCount };
};

export default usePetLike;

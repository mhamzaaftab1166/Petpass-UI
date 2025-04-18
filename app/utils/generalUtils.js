import * as FileSystem from "expo-file-system";

export const convertImageToBase64 = async (imageUri) => {
  if (!imageUri || imageUri.startsWith("http")) {
    return imageUri;
  }

  try {
    const fileInfo = await FileSystem.getInfoAsync(imageUri);
    const mimeType = fileInfo.uri.endsWith(".png") ? "image/png" : "image/jpeg";
    const base64Image = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return `data:${mimeType};base64,${base64Image}`;
  } catch (error) {
    console.log("Error converting image to Base64:", error);
    return "image";
  }
};


export const convertVideoToBase64 = async (videoUri) => {
  if (!videoUri || videoUri.startsWith("http")) {
    return videoUri; // Return original URI if it's already a valid URL
  }

  try {
    const fileInfo = await FileSystem.getInfoAsync(videoUri);

    const mimeType = videoUri.endsWith(".mp4")
      ? "video/mp4"
      : videoUri.endsWith(".mov")
      ? "video/quicktime"
      : "video/mp4";
    const base64Video = await FileSystem.readAsStringAsync(videoUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return `data:${mimeType};base64,${base64Video}`;
  } catch (error) {
    console.log("Error converting video to Base64:", error);
    return "video";
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    })
    .replace(",", "/");
};

export const formatVaccinationPayload = (petId, values) => {
  const formatDate = (date) =>
    date ? new Date(date).toISOString().split("T")[0] : "";

  return {
    pet_id: petId,
    vaccinated_details: [
      {
        vaccination_name: "Nobivac KC",
        vaccinated_date: formatDate(values?.NobivacKC_Vaccinated_Date),
        vaccination_next_date: formatDate(values?.NobivacKC_Vaccination_Date),
      },
      {
        vaccination_name: "DhppiL",
        vaccinated_date: formatDate(values?.DHPPiL_Vaccinated_Date),
        vaccination_next_date: formatDate(values?.DHPPiL_Vaccination_Date),
      },
      {
        vaccination_name: "Rabies",
        vaccinated_date: formatDate(values?.Rabies_Vaccinated_Date),
        vaccination_next_date: formatDate(values?.Rabies_Vaccination_Date),
      },
    ],
  };
};

export const formatUpdateVaccinationPayload = (
  pet_vaccination_id,
  values,
  vaccinations
) => {

  const formatDate = (date) =>
    date ? new Date(date).toISOString().split("T")[0] : "";

  return {
    pet_vaccination_id: pet_vaccination_id,
    vaccinated_details: [
      {
        vaccination_name: "Nobivac KC",
        id: vaccinations[0].id,
        vaccinated_date: formatDate(values?.NobivacKC_Vaccinated_Date),
        vaccination_next_date: formatDate(values?.NobivacKC_Vaccination_Date),
      },
      {
        vaccination_name: "DhppiL",
        id: vaccinations[1].id,
        vaccinated_date: formatDate(values?.DHPPiL_Vaccinated_Date),
        vaccination_next_date: formatDate(values?.DHPPiL_Vaccination_Date),
      },
      {
        vaccination_name: "Rabies",
        id: vaccinations[2].id,
        vaccinated_date: formatDate(values?.Rabies_Vaccinated_Date),
        vaccination_next_date: formatDate(values?.Rabies_Vaccination_Date),
      },
    ],
  };
};

// utils/dateUtils.js
export const formatTipDate = (date) => {
  const now = new Date();
  const createdAt = new Date(date);
  const diffInSeconds = Math.floor((now - createdAt) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hr ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day(s) ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month(s) ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year(s) ago`;
};

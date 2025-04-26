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

const suffix = (d) => {
  const j = d % 10,
    k = d % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
};

export function formatTime(time24) {
  if (!time24) return "";
  const [hourStr, minStr] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minStr, 10);
  const ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12 || 12; 
  const minutePadded = minute.toString().padStart(2, "0");
  return `${hour}:${minutePadded} ${ampm}`;
}

export function formatTimeRange(startTime24, endTime24) {
  const start = formatTime(startTime24);
  const end = formatTime(endTime24);
  return `${start} to ${end}`;
}

export function formatMonthRange(s, e) {
  if (!s) return "";
  const start = new Date(s);
  const end = e ? new Date(e) : null;
  const f = new Intl.DateTimeFormat("en", { month: "short" });
  if (
    !end ||
    (start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear())
  ) {
    return f.format(start);
  }
  return `${f.format(start)} - ${f.format(end)}`;
}

export function formatDateRange(s, e) {
  if (!s) return "";
  const start = new Date(s);
  const end = e ? new Date(e) : null;
  const d1 = start.getDate();
  if (
    !end ||
    (d1 === end.getDate() &&
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear())
  ) {
    return `${d1}${suffix(d1)}`;
  }
  const d2 = end.getDate();
  return `${d1}${suffix(d1)}-${d2}${suffix(d2)}`;
}

export function formatDayRange(s, e) {
  if (!s) return "";
  const start = new Date(s);
  const end = e ? new Date(e) : null;
  const f = new Intl.DateTimeFormat("en", { weekday: "short" });
  if (!end || start.getTime() === end.getTime()) {
    return f.format(start);
  }
  return `${f.format(start)} - ${f.format(end)}`;
}

export function formatFullDateRange(start, end) {
  if (!start) return "";
  const sDate = new Date(start);
  const eDate = end ? new Date(end) : null;

  const opts = { day: "numeric", month: "short", year: "numeric" };
  const fmt = new Intl.DateTimeFormat("en", opts);

  const sStr = fmt.format(sDate);
  if (!eDate || sDate.getTime() === eDate.getTime()) {
    return sStr;
  }

  const eStr = fmt.format(eDate);
  return `${sStr} - ${eStr}`;
}
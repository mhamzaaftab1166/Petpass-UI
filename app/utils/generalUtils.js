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

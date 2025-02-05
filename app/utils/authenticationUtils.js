export const formatRegisterPayload = (userInfo) => {
  if (!userInfo.phone_number) return userInfo; 

  const phoneParts = userInfo.phone_number.split(" ");
  const countryCode = phoneParts[0];
  const phoneNumber = phoneParts.slice(1).join("");

  return {
    username: userInfo.username,
    email: userInfo.email,
    phone_number: phoneNumber,
    password: userInfo.password,
    profile_type: userInfo.profile_type,
    country_code: countryCode,
  };
};

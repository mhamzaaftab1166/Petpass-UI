const { Country, State, City } = require("country-state-city");

const getCountries = Country.getAllCountries()

const getStatesByCountry = (countryCode) => {
  return State.getStatesOfCountry(countryCode);
};

const getCitiesByCountry = (countryCode) => {  
  return City.getCitiesOfCountry(countryCode);
};


module.exports = {
  getCountries,
  getStatesByCountry,
  getCitiesByCountry
};

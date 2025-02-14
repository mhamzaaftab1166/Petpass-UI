const { Country, State } = require("country-state-city");

const getCountries = Country.getAllCountries()
const getStates = State.getStatesOfCountry()


module.exports = {
  getCountries,
  getStates
};

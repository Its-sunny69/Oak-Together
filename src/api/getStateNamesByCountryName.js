const API_URL = import.meta.env.VITE_SERVER_API_URL;

async function getStateNamesByCountryName(countryName) {
    if(!countryName) return null;
    return fetch(API_URL + `resident/state-names/by-country-name/${countryName}`);
}

export default getStateNamesByCountryName;
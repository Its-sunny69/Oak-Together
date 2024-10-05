const API_URL = import.meta.env.VITE_SERVER_API_URL;

async function getStatesByCountryName(countryName) {
    if(!countryName) return null;
    return fetch(API_URL + `resident/states/by-country-name/${countryName}`);
}

export default getStatesByCountryName;
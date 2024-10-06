const API_URL = import.meta.env.VITE_SERVER_API_URL;

async function getAllCountryNames() {
    return fetch(API_URL + "resident/country-names");
}

export default getAllCountryNames;
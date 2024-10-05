const API_URL = import.meta.env.VITE_SERVER_API_URL;

async function getAllCountries() {
    return fetch(API_URL + "resident/countries");
}

export default getAllCountries;
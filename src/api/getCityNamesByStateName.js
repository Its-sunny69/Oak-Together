const API_URL = import.meta.env.VITE_SERVER_API_URL;

async function getCityNamesByStateName(stateName) {
    if(!stateName) return null;
    return fetch(API_URL + `resident/city-names/by-state-name/${stateName}`);
}

export default getCityNamesByStateName;
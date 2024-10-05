const API_URL = import.meta.env.VITE_SERVER_API_URL;

async function getCitiesByStateName(stateName) {
    if(!stateName) return null;
    return fetch(API_URL + `resident/cities/by-state-name/${stateName}`);
}

export default getCitiesByStateName;
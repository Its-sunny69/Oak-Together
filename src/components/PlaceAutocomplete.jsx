import { useState, useEffect } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

function PlaceAutocomplete({ onPlaceSelect, children, customInputRef, setInputValue }) {
    const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
    const places = useMapsLibrary("places");
    const map = useMap();

    useEffect(() => {
        if (!places || !customInputRef.current) return;

        const options = {
            fields: ["geometry", "name", "formatted_address"],
        };

        setPlaceAutocomplete(new places.Autocomplete(customInputRef.current, options));
    }, [places]);
    
    useEffect(() => {
        if (!placeAutocomplete) return;

        placeAutocomplete.addListener("place_changed", () => {
            const selectedPlace = placeAutocomplete.getPlace();
            if(!selectedPlace.geometry) return;

            setInputValue == null ?
                customInputRef.current.value = selectedPlace.formatted_address :
                setInputValue(selectedPlace.formatted_address);

            const locationCoords = selectedPlace.geometry.location;
            // console.log(locationCoords)

            const coords = { lat: locationCoords.lat(), lng: locationCoords.lng() };
            map.setCenter(coords);
            onPlaceSelect(coords);
        });
    }, [onPlaceSelect, placeAutocomplete]);
    return (
        <div className="autocomplete-container">
            {children}
        </div>
    );
};

export default PlaceAutocomplete;
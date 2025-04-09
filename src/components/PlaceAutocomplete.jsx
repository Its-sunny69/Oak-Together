import { useState, useEffect } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

function PlaceAutocomplete({ isEventForm, onPlaceSelect, customInputRef, setInputValue, customContainerStyle, children}) {
    const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
    const places = useMapsLibrary("places");
    const map = !isEventForm ? useMap() : null;

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
            if (!selectedPlace.geometry) return;

            setInputValue == null ?
                customInputRef.current.value = selectedPlace.formatted_address :
                setInputValue(selectedPlace.formatted_address);

            if(isEventForm) return;
            const locationCoords = selectedPlace.geometry.location;
            // console.log(locationCoords)

            const coords = { lat: locationCoords.lat(), lng: locationCoords.lng() };
            map.setCenter(coords);
            onPlaceSelect(coords);
        });
    }, [onPlaceSelect, placeAutocomplete]);
    return (
        <div
            className="autocomplete-container"
            style={customContainerStyle}
        >
            {children}
        </div>
    );
};

export default PlaceAutocomplete;
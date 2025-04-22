import { useState, useEffect } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

function PlaceAutocomplete({ usesMap, onPlaceSelect, customInputRef, customContainerStyle, children}) {
    const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
    const places = useMapsLibrary("places");
    const map = usesMap ? useMap() : null;

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
            
            onPlaceSelect && (usesMap? onPlaceSelect(map, selectedPlace): onPlaceSelect(selectedPlace));
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
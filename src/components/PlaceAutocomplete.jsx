import { useState, useEffect } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

function PlaceAutocomplete ({ onPlaceSelect, children, customInputRef }) {
    const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
    const places = useMapsLibrary("places");

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
            customInputRef.current.value = selectedPlace.formatted_address;
            // onPlaceSelect(placeAutocomplete.getPlace()); // will look into this later when setting selected location marker
        });
    }, [onPlaceSelect, placeAutocomplete]);
    return (
        <div className="autocomplete-container">
            {children}
        </div>
    );
};

export default PlaceAutocomplete;
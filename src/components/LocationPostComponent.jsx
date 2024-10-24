import MapComponent from "./MapComponent"

/*
    For autocomplete: https://developers.google.com/maps/documentation/javascript/examples/rgm-autocomplete#maps_rgm_autocomplete-javascript
*/

function LocationPostComponent({ setShowPostInterface }) {
    return (
        <div className="w-[49%] rounded-xl bg-gray-500">
            <div className="cursor-pointer" onClick={() => setShowPostInterface(false)}>LocationPostComponent</div> {/* <- temporary line */}
        </div>
    )
}

export default LocationPostComponent
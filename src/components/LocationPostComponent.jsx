import MapComponent from "./MapComponent"


function LocationPostComponent({ setShowPostInterface }) {
    return (
        <div className="w-[49%] rounded-xl bg-gray-500">
            <div className="cursor-pointer" onClick={() => setShowPostInterface(false)}>LocationPostComponent</div> {/* <- temporary line */}
        </div>
    )
}

export default LocationPostComponent
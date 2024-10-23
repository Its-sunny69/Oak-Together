import { useState } from "react";
import { ProfileHeader, MapComponent, LocationPostComponent } from "./";

function MapPageContent() {

    const [showPostInterface, setShowPostInterface] = useState(false);

    return (
        <div className="flex flex-col gap-8 py-6 pr-4 w-full">
            <ProfileHeader mapPageActive />
            {showPostInterface ?
                <LocationPostComponent setShowPostInterface={setShowPostInterface}/> :
                <MapComponent setShowPostInterface={setShowPostInterface} />}
        </div>
    )
}

export default MapPageContent;
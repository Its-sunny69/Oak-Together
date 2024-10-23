import { useState } from "react";
import { ProfileHeader, MapComponent, LocationPostComponent } from "./";

function MapPageContent() {

    return (
        <div className="flex flex-col gap-8 py-6 pr-4 w-full">
            <ProfileHeader mapPageActive />
            <MapComponent />
        </div>
    )
}

export default MapPageContent;
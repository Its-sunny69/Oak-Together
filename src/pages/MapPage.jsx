import { SideNavBar, MapPageContent } from "../components"

function MapPage() {
    return (
        <div className="flex">
            <SideNavBar />
            <MapPageContent />
        </div>
    )
}

export default MapPage;
import { SideNavBar, MapPageContent } from "../components"

function MapPage() {
    return (
        <div className="flex">
            <SideNavBar selectedPageName="Map" />
            <MapPageContent />
        </div>
    )
}

export default MapPage;
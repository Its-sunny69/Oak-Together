import { ProfileHeader, HomeHeroSection, PriceCardList, HomeListSection } from "../components"

function HomePageContent() {
    return (
        <div className="pt-6 pr-4 w-full">
            <ProfileHeader />
            <HomeHeroSection />
            <PriceCardList />
            <HomeListSection />
        </div>
    )
}

export default HomePageContent;
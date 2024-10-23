import React from 'react'
import { SideNavBar, HomePageContent} from "../components"

function Home() {

  return (
    <div className="flex">
      <SideNavBar selectedPageName="Home" />
      <HomePageContent />
    </div>
  )
}

export default Home
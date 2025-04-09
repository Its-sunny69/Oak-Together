import React from 'react'
import { SideNavBar } from "../components";
import EventDetail from '../components/EventDetail';

function EventInfo() {
  return (
    <div className="flex">
    <SideNavBar selectedPageName="Events" />
    <EventDetail />
  </div>
  )
}

export default EventInfo
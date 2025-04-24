import React from 'react'
import { SideNavBar } from "../components";
import EventDetail from '../components/EventDetail';
import { useParams } from 'react-router-dom';

function EventInfo() {
  const { eventId } = useParams();

  return (
    <div className="flex">
    <SideNavBar selectedPageName="Events" />
    <EventDetail eventId={eventId}/>
  </div>
  )
}

export default EventInfo
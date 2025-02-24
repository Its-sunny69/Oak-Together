import React from "react";
import { SideNavBar } from "../components";
import EventPageContent from "../components/EventPageContent";

function Events() {
  return (
    <div className="flex">
      <SideNavBar selectedPageName="Events" />
      <EventPageContent />
    </div>
  );
}

export default Events;

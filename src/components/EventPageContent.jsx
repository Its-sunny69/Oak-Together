import React from "react";
import ProfileHeader from "./ProfileHeader";
import Filter from "./Filter";

function EventPageContent() {
  return (
    <div className="pt-6 pr-4 w-full">
      <ProfileHeader />

      <Filter />
    </div>
  );
}

export default EventPageContent;

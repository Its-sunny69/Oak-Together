import { useState } from "react";
import { ProfileHeader, MapComponent, LocationPostComponent } from "./";
import MessageModal from "./MessageModal";

function MapPageContent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <div className="flex flex-col gap-8 py-6 pr-4 w-full">
      <ProfileHeader mapPageActive />
      <div className="relative">
        <MapComponent setIsModalVisible={setIsModalVisible} />
        {isModalVisible && (
          <div className=" absolute inset-0 backdrop-blur-[2px] bg-gray-600/50 z-10 flex justify-center items-center">
            <MessageModal setIsModalVisible={setIsModalVisible} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MapPageContent;

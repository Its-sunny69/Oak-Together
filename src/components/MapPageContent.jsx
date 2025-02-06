import { useState, useEffect } from "react";
import { ProfileHeader, MapComponent } from "./";
import MessageModal from "./MessageModal";


function MapPageContent() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currLocationCoords, setCurrentLocationCoords] = useState(null);

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            setCurrentLocationCoords({ lat: lat, lng: lng });
          }
          , (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
              case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
              case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
            }
          });
      }
      else alert("Geolocation is not supported by this browser.");
    }

    const intervalID = setInterval(fetchLocation, 5000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div
      className="flex flex-col gap-8 py-6 pr-4 w-full"
    >
      <ProfileHeader mapPageActive />
      <div className="relative">

        {currLocationCoords &&
          <MapComponent
            currLocationCoords={currLocationCoords}
            setIsModalVisible={setIsModalVisible}
          />
        }

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

import { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Marker } from '@vis.gl/react-google-maps';
import { LocateIcon } from '../assets';

function MapComponent() {

  const position = { lat: 19.120198, lng: 72.997773 }; // will need to replace it with user residence coords
  // Position for the marker
  const [changeCenter, setChangeCenter] = useState(false);

  // Custom Recenter button for the map:
  const [recenterTooltipVisible, setRecenterTooltipVisible] = useState(false);
  const recenterButton = (
    <button
        className="bg-white absolute right-2.5 bottom-52 hover:bg-gray-300 transition rounded-sm"
        onClick={() => {
          setChangeCenter(true)
        }}
        onMouseEnter={(e) => setTimeout(() => setRecenterTooltipVisible(true), 800)}
        onMouseOut={(e) => setRecenterTooltipVisible(false)}
      >
        <img src={LocateIcon} className="h-10 w-10" />
        {recenterTooltipVisible && 
        <div 
        className="p-3 whitespace-nowrap text-sm bg-black bg-opacity-80 font-medium text-white rounded-md font-[Arial] absolute -bottom-12 -right-2.5">
          Recenter map to residence location
        </div>}
      </button>
  )

  return (

    <div
      style={{
        width: '100%',
        height: '100vh',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '2px 2px 20px rgba(0, 0, 0, 0.2)',
        position: "relative"
      }}
    >
      <APIProvider apiKey={import.meta.env.VITE_GMAP_API_KEY} >
        <Map
          center={changeCenter && position}
          defaultCenter={position}
          defaultZoom={17}
          mapId={import.meta.env.VITE_GMAP_MAP_STYLE_ID}
          onClick={(map) => console.log("map, ", map)}
          onCenterChanged={() => setChangeCenter(false)}
        >
          <AdvancedMarker position={position} onClick={(eventObj) => console.log("Marker clicked, ", eventObj)}>
            <span className="text-2xl font-extrabold rounded-full p-4 shadow-sm shadow-emerald-400 bg-blue-200 bg-opacity-45 border-blue-700 border-[1px]">📍</span>
          </AdvancedMarker>
        </Map>
      </APIProvider>
      {recenterButton}
    </div>
  );
}

export default MapComponent;

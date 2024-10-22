import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

function MapComponent() {

  const position = { lat: 19.120198, lng: 72.997773 }; // Position for the marker

  return (
      <APIProvider apiKey={import.meta.env.VITE_GMAP_API_KEY} >
        <Map
          defaultCenter={position}
          defaultZoom={17}
          marker={AdvancedMarker}
        />
      </APIProvider>
  );
}

export default MapComponent;

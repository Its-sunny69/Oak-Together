import { useState } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { DeadTreePng, EventMarkerPng, LargeTreePng, LocateIcon } from '../assets';
import { LocationDetailComponent, LocationPostComponent } from './';

// Dummy Data for Markers:
const dummyCoordinates = [
  { id: 1, lat: 19.122345, lng: 72.995623 },
  { id: 2, lat: 19.117890, lng: 73.001234 },
  { id: 3, lat: 19.121256, lng: 72.993678 },
  { id: 4, lat: 19.118765, lng: 72.996543 },
  { id: 5, lat: 19.120123, lng: 72.999876 },
  { id: 6, lat: 19.119876, lng: 72.997123 },
  { id: 7, lat: 19.122789, lng: 72.994321 },
  { id: 8, lat: 19.118432, lng: 73.000111 },
  { id: 9, lat: 19.121876, lng: 72.996789 },
  { id: 10, lat: 19.120345, lng: 72.998765 },
  { id: 11, lat: 19.118901, lng: 73.002234 },
  { id: 12, lat: 19.122134, lng: 72.999001 },
  { id: 13, lat: 19.119432, lng: 72.994567 },
  { id: 14, lat: 19.120543, lng: 73.001876 },
  { id: 15, lat: 19.121234, lng: 72.997890 },
  { id: 16, lat: 19.122678, lng: 72.993234 },
  { id: 17, lat: 19.120987, lng: 72.995432 },
  { id: 18, lat: 19.119876, lng: 72.999654 },
  { id: 19, lat: 19.121345, lng: 72.994876 },
  { id: 20, lat: 19.118234, lng: 72.997654 },
  { id: 21, lat: 19.120432, lng: 73.002001 },
  { id: 22, lat: 19.119678, lng: 72.995321 },
  { id: 23, lat: 19.122123, lng: 72.998234 },
  { id: 24, lat: 19.120765, lng: 72.996123 },
  { id: 25, lat: 19.121987, lng: 72.993987 },
  { id: 26, lat: 19.119543, lng: 73.000987 },
  { id: 27, lat: 19.122345, lng: 72.995432 },
  { id: 28, lat: 19.118765, lng: 72.997987 },
  { id: 29, lat: 19.121001, lng: 73.001543 },
  { id: 30, lat: 19.119123, lng: 72.994876 }
]

const plantedCoordinates = [], barrenCoordinates = [], eventCoordinates = [];
let i = 0;
while (i < 14) {
  plantedCoordinates.push(dummyCoordinates[i]);
  i++;
}
while (i < 25) {
  barrenCoordinates.push(dummyCoordinates[i]);
  i++;
}
while (i < dummyCoordinates.length) {
  eventCoordinates.push(dummyCoordinates[i]);
  i++;
}

const applyStyle = (styleProp) => {
  styleProp.backgroundColor = "#83E2C1"
  styleProp.borderRadius = "45px";
  styleProp.border = "2px solid #1566E7";
}

const revertStyle = (styleProp) => {
  styleProp.backgroundColor = "";
  styleProp.borderRadius = "0px";
  styleProp.border = "none";
}

const Markers = ({ locationsList, type, lastMarkerDiv, setLastMarkerDiv, setSelectedLocationId, showPostInterface }) => {

  const markerIcons = {
    "planted": LargeTreePng,
    "barren": DeadTreePng,
    "event": EventMarkerPng
  }

  let markerId = 0;

  {/* onClick is required to detect events in Advanced Markers... */ }

  return (
    locationsList.map(({ id, lat, lng }) =>
      <AdvancedMarker
        key={markerId++}
        position={{ lat: lat, lng: lng }}

        onClick={() => { }}
      >
        <div
          onClick={(e) => {

            if (showPostInterface) return; // might need to handle this differently later...

            const markerDiv = e.target;
            if (lastMarkerDiv) revertStyle(lastMarkerDiv.style);
            setSelectedLocationId(id);
            setLastMarkerDiv(markerDiv);
            applyStyle(markerDiv.style)
          }}
        >
          <img src={markerIcons[type]} className="w-8" />
        </div>
      </AdvancedMarker>
    )
  )

}

function MapComponent() {

  const position = { lat: 19.120198, lng: 72.997773 }; // Position for the residence location marker
  // will need to replace position with user's residence coords later...

  const [changeCenter, setChangeCenter] = useState(false);

  // Marker for Residence Locations
  const [residenceTooltipVisible, setResidenceTooltipVisible] = useState(false);

  const residenceLocationMarker = (
    <AdvancedMarker
      position={position}
      onClick
      onMouseEnter={() => setResidenceTooltipVisible(true)}
      onMouseLeave={() => setResidenceTooltipVisible(false)}
    >
      <div className="relative">
        <span className="text-2xl font-extrabold rounded-full p-4 shadow-sm shadow-emerald-400 bg-blue-200 bg-opacity-45 border-blue-700 border-[1px] ">📍</span>
        {residenceTooltipVisible &&
          <div
            className="p-3 whitespace-nowrap text-sm z-10 bg-black bg-opacity-80 font-medium text-white rounded-md font-[Arial] absolute -top-12 -right-2.5">
            Residence Location
          </div>
        }
      </div>
    </AdvancedMarker>
  )

  // Custom Recenter button for the map:
  const [recenterTooltipVisible, setRecenterTooltipVisible] = useState(false);

  const recenterButton = (
    <button
      className="bg-white absolute right-2.5 bottom-52 hover:bg-gray-300 transition rounded-sm"
      onClick={() => {
        setChangeCenter(true)
      }}
      onMouseEnter={() => setRecenterTooltipVisible(true)}
      onMouseOut={() => setRecenterTooltipVisible(false)}
    >
      <img src={LocateIcon} className="h-10 w-10" />
      {recenterTooltipVisible &&
        <div
          className="p-3 whitespace-nowrap text-sm z-10 bg-black bg-opacity-80 font-medium text-white rounded-md font-[Arial] absolute -bottom-12 -right-2.5">
          Recenter map to residence location
        </div>}
    </button>
  )

  // Map filter checkbox
  const FilterCheckBox = ({ id, text, checked, setChecked }) => {
    const checkBoxID = "checkbox-" + id;

    return (
      <li className='flex items-center gap-8 px-6 text-sm'>
        <div className="relative w-8 h-8">
          <input
            id={checkBoxID}
            type="checkbox"
            className="appearance-none w-8 h-8 border-2 border-teal-300 rounded-lg checked:border-transparent checked:bg-teal-400 cursor-pointer"
            checked={checked}
            onChange={() => {
              setChecked((checked) => !checked);
              console.log(text, ": ", checked)
            }}
          />
          {checked &&
            <span
              className="absolute top-1.5 left-1 text-[30px] pointer-events-none text-white font-extrabold"
            >
              ✓
            </span>}
        </div>
        <label htmlFor={checkBoxID} className="text-sm font-medium cursor-pointer">{text}</label>
      </li>
    )
  }

  // Map filter checkbox collection
  let filterID = 0;
  const texts = ["Planted Locations", "Barren Locations", "Events"];
  const plantedMarkerState = useState(true);
  const barrenMarkerState = useState(true);
  const eventMarkerState = useState(true);
  const markerStates = [plantedMarkerState, barrenMarkerState, eventMarkerState];

  const filterCheckBoxes = (
    <ul className='flex flex-col gap-2 w-full bg-white py-4 rounded-lg shadow-lg'>
      {texts.map(text =>
        <FilterCheckBox
          key={filterID++}
          id={filterID}
          text={text}
          checked={markerStates[filterID][0]}
          setChecked={markerStates[filterID][1]}
        />
      )}
    </ul>
  )

  // Mark a Location Button
  const markLocationButton = (
    <button
      className='py-2 w-full rounded-lg bg-gradient-120 shadow-md from-[#83E2C1] from-50% to-[#1566E7] to-100% hover:from-[#1566E7] hover:to-[#83E2C1] text-white'
      onClick={() => {
        plantedMarkerState[1](true);
        barrenMarkerState[1](true);
        eventMarkerState[1](true);
        setShowPostInterface(true);
      }}
    >
      Mark a Location
    </button>
  )

  // Map controls container
  const mapControlsDiv = (
    <div className="absolute bottom-6 right-20 flex flex-col gap-2 items-start">
      {markLocationButton}
      {filterCheckBoxes}
    </div>
  )

  // For keeping track of Selected Locations via Marker Clicks
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [lastMarkerDiv, setLastMarkerDiv] = useState(null);

  // For Marking/Posting locations:
  const [showPostInterface, setShowPostInterface] = useState(false);
  const styleClasses = showPostInterface ? "flex gap-4 w-full" : "";
  const mapWidth = showPostInterface ? "48%" : "100%";
  const mapHeight = showPostInterface ? "70vh" : "100vh";

  return (

    <div className={styleClasses}>
      {showPostInterface && <LocationPostComponent setShowPostInterface={setShowPostInterface} />}
      <div
        style={{
          width: mapWidth,
          height: mapHeight,
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '2px 2px 20px rgba(0, 0, 0, 0.2)',
          position: "relative",
        }}
      >
        <APIProvider apiKey={import.meta.env.VITE_GMAP_API_KEY} >
          <Map
            center={changeCenter && position}
            defaultCenter={position}
            defaultZoom={17}
            mapId={import.meta.env.VITE_GMAP_MAP_STYLE_ID}
            onCenterChanged={(e) => {
              setChangeCenter(false);
              // can make use of 'e.detail' later !! It has properties like center, bounds and zoom !!
            }}
          >
            {/* Residence Location Marker: */}
            {residenceLocationMarker}

            {/* Planted Location Markers:*/}
            {plantedMarkerState[0] &&
              <Markers
                locationsList={plantedCoordinates}
                type="planted"
                lastMarkerDiv={lastMarkerDiv}
                setLastMarkerDiv={setLastMarkerDiv}
                setSelectedLocationId={setSelectedLocationId}
                showPostInterface={showPostInterface}
              />
            }

            {/* Barren Location Markers: */}
            {barrenMarkerState[0] &&
              <Markers
                locationsList={barrenCoordinates}
                type="barren"
                lastMarkerDiv={lastMarkerDiv}
                setLastMarkerDiv={setLastMarkerDiv}
                setSelectedLocationId={setSelectedLocationId}
                showPostInterface={showPostInterface}
              />
            }

            {/* Event Location Markers: */}
            {eventMarkerState[0] &&
              <Markers
                locationsList={eventCoordinates}
                type="event"
                lastMarkerDiv={lastMarkerDiv}
                setLastMarkerDiv={setLastMarkerDiv}
                setSelectedLocationId={setSelectedLocationId}
                showPostInterface={showPostInterface}
              />
            }

          </Map>
        </APIProvider>
        {recenterButton}
        {!showPostInterface && mapControlsDiv}
        {selectedLocationId != null &&
          <LocationDetailComponent
            lastMarkerDiv={lastMarkerDiv}
            setLastMarkerDiv={setLastMarkerDiv}
            selectedLocationId={selectedLocationId}
            setSelectedLocationId={setSelectedLocationId}
            revertStyle={revertStyle}
          />
        }
      </div>
    </div>
  );
}

export default MapComponent;

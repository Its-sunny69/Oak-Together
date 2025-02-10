import { useState, useEffect, useRef } from 'react';
import { APIProvider, Map, AdvancedMarker, useMap, MapControl, ControlPosition } from '@vis.gl/react-google-maps';
import { DeadTreePng, EventMarkerPng, LargeTreePng, LocateIcon } from '../assets';
import { LocationDetailComponent, LocationPostComponent, PlaceAutocomplete } from './';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { getLocationsUsingFilter } from '../features/locationSlice';
import { useDispatch } from 'react-redux';
import { MarkerClusterer } from '@googlemaps/markerclusterer';


/*
  Adding marker clusterer: https://developers.google.com/maps/documentation/javascript/marker-clustering
*/


const Markers = ({ markerCoordinates, markerStates, setSelectedLocationId, setSelectedLocationCoords, showPostInterface }) => {

  const markerIcons = {
    "planted": LargeTreePng,
    "barren": DeadTreePng,
    "event": EventMarkerPng
  }

  const { plantedCoordinates, barrenCoordinates, eventCoordinates } = markerCoordinates;

  const allMarkerCoordsList = [];
  if (markerStates.showPlantedMarkers) allMarkerCoordsList.push(...plantedCoordinates);
  if (markerStates.showBarrenMarkers) allMarkerCoordsList.push(...barrenCoordinates);
  if (markerStates.showEventMarkers) allMarkerCoordsList.push(...eventCoordinates);

  const map = useMap();
  const clusterer = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!map) return;

    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }

    // Clear existing markers before adding new ones
    clusterer.current.clearMarkers();
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    const newMarkers = allMarkerCoordsList.map(({ id, lat, lng, type }) => {
      const markerDOM = document.createElement("div");
      const markerImgElement = document.createElement("img");

      markerImgElement.className = "w-8";
      markerImgElement.src = markerIcons[type];
      markerDOM.appendChild(markerImgElement);

      const advancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: lat, lng: lng },
        content: markerDOM
      });

      advancedMarkerElement.addListener("click", (e) => {
        if (showPostInterface) return; // might need to handle this differently later...
        setSelectedLocationId(id);
        setSelectedLocationCoords({lat: e.latLng.lat(), lng: e.latLng.lng()});
      });

      return advancedMarkerElement;
    });

    markersRef.current = newMarkers;
    clusterer.current.addMarkers(newMarkers);

  }, [map, allMarkerCoordsList]); // Dependencies update when marker list changes
};



// Custom Recenter button control for the map:
const RecenterButton = ({ locationCoords }) => {
  const [recenterTooltipVisible, setRecenterTooltipVisible] = useState(false);
  const map = useMap();

  return (
    <button
      className="bg-white absolute right-2.5 bottom-52 hover:bg-gray-300 transition rounded-sm shadow-md"
      onClick={() => map.setCenter(locationCoords)}
      onMouseEnter={() => setRecenterTooltipVisible(true)}
      onMouseOut={() => setRecenterTooltipVisible(false)}
    >
      <img src={LocateIcon} className="h-10 w-10" />
      {recenterTooltipVisible &&
        <div
          className="p-3 whitespace-nowrap text-sm z-10 bg-black bg-opacity-80 font-medium text-white rounded-md font-[Arial] absolute -bottom-12 -right-2.5">
          Recenter map to current location
        </div>
      }
    </button>
  )
}

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
            setChecked(!checked);
            // console.log(text, ": ", checked)
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

function MapComponent({ currLocationCoords, setIsModalVisible }) {

  // console.log(currLocationCoords);

  // For Marking/Posting locations:
  const [showPostInterface, setShowPostInterface] = useState(false);
  const mapWidth = showPostInterface ? "48%" : "100%";
  const mapHeight = showPostInterface ? "100%" : "100vh";
  const styleClasses = showPostInterface ? `flex gap-4 w-full h-5/6` : "";

  // Marker for Current Locations
  const [currentTooltipVisible, setCurrentTooltipVisible] = useState(false);

  const currentLocationMarker = (
    <AdvancedMarker
      position={currLocationCoords}
      onClick={() => { }}
      onMouseEnter={() => setCurrentTooltipVisible(true)}
      onMouseLeave={() => setCurrentTooltipVisible(false)}
    >
      <div className="relative">
        <span className="text-2xl font-extrabold rounded-full py-2 px-3 shadow-sm shadow-emerald-400 bg-blue-200 bg-opacity-45 border-blue-700 border-[1px] ">📍</span>
        {currentTooltipVisible &&
          <div
            className="p-3 whitespace-nowrap text-sm z-10 bg-black bg-opacity-80 font-medium text-white rounded-md font-[Arial] absolute -top-12 -right-2.5">
            Current Location
          </div>
        }
      </div>
    </AdvancedMarker>
  )

  // Map filter checkbox collection
  const texts = ["Planted Locations", "Barren Locations", "Events"];
  const [markerStates, setMarkerStates] = useState({
    showPlantedMarkers: true,
    showBarrenMarkers: true,
    showEventMarkers: true
  });
  const markerStateKeys = Object.keys(markerStates);

  const filterCheckBoxes = (
    <ul className='flex flex-col gap-2 w-full bg-white py-4 rounded-lg shadow-lg'>
      {texts.map((text, index) =>
        <FilterCheckBox
          key={index}
          id={index}
          text={text}
          checked={markerStates[markerStateKeys[index]]}
          setChecked={(boolVal) => {

            const nextMarkerStates = { ...markerStates }
            nextMarkerStates[markerStateKeys[index]] = boolVal;

            setMarkerStates(nextMarkerStates)
          }}
        />
      )}
    </ul>
  )

  // Mark a Location Button
  const markLocationButton = (
    <button
      className='py-2 w-full rounded-lg bg-gradient-120 shadow-md from-[#83E2C1] from-50% to-[#1566E7] to-100% hover:from-[#1566E7] hover:to-[#83E2C1] text-white'
      onClick={() => {
        setMarkerStates({
          showPlantedMarkers: true,
          showBarrenMarkers: true,
          showEventMarkers: true
        })

        setShowPostInterface(true);
        setSelectedLocationId(null);
        setSelectedLocationCoords(null);
        setSearchedLocationCoords(null);
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

  // Marker for Searched Location
  const [searchedTooltipVisible, setSearchedTooltipVisible] = useState(false);
  const [searchedLocationCoords, setSearchedLocationCoords] = useState(null);
  const searchedLocationMarker = (
    <AdvancedMarker
      position={searchedLocationCoords}
      onClick={() => { }}
      onMouseEnter={() => setSearchedTooltipVisible(true)}
      onMouseLeave={() => setSearchedTooltipVisible(false)}
    >
      <div className="relative">
        <FontAwesomeIcon
          icon={faLocationDot}
          className="text-3xl text-red-700 drop-shadow-[0_1.2px_3px_rgba(200,0,0,0.8)] pointer-events-none"
        />
        {searchedTooltipVisible &&
          <div
            className="p-3 whitespace-nowrap text-sm z-10 bg-black bg-opacity-80 font-medium text-white rounded-md font-[Arial] absolute -top-12 -right-2.5">
            {showPostInterface ? "Marked" : "Searched"} Location
          </div>
        }
      </div>
    </AdvancedMarker>
  )

  // PlaceAutocomplete search box
  const [showClearIcon, setShowClearIcon] = useState(false);
  const autocompleteInputRef = useRef(null);
  const autocompleteInput = (
    <input
      className="p-3 w-[30vw] h-[100%] rounded-r-xl text-[14px] outline-none"
      ref={autocompleteInputRef}
      placeholder="Search Location"
      onFocus={() => {
        const searchControlsDiv = autocompleteInputRef.current.parentNode;
        searchControlsDiv.style.border = "3px solid #60D6D9";
      }}
      onBlur={() => {
        const searchControlsDiv = autocompleteInputRef.current.parentNode;
        searchControlsDiv.style.border = "1px solid #187BEC";
      }}
      onInput={() => {
        setShowClearIcon(autocompleteInputRef.current.value.length > 0);
      }}
    />
  )
  const searchControls = (
    <div className="relative flex items-center h-9 mt-3 rounded-xl shadow-lg border-[1px] border-[#187BEC] bg-white">
      <div className="h-full flex items-center pl-2 text-lg">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
      {autocompleteInput}
      {showClearIcon &&
        <div
          className="h-full absolute right-0 flex items-center px-2 rounded-r-xl text-lg text-red-500 cursor-pointer bg-white"
          onClick={() => {
            autocompleteInputRef.current.value = "";
            autocompleteInputRef.current.focus();
            setShowClearIcon(false);
            setSearchedLocationCoords(null);
          }}
        >
          <FontAwesomeIcon icon={faCircleXmark} />
        </div>
      }
    </div>
  );

  // Handling place selection via PlaceAutocomplete
  const handlePlaceSelect = (coords) => {
    setSearchedLocationCoords(coords);
  }

  // For keeping track of Selected Locations via Marker Clicks
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [selectedLocationCoords, setSelectedLocationCoords] = useState(null);

  // API Calls to get Location and Event Coords
  const [markerCoordinates, setMarkerCoordinates] = useState({
    plantedCoordinates: [], barrenCoordinates: [], eventCoordinates: []
  });
  const dispatch = useDispatch();

  const setAllMarkers = (mapInstance) => {
    const mapCenter = mapInstance.getCenter();
    const centerCoords = { lat: mapCenter.lat(), lng: mapCenter.lng() }

    const mapNE = mapInstance.getBounds().getNorthEast();
    const radius = google.maps.geometry.spherical.computeDistanceBetween(mapCenter, mapNE);

    const filterText =
      centerCoords ?
        `entityStatus=ACTIVE&latitudeCenter=${centerCoords.lat}&longitudeCenter=${centerCoords.lng}&radius=${radius}`
        : "";

    // console.log(filterText);
    dispatch(getLocationsUsingFilter(filterText)).unwrap()
      .then((response) => {
        const plantedCoords = [], barrenCoords = [];

        response.forEach((locationObj) => {
          const coordinateObj = {
            id: locationObj.id,
            lat: locationObj.position.locations.latitude,
            lng: locationObj.position.locations.longitude,
            type: locationObj.type.toLowerCase()
          };

          switch (coordinateObj.type) {
            case "planted":
              plantedCoords.push(coordinateObj);
              break;
            case "barren":
              barrenCoords.push(coordinateObj);
              break;
          }

        });

        setMarkerCoordinates((prevState) => {
          const isSame =
            JSON.stringify(prevState.plantedCoordinates) === JSON.stringify(plantedCoords) &&
            JSON.stringify(prevState.barrenCoordinates) === JSON.stringify(barrenCoords);

          if (isSame) return prevState; // Prevent unnecessary updates
          return { ...prevState, plantedCoordinates: plantedCoords, barrenCoordinates: barrenCoords };
        });

      })
      .catch((error) => console.log(error));

    // Uncomment and/or update after 'eventSlice' is developed in src/features
    // dispatch(getEventsByFilter("")).unwrap()
    //   .then((response) => {
    //     const eventCoords = [];

    //     response.payload.forEach((eventObj) => {
    //       const coordinateObj = {
    //         id: eventObj.id,
    //         lat: eventObj.position.locations.latitude,
    //         lng: eventObj.position.locations.longitude,
    //         type: "event"
    //       };

    //       eventCoords.push(coordinateObj);
    //     });

    //     setMarkerCoordinates({
    //       ...markerCoordinates,
    //       eventCoordinates: eventCoords
    //     })
    //   });
  }

  return (

    <div className={styleClasses}>
      <APIProvider apiKey={import.meta.env.VITE_GMAP_API_KEY} libraries={["geometry"]}>
        {showPostInterface &&
          <LocationPostComponent
            setShowPostInterface={setShowPostInterface}
            setIsModalVisible={setIsModalVisible}
            setLocationCoords={setSearchedLocationCoords}
            locationCoords={searchedLocationCoords}
          />
        }
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

          <Map
            defaultCenter={currLocationCoords}
            defaultZoom={17}
            mapId={import.meta.env.VITE_GMAP_MAP_STYLE_ID}
            draggableCursor={showPostInterface ? "default" : "grab"}
            onClick={(e) => {
              if (!showPostInterface) return;
              setSearchedLocationCoords(e.detail.latLng);
            }}
            onIdle={(e) => setAllMarkers(e.map)}
          >
            {/* Current Location Marker: */}
            {currentLocationMarker}

            {/* Planted/Barren/Event Location Markers:*/}
            <Markers
              markerCoordinates={markerCoordinates}
              markerStates={markerStates}
              setSelectedLocationId={setSelectedLocationId}
              setSelectedLocationCoords={setSelectedLocationCoords}
              showPostInterface={showPostInterface}
            />

            {/* Searched Location Marker: */}
            {searchedLocationCoords && searchedLocationMarker}

          </Map>

          {!showPostInterface &&
            <MapControl position={ControlPosition.TOP_CENTER}>
              <PlaceAutocomplete onPlaceSelect={handlePlaceSelect} customInputRef={autocompleteInputRef}>
                {searchControls}
              </PlaceAutocomplete>
            </MapControl>
          }

          <RecenterButton locationCoords={currLocationCoords} />

          {!showPostInterface && mapControlsDiv}

          {selectedLocationId != null &&
            <LocationDetailComponent
              selectedLocationId={selectedLocationId}
              setSelectedLocationId={setSelectedLocationId}
              selectedLocationCoords = {selectedLocationCoords}
              setSelectedLocationCoords = {setSelectedLocationCoords}
            />
          }

        </div>
      </APIProvider>
    </div>
  );
}

export default MapComponent;

import { useState, useRef, useEffect } from "react";
import { Formik, Form,  } from "formik";
import { postLocationSchema } from "../schemas";
import { FormTextComponent, FormSelectComponent, FormikPlaceAutocomplete } from ".";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { postLocation } from "../features/locationSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

/*
    For autocomplete: https://developers.google.com/maps/documentation/javascript/examples/rgm-autocomplete#maps_rgm_autocomplete-javascript
*/

const getFormattedAddress = async (lat, lng, setFieldValue, fieldId) => {
  if (!window.google || !window.google.maps) return;

  const geocoder = new window.google.maps.Geocoder();
  const latLng = { lat, lng };
  // console.log(latLng);

  geocoder.geocode({ location: latLng }, (results, status) => {
    if (status === "OK" && results[0]) {
      setFieldValue(fieldId, results[0].formatted_address);
      // console.log("Geolocation address: "+results[0].formatted_address);
    }
    else {
      console.error("Geocoder failed due to: " + status);
    }
  });
};

function LocationPostComponent({ setShowPostInterface, setIsModalVisible, locationCoords, setLocationCoords }) {
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);

    if (!locationCoords) return;

    const postLocationObj = Object.assign({}, values);
    delete postLocationObj.address;
    postLocationObj["position"] = {
      locations: { latitude: locationCoords.lat, longitude: locationCoords.lng },
      address: values.address
    };

    dispatch(postLocation(postLocationObj)).unwrap()
      .then(() => {
        toast.success("Location Marking Successful");
        setIsModalVisible(true);
      })
      .catch((error) => {
        toast.error(error.message, "error");
        console.log(error);
        console.log("What was sent? :");
        console.log(postLocationObj);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const defaultContainerStyle = "flex flex-col gap-1 w-full";
  const defaultLabelStyle = "text-sm";
  const defaultInputStyle = "p-1 w-full border-[1px] rounded-lg border-[#60d6d9] focus:outline-[#2572CF]";

  const locationTypeOptions = ["Select location type", "PLANTED", "BARREN"];
  const waterAvailabilityOptions = [
    "Select water availability",
    "PLENTY",
    "MODERATE",
    "SCARCE",
  ];
  const spaceOptions = [
    "Select space type",
    "PLAINS",
    "SLOPE",
    "HILL",
    "SPACIOUS",
    "CONJUSTED",
    "RIVERBANK",
  ];

  const [locationSelected, setLocationSelected] = useState(false);

  const handlePlaceSelect = (map, selectedPlace) => {
    const locationCoords = selectedPlace.geometry.location;
    const nextCoords = { lat: locationCoords.lat(), lng: locationCoords.lng() }

    map.setCenter(nextCoords);
    setLocationSelected(true);
    setLocationCoords(nextCoords);
  }

  return (
    <div className="w-[49%] rounded-xl shadow-[rgba(96,214,217,0.2)_0px_0px_10px_3px] relative">
      <h2 className="font-bold flex rounded-t-xl justify-between text-lg mb-4 px-3 pt-2 bg-white absolute top-0 w-full">
        Mark a new location
        <span
          className="cursor-pointer text-sm"
          onClick={() => {
            setShowPostInterface(false);
            setLocationCoords(null);
          }}
        >
          ❌
        </span>
      </h2>
      <div className=" h-full overflow-y-scroll pt-10 pl-3 pr-6 ">
        <Formik
          initialValues={{
            name: "",
            description: "",
            type: "",
            address: "",
            waterAvailability: "",
            space: "",
          }}
          validationSchema={postLocationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => {

            useEffect(() => {
              if (locationCoords) {
                // Using reverse geocoding API here to fetch address
                getFormattedAddress(locationCoords.lat, locationCoords.lng, setFieldValue, "address");
                setLocationSelected(true);
              }
            }, [locationCoords, setFieldValue]);

            useEffect(() => {
              if(!locationSelected) {
                setLocationCoords(null);
              }
            }, [locationSelected, values.address]);
          
            return (
              <Form className="flex flex-col gap-4">
                <FormTextComponent
                  label="Name"
                  id="name"
                  name="name"
                  containerStyleClasses={defaultContainerStyle}
                  labelStyleClasses={defaultLabelStyle}
                  inputStyleClasses={defaultInputStyle}
                  type="text"
                  placeholder="Enter location name"
                />
                <FormTextComponent
                  label="Description (Optional)"
                  id="description"
                  name="description"
                  containerStyleClasses={defaultContainerStyle}
                  labelStyleClasses={defaultLabelStyle}
                  inputStyleClasses={defaultInputStyle}
                  isTextArea
                  type="text"
                  placeholder="Describe the location"
                />
                <FormSelectComponent
                  label="Location Type"
                  id="type"
                  name="type"
                  containerStyleClasses={defaultContainerStyle}
                  labelStyleClasses={defaultLabelStyle}
                  inputStyleClasses={defaultInputStyle}
                >
                  <option value="">{locationTypeOptions[0]}</option>
                  {locationTypeOptions.slice(1).map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </FormSelectComponent>

                <FormikPlaceAutocomplete 
                  id="address"
                  name="address"
                  label="Address"
                  type="text"
                  placeholder="Enter location address"
                  containerClassname={defaultContainerStyle}
                  inputClassname={defaultInputStyle}
                  labelClassname={defaultLabelStyle}
                  handlePlaceSelect={handlePlaceSelect}
                  placeSelected={locationSelected}
                  setPlaceSelected={setLocationSelected}
                  selectionCompulsory
                  usesMap
                />

                <FormSelectComponent
                  label="Water Availability"
                  id="waterAvailability"
                  name="waterAvailability"
                  containerStyleClasses={defaultContainerStyle}
                  labelStyleClasses={defaultLabelStyle}
                  inputStyleClasses={defaultInputStyle}
                >
                  <option value="">{waterAvailabilityOptions[0]}</option>
                  {waterAvailabilityOptions.slice(1).map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </FormSelectComponent>
                <FormSelectComponent
                  label="Space"
                  id="space"
                  name="space"
                  containerStyleClasses={defaultContainerStyle}
                  labelStyleClasses={defaultLabelStyle}
                  inputStyleClasses={defaultInputStyle}
                >
                  <option value="">{spaceOptions[0]}</option>
                  {spaceOptions.slice(1).map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </FormSelectComponent>
                <div className="flex flex-col gap-2 p-4 justify-center items-center">
                  <button
                    className="px-[15%] py-2 rounded-lg bg-gradient-120 shadow-md from-[#83E2C1] from-50% to-[#1566E7] to-100% hover:from-[#1566E7] hover:to-[#83E2C1] text-white"
                    type="submit"
                  >
                    Save
                  </button>
                  <span
                    className="text-red-600 text-center cursor-pointer hover:underline"
                    onClick={() => {
                      setShowPostInterface(false);
                      setLocationCoords(null);
                    }}
                  >
                    Cancel
                  </span>
                </div>
              </Form>
            )
          }
          }
        </Formik>
      </div>
    </div>
  );
}

export default LocationPostComponent;

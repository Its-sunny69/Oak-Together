import { useState, useRef } from "react";
import { Formik, Form } from "formik";
import { postLocationSchema } from "../schemas";
import { FormTextComponent, FormSelectComponent, PlaceAutocomplete } from ".";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { postLocation } from "../features/locationSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

/*
    For autocomplete: https://developers.google.com/maps/documentation/javascript/examples/rgm-autocomplete#maps_rgm_autocomplete-javascript
*/

function LocationPostComponent({ setShowPostInterface, setIsModalVisible, locationCoords, setLocationCoords }) {

  const addressInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);

    if(!locationCoords) return;

    const postLocationObj = Object.assign({}, values);
    delete postLocationObj.address;
    postLocationObj["position"] = { address: values.address };

    dispatch(postLocation(postLocationObj)).unwrap()
      .then(() => {
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

  const [showClearIcon, setShowClearIcon] = useState(false);

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

  return (
    <div className="w-[49%] rounded-xl shadow-[rgba(96,214,217,0.2)_0px_0px_10px_3px] relative">
      <h2 className="font-bold flex justify-between text-lg mb-4 px-3 pt-2 bg-white absolute top-0 w-full">
        Mark a new location
        <span
          className="cursor-pointer text-sm"
          onClick={() => {
            setShowPostInterface(false);
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
          {({ errors, touched, values, setFieldValue, setFieldTouched }) => (
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

              <PlaceAutocomplete
                onPlaceSelect={(coords) => setLocationCoords(coords)}
                customInputRef={addressInputRef}
                setInputValue={(value) => setFieldValue("address", value)}
              >
                <div className={defaultContainerStyle}>
                  <label className={defaultLabelStyle} htmlFor="address">Address</label>
                  <div className="relative flex items-center">
                    <input
                      className={
                        defaultInputStyle +
                        ((touched.address && (errors.address || locationCoords == null)) ?
                          " border-red-600" : "")
                      }
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Enter location address"
                      ref={addressInputRef}
                      value={values.address}
                      onBlur={() => setFieldTouched("address", true)}
                      onChange={(e) => {
                        setFieldValue("address", e.target.value);
                        setShowClearIcon(e.target.value.length > 0);
                        setLocationCoords(null);
                      }}
                    />
                    {showClearIcon &&
                      <div
                        className="h-3/4 absolute right-1 flex items-center px-2 rounded-r-lg text-[14px] cursor-pointer bg-white"
                        onClick={() => {
                          // addressInputRef.current.value = "";
                          // addressInputRef.current.focus();
                          setShowClearIcon(false);
                          setFieldValue("address", "");
                          setLocationCoords(null);
                        }}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </div>
                    }
                  </div>
                  {(touched.address && (errors.address || locationCoords == null)) ?
                    <div className="text-red-600 text-sm">
                      {errors.address ? errors.address : "Select a location from suggestion list"}
                    </div>
                    : null
                  }
                </div>
              </PlaceAutocomplete>

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
                  className="text-red-600 text-center cursor-pointer"
                  onClick={() => setShowPostInterface(false)}
                >
                  Cancel
                </span>
              </div>
            </Form>
          )
          }
        </Formik>
      </div>
    </div>
  );
}

export default LocationPostComponent;

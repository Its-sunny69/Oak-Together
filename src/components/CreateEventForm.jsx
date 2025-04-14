import { useState, useRef } from 'react'
import { useImmer } from "use-immer";
import { Formik, Form, useFormikContext } from "formik";
import { FormTextComponent, FormSelectComponent, PlaceAutocomplete } from ".";
import postEventSchema from '../schemas/postEventSchema';
import { useDispatch } from 'react-redux';
import { postEvent } from '../features/eventSlice';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons';
import { APIProvider } from '@vis.gl/react-google-maps'
import { faCircle, faCircleDot, faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

function getDateLimit(type, isMax) {
  if (type != "date") return null;

  const dateObj = new Date();
  const year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1, date = dateObj.getDate();

  month = (month < 10) ? `0${month}` : month;
  date = (date < 10) ? `0${date}` : date;

  return isMax ? `${year}-12-31` : `${year}-${month}-${date}`;
}

function FormSectionsThread({ activeSectionIndex, sectionStates, handleSectionChange }) {

  const formik = useFormikContext();

  const statusToStyleMap = {
    "Active": {
      icon: faCircleDot,
      color: "#0043CE"
    },
    "Untouched": {
      icon: faCircle,
      color: "#C6C6C6"
    },
    "Incomplete": {
      icon: faCircleQuestion,
      color: "#0043CE"
    },
    "Completed": {
      icon: faCircleCheck,
      color: "#0043CE"
    },
    "Error": {
      icon: faCircleXmark,
      color: "#CC0000"
    }
  }

  return (
    <div className="flex">
      {
        sectionStates.map(({ sectionName, status }, index) => {
          const { icon, color } = statusToStyleMap[status];

          return (
            <div key={sectionName} className="flex ">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center">
                  <div
                    style={{
                      height: "0.1rem",
                      width: "3vw",
                      backgroundColor: index > 0 ? statusToStyleMap[sectionStates[index - 1].status].color : ""
                    }}
                  >
                  </div>
                  <FontAwesomeIcon
                    className="text-xl cursor-pointer"
                    icon={icon}
                    style={{
                      color: color
                    }}
                    onClick={() => handleSectionChange(formik, activeSectionIndex, index)}
                  />
                  <div
                    style={{
                      height: "0.1rem",
                      width: "3vw",
                      backgroundColor: index < sectionStates.length - 1 ? color : ""
                    }}
                  >
                  </div>
                </div>
                <div className="text-[#6F6F6F] text-xs font-medium">
                  {sectionName}
                </div>
              </div>

            </div>
          )
        })
      }
    </div>
  )
}

const fieldContainerStyle = "flex flex-col w-full"
const fieldLabelStyle = "text-sm"
const fieldInputStyle = "p-1 w-[80%] border-2 rounded-lg border-[#60d6d9]  focus:outline-[#2572CF]"

function BasicFormSection() {

  

  return (
    <div>
      <FormTextComponent
        label="Name"
        id="name"
        name="name"
        containerStyleClasses={fieldContainerStyle}
        labelStyleClasses={fieldLabelStyle}
        inputStyleClasses={fieldInputStyle}
        type="text"
        placeholder="Enter location name"
      />

      {/* https://mui.com/x/react-date-pickers/date-picker/ */}
      {/* https://mui.com/x/react-date-pickers/time-picker/ */}
      {/* https://mui.com/x/react-date-pickers/validation/ */}
    </div>
  )
}

function LocationFormSection() {

  

  return (
    <div>
      b
    </div>
  )
}

function ParticipantsFormSection() {

  

  return (
    <div>
      c
    </div>
  )
}

function SponsorsFormSection() {

  

  return (
    <div>
      d
    </div>
  )
}

function ConfirmFormSection() {

  

  return (
    <div>
      e
    </div>
  )
}


// To-do:
// 1) Time validation for same date
// 2) Upgrade the interface

function CreateEventForm({ setCurrentView, setIsModalVisible }) {

  const dispatch = useDispatch();

  const handleFormSubmit = (values, { setSubmitting }) => {
    return; // remove this line later

    const postEventObj = Object.assign({}, values);
    postEventObj["position"] = { address: values["position"] };

    // console.log(postEventObj);

    dispatch(postEvent(postEventObj)).unwrap()
      .then(() => {
        toast.success("Event Creation Successful");
        setIsModalVisible(true);
      })
      .catch((error) => {
        toast.error(error.message, "error");
        console.log(error);
        console.log("What was sent? :");
        console.log(values);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [lastSectionVisited, setLastSectionVisited] = useState(false);
  const [sectionStates, setSectionStates] = useImmer([
    {
      sectionName: "Basic",
      formFieldIds:
        ["eventPictures", "name", "description", "eventStartDate", "eventEndDate", "eventStartTime", "eventEndTime"],
      status: "Active"
    },
    {
      sectionName: "Location",
      formFieldIds:
        ["address", "latitude", "longitude", "space", "waterAvailability", "estimatedArea"],
      status: "Untouched"
    },
    {
      sectionName: "Participants",
      formFieldIds:
        ["acceptingParticipants", "participantLimit"],
      status: "Untouched"
    },
    {
      sectionName: "Sponsors",
      formFieldIds:
        ["acceptingSponsors"],
      status: "Untouched"
    },
    {
      sectionName: "Confirm",
      formFieldIds: ["eventPictures", "name", "description", "eventStartDate", "eventEndDate", "eventStartTime", "eventEndTime", "address", "latitude", "longitude", "participantLimit", "acceptingSponsors", "acceptingParticipants", "targetPlantNumber", "estimatedArea", "totalAmountRaised", "space", "waterAvailability"],
      status: "Untouched"
    }
  ]);

  const formSectionMap = {
    "Basic": <BasicFormSection />,
    "Location": <LocationFormSection />,
    "Participants": <ParticipantsFormSection />,
    "Sponsors": <SponsorsFormSection />,
    "Confirm": <ConfirmFormSection />
  }

  const isEmptyField = (fieldValue) => {
    if (typeof fieldValue == "object") return Object.keys(fieldValue).length > 0;
    if (typeof fieldValue == "string") return fieldValue.trim().length == 0;

    return false;
  }

  const getSectionStatus = (formik, formFieldIds) => {
    let noFieldTouched = true, noFieldNull = true;

    for (const id of formFieldIds) {
      const fieldTouched = formik.touched[id];

      if (formik.errors[id] != null && fieldTouched != null) return "Error";

      noFieldTouched = noFieldTouched && !fieldTouched;
      noFieldNull = fieldTouched && noFieldNull && !isEmptyField(formik.values[id]);
    }

    if (noFieldNull) return "Completed";
    return noFieldTouched ? "Untouched" : "Incomplete";
  }

  const handleSectionChange = (formik, srcSectionIndex, targSectionIndex) => {
    if (targSectionIndex == sectionStates.length - 1) setLastSectionVisited(true);

    setSectionStates((sectionStatesList) => {
      const nextSrcStatus = getSectionStatus(formik, sectionStatesList[srcSectionIndex].formFieldIds);
      sectionStatesList[srcSectionIndex].status = nextSrcStatus;

      const nextTargStatus = getSectionStatus(formik, sectionStatesList[targSectionIndex].formFieldIds);
      sectionStatesList[targSectionIndex].status = nextTargStatus == "Completed" ? nextTargStatus : "Active";

      if (lastSectionVisited) {
        const nextConfirmationStatus = getSectionStatus(formik, sectionStatesList[sectionStatesList.length - 1].formFieldIds);
        sectionStatesList[sectionStatesList.length - 1].status = nextConfirmationStatus;
      }
    });

    setActiveSectionIndex(targSectionIndex);
  }

  const isFirstSection = activeSectionIndex == 0;
  const isLastSection = activeSectionIndex == sectionStates.length - 1;

  function FormTraversalButtons() {
    const formik = useFormikContext();
    return (
      <div className="absolute right-6 bottom-4 flex gap-5 justify-end w-full">
        {
          !isFirstSection &&
          <button
            className={`px-8 py-2 rounded-lg bg-gradient-120 bg-white shadow-[rgba(96,214,217,0.2)_3.5px_4px_16px_0px] hover:bg-[rgba(96,214,217,0.3)] text-black text-sm font-medium active:scale-95 transition-all `}
            onClick={() => { handleSectionChange(formik, activeSectionIndex, activeSectionIndex - 1) }}
          >
            Back
          </button>
        }
        <button
          className="px-8 py-2 rounded-lg bg-gradient-120 shadow-md from-[#60D6D9] from-50% to-[#1566E7] to-100% hover:from-[#1566E7] hover:to-[#60D6D9] text-white font-medium active:scale-95 transition-all "
          onClick={() => {
            if (!isLastSection) handleSectionChange(formik, activeSectionIndex, activeSectionIndex + 1);
          }}
          type={isLastSection ? "submit" : null} // for final form submission
        >
          {isLastSection ? "Create Event" : "Next"}
        </button>
      </div>
    )
  }

  const activeSectionObj = sectionStates[activeSectionIndex];

  return (
    <div className="flex justify-center py-4 w-full animate-fade-up transition-all">

      <Formik
        initialValues={{
          eventPictures: [],
          name: "",
          description: "",
          eventStartDate: "",
          eventEndDate: "",
          eventStartTime: "",
          eventEndTime: "",
          address: "",
          latitude: "",
          longitude: "",
          participantLimit: "",
          acceptingSponsors: "",
          acceptingParticipants: "",
          targetPlantNumber: "",
          estimatedArea: "",
          totalAmountRaised: "",
          space: "",
          waterAvailability: "",
        }}
        validationSchema={postEventSchema}
        onSubmit={handleFormSubmit}
      >

        <div className="flex flex-col items-center gap-8 w-[60%]">

          <FormSectionsThread
            activeSectionIndex={activeSectionIndex}
            sectionStates={sectionStates}
            handleSectionChange={handleSectionChange}
          />

          <Form className={`relative flex justify-center py-5 px-8 shadow-[rgba(96,214,217,0.2)_3.5px_5.5px_16px_0px] rounded-lg w-full h-[80vh]`}>

            <div className="h-[86%] w-full overflow-y-scroll">
              {formSectionMap[activeSectionObj.sectionName]}
            </div>

            <FormTraversalButtons />

          </Form>

        </div>

      </Formik>
    </div>
  )
}

export default CreateEventForm


// old code:
// <APIProvider apiKey={import.meta.env.VITE_GMAP_API_KEY} libraries={["geometry"]}>
//   <div className="flex mt-[10vh] justify-center w-full h-screen overflow-y-scroll">

//     <Formik
//       initialValues={{
//         name: "",
//         description: "",
//         eventStartDate: "",
//         eventEndDate: "",
//         eventStartTime: "",
//         eventEndTime: "",
//         position: "",
//         participantLimit: "",
//         acceptingSponsors: false,
//         acceptingParticipants: false,
//         targetPlantNumber: "",
//         estimatedArea: "",
//         totalAmountRaised: "",
//         space: "",
//         waterAvailability: "",
//       }}
//       validationSchema={postEventSchema}
//       onSubmit={handleFormSubmit}
//     >
//       {({ errors, touched, values, setFieldValue, setFieldTouched, formikProps }) => {

//         console.log(errors)

//         return (
//           <Form
//             className="flex flex-col gap-5 items-start justify-center pl-4 w-1/2 rounded-l-lg"
//           >

//             <PlaceAutocomplete
//               isEventForm
//               customInputRef={positionInputRef}
//               setInputValue={(value) => setFieldValue("position", value)}
//               customContainerStyle={{ width: "80%" }}
//             >
//               <div className={defaultContainerStyle}>
//                 <label htmlFor="position">Address</label>
//                 <div className="relative flex items-center">
//                   <input
//                     className={
//                       defaultInputStyle + " w-full " +
//                       ((touched.position && errors.position) ?
//                         " border-red-600" : "")
//                     }
//                     id="position"
//                     name="position"
//                     type="text"
//                     placeholder="Enter event location address"
//                     ref={positionInputRef}
//                     value={values.position}
//                     onBlur={() => setFieldTouched("position", true)}
//                     onChange={(e) => {
//                       setFieldValue("position", e.target.value);
//                       setShowClearIcon(e.target.value.length > 0);
//                     }}
//                   />
//                   {showClearIcon &&
//                     <div
//                       className="h-3/4 absolute right-1 flex items-center px-2 rounded-r-lg text-[14px] cursor-pointer bg-white"
//                       onClick={() => {
//                         setShowClearIcon(false);
//                         setFieldValue("position", "");
//                       }}
//                     >
//                       <FontAwesomeIcon icon={faXmark} />
//                     </div>
//                   }
//                 </div>
//                 {(touched.position && errors.position) ?
//                   <div className="text-red-600 text-sm">
//                     {errors.position ? errors.position : "Select a location from suggestion list"}
//                   </div>
//                   : null
//                 }
//               </div>
//             </PlaceAutocomplete>

//             {formTextObjects.map(({ id, name, label, placeholder, type }) => (
//               <div className="flex w-full flex-col items-start" key={label}>
//                 <FormTextComponent
//                   label={label}
//                   containerStyleClasses={defaultContainerStyle}
//                   inputStyleClasses={defaultInputStyle}
//                   id={id}
//                   name={name}
//                   type={type}
//                   isTextArea={type == "textarea"}
//                   placeholder={placeholder ? placeholder : ""}
//                   min={getDateLimit(type, false)}
//                   max={getDateLimit(type, true)}
//                 />
//               </div>
//             ))}

//             {formSelectObjects.map(
//               ({ id, name, label, defaultOptions }) => (
//                 <div className="flex w-full flex-col items-start" key={label}>
//                   <FormSelectComponent
//                     label={label}
//                     id={id}
//                     name={name}
//                     containerStyleClasses={defaultContainerStyle}
//                     inputStyleClasses={defaultInputStyle}
//                   >
//                     <option value="">{defaultOptions[0]}</option>

//                     {defaultOptions?.slice(1).map((option) => (
//                       <option key={option} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </FormSelectComponent>
//                 </div>
//               )
//             )}

//             {
//               formCheckBoxObjects.map(
//                 ({ id, name, label }) => (
//                   <div className="relative w-full" key={id}>
//                     <label className="flex items-center gap-2" htmlFor={id}>
//                       <input
//                         className="appearance-none w-6 h-6 border-2 border-teal-300 rounded-md checked:border-transparent checked:bg-teal-400 cursor-pointer"
//                         id={id}
//                         name={name}
//                         type="checkbox"
//                         checked={values[id]}
//                         onBlur={() => setFieldTouched(id, true)}
//                         onChange={() => setFieldValue(id, !values[id])}
//                       />
//                       {values[id] &&
//                         <span className="absolute left-1 text-lg pointer-events-none text-white font-extrabold">
//                           ✓
//                         </span>
//                       }
//                       <span>{label}</span>
//                     </label>
//                   </div>
//                 )
//               )
//             }

//             <div className="flex flex-col gap-2 p-4 justify-center items-center w-[80%]">
//               <button
//                 className="px-[15%] py-2 rounded-lg bg-gradient-120 shadow-md from-[#83E2C1] from-50% to-[#1566E7] to-100% hover:from-[#1566E7] hover:to-[#83E2C1] text-white"
//                 type="submit"
//               >
//                 Save
//               </button>
//               <span
//                 className="text-red-600 text-center cursor-pointer hover:underline"
//                 onClick={() => {
//                   setCurrentView("event-search");
//                 }}
//               >
//                 Cancel
//               </span>
//             </div>
//           </Form>
//         )
//       }
//       }
//     </Formik>
//   </div>
// </APIProvider>
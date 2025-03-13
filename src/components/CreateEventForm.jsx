import React from 'react'
import { Formik, Form } from "formik";
import { FormTextComponent, FormSelectComponent } from ".";

function CreateEventForm() {
    const formTextObjects = [
        {
          id: "name",
          name: "name",
          label: "Name",
          placeholder: "Event Name",
          type: "text",
        },
        {
          id: "description",
          name: "description",
          label: "Description",
          placeholder: "Describe Event",
          type: "textarea",
        },
        {
          id: "eventStartDate",
          name: "eventStartDate",
          label: "Event Start Date",
          type: "date",
        },
        {
          id: "eventEndDate",
          name: "eventEndDate",
          label: "Event End Date",
          type: "date",
        },
        {
          id: "eventStartTime",
          name: "eventStartTime",
          label: "Event Start Time",
          type: "time",
        },
        {
          id: "eventEndTime",
          name: "eventEndTime",
          label: "Event End Time",
          type: "time",
        },
        {
          id: "targetWasteCollection",
          name: "targetWasteCollection",
          label: "Target Waste Collection",
          placeholder: "Target Waste Collection",
          type: "number",
        },
        {
          id: "participantLimit",
          name: "participantLimit",
          label: "Participant Limit",
          placeholder: "Participant Limit",
          type: "Number",
        },
        {
          id: "targetPlantNumber",
          name: "targetPlantNumber",
          label: "Target Plant Number",
          placeholder: "Target Plant Number",
          type: "Number",
        },
        {
          id: "estimatedArea",
          name: "estimatedArea",
          label: "Estimated Area",
          placeholder: "Estimated Area",
          type: "Number",
        },
        {
          id: "estimatedCost",
          name: "estimatedCost",
          label: "Estimated Cost",
          placeholder: "Estimated Cost",
          type: "Number",
        },
        {
          id: "totalAmountRaised",
          name: "totalAmountRaised",
          label: "Total Amount Raised",
          placeholder: "Total Amount Raised",
          type: "Number",
        },
      ];

      const formSelectObjects = [
        {
          id: "eventStatus",
          name: "eventStatus",
          label: "Event Status",
          defaultOptions: ["Select Status", "UPCOMING", "ONGOING", "COMPLETED"],
        },
        {
          id: "space",
          name: "space",
          label: "Space",
          defaultOptions: ["Select Space", "PLAINS", "SLOPE", "HILL", "SPACIOUS", "CONJUSTED", "RIVERBANK"],
        },
        {
          id: "waterAvailability",
          name: "waterAvailability",
          label: "Water Availability",
          defaultOptions: ["Select Availability", "PLENTY", "MODERATE", "SCARCE"],
        },
    ]

    const defaultContainerStyle = "flex flex-col w-full";
  const defaultInputStyle =
    "p-1 w-[80%] border-2 rounded-lg border-[#60d6d9]  focus:outline-[#2572CF]";

  return (
    <div>
        <Formik
        initialValues={{
          name: "",
          description: "",
          eventStartDate: "", 
          eventEndDate: "",
          eventStartTime: "", 
          position: "",
          targetWasteCollection: "",
          participantLimit: "",
          acceptingSponsors: "",
          acceptingParticipants: "",
          targetPlantNumber: "",
          estimatedArea: "",
          totalAmountRaised: "",
          eventStatus: "",
          space: "",
          waterAvailability: "",
        }}
        // validationSchema={signUpSchema}
        // onSubmit={handleFormSubmit}
      >
        <Form className="flex flex-col gap-5 items-start justify-center p-8 w-full rounded-l-lg">
          {formTextObjects.map(({ id, name, label, placeholder, type }) => (
            <div className="flex w-full flex-col items-start" key={label}>
              <FormTextComponent
                label={label}
                containerStyleClasses={defaultContainerStyle}
                inputStyleClasses={defaultInputStyle}
                id={id}
                name={name}
                type={type}
                isTextArea={id == "description"}
                placeholder={placeholder ? placeholder : ""}
              />
            </div>
          ))}

          {formSelectObjects.map(
            ({ id, name, label, setSelected, defaultOptions }) => (
              <div className="flex w-full flex-col items-start" key={label}>
                <FormSelectComponent
                  label={label}
                  id={id}
                  name={name}
                  containerStyleClasses={defaultContainerStyle}
                  inputStyleClasses={defaultInputStyle}
                // setSelected={setSelected}
                >
                  <option value="">{defaultOptions[0]}</option>

                  {defaultOptions?.slice(1).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </FormSelectComponent>
              </div>
            )
          )}
          </Form>
          </Formik>
    </div>
  )
}

export default CreateEventForm
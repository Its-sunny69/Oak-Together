import { useState } from "react";
import { ProfileHeader2 } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { FormSelectMUI, FormikPlaceAutocomplete } from "./";
import { APIProvider } from "@vis.gl/react-google-maps";
import * as Yup from "yup";
import { intelligenceApi } from "../features/geminiSlice";
import toast from "react-hot-toast";

const fieldContainerStyle = "flex flex-col w-full gap-2 mx-1"
const fieldLabelStyle = "text-sm text-black font-medium"
const fieldInputStyle = "py-2 px-4 w-full border-[1px] rounded-lg border-[#60d6d9] focus:outline-[#2572CF]"
const fieldSelectStyleObject = {
  width: "100%",
  border: "1px solid #60D6D9",
  borderRadius: "0.5rem",
  backgroundColor: "white",
  placeholderColor: "#a2a2a2",
  padding: "0rem",
  focusOutline: "2px solid #60D6D9",
  iconColor: "#60D6D9",
  hoverBgColor: "#60D6D9",
  hoverTextColor: "black",
};

function AskAIPageContent() {

  const dispatch = useDispatch();
  const { intelligenceResponse } = useSelector((state) => state.gemini);

  const handleSubmit = (values) => {

    const params = 
    `address=${values.address}&space=${values.address}&waterAvailability=${values.waterAvailability}`;

    dispatch(intelligenceApi(params)).unwrap()
    .then(() => {
      toast.success("Details obtained");
      // console.log(intelligenceResponse);
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.message, "error");
    })
  }

  const [placeSelected, setPlaceSelected] = useState(false);


  return (
    <APIProvider apiKey={import.meta.env.VITE_GMAP_API_KEY} libraries={["geometry"]}>
      <div className="flex flex-col gap-8 pt-6 pr-4 w-full">
        <ProfileHeader2
          absolutePositionObj={{
            top: "8rem"
          }}
        >
          <Formik
            initialValues={{
              address: "",
              space: "",
              waterAvailability: ""
            }}
            validationSchema={
              Yup.object({
                address:
                  Yup.string().trim().required("Required"),
                waterAvailability:
                  Yup.string().required("Required"),
                space:
                  Yup.string().required("Required")
              })
            }
            onSubmit={handleSubmit}
          >

            {({ values, setFieldTouched, setFieldValue }) => {

              const handleFormClear = () => {
                Object.keys(values).forEach((fieldId) => {
                  setFieldTouched(fieldId, false);
                  setFieldValue(fieldId, "");
                })
              }

              const handlePlaceSelect = (selectedPlace) => {
                setFieldValue("address", selectedPlace.formatted_address);
                setPlaceSelected(true);
              }

              return (
                <Form className="flex flex-col gap-6 py-4 h-full w-full">
                  <div className="flex gap-3 w-full">
                    <FormikPlaceAutocomplete
                      id="address"
                      name="address"
                      label="Address"
                      placeholder=""
                      type="text"
                      containerClassname="flex flex-col w-[30vw] gap-2 mx-1"
                      inputClassname={fieldInputStyle}
                      labelClassname={fieldLabelStyle}
                      handlePlaceSelect={handlePlaceSelect}
                      placeSelected={placeSelected}
                      setPlaceSelected={setPlaceSelected}
                      selectionCompulsory
                    />
                    <FormSelectMUI
                      label="Space"
                      id="space"
                      name="space"
                      options={
                        ["PLAINS", "SLOPE", "HILL", "SPACIOUS", "CONJUSTED", "RIVERBANK"]
                          .map((opt) => { return { label: opt, value: opt } })
                      }
                      containerStyleClasses={fieldContainerStyle}
                      labelStyleClasses={fieldLabelStyle}
                      selectStyleObject={fieldSelectStyleObject}
                    />
                    <FormSelectMUI
                      label="Water Availability"
                      id="waterAvailability"
                      name="waterAvailability"
                      options={
                        ["PLENTY", "MODERATE", "SCARCE"]
                          .map((opt) => { return { label: opt, value: opt } })
                      }
                      containerStyleClasses={fieldContainerStyle}
                      labelStyleClasses={fieldLabelStyle}
                      selectStyleObject={fieldSelectStyleObject}
                    />
                  </div>
                  <div className="flex justify-end gap-6 w-full">
                    <button
                      className={`px-8 py-2 rounded-lg bg-gradient-120 bg-white shadow-[rgba(96,214,217,0.2)_3.5px_4px_16px_0px] hover:bg-[rgba(96,214,217,0.3)] text-[#D20000] text-sm font-medium active:scale-95 transition-all `}
                      onClick={handleFormClear}
                      type="button"
                    >
                      Clear
                    </button>
                    <button
                      className="px-6 py-2 rounded-lg bg-gradient-120 shadow-md from-[#60D6D9] from-50% to-[#1566E7] to-100% hover:from-[#1566E7] hover:to-[#60D6D9] text-white font-medium active:scale-95 transition-all "
                      type="submit"
                    >
                      Generate Insights
                    </button>
                  </div>
                </Form>
              )
            }}
          </Formik>
        </ProfileHeader2>

        {/* Use 'intelligenceResponse' here: */}
        
      </div>
    </APIProvider>
  );
}

export default AskAIPageContent;

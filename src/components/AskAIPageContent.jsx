import { useState } from "react";
import { ProfileHeader2 } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { FormSelectMUI, FormikPlaceAutocomplete } from "./";
import { APIProvider } from "@vis.gl/react-google-maps";
import * as Yup from "yup";
import { intelligenceApi } from "../features/geminiSlice";
import toast from "react-hot-toast";
import { FinancePng, LoadingAnimation } from "../assets";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
  LogoDev,
} from "@mui/icons-material";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Mousewheel,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import GeneralDropDown from "./GeneralDropDown";

const fieldContainerStyle = "flex flex-col w-full gap-2 mx-1";
const fieldLabelStyle = "text-sm text-black font-medium";
const fieldInputStyle =
  "py-2 px-4 w-full border-[1px] rounded-lg border-[#60d6d9] focus:outline-[#2572CF]";
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
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { intelligenceResponse: intelligence } = useSelector(
    (state) => state.gemini
  );

  const handlePrevData = () => {
    console.log("prev clicked");
    if (count > 0) setCount(count - 1);
  };
  const handleNextData = () => {
    console.log("next clicked");
    if (count < intelligence.fertilizerRecommendations.length - 1)
      setCount(count + 1);
  };

  const handleSubmit = (values) => {
    const params = `address=${values.address}&space=${values.address}&waterAvailability=${values.waterAvailability}`;

    setLoading(true);
    console.log(loading);

    dispatch(intelligenceApi(params))
      .unwrap()
      .then(() => {
        toast.success("Details obtained");
        setLoading(false);
        // console.log(intelligenceResponse);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message, "error");
      });
  };

  const handleLoading = () => {
    if (intelligence) setLoading(!loading);
  };

  const [placeSelected, setPlaceSelected] = useState(false);

  const formatTitle = (str) => {
    return str
      .replace(/([A-Z])/g, " $1") // add space before capital letters
      .replace(/^./, (char) => char.toUpperCase()); // capitalize first letter
  };

  return (
    <APIProvider
      apiKey={import.meta.env.VITE_GMAP_API_KEY}
      libraries={["geometry"]}
    >
      <div className="pt-6 pr-4 w-full overflow-hidden">
        <ProfileHeader2
          absolutePositionObj={{
            top: "8rem",
          }}
        >
          <Formik
            initialValues={{
              address: "",
              space: "",
              waterAvailability: "",
            }}
            validationSchema={Yup.object({
              address: Yup.string().trim().required("Required"),
              waterAvailability: Yup.string().required("Required"),
              space: Yup.string().required("Required"),
            })}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldTouched, setFieldValue }) => {
              const handleFormClear = () => {
                Object.keys(values).forEach((fieldId) => {
                  setFieldTouched(fieldId, false);
                  setFieldValue(fieldId, "");
                });
              };

              const handlePlaceSelect = (selectedPlace) => {
                setFieldValue("address", selectedPlace.formatted_address);
                setPlaceSelected(true);
              };

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
                      options={[
                        "PLAINS",
                        "SLOPE",
                        "HILL",
                        "SPACIOUS",
                        "CONJUSTED",
                        "RIVERBANK",
                      ].map((opt) => {
                        return { label: opt, value: opt };
                      })}
                      containerStyleClasses={fieldContainerStyle}
                      labelStyleClasses={fieldLabelStyle}
                      selectStyleObject={fieldSelectStyleObject}
                    />
                    <FormSelectMUI
                      label="Water Availability"
                      id="waterAvailability"
                      name="waterAvailability"
                      options={["PLENTY", "MODERATE", "SCARCE"].map((opt) => {
                        return { label: opt, value: opt };
                      })}
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
                      onClick={handleLoading}
                    >
                      Generate Insights
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </ProfileHeader2>

        {/* Use 'intelligenceResponse' here: */}

        {intelligence ? (
          loading ? (
            <div className="bg-white min-h-64 flex items-center justify-center font-semibold">
              <DotLottieReact
                src={LoadingAnimation}
                loop
                autoplay
                style={{ width: 140, height: 140 }}
              />
            </div>
          ) : (
            <div className="mt-16">
              <div className="bg-[#47B2FF] text-white p-6 rounded-2xl">
                <p className="font-semibold text-lg">Tree to Plant!</p>

                <div>
                  <p className="text-center font-semibold mt-1 mb-5">
                    {intelligence.fertilizerRecommendations[count].treeName}
                  </p>

                  <div className="flex">
                    <div className="w-1/2">
                      <div className="bg-white text-black rounded-xl min-h-20 mb-5 p-2">
                        <p className="text-[#1566E7] font-semibold">
                          Suggested Fertilizers
                        </p>

                        <p>
                          {
                            intelligence.fertilizerRecommendations[count]
                              .fertilizerType
                          }
                        </p>
                      </div>

                      <div className="bg-white text-black rounded-xl min-h-20 p-2">
                        <p className="text-[#1566E7] font-semibold">
                          Key Nutrients
                        </p>

                        <p>
                          {
                            intelligence.fertilizerRecommendations[count]
                              .keyNutrients
                          }
                        </p>
                      </div>
                    </div>

                    <div className="w-[1.5px] bg-white mx-3 rounded-xl"></div>

                    <div className="w-1/2">
                      <div className="bg-white text-black rounded-xl h-full p-2">
                        <p className="text-[#1566E7] font-semibold">Cautions</p>

                        <p>
                          {
                            intelligence.fertilizerRecommendations[count]
                              .caution
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end items-center mt-3">
                  <button
                    className={`mr-4 ${count == 0 ? "opacity-65" : ""}`}
                    onClick={handlePrevData}
                  >
                    <ArrowBackIosRounded fontSize="xs" />
                    Previous Tree
                  </button>
                  <button
                    className={`${
                      count == intelligence.fertilizerRecommendations.length - 1
                        ? "opacity-65"
                        : ""
                    }`}
                    onClick={handleNextData}
                  >
                    Next Tree
                    <ArrowForwardIosRounded fontSize="xs" />
                  </button>
                </div>
              </div>
              <div>
                {intelligence.generalInfo.map((info, index) => {
                  const key = Object.keys(info)[0];
                  const value = info[key];
                  return (
                    <GeneralDropDown
                      key={index}
                      listName={key}
                      ListContent={value}
                    />
                  );
                })}
              </div>
              <div>
                <Swiper
                  // install Swiper modules
                  modules={[
                    Autoplay,
                    Mousewheel,
                    Navigation,
                    Pagination,
                    Scrollbar,
                    A11y,
                  ]}
                  spaceBetween={10}
                  slidesPerView={2.2}
                  slideToClickedSlide={true}
                  mousewheel={true}
                  initialSlide={1}
                  // autoplay={{
                  //   delay: 2500,
                  //   disableOnInteraction: true,
                  // }}

                  className="w-full p-4"
                >
                  {intelligence.benefits.map((benefit, index) => {
                    const key = Object.keys(benefit)[0];
                    const value = benefit[key];
                    return (
                      <SwiperSlide key={index}>
                        <div className="flex flex-col rounded-xl shadow-[3.5px_5.5px_16px_0px_#60d6d973] min-h-[25rem]">
                          <img
                            src={FinancePng}
                            alt="image"
                            className="w-full rounded-xl rounded-b-none object-cover"
                          />

                          <div className="p-4">
                            <p className="my-1 font-semibold">
                              {formatTitle(key)}
                            </p>
                            <p>{value}</p>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          )
        ) : (
          ""
        )}
      </div>
    </APIProvider>
  );
}

export default AskAIPageContent;

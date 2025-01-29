import MapComponent from "./MapComponent";
import { Formik, Form } from "formik";
import { postLocationSchema } from "../schemas";
import FormTextComponent from "./FormTextComponent";
import FormSelectComponent from "./FormSelectComponent";
import toast from "react-hot-toast";

/*
    For autocomplete: https://developers.google.com/maps/documentation/javascript/examples/rgm-autocomplete#maps_rgm_autocomplete-javascript
*/

function LocationPostComponent({ setShowPostInterface }) {

    const handleSubmit = (values, { setSubmitting }) => {
        console.log(values);

        const apiUrl = import.meta.env.VITE_SERVER_API_URL;
        const postLocationObj = Object.assign({}, values);
        delete postLocationObj.address;
        postLocationObj["position"] = {address: values.address};

        const postHeaders = new Headers();
        postHeaders.append("Content-Type", "application/json");

        fetch(apiUrl + "/user-profiles/user-id/1/locations", {
            method: "POST",
            body: JSON.stringify(postLocationObj),
            headers: postHeaders
        })
        .then(async (response) => {
            const responseObj = await response.json();
            if (!response.ok) throw new Error(`${responseObj.message}`);
            console.log("Response: ");
            console.log(responseObj);
            return responseObj;
          })
          .then((data) => {
            toast.success(`Location ${data.name}`, " marked successfully!");
          })
          .catch((error) => {
            toast.error(error.message, "error");
            console.log("What was sent? :");
            console.log(postLocationObj);
          })
          .finally(() => {
            setSubmitting(false);
          });
    }

    const defaultContainerStyle = "flex flex-col gap-1 w-full";
    const defaultLabelStyle = "text-sm";
    const defaultInputStyle = "p-1 w-full border-[1px] rounded-lg border-[#60d6d9]  focus:outline-[#2572CF]";

    const locationTypeOptions = ["Select location type", "PLANTED", "BARREN"];
    const waterAvailabilityOptions = ["Select water availability", "PLENTY", "MODERATE", "SCARCE"];
    const spaceOptions = ["Select space type", "PLAINS", "SLOPE", "HILL", "SPACIOUS", "CONJUSTED", "RIVERBANK"];

    return (
        <div className="w-[49%] rounded-xl shadow-[rgba(96,214,217,0.2)_0px_0px_10px_3px] relative">
            <h2 className="font-bold text-lg mb-4 pt-2 pl-2 bg-white absolute top-0 w-full">Mark a new location</h2>
            <div className=" h-full overflow-y-scroll pt-10 pl-3 pr-6 ">
                <Formik
                    initialValues={{
                        name: "",
                        description: "",
                        type: "",
                        address: "",
                        waterAvailability: "",
                        space: ""
                    }}
                    validationSchema={postLocationSchema}
                    onSubmit={handleSubmit}
                >
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
                            {
                                locationTypeOptions
                                    .slice(1)
                                    .map((option, index) => <option key={index} value={option}>{option}</option>)
                            }
                        </FormSelectComponent>
                        <FormTextComponent
                            label="Address"
                            id="address"
                            name="address"
                            containerStyleClasses={defaultContainerStyle}
                            labelStyleClasses={defaultLabelStyle}
                            inputStyleClasses={defaultInputStyle}
                            isTextArea
                            type="text"
                            placeholder="Enter location address"
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
                            {
                                waterAvailabilityOptions
                                    .slice(1)
                                    .map((option, index) => <option key={index} value={option}>{option}</option>)
                            }
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
                            {
                                spaceOptions
                                    .slice(1)
                                    .map((option, index) => <option key={index} value={option}>{option}</option>)
                            }
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
                </Formik>
            </div>
        </div>

    )
}

export default LocationPostComponent
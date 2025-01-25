import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks";
import {
  getAllCountryNames,
  getStateNamesByCountryName,
  getCityNamesByStateName,
} from "../api";
import { signUpSchema } from "../schemas";
import { Formik, Form } from "formik";
import { SignUpButton, FormTextComponent, FormSelectComponent } from ".";
import toast from "react-hot-toast";

function SignUpForm() {
  const navigate = useNavigate();

  // const [countryResponse, setCountryResponse] = useApi(() =>
  //   getAllCountryNames()
  // );
  // const [selectedCountry, setSelectedCountry] = useState("");

  // const [stateResponse, setStateResponse] = useApi(() =>
  //   getStateNamesByCountryName(selectedCountry)
  // );
  // const [selectedState, setSelectedState] = useState("");

  // const [cityResponse, setCityResponse] = useApi(() =>
  //   getCityNamesByStateName(selectedState)
  // );

  // useEffect(() => {
  //   setCountryResponse();
  // }, []); // renders country dropdown once, countryResponse will never change

  // useEffect(() => {
  //   const defaultValue = selectedCountry ? null : [];
  //   setSelectedState(""); // This step is important to update the city dropdown
  //   setStateResponse(defaultValue);
  // }, [selectedCountry]);
  // renders state dropdown every time selected Country changes
  // also changes state for selectedState, so that below useEffect works

  // useEffect(() => {
  //   const defaultValue = selectedState ? null : [];
  //   setCityResponse(defaultValue);
  // }, [selectedState]); // renders city dropdown every time selected State changes

  const formTextObjects = [
    {
      id: "name",
      name: "name",
      label: "Name",
      placeholder: "What Can We Call You?",
      type: "text",
    },
    {
      id: "email",
      name: "email",
      label: "Email",
      placeholder: "Enter email address",
      type: "email",
    },
    {
      id: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter password",
      type: "password",
    },
    {
      id: "confirmPassword",
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Enter same password",
      type: "password",
    },
    {
      id: "description",
      name: "description",
      label: "Description (Optional)",
      placeholder: "Describe Your Self",
      type: "textarea",
    },
  ];

  const formSelectObjects = [
    {
      id: "role",
      name: "role",
      label: "Role",
      defaultOptions: ["Select Role", "USERPROFILE", "ORGANIZATION"],
    },
    //   {
    //     id: "gender",
    //     name: "gender",
    //     label: "Gender",
    //     defaultOptions: ["Select Gender", "Male", "Female", "Other"],
    //   },
    //   {
    //     id: "country",
    //     name: "country",
    //     label: "Country",
    //     setSelected: setSelectedCountry,
    //     response: countryResponse,
    //     defaultOptions: ["Select Country"],
    //   },
    //   {
    //     id: "state",
    //     name: "state",
    //     label: "State",
    //     setSelected: setSelectedState,
    //     response: stateResponse,
    //     defaultOptions: ["Select State"],
    //   },
    //   {
    //     id: "city",
    //     name: "city",
    //     label: "City",
    //     response: cityResponse,
    //     defaultOptions: ["Select City"],
    //   },
  ];

  const handleFormSubmit = (values, { setSubmitting }) => {
    
    const apiUrl = import.meta.env.VITE_SERVER_API_URL;

    const postHeaders = new Headers();
    postHeaders.append("Content-Type", "application/json");

    fetch(apiUrl + "/user-profiles/register", {
      method: "POST",
      body: JSON.stringify(values),
      headers: postHeaders,
    })
      .then(async (response) => {
        const responseObj = await response.json();
        if (!response.ok) throw new Error(`${responseObj.message}`);
        return responseObj;
      })
      .then((data) => {
        toast.success(`Welcome ${data.name} 🎉`, "success");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message, "error");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const defaultRowStyle =
    "p-1 w-[80%] border-2 rounded-lg border-[#60d6d9]  focus:outline-[#2572CF]";

  return (
    <div className="flex items-center justify-center rounded-l-lg">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "", // use hashing for password?
          confirmPassword: "",
          description: "", // use date-picker and get age as calculated result from D.O.B? //sunny
          role: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={handleFormSubmit}
      >
        <Form className="flex flex-col gap-5 items-start justify-center p-8 w-full rounded-l-lg">
          {formTextObjects.map(({ id, name, label, placeholder, type }) => (
            <div className="flex w-full flex-col items-start" key={label}>
              <FormTextComponent
                label={label}
                styleClasses={defaultRowStyle}
                id={id}
                name={name}
                type={type}
                isTextArea={id == "description"}
                placeholder={placeholder}
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
                  setSelected={setSelected}
                  styleClasses={defaultRowStyle}
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

          <div className="flex w-full justify-between items-center">
            <div className="text-sm text-slate-600">
              <p>
                Already Registered?{" "}
                <a
                  onClick={() => navigate("/login")}
                  className="hover:text-slate-400 underline underline-offset-2 cursor-pointer"
                >
                  Login
                </a>
              </p>
            </div>
            <SignUpButton />
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default SignUpForm;

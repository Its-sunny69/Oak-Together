import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks";
import {
    getAllCountries,
    getStatesByCountryName,
    getCitiesByStateName
} from "../api";
import { signUpSchema } from "../schemas";
import { Formik, Form } from "formik";
import {
    SignUpButton,
    FormTextComponent,
    FormSelectComponent
} from ".";


function SignUpForm({ setErrorMessage }) {

    const navigate = useNavigate();

    const [countryResponse, setCountryResponse] = useApi(() => getAllCountries());
    const [selectedCountry, setSelectedCountry] = useState("");

    const [stateResponse, setStateResponse] = useApi(() => getStatesByCountryName(selectedCountry));
    const [selectedState, setSelectedState] = useState("");

    const [cityResponse, setCityResponse] = useApi(() => getCitiesByStateName(selectedState));

    useEffect(() => {
        setCountryResponse();
    }, []); // renders country dropdown once, countryResponse will never change

    useEffect(() => {
        const defaultValue = (selectedCountry) ? null : [];
        setSelectedState(""); // This step is important to update the city dropdown
        setStateResponse(defaultValue);
    }, [selectedCountry]);
    // renders state dropdown every time selected Country changes
    // also changes state for selectedState, so that below useEffect works

    useEffect(() => {
        const defaultValue = (selectedState) ? null : [];
        setCityResponse(defaultValue);
    }, [selectedState]); // renders city dropdown every time selected State changes

    const formTextObjects = [
        { id: "firstName", name: "firstName", label: "First Name", placeholder: "Enter first name", type: "text" },
        { id: "lastName", name: "lastName", label: "Last Name", placeholder: "Enter last name", type: "text" },
        { id: "email", name: "email", label: "Email", placeholder: "Enter email address", type: "email" },
        { id: "password", name: "password", label: "Password", placeholder: "Enter password", type: "password" },
        { id: "confirmPassword", name: "confirmPassword", label: "Confirm Password", placeholder: "Enter same password", type: "password" },
        { id: "age", name: "age", label: "Age", placeholder: "Enter age", type: "number" }
    ];

    const formSelectObjects = [
        { id: "gender", name: "gender", label: "Gender", defaultOptions: ["Select Gender", "Male", "Female", "Other"] },
        { id: "country", name: "country", label: "Country", setSelected: setSelectedCountry, response: countryResponse, defaultOptions: ["Select Country"] },
        { id: "state", name: "state", label: "State", setSelected: setSelectedState, response: stateResponse, defaultOptions: ["Select State"] },
        { id: "city", name: "city", label: "City", response: cityResponse, defaultOptions: ["Select City"] },
    ]

    const defaultRowStyle = "p-1 border-2 border-gray-500 rounded-lg";

    return (
        <div className="flex items-center justify-center rounded-l-lg">
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "", // use hashing for password?
                    confirmPassword: "",
                    age: "", // use date-picker and get age as calculated result from D.O.B?
                    gender: "",
                    country: "",
                    state: "",
                    city: ""
                }}
                validationSchema={signUpSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const apiUrl = import.meta.env.VITE_SERVER_API_URL;

                    const postHeaders = new Headers();
                    postHeaders.append("Content-Type", "application/json");

                    fetch(apiUrl + "users/sign-up", {
                        method: "POST",
                        body: JSON.stringify(values),
                        headers: postHeaders
                    })
                        .then(async (response) => {
                            const responseObj = await response.json();
                            if (!response.ok) throw new Error(`${responseObj.message}`);
                            return responseObj;
                        })
                        .then(data => {
                            // might need to provide better response...
                            alert(`User: ${data.firstName} ${data.lastName}, has been registered successfully.`);
                            navigate("/");
                        })
                        .catch(error => {
                            // this might need improvement too
                            setErrorMessage(error.message);
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }}
            >
                <Form className="flex flex-col gap-5 items-start justify-center p-8 w-full rounded-l-lg">

                    {
                        formTextObjects.map(({ id, name, label, placeholder, type }) =>
                            <div className="flex flex-col items-start" key={label} >
                                <FormTextComponent
                                    label={label}
                                    styleClasses={defaultRowStyle}
                                    id={id}
                                    name={name}
                                    type={type}
                                    placeholder={placeholder}
                                />
                            </div>
                        )
                    }

                    {
                        formSelectObjects.map(({ id, name, label, setSelected, response, defaultOptions }) =>
                            <div className="flex flex-col items-start" key={label}>
                                <FormSelectComponent
                                    label={label}
                                    id={id}
                                    name={name}
                                    setSelected={setSelected}
                                    styleClasses={defaultRowStyle}
                                >
                                    <option value="">{defaultOptions[0]}</option>

                                    {defaultOptions?.slice(1).map((option) => <option key={option} value={option}>{option}</option>)}

                                    {
                                        response
                                        && response.isSuccess
                                        &&
                                        response.data?.map(({ name }) =>
                                            <option key={name} value={name}>{name}</option>
                                        )

                                    }
                                </FormSelectComponent>
                            </div>
                        )
                    }

                    <div className="flex w-full justify-end">
                        <SignUpButton />
                    </div>

                </Form>
            </Formik>
        </div>
    )
}

export default SignUpForm;
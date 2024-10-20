import { useState } from "react";
import { SignUpForm, SideImageSection } from "../components";

function SignUp() {
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <div className="mx-24 w-full h-lvh my-52 flex flex-col justify-center items-center">
            <p className="text-4xl font-extrabold mb-10 tracking-wider" >Sign Up</p>
            {errorMessage ? <p className="text-2xl font-bold mb-8 text-red-600">{errorMessage}</p> : null}
            <div className="w-[80%] grid grid-cols-2 shadow-lg rounded-lg">
                <SignUpForm setErrorMessage={setErrorMessage} />
                <SideImageSection />
            </div>
        </div>
    )
}

export default SignUp;
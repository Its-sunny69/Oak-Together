import { useState } from "react";
import { LoginForm, SideImageSection } from "../components";

function Login() {
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <div className="mx-24 w-full h-lvh flex flex-col justify-center items-center">
            <p className="text-4xl font-extrabold mb-10 tracking-wider" >Login</p>
            {errorMessage ? <p className="text-2xl font-bold mb-8 text-red-600">{errorMessage}</p> : null}
            <div className="w-[80%] grid grid-cols-2 shadow-lg rounded-lg">
                <LoginForm setErrorMessage={setErrorMessage} />
                <SideImageSection />
            </div>
        </div>
    )
}

export default Login;
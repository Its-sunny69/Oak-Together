import { useState } from "react";
import { LoginForm, SideImageSection } from "../components";

function Login() {

    return (
        <div className="w-full h-lvh flex flex-col justify-center items-center">
            <p className="text-4xl font-extrabold mb-10 tracking-wider" >Login</p>
            <div className="w-[80%] grid grid-cols-2 shadow-lg rounded-lg">
                <LoginForm />
                <SideImageSection />
            </div>
        </div>
    )
}

export default Login;
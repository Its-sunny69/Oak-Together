import { useState, useEffect } from "react";
import { SignUpForm, SideImageSection } from "../components";
import toast from "react-hot-toast";

function SignUp() {  

    return (
        <div className="w-full my-24 flex flex-col justify-center items-center">
            <p className="text-4xl font-extrabold mb-10 tracking-wider" >Sign Up</p>
            <div className="w-[80%] grid grid-cols-2 shadow-lg rounded-lg">
                <SignUpForm />
                <SideImageSection />
            </div>
        </div>
    )
}

export default SignUp;
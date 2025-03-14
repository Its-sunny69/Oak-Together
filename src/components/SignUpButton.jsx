import { useNavigate } from "react-router-dom";

function SignUpButton({ action }) {

    const navigate = useNavigate()

    return (
        <button className='px-6 py-2 ml-4 rounded-lg bg-gradient-120 shadow-md from-[#83E2C1] from-50% to-[#1566E7] to-100% hover:from-[#1566E7] hover:to-[#83E2C1] text-white'
        onClick={() => navigate(action)} type="submit">
            Sign Up
        </button>
    )
}

export default SignUpButton;
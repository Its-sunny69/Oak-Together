import LoginForm from "../components/LoginForm"
import SideImageSection from "../components/SideImageSection"

function Login() {
    return (
        <div className="px-24 py-12">
            <div className="grid grid-cols-2 shadow-lg rounded-lg">
                <LoginForm />
                <SideImageSection />
            </div>
        </div>
    )
}

export default Login;
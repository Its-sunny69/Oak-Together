import SignUpForm from '../components/SignUpForm'
import SideImageSection from '../components/SideImageSection'

function SignUp() {
    return (
        <div className="shadow-lg px-24 py-12">
            <div className="grid grid-cols-2 shadow-lg rounded-lg">
                <SignUpForm />
                <SideImageSection />
            </div>
        </div>
    )
}

export default SignUp;
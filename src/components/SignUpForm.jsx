import SignUpButton from "./SignUpButton";

function SignUpForm() {

    // Below lists are filled with dummy values, will need to change these later:
    const countries = ["India", "China", "Japan", "Malaysia"];
    const states = ["Maharashtra", "Karnataka", "Uttar Pradesh", "Uttarakhand"];
    const cities = ["Thane", "Mumbai", "Delhi", "Calcutta", "Jaipur"];

    return (
        <div className="flex items-center justify-center rounded-l-lg">
            <form className="flex flex-col gap-5 items-start justify-center p-8 w-full rounded-l-lg">
                <div className="flex flex-col">
                    <label htmlFor="firstname">First Name</label>
                    <input className="p-1 border-2 border-gray-500 rounded-lg" type="text" id="firstname" name="firstname" placeholder="Enter first name" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="lastname">Last Name</label>
                    <input className="p-1 border-2 border-gray-500 rounded-lg" type="text" id="lastname" name="lastname" placeholder="Enter last name" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input className="p-1 border-2 border-gray-500 rounded-lg" type="email" id="email" name="email" placeholder="Enter email address" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input className="p-1 border-2 border-gray-500 rounded-lg" type="password" name="password" id="password" placeholder="Enter password" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="age">Age</label>
                    <input className="p-1 border-2 border-gray-500 rounded-lg" type="number" name="age" id="age" placeholder="Enter age" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="gender">Gender</label>
                    <select className="p-1 border-2 border-gray-500 rounded-lg" name="gender" id="gender" >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="transgender">Transgender</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="no-response">Prefer not to respond</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="country">Country</label>
                    <select className="p-1 border-2 border-gray-500 rounded-lg" name="country" id="country" >
                        {countries.map(country => <option value={country} key={country}>{country}</option>)}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="state">State</label>
                    <select className="p-1 border-2 border-gray-500 rounded-lg" name="state" id="state" >
                        {states.map(state => <option value={state} key={state}>{state}</option>)}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="city">City</label>
                    <select className="p-1 border-2 border-gray-500 rounded-lg" name="city" id="city" >
                        {cities.map(city => <option value={city} key={city}>{city}</option>)}
                    </select>
                </div>

                <div className="flex w-full justify-end">
                    <SignUpButton action={"/"} />
                </div>
            </form>
        </div>
    )
}

export default SignUpForm;
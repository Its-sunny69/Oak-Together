import LoginButton from './LoginButton'

function LoginForm() {
    return (
        <div className="flex items-center justify-center rounded-l-lg">
            <form className="flex flex-col gap-5 items-start justify-center p-8 h-full w-full rounded-l-lg">
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input className="p-1 border-2 border-gray-500 rounded-lg" type="email" placeholder="Enter email address" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input className="p-1 border-2 border-gray-500 rounded-lg" type="password" name="password" id="password" placeholder="Enter password" />
                </div>
                <div className="flex w-full justify-end">
                    <button type="submit">
                        <div className="rounded-lg bg-gradient-120 from-[#83E2C1] from-50% to-[#1566E7] to-100% p-[2px]">
                            <LoginButton />
                        </div>
                    </button>
                </div>
            </form>
        </div >
    )
}

export default LoginForm;
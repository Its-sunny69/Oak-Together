import { LogoPng, InstagramLogoPng, WhatsAppLogoPng, FacebookLogoPng, TwitterLogoPng } from '../assets/assets'

function Footer() {
    return (
        <div className="flex flex-col py-12 gap-14">
            <div className="flex justify-between gap-10 ">
                <div className="flex flex-col">
                    <div className="flex">
                        <div className="flex mr-2 shrink-0"><img src={LogoPng} alt="" className="w-8" /></div>
                        <div className="flex items-center font-semibold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-[#60D6D9] to-[#9AEBA5]">OAK TOGETHER</div>
                    </div>
                    <div className="mt-1 text-gray-700 w-7/12">
                        Cultivate a greener world, one plant at a time.
                    </div>
                </div>
                <div className="flex flex-col gap-2 font-semibold text-gray-600">
                    <div>Services</div>
                    <div>Theme Tweak</div>
                    <div>Showcase</div>
                </div>
                <div className="flex flex-col gap-2 font-semibold text-gray-600">
                    <div>Services</div>
                    <div>Theme Tweak</div>
                    <div>Showcase</div>
                </div>
                <div className="flex flex-col gap-2 font-semibold text-gray-600">
                    <div>Services</div>
                    <div>Theme Tweak</div>
                    <div>Showcase</div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="bg-gray-300 w-11/12 h-0.5"></div>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
                <div className="flex justify-center">
                    <div className="flex gap-6">
                        <img src={InstagramLogoPng} alt="" className="h-8" />
                        <img src={WhatsAppLogoPng} alt="" className="h-8" />
                        <img src={FacebookLogoPng} alt="" className="h-8" />
                        <img src={TwitterLogoPng} alt="" className="h-8" />
                    </div>
                </div>
                <div className="text-gray-500 font-medium">@Copyright All Right Reserved</div>
            </div>
        </div>
    )
}

export default Footer;
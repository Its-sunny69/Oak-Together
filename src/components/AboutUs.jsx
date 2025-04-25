import { People2 } from "../assets";

export default function AboutUs(){
    const aboutUsText = "Oak Together is an innovative online platform revolutionizing urban forestry. " 
    + "It serves a diverse user base by providing a comprehensive suite of tools and features focused on tree planting and ecosystem management. ";
    + "The platform is accessible through Web browsers and we provide a native application for access on Android devices."
    

    const text = [
        aboutUsText, aboutUsText, "Join us now!"
    ]

    return(
        <section id="AboutUs" className="flex flex-col my-24 lg:flex-row">
            <div className="lg:w-[50%] flex items-center justify-center">
                <img
                    src={People2}
                    className="h-[200px] md:h-auto mb-4 md:mb-0"
                />
            </div>
            <div className="text-justify md:text-left lg:w-[50%] md:pl-10">
                <h1 className="text-2xl md:text-2xl font-semibold mb-2  md:mb-14 tracking-wide">ABOUT US</h1>
                {
                    text.map((item, index)=>(
                        <h3 className="text-sm opacity-80 mb-2 md:mb-4" key={index}>
                            {item}
                        </h3>
                        
                    ))
                }
                <button className="mt-4 md:mt-14 rounded-lg shadow-md py-2 px-6 text-white bg-gradient-120 from-[#83E2C1] from-50% to-[#1566E7] to-100%
                 hover:from-[#1566E7] hover:to-[#83E2C1] transition-all">Know More</button>
            </div>
        </section>
    )
}
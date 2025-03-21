import { PlantPng } from "../assets";


function PriceCardList() {

    // Dummy data for pricecards
    const priceCardsData = [
        {id:1, description: "Plants for home", price: 249, imgSrc: PlantPng},
        {id:2, description: "Plants for home", price: 249, imgSrc: PlantPng},
        {id:3, description: "Plants for home", price: 249, imgSrc: PlantPng},
        {id:4, description: "Plants for home", price: 249, imgSrc: PlantPng}
    ]

    const PriceCard = ({description, price, imgSrc}) => {
        return(
            <div className="relative rounded-lg overflow-hidden mb-6 shadow-gray-300 shadow-lg pb-3 cursor-pointer">
                <div className="bg-[#83E2C1] h-4 w-1/2 " style={{clipPath: 'polygon(0 0, 90% 0%, 100% 100%, 0% 100%)'}}></div>
                <div className="flex justify-between px-4 gap-4 items-center">
                    <div className="w-1/2 z-10">
                        <p className="">{description}</p>
                        <h3 className="text-xl font-medium mb-6">Rs. {price}/-</h3>
                        <p>shop now!</p>
                    </div>
                    <img src={imgSrc} className="h-1/4"/>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[100px] border-t-[100px] border-transparent border-l-[#83E2C1]"></div>
                <div className="absolute bottom-0 w-0 left-1/3 h-0 border-l-[50px] border-t-[50px] border-transparent border-l-[#83E2C1]"></div>
            </div>
        )
    }

    return (
        <div className="flex justify-between gap-5">
         {priceCardsData.map(data => 
            <PriceCard key={data.id} {...data}/>
         )}
        </div>
    )
}

export default PriceCardList;
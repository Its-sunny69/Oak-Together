import { ProfileImg } from "../assets";

function HomeListSection() {

    //Dummy data for daily task list
    const dailyTasks = [
        { id: 1, task: "Water any one location", points: 40 },
        { id: 2, task: "Read 1 article", points: 10 },
        { id: 3, task: "Comment on 3 articles", points: 10 },
        { id: 4, task: "Like 5 articles", points: 10 },
        { id: 5, task: "Post an oak", points: 10 },
        { id: 6, task: "Mark a location", points: 40 }
    ];

    const dailyTaskList = (
        <div className="flex flex-col gap-4 rounded-lg px-3 py-4 shadow-[0_-3px_30px_0px_rgba(96,214,217,0.25)] min-w-[38%] h-fit">
            <h3 className="pl-1 font-medium" >Daily Task</h3>
            <ul className="flex flex-col gap-3">
                {dailyTasks.map(({ id, task, points }) =>
                (
                    <div key={id}>
                        <li className="flex justify-between text-xs font-medium">
                            <p>{task}</p>
                            <p>{points} pts</p>
                        </li>
                        <div className="w-full border-t-[1.5px] border-[#60D6D9]"></div>
                    </div>
                )
                )}
            </ul>
        </div>
    )

    //Dummy data for leaderboard entries
    const leaderboardsList = [
        { id: 1, name: "Elon Musk", score: 3900 },
        { id: 2, name: "Bill Gates", score: 3800 },
        { id: 3, name: "Johnny Depp", score: 2700 },
        { id: 4, name: "William Doe", score: 1500 },
        { id: 5, name: "William Doe", score: 1500 },
        { id: 6, name: "William Doe", score: 1500 },
    ]

    let position = 0; // variable to detect position, might need change later
    const top3Colors = ["text-[#FFA800]", "text-[#60D6D9]", "text-[#83E2C1]"];


    const leaderboards = (
        <div className="flex flex-col gap-4 rounded-lg px-3 py-4 shadow-[0_-3px_30px_0px_rgba(96,214,217,0.25)] h-fit">
            <h3 className="pl-1 font-medium">Leaderboards</h3>
            <ul>
                {leaderboardsList.map(({ id, name, imageSrc = ProfileImg, score }) =>
                    <li key={id} className="flex gap-10 py-1 justify-between items-center border-b-[1.5px] border-gray-300">
                        <div className="flex gap-3 items-center">
                            <img src={imageSrc} className="w-8" />
                            <p className="font-medium">{name}</p>
                        </div>
                        <p className={"text-sm font-medium " + ((position < 4) && top3Colors[position++])}>
                            {score}
                        </p>
                    </li>
                )}
            </ul>
        </div>
    )

    //Dummy data for nearby events
    const randomText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    const eventsList = [
        { id: 1, name: "Event name", description: randomText, date: "Sept 12, 2024" },
        { id: 2, name: "Event name", description: randomText, date: "Sept 12, 2024" },
        { id: 3, name: "Event name", description: randomText, date: "Sept 12, 2024" }
    ]

    const events = (
        <div className="flex flex-col w-[35%] gap-4 rounded-lg px-3 py-4 shadow-[0_-3px_30px_0px_rgba(96,214,217,0.25)] h-fit">
            <h3 className="pl-1 font-medium">Nearby Events</h3>
            <ul className="flex flex-col gap-2">
                {eventsList.map(({ id, name, description, date }) => (
                    <li key={id} className="flex justify-between items-center shadow-md rounded-lg pl-3 pr-1 py-2">
                        <div>
                            <span className=" font-medium text-sm mr-3">{name}</span>
                            <span className="text-[#83E2C1] text-sm">{date}</span>
                            <p className="text-xs w-[88%]">{description}</p>
                        </div>
                        <p className="text-[#1846C4] text-sm hover:underline cursor-pointer">
                            View more
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )

    return (
        <div className="flex justify-stretch gap-4 mb-6">
            {dailyTaskList}
            {leaderboards}
            {events}
        </div>
    )
}

export default HomeListSection;
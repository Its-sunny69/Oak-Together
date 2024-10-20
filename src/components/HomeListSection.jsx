function HomeListSection() {

    //Dummy data for daily task list
    const dailyTasks = [
        {task: "Water any one location", points: 40},
        {task: "Read 1 article", points: 10},
        {task: "Comment on 3 articles", points: 10},
        {task: "Like 5 articles", points: 10},
        {task: "Post an oak", points: 10},
        {task: "Mark a location", points: 40}
    ];

    const dailyTaskList = (
            <div className="rounded-md px-2 py-4 shadow-lg">
                <h3>Daily Task</h3>
                <ul className="flex gap:3">
                    {dailyTasks.map(({task, points}) => 
                        <li className="flex justify-between">
                            <p className="text-sm">{task}</p>
                            <p className="text-sm">{points} pts</p>
                        </li>
                    )}
                </ul>
            </div>
        )


    return (
        <div className="flex justify-stretch gap-6">
            
        </div>
    )
}

export default HomeListSection;
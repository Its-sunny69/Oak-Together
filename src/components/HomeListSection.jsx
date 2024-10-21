function HomeListSection() {

    //Dummy data for daily task list
    const dailyTasks = [
        {id: 1, task: "Water any one location", points: 40},
        {id: 2, task: "Read 1 article", points: 10},
        {id: 3, task: "Comment on 3 articles", points: 10},
        {id: 4, task: "Like 5 articles", points: 10},
        {id: 5, task: "Post an oak", points: 10},
        {id: 6, task: "Mark a location", points: 40}
    ];

    const dailyTaskList = (
            <div className="rounded-md px-2 py-4 shadow-lg">
                <h3>Daily Task</h3>
                <ul className="flex gap:3">
                    {dailyTasks.map(({id, task, points}) => 
                        <li key={id} className="flex justify-between">
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
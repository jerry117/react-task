const tasks = [
    {
        id: 1,
        text:'doctors appointments',
        days:'feb 5th at 2:30pm',
        reminder: true,
    },
    {
        id: 2,
        text:'meeting at school',
        days:'feb 6th at 1:30pm',
        reminder: true,
    },
    {
        id: 3,
        text:'food shopping',
        days:'feb 5th at 2:30pm',
        reminder: false,
    },

];

export const Tasks = () => {
  return (
    <>
    {tasks.map((task) =>(<h3 key={task.id} >{task.text}</h3>))}
    </>
  )
}

// export default Tasks

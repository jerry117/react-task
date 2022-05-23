import {useState} from "react";
import Header from "./components/Header";
import {Tasks} from "./components/Tasks";
import AddTask from "./components/AddTask";

// function App() {

//   const name = 'brad'

//   return (
//     <div className="container">
//       <h1>hello from react</h1>
//       <h2>hello {name}</h2>
//       <Header></Header>
//     </div>
//   );
// }

// class App extends React.Component {
//   render() {
//     return <h1>hello from a class</h1>
//   }
// }

const App = () => {
  const [tasks, setTasks] = useState([
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

])

// Add Task
const addTask =(task) => {
  console.log(task)
}

//  delete task
const deleteTask = (id ) => {
  // console.log('delete',id)
  setTasks(tasks.filter((task)=> task.id !==id))
  console.log('delete',id)
  
}

// toggle reminder
const toggleReminder = (id) => {
  setTasks(
    tasks.map((task)=>task.id === id ? {...task, reminder:!task.reminder}:task)
  )
  console.log(id)
}

  return (
    <div className="container">
      <Header />
      <AddTask onAdd={addTask}/>
      {tasks.length >0 ? (<Tasks  tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />): ('No tasks to show')}
    </div>
  )
}

export default App;

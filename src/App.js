import {useState, useEffect} from "react";
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Tasks} from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";



const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(()=> {
    
    const getTasks = async () =>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  } , [])

  // feth tasks
  const fetchTasks = async()=> {
    const res = await fetch('http://localhost:8000/tasks')
    const data = await res.json()
    // console.log(data)

    return data}
  // feth task
  const fetchTask = async(id)=> {
    const res = await fetch(`http://localhost:8000/tasks/${id}`)
    const data = await res.json()
    // console.log(data)
    return data}

// Add Task
const addTask = async (task) => {

  const res = await fetch('http://localhost:8000/tasks', {
    method:'POST', 
    headers: {

      'Content-Type': 'application/json'

    },
    body: JSON.stringify(task)
  })
  const data = await res.json()

  setTasks([...tasks, data])
  // const id = Math.floor(Math.random() * 10000) + 1;
  // const newTask = {id, ...task}
  // setTasks([...tasks, newTask])
  // console.log(task)
}

//  delete task
const deleteTask = async (id ) => {
  // console.log('delete',id)
  await fetch(`http://localhost:8000/tasks/${id}`, {
    method: 'DELETE'
  })
  setTasks(tasks.filter((task)=> task.id !==id))
  console.log('delete',id)
  
}

// toggle reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updTask = { ...taskToToggle, reminder:!taskToToggle.reminder}

  const res = await fetch(`http://localhost:8000/tasks/${id}`, {
    method: 'PUT', 
    headers:{
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(updTask)
  })

  const data = await res.json()

  setTasks(
    tasks.map((task)=>task.id === id ? {...task, reminder:data.reminder}:task)
  )
  console.log(id)
}

  return (
    <Router>
    <div className="container">
      <Header  onAdd={()=> setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask}/>}
        {tasks.length >0 ? (<Tasks  tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />): ('No tasks to show')}
        

    <Routes>
      
      <Route exact path='/about' element={<About/>} />
      </Routes>

      <p align='left'>p标签left属性</p>
      <p align='center'>p标签center属性</p>
      <p align='right'>p标签right属性</p>
      {/* hr 下划线 i or hr 斜体 b 加粗 */}
      <hr/>
      <i>这是i标签</i>
      <hr/>
      <em>这是em标签</em>
      <hr/>
      <b>这是b标签</b>
      <hr/>
      <strong>这是strong标签</strong>
      <sub>这是sub标签</sub>
      <sup>这是sup标签</sup>
      <hr/>
      <p>这是&lt;p&gt;</p>
      <p>版权符号：&copy;</p>
      <p>商标符号：&trade;</p>
      <p>不断行的空白：&nbsp;1</p>
      <hr/>
      <p align='justigy'>p标签
      {/* br 换行  &nbsp;空格  pre 保留段落原本格式 */}
       <br/>&nbsp;&nbsp;&nbsp;&nbsp;justigy属性</p>
       <pre>保留段落原本格式</pre>
      <Footer/>
    </div>
    </Router>
  )
}

export default App;

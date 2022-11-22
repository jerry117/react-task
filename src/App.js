import {useState, useEffect} from "react";
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Tasks} from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
import to from "./images/logo192.png";



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
    <div>
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
      {/* 无序列表  circle 空心点 square 正方形 disc 圆点  */}
      <h3>无序列表</h3>
      <ul type='li'>
        <li type='disc' >HTML称为超文本标记语言</li>
        <li type='square'>html它包括一系列标签。</li>
        <li type='circle'>html文本是由html命令组成的描述性文本</li>
        <li>html命令可以说明文字，图形、动画、声音、表格、链接等</li>
      </ul>
      <hr/>
      {/* 有序列表  1 排序为数字 a 小写字母 A 大写字母 i 小写罗马数字 I 大写罗马数字 */}
      <h3>有序列表</h3>
      <ol>
        <li type='1' >HTML称为超文本标记语言</li>
        <li type='a'>html它包括一系列标签。</li>
        <li type='A'>html文本是由html命令组成的描述性文本</li>
        <li type='i'>html命令可以说明文字，图形、动画、声音、表格、链接等</li>    
        <li type='I'>html命令可以说明文字，图形、动画、声音、表格、链接等</li>    
      </ol>
      <hr/>
      {/* 定义列表  dt 表头  dd 列表项 */}
      <h3>定义列表</h3>
      <dl>
        <dt>html描述</dt>
        <dd>html它包括一系列标签。</dd>
      </dl>
      <p align='justigy'>p标签
      {/* br 换行  &nbsp;空格  pre 保留段落原本格式 */}
       <br/>&nbsp;&nbsp;&nbsp;&nbsp;justigy属性</p>
       <pre>保留段落原本格式</pre>
      <Footer/>
    </div>
    </Router>
    <div>
      {/* img 图像标签  a href  超链接  target 链接目标窗口 _self当前窗口打开，默认 _blank 新窗口打开 _top 、_parent   title 链接提示文字  name 链接名字 */}
    <img src={to} alt="肯" height='40px' width='40px' />
    <img src="https://pics4.baidu.com/feed/09fa513d269759eeb97c10b892f9091d6d22dfa6.jpeg@f_auto?token=24067a25bae14bbdce5e1654838dc33c" alt="tom" />
    <a href="https://pics4.baidu.com/feed/09fa513d269759eeb97c10b892f9091d6d22dfa6.jpeg@f_auto?token=24067a25bae14bbdce5e1654838dc33c">neirong</a>
    {/* 锚点链接 name + href 把a标签的href属性指定到已定义的name */}
    <a href="#name1">目录1</a>
    <br/>
    <a href="./xxx.png" title="这是title属性" name='name1' target='_blank'>目录1的内容</a>
    {/* 锚链接（不同页面） 在页面1添加name属性，在页面2的a标签下，href="页面1.html#锚点名" */}
    {/* 电子邮件链接  */}
    <a href='2335353@qq.com' title="点击发送邮件">点击发送邮件</a>
    {/* 文件下载 */}
    <a href='content.zip' title="点击下载">点击下载</a>
    </div>
    </div>
  )
}

export default App;

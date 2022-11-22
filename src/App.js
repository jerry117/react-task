import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Tasks } from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
import to from "./images/logo192.png";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // feth tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:8000/tasks");
    const data = await res.json();
    // console.log(data)

    return data;
  };
  // feth task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:8000/tasks/${id}`);
    const data = await res.json();
    // console.log(data)
    return data;
  };

  // Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();

    setTasks([...tasks, data]);
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
    // console.log(task)
  };

  //  delete task
  const deleteTask = async (id) => {
    // console.log('delete',id)
    await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
    console.log("delete", id);
  };

  // toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
    console.log(id);
  };

  return (
    <div>
      <Router>
        <div className="container">
          <Header
            onAdd={() => setShowAddTask(!showAddTask)}
            showAdd={showAddTask}
          />
          {showAddTask && <AddTask onAdd={addTask} />}
          {tasks.length > 0 ? (
            <Tasks
              tasks={tasks}
              onDelete={deleteTask}
              onToggle={toggleReminder}
            />
          ) : (
            "No tasks to show"
          )}

          <Routes>
            <Route exact path="/about" element={<About />} />
          </Routes>

          <p align="left">p标签left属性</p>
          <p align="center">p标签center属性</p>
          <p align="right">p标签right属性</p>
          {/* hr 下划线 i or hr 斜体 b 加粗 */}
          <hr />
          <i>这是i标签</i>
          <hr />
          <em>这是em标签</em>
          <hr />
          <b>这是b标签</b>
          <hr />
          <strong>这是strong标签</strong>
          <sub>这是sub标签</sub>
          <sup>这是sup标签</sup>
          <hr />
          <p>这是&lt;p&gt;</p>
          <p>版权符号：&copy;</p>
          <p>商标符号：&trade;</p>
          <p>不断行的空白：&nbsp;1</p>
          <hr />
          {/* 无序列表  circle 空心点 square 正方形 disc 圆点  */}
          <h3>无序列表</h3>
          <ul type="li">
            <li type="disc">HTML称为超文本标记语言</li>
            <li type="square">html它包括一系列标签。</li>
            <li type="circle">html文本是由html命令组成的描述性文本</li>
            <li>html命令可以说明文字，图形、动画、声音、表格、链接等</li>
          </ul>
          <hr />
          {/* 有序列表  1 排序为数字 a 小写字母 A 大写字母 i 小写罗马数字 I 大写罗马数字 */}
          <h3>有序列表</h3>
          <ol>
            <li type="1">HTML称为超文本标记语言</li>
            <li type="a">html它包括一系列标签。</li>
            <li type="A">html文本是由html命令组成的描述性文本</li>
            <li type="i">
              html命令可以说明文字，图形、动画、声音、表格、链接等
            </li>
            <li type="I">
              html命令可以说明文字，图形、动画、声音、表格、链接等
            </li>
          </ol>
          <hr />
          {/* 定义列表  dt 表头  dd 列表项 */}
          <h3>定义列表</h3>
          <dl>
            <dt>html描述</dt>
            <dd>html它包括一系列标签。</dd>
          </dl>
          <p align="justigy">
            p标签
            {/* br 换行  &nbsp;空格  pre 保留段落原本格式 */}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;justigy属性
          </p>
          <pre>保留段落原本格式</pre>
          <Footer />
        </div>
      </Router>
      <div>
        {/* img 图像标签  a href  超链接  target 链接目标窗口 _self当前窗口打开，默认 _blank 新窗口打开 _top 、_parent   title 链接提示文字  name 链接名字 */}
        <img src={to} alt="肯" height="40px" width="40px" />
        <img
          src="https://pics4.baidu.com/feed/09fa513d269759eeb97c10b892f9091d6d22dfa6.jpeg@f_auto?token=24067a25bae14bbdce5e1654838dc33c"
          alt="tom"
        />
        <a href="https://pics4.baidu.com/feed/09fa513d269759eeb97c10b892f9091d6d22dfa6.jpeg@f_auto?token=24067a25bae14bbdce5e1654838dc33c">
          neirong
        </a>
        {/* 锚点链接 name + href 把a标签的href属性指定到已定义的name */}
        <a href="#name1">目录1</a>
        <br />
        <a href="./xxx.png" title="这是title属性" name="name1" target="_blank">
          目录1的内容
        </a>
        {/* 锚链接（不同页面） 在页面1添加name属性，在页面2的a标签下，href="页面1.html#锚点名" */}
        {/* 电子邮件链接  */}
        <a href="2335353@qq.com" title="点击发送邮件">
          点击发送邮件
        </a>
        {/* 文件下载 */}
        <a href="content.zip" title="点击下载">
          点击下载
        </a>
      </div>
      <div>
        <table border="1" width="500px">
          <caption>统计表头</caption>
          <tr>
            <th>表头第一列</th>
            <th>表头第二列</th>
            <th>表头第三列</th>
          </tr>
          <tr>
            <td>第一行第一列</td>
            <td>第一行第二列</td>
            <td>第一行第三列</td>
          </tr>
          <tr>
            <td>第二行第一列</td>
            <td>第二行第二列</td>
            <td>第二行第三列</td>
          </tr>
        </table>
      </div>

      {/* 带结构的表格 */}
      <div>
        <table border="1" width="500px">
          <caption>omg</caption>
          <thead>
            <tr>
              <th>表头第一列</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>主体第一行第一列</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>注脚第一列</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* 表格属性 
      width：表格的的宽度，px、%
　　align：表格相对周围元素的对齐方式：left、center、right
　　border：表格边框的宽度，px
　　bgcolor：表格的背景颜色，rgb、#xxx、colorname
　　cellpadding：单元边沿与其他内容之间的空白，px，%
　　cellspacing：单元格之间的空白，px，%
　　frame：规定外侧边框的哪个部分时可见的，属性值
　　rules：规定内侧边框的哪个部分时可见的，属性值

 */}
      {/* frame属性：
　　void：不显示外侧边框
　　above：显示上部的外侧边框
　　below：显示下部的外侧边框
　　hsides：显示上部和下部的外侧边框
　　vsides：显示左边和右边的外侧边框
　　lhs：显示左边的外侧边框
　　rhs：显示右边的外侧边框
　　box：在所有四个边上显示外侧边框
　　border：在所有四个边上显示外侧边框 */}

      {/* rules属性：

　　none：没有线条
　　groups：位于行组合列组之间的线条
　　rows：位于行之间的线条
　　cols：位于列之间的线条
　　all：位于行和列之间的线条 */}
      <div>
        <table
          border="6"
          width="500px"
          bgcolor="#f2f2f2"
          cellspacing="0"
          cellpadding="5"
          align="center"
          // frame="above"
          // rules="cols"
        >
          <caption> 统计图 </caption>
          {/* thead、tbody、tfoot标签属性
      　　align：thead、tbody、tfoot内容的水平对齐，left、center、right、justify、char
      　　valign：thead、tbody、tfoot内容的垂直对齐，top、middle、bottom、baseline */}
          <thead>
            {/* tr标签属性
          　　align：行内容的水平对齐，left、center、right、justify、char
          　　valign：行内容的垂直对齐，top、middle、bottom、baseline
          　　bgcolor：行的背景颜色，rgb、#xxx、colorname */}
            <tr bgcolor="#2e8b57">
              <th>城市</th>
              <th>2017</th>
              <th>2018</th>
              <th>2019</th>
              <th>2020</th>
            </tr>
            <tr bgcolor="#2e8b57">
              <th>城市</th>
              <th>上半年</th>
              <th>下半年</th>
              <th>2019</th>
              <th>2020</th>
            </tr>
          </thead>
          <tbody align="center" valign="middle">
            {/* td、tr标签属性：
        　　align：单元格内容的水平对齐，left、center、right、justify、char
        　　valign：单元格内容的垂直对齐，top、middle、bottom、baseline
        　　bgcolor：单元格的背景颜色，rgb、#xxx、colorname
        　　width：单元格的宽度，px、%
        　　heigh：单元格的高度，px、% */}
            <tr>
              <td bgcolor="#b8cce4">北京</td>
              <td>8000</td>
              <td>9000</td>
              <td>10000</td>
              <td>11000</td>
            </tr>
            <tr>
              <td bgcolor="#b8cce4">上海</td>
              <td>8001</td>
              <td>9001</td>
              <td>10001</td>
              <td>11001</td>
            </tr>
          </tbody>
          <tfoot align="center" valign="middle">
            <tr>
              <td height="30px" bgcolor="#b8cce4">
                合计
              </td>
              <td>16001</td>
              <td>18001</td>
              <td>20001</td>
              <td>22001</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default App;

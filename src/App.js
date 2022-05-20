import {useState} from "react";
import Header from "./components/Header";
import {Tasks} from "./components/Tasks";

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
  const [tasks] = useState([
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
  return (
    <div className="container">
      <Header />
      <Tasks  tasks={tasks}/>
    </div>
  )
}

export default App;

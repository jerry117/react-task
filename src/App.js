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
  return (
    <div className="container">
      <Header />
      <Tasks />
    </div>
  )
}

export default App;

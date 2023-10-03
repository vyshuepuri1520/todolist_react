import './App.css';
import { useState } from 'react'
import {
BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
// import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import TodoList from './components/TodoList';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <>
    <Router>
          <Navbar name="ToDoHub" />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path='/' element={<TodoList showAlert={showAlert} />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/login" element={<Login showAlert={showAlert} />}></Route>
              <Route path='/signup' element={<Signup showAlert={showAlert}/>}></Route>
            </Routes>
          </div>
        </Router>
    </>
  );
}

export default App;

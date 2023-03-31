
import Calendar from './components/CalenderPage';
import {  Route, Routes ,Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
//import 'react-calendar/dist/Calendar.css'
import './App.css';
import Login from './components/Login';
import Signin from './components/Signin';
import Layout from './components/Layout';
import ManagerPage from './components/ManagerPage';
import RequireAuth from './context/RequireAuth';
import CalenderPage from './components/CalenderPage';
import Back from "./assets/back.jpg"

function App() {
  return (
    <div className="App" style={{ backgroundImage: `url(${Back})`,backgroundSize:"100% 100%"
  }}>
     
      <Routes>
        <Route path='/' element={<Layout/>} />
        <Route path='/login' element=<Login/> />
        <Route path='/signup' element=<Signin/> />
        <Route element={<RequireAuth/>}>
        <Route path='/manager-calender' element={<ManagerPage/>} />
        <Route path='/calender' element={<CalenderPage/>}/>
        </Route>
      </Routes>

     
    </div>
  );
}

export default App;

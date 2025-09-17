import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './pages/Hero.jsx';
import Register from './components/Register.jsx';
import './App.css';
import Login from './components/Login.jsx';
import Dashboard from './pages/DashBoard.jsx';
import LogWorkout from './components/LogWorkout.jsx';
import LogSin from './components/LogSin.jsx';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/log-workout' element={<LogWorkout />} />
        <Route path='/log-sin' element={<LogSin />}/>
      </Routes>
  );
}

export default App;

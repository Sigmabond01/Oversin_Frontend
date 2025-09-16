import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero.jsx';
import Register from './components/Register.jsx';
import './App.css';
import Login from './components/Login.jsx';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
  );
}

export default App;

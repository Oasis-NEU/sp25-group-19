import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from "./components/home/index.tsx";
import SettingsPage from "./components/settings/index.tsx"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/home';
import Settings from './components/settings';
import Events from './components/events';
import Tasks from './components/tasks';
import './App.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>

  <Routes>
    <Route path="/home" element={<HomePage />} />
    <Route path="/settings" element={<SettingsPage />} />
  </Routes>
  {/* ✅ Correctly Placed Button Container */}



</Router>
  )
return (
  <Router>
    <nav className = 'button-container'>
      <Link to="/">
        <button> home </button>
      </Link>
      <Link to="/settings">
        <button> settings </button>
      </Link>
      <Link to="/tasks">
        <button> tasks </button>
      </Link>
      <Link to="/events">
        <button> events </button>
      </Link>
    </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/events" element={<Events />} />
        <Route path="/tasks" element={<Tasks />} />

        {/* Handle routes that don't match any of the above */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
  </Router>
);
}

export default App;
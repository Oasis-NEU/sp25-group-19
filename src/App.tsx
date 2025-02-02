import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from "./components/home/index.tsx";
import SettingsPage from "./components/settings/index.tsx"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
}

export default App

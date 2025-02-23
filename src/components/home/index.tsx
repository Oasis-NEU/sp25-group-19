import React from 'react';
import "./index.css";

const Home = () => {
    return (
        <h1 className = 'heading-style'>Welcome to Our Home Page</h1>
    )
}
import React from "react";
import "./index.css";
import SettingsPage from "../settings/index.tsx"; 

const HomePage: React.FC = () => {
  return (

      <div className="button-container">
        <button>Settings</button>
      </div>


  );
};

export default HomePage;

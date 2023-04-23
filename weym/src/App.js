import './App.css';
import NavBar from './components/NavBar.js';
import Profile from './components/Profile.js';
import Onboarding from './components/Onboarding.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar signedIn={false} />
        <Routes>
          <Route exact path="/" element={<Profile />} />
          {/* switch to <Home> when complete*/}
          <Route path="/profile" element={<Profile />} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

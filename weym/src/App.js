import './App.css';
import Geocode from './Geocoding/Geocode';
import NavBar from './components/NavBar.js';
import Profile from './components/Profile.js';
import Onboarding from './components/Onboarding.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    // <Geocode/>
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

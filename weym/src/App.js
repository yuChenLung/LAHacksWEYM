import './App.css';
import Geocode from './Geocoding/Geocode';
import NavBar from './components/NavBar.js';
import Profile from './components/Profile.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    // <Geocode/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar signedIn={true} />}>
          {/* <Route index element={<Home />} /> - essentially the default route*/}
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

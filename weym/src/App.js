import AppContainer from './pages/appContainer.js';
import DataWrapper from './context/state';
import NavBar from './components/NavBar.js';
import Profile from './pages/Profile.js';
import Onboarding from './pages/onboarding.js';
import LandingPage from './pages/landing.js';
import CreateTripForm from './components/CreateTrip.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div>
      <DataWrapper>
        <BrowserRouter>
          <NavBar signedIn={false} />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/onboarding' element={<Onboarding />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/app' element={<AppContainer />} />
            <Route path='/create-trip-form' element={
              <CreateTripForm startTime={30} endTime={60} day={2} />
            } /> 
          </Routes>
        </BrowserRouter>
      </DataWrapper>
    </div>
  );
}

export default App;

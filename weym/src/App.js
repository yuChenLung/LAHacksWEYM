import AppContainer from './pages/appContainer';
import DataWrapper from './context/state';
import NavBar from './components/NavBar.js';
import Profile from './components/Profile.js';
import Onboarding from './components/Onboarding.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  // <Geocode/>
  return (
    <div className='App'>
      <DataWrapper>
        <BrowserRouter>
          <NavBar signedIn={false} />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/onboarding' element={<Onboarding />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/app' element={<AppContainer />} />
          </Routes>
        </BrowserRouter>
      </DataWrapper>
    </div>
  );
}

export default App;

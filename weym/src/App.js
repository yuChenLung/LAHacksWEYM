import AppContainer from './pages/appContainer.js';
import DataWrapper from './context/state';
import NavBar from './components/NavBar.js';
import Profile from './pages/Profile.js';
import Onboarding from './pages/Onboarding.js';
import LandingPage from './pages/Landing.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
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

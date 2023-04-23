import AppContainer from './pages/appContainer.js';
import DataWrapper from './context/state';
import NavBar from './components/NavBar.js';
import Profile from './pages/Profile.js';
import Onboarding from './pages/onboarding.js';
import SignIn from './components/signIn.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scheduler from './components/scheduler.js';
import './App.css';

function App() {

  return (
    <div>
      <DataWrapper>
        <BrowserRouter>
          <NavBar signedIn={false} />
          <SignIn />
          <Routes>
            <Route path='/' element={<Scheduler />} />
            <Route path='/onboarding' element={<Onboarding />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/app' element={<AppContainer />} />
          </Routes>
        </BrowserRouter>
      </DataWrapper>
    </div>
  );
}

export default App;

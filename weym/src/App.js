import './App.css';
import NavBar from './components/NavBar.js';
import Profile from './components/Profile.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
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

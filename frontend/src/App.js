
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
 
  return (
    <div >
      <BrowserRouter>
      <Routes>
      <Route exact path="/" element={JSON.parse(localStorage.getItem("token")) ? <Home/> :<Register /> } />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile/:username" element={JSON.parse(localStorage.getItem("token")) ?<Profile currentuser={JSON.parse(localStorage.getItem("user"))} /> : <Register />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import User from "./pages/User";
import Calendar from "./components/Calendar";
import Journal from "./components/Journal";

function App() {
  return (
    <div className="App">
      <h1>App</h1>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </div>
  );
}

export default App;

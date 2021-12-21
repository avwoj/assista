import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import User from "./pages/User";

function App() {
  return (
    <div className="App">
      <h1>App</h1>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;

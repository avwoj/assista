import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Home from "./pages/Home";
import User from "./pages/User";
import Calendar from "./components/calendar/Calendar";
import Journal from "./components/journal/Journal";
import TodoList from "./components/todoList/Todo";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const location = useLocation();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={!user ? <Home /> : <Calendar />} />
        <Route path="/user" element={<User />} />
        <Route path="/calendar" element={user ? <Calendar /> : <Home />} />
        <Route path="/journal" element={user ? <Journal /> : <Home />} />
        <Route path="/Todo" element={user ? <TodoList /> : <Home />} />
      </Routes>
    </div>
  );
}

export default App;

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Home from "./pages/Home";
import User from "./pages/User";
import Calendar from "./components/calendar/Calendar";
import Journal from "./components/journal/Journal";
import TodoList from "./components/todoList/Todo";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/Todo" element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;

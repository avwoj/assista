import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDrop } from "react-dnd";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [state, setState] = useState({
    value: "",
    show: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setState({ value: e.target.value });
  };
  const submit = () => {
    setState({ show: state.value });
  };

  return (
    <React.Fragment>
      <div>
        <h1>To-Do App</h1>
        <div>
          <form>
            <input
              placeholder="Add Task"
              type="text"
              value={state.value}
              onChange={(e) => handleChange(e)}
            />
            <button
              className="AddTask"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                e.isPropagationStopped();
                submit();
              }}
            >
              Add Task
            </button>
          </form>

          <div className="TodoNav">
            <h5 to="/tasktitle">Task Title</h5>
            <h5>Description</h5>
            <form>
              <select title="Priority">
                <option>Priority</option>
                <option>1-Most</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5-Least</option>
              </select>
            </form>
            <h5>Category</h5>
            <h5>Date</h5>
            <button className="edit">Edit</button>
            <button className="delete">Delete</button>
          </div>
          <div className="downdiv" />
          <h6>
            <b>{state.show}</b>
          </h6>

          {/* <DragDropContext>
            <Droppable>
              <ul>
                <li>Go shopping</li>
                <li>Workout</li>
                <li>Lunch</li>
                <li>School</li>
              </ul>
            </Droppable>
          </DragDropContext> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TodoList2;

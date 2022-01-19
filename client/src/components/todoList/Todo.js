import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import List from "./List/List";
import store from "./utils/store";
import StoreApi from "./utils/storeAPI";
import InputContainer from "./Input/InputContainer";
import { makeStyles } from "@material-ui/core/styles";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TopBar from "./TopBar";

const useStyle = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "#F0F8FF",
    width: "100%",
    overflowY: "auto",
  },
  listContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem 1rem",
  },
}));

function TodoList() {
  const dispatch = useDispatch();
  const todoItems = useSelector((state) => state.todo);

  const [data, setData] = useState(todoItems);
  const [open, setOpen] = useState(false);

  const classes = useStyle();
  const addMoreCard = (title, listId) => {};

  const addMoreList = (title) => {};

  const updateListTitle = (title, listId) => {};

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    // console.log(result);
    // console.log(todoItems);
    // console.log("destination", destination, "source", source, draggableId);

    if (!destination) {
      return;
    }
    if (type === "list") {
      const newListIds = todoItems.map((todo) => todo._id);
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);
      return;
    }
    const sourceList = todoItems.filter(
      (todo) => todo._id === source.droppableId
    )[0];
    const destinationList = todoItems.filter(
      (todo) => todo._id === destination.droppableId
    )[0];
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === draggableId
    )[0];

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList._id]: destinationList,
        },
      };
      setData(newState);
    } else {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList._id]: sourceList,
          [destinationList._id]: destinationList,
        },
      };
      setData(newState);
    }
  };

  return (
    <StoreApi.Provider value={{ addMoreCard, addMoreList, updateListTitle }}>
      <div
        className={classes.root}
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <TopBar setOpen={setOpen} />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="app" type="list" direction="horizontal">
            {(provided) => (
              <div
                className={classes.listContainer}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {todoItems &&
                  todoItems.map((todoItem, index) => {
                    return (
                      <List list={todoItem} key={todoItem._id} index={index} />
                    );
                  })}
                <InputContainer type="list" />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </StoreApi.Provider>
  );
}

export default TodoList;

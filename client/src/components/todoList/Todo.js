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
  const addMoreCard = (title, listId) => {
    // console.log(title, listId);
    // const newCardId = uuid();
    // const newCard = {
    //   id: newCardId,
    //   title,
    // };
    // const list = data.lists[listId];
    // list.cards = [...list.cards, newCard];
    // const newState = {
    //   ...data,
    //   lists: {
    //     ...data.lists,
    //     [listId]: list,
    //   },
    // };
    // setData(newState);
    // console.log("STATE", newState);
  };

  const addMoreList = (title) => {
    // const newListId = uuid();
    // const newList = {
    //   id: newListId,
    //   title,
    //   cards: [],
    // };
    // const newState = {
    //   listIds: [...data.listIds, newListId],
    //   lists: {
    //     ...data.lists,
    //     [newListId]: newList,
    //   },
    // };
    // setData(newState);
    // console.log("STATE", newState);
  };

  const updateListTitle = (title, listId) => {
    // const list = data.lists[listId];
    // list.title = title;
    // const newState = {
    //   ...data,
    //   lists: {
    //     ...data.lists,
    //     [listId]: list,
    //   },
    // };
    // setData(newState);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    console.log(result);
    console.log(todoItems);
    console.log("destination", destination, "source", source, draggableId);

    if (!destination) {
      return;
    }
    if (type === "list") {
      // const newListIds = data.listIds;
      //what is this doing? do you have to swap ids for the draggable function to work?
      const newListIds = todoItems.map((todo) => todo._id);
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);
      return;
    }
    //find the correct todoItem object
    // const sourceList = data.lists[source.droppableId];
    const sourceList = todoItems.filter(
      (todo) => todo._id === source.droppableId
    )[0];
    // const destinationList = data.lists[destination.droppableId];
    const destinationList = todoItems.filter(
      (todo) => todo._id === destination.droppableId
    )[0];
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === draggableId
    )[0];

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);
      //update state with new todoItems info
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
                {/* {data.listIds.map((listId, index) => {
                  const list = data.lists[listId];
                  return <List list={list} key={listId} index={index} />;
                })} */}
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

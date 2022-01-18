import React, { useState, useContext, useEffect } from "react";
import { Paper, InputBase, Button, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { v4 as uuid } from "uuid";
import { makeStyles, alpha } from "@material-ui/core/styles";
import storeApi from "../utils/storeAPI";
import { useDispatch, useSelector } from "react-redux";
import { getTodo, makeTodo, updateTodo } from "../../../actions/todo";

const useStyle = makeStyles((theme) => ({
  card: {
    width: "280px",
    margin: theme.spacing(0, 1, 1, 1),
    paddingBottom: theme.spacing(4),
  },
  input: {
    margin: theme.spacing(1),
  },
  btnConfirm: {
    background: "#5AAC44",
    color: "#fff",
    "&:hover": {
      background: alpha("#5AAC44", 0.75),
    },
  },
  confirm: {
    margin: theme.spacing(0, 1, 1, 1),
  },
}));

export default function InputCard({ setOpen, listId, type }) {
  const classes = useStyle();
  const { addMoreCard, addMoreList } = useContext(storeApi);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const todoItems = useSelector((state) => state.todo);
  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    if (type === "card") {
      let todoItem = todoItems.filter((todo) => listId === todo._id)[0];
      let cards = todoItem.cards;
      let newCard = { id: uuid(), title: title };
      console.log(newCard);
      addMoreCard(title, uuid());
      dispatch(updateTodo(listId, { ...todoItem, cards: [...cards, newCard] }));
      setTitle("");
      setOpen(false);
    } else {
      dispatch(
        makeTodo(
          {
            listId: uuid(),
            title: title,
            cards: [],
            author: user?.result?._id,
          },
          user?.result?._id
        )
      );
      setTitle("");
      setOpen(false);
    }
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
    dispatch(getTodo(user?.result?._id));
  }, [dispatch]);

  return (
    <div>
      <div>
        <Paper className={classes.card}>
          <InputBase
            onChange={handleOnChange}
            multiline
            fullWidth
            inputProps={{
              className: classes.input,
            }}
            value={title}
            placeholder={
              type === "card" ? "Add Item to List.." : "Enter list title..."
            }
          />
        </Paper>
      </div>
      <div className={classes.confirm}>
        <Button className={classes.btnConfirm} onClick={handleSubmit}>
          {type === "card" ? "Add Task" : "Add Category"}
        </Button>
        <IconButton onClick={() => setOpen(false)}>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
} from "react-pro-sidebar";
import { makeStyles } from "@material-ui/core/styles";

import {
  FaCalendar,
  FaGem,
  FaHome,
  FaBook,
  FaClipboardList,
} from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import "react-pro-sidebar/dist/css/styles.css";
import "./navigation.css";

const useStyle = makeStyles((theme) => ({
  root: {
    color: "black",
    "&:hover": {
      backgroundColor: "peach",
    },
  },
  icons: {
    color: "white",
  },
}));
function Navigation() {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  const classes = useStyle();
  return (
    <div className="nav">
      <ProSidebar collapsed={menuCollapse} className="bg-color: #fff">
        <SidebarHeader>
          <h3 style={{ textAlign: "center" }}>Navigation</h3>
        </SidebarHeader>
        <div onClick={menuIconClick} className="arrow">
          {menuCollapse ? (
            <FiArrowRightCircle color="white" />
          ) : (
            <FiArrowLeftCircle color="white" />
          )}
        </div>
        <Menu iconShape="square" className={classes.icons}>
          <MenuItem icon={<FaHome color="white" />}>
            <Link className={classes.root} to="/">
              Home
            </Link>
          </MenuItem>
          <MenuItem color="white" icon={<FaCalendar color="white" />}>
            <Link className={classes.root} to="/calendar">
              Calendar
            </Link>
          </MenuItem>
          <MenuItem icon={<FaBook color="white" bg="blue" />}>
            <Link to="/journal">Journal</Link>
          </MenuItem>
          <MenuItem icon={<FaClipboardList color="white" />}>
            <Link to="/Todo">To-Do App</Link>
          </MenuItem>
        </Menu>
      </ProSidebar>
    </div>
  );
}

export default Navigation;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
} from "react-pro-sidebar";
import { Button } from "@material-ui/core";
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
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const classes = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getDate()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    // setUser(null);
  };

  return (
    <>
      {user && (
        <div className="nav" id="divBar">
          <ProSidebar collapsed={menuCollapse} className="bg-color: #fff">
            <SidebarHeader>
              <h3 style={{ textAlign: "center" }}>
                Welcome {user.result.name.split(" ")[0]}!
              </h3>
            </SidebarHeader>
            <div onClick={menuIconClick} className="arrow">
              {menuCollapse ? (
                <FiArrowRightCircle color="white" collapsed="true" />
              ) : (
                <FiArrowLeftCircle color="white" collapsed="true" />
              )}
            </div>
            <div id="navBar">
              <Menu iconShape="square" className={classes.icons}>
                {/* <MenuItem icon={<FaHome color="white" />}>
                <Link className={classes.root} to="/">
                  Home
                </Link>
              </MenuItem> */}
                <MenuItem
                  color="white"
                  icon={<FaCalendar color="white" id="icons" />}
                >
                  <Link className={classes.root} to="/calendar" id="roots">
                    Calendar
                  </Link>
                </MenuItem>
                <MenuItem icon={<FaBook color="white" bg="blue" id="icons" />}>
                  <Link to="/Journal" id="roots">
                    Journal
                  </Link>
                </MenuItem>
                <MenuItem icon={<FaClipboardList color="white" id="icons" />}>
                  <Link to="/Todo" id="roots">
                    To-Do App
                  </Link>
                </MenuItem>
              </Menu>
              <Button
                className="logoutbtn"
                variant="contained"
                onClick={logout}
              >
                Log Out
              </Button>
            </div>
          </ProSidebar>
        </div>
      )}
    </>
  );
}

export default Navigation;

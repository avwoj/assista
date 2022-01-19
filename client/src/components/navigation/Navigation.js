import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { ProSidebar, Menu, MenuItem, SidebarHeader } from "react-pro-sidebar";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { FaCalendar, FaBook, FaClipboardList } from "react-icons/fa";
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
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const classes = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp < new Date() / 1000) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, dispatch]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    // setUser(null);
  };

  return (
    <>
<<<<<<< HEAD
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
=======
      <div className="nav">
        <ProSidebar collapsed={menuCollapse} className="bg-color: #fff">
          <SidebarHeader>
            <h3 style={{ textAlign: "center" }}>
              {user ? `Welcome ${user.result.name.split(" ")[0]}!` : "Assista"}
            </h3>
          </SidebarHeader>
          {user && (
            <Menu iconShape="square" className={classes.icons}>
              <MenuItem color="white" icon={<FaCalendar color="white" />}>
                <Link className={classes.root} to="/calendar">
                  Calendar
                </Link>
              </MenuItem>
              <MenuItem icon={<FaBook color="white" bg="blue" />}>
                <Link to="/Journal">Journal</Link>
              </MenuItem>
              <MenuItem icon={<FaClipboardList color="white" />}>
                <Link to="/Todo">To-Do App</Link>
              </MenuItem>
            </Menu>
          )}
          {user && (
            <Button variant="contained" onClick={logout}>
              Log Out
            </Button>
          )}
        </ProSidebar>
      </div>
      {/* )} */}
>>>>>>> 1d9c3b3d2440e6739ba551b69bc9f4674f9764a9
    </>
  );
}

export default Navigation;

import { Avatar } from "@material-ui/core";
import {
  AccountBalance,
  Bookmark,
  Event,
  ExitToApp,
  Flag,
  GroupAdd,
  PeopleAlt,
  QueryBuilder,
  Tv,
  Work,
} from "@material-ui/icons";
import React from "react";
import "./Sidebar.css";
import { logout, selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Sidebar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const signout = () => {
    dispatch(logout());
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <Avatar src={user?.photo} className="avtar" />
        <h3>{user?.displayName}</h3>
      </div>

      <div className="sidebar__menu">
        <div className="sidebar__menuItem">
          <PeopleAlt className="friends" />
          <h3>Friends</h3>
        </div>
        <div className="sidebar__menuItem">
          <GroupAdd className="groups" />
          <h3>Groups</h3>
        </div>
        <div className="sidebar__menuItem">
          <AccountBalance className="market" />
          <h3>Marketplace</h3>
        </div>
        <div className="sidebar__menuItem">
          <Tv className="watch" />
          <h3>Watch</h3>
        </div>
        <div className="sidebar__menuItem">
          <Event className="events" />
          <h3>Events</h3>
        </div>
        <div className="sidebar__menuItem">
          <QueryBuilder className="memories" />
          <h3>Memories</h3>
        </div>
        <div className="sidebar__menuItem">
          <Bookmark className="saved" />
          <h3>Saved</h3>
        </div>
        <div className="sidebar__menuItem">
          <Flag className="pages" />
          <h3>Pages</h3>
        </div>
        <div className="sidebar__menuItem">
          <Work className="jobs" />
          <h3>Jobs</h3>
        </div>
        <div onClick={() => signout()} className="sidebar__menuItem">
          <ExitToApp className="logout" />
          <h3>Log Out</h3>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

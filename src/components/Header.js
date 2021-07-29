import React from "react";
import "./Header.css";
import {
  Search,
  Home,
  Tv,
  AccountBalance,
  SupervisedUserCircle,
  SportsEsports,
  Menu,
  Notifications,
  AccountCircle,
} from "@material-ui/icons";

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <img src="/fb-logo.png" alt="" />
        <div className="header__leftSearch">
          <Search />
          <input type="text" placeholder="Search Facebook" />
        </div>
      </div>

      <div className="header_middle">
        <Home />
        <Tv />
        <AccountBalance />
        <SupervisedUserCircle />
        <SportsEsports />
      </div>

      <div className="header_right">
        <img src="/messanger.png" alt="" />
        <Notifications />
        <AccountCircle />
        <Menu />
      </div>
    </div>
  );
}

export default Header;

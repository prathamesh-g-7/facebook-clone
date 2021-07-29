import React from "react";
import "./Home.css";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import SidebarRight from "./SidebarRight";

function Home() {
  return (
    <div className="home">
      <div className="home__left">
        <Sidebar />
      </div>
      <div className="home__middle">
        <Feed />
      </div>
      <div className="home__right">
        <SidebarRight />
      </div>
    </div>
  );
}

export default Home;

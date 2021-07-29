import { Cake, Notifications } from "@material-ui/icons";
import React from "react";
import "./SidebarRight.css";

function SidebarRight() {
  return (
    <div className="sidebarRight">
      <div className="sidebarRight__birthday">
        <div className="sidebarRight__birthdayTop">
          <Cake />
          <h3>Birthdays</h3>
        </div>
        <h4>Jhon Doe and 2 others have birthdays today.</h4>
      </div>
      <div className="sidebarRight__birthday">
        <div className="sidebarRight__birthdayTop">
          <Notifications />
          <h3>Notifications</h3>
        </div>
        <h4>You dont have any notification yet.</h4>
      </div>
      <div className="sidebarRight__ad">
        <img
          src="https://cdn-insights.statusbrew.com/images/2021/02/facebook-ads-trends-for-2021-get-better-returns-on-ad-spend.png"
          alt=""
        />
        <h4>
          We offer advertising solutions for every level of expertise.You don't
          have to be an expert to start advertising on Facebook.
        </h4>
      </div>
      <div className="sidebarRight__ad">
        <img
          src="https://media.istockphoto.com/photos/social-media-picture-id1190654842?k=6&m=1190654842&s=612x612&w=0&h=8yNQvTh-OBgfbNRKsUZO8SwpSfU3rc0ialuwWX4SnnI="
          alt=""
        />
        <h4>
          We offer advertising solutions for every level of expertise.You don't
          have to be an expert to start advertising on Facebook.
        </h4>
      </div>
    </div>
  );
}

export default SidebarRight;

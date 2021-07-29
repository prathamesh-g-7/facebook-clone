import React from "react";
import "./ViewStory.css";
function ViewStory({ isOpen, storyImg, storyCaption }) {
  return (
    <div className="viewStory">
      <img src={storyImg} alt="" />
      <h3>{storyCaption}</h3>
    </div>
  );
}

export default ViewStory;

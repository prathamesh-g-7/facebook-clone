import React, { useEffect, useState } from "react";
import "./Feed.css";
import {
  AddCircle,
  More,
  PhotoLibrary,
  SentimentVerySatisfied,
  VideoCall,
} from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import Post from "./Post";
import Modal from "react-modal";
import CreatePost from "./CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { selectPosts } from "../features/postSlice";
import CreateStory from "./CreateStory";
import db from "../Firebase/firebase";
import ViewStory from "./ViewStory";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function Feed() {
  const posts = useSelector(selectPosts);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isStoryOpen, setIsStoryOpen] = React.useState(false);
  const [isViewStory, setIsViewStory] = React.useState(false);

  const [storyData, setStoryData] = useState([]);
  const [storyImg, setStoImage] = useState("");
  const [caption, setCaption] = useState("");

  function openStoryModalOnce() {
    setIsOpen(true);
  }
  function openModal() {
    setIsOpen(true);
  }
  function openStoryModal() {
    setIsStoryOpen(true);

    document.getElementById("h").classList.add("hide");
    document.getElementById("hh").classList.add("hide");
    document.getElementById("hhh").classList.add("hide");
  }
  function openViewStoryModal(storyImage, storyCaption) {
    setIsViewStory(true);
    setStoImage(storyImage);
    setCaption(storyCaption);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  function closeStoryModal() {
    setIsStoryOpen(false);
  }
  function closeViewStoryModal() {
    setIsViewStory(false);
  }

  const user = useSelector(selectUser);

  // get all stories from firebase

  useEffect(() => {
    db.collection("story").onSnapshot((snap) =>
      setStoryData(snap.docs.map((doc) => doc.data()))
    );
  }, []);

  return (
    <div className="feed">
      <div className="feed__top">
        <h4>Home</h4>
        <h4>Favorites</h4>
        <h4>Recent</h4>
        <More />
      </div>
      <hr />
      {/* story section*/}
      <div className="feed__story">
        <div
          className="create__story"
          style={{
            backgroundImage: `url(${user?.photo})`,
            // backgroundRepeat: "no-repeat",
            objectFit: "cover",
          }}
        >
          <span onClick={openStoryModal}>
            <AddCircle />
            <h3>Create Story</h3>
          </span>
        </div>

        {storyData &&
          storyData.map((story) => (
            <div
              className="feed__storyBlock"
              onClick={() =>
                openViewStoryModal(story.storyImage, story.storyCaption)
              }
            >
              {" "}
              <img src={story.storyImage} alt="story image" />
            </div>
          ))}

        <div className="feed__storyBlock" id="h">
          <img src="/story-two.jpeg" alt="" />
        </div>
        <div className="feed__storyBlock " id="hh">
          <img src="/story-three.jpeg" alt="" />
        </div>
        {/* <div className="feed__storyBlock hide">
          <img src="/story-four.jpeg" alt="" />
        </div> */}
        <div className="feed__storyBlock " id="hhh">
          <img src="/story-five.jpeg" alt="" />
        </div>
      </div>
      {/* upload post section */}
      <div className="feed__upload">
        <div className="feed__uploadSection">
          <Avatar src={user?.photo} />
          <div className="mind" onClick={openModal}>
            <h3>What's on your mind, Prathamesh?</h3>
          </div>
        </div>
        <hr />
        <div className="feed__uploadMenu">
          <div className="feed__uploadMenuItem">
            <VideoCall className="videocall" />
            <h3>Live Video</h3>
          </div>
          <div className="feed__uploadMenuItem" onClick={openStoryModalOnce}>
            <PhotoLibrary className="photo" />
            <h3>Photo/Video</h3>
          </div>
          <div className="feed__uploadMenuItem">
            <SentimentVerySatisfied className="felling" />
            <h3>Felling/Activity</h3>
          </div>
        </div>

        {/* modal For Post */}

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal_buttonContainer">
            <div className="modal_buttonContainerHeading">
              <h3>Create Post</h3>
            </div>
            <button className="modal_button" onClick={closeModal}>
              X
            </button>
          </div>

          <CreatePost isOpen={modalIsOpen} />
        </Modal>
      </div>

      {posts &&
        posts.map((post) => (
          <Post
            p_id={post.postId}
            p_caption={post?.postCaption}
            p_image={post?.postImage}
            p_username={post?.postUserName}
            p_useravatar={post?.postUserPhoto}
          />
        ))}

      {/* Modal for Story */}
      <Modal
        isOpen={isStoryOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeStoryModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal_buttonContainer">
          <div className="modal_buttonContainerHeading">
            <h3>Create Story</h3>
          </div>
          <button className="modal_button" onClick={closeStoryModal}>
            X
          </button>
        </div>

        <CreateStory isOpen={isStoryOpen} />
      </Modal>

      {/* Modal for view Story */}
      <Modal
        isOpen={isViewStory}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeViewStoryModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal_buttonContainer">
          <div className="modal_buttonContainerHeading">
            <h3>Story Viewer</h3>
          </div>
          <button className="modal_button" onClick={closeViewStoryModal}>
            X
          </button>
        </div>

        <ViewStory
          isOpen={isStoryOpen}
          storyImg={storyImg}
          storyCaption={caption}
        />
      </Modal>
    </div>
  );
}

export default Feed;

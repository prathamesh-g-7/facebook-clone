import { Avatar } from "@material-ui/core";
import {
  AccountBox,
  ColorLens,
  EmojiEmotions,
  InsertEmoticon,
  LiveHelp,
  LocationOn,
  PhotoLibrary,
  Public,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CreatePost.css";
import { selectUser } from "../features/userSlice";
import db, { firebaseApp } from "../Firebase/firebase";
import { postInfo } from "../features/postSlice";

function CreatePost({ isOpen }) {
  const user = useSelector(selectUser);
  const [fileUrl, setFileUrl] = useState(null);
  const [posts, setPosts] = useState([]);
  const [cap, setCap] = useState("");

  const dispatch = useDispatch();

  const OnFileChange = async (e) => {
    //
    const file = e.target.files[0];
    const storageRef = firebaseApp.storage().ref();
    const fileRef = storageRef.child(file.name);

    await fileRef.put(file);

    setFileUrl(await fileRef.getDownloadURL());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("posts").add({
      caption: cap,
      image: fileUrl,
      userId: user?.id,
      userName: user?.displayName,
      userPhoto: user?.photo,
    });

    isOpen = false;

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="createPost">
      {/* top */}
      <div className="createPost__top">
        <div className="createPost__topProfile">
          <Avatar src={user?.photo} />
        </div>
        <div className="createPost__topName">
          <h3>{user?.displayName}</h3>
          <p>
            {" "}
            <span>
              <Public className="public" />
            </span>{" "}
            Public
          </p>
        </div>
      </div>

      {/* main */}

      <div className="createPost__main">
        <h4>
          {" "}
          <input
            className="createPost__inputSetion"
            type="text"
            name="postCaption"
            onChange={(e) => setCap(e.target.value)}
            placeholder="What's on Your mind?"
          />{" "}
        </h4>
      </div>

      {/* color and emoji */}
      <div className="createPost__emoji">
        <ColorLens className="color" />
        <EmojiEmotions className="emoji" />
      </div>

      {/* attach file section */}

      <div className="createPost__attach">
        <div className="createPost__attachText">
          <h3>Attach images/videos </h3>
          <input type="file" onChange={OnFileChange} />
        </div>
        <div className="createPost__attachIcons">
          <LiveHelp id="help" />
          <PhotoLibrary id="photo" />
          <AccountBox id="tag" />
          <LocationOn id="location" />
          <InsertEmoticon id="fellings" />
        </div>
      </div>

      {/* post button */}

      <div className="createPost__button">
        {fileUrl ? (
          <button type="submit" onClick={handleSubmit}>
            Post
          </button>
        ) : (
          <button disabled type="button">
            Attach Image To Post
          </button>
        )}
      </div>
    </div>
  );
}

export default CreatePost;

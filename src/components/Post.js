import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Post.css";
import { selectUser } from "../features/userSlice";
import {
  CameraAlt,
  CardGiftcard,
  ChatBubbleOutline,
  Gif,
  MoreHoriz,
  SentimentSatisfied,
  ThumbUpAlt,
} from "@material-ui/icons";
import db from "../Firebase/firebase";

function Post({ p_id, p_caption, p_image, p_username, p_useravatar }) {
  const user = useSelector(selectUser);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  console.log(new Date().toDateString());

  const toggleColor = () => {
    let btn = document.getElementById("d");

    btn.classList.toggle("activeBtn");
  };

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(p_id).collection("comments").add({
      timestamp: new Date(),
      comment: commentInput,
      commentUserName: user?.displayName,
      commentUserProfilePhoto: user?.photo,
    });

    setCommentInput("");
  };

  useEffect(() => {
    db.collection("posts")
      .doc(p_id)
      .collection("comments")
      .orderBy("comment", "desc")
      .onSnapshot((snap) => setComments(snap.docs.map((doc) => doc.data())));
  }, [p_id]);

  return (
    <div className="post">
      {/* post top section*/}
      <div className="post__top">
        <Avatar className="post__avtar" src={p_useravatar} />
        <h3>{p_username}</h3>
        <MoreHoriz className="dots" />
      </div>

      {/* post text section */}
      <div className="post__textSection">
        <p>{p_caption}</p>
      </div>

      {/* post image section */}
      <div className="post__image">
        <img src={p_image} alt="" />
      </div>

      {/* Like Comment Section */}

      <div className="post__likeComment">
        <div className="like" onClick={toggleColor}>
          <ThumbUpAlt className="notFilled" id="d" />
          <h3>Like</h3>
        </div>
        <div className="comment">
          <ChatBubbleOutline />
          <h3>Comment</h3>
        </div>
      </div>

      {/* Show Comments Section */}

      {comments &&
        comments.map((comment) => (
          <>
            <div className="post__showComments">
              <div className="post__showCommentsInfo">
                <Avatar
                  src={comment.commentUserProfilePhoto}
                  id="comment__avatar"
                />
                <p>{comment.commentUserName}</p>
              </div>
              <p>{comment.comment}</p>
            </div>
          </>
        ))}

      {/* write a comment section */}

      <div className="post__writeComment">
        <div className="profilePic">
          <Avatar id="a" src={p_useravatar} />
        </div>
        <form className="commentInput">
          <div className="input">
            <input
              type="text"
              placeholder="Write a comment"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <SentimentSatisfied />
            <CameraAlt />
            <Gif />
            <CardGiftcard />
          </div>
          <button className="cmt__btn" type="submit" onClick={postComment}>
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default Post;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import postSlice, { postInfo, selectPosts } from "./features/postSlice";
import { login, logout, selectUser } from "./features/userSlice";
import db, { auth } from "./Firebase/firebase";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const posts = useSelector(selectPosts);

  useEffect(() => {
    db.collection("posts")
      .get()
      .then((snap) =>
        snap.docs.map((doc) =>
          dispatch(
            postInfo({
              postId: doc.id,
              postCaption: doc.data().caption,
              postImage: doc.data().image,
              postUserId: doc.data().userId,
              postUserName: doc.data().userName,
              postUserPhoto: doc.data().userPhoto,
            })
          )
        )
      );

    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // displatch login action
        dispatch(
          login({
            id: authUser?.uid,
            photo: authUser?.photoURL,
            email: authUser?.email,
            displayName: authUser?.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {user ? (
        <>
          <Header />
          <Home />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

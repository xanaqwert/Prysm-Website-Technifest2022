import React, { useContext, useState, useEffect } from "react";

import { BiHomeAlt } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { BsFillTrashFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { Context } from "../App";
import Swal from "sweetalert2";

function Home({ isAuth }) {
  let navigate = useNavigate();
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "post");
  const [id, setid] = useState("");
  const [color, setcolor] = useState("black");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(
        postsCollectionRef,
        orderBy("createdAt", "desc")
      );

      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [postLists]);

  // const deletePost = async (id) => {
  //   const postDoc = doc(db, "posts", id);
  //   await deleteDoc(postDoc);
  const deletePost = async (id) => {
    const postDoc = doc(db, "post", id);
    await deleteDoc(postDoc);
  };
  const setLogin = useContext(Context);

  return (
    <>
      <div className="container ">
        <div className="sidenav ">
          <h1 className="logo">Prysm</h1>

          <Link
            style={{ textDecoration: "none", color: "white", display: "flex" }}
            to="/"
          >
            <BiHomeAlt className="icon" />
            <span className="routes">Home</span>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "white", display: "flex" }}
            to="/explore"
          >
            <MdOutlineExplore className="icon" />
            <span className="routes">Explore</span>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "white", display: "flex" }}
            to="/profile"
          >
            <FaRegUserCircle className="icon" />
            <span className="routes"> Profile</span>
          </Link>

          <img
            src="https://i.ibb.co/6sKqXGr/juicy-team-discussing-the-project.png"
            alt="juicy-team-discussing-the-project"
            border="0"
            className="img-diskusi"
            width={200}
          />
        </div>
        <div className="main col-6 ">
          <div className="top-nav">
            <h1 className="main-text">Home</h1>
            <div className="button">
              <h1 className="title">
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/form"
                >
                  CREATE POST
                </Link>
              </h1>
            </div>
          </div>
          {postLists.map((post, i) => {
            return (
              <div className="postingan-container" key={i}>
                <div className="profile-home">
                  <div className="photocuyyy">
                    <img src={post.author?.photo} className="photo-profile" />
                    <h3 className="username-profile">{post.author?.name}</h3>
                  </div>
                  <div className="deletePost">
                    {isAuth && post.author?.id === auth.currentUser.uid && (
                      <div>
                        {" "}
                        <BiEdit
                          className="icon-edit"
                          size={23}
                          onClick={() => navigate(`/edit/${post?.id}`)}
                        />
                        <BsFillTrashFill
                          className="icon-trash"
                          onClick={() => {
                            deletePost(post?.id);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="judul-post">
                  <h1 className="h1-judul">{post.title}</h1>
                  <Link className="info" to={`/details/${post.id}`}>
                    {post.postText?.substring(0, 20)}{" "}
                    <span className="read">... read more</span>
                  </Link>
                </div>
                <div className="like-dislike">
                  <AiFillLike
                    className="like"
                    style={{ color: color }}
                    onClick={() =>
                      Swal.fire(
                        "Like berhasil !",
                        "Sepertinya kamu suka nih dengan postingan ini :D",
                        "success"
                      )
                    }
                  />
                  <AiFillDislike
                    className="dislike"
                    onClick={() =>
                      Swal.fire(
                        "Dislike berhasil !",
                        "Kamu tidak tertarik yah :( ",
                        "success"
                      )
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="rightbar col-3">
          <h1 className="recommended">Recommended</h1>

          <img
            src="https://i.ibb.co/jG9BkB8/juicy-girl-sending-messages-from-her-phone.png"
            alt="juicy-girl-sending-messages-from-her-phone"
            border="0"
            className="img-diskusi2"
            width={200}
          />
        </div>
      </div>
      <div className="navbar">
        <Link style={{ textDecoration: "none", color: "white" }} to="/">
          <BiHomeAlt className="icon" />
        </Link>

        <Link style={{ textDecoration: "none", color: "white" }} to="/explore">
          <MdOutlineExplore className="icon" />
        </Link>
        <Link style={{ textDecoration: "none", color: "white" }} to="/profile">
          <FaRegUserCircle className="icon" />
        </Link>
      </div>
    </>
  );
}

export default Home;

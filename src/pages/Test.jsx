import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
function Test() {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "post");
  const [id, setid] = useState("");
  const [search, setsearch] = useState("");
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef, orderBy("date", "desc"));

      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [postLists]);
  return (
    <div className="container">
      <div className="navbar-details">
        <Link style={{ textDecoration: "none", color: "white" }} to="/">
          <h1>Prysm</h1>
        </Link>
        <div className="input-container">
          <input
            className="input-user"
            type="text"
            placeholder="Cari pertanyaan mu disini"
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>
      </div>

      <div className="container-pencarian">
        <h1 className="pencarian-result">Hasil pencarian mu </h1>
        <div className="pencarian-container">
          {postLists
            .filter((val) => {
              if (search === "") {
                return "";
              } else if (
                val.title.toLowerCase().includes(search.toLowerCase())
              ) {
                return val;
              }
            })
            .map((val, key) => {
              return (
                <div className="post-container" key={key}>
                  <div className="profile-explore">
                    <img
                      src={val.author?.photo}
                      alt=""
                      className="image-explore"
                    />
                    <h3>{val.author.name}</h3>
                  </div>

                  <div className="content-post">
                    <h1 className="h1-content">{val.title}</h1>
                    <Link className="info" to={`/details/${val.id}`}>
                      {val.postText.substring(0, 20)}{" "}
                      <span className="read">... read more</span>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Test;

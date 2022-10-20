import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
function Form() {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const postsCollectionRef = collection(db, "post");
  let navigate = useNavigate();
  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      createdAt: Timestamp.now().toDate(),
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
        photo: auth.currentUser.photoURL,
      },
    });
    navigate("/");
  };
  return (
    <div className="container-form">
      <div className="navbar-form">
        <Link style={{ textDecoration: "none", color: "white" }} to="/">
          <h1>Prysm</h1>
        </Link>
        <div className="buttons">
          <div className="button-1 publish">
            <h2 className="title-1" onClick={createPost}>
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                Publish
              </Link>
            </h2>
          </div>
          <div className="button-1 cancel">
            <h2 className="title-1">
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                Cancel
              </Link>
            </h2>
          </div>
        </div>
      </div>
      <div className="form-container">
        <h1 className="title-header">AJUKAN PERTANYAAN MU ! </h1>
        <input
          className="input-judul"
          maxLength={30}
          type="text"
          placeholder="Tulis judul pertanyaan mu"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <textarea
          className="input-isi"
          type="text"
          placeholder="Tulis isi pertanyaan mu"
          onChange={(event) => {
            setPostText(event.target.value);
          }}
        />

        <div className="image-side">
          <img
            width={480}
            src="https://i.ibb.co/tQqcxWq/juicy-man-develops-a-scheme-1.png"
            alt="juicy-man-develops-a-scheme-1"
            border="0"
          />
        </div>
      </div>
    </div>
  );
}

export default Form;

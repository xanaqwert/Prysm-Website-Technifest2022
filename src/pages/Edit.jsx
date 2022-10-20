import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { doc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
function Edit() {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  let params = useParams();
  let navigate = useNavigate();
  const id = params.id;
  const updatePost = async (id) => {
    const postDoc = doc(db, "post", id);
    const newPost = { title, postText };
    await updateDoc(postDoc, newPost);
  };
  return (
    <div className="container-form">
      <div className="navbar-form">
        <Link style={{ textDecoration: "none", color: "white" }} to="/">
          <h1>Prysm</h1>
        </Link>
        <div className="buttons">
          <div className="button-1 publish">
            <h2 className="title-1" onClick={() => updatePost(id)}>
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
        <h1 className="title-header">UBAH PERTANYAAN MU ! </h1>
        <input
          className="input-judul"
          maxLength={20}
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

export default Edit;

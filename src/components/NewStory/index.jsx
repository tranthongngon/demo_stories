import React, { useEffect, useState } from "react";
import { getStory, createStory, updateStory } from "../../services";
import { v4 as uuidv4 } from "uuid";
import { Link, useLocation } from "react-router-dom";
import "./style.css";
import LoadingService from "../loadingService";
import toast from "react-hot-toast";

export default function NewStory() {
  const [title, setTitle] = useState("");
  const [thumnail, setThumnail] = useState("");
  const [content, setContent] = useState("");
  const [uid, setUid] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.uid) {
      setLoading(true);
      getStory(location.state?.uid).then((res) => {
        setTitle(res.data().title);
        setThumnail(res.data().thumnail);
        setContent(res.data().content);
        setUid(location.state?.uid);
        setLoading(false);
      });
    }
    return () => {};
  }, [location.state?.uid]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const encoder = new TextEncoder('utf-8');
        const encoded = encoder.encode(reader.result);
        if(encoded.length > 1048487) {
          toast.error("size hình quá lớn");
        }else {
          setThumnail(reader.result);
        }
      };
      reader.readAsDataURL(file);
      
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && thumnail && content) {
      setLoading(true);
      if (!uid) {
        const uuid = uuidv4();
        createStory(uuid, title, thumnail, content)
          .then((res) => {
            console.log(res);
            setUid(uuid);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      } else {
        updateStory(uid, { title, thumnail, content })
          .then((res) => {
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }
    } else {
      return;
    }
  };

  return (
    <div className="site-content">
      {loading && <LoadingService/>}
      <div className="container">
        <div className="wrap-form">
          <h3>Tạo story</h3>
          <form>
            <div className="wrap-img">
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg, image/jpg"
                onChange={handleImageChange}
                maxLength={1048487}
              />
              {thumnail && <img src={thumnail} alt="" />}
              {!thumnail && <span>Chọn hình</span>}
            </div>
            <div className="form-control">
              <label htmlFor="title">Tiêu đề</label>
              <input
                value={title}
                type="text"
                placeholder="nhập nội dụng"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="conetent">Nội dung</label>
              <textarea
                value={content}
                cols="30"
                rows="10"
                placeholder="nhập nội dụng"
                id="content"
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          </form>
          <div className="wrap-btns">
            <button
              className="btn"
              onClick={(e) => handleSubmit(e)}
              disabled={!title || !thumnail || !content}
            >
              Lưu
            </button>
            <Link to="/" className="btn">
              Gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

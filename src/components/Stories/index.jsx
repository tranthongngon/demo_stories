import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStories } from "../../services";
import LoadingService from "../loadingService";
import "./style.css";

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    getStories()
      .then((res) => {
        setStories(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    return () => {};
  }, []);

  return (
    <div className="site-content">
      {loading && <LoadingService />}
      <div className="container">
        <h3 className="title">List stories</h3>
        <div className="list-stories">
          {stories.length > 0 &&
            stories.map((story, index) => (
              <div>
                <div className="story" key={index}>
                <button
                  className="btn-edit"
                  onClick={() =>
                    navigate("/new-story", {
                      state: { uid: story.id },
                    })
                  }
                >
                  <svg
                    className="feather feather-edit"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <Link to={`/story/${story.id}`} className="story-thumnail">
                  <img src={story.thumnail} alt="" />
                </Link>
                <Link className="story-content" to={`/story/${story.id}`}>
                  <h3>{story.title}</h3>
                  <p>{story.content}</p>
                </Link>
              </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

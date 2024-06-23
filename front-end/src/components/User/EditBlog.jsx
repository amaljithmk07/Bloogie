import React, { useEffect, useState } from "react";
import "./EditBlog.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
const EditBlog = () => {
  const token = sessionStorage.getItem("token");
  ////Loader
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const [allBlogs, setAllblogs] = useState([]);

  useEffect(() => {
    setLoader(true);

    axios
      .get(`http://localhost:2222/api/blog/seperate-blog`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        setAllblogs(data.data.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  }, []);

  //////////
  const editHandler = (id) => {};

  return (
    <div>
      {loader == true ? (
        <Loader />
      ) : (
        <div className="edit-blog-main-body">
          <div className="edit-blog-sub-body">
            <div className="edit-blog-title">Enhance Your Blog</div>
            <div className="edit-blog-card-sec">
              {allBlogs.map((data) => (
                <>
                  <div className="edit-blog-card" key={data._id}>
                    <img
                      src="/edit-icon.png"
                      className="edit-blog-card-edit-icon"
                      alt=""
                      onClick={editHandler(data._id)}
                    />
                    <img
                      src={`/upload/${data.image}`}
                      alt=""
                      className="edit-blog-content-img"
                    />
                    <div className="edit-blog-content">
                      <div className="edit-blog-content-data">{data.title}</div>{" "}
                      <div className="edit-blog-content-data">
                        {data.author}
                      </div>
                      <div className="edit-blog-content-data">
                        {data.time_stamp}
                      </div>
                      <div className="edit-blog-content-data">
                        {data.content}
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
            {/* <div className="edit-blog-update-card-sec">
              <img
                src={`/upload/${data.image}`}
                alt=""
                className="edit-blog-update-img"
              />
              <input className="edit-blog-update-data" value={data.title} />{" "}
              <input className="edit-blog-update-data" value={data.author} />
              <input className="edit-blog-update-data" value={data.content} />
              <input
                className="edit-blog-update-data"
                value={data.time_stamp}
              />
              <button className="edit-blog-update-btn">Submit</button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBlog;

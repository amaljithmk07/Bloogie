import React, { useEffect, useState } from "react";
import "./EditBlog.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import BASE_URI from "../Constant/Constant";
const EditBlog = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  ////Loader
  const [loader, setLoader] = useState(false);

  //////All blog of the user
  const [allBlogs, setAllblogs] = useState([]);

  useEffect(() => {
    setLoader(true);
    axios
      .get(`${BASE_URI}/api/blog/seperate-blog`, {
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

  /////State for viewing selectedd blog
  const [singleView, setSingleView] = useState({
    title: "",
    author: "",
    content: "",
    time_stamp: "",
  });

  /////form changer
  const [formChanger, setFormchanger] = useState(false);

  const editHandler = (id) => {
    console.log(id);
    axios
      .get(`${BASE_URI}/api/blog/view-one-blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        setSingleView(data.data.data);
        setFormchanger(true);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };
  console.log(singleView);

  //////////Update form Field Handler

  const updateFieldHandler = (e) => {
    const { name, value } = e.target;
    setSingleView({ ...singleView, [name]: value });
  };

  const updateFieldSubmit = (id) => {
    axios
      .put(`${BASE_URI}/api/blog/edit-blog/${id}`, singleView, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        setLoader(false);
        window.location.reload();
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };
  return (
    <div>
      {loader == true ? (
        <Loader />
      ) : (
        <div className="edit-blog-main-body">
          <div className="edit-blog-sub-body">
            <div className="edit-blog-title">Enhance Your Blog</div>
            {formChanger == false ? (
              <div className="edit-blog-card-sec">
                {allBlogs.map((data) => (
                  <>
                    <div className="edit-blog-card" key={data._id}>
                      <img
                        src="/edit-icon.png"
                        className="edit-blog-card-edit-icon"
                        alt=""
                        onClick={() => editHandler(data._id)}
                      />
                      <img
                        src={`/upload/${data.image}`}
                        alt=""
                        className="edit-blog-content-img"
                      />
                      <div className="edit-blog-content">
                        <div className="edit-blog-content-data">
                          {data.title}
                        </div>{" "}
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
            ) : (
              <div className="edit-blog-update-card-sec">
                {/* <img
                  src={`/upload/${singleView.image}`}
                  alt=""
                  className="edit-blog-update-img"
                /> */}
                <input
                  className="edit-blog-update-data"
                  value={singleView.title}
                  onChange={updateFieldHandler}
                  name="title"
                  placeholder="Title"
                />{" "}
                <input
                  className="edit-blog-update-data"
                  value={singleView.author}
                  onChange={updateFieldHandler}
                  name="author"
                  placeholder="Author"
                />
                <input
                  className="edit-blog-update-data"
                  value={singleView.content}
                  onChange={updateFieldHandler}
                  name="content"
                  placeholder="Content"
                />
                <input
                  className="edit-blog-update-data"
                  value={singleView.time_stamp}
                  onChange={updateFieldHandler}
                  name="time_stamp"
                  placeholder="Timestamp"
                />
                <button
                  className="edit-blog-update-btn"
                  onClick={() => updateFieldSubmit(singleView._id)}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBlog;

import React, { useContext, useEffect, useState } from "react";
import "./Detail.scss";
import Slider from "../../components/Slider/Slider";
import { singlePostData, userData } from "../../lib/dummydata";
import Map from "../../components/Map/Map";
import { redirect, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Detail = () => {
  const singlePostData = useLoaderData();
  const { currentUser } = useContext(AuthContext);
  const [saved, setSaved] = useState(singlePostData.isSaved);

  const handleSave = async (e) => {
    setSaved((prev) => !prev);
    if (!currentUser) {
      redirect("/login");
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/save",
        { postId: singlePostData.id },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      setSaved((prev) => !prev);
      console.log(error);
    }
  };

  return (
    <>
      <div className="detailpage">
        <div className="detail">
          <div className="wrapper">
            <Slider images={singlePostData.images} />
            <div className="info">
              <div className="top">
                <div className="post">
                  <h1>{singlePostData.title}</h1>
                  <div className="address flex gap-1">
                    <span>
                      <span class="material-symbols-outlined">location_on</span>
                    </span>
                    <span>{singlePostData.address}</span>
                  </div>
                  <div className="price">INR. {singlePostData.price}</div>
                </div>
                <div className="user">
                  <img src={singlePostData.user.avatar} alt="" />
                  <span>{singlePostData.user.username}</span>
                </div>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(singlePostData.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
        <div className="features">
          <div className="wrapper">
            <p className="text">General</p>
            <div className="general">
              <div className="feature">
                <img src="/utility.png" alt="" />
                {singlePostData.postDetail.utilities !== null && (
                  <div className="featureText">
                    <span>Utilities</span>
                    <p>{singlePostData.postDetail.utilities}</p>
                  </div>
                )}
              </div>
              <div className="feature">
                <img src="/fee.png" alt="" />
                <div className="featureText">
                  <span>Property Fees</span>
                  <p>{singlePostData.postDetail.income}</p>
                </div>
              </div>
              <div className="feature">
                <img src="/pet.png" alt="" />
                <div className="featureText">
                  <span>Pet Policy</span>
                  <p>{singlePostData.postDetail.pet}</p>
                </div>
              </div>
            </div>
            <p className="text">Room Size</p>
            <div className="roomsize">
              <div className="size">
                <img src="/size.png" alt="" />
                <span>{singlePostData.postDetail.size} sqft</span>
              </div>
              <div className="size">
                <img src="/bed.png" alt="" />
                <span>{singlePostData.bedroom} Bedrooms</span>
              </div>
              <div className="size">
                <img src="/bath.png" alt="" />
                <span>{singlePostData.bathroom} Bathrooms</span>
              </div>
            </div>
            {singlePostData.postDetail.school &&
              singlePostData.postDetail.bus &&
              singlePostData.postDetail.restaurant && (
                <>
                  <p className="text">Nearby Places</p>
                  <div className="nearby">
                    {singlePostData.postDetail.school && (
                      <div className="feature">
                        <img src="/school.png" alt="" />
                        <div className="featureText">
                          <span>School</span>
                          <p>{singlePostData.postDetail.school}m away</p>
                        </div>
                      </div>
                    )}
                    {singlePostData.postDetail.bus && (
                      <div className="feature">
                        <img src="/bus.png" alt="" />
                        <div className="featureText">
                          <span>Bus Stop</span>
                          <p>{singlePostData.postDetail.bus}m away</p>
                        </div>
                      </div>
                    )}
                    {singlePostData.postDetail.restaurant && (
                      <div className="feature">
                        <img src="/restaurant.png" alt="" />
                        <div className="featureText">
                          <span>Restaurant</span>
                          <p>{singlePostData.postDetail.restaurant}m away</p>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            <p className="text">Location</p>
            <div className="location">
              <Map item={[singlePostData]} />
            </div>
            <div className="btns">
              <button>
                <img src="/chat.png" alt="" />
                Send a Message
              </button>
              <button
                onClick={handleSave}
                style={{ backgroundColor: saved ? "#fece51" : "white" }}
              >
                <img src="/save.png" alt="" />
                {saved ? "Post being saved" : "Save the Place"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;

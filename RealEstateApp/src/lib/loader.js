import axios from "axios";
import { defer } from "react-router-dom";

export const singlePost = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/posts/${params.id}`, {
    withCredentials: true,
  });
  // console.log(res.data);

  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postResponsePromise = axios.get(
    `http://localhost:3000/api/posts?${query}`
  );
  return defer({
    postResponse: postResponsePromise,
  });
};

export const profilePost = async () => {
  const res = axios.get("http://localhost:3000/api/users/fetchProfileList", {
    withCredentials: true,
  });

  const chatPromise = axios.get("http://localhost:3000/api/chats", {
    withCredentials: true,
  });
  
  return defer({
    postResponse: res,
    chatResponse: chatPromise,
  });
};

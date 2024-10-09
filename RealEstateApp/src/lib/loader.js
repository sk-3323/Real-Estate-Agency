import axios from "axios";

export const singlePostLoader = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/posts/${params.id}`);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const res = await axios.get(`http://localhost:3000/api/posts?${query}`);
  return res.data;
};

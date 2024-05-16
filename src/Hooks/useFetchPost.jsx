import React, { useState } from "react";

const useFetchPost = () => {
  const [loading, setLoading] = useState(false);
  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/fetch-post");
      const data = res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return { loading, fetchPost };
};

export default useFetchPost;

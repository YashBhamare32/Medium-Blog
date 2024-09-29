import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import Cookies from 'js-cookie';
import { PostType } from '../../types/UserTypes';

export const useBlogById = ({id: authorId}) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<PostType>();
  const [authFailed, setAuthFailed] = useState(false); // New state for auth failure
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      setAuthFailed(true);
      setLoading(false);
      return;
    }

    axios.get(`${BACKEND_URL}/api/v1/blog/blogId/${authorId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized error
          setAuthFailed(true);
        }
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blog,
    authFailed // Return authFailed status
  };
};

export const useBlogsByUser = ({id: authorId}) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<PostType[]>();
  const [authFailed, setAuthFailed] = useState(false); // New state for auth failure
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      setAuthFailed(true);
      setLoading(false);
      return;
    }

    axios.get(`${BACKEND_URL}/api/v1/blog/authorId/${authorId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized error
          setAuthFailed(true);
        }
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
    authFailed // Return authFailed status
  };
};

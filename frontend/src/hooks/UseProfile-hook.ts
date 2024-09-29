import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import Cookies from 'js-cookie';
import { PostType, UserType } from '../../types/UserTypes';

export const useProfile = ({username}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType>();
  const [authFailed, setAuthFailed] = useState(false); // New state for auth failure
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      setAuthFailed(true);
      setLoading(false);
      return;
    }

    axios.get(`${BACKEND_URL}/api/v1/auth/user/${username}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized error
          setAuthFailed(true);
        }
        setLoading(false);
      });

    axios.get(`${BACKEND_URL}/api/v1/auth/user/${username}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        setUser(res.data);
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
    user,
    authFailed // Return authFailed status
  };
};

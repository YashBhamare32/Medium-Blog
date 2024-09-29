import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const Signout = () => {
  const [deleted, setDeleted] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    Cookies.remove('token');
    setDeleted(true);

    navigate('/signin');
  };

  const handleCancel = ()=>{
    setDeleted(false);

    navigate('/blogs');
  }

  return (
    <div>
      {deleted ? (
        <div className="flex flex-col items-center mt-10 font-medium text-xl">
          Signed out successfully.
        </div>
      ) : (
        <div className="flex flex-col items-center mt-10 font-medium text-xl">
          Are you sure you want to sign out?
          <div className="flex">
            <button className="bg-black rounded-md p-3 text-blue-400 mt-4 m-2" onClick={handleCancel}>Stay</button>
            <button className="bg-black rounded-md p-3 text-red-500 mt-4 m-2" onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      )}
    </div>
  );
};

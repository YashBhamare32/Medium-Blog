import { useParams } from 'react-router-dom';
import { AppBar } from '../components/AppBar';
import { useProfile } from '../hooks/UseProfile-hook';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../config';
import Cookies from 'js-cookie';

export const Profile = () => {
  const params = useParams();
  const username = Cookies.get('authorName');
  const { loading, user, authFailed } = useProfile({ username });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  return (
    <div>
      <AppBar />
      <div className="flex flex-col items-center border-b">
        <div className="max-w-2xl w-full my-4 flex justify-between items-center" key={params.userId}>
          <div className="text-5xl font-medium">
            {user?.name}
          </div>
          {/*TODO: Three dots links not working fix it*/}
          <button
            id="dropdownMenuIconButton"
            onClick={toggleDropdown}
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 4 15"
            >
              <path
                d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div
              id="dropdownDots"
              className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              style={{ right: 550, top: 135 }} // Adjust position as needed
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                <li>
                  <button onClick={()=>{
                    navigator.clipboard.writeText(window.location.href )
                      .then(() => {
                        alert('Profile link copied to clipboard!');
                    }).catch(err => {
                      console.error('Failed to copy: ', err);
                    });
                  }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Copy Profile Link
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

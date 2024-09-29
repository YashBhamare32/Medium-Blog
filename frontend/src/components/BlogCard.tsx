import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface BlogCardProps {
    authorName: string;
    title:string;
    content:string;
    publishedDate: string;
}
export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
}: BlogCardProps)=>{
    return (
        <div className="border-b pb-4 border-slate-200 p-2">
            <div className="flex">
                <div className="flex">
                    <Avatar name={authorName}/>
                </div>  
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                    {authorName}
                </div>
                <div className="pl-2 flex flex-col justify-center">
                    <Circle />
                </div>
                <div className="pl-2 flex flex-col justify-center font-thin text-slate-400">
                    {publishedDate}
                </div>
            </div>
            <div className=" pt-2 text-xl font-bold">
                {title}
            </div>
            <div className="text-md font-medium">
                {content.slice(0,100) + "..."}
            </div>
            <div className="pt-4 text-slate-500 text-sm font-thin">
                {`${Math.ceil(content.length / 100)} minute(s)`}
            </div>
        </div>
    )
}

function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">
        
    </div>
}
export function Avatar({name, size='small'}: {name : string, size?:'small'| 'big'}){
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full ${size === 'small' ? "w-6 h-6" : 'w-8 h-8'} dark:bg-gray-600`}>
        <span className={`text-sm text-gray-600 ${size === 'small' ? 'text-xs' : 'text-md'} dark:text-gray-300`}>{name.toUpperCase()[0]}</span>
    </div>
}

export function AppbarUser({ username }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };
  const name = Cookies.get("authorName");

  return (
    <div className="relative">
      <button
        id="dropdownUserAvatarButton"
        onClick={toggleDropdown}
        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        type="button"
      >
        <span className="sr-only">Open user menu</span>
        <Avatar name={username} size={'big'} />
      </button>
      {dropdownOpen && (
        <div
          id="dropdownAvatar"
          className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          style={{ right: 0, top: 40 }} // Align dropdown to the right if needed
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{username}</div>
          </div>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
            <li>
              <Link to="/blogs" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to={`/profile/${name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Profile
              </Link>
            </li>
          </ul>
          <div className="py-2">
            <Link to="/signout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              Sign out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
import { useNavigate } from 'react-router-dom';

interface BlogCardProps {
  authorName: string;
  title:string;
  content:string;
  publishedDate: string;
}
export const BlogDetails = ({ authorName, title, content, publishedDate, authorId })=>{
  const navigate = useNavigate();
  return (
    <div className="border-slate-200 p-4">
      <div id={"title"} className="text-5xl font-bold m-4 my-10">
        {title}
      </div>
      <div onClick={()=>{
        navigate(`/profile/${authorId}`)
      }} id={"authorId"} className="flex m-4 items-center my-10 hover:cursor-pointer">
        <div className="mr-4">
          <div
            className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full w-10 h-10 dark:bg-gray-600`}>
            <span className={`text-sm text-gray-600 tex-md dark:text-gray-300`}>{authorName.toUpperCase()[0]}</span>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='text-md'>{authorName}</div>
          <div className='text-sm font-extralight'>{publishedDate}</div>
        </div>
      </div>

      {/*TODO: Add an image here*/}
      {/*<img src="/Users/ybhamare/Library/CloudStorage/OneDrive-PTC/Personal projects/Medium-Blog/frontend/MV5BMjMyOTM4MDMxNV5BMl5BanBnXkFtZTcwNjIyNzExOA@@._V1_.jpg"*/}
      {/*     width="450" height="300" alt="Spiderman Image" itemProp="image" />*/}

      <div className='font-serif text-xl font-light m-4 my-10'>
        {content}
      </div>
    </div>
  )
}
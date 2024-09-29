import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import { Link, useParams } from 'react-router-dom';
import { BlogCardById } from '../components/BlogCardById';
import { useBlogsByUser } from '../hooks/UseBlog-hook';

export const BlogsById = () => {
  const params = useParams();
  const { loading, blogs, authFailed } = useBlogsByUser({ id: params.authorId });
  if (loading) {
    return <div>Loading...</div>;
  }

  if (authFailed) {
    return (
      <div className="flex justify-center mt-8">
        <div className="text-center text-3xl font-bold">
          <h2>Authentication Failed</h2>
          <p>Please <a href="/signin" className="text-blue-500 underline">log in</a> again.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AppBar />
      <div className="flex flex-col items-center m-4 text-3xl">
        More Blogs By {blogs[0].user.name}
      </div>
      <div className="flex flex-col items-center">
        {blogs.map((blog: any) => (
          <Link className="max-w-2xl w-full my-4" key={blog.id} to={`/blog/${blog.id}`}>
            <BlogCardById
              title={blog.title}
              content={blog.content}
              authorName={blog.user.name}
              publishedDate={blog.publishedDate.toString().split("T")[0]}
            />
          </Link>
        ))}
      </div>


    </div>
  );
};

import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import { useBlogs } from "../hooks/UseBlogs-hook";
import { Link } from 'react-router-dom';

export const Blogs = () => {
    const { loading, blogs, authFailed } = useBlogs();
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
        <div className="flex flex-col items-center">
          {blogs.map((blog: any) => (
            <Link className="max-w-2xl w-full my-4" key={blog.id} to={`/blog/${blog.id}`}>
              <BlogCard
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

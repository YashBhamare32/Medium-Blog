import { Link, useParams } from 'react-router-dom';
import { AppBar } from '../components/AppBar';
import { useBlogById, useBlogByUser } from '../hooks/UseBlog-hook';
import { BlogCard } from '../components/BlogCard';
import { BlogDetails } from '../components/BlogDetails';
import { useBlogs } from '../hooks/UseBlogs-hook';

export function Blog() {
  const params = useParams();
  const id = params.blogId;
  const { loading, blog, authFailed } = useBlogById({ id });

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
  // Ensure blog is defined before rendering
  if (!blog) {
    return <div>No blog found.</div>; // Handle case where blog is not found
  }
  return (
    <div>
      <AppBar />
      <div className="flex flex-col items-center border-b">
        <div className="max-w-2xl w-full my-4" key={blog.id}>
          <BlogDetails
            title={blog.title}
            content={blog.content}
            authorName={blog.user.name}
            publishedDate={blog.publishedDate.toString().split("T")[0]}
            authorId={blog.authorId}
          />
        </div>
      </div>

    </div>
  )
}
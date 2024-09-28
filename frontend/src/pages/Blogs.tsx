import React from "react";
import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import { useBlogs } from "../hooks";

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
            <div className="flex justify-center">
                <div className="max-w-xl">
                    {blogs.map((blog: any) => (
                        <BlogCard 
                            key={blog.id}
                            title={blog.title}
                            content={blog.content}
                            authorName={blog.user.name}
                            publishedDate={blog.publishedDate.split("T")[0]} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

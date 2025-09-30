import React, { useState, useEffect } from "react";
import { supabase, Blog } from "../../lib/supabase";
import { useAdmin } from "../../context/admin.context";
import { useDarkMode } from "../../context/darkmode.context";

const BlogSection: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin } = useAdmin();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className={`container mx-auto px-4 py-8 ${
        darkMode ? "bg-slate-800 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-3xl font-bold text-center mb-8">Latest Blog Posts</h2>

      <div className="max-w-6xl mx-auto">
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No blog posts available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className={`rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
                  darkMode ? "bg-slate-700" : "bg-white border border-gray-200"
                }`}
              >
                {blog.featured_image && (
                  <img
                    src={blog.featured_image}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <time dateTime={blog.created_at}>
                      {formatDate(blog.created_at)}
                    </time>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {isAdmin && (
        <div className="text-center mt-8">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Add New Blog Post
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogSection;

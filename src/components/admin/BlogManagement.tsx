import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useDarkMode } from "../../context/darkmode.context";

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  published_at?: string;
  status: "draft" | "published";
  tags: string[];
  featured_image?: string;
  read_time: number;
  views: number;
  order_index: number;
  created_at: string;
  updated_at: string;
}

interface BlogManagementProps {
  onClose: () => void;
}

const BlogManagement: React.FC<BlogManagementProps> = ({ onClose }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    author: "Abiy Bihonegn",
    published_at: "",
    status: "draft" as "draft" | "published",
    tags: "",
    featured_image: "",
    read_time: 5,
    order_index: 0,
  });
  const { darkMode } = useDarkMode();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const blogData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        slug: formData.slug || generateSlug(formData.title),
        published_at:
          formData.status === "published" && formData.published_at
            ? formData.published_at
            : null,
      };

      if (editingBlog) {
        // Update existing blog
        const { error } = await supabase
          .from("blogs")
          .update(blogData)
          .eq("id", editingBlog.id);

        if (error) throw error;
      } else {
        // Create new blog
        const { error } = await supabase.from("blogs").insert([blogData]);

        if (error) throw error;
      }

      await fetchBlogs();
      setIsModalOpen(false);
      setEditingBlog(null);
      resetForm();
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      excerpt: blog.excerpt,
      author: blog.author,
      published_at: blog.published_at || "",
      status: blog.status,
      tags: blog.tags.join(", "),
      featured_image: blog.featured_image || "",
      read_time: blog.read_time,
      order_index: blog.order_index,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const { error } = await supabase.from("blogs").delete().eq("id", id);

      if (error) throw error;
      await fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleToggleStatus = async (blog: Blog) => {
    try {
      const newStatus = blog.status === "published" ? "draft" : "published";
      const publishedAt =
        newStatus === "published" && !blog.published_at
          ? new Date().toISOString()
          : blog.published_at;

      const { error } = await supabase
        .from("blogs")
        .update({
          status: newStatus,
          published_at: publishedAt,
        })
        .eq("id", blog.id);

      if (error) throw error;
      await fetchBlogs();
    } catch (error) {
      console.error("Error updating blog status:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      author: "Abiy Bihonegn",
      published_at: "",
      status: "draft",
      tags: "",
      featured_image: "",
      read_time: 5,
      order_index: 0,
    });
  };

  const openCreateModal = () => {
    setEditingBlog(null);
    resetForm();
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div
        className={`flex justify-center items-center min-h-96 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-current"></div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4`}
    >
      <div
        className={`w-full max-w-7xl max-h-[90vh] overflow-hidden rounded-3xl border-2 ${
          darkMode
            ? "bg-black/90 border-white/20"
            : "bg-white/90 border-black/20"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 border-b-2 ${
            darkMode ? "border-white/20" : "border-black/20"
          }`}
        >
          <h2
            className={`text-3xl font-bold tracking-wider ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Blog Management
          </h2>
          <div className="flex space-x-4">
            <button
              onClick={openCreateModal}
              className={`px-6 py-3 rounded-2xl font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 ${
                darkMode
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              + Add Blog Post
            </button>
            <button
              onClick={onClose}
              className={`px-6 py-3 rounded-2xl font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 border-2 ${
                darkMode
                  ? "border-white text-white hover:bg-white hover:text-black"
                  : "border-black text-black hover:bg-black hover:text-white"
              }`}
            >
              Close
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className={`rounded-2xl border-2 p-6 transition-all duration-300 hover:scale-[1.01] ${
                  darkMode
                    ? "bg-black/50 border-white/20 hover:border-white/40"
                    : "bg-white/50 border-black/20 hover:border-black/40"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3
                        className={`text-lg font-bold tracking-wider ${
                          darkMode ? "text-white" : "text-black"
                        }`}
                      >
                        {blog.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold tracking-widest uppercase ${
                          blog.status === "published"
                            ? darkMode
                              ? "bg-green-600 text-white"
                              : "bg-green-500 text-white"
                            : darkMode
                            ? "bg-yellow-600 text-white"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </div>
                    <div
                      className={`text-sm mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {blog.excerpt}
                    </div>
                    <div
                      className={`text-xs ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {blog.read_time} min read • {blog.views} views •{" "}
                      {blog.author}
                    </div>
                    {blog.published_at && (
                      <div
                        className={`text-xs ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Published:{" "}
                        {new Date(blog.published_at).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                {blog.tags.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            darkMode
                              ? "bg-white/10 text-white border border-white/20"
                              : "bg-black/10 text-black border border-black/20"
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs tracking-widest uppercase ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Order: {blog.order_index}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleToggleStatus(blog)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                        blog.status === "published"
                          ? darkMode
                            ? "bg-yellow-600 text-white hover:bg-yellow-500"
                            : "bg-yellow-500 text-white hover:bg-yellow-600"
                          : darkMode
                          ? "bg-green-600 text-white hover:bg-green-500"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {blog.status === "published" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => handleEdit(blog)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                        darkMode
                          ? "bg-blue-600 text-white hover:bg-blue-500"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                        darkMode
                          ? "bg-red-600 text-white hover:bg-red-500"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {blogs.length === 0 && (
            <div
              className={`text-center py-12 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <p className="text-lg tracking-wider uppercase">
                No blog posts found
              </p>
              <p className="text-sm mt-2">
                Click "Add Blog Post" to get started
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-60 p-4`}
        >
          <div
            className={`w-full max-w-4xl rounded-3xl border-2 ${
              darkMode
                ? "bg-black/90 border-white/20"
                : "bg-white/90 border-black/20"
            }`}
          >
            <div
              className={`p-6 border-b-2 ${
                darkMode ? "border-white/20" : "border-black/20"
              }`}
            >
              <h3
                className={`text-2xl font-bold tracking-wider ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                {editingBlog ? "Edit Blog Post" : "Add New Blog Post"}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                      darkMode
                        ? "bg-black/50 border-white/20 text-white placeholder-gray-400 focus:border-white"
                        : "bg-white/50 border-black/20 text-black placeholder-gray-500 focus:border-black"
                    }`}
                    placeholder="Blog Post Title"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Slug (auto-generated if empty)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                      darkMode
                        ? "bg-black/50 border-white/20 text-white placeholder-gray-400 focus:border-white"
                        : "bg-white/50 border-black/20 text-black placeholder-gray-500 focus:border-black"
                    }`}
                    placeholder="blog-post-slug"
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  Excerpt
                </label>
                <textarea
                  rows={3}
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none resize-none ${
                    darkMode
                      ? "bg-black/50 border-white/20 text-white placeholder-gray-400 focus:border-white"
                      : "bg-white/50 border-black/20 text-black placeholder-gray-500 focus:border-black"
                  }`}
                  placeholder="Brief description of the blog post..."
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  Content (Markdown supported)
                </label>
                <textarea
                  rows={12}
                  required
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none resize-none font-mono text-sm ${
                    darkMode
                      ? "bg-black/50 border-white/20 text-white placeholder-gray-400 focus:border-white"
                      : "bg-white/50 border-black/20 text-black placeholder-gray-500 focus:border-black"
                  }`}
                  placeholder="# Blog Post Content

Write your blog post content here using Markdown syntax...

## Subheading

- List item 1
- List item 2

**Bold text** and *italic text*

```javascript
// Code blocks are supported
const example = 'Hello World';
```"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                      darkMode
                        ? "bg-black/50 border-white/20 text-white placeholder-gray-400 focus:border-white"
                        : "bg-white/50 border-black/20 text-black placeholder-gray-500 focus:border-black"
                    }`}
                    placeholder="react, javascript, tutorial"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Read Time (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.read_time}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        read_time: parseInt(e.target.value),
                      })
                    }
                    className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                      darkMode
                        ? "bg-black/50 border-white/20 text-white focus:border-white"
                        : "bg-white/50 border-black/20 text-black focus:border-black"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  Featured Image URL
                </label>
                <input
                  type="url"
                  value={formData.featured_image}
                  onChange={(e) =>
                    setFormData({ ...formData, featured_image: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                    darkMode
                      ? "bg-black/50 border-white/20 text-white placeholder-gray-400 focus:border-white"
                      : "bg-white/50 border-black/20 text-black placeholder-gray-500 focus:border-black"
                  }`}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as "draft" | "published",
                      })
                    }
                    className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                      darkMode
                        ? "bg-black/50 border-white/20 text-white focus:border-white"
                        : "bg-white/50 border-black/20 text-black focus:border-black"
                    }`}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Publish Date
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.published_at}
                    onChange={(e) =>
                      setFormData({ ...formData, published_at: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                      darkMode
                        ? "bg-black/50 border-white/20 text-white focus:border-white"
                        : "bg-white/50 border-black/20 text-black focus:border-black"
                    }`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Order Index
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.order_index}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order_index: parseInt(e.target.value),
                      })
                    }
                    className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                      darkMode
                        ? "bg-black/50 border-white/20 text-white focus:border-white"
                        : "bg-white/50 border-black/20 text-black focus:border-black"
                    }`}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={`px-6 py-3 rounded-2xl font-bold tracking-wider uppercase transition-all duration-300 border-2 ${
                    darkMode
                      ? "border-white text-white hover:bg-white hover:text-black"
                      : "border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-6 py-3 rounded-2xl font-bold tracking-wider uppercase transition-all duration-300 ${
                    darkMode
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  {editingBlog ? "Update Blog Post" : "Create Blog Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;

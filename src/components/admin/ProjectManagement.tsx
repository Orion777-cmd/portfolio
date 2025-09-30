import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useDarkMode } from "../../context/darkmode.context";
import { Project } from "../../lib/supabase";

interface ProjectManagementProps {
  onClose: () => void;
}

const ProjectManagement: React.FC<ProjectManagementProps> = ({ onClose }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    github_url: "",
    live_url: "",
    image_url: "",
    featured: false,
    category: "web",
    order_index: 0,
  });
  const { darkMode } = useDarkMode();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        // Update existing project
        const { error } = await supabase
          .from("projects")
          .update(formData)
          .eq("id", editingProject.id);

        if (error) throw error;
      } else {
        // Create new project
        const { error } = await supabase.from("projects").insert([formData]);

        if (error) throw error;
      }

      await fetchProjects();
      setIsModalOpen(false);
      setEditingProject(null);
      resetForm();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(", "),
      github_url: project.github_url || "",
      live_url: project.live_url || "",
      image_url: project.image_url || "",
      featured: project.featured,
      category: project.category,
      order_index: project.order_index,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);

      if (error) throw error;
      await fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      technologies: "",
      github_url: "",
      live_url: "",
      image_url: "",
      featured: false,
      category: "web",
      order_index: 0,
    });
  };

  const openCreateModal = () => {
    setEditingProject(null);
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
        className={`w-full max-w-7xl max-h-[95vh] overflow-hidden rounded-2xl sm:rounded-3xl border-2 ${
          darkMode
            ? "bg-black/90 border-white/20"
            : "bg-white/90 border-black/20"
        }`}
      >
        {/* Header */}
        <div
          className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b-2 gap-4 ${
            darkMode ? "border-white/20" : "border-black/20"
          }`}
        >
          <h2
            className={`text-2xl sm:text-3xl font-bold tracking-wider ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Project Management
          </h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <button
              onClick={openCreateModal}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 text-sm sm:text-base ${
                darkMode
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              + Add Project
            </button>
            <button
              onClick={onClose}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 border-2 text-sm sm:text-base ${
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
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-140px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`rounded-xl sm:rounded-2xl border-2 p-4 sm:p-6 transition-all duration-300 hover:scale-105 ${
                  darkMode
                    ? "bg-black/50 border-white/20 hover:border-white/40"
                    : "bg-white/50 border-black/20 hover:border-black/40"
                }`}
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <h3
                    className={`text-lg sm:text-xl font-bold tracking-wider ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase ${
                        darkMode ? "bg-white text-black" : "bg-black text-white"
                      }`}
                    >
                      Featured
                    </span>
                  )}
                </div>

                <p
                  className={`text-sm mb-3 sm:mb-4 tracking-wide line-clamp-3 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {project.description}
                </p>

                <div className={`flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4`}>
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        darkMode
                          ? "bg-white/10 text-white border border-white/20"
                          : "bg-black/10 text-black border border-black/20"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <span
                    className={`text-xs tracking-widest uppercase ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Order: {project.order_index}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                        darkMode
                          ? "bg-blue-600 text-white hover:bg-blue-500"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
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

          {projects.length === 0 && (
            <div
              className={`text-center py-12 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <p className="text-lg tracking-wider uppercase">
                No projects found
              </p>
              <p className="text-sm mt-2">Click "Add Project" to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-60 p-2 sm:p-4`}
        >
          <div
            className={`w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-2xl sm:rounded-3xl border-2 ${
              darkMode
                ? "bg-black/90 border-white/20"
                : "bg-white/90 border-black/20"
            }`}
          >
            <div
              className={`p-4 sm:p-6 border-b-2 ${
                darkMode ? "border-white/20" : "border-black/20"
              }`}
            >
              <h3
                className={`text-xl sm:text-2xl font-bold tracking-wider ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                {editingProject ? "Edit Project" : "Add New Project"}
              </h3>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-4 sm:p-6 space-y-4 sm:space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                    placeholder="Project Title"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                      darkMode
                        ? "bg-black/50 border-white/20 text-white focus:border-white"
                        : "bg-white/50 border-black/20 text-black focus:border-black"
                    }`}
                  >
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile Development</option>
                    <option value="ai">AI/ML</option>
                    <option value="data">Data Science</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none resize-none ${
                    darkMode
                      ? "bg-black/50 border-white/20 text-white placeholder-gray-400 focus:border-white"
                      : "bg-white/50 border-black/20 text-black placeholder-gray-500 focus:border-black"
                  }`}
                  placeholder="Project description..."
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  required
                  value={formData.technologies}
                  onChange={(e) =>
                    setFormData({ ...formData, technologies: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                    darkMode
                      ? "bg-black/50 border-white/20 text-white placeholder-gray-400 focus:border-white"
                      : "bg-white/50 border-black/20 text-black placeholder-gray-500 focus:border-black"
                  }`}
                  placeholder="React, TypeScript, Node.js"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.github_url}
                    onChange={(e) =>
                      setFormData({ ...formData, github_url: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                      darkMode
                        ? "bg-black/50 border-white/20 text-white placeholder-gray-400 focus:border-white"
                        : "bg-white/50 border-black/20 text-black placeholder-gray-500 focus:border-black"
                    }`}
                    placeholder="https://github.com/..."
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Live URL
                  </label>
                  <input
                    type="url"
                    value={formData.live_url}
                    onChange={(e) =>
                      setFormData({ ...formData, live_url: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                      darkMode
                        ? "bg-black/50 border-white/20 text-white placeholder-gray-400 focus:border-white"
                        : "bg-white/50 border-black/20 text-black placeholder-gray-500 focus:border-black"
                    }`}
                    placeholder="https://project.com"
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                    darkMode
                      ? "bg-black/50 border-white/20 text-white placeholder-gray-400 focus:border-white"
                      : "bg-white/50 border-black/20 text-black placeholder-gray-500 focus:border-black"
                  }`}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className={`w-5 h-5 rounded ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  />
                  <label
                    htmlFor="featured"
                    className={`text-sm font-bold tracking-wider uppercase ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Featured Project
                  </label>
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

              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-bold tracking-wider uppercase transition-all duration-300 border-2 text-sm sm:text-base ${
                    darkMode
                      ? "border-white text-white hover:bg-white hover:text-black"
                      : "border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-bold tracking-wider uppercase transition-all duration-300 text-sm sm:text-base ${
                    darkMode
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  {editingProject ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;

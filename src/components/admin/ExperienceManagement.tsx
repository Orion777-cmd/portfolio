import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useDarkMode } from "../../context/darkmode.context";

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  description: string;
  technologies: string[];
  achievements: string[];
  order_index: number;
  created_at: string;
  updated_at: string;
}

interface ExperienceManagementProps {
  onClose: () => void;
}

const ExperienceManagement: React.FC<ExperienceManagementProps> = ({
  onClose,
}) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null
  );
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    start_date: "",
    end_date: "",
    current: false,
    description: "",
    technologies: "",
    achievements: "",
    order_index: 0,
  });
  const { darkMode } = useDarkMode();

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      setExperiences(data || []);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const experienceData = {
        ...formData,
        technologies: formData.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
        achievements: formData.achievements
          .split(",")
          .map((ach) => ach.trim())
          .filter(Boolean),
        end_date: formData.current ? null : formData.end_date || null,
      };

      if (editingExperience) {
        // Update existing experience
        const { error } = await supabase
          .from("experiences")
          .update(experienceData)
          .eq("id", editingExperience.id);

        if (error) throw error;
      } else {
        // Create new experience
        const { error } = await supabase
          .from("experiences")
          .insert([experienceData]);

        if (error) throw error;
      }

      await fetchExperiences();
      setIsModalOpen(false);
      setEditingExperience(null);
      resetForm();
    } catch (error) {
      console.error("Error saving experience:", error);
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setFormData({
      title: experience.title,
      company: experience.company,
      location: experience.location,
      start_date: experience.start_date,
      end_date: experience.end_date || "",
      current: experience.current,
      description: experience.description,
      technologies: experience.technologies.join(", "),
      achievements: experience.achievements.join(", "),
      order_index: experience.order_index,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    try {
      const { error } = await supabase
        .from("experiences")
        .delete()
        .eq("id", id);

      if (error) throw error;
      await fetchExperiences();
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      company: "",
      location: "",
      start_date: "",
      end_date: "",
      current: false,
      description: "",
      technologies: "",
      achievements: "",
      order_index: 0,
    });
  };

  const openCreateModal = () => {
    setEditingExperience(null);
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
        className={`w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl border-2 ${
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
            Experience Management
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
              + Add Experience
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
          <div className="space-y-6">
            {experiences.map((experience) => (
              <div
                key={experience.id}
                className={`rounded-2xl border-2 p-6 transition-all duration-300 hover:scale-[1.01] ${
                  darkMode
                    ? "bg-black/50 border-white/20 hover:border-white/40"
                    : "bg-white/50 border-black/20 hover:border-black/40"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3
                        className={`text-xl font-bold tracking-wider ${
                          darkMode ? "text-white" : "text-black"
                        }`}
                      >
                        {experience.title}
                      </h3>
                      {experience.current && (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase ${
                            darkMode
                              ? "bg-green-600 text-white"
                              : "bg-green-500 text-white"
                          }`}
                        >
                          Current
                        </span>
                      )}
                    </div>
                    <div
                      className={`text-lg font-semibold mb-1 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {experience.company}
                    </div>
                    <div
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {experience.location} • {experience.start_date} -{" "}
                      {experience.current ? "Present" : experience.end_date}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(experience)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                        darkMode
                          ? "bg-blue-600 text-white hover:bg-blue-500"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(experience.id)}
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

                <p
                  className={`text-sm mb-4 tracking-wide ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {experience.description}
                </p>

                {experience.technologies.length > 0 && (
                  <div className="mb-4">
                    <h4
                      className={`text-xs font-bold tracking-widest uppercase mb-2 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, index) => (
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
                  </div>
                )}

                {experience.achievements.length > 0 && (
                  <div className="mb-4">
                    <h4
                      className={`text-xs font-bold tracking-widest uppercase mb-2 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Key Achievements
                    </h4>
                    <ul className="space-y-1">
                      {experience.achievements.map((achievement, index) => (
                        <li
                          key={index}
                          className={`text-xs ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          • {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs tracking-widest uppercase ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Order: {experience.order_index}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {experiences.length === 0 && (
            <div
              className={`text-center py-12 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <p className="text-lg tracking-wider uppercase">
                No experiences found
              </p>
              <p className="text-sm mt-2">
                Click "Add Experience" to get started
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
            className={`w-full max-w-3xl rounded-3xl border-2 ${
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
                {editingExperience ? "Edit Experience" : "Add New Experience"}
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
                    Job Title
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
                    placeholder="Senior Developer"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                      darkMode
                        ? "bg-black/50 border-white/20 text-white placeholder-gray-400 focus:border-white"
                        : "bg-white/50 border-black/20 text-black placeholder-gray-500 focus:border-black"
                    }`}
                    placeholder="Tech Company Inc."
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                    darkMode
                      ? "bg-black/50 border-white/20 text-white placeholder-gray-400 focus:border-white"
                      : "bg-white/50 border-black/20 text-black placeholder-gray-500 focus:border-black"
                  }`}
                  placeholder="San Francisco, CA"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.start_date}
                    onChange={(e) =>
                      setFormData({ ...formData, start_date: e.target.value })
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
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) =>
                      setFormData({ ...formData, end_date: e.target.value })
                    }
                    disabled={formData.current}
                    className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                      darkMode
                        ? "bg-black/50 border-white/20 text-white focus:border-white disabled:opacity-50"
                        : "bg-white/50 border-black/20 text-black focus:border-black disabled:opacity-50"
                    }`}
                  />
                </div>

                <div className="flex items-center justify-center">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="current"
                      checked={formData.current}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          current: e.target.checked,
                          end_date: e.target.checked ? "" : formData.end_date,
                        })
                      }
                      className={`w-5 h-5 rounded ${
                        darkMode ? "text-white" : "text-black"
                      }`}
                    />
                    <label
                      htmlFor="current"
                      className={`text-sm font-bold tracking-wider uppercase ${
                        darkMode ? "text-white" : "text-black"
                      }`}
                    >
                      Current Position
                    </label>
                  </div>
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
                  placeholder="Describe your role and responsibilities..."
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
                  value={formData.technologies}
                  onChange={(e) =>
                    setFormData({ ...formData, technologies: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                    darkMode
                      ? "bg-black/50 border-white/20 text-white placeholder-gray-400 focus:border-white"
                      : "bg-white/50 border-black/20 text-black placeholder-gray-500 focus:border-black"
                  }`}
                  placeholder="React, TypeScript, Node.js, AWS"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  Key Achievements (comma separated)
                </label>
                <textarea
                  rows={3}
                  value={formData.achievements}
                  onChange={(e) =>
                    setFormData({ ...formData, achievements: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none resize-none ${
                    darkMode
                      ? "bg-black/50 border-white/20 text-white placeholder-gray-400 focus:border-white"
                      : "bg-white/50 border-black/20 text-black placeholder-gray-500 focus:border-black"
                  }`}
                  placeholder="Led team of 5 developers, Increased performance by 40%, Implemented CI/CD pipeline"
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
                  {editingExperience
                    ? "Update Experience"
                    : "Create Experience"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceManagement;

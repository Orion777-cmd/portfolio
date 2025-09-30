import React, { useState, useEffect } from "react";
import { supabase, Experience } from "../../lib/supabase";
import { useAdmin } from "../../context/admin.context";
import { useDarkMode } from "../../context/darkmode.context";

const ExperienceSection: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin } = useAdmin();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("start_date", { ascending: false });

      if (error) throw error;
      setExperiences(data || []);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
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
      <h2 className="text-3xl font-bold text-center mb-8">
        Professional Experience
      </h2>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={`relative pl-8 pb-8 ${
                index !== experiences.length - 1
                  ? "border-l-2 border-blue-500"
                  : ""
              }`}
            >
              <div
                className={`absolute -left-3 top-0 w-6 h-6 rounded-full ${
                  darkMode ? "bg-blue-400" : "bg-blue-500"
                }`}
              ></div>

              <div
                className={`p-6 rounded-lg shadow-lg ${
                  darkMode ? "bg-slate-700" : "bg-gray-50"
                }`}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{experience.position}</h3>
                    <p className="text-lg font-semibold text-blue-600">
                      {experience.company}
                    </p>
                    <p className="text-sm text-gray-600">
                      {experience.location}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-gray-600 mt-2 md:mt-0">
                    {formatDate(experience.start_date)} -{" "}
                    {experience.current
                      ? "Present"
                      : formatDate(experience.end_date || "")}
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{experience.description}</p>

                {experience.achievements.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Key Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {experience.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-gray-700">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isAdmin && (
        <div className="text-center mt-8">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Add Experience
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperienceSection;

import React from "react";

const tags = [
  { name: "User Experience", highlight: true },
  { name: "Artificial Intelligence" },
  { name: "Design" },
  { name: "Technology" },
  { name: "Programming" },
  { name: "Business" },
  { name: "Marketing" },
  { name: "Productivity" },
];

const PopularTags = () => {
  return (
    <section className="px-6 md:px-12 lg:px-24 mb-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Popular Tags</h2>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag, index) => (
            <a
              key={index}
              href="#"
              className={`bg-white px-4 py-2 rounded-full transition-all duration-300 shadow-sm border border-gray-100 font-medium hover:-translate-y-1 hover:shadow-md ${
                tag.highlight ? "text-indigo-600" : "text-gray-700"
              }`}
            >
              {tag.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularTags;

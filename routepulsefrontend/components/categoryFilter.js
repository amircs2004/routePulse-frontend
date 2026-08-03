

"use client";

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
      {/* "All" button to reset filter */}
      <button
        onClick={() => onSelectCategory("all")}
        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
          selectedCategory === "all"
            ? "bg-indigo-600 text-white shadow-sm"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        All Items
      </button>

      {categories.map((cat) => {
        // Handle categories whether they are strings or objects (e.g., DummyJSON format)
        const catSlug = typeof cat === "string" ? cat : cat.slug;
        const catName = typeof cat === "string" ? cat : cat.name;

        return (
          <button
            key={catSlug}
            onClick={() => onSelectCategory(catSlug)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold capitalize whitespace-nowrap transition-all ${
              selectedCategory === catSlug
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {catName}
          </button>
        );
      })}
    </div>
  );
}
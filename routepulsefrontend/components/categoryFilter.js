

"use client";

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
  <div className="flex items-center gap-2 overflow-x-auto pb-2.5 mb-6 scrollbar-none scroll-smooth">
  {/* "All" button to reset filter */}
  <button
    onClick={() => onSelectCategory("all")}
    className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 active:scale-95 shrink-0 ${
      selectedCategory === "all"
        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20 ring-2 ring-indigo-600/20"
        : "bg-slate-100/90 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/60"
    }`}
  >
    All Items
  </button>

  {categories.map((cat) => {
    // Handle categories whether they are strings or objects (e.g., DummyJSON format)
    const catSlug = typeof cat === "string" ? cat : cat.slug;
    const catName = typeof cat === "string" ? cat : cat.name;

    const isSelected = selectedCategory === catSlug;

    return (
      <button
        key={catSlug}
        onClick={() => onSelectCategory(catSlug)}
        className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold capitalize whitespace-nowrap transition-all duration-200 active:scale-95 shrink-0 ${
          isSelected
            ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20 ring-2 ring-indigo-600/20"
            : "bg-slate-100/90 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/60"
        }`}
      >
        {catName}
      </button>
    );
  })}
</div>
  );
}
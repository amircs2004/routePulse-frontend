"use client";

export default function CategoryFilter({ categories = [], selectedCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2.5 mb-6 scrollbar-none scroll-smooth">
      {/* "All" button to reset filter */}
      <button
        type="button"
        onClick={() => onSelectCategory("all")}
        className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 active:scale-95 shrink-0 ${
          selectedCategory === "all"
            ? "bg-[#65795C] text-white shadow-sm ring-2 ring-[#65795C]/30"
            : "bg-stone-100/80 text-slate-600 hover:bg-emerald-50 hover:text-emerald-900 border border-stone-200/70"
        }`}
      >
        All Items
      </button>

      {Array.isArray(categories) && categories.map((cat) => {
        // Handle categories whether they are strings or objects (e.g., DummyJSON format)
        const catSlug = typeof cat === "string" ? cat : cat?.slug;
        const catName = typeof cat === "string" ? cat : cat?.name;

        if (!catSlug) return null;

        const isSelected = selectedCategory === catSlug;

        return (
          <button
            key={catSlug}
            type="button"
            onClick={() => onSelectCategory(catSlug)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold capitalize whitespace-nowrap transition-all duration-200 active:scale-95 shrink-0 ${
              isSelected
                ? "bg-[#65795C] text-white shadow-sm ring-2 ring-[#65795C]/30"
                : "bg-stone-100/80 text-slate-600 hover:bg-emerald-50 hover:text-emerald-900 border border-stone-200/70"
            }`}
          >
            {catName}
          </button>
        );
      })}
    </div>
  );
}
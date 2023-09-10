import { useState } from "react";
import CS_Card from "./SubComps/CS_Card";

const CategorySlider = ({ categoryItems, id, activeCategoryCallback }) => {
  const [activeCategory, setActiveCategory] = useState(
    Object.keys(categoryItems[0])
  );

  const handleCategoryChange = (category) => {
    console.log("Changed to " + category);
    setActiveCategory(category);
    activeCategoryCallback(category);
  };

  return (
    <section className="flex flex-col pb-2 w-full bg-white rounded-b-2xl shadow-lg">
      {/* <div className="flex justify-between px-4 pb-4 items-center w-full">
        <h1 className="font-medium text-sm">Categories</h1>
        <button className="pl-4 py-2 text-xs underline text-red-500">
          Show All
        </button>
      </div> */}

      {/* Slider Div */}
      <div className="relative flex whitespace-nowrap pr-4 pb-4 overflow-x-auto scrollbar-hide scroll-smooth">
        {categoryItems.map((category, index) => (
          <CS_Card
            catName={Object.keys(category)}
            catID={id + "_category_" + index}
            catActive={activeCategory}
            onClickCallback={handleCategoryChange}
          />
        ))}
      </div>
      <div className="absolute left-0 w-4 h-11 bg-gradient-to-r from-white from-20%" />
      <div className="absolute m-auto right-0 w-4 h-11 bg-gradient-to-l from-white from-20%" />
    </section>
  );
};

export default CategorySlider;

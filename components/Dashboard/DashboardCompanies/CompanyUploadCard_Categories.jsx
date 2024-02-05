import { ListBulletIcon, PlusIcon } from "@heroicons/react/24/solid";
import CompanyCategoryCollection from "./CompanyCategoryCollection/CompanyCategoryCollection";
import { useState } from "react";

const CompanyUploadCard_Categories = ({
  fieldsData = null,
  onFieldChangeCallback,
}) => {
  const [fieldsDataEditted, setFieldsDataEditted] = useState(
    fieldsData.categories
  );

  function HandleCatCollectionEdit(catCollectionData, catCollectionIndex) {
    console.log(
      "Handle Category Collection Edit | Data:" +
        JSON.stringify(catCollectionData) +
        " | Index:" +
        catCollectionIndex
    );

    let catCollectionEditted = fieldsDataEditted;
    catCollectionEditted[catCollectionIndex] = catCollectionData;
    setFieldsDataEditted(catCollectionEditted);
    console.log(JSON.stringify(catCollectionEditted));

    let target = { name: "", value: "" };
    let e = { target };

    e.target.name = "categories";
    e.target.value = catCollectionEditted;

    onFieldChangeCallback(e);
  }

  return (
    <section className="flex flex-col items-center justify-between w-full rounded-2xl shadow-md bg-white overflow-clip">
      <div className="flex w-full items-center gap-4 px-4 py-2 text-xl font-bold text-white bg-gradient-to-br from-tif-lavender to-tif-pink">
        <ListBulletIcon className="h-6 w-6 lg:h-7 lg:w-7" />
        <h1>Company Categories</h1>
      </div>

      <div className="flex flex-col p-2 lg:p-4 gap-2 lg:gap-4 w-full">
        <button className="flex items-center justify-center p-2 gap-4 w-full font-semibold text-md text-white bg-green-500 hover:bg-green-600 hover:shadow-md rounded-lg transition-all">
          <PlusIcon className="h-5 w-5" />
          <h1>Add Category</h1>
        </button>

        <div className="flex flex-col items-center justify-between h-auto gap-4 w-full">
          {fieldsData.categories.map((category, index) => (
            <CompanyCategoryCollection
              key={Object.keys(category) + index}
              showLogs={true}
              categoryInfo={category}
              categoryIndex={index}
              editCatCollectionCallback={HandleCatCollectionEdit}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyUploadCard_Categories;

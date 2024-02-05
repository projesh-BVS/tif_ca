import { useState } from "react";
import CompanyCategoryCollectionHeader from "./CompanyCategoryCollectionHeader";
import CompanySubCatCardList from "./CompanySubCatCardList";

const CompanyCategoryCollection = ({
  showLogs = false,
  categoryInfo,
  categoryIndex,
  editCatCollectionCallback,
}) => {
  let catNameEditted = Object.keys(categoryInfo);

  function HandleCategoryEdit(categoryName) {
    Log(
      "Handle Category Edit | " + categoryName + " | [" + categoryIndex + "]",
      showLogs
    );
    Log(
      "Handle Category Edit => categoryInfo | " + JSON.stringify(categoryInfo),
      showLogs
    );
    Log("CAT INFO" + JSON.stringify(categoryInfo), showLogs);
    let edittedCatObj = {};
    edittedCatObj[categoryName] = Object.values(categoryInfo)[0];
    Log(JSON.stringify(edittedCatObj), showLogs);
    catNameEditted = categoryName;
    editCatCollectionCallback(edittedCatObj, categoryIndex);
  }

  function HandleSubCategoryEdit(subCatList) {
    Log("Handle Sub Category Edit | " + subCatList, showLogs);
    HandleCategoryEdit(catNameEditted);
  }

  return (
    <section className="flex flex-col shrink-0 items-center w-full bg-white border-2 border-tif-blue rounded-lg overflow-clip transition-all">
      <CompanyCategoryCollectionHeader
        showLogs={true}
        categoryName={Object.keys(categoryInfo)}
        categoryIndex={categoryIndex}
        editCategoryCallback={HandleCategoryEdit}
        deleteCategoryCallback={null}
      />
      <div className="flex flex-col items-center justify-center w-full">
        <CompanySubCatCardList
          showLogs={true}
          listItems={Object.values(categoryInfo)[0]}
          editSubCatCallback={HandleSubCategoryEdit}
          deleteSubCatCallback={null}
        />
      </div>
    </section>
  );
};

export default CompanyCategoryCollection;

function Log(logMsg, showLogs = false) {
  if (showLogs) console.log(logMsg);
}
//Object.keys(categoryInfo[0]);
//Object.values(categoryInfo[0])[0][1];

//JSON.stringify(categoryInfo);
//categoryInfo && Object.keys(categoryInfo);
//categoryInfo && Object.values(categoryInfo)[0][0];

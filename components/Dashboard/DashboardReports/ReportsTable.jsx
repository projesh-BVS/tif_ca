import ReportsTableContent from "./SubComps/ReportsTableContent";
import ReportsTableHeader from "./SubComps/ReportsTableHeader";

const ReportsTable = ({ companyInfo }) => {
  return (
    <section className="flex shrink-0 flex-col items-center justify-center w-full rounded-xl shadow-md bg-white overflow-clip">
      <ReportsTableHeader companyInfo={companyInfo} />
      <ReportsTableContent companyID={companyInfo.companyID} />
      {/*<div className="flex p-2 lg:p-4 gap-2 w-full">Content 2</div>*/}
    </section>
  );
};

export default ReportsTable;

import LoadingIndicator from "@/components/Common/LoadingIndicator";
import useAnalytics from "@/hooks/useAnalytics";
import GenerateReportsTableData from "@/libs/Report Libs/GenerateReportsTableData";
import { DownloadCSV } from "@/libs/Report Libs/ReportExportLibs";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";

const columns = [
  { name: "Product ID", selector: (row) => row.productID, sortable: true },
  { name: "Product SKU", selector: (row) => row.productSKU, sortable: true },
  { name: "Views 360", selector: (row) => row.views360, sortable: true },
  { name: "Duration 360", selector: (row) => row.duration360, sortable: true },
  { name: "Loadtime 360", selector: (row) => row.Loadtime360, sortable: true },
  { name: "Views AR", selector: (row) => row.ARviews, sortable: true },
  { name: "Duration AR", selector: (row) => row.durationAR, sortable: true },
  { name: "Loadtime AR", selector: (row) => row.ARloadtime, sortable: true },
  {
    name: "Variant Change Clicks",
    selector: (row) => row.clickToColorChange,
    sortable: true,
  },
];

const Export = ({ onExport }) => (
  <button
    className="flex items-center justify-center p-2 gap-2 w-full md:w-fit rounded-lg font-semibold text-white text-sm bg-tif-blue hover:bg-tif-lavender transition-all"
    onClick={(e) => onExport(e.target.value)}
  >
    <ArrowDownTrayIcon className="h-5 w-5" />
    <h1>Export Report</h1>
  </button>
);

const ReportsTableContent = ({ companyID }) => {
  const { analytics, isAnalyticsLoading, isAnalyticsError } =
    useAnalytics(companyID);
  const [analyticsData, setAnalyticsData] = useState(null);
  //console.log(companyID);
  //console.log(analytics);

  useEffect(() => {
    if (!isAnalyticsLoading && !isAnalyticsError) {
      setAnalyticsData(GenerateReportsTableData(analytics.data));
      console.log("Analytics Table Data - " + analyticsData);
    }
  }, [isAnalyticsLoading]); // We pass an empty dependency array so this runs once on mount.

  const actionsMemo = useMemo(
    () => <Export onExport={() => DownloadCSV(analyticsData)} />,
    [analyticsData]
  );

  return (
    <section className="flex items-center justify-center p-2 gap-2 w-full">
      {isAnalyticsLoading && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500">
          <LoadingIndicator />
          <span className="font-semibold lg:text-xl">Loading Reports</span>
          <span className="font-light text-xs lg:text-sm">Please wait</span>
        </section>
      )}

      {analytics && analytics.data.length == 0 && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {isAnalyticsError && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {analytics &&
        analytics.data.length > 0 &&
        !isAnalyticsError &&
        analyticsData && (
          <section className="flex flex-col w-full items-center justify-center overflow-auto">
            <DataTable
              columns={columns}
              data={analyticsData}
              actions={actionsMemo}
              fixedHeader
              pagination
            ></DataTable>
          </section>
        )}
    </section>
  );
};

export default ReportsTableContent;

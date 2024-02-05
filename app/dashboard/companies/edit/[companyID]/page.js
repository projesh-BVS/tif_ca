"use client";
import LoadingIndicator from "@/components/Common/LoadingIndicator";
import DashPageHeader from "@/components/Dashboard/DashPageHeader";
import CompanyUploadCard_About from "@/components/Dashboard/DashboardCompanies/CompanyUploadCard_About";
import CompanyUploadCard_Categories from "@/components/Dashboard/DashboardCompanies/CompanyUploadCard_Categories";
import useCompany from "@/hooks/useCompany";
import { GetCompanyChangeMsg_Update } from "@/libs/Company Libs/CompanyChangeMsgs";
import {
  CloudArrowUpIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";

const EditCompany = ({ params }) => {
  const { company, isCompanyLoading, isCompanyError } = useCompany(
    params.companyID
  );

  const [isUploadingData, setIsUploadingData] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [showStatusNotification, setShowStatusNotification] = useState(false);
  const [statusNotificationContent, setStatusNotificationContent] =
    useState(null);
  const [fields, setFields] = useState({
    companyID: "",
    companyLogo: "",
    companyName: "",
    companyAddress: "",
    categories: "",
  });

  useEffect(() => {
    if (company) {
      console.log(
        "Setting Company Data: " + JSON.stringify(company.company[0])
      );
      SetCompanyData(company.company[0]);
    }
  }, [company]);

  useEffect(() => {
    setIsFormFilled(isFormValid());
  }, [fields]);

  function SetCompanyData(company) {
    setFields(JSON.parse(JSON.stringify(company)));
  }

  const isFormValid = () => {
    return Object.values(fields).every((value) => value || value === 0);
  };

  const HandleFieldValueChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const HandleFileValueChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const HandleSubmit_Edit = async (event) => {
    console.log(
      "Initiating submitting company edit | " + JSON.stringify(fields)
    );

    event.preventDefault();
    if (isFormValid()) {
      setIsUploadingData(true);

      try {
        const response = await axios.patch(
          "https://0zwhtezm4f.execute-api.ap-south-1.amazonaws.com/TryItFirst/company",
          fields
        );

        if (response.status === 200) {
          console.log(
            "Company Update Successful | Response: " + JSON.stringify(response)
          );
          setStatusNotificationContent(GetCompanyChangeMsg_Update(true));
        } else {
          console.log(
            "Company Update Failed | Response: " + JSON.stringify(response)
          );
          setStatusNotificationContent(GetCompanyChangeMsg_Update(false));
        }
      } catch (err) {
        console.log("Company Update Failed | Error: " + JSON.stringify(err));
        setStatusNotificationContent(GetCompanyChangeMsg_Update(false));
      }
      setIsUploadingData(false);
      setShowStatusNotification(true);
    }
  };

  return (
    <main className="flex flex-col gap-6 items-center w-full h-full overflow-auto bg-tif-grey">
      <DashPageHeader
        icon={<PencilSquareIcon className="h-8 w-8" />}
        text={"Editing Company -" + params.companyID}
        isLoading={isCompanyLoading}
        showBackBtn={false}
      />

      {isCompanyLoading && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500">
          <span className="font-semibold lg:text-xl">Preparing Form</span>
          <span className="font-light text-xs lg:text-sm">Please wait</span>
        </section>
      )}

      {company && company.company.length == 0 && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {isCompanyError && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {company &&
        company.company.length > 0 &&
        !isCompanyError &&
        fields.companyID != "" && (
          <form className="flex flex-col gap-6 -mt-6 items-center w-full h-full overflow-auto">
            <section className="flex px-6 gap-4 w-full items-center justify-center">
              <CompanyUploadCard_About
                fieldsData={fields}
                onFieldChangeCallback={HandleFieldValueChange}
                onFileChangeCallback={HandleFileValueChange}
              />
            </section>

            {/*<section className="flex px-6 gap-4 w-full items-center justify-center">
              <CompanyUploadCard_Categories
                fieldsData={fields}
                onFieldChangeCallback={HandleFieldValueChange}
              />
            </section>*/}

            <section className="flex px-6 pb-6 gap-4 w-full items-center justify-center">
              <button
                disabled={isUploadingData || isFormFilled === false}
                onClick={HandleSubmit_Edit}
                type="Submit"
                className="flex p-4 gap-4 items-center justify-center w-full rounded-xl hover:shadow-lg disabled:shadow-none font-semibold text-lg text-white bg-green-500 hover:bg-green-700 disabled:bg-green-500/40 transition-all"
              >
                {isUploadingData && (
                  <>
                    <LoadingIndicator />
                    <span>Please Wait...</span>
                  </>
                )}

                {!isUploadingData && (
                  <>
                    <span>
                      <CloudArrowUpIcon className="h-6 w-6" />
                    </span>
                    <span>Update Company</span>
                  </>
                )}
              </button>
              <button
                disabled={isUploadingData}
                //onClick={promtDelete}
                className="flex p-4 gap-4 items-center justify-center w-full rounded-xl hover:shadow-lg disabled:shadow-none font-semibold text-lg text-white bg-red-500 hover:bg-red-700 disabled:bg-red-500/40 transition-all"
              >
                {isUploadingData && (
                  <>
                    <LoadingIndicator />
                    <span>Please Wait...</span>
                  </>
                )}

                {!isUploadingData && (
                  <>
                    <span>
                      <XMarkIcon className="h-6 w-6" />
                    </span>
                    <span>Cancel Editing</span>
                  </>
                )}
              </button>
            </section>
          </form>
        )}
    </main>
  );
};

export default EditCompany;

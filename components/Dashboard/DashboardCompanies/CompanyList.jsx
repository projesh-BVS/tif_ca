import CompanyInfoCard from "./CompanyInfoCard";

const CompanyList = ({ listItems }) => {
  return (
    <div className="flex flex-col items-center w-full pb-10 gap-4">
      {listItems.map((company) => (
        <CompanyInfoCard key={company.companyID} companyInfo={company} />
      ))}
    </div>
  );
};

export default CompanyList;

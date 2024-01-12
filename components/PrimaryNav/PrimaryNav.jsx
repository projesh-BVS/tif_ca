import Image from "next/image";
import PN_SearchBar from "./SubComps/PN_SearchBar";

const PrimaryNav = ({ companyInfo }) => {
  return (
    <>
      <section className="sticky top-0 flex flex-col md:flex-row justify-center items-center w-full gap-4 px-4 py-4 pb-6 bg-gradient-to-b from-white from-95% rounded-b-xl z-50">
        {/* Brand Section */}
        <section className="flex gap-4 w-full md:w-2/3 items-center">
          {/* Logo Div */}
          <div className="rounded-2xl overflow-clip aspect-square h-14 relative shadow-inner">
            <Image
              src={companyInfo.companyLogo}
              blurDataURL={companyInfo.companyLogo}
              alt="Brand Logo"
              quality={100}
              fill
              style={{ objectFit: "cover" }}
              placeholder="blur"
            />
          </div>

          {/* Name & About Div */}
          <div>
            <h1 className="font-medium text-lg">{companyInfo.companyName}</h1>
            <button className="px-2 py-[4px] bg-gray-200 text-gray-600 font-normal text-xs rounded-md">
              About Us
            </button>
          </div>
        </section>

        {/* Search Section */}
        {
          <section className="w-full md:w-1/3">
            <PN_SearchBar />
          </section>
        }
      </section>

      {/* About Us Modal */}
      {/* <section className="absolute flex flex-col m-auto top-0 bottom-0 left-0 right-0 pt-20 p-4 bg-gradient-to-t from-[rgb(0,0,0,0.7)] from-60% bg-opacity-70">
        <div className="h-4 w-4 ml-20 -mb-2 rotate-45 bg-white"></div>
        <div className="flex flex-col shrink-0 justify-between items-center p-6 w-full bg-white rounded-2xl shadow-xl">
          <div className="rounded-full overflow-clip aspect-square w-[50%] relative border-2 border-black shadow-inner">
            <Image
              src={brandInfo.brandLogo}
              alt="Brand Logo"
              quality={100}
              fill
              style={{ objectFit: "cover" }}
              placeholder="blur"
              blurDataURL={brandInfo.brandLogo}
            />
          </div>
        </div>
      </section> */}
    </>
  );
};

export default PrimaryNav;

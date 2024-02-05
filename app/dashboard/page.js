"use client";
//import DashInfoCard from "@/components/Dashboard/DashInfoCard";
import DashPageHeader from "@/components/Dashboard/DashPageHeader";
import HomePrimaryInfoCard from "@/components/Dashboard/DashboardHome/HomePrimaryInfoCard";
import useOwner from "@/hooks/useOwner";
import { HomeIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
  const { owner, isOwnerLoading, isOwnerError } = useOwner(1);

  return (
    <main className="flex flex-col gap-6 pb-6 items-center w-full h-full overflow-auto bg-tif-grey">
      <DashPageHeader
        icon={<HomeIcon className="h-8 w-8" />}
        text="Dashboard"
        isLoading={isOwnerLoading}
      />
      {/*
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 -mt-6 px-4 gap-4 w-full">
          <DashInfoCard
            icon={<BuildingStorefrontIcon className="w-8 h-8" />}
            text="Companies"
            page="/dashboard/companies"
            count="57"
          />
          <DashInfoCard
            icon={<BuildingStorefrontIcon className="w-8 h-8" />}
            text="Products"
            page="/dashboard/products"
            count="78"
          />          
        </section>
  */}
      <section className="flex px-6 gap-4 -mt-6 w-full items-center justify-center">
        <HomePrimaryInfoCard
          ownerData={owner}
          isOwnerLoading={isOwnerLoading}
          isOwnerError={isOwnerError}
        />
      </section>
    </main>
  );
}

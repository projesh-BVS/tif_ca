import DashHeader from "@/components/Dashboard/DashHeader";
import DashSidebar, {
  DashSidebarItem,
} from "@/components/Dashboard/DashSidebar";
import {
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  HomeIcon,
  PresentationChartLineIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";

export const metadata = {
  title: "TIF Dashboard",
  description: "Administrator dashboard for Try It First",
};

export default function DashboardLayout({ children }) {
  return (
    <main className="flex w-screen h-screen">
      <section className="hidden lg:flex z-20">
        <DashSidebar>
          <DashSidebarItem
            icon={<HomeIcon className="h-6 w-6" />}
            text={"Home"}
            page="/dashboard"
          />
          <DashSidebarItem
            icon={<BuildingOffice2Icon className="h-6 w-6" />}
            text={"Companies"}
            page="/dashboard/companies"
          />
          <DashSidebarItem
            icon={<BuildingStorefrontIcon className="h-6 w-6" />}
            text={"Outlets"}
            page="/dashboard/outlets"
          />
          <DashSidebarItem
            icon={<ShoppingBagIcon className="h-6 w-6" />}
            text={"Products"}
            page="/dashboard/products"
          />
          <DashSidebarItem
            icon={<PresentationChartLineIcon className="h-6 w-6" />}
            text={"Reports"}
            page="/dashboard/reports"
          />
        </DashSidebar>
      </section>
      <section className="flex flex-col w-full h-full overflow-hidden">
        <DashHeader />
        {children}
      </section>
    </main>
  );
}

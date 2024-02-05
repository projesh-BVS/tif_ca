import { getFormattedPrice } from "@/utils/productInfoUtils";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const ProductCard = ({ productInfo }) => {
  return (
    <section className="flex flex-col bg-white rounded-xl shadow-lg">
      <div
        id="card"
        className="flex flex-col px-2 py-2 gap-4 w-full h-full justify-between items-center relative"
      >
        <model-viewer
          src={productInfo.glb}
          ios-src={productInfo.usdz}
          poster={productInfo.poster}
          alt="3D model of the product"
          shadow-intensity="1"
          camera-controls
          touch-action="pan-y"
          auto-rotate
          ar
          ar-scale="fixed"
        >
          <button
            slot="ar-button"
            id="ar-button"
            className="bg-blue-500 shadow-lg p-2 text-white text-xs rounded-lg w-full bottom-0 absolute"
          >
            View product in AR
          </button>
        </model-viewer>

        <div className="flex flex-col gap-2 w-full text-gray-500">
          <h1 className="text-md font-semibold truncate">
            {productInfo.productName}
          </h1>
          <p className="text-sm font-medium italic line-clamp-2">
            {productInfo.description}
          </p>
          <h2 className="text-sm font-normal text-red-500">
            {getFormattedPrice(productInfo.currency, productInfo.price)}
          </h2>
          <div className="flex flex-col xl:flex-row gap-2">
            <Link
              href={"/dashboard/products/view/" + productInfo.productID}
              className="w-full"
            >
              <button className="flex pl-2 pr-4 w-full items-center justify-center gap-4 h-10 rounded-lg text-md text-white bg-tif-blue hover:bg-tif-lavender hover:shadow-md whitespace-nowrap transition-all">
                <MagnifyingGlassIcon className="h-6 w-6" />
                <h1 className="font-semibold text-md">View</h1>
              </button>
            </Link>
            <Link
              href={"/dashboard/products/edit/" + productInfo.productID}
              className="w-full"
            >
              <button className="flex pl-2 pr-4 w-full items-center justify-center gap-4 h-10 rounded-lg text-md text-white bg-tif-blue hover:bg-tif-lavender hover:shadow-md whitespace-nowrap transition-all">
                <PencilSquareIcon className="h-6 w-6" />
                <h1 className="font-semibold text-md">Edit</h1>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;

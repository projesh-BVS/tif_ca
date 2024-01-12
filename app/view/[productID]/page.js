"use client";
import LoadingIndicator from "@/components/Common/LoadingIndicator";
import ProductViewInfoCard from "@/components/Product View/ProductViewInfoCard/ProductViewInfoCard";
import ProductViewModelCard from "@/components/Product View/ProductViewModelCard/ProductViewModelCard";
import ProductViewNavBar from "@/components/Product View/ProductViewNavBar/ProductViewNavBar";
import useProduct from "@/hooks/useProduct";

const ProductView = ({ params }) => {
  const { product, isProductLoading, isProductError } = useProduct(
    params.productID
  );

  console.log("Product Data Fetched: ");
  console.log(product);

  return (
    <main className="flex md:flex-row flex-col items-center justify-center w-screen h-[100svh] bg-white">
      <ProductViewNavBar />
      {isProductLoading && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500">
          <LoadingIndicator />
          <span className="font-semibold lg:text-xl">Loading Product</span>
          <span className="font-light text-xs lg:text-sm">Please wait</span>
        </section>
      )}

      {product && product.data == null && !isProductLoading && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {isProductError && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {product && product.data != null && !isProductError && (
        <section className="flex md:flex-row flex-col md:items-center md:justify-center md:gap-6 md:p-6 w-full h-full border-2">
          <section className="w-full md:h-2/3 h-1/3 bg-white">
            <ProductViewModelCard productInfo={product} />
          </section>
          <section className="z-10 w-full h-2/3 bg-gray-100 md:rounded-3xl rounded-t-3xl shadow-[0_10px_25px_5px_rgba(0,0,0,0.25)] border-gray-300 border-t-2">
            <ProductViewInfoCard productInfo={product} />
          </section>
        </section>
      )}
    </main>
  );
};

export default ProductView;

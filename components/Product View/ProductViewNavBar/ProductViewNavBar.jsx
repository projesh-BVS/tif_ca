import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const ProductViewNavBar = () => {
  const router = useRouter();

  return (
    <section className="z-20 absolute top-0 flex w-full h-auto py-4 px-2">
      <button
        onClick={() => router.back()}
        className="p-2 bg-white text-black rounded-full shadow-xl"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
    </section>
  );
};

export default ProductViewNavBar;

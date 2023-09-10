import { getFormattedPrice } from "@/utils/productInfoUtils";

const PG_Card = ({ productInfo }) => {
  return (
    <section className="flex flex-col bg-white rounded-xl shadow-lg">
      <div
        id="card"
        className="flex flex-col px-2 pt-2 pb-4 gap-4 w-full justify-center items-center relative"
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
          //ar-modes="webxr scene-viewer quick-look"
          //ar-modes="webxr"
        >
          <button
            slot="ar-button"
            id="ar-button"
            className="bg-blue-500 shadow-lg p-2 text-white text-xs rounded-lg w-full bottom-0 absolute"
          >
            View product in AR
          </button>
        </model-viewer>

        <div className="flex flex-col w-full">
          <h1 className="text-sm font-medium truncate">{productInfo.name}</h1>
          <h2 className="text-xs font-normal text-red-500">
            {getFormattedPrice(productInfo.currency, productInfo.price)}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default PG_Card;

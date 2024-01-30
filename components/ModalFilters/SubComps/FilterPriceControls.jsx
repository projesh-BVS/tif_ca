import { useState, useEffect, useRef } from "react";

const FilterPriceControls = ({ minPrice, maxPrice, activePriceRange }) => {
  const progressRef = useRef(null);
  const [minValue, setMinValue] = useState(activePriceRange.min);
  const [maxValue, setMaxValue] = useState(activePriceRange.max);

  const handleMin = (e) => {
    if (maxValue - minValue >= 10000 && maxValue <= maxPrice) {
      if (parseInt(e.target.value) > parseInt(maxValue)) {
      } else {
        setMinValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        setMinValue(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e) => {
    if (maxValue - minValue >= 10000 && maxValue <= maxPrice) {
      if (parseInt(e.target.value) < parseInt(minValue)) {
      } else {
        setMaxValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMaxValue(parseInt(e.target.value));
      }
    }
  };

  useEffect(() => {
    progressRef.current.style.left = (minValue / maxPrice) * 100 + "%";
    progressRef.current.style.right = 100 - (maxValue / maxPrice) * 100 + "%";
  }, [minValue, maxValue, minPrice, maxPrice]);

  return (
    <div className="flex flex-col justify-center items-stretch w-full p-4 gap-12">
      <h1 className="w-full font-medium text-sm text-gray-900">
        Use Slider to set minimum & maximum price
      </h1>

      <div className="mb-6 px-4">
        <div className="slider relative h-1 rounded-md bg-gray-300">
          <div
            className="progress absolute h-1 bg-tif-blue rounded"
            ref={progressRef}
          >
            <div className="flex flex-col items-center justify-between">
              <div className="flex items-center justify-start w-full h-20 -mt-16">
                <h1 className="px-2 py-1 bg-tif-blue rounded-lg font-medium text-xs text-white">
                  {minValue}
                </h1>
              </div>
              <div className="flex items-center justify-end w-full">
                <h1 className="px-2 py-1 bg-tif-blue rounded-lg font-medium text-xs text-white">
                  {maxValue}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="range-input relative">
          <input
            onChange={handleMin}
            type="range"
            value={minValue}
            min={minPrice}
            step={100}
            max={maxPrice}
            className="range-min absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
          />

          <input
            onChange={handleMax}
            type="range"
            value={maxValue}
            min={minPrice}
            step={100}
            max={maxPrice}
            className="range-max absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
          />
        </div>
      </div>

      {/*<div className="flex items-center justify-between w-full font-medium text-sm text-gray-900">
        <h1 className="px-2 py-1 bg-gray-300 rounded-lg">{minPrice}</h1>
        <h1 className="px-2 py-1 bg-gray-300 rounded-lg">{maxPrice}</h1>
      </div>*/}
    </div>
  );
};

export default FilterPriceControls;

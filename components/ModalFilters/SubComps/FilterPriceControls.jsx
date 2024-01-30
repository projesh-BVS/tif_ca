import { useState, useEffect, useRef } from "react";

const FilterPriceControls = ({ minPrice, maxPrice, activePriceRange }) => {
  const progressRef = useRef(null);
  const [minValue, setMinValue] = useState(activePriceRange.min);
  const [maxValue, setMaxValue] = useState(activePriceRange.max);

  const handleMin = (e) => {
    if (maxValue - minValue > 200 && maxValue < maxPrice) {
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
    if (maxValue - minValue > 200 && maxValue < maxPrice) {
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
  }, [minValue, maxValue]);

  return (
    <div className="flex flex-col justify-center items-center w-full p-4 gap-6">
      <h1 className="w-full font-medium text-sm text-gray-900">
        Use Slider to enter min & max price
      </h1>

      <div className="mb-4 w-full">
        <div className="slider relative h-1 rounded-md bg-gray-300">
          <div
            className="progress absolute h-1 bg-green-300 rounded"
            ref={progressRef}
          ></div>
        </div>
        <div className="range-input relative">
          <input
            onChange={handleMin}
            type="range"
            value={activePriceRange.min}
            min={minPrice}
            step={100}
            max={maxPrice}
            className="range-min absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
          />

          <input
            onChange={handleMax}
            type="range"
            value={activePriceRange.max}
            min={minPrice}
            step={100}
            max={maxPrice}
            className="range-max absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPriceControls;

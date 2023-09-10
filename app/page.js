"use client"

import { useState, useEffect } from "react";
import {useSearchParams} from 'next/navigation'
import useBrand from "@/hooks/useBrand"
import PrimaryNav from '@/components/PrimaryNav/PrimaryNav';
import CategorySlider from '@/components/CategorySlider/CategorySlider';
import ProductGrid from '@/components/ProductGrid/ProductGrid';

const catItems = ["All", "Furnitures", "Electornics", "Appliances", "Clothes", "Accessories", "Games"]

const Home = () => {
  const searchParams = useSearchParams();
  const brandIDQuery = searchParams.get('brandID')

  const {brandData, isLoading, isError} = useBrand(brandIDQuery? parseInt(brandIDQuery) : 101);
  const [activeCategory, setActiveCategory] = useState();

  const handleCategoryChange = (newActiveCategory) =>  {
    setActiveCategory(newActiveCategory);
  }

  useEffect(() => {
    // This is where we will initialize Model Viewer.
    // We'll do this asynchronously because it's a heavy operation.
    import("@google/model-viewer")
      .then(({ ModelViewerElement }) => {
        // Here, ModelViewerElement is now available and can be used.
        customElements.define("model-viewer", ModelViewerElement);
      })
      .catch((error) => {
        console.error("Error loading Model Viewer", error);
      });
  }, []); // We pass an empty dependency array so this runs once on mount.  

  if (isLoading) {
    return (
      <div className="flex bg-spoon-grey p-8 w-screen h-screen justify-center items-center">
        <h2 className="text-spoon-blue font-normal text-lg">
          Loading Brand Info
        </h2>
      </div>
    );
  }

  if(brandData.brand.length == 0) {
    return (
      <div className="flex bg-gray-400 p-8 w-screen h-screen justify-center items-center">
        <h2 className="text-blue-900 font-normal text-lg">
          There was an error
        </h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex bg-gray-400 p-8 w-screen h-screen justify-center items-center">
        <h2 className="text-blue-900 font-normal text-lg">
          There was an error
        </h2>
      </div>
    );
  }
  
  return (    
    <main className='h-screen w-screen bg-gray-100'>
      <PrimaryNav brandInfo={brandData.brand[0]}/>
      <CategorySlider categoryItems={brandData.brand[0].categories} id="PrimaryCatSlider" activeCategoryCallback={handleCategoryChange}/>
      <ProductGrid productItems={brandData.catalogue}/>      
    </main>    
  )
}

export default Home
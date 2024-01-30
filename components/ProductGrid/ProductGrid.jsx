import PG_Card from "./SubComps/PG_Card";

const ProductGrid = ({ productItems, category, outlet }) => {
  console.log("PG -> Outlet -> " + JSON.stringify(outlet));
  const fullList = productItems;
  const catFilteredList =
    category == "All"
      ? fullList
      : fullList.filter((product) => product.category == category);
  const outletFilteredList =
    outlet == -1
      ? catFilteredList
      : catFilteredList.filter((product) => product.outletIDs == outlet);

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 pt-0 p-4 gap-4">
      {outletFilteredList.map((product) => (
        <PG_Card key={product.productID} productInfo={product} />
      ))}
      {/* <PG_Card />
      <PG_Card />
      <PG_Card />
      <PG_Card />
      <PG_Card />
      <PG_Card />
      <PG_Card />
      <PG_Card />
      <PG_Card />
      <div>ProductCard 1</div>
      <div>ProductCard 2</div>
      <div>ProductCard 3</div>
      <div>ProductCard 4</div>
      <div>ProductCard 5</div>
      <div>ProductCard 6</div>
      <div>ProductCard 7</div>
      <div>ProductCard 8</div>
      <div>ProductCard 9</div> */}
    </section>
  );
};

export default ProductGrid;

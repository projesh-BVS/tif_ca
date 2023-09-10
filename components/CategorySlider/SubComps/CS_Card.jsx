const CS_Card = ({ catName, catID, catActive, onClickCallback }) => {
  const catNameValue = Object.values(catName);
  const catActiveValue = Object.values(catActive);

  return (
    <button
      key={catName}
      id={catID}
      onClick={() => onClickCallback(catName)}
      className={`${
        catNameValue === catActiveValue
          ? "text-white bg-blue-500 shadow-sm"
          : "text-gray-900 shadow-md border-[1px]"
      } relative rounded-xl px-4 ml-4 py-2 text-sm transition duration-[250ms] ease-in-out`}
    >
      <h1>
        {console.log(
          "Name : " +
            Object.values(catName) +
            " | Active : " +
            Object.values(catActive)
        )}
        {catName}
      </h1>
    </button>
  );
};

export default CS_Card;

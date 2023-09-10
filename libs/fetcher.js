const baseURL = "https://0zwhtezm4f.execute-api.ap-south-1.amazonaws.com/TryItFirst/catalogue_brand?brandID=";

const fetcher = async (brandID) => {
  const response = await fetch(baseURL + brandID)
  const data = await response.json()  
  return data
}

export default fetcher
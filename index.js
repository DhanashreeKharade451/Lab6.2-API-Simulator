import { fetchProductCatalog, fetchProductReviews } from "./apiSimulator";

fetchProductCatalog()
  .then((product) => {
    console.log("fetched product", product);
    return fetchProductReviews(); // returns a promise object
  })

  .then((reviews) => {
    console.log("fetched reviews", reviews);
    return fetchProductReviews(); // returns a promise object
  })

  .then((sales) => {
    console.log("fetches sales", sales);
  })

  .catch((e) => {
    if(e instanceof DataError){
         console.error("DataError", e);
    }else if (e instanceof DataError){
         console.error("NewworkError", e);
    }
    else{
        console.error(e);
    }
  })

  .finally(() => {
    console.log("API Calls Completed");
  });


fetchProductReviews();
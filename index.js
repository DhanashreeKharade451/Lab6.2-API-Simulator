import { fetchProductCatalog,
  fetchProductReviews,
  fetchSalesReport,
  NetworkError,
  DataError, } from "./apiSimulator";

 fetchProductCatalog() // returns a promise object
  .then((productCatalog) => {
    //printing all the products in the catalog
    console.log("Products :", productCatalog);

    // Create an array of promises for all product reviews
    const reviewPromises = productCatalog.map((product) =>
      fetchProductReviews(product.id)
        .then((reviews) => {
          console.log(`Reviews for Product ${product.id}:`, reviews);
          return reviews; // return reviews if needed later
        })
        // Handle errors for individual product review fetches
        .catch((error) => {
          if (error instanceof NetworkError) {
            console.log("Network Error", error.message);
          } else if (error instanceof DataError) {
            console.log("Data Error", error);
          } else {
            console.error("Unknown Error:", error);
          }
          return []; // fallback so Promise.all continues
        }),
    );

    // Wait for all review fetches to complete
    return Promise.all(reviewPromises).then(() => productCatalog);
  })
  .then((productCatalog) => {
    // Fetch sales report only if catalog succeeded
    if (productCatalog.length === 0) {
      console.log("Catalog failed, skipping sales report.");
      return;
    }

    return (
      fetchSalesReport()
        .then((salesReport) => {
          //printing the sales report
          console.log("Sales Report:", salesReport);
        })
        // Handle errors for sales report fetch
        .catch((error) => {
          if (error instanceof NetworkError) {
            console.log("Network Error", error.message);
          } else if (error instanceof DataError) {
            console.log("Data Error", error);
          } else {
            console.error("Unknown Error:", error);
          }
        })
    );
  })
 
  /////////////

fetchProductCatalog()   // returns a promise object
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
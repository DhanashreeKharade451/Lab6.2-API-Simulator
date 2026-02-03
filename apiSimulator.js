class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = "NetworkError";
  }
}

class DataError extends Error {
  constructor(message) {
    super(message);
    this.name = "DataError";
  }
}

export const fetchProductCatalog = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (Math.random() < 0.8) {
          resolve([
            { id: 1, name: "Laptop", price: 1200 },
            { id: 2, name: "Headphones", price: 200 },
          ]);
        } else {
          throw new DataError("Failed to fetch product catalog");
        }
      } catch (e) {
        reject(e);
      }
    }, 1000);
  });
};

export const fetchProductReviews = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

         try {
      const reviews = [
        { productId: 1, name: "I love this product", rating: 4 },
        { productId: 1, name: "not working properly", rating: 2 },
        { productId: 1, name: "Awesome Product", rating: 5 },
      ];
      const productId = reviews[0].productId;

     
        if (Math.random() < 0.8) {
          resolve(reviews);

        } else {
            throw new NetworkError{
                    `Failed to fetch reviews for product ID ${productId}`
            }
          
        }
      } catch(e) {
        reject(e);
      }
    }, 1500);
  });
};

export const fetchSalesReport = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const salesReport = { totalSales: 100, unitsSold: 5, averagePrice: 20 };

      if (Math.random() < 0.8) {
        resolve(salesReport);
      } else {
        reject("Failed to fetch Report");
      }
    }, 1000);
  });
};

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

const STORAGE_KEY = "luxe-product-reviews";

export const getStoredReviews = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};

export const getReviewsByProduct = (productId, defaultReviews = []) => {
  const reviews = getStoredReviews();
  return reviews[productId] || defaultReviews;
};

export const saveReview = (productId, review) => {
  const reviews = getStoredReviews();

  reviews[productId] = [review, ...(reviews[productId] || [])];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
};

export const clearReviews = () => {
  localStorage.removeItem(STORAGE_KEY);
};
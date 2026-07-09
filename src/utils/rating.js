export const getAverageRating = (reviews = []) => {
  if (!reviews.length) return 0;

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);

  return Number((total / reviews.length).toFixed(1));
};

export const getTotalReviews = (reviews = []) => {
  return reviews.length;
};

export const getRatingDistribution = (reviews = []) => {
  return reviews.reduce(
    (distribution, review) => {
      if (distribution[review.rating] !== undefined) {
        distribution[review.rating]++;
      }
      return distribution;
    },
    {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    }
  );
};

export const getRatingPercentage = (count, total) => {
  if (!total) return 0;

  return Math.round((count / total) * 100);
};

export const formatRating = (rating) => {
  return Number(rating).toFixed(1);
};
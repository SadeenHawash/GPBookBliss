export function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getUTCDate(); // Get the day of the month (1-31)
    const month = date.toLocaleString('default', { month: 'long' }); // Get the month name (January-December)
    const year = date.getUTCFullYear(); // Get the four-digit year (YYYY)
    
    return `${day} ${month} ${year}`;
}

export function calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) {
        return 0; // Return 0 if there are no reviews
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    return averageRating.toFixed(2); // Return the average rating rounded to 2 decimal places
}

export const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    const discountDecimal = discountPercentage / 100;
    const discountedPrice = originalPrice * (1 - discountDecimal);
    return discountedPrice.toFixed(2);
};

export const calculateRatingsBreakdown = (reviews) => {
    const breakdown = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
    };

    reviews.map(review => {
        breakdown[review.rating]++;
    });

    const totalReviews = reviews.length;
    for (let rating in breakdown) {
        breakdown[rating] = {
            count: breakdown[rating],
            percentage: totalReviews ? (breakdown[rating] / totalReviews) * 100 : 0,
        };
    }

    return breakdown;
};
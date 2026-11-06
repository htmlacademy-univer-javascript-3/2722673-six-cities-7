import type {Review} from '@/types/offer';
import ReviewItem from '@components/review-item/review-item';
import {MAX_REVIEWS_COUNT} from '@/constants/review';

type ReviewsListProps = {
  reviews: Review[];
};

function ReviewsList({reviews}: ReviewsListProps) {
  const displayedReviews = [...reviews]
    .sort((first, second) => Date.parse(second.date) - Date.parse(first.date))
    .slice(0, MAX_REVIEWS_COUNT);

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {displayedReviews.map((review) => <ReviewItem key={review.id} review={review} />)}
      </ul>
    </>
  );
}

export default ReviewsList;

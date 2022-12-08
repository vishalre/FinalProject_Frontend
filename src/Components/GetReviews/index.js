import { useEffect, useState } from "react";
import { GetReviewsAction } from "../Actions/GetReviews";
import ReviewsList from "../ReviewsList";
const GetReviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    GetReviewsAction().then((data) => setReviews(data));
  }, []);
  return (
    <div className="my-4">
      <ReviewsList Reviews={reviews} />
    </div>
  );
};
export default GetReviews;

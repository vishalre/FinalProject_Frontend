import { getUserInfo } from "../../../Services/AddAddress";
import { DeleteReview } from "../../../Services/Review";

export const GetReviewsAction = async () => {
  const likes = await getUserInfo();
  return likes.user.reviews;
};

export const DeleteReviewsAction = async (id) => {
  await DeleteReview(id);
};

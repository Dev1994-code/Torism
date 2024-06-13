import ReactPaginate from "react-paginate";
import { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
//import AddReview from "../pages/AddReview";
const Reviews = () => {
  const reviewsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);
  // the array of reviews

  const [reviews, setReviews] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [userIdCookies, setUserIdCookies] = useCookies(["userId_cookies"]);
  const userId = userIdCookies["userId_cookies"];

  // console.log("userId:", userId);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:3001/review/detail");
        setReviews(response.data);
        console.log("reviews", response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, [reviews]);

  const token = cookies["access_token"];
  // console.log("token:", token);
  const pageCount = Math.ceil(reviews.length / reviewsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const offset = currentPage * reviewsPerPage;
  const currentReviews = reviews.slice(offset, offset + reviewsPerPage);

  const [formData, setFormData] = useState({
    userId: userId,
    text: "",
  });
  const { text } = formData;
  const [errors, setErrors] = useState({});

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, text: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // let validationErrors = {};
    // if (name.trim() === "") {
    //   validationErrors.name = "Name is required";
    //   toast.error("Name is required");
    // }
    // if (rating < 1 || rating > 5) {
    //   validationErrors.rating = "Rating must be between 1 and 5";
    //   toast.error("Rating must be between 1 and 5");
    // }
    // if (text.trim() === "") {
    //   validationErrors.comment = "Comment is required";
    //   toast.error("Comment is required");
    // } else if (comment.trim().split(/\s+/).length > 100) {
    //   validationErrors.comment = "Comment should be less than 100 words";
    // }

    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return; // Stop form submission if there are validation errors
    // }

    try {
      console.log(formData);
      const res = await axios.post(
        `${import.meta.env.VITE_API_PATH}/review/create`,
        formData
      );
      // console.log(response.data);
      if (res.status === 200) {
        toast.success("Review Added Successfully");
        setFormData({ text: "" });
        setShowModal(false);
        setReviews((prev) => [...prev, res.data]);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred while submitting the review.");
    }
    //console.log(formData);
  };

  return (
    <section className="bg-gray-100 py-12">
      <div className={`${showModal ? "blurred" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-lime-300 rounded-full flex items-center justify-center text-gray-700 font-semibold text-xl">
                    {review.user.name && review.user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                      {review.user.name}
                    </h3>
                    <div className="flex items-center mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-500 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2.928l2.928 6.672 6.672.672-4.82 4.85 1.14 6.987L10 15.657l-6.92 3.42 1.14-6.987L.4 10.272l6.672-.672L10 2.928zm0 2.399L7.59 9.3H2.93l5.66 3.971L6.47 17.7 10 13.56l3.53 4.14-1.12-4.43L17.07 9.3h-4.66L10 5.327z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-gray-800 mt-4">{review.text}</p>
              </div>
            ))}
            <div className="mt-8 flex justify-center">
              <ReactPaginate
                previousLabel={
                  <span className="text-gray-500 text-xl">&lt;</span>
                }
                nextLabel={<span className="text-gray-500 text-xl">&gt;</span>}
                pageCount={pageCount}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
                className="flex items-center justify-center gap-5 text-xl"
              />
            </div>
          </div>
        </div>
        {token && (
          <div className="flex justify-end mb-8">
            <div className="ml-auto">
              <Link to="">
                <Button
                  className="flex items-center bg-lime-500 hover:bg-lime-600  text-white font-semibold py-2 px-4 rounded mr-9"
                  onClick={() => setShowModal(!showModal)}
                >
                  <PlusOutlined className="mr-2" />
                  Add Review
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div
          className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-4 fixed inset-0 z-50"
          //style={{ height: "fit-content" }}
        >
          <h2 className="text-lg font-semibold mb-4">Add a Review</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="comment"
                className="block text-gray-700 font-medium mb-2"
              >
                Comment
              </label>
              <textarea
                name="text"
                value={text}
                onChange={handleReviewChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-lime-400 hover:bg-lime-600 text-white font-semibold py-2 px-4 rounded"
            >
              Submit Review
            </button>

            <div>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                onClick={() => setShowModal(!showModal)}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};
export default Reviews;

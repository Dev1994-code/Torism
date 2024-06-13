import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddReview = () => {
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    comment: "",
  });
  const { name, rating, comment } = formData;
  const [errors, setErrors] = useState({});
  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
    setErrors({ ...errors, name: "" });
  };
  const handleRatingChange = (e) => {
    setFormData({ ...formData, rating: e.target.value });
    setErrors({ ...errors, rating: "" });
  };
  const handleReviewChange = (e) => {
    setFormData({ ...formData, comment: e.target.value });
    setErrors({ ...errors, comment: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (name.trim() === "") {
      validationErrors.name = "Name is required";
      toast.error("Name is required");
    }
    if (rating < 1 || rating > 5) {
      validationErrors.rating = "Rating must be between 1 and 5";
      toast.error("Rating must be between 1 and 5");
    }
    if (comment.trim() === "") {
      validationErrors.comment = "Comment is required";
      toast.error("Comment is required");
    } else if (comment.trim().split(/\s+/).length > 100) {
      validationErrors.comment = "Comment should be less than 100 words";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop form submission if there are validation errors
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_PATH}/service/review`,
        formData
      );
      console.log(response.data);
      toast.success("Review Added Successfully");
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred while submitting the review.");
    }
    //console.log(formData);
    setFormData({ name: "", rating: 0, comment: "" });
  };

  return (
    <div
      className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-4"
      style={{ height: "fit-content" }}
    >
      <h2 className="text-lg font-semibold mb-4">Add a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="rating"
            className="block text-gray-700 font-medium mb-2"
          >
            Rating
          </label>
          <input
            type="number"
            id="rating"
            step="0.1"
            value={rating}
            onChange={handleRatingChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
            min="1"
            max="5"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="comment"
            className="block text-gray-700 font-medium mb-2"
          >
            Comment
          </label>
          <textarea
            id="comment"
            value={comment}
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
      </form>
    </div>
  );
};

export default AddReview;

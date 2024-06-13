import { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { useCookies } from "react-cookie";

const TourGuide = () => {
  const [tourGuides, setTourGuides] = useState([]);
  const [userIdCookies, setUserIdCookies] = useCookies(["userId_cookies"]);
  const [formData, setFormData] = useState({
    tourGuide: null,
    rating: 0,
  });

  const userId = userIdCookies["userId_cookies"];
  console.log("userId:", userId);

  useEffect(() => {
    const fetchTourGuide = async () => {
      try {
        const res = await axios.get("http://localhost:3001/guide/active");
        setTourGuides(res.data);
      } catch (error) {
        console.error("Error fetching tour guides:", error);
      }
    };
    fetchTourGuide();
  }, []);

  const handleStarClick = (guideId, rating) => {
    setFormData({ tourGuide: guideId, rating });

    // handleUpdateRating(guideId, rating);
    // setFormData({ ...formData, rating });
    // handleUpdateRating();
  };

  const handleUpdateRating = async (guideId) => {
    try {
      console.log("formData:", formData);
      const res = await axios.put(
        `http://localhost:3001/user/rate/${userId}/${formData.tourGuide}`,
        { rating: formData.rating }
      );

      alert("Rating Updated Successfully");
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="mt-10 mb-60 mx-10">
      <div className="flex flex-col items-center justify-between mx-10  md:flex-row gap-6 mx-[3rem]">
        {tourGuides.map((guide) => (
          <div key={guide._id}>
            <div className="max-w-md">
              <h1 className="text-xl font-bold mb-2">{guide.name}</h1>
              <p className="text-gray-700 mb-4">{guide.email}</p>
              <p className="text-gray-700 mb-4">{guide.location}</p>
              <p className="mb-4">{guide.description}</p>
              <p className="mb-4">{guide.phone}</p>
              {/* <button
              className="bg-green-500 text-white px-4 py-2 w-full rounded"
              onClick={() => setFormData({ ...formData, tourGuide: guide._id })}
            >
              Select Tour Guide
            </button> */}
              <div className="flex items-center gap-4">
                <label htmlFor="rating" className="text-lg font-semibold">
                  Rating:
                </label>

                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    size={30}
                    className={
                      index < formData.rating &&
                      formData.tourGuide === guide._id
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }
                    onClick={() => handleStarClick(guide._id, index + 1)}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
              <button
                className="bg-blue-500 px-4 py-1 text-white rounded-lg my-2"
                onClick={handleUpdateRating}
              >
                Rate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourGuide;

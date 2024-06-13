import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { FaStar } from "react-icons/fa";

const Booking = () => {
  const [SpecificPackage, setSpecificPackage] = useState(null);
  const [tourGuides, setTourGuides] = useState([]);
  const { id } = useParams();
  const [userIdCookies, setUserIdCookies] = useCookies(["userId_cookies"]);
  const [open, setOpen] = useState(false);

  //   const [isOrderCreated, setIsOrderCreated] = useState(false);

  const userId = userIdCookies["userId_cookies"];

  console.log("userId:", userId);
  const [formData, setFormData] = useState({
    date: "",
    peopleNumber: 0,
    package: id,
    tourGuide: "",
    method: 0,
  });

  useEffect(() => {
    const fetchTourGuide = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_PATH}/package/detail/${id}`
        );
        setSpecificPackage(res.data);
      } catch (error) {
        console.error("Error fetching tour guides:", error);
      }
    };
    fetchTourGuide();
  }, []);

  useEffect(() => {
    const fetchTourGuide = async () => {
      try {
        const res = await axios.get("http://localhost:3001/guide/active");
        console.log("res.data:", res.data);
        setTourGuides(res.data);
      } catch (error) {
        console.error("Error fetching tour guides:", error);
      }
    };
    fetchTourGuide();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;

    if (name === "peopleNumber") {
      parsedValue = parseInt(value, 10);
      parsedValue = isNaN(parsedValue) ? "" : parsedValue; // Fallback to empty string if parsing fails
    }

    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    // Your form submission logic here

    console.log("formData:", formData);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_PATH}/book/create/${userId}`,
        formData
      );

      console.log("res.data", res.data);

      if (res.status === 201) {
        alert("Booking Successful");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-[4rem]">
      <div className="flex items-center flex-col md:flex-row gap-4 justify-center mx-[3rem]">
        {tourGuides &&
          tourGuides.map((guide) => (
            <div key={guide._id} className="max-w-md">
              <h1 className="text-xl font-bold mb-2">{guide.name}</h1>
              <p className="text-gray-700 mb-4">{guide.email}</p>
              <p className="text-gray-700 mb-4">{guide.location}</p>
              <p className="mb-4">{guide.description}</p>
              <p className="mb-4">{guide.phone}</p>
              <div className="flex items-center gap-1">
                <label className="text-lg font-semibold">Rating:</label>
                {console.log("guide.averageRating:", guide.averageRating)}
                {[...Array(Math.floor(guide.averageRating))].map((_, index) => (
                  <FaStar key={index} size={20} color="orange" />
                ))}
                <span>({guide.averageRating})</span>
              </div>
              <button
                className="bg-green-500 text-white px-4 py-2 w-full rounded"
                onClick={() =>
                  setFormData({ ...formData, tourGuide: guide._id })
                }
              >
                Select Tour Guide
              </button>
            </div>
          ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-[2rem] mx-[8rem]">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-md font-bold mb-2"
            htmlFor="peopleNumber"
          >
            Number of People
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="peopleNumber"
            type="number"
            name="peopleNumber"
            value={formData.peopleNumber}
            placeholder="Enter number of people"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-md font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          //   onClick={() => setOpen(true)}
        >
          Check Out
        </button>
      </form>
    </div>
  );
};
export default Booking;

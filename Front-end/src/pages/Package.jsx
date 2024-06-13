import { Button } from "antd";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Blogs from "../components/Blogs";
const Package = () => {
  const { id } = useParams();

  const [specificPackage, setSpecificPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [userIdCookies, setUserIdCookies] = useCookies(["userId_cookies"]);
  const [showModal, setShowModal] = useState(false);
  const token = cookies["access_token"];
  const navigate = useNavigate();
  const userId = userIdCookies["userId_cookies"];
  const [blogs, setBlogs] = useState([]);

  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
    userId: userId, // Assuming userId is available in cookies
    packageId: id,
  });

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_PATH}/package/detail/${id}`
        );
        console.log("SpecificPackage:", response.data);
        setSpecificPackage(response.data);
      } catch (error) {
        console.error("Error fetching the package:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, [id]);
  const handleStarClick = (rating) => {
    setFormData({ ...formData, rating });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("formData:", formData);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_PATH}/blog/create`,
        formData
      );
      if (res.status === 200) {
        alert("BLog Created Successfully");
        setBlogs((prev) => [...prev, res.data]);
        setFormData({ rating: 0, comment: "", userId, packageId: id });
        setShowModal(false);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get(
        `http://localhost:3001/blog/detail/${id}`
      );
      // console.log("reviews:", response.data);
      setBlogs(response.data);
    };

    fetchBlogs();
  }, [id]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get(
        `http://localhost:3001/blog/detail/${id}`
      );
      // console.log("reviews:", response.data);
      setBlogs(response.data);
    };

    fetchBlogs();
  }, [id]);

  return (
    <div>
      <div className={`${showModal ? "blurred" : ""}`}>
        {specificPackage && (
          <>
            <div>
              <h2 className="mt-16 text-3xl font-bold mb-4 mx-8">
                {/* {specificPackage.aboutThisTour}: */}
                About this Tour
              </h2>
              <p className="text-gray-700 mb-8 text-xl mx-8">
                {specificPackage.description}
              </p>
            </div>
            <div className="mx-12  py-8  md:px-0">
              <div className="flex flex-col md:flex-row md:justify-between mx-2 gap-20 md:mx-0">
                <div className="card bg-white border-t-4 border-green-500 rounded-lg overflow-hidden shadow-lg flex-1 md:mr-4">
                  <div className="p-4">
                    <h1 className="text-3xl font-bold mb-4">Sights</h1>
                    <ul className="list-disc list-inside">
                      {specificPackage.activities?.map((activity, index) => (
                        <li
                          key={index}
                          className="text-gray-700 py-2 px-4 border-b border-gray-300 text-lg"
                        >
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <img
                src={specificPackage.image.url}
                alt="specificPackage.image.url"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="mx-12 py-8 md:px-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specificPackage.itinerary?.map((item, index) => (
                  <div
                    key={index}
                    className="card bg-white border-t-4 border-green-500 rounded-lg overflow-hidden shadow-lg md:mb-4"
                  >
                    <div className="p-4">
                      <div>
                        <p className="text-gray-700">
                          <h3 className="font-semibold">{item.day}: </h3>
                          <span className="inline-block text-gray-800 p-2 rounded-lg border-gray-300">
                            {item.info}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        <div className="flex justify-center items-center my-10">
          <Button
            className={
              token
                ? "bg-lime-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded items-center"
                : "opacity-50 cursor-not-allowed"
            }
            onClick={() => navigate(`/book/${specificPackage._id}`)}
          >
            Book Now
          </Button>
        </div>
        {blogs.length > 0 && <Blogs packageId={id} blogs={blogs} />}
        <div>
          {token && (
            <Button
              className="bg-lime-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-10 my-6 items-center"
              onClick={() => setShowModal(!showModal)}
            >
              Add Blogs
            </Button>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add Blog</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <label htmlFor="rating" className="text-lg font-semibold">
                  Rating:
                </label>

                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    size={30}
                    className={
                      index < formData.rating
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }
                    onClick={() => handleStarClick(index + 1)}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-md font-bold mb-2"
                  htmlFor="peopleNumber"
                >
                  Write Blog
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2"
                  rows={4}
                  placeholder="Write your Blog here..."
                />
              </div>
              <button
                className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                // onClick={handleUpdate}
              >
                Save
              </button>
            </form>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              onClick={() => setShowModal(!showModal)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Package;

{
  /* <div>
      <img className="h-[200px] w-[200px] bg-black" />
      <h1 className="mt-12 mb-96">Package{params.id}</h1>;
    </div> */
}

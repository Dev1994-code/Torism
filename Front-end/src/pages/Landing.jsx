//import pic from "../assets/pic.jpg";
import Destinations from "../components/Destinations";
//import Blogs from "../components/Blogs";
import { Button } from "antd";
import Reviews from "../components/Reviews";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const token = cookies["access_token"];
  const navigate = useNavigate();
  return (
    <>
      <div className="">
        <div className="lg:grid grid-cols-5 gap-8">
          <div className="col-span-2 mt-40 ml-20">
            <h2 className="text-4xl font-bold mb-4 text-blue-700">
              Travel with us!
            </h2>
            <p className="text-xl text-gray-700 leading-loose p-4 rounded-lg font-serif">
              Begin an{" "}
              <span className="text-purple-600 font-bold italic">
                extraordinary journey
              </span>{" "}
              through the captivating Sidama region with the Sidama Tour Guide
              Website. Immerse yourself in the{" "}
              <span className="text-green-600 font-semibold">
                vibrant culture
              </span>
              , awe-inspiring landscapes, and rich history that define this
              remarkable destination. We are dedicated to creating a truly{" "}
              <span className="text-red-600 font-bold">unforgettable</span>{" "}
              travel experience.
            </p>
          </div>
          <div className="col-span-3 mt-14 ml-6">
            <img
              src="https://visitsidama.travel/wp-content/uploads/2021/06/Aregash-Lodge.jpg"
              alt="hero"
              className="rounded-md shadow-md w-full h-4/5 mt-7"
            />
          </div>
        </div>
      </div>
      <Destinations />
      <Reviews />
      <div>
        {token && (
          <Button
            className="flex justify-end items-center  bg-yellow-500 hover:bg-lime-600  text-white my-6 mx-6 text-lg py-2 "
            onClick={() => navigate("/rate")}
          >
            Rate travelGuide
          </Button>
        )}
      </div>
    </>
  );
};
export default Landing;

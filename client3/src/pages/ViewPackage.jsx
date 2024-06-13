import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import API_BASE_URL from "../apiConfig";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { ModeStand } from "../hook/zustand";

const ViewPackage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [packages, setPackages] = useState([]);
  const [updatedPackages, setUpdatedPackages] = useState({});
  const theme = ModeStand((state) => state.theme);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [adminIdCookies] = useCookies(["admin_id_token"]);

  const adminId = adminIdCookies["admin_id_token"];

  const [formData, setFormData] = useState({
    name: "",
    activities: [],
    location: "",
    description: "",
    price: "",
    admin: adminId,
    itinerary: [],
  });

  const handleItineraryChange = (idx, field, value) => {
    const updatedItinerary = [...formData.itinerary];
    updatedItinerary[idx][field] = value;
    setFormData({ ...formData, itinerary: updatedItinerary });
  };

  const addItineraryEntry = () => {
    const updatedItinerary = [...formData.itinerary, { day: "", info: "" }];
    setFormData({ ...formData, itinerary: updatedItinerary });
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/package/detail`);
        console.log("packages:", response.data);
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleActivityChange = (event, idx) => {
    const { value } = event.target;
    const newActivities = [...formData.activities];
    newActivities[idx] = value;
    setFormData({ ...formData, activities: newActivities });
  };

  const handleUpdateClick = (pack) => {
    setShowUpdateModal(true);
    setUpdatedPackages(pack);
    console.log("package", pack);

    setFormData({
      name: pack.name,
      description: pack.description,
      location: pack.location,
      price: pack.price,
      activities: pack.activities,
      itinerary: pack.itinerary,
      admin: adminId,
    });
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
  };

  const AddActivities = () => {
    setFormData({ ...formData, activities: [...formData.activities, ""] });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("formData:", formData);
    const { _id, __v, ...modifiedPackage } = updatedPackages;
    modifiedPackage.name = formData.name;
    modifiedPackage.activities = formData.activities;
    modifiedPackage.itinerary = formData.itinerary;
    modifiedPackage.location = formData.location;
    modifiedPackage.description = formData.description;
    modifiedPackage.price = formData.price;

    console.log("modifiedPackage: ", modifiedPackage);

    const requestedData = new FormData();

    for (const key in modifiedPackage) {
      if (key === "activities") {
        modifiedPackage[key].forEach((activity, index) => {
          requestedData.append(`activities[${index}]`, activity);
        });
      } else if (key === "itinerary") {
        modifiedPackage[key].forEach((item, index) => {
          requestedData.append(`itinerary[${index}][day]`, item.day);
          requestedData.append(`itinerary[${index}][info]`, item.info);
        });
      } else {
        requestedData.append(key, modifiedPackage[key]);
      }
    }

    if (selectedFile) {
      requestedData.append("image", selectedFile);
    }

    try {
      console.log("requestedData: ", requestedData);

      const response = await axios.put(
        `${API_BASE_URL}/package/${updatedPackages._id}`,
        requestedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("updated packages", response.data);

      const updatedPackagesList = packages.map((pack) => {
        if (pack._id === updatedPackages._id) {
          return response.data;
        } else {
          return pack;
        }
      });

      console.log("updatedPackagesList", updatedPackagesList);

      setPackages(updatedPackagesList);
      setUpdatedPackages(response.data);
      setShowUpdateModal(false);

      console.log("updated response", response.data);
      toast.success("Package Updated Successfully!");
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleDelete = async (pack) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/package/${pack._id}`
      );
      setPackages((prevPackages) =>
        prevPackages.filter((p) => p._id !== pack._id)
      );
      console.log(response.data);
      toast.success("Package Deleted Successfully!");
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className={"font-Roboto"}>
      <AdminNavbar />
      <div className="flex">
        <Sidebar open={sidebarOpen} onToggle={handleSidebarToggle} />

        <div
          className={`flex-1  pt-8 bg-white mt-8 sm:pl-[2.2rem] ${
            sidebarOpen ? "ml-[2rem] sm:mx-[1rem]" : "sm:ml-[1.5rem] ml-[1rem]"
          } ${theme === "light" ? "" : "dark:bg-gray-700 text-white "} ${
            sidebarOpen ? "ml-[2rem] sm:mx-[1rem]" : "sm:ml-[1.5rem] ml-[1rem]"
          } min-h-screen`}
        >
          <div className="my-4">
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mx-8 my-4 ${
                showUpdateModal ? "blurred" : ""
              }`}
            >
              {packages &&
                packages.map((pa, index) => (
                  <div key={index} className="flex flex-col">
                    <img
                      src={pa.image.url}
                      alt="package"
                      className="w-full h-48 object-cover"
                    />
                    <div className="flex justify-between mt-2 items-center">
                      <h1 className="text-xl font-bold">{pa.name}</h1>
                      <p className="text-base">Price: {pa.price}</p>
                    </div>
                    <div className="flex gap-2 mt-2 items-center my-2">
                      <button
                        className="btn bg-blue-500 text-white btn-sm"
                        onClick={() => handleUpdateClick(pa)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-error btn-sm text-white"
                        onClick={() => handleDelete(pa)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <Link
              to="/package"
              className="ml-[2rem] bg-blue-500 px-2  rounded-lg  text-white font-semibold text-[1rem] py-[.7rem]"
            >
              <span className="font-bold mr-2">+</span>Add Package
            </Link>
          </div>
          <ToastContainer />
          {showUpdateModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
              <div className="bg-white p-8 rounded shadow-lg transform transition-all duration-300 w-full max-w-3xl mx-auto my-8 max-h-full overflow-y-auto">
                <div className="flex-1 items-center mt-8">
                  <h2 className="text-3xl text-gray-700 font-bold mb-4">
                    Update Packages
                  </h2>
                  <form className="w-full" onSubmit={handleUpdate}>
                    <label className="block mb-4">
                      <span className="text-gray-700">Name</span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={
                          "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
                        }
                      />
                    </label>
                    <label className="block mb-4">
                      <span className="text-gray-700">Description</span>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={
                          "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
                        }
                        rows="4"
                      ></textarea>
                    </label>
                    <label className="block mb-4">
                      <span className="text-gray-700">Location</span>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={
                          "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
                        }
                      />
                    </label>
                    <label className="block mb-4">
                      <span className="text-gray-700">Price</span>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className={
                          "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
                        }
                      />
                    </label>
                    <div className="block mb-4">
                      <span className="text-gray-700">Activities</span>
                      {formData.activities.map((activity, idx) => (
                        <input
                          key={idx}
                          type="text"
                          value={activity}
                          onChange={(e) => handleActivityChange(e, idx)}
                          className={
                            "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
                          }
                        />
                      ))}
                      <button
                        type="button"
                        onClick={AddActivities}
                        className="btn bg-blue-500 text-white btn-sm mt-2"
                      >
                        Add Activity
                      </button>
                    </div>
                    <div className="block mb-4">
                      <span className="text-gray-700">Itinerary</span>
                      {formData.itinerary.map((itinerary, idx) => (
                        <div key={idx} className="mb-2">
                          <label className="block mb-1">
                            <span className="text-gray-700">Day</span>
                            <input
                              type="text"
                              value={itinerary.day}
                              onChange={(e) =>
                                handleItineraryChange(
                                  idx,
                                  "day",
                                  e.target.value
                                )
                              }
                              className={
                                "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
                              }
                            />
                          </label>
                          <label className="block mb-1">
                            <span className="text-gray-700">Info</span>
                            <textarea
                              value={itinerary.info}
                              onChange={(e) =>
                                handleItineraryChange(
                                  idx,
                                  "info",
                                  e.target.value
                                )
                              }
                              className={
                                "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
                              }
                              rows="2"
                            ></textarea>
                          </label>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addItineraryEntry}
                        className="btn bg-blue-500 text-white btn-sm mt-2"
                      >
                        Add Itinerary Entry
                      </button>
                    </div>
                    <label className="block mb-4">
                      <span className="text-gray-700">Image</span>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className={
                          "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
                        }
                      />
                    </label>
                    <div className="flex justify-between">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Update Package
                      </button>
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className={
                          "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
                        }
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPackage;

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import API_BASE_URL from "../apiConfig";
import Joi from "joi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ModeStand } from "../hook/zustand";

const ViewUser = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const theme = ModeStand((state) => state.theme);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/active`);
        // const data = await response.json();
        console.log("user:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleBanUser = async (id) => {
    const response = await axios.put(
      `${API_BASE_URL}/admin/updateUserStatus/${id}`,
      { status: "ban" }
    );

    if (response.status === 201) {
      // If the update was successful, remove the banned tour User from the state
      setUsers((prevTourUsers) =>
        prevTourUsers.filter((user) => user._id !== id)
      );
    }
  };

  return (
    <div className={"font-Roboto"}>
      <AdminNavbar />
      <div className="flex">
        <Sidebar open={sidebarOpen} onToggle={handleSidebarToggle} />

        <div
          className={`flex-1 pt-8 bg-white mt-8 sm:pl-[2.2rem] min-h-screen ${
            sidebarOpen ? "ml-[2rem] sm:mx-[1rem]" : "sm:ml-[1.5rem] ml-20"
          } ${theme === "light" ? "" : "dark:bg-gray-700 text-white "} ${
            sidebarOpen ? "ml-[2rem] sm:mx-[1rem]" : "sm:ml-[1.5rem] ml-[1rem]"
          }`}
        >
          <div className="flex gap-8 my-4 ml-[3rem]">
            <Link
              to="/viewUser"
              className={"text-[1rem] border-b-4 border-blue-400"}
            >
              Active
            </Link>
            <Link to="/viewUserBanned" className="text-[1rem]">
              Banned
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr
                  className={`${
                    theme === "light" ? "" : "dark:bg-gray-700 text-white "
                  }`}
                >
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>username</th>
                  <th>contact</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user, index) => (
                    <tr key={user._id}>
                      <th>{index + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.username}</td>
                      <td>{user.contact}</td>

                      <td>
                        {/* Action buttons */}
                        <button
                          className="btn btn-sm text-green-500"
                          onClick={() => handleBanUser(user._id)}
                        >
                          {user.status}
                        </button>
                        {/* <button>Delete</button> */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;

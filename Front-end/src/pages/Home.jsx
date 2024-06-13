import { Layout } from "antd";
import AppHeader from "../components/Header";
import "../assets/home.css";
import "antd/dist/antd";
import { Footer } from "antd/es/layout/layout";
import AppFooter from "../components/Footer";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const Home = () => {
  const [userIdCookies, setUserIdCookies] = useCookies(["userId_cookies"]);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const userId = userIdCookies["userId_cookies"];
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_PATH}/user/specific/${userId}`
        );
        console.log("userstatus", response.data);
        // setGuideIdCookies("guide_id_token", response.data.guideId);

        if (response.data.status === "ban") {
          // alert("sorry you are banned");
          setStatus(true);
          setTimeout(() => navigate("/login"), 3000);
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching guide ID:", error);
      }
    };

    fetchUserId();
  }, [userId]);

  if (status) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Your account has been banned.
          </h1>
          <p className="mb-4">
            You will be redirected to the homepage shortly.
          </p>
        </div>
      </div>
    );
  }
  return (
    <Layout className="mainLayout">
      <Header>
        <AppHeader />
      </Header>
      <Outlet />
      <Footer id="footer">
        <AppFooter />
      </Footer>
    </Layout>
  );
};
export default Home;

{
  /* <Content className="mt-10">
  <Landing />
</Content>; */
}

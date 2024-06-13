import { useState } from "react";
import { Anchor, Drawer, Button } from "antd";
import Btn from "./Btn";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const { Link } = Anchor;

const menu = (
  <Menu>
    <Menu.Item key="0">
      <RouterLink
        rel="noopener noreferrer"
        to="/hawassaCity"
        className="text-xl  hover:bg-lime-400 transition-all duration-300 rounded"
      >
        Hawassa City
      </RouterLink>
    </Menu.Item>
    <Menu.Item key="1">
      <RouterLink
        rel="noopener noreferrer"
        to="/wendogenet"
        className="text-xl hover:bg-lime-400 transition-all duration-300 rounded"
      >
        Wendogenet
      </RouterLink>
    </Menu.Item>
    <Menu.Item key="3">
      <RouterLink
        rel="noopener noreferrer"
        to="/yirgalem"
        className="text-xl hover:bg-lime-400 transition-all duration-300 rounded"
      >
        Yirgalem
      </RouterLink>
    </Menu.Item>
  </Menu>
);

const eventsMenu = (
  <Menu>
    <Menu.Item key="0">
      <RouterLink
        rel="noopener noreferrer"
        to="/fiche"
        className="text-xl hover:bg-lime-400 transition-all duration-300 rounded"
      >
        Fichee Chambalala
      </RouterLink>
    </Menu.Item>
    <Menu.Item key="1">
      <RouterLink
        rel="noopener noreferrer"
        to="/stgabriel"
        className="text-xl hover:bg-lime-400 transition-all duration-300 rounded"
      >
        St.Gabriel Annual Festival
      </RouterLink>
    </Menu.Item>
  </Menu>
);

const AppHeader = () => {
  const [open, setOpen] = useState(false);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const LogOut = () => {
    setCookies("access_token", "");

    // Reload the page after 3 seconds
    setTimeout(() => {
      window.location.reload();
    }, 3000);
    navigate("/");
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="container-fluid">
      <div className="header">
        <div className="">
          <a
            href="/"
            className="dancing-script font-bold text-4xl text-lime-400"
          >
            exploreSidama
          </a>
        </div>
        <div className="mobileHidden">
          <Anchor>
            <Dropdown overlay={menu} placement="bottomRight">
              <RouterLink className="mt-1 ml-3 text-xl hover:text-lime-400 transition-all duration-300">
                Destinations <DownOutlined />
              </RouterLink>
            </Dropdown>
            <RouterLink
              to={"/hotels"}
              className="text-xl hover:text-lime-400 mt-1 ml-2 mr-1"
            >
              Hotels
            </RouterLink>
            {/* <Link to="/hotels" title="Hotels" className="text-xl" /> */}
            <Dropdown overlay={eventsMenu} placement="bottomRight">
              <RouterLink className="ant-dropdown-link text-xl hover:text-lime-400 transition-all duration-300 ml-3 mt-1">
                Events <DownOutlined />
              </RouterLink>
            </Dropdown>
            <RouterLink
              to={"/#footer"}
              className="text-xl hover:text-lime-400 mt-1 ml-2"
            >
              Contact
            </RouterLink>
          </Anchor>
        </div>
        <div className="mobileVisible">
          <Button type="primary" onClick={showDrawer} className=" bg-lime-400">
            <i className="fas fa-bars"></i>
          </Button>
          <Drawer title="TRVL" onClose={onClose} open={open}>
            <Anchor className="felx">
              <Dropdown overlay={menu} placement="bottomRight">
                <RouterLink className="ant-dropdown-link text-xl hover:text-lime-400 transition-all duration-300 ml-3 mt-1">
                  Destinations <DownOutlined />
                </RouterLink>
              </Dropdown>
              <Link to="/hotels" title="Hotels" className="text-xl" />
              <Dropdown overlay={eventsMenu} placement="bottomRight">
                <RouterLink className="ant-dropdown-link text-xl hover:text-lime-400 transition-all duration-300 ml-3">
                  Events <DownOutlined />
                </RouterLink>
              </Dropdown>
              <Link to="#footer" title="Contact" className="text-lg" />
            </Anchor>
            <div className="flex flex-col my-7 gap-4 ">
              {!cookies.access_token ? (
                <>
                  <RouterLink to="/login">
                    <Button
                      type="primary"
                      className=" bg-lime-400 ml-4 text-xl flex items-center justify-centers"
                    >
                      Login
                    </Button>
                  </RouterLink>
                  <RouterLink to="/signup">
                    <Button
                      type="primary"
                      className="ml-4 bg-lime-400  text-xl flex items-center justify-center"
                    >
                      Sign up
                    </Button>
                  </RouterLink>
                </>
              ) : (
                <Button type="primary" onClick={LogOut} className="ml-4">
                  logOut
                </Button>
              )}
            </div>
          </Drawer>
        </div>
        <div className="-mr-3.5 mobileHidden">
          <Anchor>
            <Btn />
          </Anchor>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;

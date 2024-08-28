import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Menu } from "antd";
import {
  DashboardOutlined,
  HomeOutlined,
  PoweroffOutlined,
  UserAddOutlined,
  UserOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons/lib/icons";

// import "antd/dist/antd.css";
import "antd/dist/reset.css";
import "../../App.css";
import "./adminDashboard.css";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <NavBar />

        <div className="admin-page">
          <h1 className="admin-dashboard-header">
            System Administrator Dashboard
          </h1>
          <div className="side-and-main-content">
            <div className="side-menu">
              <Menu
                onClick={({ key }) => {
                  if (key === "logout") {
                    // TO DO: I will implement Signout feature here...
                  } else {
                  }
                  navigate(key);
                }}
                defaultSelectedKeys={window.location.pathname}
                items={[
                  {
                    label: "Home",
                    icon: <HomeOutlined />,
                    key: "/",
                  },
                  {
                    label: "Dashboard",
                    icon: <DashboardOutlined />,
                    key: "/csms/admin-dashboard",
                  },

                  {
                    label: "Users",
                    icon: <UserOutlined />,
                    children: [
                      {
                        label: "Active Users",
                        icon: <UserOutlined />,
                        key: "/csms/get-users",
                      },
                      {
                        label: "Disabled Users",
                        icon: <UserDeleteOutlined />,
                        key: "/csms/get-users/disabled-users",
                      },
                      {
                        label: "Create User",
                        icon: <UserAddOutlined />,
                        key: "/csms/create-user",
                      },
                    ],
                  },

                  {
                    label: "Logout",
                    icon: <PoweroffOutlined />,
                    key: "/csms/log-out",
                    danger: true,
                  },
                ]}
              ></Menu>
            </div>
            <div className="content-section">
              <h2>Content</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt, facilis cumque reiciendis dolor vero consequatur modi,
                distinctio aliquam, nobis harum architecto earum debitis
                doloribus ratione sunt magnam veniam. Dignissimos, nihil?
              </p>{" "}
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt, facilis cumque reiciendis dolor vero consequatur modi,
                distinctio aliquam, nobis harum architecto earum debitis
                doloribus ratione sunt magnam veniam. Dignissimos, nihil?
              </p>{" "}
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt, facilis cumque reiciendis dolor vero consequatur modi,
                distinctio aliquam, nobis harum architecto earum debitis
                doloribus ratione sunt magnam veniam. Dignissimos, nihil?
              </p>{" "}
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt, facilis cumque reiciendis dolor vero consequatur modi,
                distinctio aliquam, nobis harum architecto earum debitis
                doloribus ratione sunt magnam veniam. Dignissimos, nihil?
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;

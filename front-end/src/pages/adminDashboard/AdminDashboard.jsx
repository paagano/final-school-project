import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Menu } from "antd";
// import "antd/dist/antd.css";
import "antd/dist/reset.css";
import "../../App.css";
import "./adminDashboard.css";

function AdminDashboard() {
  return (
    <>
      <div>
        <NavBar />

        <div className="admin-page">
          <h1 className="admin-dashboard-header">
            System Administrator Dashboard
          </h1>
          <div className="menu-content">
            <Menu
              items={[
                {
                  label: "Home",
                },
                {
                  label: "Admin Dashboard",
                },
                {
                  label: "Create User",
                },
                {
                  label: "Logout",
                },
              ]}
            ></Menu>
            <div className="content-section">
              Content
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

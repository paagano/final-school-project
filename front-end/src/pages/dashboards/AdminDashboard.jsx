import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar.jsx";
import { Menu } from "antd";
import {
  DashboardOutlined,
  PoweroffOutlined,
  UserAddOutlined,
  UserOutlined,
  UserDeleteOutlined,
  BranchesOutlined,
  OrderedListOutlined,
  AppstoreAddOutlined,
  CreditCardOutlined,
  CreditCardFilled,
  AccountBookOutlined,
  RotateLeftOutlined,
} from "@ant-design/icons/lib/icons";
import { Bar, Pie, Line } from "@ant-design/charts";
import "antd/dist/reset.css";
import "../../App.css";
import "./dashboards.css";

import HomePage from "../home/HomePage.jsx";
import NotFoundPage from "../notFoundPage/NotFoundPage.jsx";
import ListUsers from "../../components/users/ListUsers.jsx";
import Branches from "../../components/branches/Branches.jsx";
import CreateBranch from "../../components/branches/CreateBranch.jsx";
import ListCardTypes from "../cards/ListCardTypes.jsx";
import CreateCardType from "../cards/CreateCardType.jsx";
import Tills from "../../components/tills/Tills.jsx";
import CreateTill from "../../components/tills/CreateTill.jsx";
import CreateUser from "../register/CreateUser.jsx";
import BulkUploadUsers from "../register/BulkUploadUsers.jsx";
import ListRoles from "../../components/roles/ListRoles.jsx";
import CreateRole from "../../components/roles/CreateRole.jsx";
import Logout from "../logout/Logout.jsx";
import { UpdateUser } from "../../components/users/UpdateUser.jsx";
import DeleteUser from "../../components/users/DeleteUser.jsx";

const AdminDashboard = () => {
  const barData = [
    { category: "Users", value: 1234 },
    { category: "Branches", value: 94 },
    { category: "Tills", value: 804 },
  ];

  const barConfig = {
    data: barData,
    xField: "value",
    yField: "category",
    seriesField: "category",
    color: ["#5d9cec", "#f76c6c", "#4caf50"],
  };

  const pieData = [
    { type: "Active Users", value: 1106 },
    { type: "Inactive Users", value: 128 },
  ];

  const pieConfig = {
    data: pieData,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      content: ({ type, percent }) => `${type}: ${(percent * 100).toFixed(2)}%`,
    },
  };

  const lineData = [
    { date: "2023-09-01", value: 120 },
    { date: "2023-09-02", value: 200 },
    { date: "2023-09-03", value: 180 },
  ];

  const lineConfig = {
    data: lineData,
    xField: "date",
    yField: "value",
    smooth: true,
    color: "#4caf50",
  };

  const adminLandingPageContent = (
    <>
      <section className="dashboard-metrics">
        <div className="metric-cards">
          <div className="metric-card">
            <h3>Total Users</h3>
            <div className="metric-value">1,234</div>
            <div className="metric-chart">
              <Bar {...barConfig} /> {/* Bar chart */}
            </div>
          </div>
          <div className="metric-card">
            <h3>Active Users</h3>
            <div className="metric-value">1106</div>
            <div className="metric-chart">
              <Pie {...pieConfig} /> {/* Pie chart */}
            </div>
          </div>
          <div className="metric-card">
            <h3>Total Branches</h3>
            <div className="metric-value">94</div>
            <div className="metric-chart">
              <Line {...lineConfig} /> {/* Line chart */}
            </div>
          </div>
          <div className="metric-card">
            <h3>Total Tills</h3>
            <div className="metric-value">804</div>
            <div className="metric-chart">
              <Bar {...barConfig} /> {/* Another bar chart */}
            </div>
          </div>
          <div className="metric-card">
            <h3>Total Cards</h3>
            <div className="metric-value">4</div>
            <div className="metric-chart">
              <Pie {...pieConfig} /> {/* Pie chart */}
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const [selectedComponent, setSelectedComponent] = useState(
    adminLandingPageContent
  );

  const handleMenuClick = ({ key }) => {
    // Set the component to be rendered based on the clicked menu key:
    switch (key) {
      case "/":
        setSelectedComponent(<HomePage />);
        break;
      case "/csms/admin-dashboard":
        setSelectedComponent(adminLandingPageContent);
        break;
      case "/csms/get-all-branches":
        setSelectedComponent(<Branches />);
        break;
      case "/csms/create-branch":
        setSelectedComponent(<CreateBranch />);
        break;
      case "/csms/get-card-types":
        setSelectedComponent(<ListCardTypes />);
        break;
      case "/csms/create-card-type":
        setSelectedComponent(<CreateCardType />);
        break;
      case "/csms/get-all-tills":
        setSelectedComponent(<Tills />);
        break;
      case "/csms/create-till":
        setSelectedComponent(<CreateTill />);
        break;
      case "/csms/get-users":
        setSelectedComponent(<ListUsers />);
        break;
      case "/csms/create-user":
        setSelectedComponent(<CreateUser />);
        break;
      case "/csms/bulk-create-users":
        setSelectedComponent(<BulkUploadUsers />);
        break;
      case "/csms/update-user/:userId":
        setSelectedComponent(<UpdateUser />);
        break;
      case "/csms/delete-user/:userId":
        setSelectedComponent(<DeleteUser />);
        break;
      case "/csms/get-all-roles":
        setSelectedComponent(<ListRoles />);
        break;
      case "/csms/create-role":
        setSelectedComponent(<CreateRole />);
        break;
      case "/csms/logout":
        setSelectedComponent(<Logout />);
        break;

      default:
        setSelectedComponent(<NotFoundPage />);
    }
  };

  return (
    <>
      <div>
        <NavBar />

        <div className="admin-page">
          <div>
            <h2 className="admin-dashboard-header">
              System Administrator Dashboard
            </h2>
          </div>
          <div className="side-and-main-content">
            <div>
              <Menu
                onClick={handleMenuClick}
                defaultSelectedKeys={window.location.pathname}
                items={[
                  {
                    label: "Dashboard",
                    icon: <DashboardOutlined />,
                    key: "/csms/admin-dashboard",
                  },
                  {
                    label: "Branches",
                    icon: <BranchesOutlined />,
                    children: [
                      {
                        label: "List All Branches",
                        icon: <OrderedListOutlined />,
                        key: "/csms/get-all-branches",
                      },
                      {
                        label: "Create New Branch",
                        icon: <AppstoreAddOutlined />,
                        key: "/csms/create-branch",
                      },
                    ],
                  },
                  {
                    label: "Card Types",
                    icon: <CreditCardOutlined />,
                    children: [
                      {
                        label: "List Card Types",
                        icon: <OrderedListOutlined />,
                        key: "/csms/get-card-types",
                      },
                      {
                        label: "Create Card Type",
                        icon: <CreditCardFilled />,
                        key: "/csms/create-card-type",
                      },
                    ],
                  },
                  {
                    label: "Tills",
                    icon: <AccountBookOutlined />,
                    children: [
                      {
                        label: "Get All Tills",
                        icon: <OrderedListOutlined />,
                        key: "/csms/get-all-tills",
                      },
                      {
                        label: "Create New Till",
                        icon: <AccountBookOutlined />,
                        key: "/csms/create-till",
                      },
                    ],
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
                        label: "Create Single User",
                        icon: <UserAddOutlined />,
                        key: "/csms/create-user",
                      },
                      {
                        label: "Bulk Create Users",
                        icon: <UserAddOutlined />,
                        key: "/csms/bulk-create-users",
                      },
                    ],
                  },
                  {
                    label: "Roles",
                    icon: <RotateLeftOutlined />,
                    children: [
                      {
                        label: "List Roles",
                        icon: <OrderedListOutlined />,
                        key: "/csms/get-all-roles",
                      },
                      {
                        label: "Create New Role",
                        icon: <AppstoreAddOutlined />,
                        key: "/csms/create-role",
                      },
                    ],
                  },
                  {
                    label: "Logout",
                    icon: <PoweroffOutlined />,
                    key: "/csms/logout",
                    danger: true,
                  },
                ]}
              />
            </div>
            <div className="content-section">{selectedComponent}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

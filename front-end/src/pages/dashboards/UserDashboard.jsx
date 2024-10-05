import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar.jsx";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import {
  DashboardOutlined,
  PoweroffOutlined,
  OrderedListOutlined,
  CreditCardOutlined,
  RotateLeftOutlined,
  HomeOutlined,
  LockOutlined,
} from "@ant-design/icons/lib/icons";
import { Bar, Pie, Line } from "@ant-design/charts";
import "antd/dist/reset.css";
import "../../App.css";
import "./dashboards.css";

import NotFoundPage from "../notFoundPage/NotFoundPage.jsx";
import Logout from "../logout/Logout.jsx";
import VoultToTill from "../../components/tills/VoultToTill.jsx";
import TillToVoult from "../../components/tills/TillToVoult.jsx";
import CaptureSpoiltCard from "../cards/CaptureSpoiltCard.jsx";
import MySpoiltCards from "../cards/MySpoiltCards.jsx";
import TellerIssueCard from "../cards/TellerIssueCard.jsx";

const UserDashboard = () => {
  // User-focused dummy data for charts
  const barData = [
    { category: "Total Purchases", value: 56 },
    { category: "Favorite Categories", value: 8 },
    { category: "Support Tickets", value: 5 },
  ];

  const barConfig = {
    data: barData,
    xField: "value",
    yField: "category",
    seriesField: "category",
    color: ["#5d9cec", "#f76c6c", "#4caf50"],
  };

  const pieData = [
    { type: "Active Subscriptions", value: 3 },
    { type: "Inactive Subscriptions", value: 1 },
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
    { date: "2023-09-01", value: 5 },
    { date: "2023-09-02", value: 7 },
    { date: "2023-09-03", value: 3 },
    { date: "2023-09-04", value: 9 },
    { date: "2023-09-05", value: 6 },
  ];

  const lineConfig = {
    data: lineData,
    xField: "date",
    yField: "value",
    smooth: true,
    color: "#4caf50",
  };

  const userDashboardContent = (
    <>
      <section className="dashboard-metrics">
        <div className="metric-cards">
          <div className="metric-card">
            <h3>Total Cards</h3>
            <div className="metric-value">56</div>
            <div className="metric-chart">
              <Bar {...barConfig} />
            </div>
          </div>
          <div className="metric-card">
            <h3>Issued to Customers</h3>
            <div className="metric-value">3</div>
            <div className="metric-chart">
              <Pie {...pieConfig} />
            </div>
          </div>
          <div className="metric-card">
            <h3>Spoilt Cards</h3>
            <div className="metric-value">2</div>
            <div className="metric-chart">
              <Line {...lineConfig} />
            </div>
          </div>
          <div className="metric-card">
            <h3>Received From Voult</h3>
            <div className="metric-value">20</div>
            <div className="metric-chart">
              <Bar {...barConfig} />
            </div>
          </div>
          <div className="metric-card">
            <h3>Returned to Voult</h3>
            <div className="metric-value">36</div>
            <div className="metric-chart">
              <Pie {...pieConfig} />
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const [selectedComponent, setSelectedComponent] =
    useState(userDashboardContent);

  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    // Set the component to be rendered based on the clicked menu key:
    switch (key) {
      case "/csms/user-dashboard":
        setSelectedComponent(userDashboardContent);
        break;
      case "/csms/voult-to-till":
        setSelectedComponent(<VoultToTill />);
        break;
      case "/csms/till-to-voult":
        setSelectedComponent(<TillToVoult />);
        break;
      case "/csms/capture-spoilt-card":
        setSelectedComponent(<CaptureSpoiltCard />);
        break;
      case "/csms/my-spoilt-cards":
        setSelectedComponent(<MySpoiltCards />);
        break;
      case "/csms/teller-issue-card":
        setSelectedComponent(<TellerIssueCard />);
        break;
      case "/csms/teller-till":
        setSelectedComponent(<MySpoiltCards />);
        break;
      case "/csms/logout":
        setSelectedComponent(<Logout />);
        break;
      case "/":
        navigate("/");
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
            <h2 className="admin-dashboard-header">User Dashboard</h2>
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
                    key: "/csms/user-dashboard",
                  },
                  {
                    label: "Till Operations",
                    icon: <LockOutlined />,
                    children: [
                      {
                        label: "Receive Cards From Voult",
                        icon: <LockOutlined />,
                        key: "/csms/voult-to-till",
                      },
                      {
                        label: "Return Cards To Voult",
                        icon: <LockOutlined />,
                        key: "/csms/till-to-voult",
                      },
                    ],
                  },
                  {
                    label: "Spoilt Cards",
                    icon: <CreditCardOutlined />,
                    children: [
                      {
                        label: "Capture Spoilt Card",
                        icon: <CreditCardOutlined />,
                        key: "/csms/capture-spoilt-card",
                      },
                      {
                        label: "My Spoilt Cards",
                        icon: <OrderedListOutlined />,
                        key: "/csms/my-spoilt-cards",
                      },
                    ],
                  },
                  {
                    label: "Issue Card",
                    icon: <CreditCardOutlined />,
                    key: "/csms/teller-issue-card",
                  },
                  {
                    label: "My Stock",
                    icon: <RotateLeftOutlined />,
                    key: "/csms/teller-till",
                  },
                  {
                    label: "Home",
                    icon: <HomeOutlined />,
                    key: "/",
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

export default UserDashboard;

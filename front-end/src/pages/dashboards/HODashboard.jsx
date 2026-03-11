import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar.jsx";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import {
  DashboardOutlined,
  PoweroffOutlined,
  OrderedListOutlined,
  CreditCardOutlined,
  HomeOutlined,
  LockOutlined,
  SettingOutlined,
} from "@ant-design/icons/lib/icons";
import { Bar, Pie, Line } from "@ant-design/charts";
import "antd/dist/reset.css";
import "../../App.css";
import "./dashboards.css";

import NotFoundPage from "../notFoundPage/NotFoundPage.jsx";
import Logout from "../logout/Logout.jsx";
import TillToVoult from "../../components/tills/TillToVoult.jsx";
import CaptureSpoiltCard from "../cards/CaptureSpoiltCard.jsx";
import MySpoiltCards from "../cards/MySpoiltCards.jsx";
import TellerIssueCard from "../cards/TellerIssueCard.jsx";
import BranchMakeOrder from "../../components/orders/BranchMakeOrder.jsx";
import BranchReceiveStock from "../../components/orders/BranchReceiveStock.jsx";
import VoultToTill from "../../components/tills/VoultToTill.jsx";
import BranchSpoiltCards from "../cards/BranchSpoiltCards.jsx";
import BranchAdminCaptureSpoiltCard from "../cards/BranchAdminCaptureSpoiltCard.jsx";
import BranchTransferStock from "../../components/orders/BranchTransferStock.jsx";
import AllSpoiltCards from "../cards/AllSpoiltCards.jsx";
import HOReleaseStockToBranch from "../../components/orders/HOReleaseStockToBranch.jsx";
import HOMakeOrder from "../../components/orders/HOMakeorder.jsx";
import HOReceiveStock from "../../components/orders/HOReceiveStock.jsx";
import BranchPendingOrders from "../../components/orders/BranchPendingOrders.jsx";
import HOPendingOrders from "../../components/orders/HOPendingOrders.jsx";
import ChangePassword from "../../components/resetPassword/ChangePassword.jsx";

const HODashboard = () => {
  // Branch-Admin-focused dummy data for charts
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

  const HODashboardContent = (
    <>
      <section className="dashboard-metrics">
        <div className="metric-cards">
          <div className="metric-card">
            <h3>Branch Orders</h3>
            <div className="metric-value">56</div>
            <div className="metric-chart">
              <Bar {...barConfig} />
            </div>
          </div>
          <div className="metric-card">
            <h3>Issued to Branches</h3>
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
            <h3>Received From Branches</h3>
            <div className="metric-value">20</div>
            <div className="metric-chart">
              <Bar {...barConfig} />
            </div>
          </div>
          <div className="metric-card">
            <h3>Transit Stock</h3>
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
    useState(HODashboardContent);

  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    // Set the component to be rendered based on the clicked menu key:
    switch (key) {
      case "/csms/branch-admin-dashboard":
        setSelectedComponent(HODashboardContent);
        break;
      case "/csms/ho-make-order":
        setSelectedComponent(<HOMakeOrder />);
        break;
      case "/csms/ho-receive-order":
        setSelectedComponent(<HOReceiveStock />);
        break;
      case "/csms/ho-courier-stock":
        setSelectedComponent(<HOReleaseStockToBranch />);
        break;
      case "/csms/branch-pending-orders":
        setSelectedComponent(<BranchPendingOrders />);
        break;
      case "/csms/ho-pending-orders":
        setSelectedComponent(<HOPendingOrders />);
        break;
      case "/csms/ho-capture-spoilt-card":
        setSelectedComponent(<BranchAdminCaptureSpoiltCard />); // Change to the correct component later when the API is provided
        break;
      case "/csms/get-spoilt-cards":
        setSelectedComponent(<AllSpoiltCards />);
        break;
      case "/csms/change-password":
        setSelectedComponent(<ChangePassword />);
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
            <h2 className="admin-dashboard-header">
              Card Center Dashboard - HQ
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
                    key: "/csms/branch-admin-dashboard",
                  },
                  {
                    label: "Orders",
                    icon: <LockOutlined />,
                    children: [
                      {
                        label: "Order Cards From Printer",
                        icon: <LockOutlined />,
                        key: "/csms/ho-make-order",
                      },
                      {
                        label: "Receive Cards From Printer",
                        icon: <LockOutlined />,
                        key: "/csms/ho-receive-order",
                      },
                      {
                        label: "Branch Pending Orders",
                        icon: <LockOutlined />,
                        key: "/csms/branch-pending-orders",
                      },
                      {
                        label: "HO Pending Orders",
                        icon: <LockOutlined />,
                        key: "/csms/ho-pending-orders",
                      },
                    ],
                  },
                  {
                    label: "Transfers",
                    icon: <CreditCardOutlined />,
                    children: [
                      {
                        label: "Release Stock To Branch",
                        icon: <CreditCardOutlined />,
                        key: "/csms/ho-courier-stock",
                      },
                      {
                        label: "Receive Stock From Branch",
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
                        key: "/csms/ho-capture-spoilt-card",
                      },
                      {
                        label: "List Spoilt Cards",
                        icon: <OrderedListOutlined />,
                        key: "/csms/get-spoilt-cards",
                      },
                    ],
                  },
                  {
                    label: "Home",
                    icon: <HomeOutlined />,
                    key: "/",
                  },
                  {
                    label: "Settings",
                    icon: <SettingOutlined />,
                    children: [
                      {
                        label: "My Profile",
                        icon: <OrderedListOutlined />,
                        key: "/",
                      },
                      {
                        label: "Change Password",
                        icon: <OrderedListOutlined />,
                        key: "/csms/change-password",
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

export default HODashboard;

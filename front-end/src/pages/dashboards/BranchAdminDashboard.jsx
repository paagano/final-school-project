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
import BranchOrders from "../../components/orders/BranchOrders.jsx";
import ChangePassword from "../../components/resetPassword/ChangePassword.jsx";

const BranchAdminDashboard = () => {
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

  const branchAdminDashboardContent = (
    <>
      <section className="dashboard-metrics">
        <div className="metric-cards">
          <div className="metric-card">
            <h3>Branch Total</h3>
            <div className="metric-value">56</div>
            <div className="metric-chart">
              <Bar {...barConfig} />
            </div>
          </div>
          <div className="metric-card">
            <h3>Issued to Tellers</h3>
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
            <h3>Received From Other Branches</h3>
            <div className="metric-value">20</div>
            <div className="metric-chart">
              <Bar {...barConfig} />
            </div>
          </div>
          <div className="metric-card">
            <h3>Transfers To Other Branches</h3>
            <div className="metric-value">36</div>
            <div className="metric-chart">
              <Pie {...pieConfig} />
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const [selectedComponent, setSelectedComponent] = useState(
    branchAdminDashboardContent
  );

  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    // Set the component to be rendered based on the clicked menu key:
    switch (key) {
      case "/csms/branch-admin-dashboard":
        setSelectedComponent(branchAdminDashboardContent);
        break;
      case "/csms/branch-make-order":
        setSelectedComponent(<BranchMakeOrder />);
        break;
      case "/csms/branch-receive-order":
        setSelectedComponent(<BranchReceiveStock />);
        break;
      case "/csms/branch-transfer-stock":
        setSelectedComponent(<BranchTransferStock />);
        break;
      case "/csms/branch-orders":
        setSelectedComponent(<BranchOrders />);
        break;
      case "/csms/voult-to-till":
        setSelectedComponent(<VoultToTill />);
        break;
      case "/csms/till-to-voult":
        setSelectedComponent(<TillToVoult />);
        break;
      case "/csms/branch-admin-capture-spoilt-card":
        setSelectedComponent(<BranchAdminCaptureSpoiltCard />);
        break;
      case "/csms/branch-spoilt-cards":
        setSelectedComponent(<BranchSpoiltCards />);
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
            <h2 className="admin-dashboard-header">Branch Admin Dashboard</h2>
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
                    label: "Branch Stocks",
                    icon: <LockOutlined />,
                    children: [
                      {
                        label: "Request Stock From HQ",
                        icon: <LockOutlined />,
                        key: "/csms/branch-make-order",
                      },
                      {
                        label: "Receive Stock",
                        icon: <LockOutlined />,
                        key: "/csms/branch-receive-order",
                      },
                      {
                        label: "Transfer to Other Branch",
                        icon: <LockOutlined />,
                        key: "/csms/branch-transfer-stock",
                      },
                    ],
                  },
                  {
                    label: "Branch Orders",
                    icon: <CreditCardOutlined />,
                    key: "/csms/branch-orders",
                  },
                  {
                    label: "Till Operations",
                    icon: <CreditCardOutlined />,
                    children: [
                      {
                        label: "Issue Cards to Teller",
                        icon: <CreditCardOutlined />,
                        key: "/csms/voult-to-till",
                      },
                      {
                        label: "Receive Cards From Teller",
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
                        key: "/csms/branch-admin-capture-spoilt-card",
                      },
                      {
                        label: "Branch Spoilt Cards",
                        icon: <OrderedListOutlined />,
                        key: "/csms/branch-spoilt-cards",
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

export default BranchAdminDashboard;

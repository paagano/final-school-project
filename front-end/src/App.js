import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login/Login.jsx";
import CreateUser from "./pages/register/CreateUser.jsx";
import AdminDashboard from "./pages/dashboards/AdminDashboard.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage.jsx";
import Footer from "./pages/footer/Footer.jsx";
import ListUsers from "./components/users/ListUsers.jsx";
import {
  RouterProvider,
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import ListCardTypes from "./pages/cards/ListCardTypes.jsx";
import CreateCardType from "./pages/cards/CreateCardType.jsx";
import CreateBranch from "./components/branches/CreateBranch.jsx";
import Tills from "./components/tills/Tills.jsx";
import CreateTill from "./components/tills/CreateTill.jsx";
import Logout from "./pages/logout/Logout.jsx";
import { AuthProvider, useAuth } from "./components/auth.jsx";
import "antd/dist/reset.css";
import { UpdateUser } from "./components/users/UpdateUser.jsx";
import SelfResetPassword from "./components/resetPassword/SelfResetPassword.jsx";
import CreateRole from "./components/roles/CreateRole.jsx";
import ListRoles from "./components/roles/ListRoles.jsx";
import Branches from "./components/branches/Branches.jsx";
import GetUserDetails from "./components/users/GetUserDetails.jsx";
import DeleteUser from "./components/users/DeleteUser.jsx";
import BulkUploadUsers from "./pages/register/BulkUploadUsers.jsx";
import UserDashboard from "./pages/dashboards/UserDashboard.jsx";
import VoultToTill from "./components/tills/VoultToTill.jsx";
import TillToVoult from "./components/tills/TillToVoult.jsx";
import CaptureSpoiltCard from "./pages/cards/CaptureSpoiltCard.jsx";
import MySpoiltCards from "./pages/cards/MySpoiltCards.jsx";
import TellerIssueCard from "./pages/cards/TellerIssueCard.jsx";
import BranchAdminDashboard from "./pages/dashboards/BranchAdminDashboard.jsx";
import BranchMakeOrder from "./components/orders/BranchMakeOrder.jsx";
import BranchReceiveStock from "./components/orders/BranchReceiveStock.jsx";
import BranchSpoiltCards from "./pages/cards/BranchSpoiltCards.jsx";
import BranchAdminCaptureSpoiltCard from "./pages/cards/BranchAdminCaptureSpoiltCard.jsx";
import BranchTransferStock from "./components/orders/BranchTransferStock.jsx";
import HODashboard from "./pages/dashboards/HODashboard.jsx";
import AllSpoiltCards from "./pages/cards/AllSpoiltCards.jsx";
import HOReleaseStockToBranch from "./components/orders/HOReleaseStockToBranch.jsx";
import HOMakeOrder from "./components/orders/HOMakeorder.jsx";
import HOReceiveStock from "./components/orders/HOReceiveStock.jsx";
import BranchPendingOrders from "./components/orders/BranchPendingOrders.jsx";
import HOPendingOrders from "./components/orders/HOPendingOrders.jsx";
import BranchOrders from "./components/orders/BranchOrders.jsx";
import ChangePassword from "./components/resetPassword/ChangePassword.jsx";
// import "antd/dist/antd.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/csms/login" element={<Login />} />
        <Route path="/csms/create-user" element={<CreateUser />} />
        <Route path="/csms/bulk-create-users" element={<BulkUploadUsers />} />
        <Route path="/csms/update-user/:userId" element={<UpdateUser />} />
        <Route path="/csms/delete-user/:userId" element={<DeleteUser />} />
        <Route path="/csms/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/csms/user-dashboard" element={<UserDashboard />} />
        <Route
          path="/csms/branch-admin-dashboard"
          element={<BranchAdminDashboard />}
        />
        <Route path="/csms/HO-dashboard" element={<HODashboard />} />
        <Route path="/csms/branch-make-order" element={<BranchMakeOrder />} />
        <Route path="/csms/ho-make-order" element={<HOMakeOrder />} />
        <Route
          path="/csms/branch-receive-order"
          element={<BranchReceiveStock />}
        />
        <Route path="/csms/ho-receive-order" element={<HOReceiveStock />} />
        <Route
          path="/csms/branch-transfer-stock"
          element={<BranchTransferStock />}
        />{" "}
        <Route
          path="/csms/branch-pending-orders"
          element={<BranchPendingOrders />}
        />
        <Route path="/csms/branch-orders" element={<BranchOrders />} />
        <Route path="/csms/ho-pending-orders" element={<HOPendingOrders />} />
        <Route path="/csms/get-users" element={<ListUsers />} />
        <Route path="/csms/users/:userId" element={<GetUserDetails />} />
        <Route path="/csms/get-card-types" element={<ListCardTypes />} />
        <Route path="/csms/get-all-branches" element={<Branches />} />
        <Route path="/csms/create-branch" element={<CreateBranch />} />
        <Route path="/csms/create-card-type" element={<CreateCardType />} />
        <Route
          path="/csms/capture-spoilt-card"
          element={<CaptureSpoiltCard />}
        />
        <Route
          path="/csms/branch-admin-capture-spoilt-card"
          element={<BranchAdminCaptureSpoiltCard />}
        />
        <Route path="/csms/my-spoilt-cards" element={<MySpoiltCards />} />
        <Route
          path="/csms/branch-spoilt-cards"
          element={<BranchSpoiltCards />}
        />
        <Route
          path="/csms/ho-courier-stock"
          element={<HOReleaseStockToBranch />}
        />
        <Route path="/csms/get-spoilt-cards" element={<AllSpoiltCards />} />
        <Route path="/csms/teller-issue-card" element={<TellerIssueCard />} />
        <Route path="/csms/create-till" element={<CreateTill />} />
        <Route path="/csms/get-all-tills" element={<Tills />} />
        <Route path="/csms/voult-to-till" element={<VoultToTill />} />
        <Route path="/csms/till-to-voult" element={<TillToVoult />} />
        <Route path="/csms/create-role" element={<CreateRole />} />
        <Route path="/csms/get-all-roles" element={<ListRoles />} />
        <Route
          path="/csms/self-reset-password"
          element={<SelfResetPassword />}
        />
        <Route
          path="/csms/change-password"
          element={<ChangePassword />}
        />
        <Route path="/csms/logout" element={<Logout />} />
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

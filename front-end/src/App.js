import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login/Login.jsx";
import CreateUser from "./pages/register/CreateUser.jsx";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard.jsx";
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
// import "antd/dist/antd.css";

function App() {
  // /****************START OLD CODE*****************/
  // const route = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <HomePage />,
  //     errorElement: <NotFoundPage />,
  //   },
  //   {
  //     path: "/csms/admin-dashboard",
  //     element: <AdminDashboard />,
  //     errorElement: <NotFoundPage />,
  //   },
  //   {
  //     path: "/csms/create-user",
  //     element: <CreateUser />,
  //     errorElement: <NotFoundPage />,
  //   },
  //   {
  //     path: "/csms/login",
  //     element: <Login />,
  //     errorElement: <NotFoundPage />,
  //   },
  //   {
  //     path: "/csms/get-users",
  //     element: <ListUsers />,
  //     errorElement: <NotFoundPage />,
  //   },
  //   {
  //     path: "/csms/get-card-types",
  //     element: <ListCardTypes />,
  //     errorElement: <NotFoundPage />,
  //   },
  //   {
  //     path: "/csms/get-all-branches",
  //     element: <Branches />,
  //     errorElement: <NotFoundPage />,
  //   },
  //   {
  //     path: "/csms/create-branch",
  //     element: <CreateBranch />,
  //     errorElement: <NotFoundPage />,
  //   },
  //   {
  //     path: "/csms/create-card-type",
  //     element: <CreateCardType />,
  //     errorElement: <NotFoundPage />,
  //   },
  // ]);
  // return (
  //   <>
  //     <div className="App">
  //       <RouterProvider router={route}></RouterProvider>
  //     </div>
  //     <Footer />
  //   </>
  // );
  // /****************END OLD CODE*****************/
  //

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/csms/login" element={<Login />} />
        <Route path="/csms/create-user" element={<CreateUser />} />
        <Route path="/csms/update-user/:userId" element={<UpdateUser />} />
        <Route path="/csms/delete-user/:userId" element={<DeleteUser />} />
        <Route path="/csms/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/csms/get-users" element={<ListUsers />} />
        <Route path="/csms/users/:userId" element={<GetUserDetails />} />
        <Route path="/csms/get-card-types" element={<ListCardTypes />} />
        <Route path="/csms/get-all-branches" element={<Branches />} />
        <Route path="/csms/create-branch" element={<CreateBranch />} />
        <Route path="/csms/create-card-type" element={<CreateCardType />} />
        <Route path="/csms/create-till" element={<CreateTill />} />
        <Route path="/csms/get-all-tills" element={<Tills />} />
        <Route path="/csms/create-role" element={<CreateRole />} />
        <Route path="/csms/get-all-roles" element={<ListRoles />} />
        <Route
          path="/csms/self-reset-password"
          element={<SelfResetPassword />}
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

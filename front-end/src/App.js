import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login/Login.jsx";
import CreateUser from "./pages/register/CreateUser.jsx";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage.jsx";
import Footer from "./pages/footer/Footer.jsx";
import ListUsers from "./components/listUsers/ListUsers.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ListCardTypes from "./components/listCardTypes/ListCardTypes.jsx";
import Branches from "./components/branches/Branches.jsx";
import CreateCardType from "./pages/cards/CreateCardType.jsx";
import CreateBranch from "./components/branches/CreateBranch.jsx";
// import "antd/dist/antd.css";
import "antd/dist/reset.css";

function App() {
  const route = createBrowserRouter([
    // {
    //   path: "/csms/not-found",
    //   element: <NotFoundPage />,
    //   errorElement: <NotFoundPage />,
    // },

    {
      path: "/csms/home",
      element: <HomePage />,
      errorElement: <NotFoundPage />,
    },

    {
      path: "/csms/admin-dashboard",
      element: <AdminDashboard />,
      errorElement: <NotFoundPage />,
    },

    {
      path: "/csms/create-user",
      element: <CreateUser />,
      errorElement: <NotFoundPage />,
    },

    {
      path: "/csms/login",
      element: <Login />,
      errorElement: <NotFoundPage />,
    },

    {
      path: "/csms/get-users",
      element: <ListUsers />,
      errorElement: <NotFoundPage />,
    },

    {
      path: "/csms/get-card-types",
      element: <ListCardTypes />,
      errorElement: <NotFoundPage />,
    },

    {
      path: "/csms/get-all-branches",
      element: <Branches />,
      errorElement: <NotFoundPage />,
    },

    {
      path: "/csms/create-branch",
      element: <CreateBranch />,
      errorElement: <NotFoundPage />,
    },

    {
      path: "/csms/create-card-type",
      element: <CreateCardType />,
      errorElement: <NotFoundPage />,
    },
  ]);

  return (
    <>
      <div className="App">
        <RouterProvider router={route}></RouterProvider>
      </div>

      <Footer />
    </>
  );
}

export default App;

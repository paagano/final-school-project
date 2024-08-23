import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login/Login.jsx";
import CreateUser from "./pages/register/CreateUser.jsx";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage.jsx";
import Footer from "./pages/footer/Footer.jsx";
import ListUsers from "./components/listUsers/ListUsers.jsx";
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import ListCardTypes from "./components/listCardTypes/ListCardTypes.jsx";
import Branches from "./components/branches/Branches.jsx";
import CreateCardType from "./pages/cards/CreateCardType.jsx";
import CreateBranch from "./components/branches/CreateBranch.jsx";
// import "antd/dist/antd.css";
import "antd/dist/reset.css";
import { AuthProvider, useAuth } from "./components/auth.jsx";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
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

// function App() {
//   <AuthProvider>
//     <Routes>
//       <Route path="/csms/login" element={<Login />} />
//       <Route path="/csms/home" element={<HomePage />} />
//       <Route path="/csms/create-user" element={<CreateUser />} />
//       <Route path="/csms/admin-dashboard" element={<AdminDashboard />} />
//       <Route path="/csms/get-users" element={<ListUsers />} />
//       <Route path="/csms/get-card-types" element={<ListCardTypes />} />
//       <Route path="/csms/get-all-branches" element={<Branches />} />
//       <Route path="/csms/create-branch" element={<CreateBranch />} />
//       <Route path="/csms/create-card-type" element={<CreateCardType />} />
//     </Routes>
//
//   </AuthProvider>;
// }

// export default App;

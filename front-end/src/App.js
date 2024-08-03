import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login/Login.jsx";
import CreateUser from "./pages/register/CreateUser.jsx";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage.jsx";
import Footer from "./pages/footer/Footer.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

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
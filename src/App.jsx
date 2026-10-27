
import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./Routes/Mainlayout";
import Loading from "./components/ui/Loading";
import Error from "./components/ui/Error";
import ProtectedRoute from "./Routes/ProtectedRoute";

// Lazy-loaded pages
const Home = lazy(() => import("./components/pages/Home"));
const Trips = lazy(() => import("./components/pages/Trips"));
const TripDetail = lazy(() => import("./components/pages/TripDetail"));
const AboutUs = lazy(() => import("./components/pages/AboutUs"));
const Contact = lazy(() => import("./components/pages/Contact"));
const Login = lazy(() => import("./components/pages/LoginPage"));
const RegisterPage = lazy(() => import("./components/pages/RegisterPage"));
const BookingPage = lazy(() => import("./components/pages/BookingPage"));
const MyBookings = lazy(() => import("./components/pages/MyBookings"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      // Public pages
      {
        index: true,
        element: <Home />,
      },
      {
        path: "trips",
        element: <Trips />,
      },
      {
        path: "trips/:id",
        element: <TripDetail />,
      },
      {
        path: "aboutUs",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },

      // Protected pages
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "booking/:id",
            element: <BookingPage />,
          },
          {
            path: "myBookings",
            element: <MyBookings />,
          },
        ],
      },

      // Not found
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
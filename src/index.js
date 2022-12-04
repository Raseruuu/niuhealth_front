import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import AWSCallback, {
  loader as awsCallbackLoader,
} from "./components/AWSCallback"
import LoginAuth, { loader as loginAuthLoader } from "./components/LoginAuth"
import PatientDashboard from "./components/patient/PatientDashboard"
import "./index.css"
import ErrorPage from "./pages/ErrorPage"
import Appointment from "./pages/patient/Appointment"
import Insurance from "./pages/patient/insurance/Insurance"
import Upload from "./pages/patient/insurance/Upload"
import PatientIndexPage from "./pages/patient/PatientIndexPage"
import Profile from "./pages/patient/Profile"
import Renew from "./pages/patient/subcription/Renew"
import Subscription from "./pages/patient/subcription/Subcription"
import VirtualVisit from "./pages/patient/VirtualVisit"

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Outlet />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <LoginAuth />, loader: loginAuthLoader },
        {
          path: "patient",
          element: <PatientDashboard />,
          errorElement: <ErrorPage />,
          children: [
            { index: true, element: <PatientIndexPage /> },
            { path: "virtualvisit", element: <VirtualVisit /> },
            { path: "profile", element: <Profile /> },
            { path: "appointments", element: <Appointment /> },
            {
              path: "subscription",
              children: [
                { index: true, element: <Subscription /> },
                { path: "renew", element: <Renew /> },
              ],
            },

            {
              path: "insurance",
              children: [
                { index: true, element: <Insurance /> },
                { path: "upload", element: <Upload /> },
              ],
            },
          ],
        },
        {
          path: "cburl",
          element: <AWSCallback />,
          loader: awsCallbackLoader,
        },
      ],
    },
    { path: "404", element: <div>404. Page Not Found</div> },
    { path: "*", element: <div>404. Page Not Found</div> },
  ],
  { basename: `${process.env.PUBLIC_URL}` }
)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<RouterProvider router={router} />)

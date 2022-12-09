import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import AWSCallback, {
  loader as awsCallbackLoader,
} from "./components/AWSCallback"
import ErrorPage45 from "./components/ErrorPage45"
import LoginAuth, { loader as loginAuthLoader } from "./components/LoginAuth"
import GreenLock from "./components/lottie/LottieGreenLock"
import PatientDashboard from "./pages/patient/layout/PatientDashboard"
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
import ProviderDashboard from "./pages/provider/layout/ProviderDashboard"
import ProviderIndex from "./pages/provider/ProviderIndex"
import Patients from "./pages/provider/patient/PatientList"
import PatientProfile from "./pages/provider/patient/Profile"
import Ratings from "./pages/provider/Ratings"
import Visits from "./pages/provider/Visits"
import VisitRequest from "./pages/provider/VisitRequest"
import Clinics from "./pages/provider/Clinics"
import Services from "./pages/provider/services/Services"
import ManageServices from "./pages/provider/services/ManageServices"

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
          path: "provider",
          element: <ProviderDashboard />,
          errorElement: <ErrorPage />,
          children: [
            { index: true, element: <ProviderIndex /> },
            {
              path: "patient",
              element: <Outlet />,
              children: [
                { index: true, element: <Patients /> },
                { path: "profile", element: <PatientProfile /> },
                { path: "profile/:action", element: <PatientProfile /> },
              ],
            },
            {
              path: "ratings",
              element: <Ratings />,
            },
            {
              path: "visits",
              element: <Visits />,
            },
            {
              path: "visit-requests",
              element: <VisitRequest />,
            },
            {
              path: "clinics",
              element: <Clinics />,
            },
            {
              path: "services",
              element: <Outlet />,
              children: [
                { index: true, element: <Services /> },
                { path: "manage", element: <ManageServices /> },
              ],
            },
          ],
        },
        {
          path: "cburl",
          element: <AWSCallback />,
          loader: awsCallbackLoader,
        },
        { path: "testUi", element: <GreenLock /> },
        { path: "500", element: <ErrorPage45 statusCode={500} /> },
        { path: "404", element: <ErrorPage45 statusCode={404} /> },
      ],
    },

    { path: "*", element: <ErrorPage45 statusCode={404} /> },
  ],
  { basename: `${process.env.PUBLIC_URL}` }
)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// import 'bootstrap/dist/css/bootstrap.min.css'
import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import AWSCallback, {
  loader as awsCallbackLoader,
} from './components/AWSCallback'
import ErrorPage45 from './components/ErrorPage45'
import LoginAuth, { loader as loginAuthLoader } from './components/LoginAuth'
import GreenLock from './components/lottie/LottieGreenLock'
import { AuthProvider } from './context/AuthProvider'
import './index.css'
import ErrorPage from './pages/ErrorPage'
import Appointment from './pages/patient/Appointment'
import Insurance from './pages/patient/insurance/Insurance'
import Upload from './pages/patient/insurance/Upload'
import PatientDashboard from './pages/patient/layout/PatientDashboard'
import Checkout from './pages/patient/marketplace/Checkout'
import Marketplace from './pages/patient/marketplace/Marketplace'
import ProvidersList from './pages/patient/marketplace/ProvidersList'
import Success from './pages/patient/marketplace/Success'
import PatientIndexPage from './pages/patient/PatientIndexPage'
import Profile from './pages/patient/Profile'
import ProfileEdit from './pages/patient/ProfileEdit'
import Renew from './pages/patient/subcription/Renew'
import Subscription from './pages/patient/subcription/Subcription'
import VirtualVisit from './pages/patient/VirtualVisit'
import Clinics from './pages/provider/clinics/Clinics'
import ClinicSchedule from './pages/provider/clinics/ClinicSchedule'
import ProviderDashboard from './pages/provider/layout/ProviderDashboard'
import Patients from './pages/provider/patient/PatientList'
import PatientProfile from './pages/provider/patient/Profile'
import ProviderIndex from './pages/provider/ProviderIndex'
import Ratings from './pages/provider/Ratings'
import ManageServices from './pages/provider/services/ManageServices'
import Services from './pages/provider/services/Services'
import VisitRequest from './pages/provider/VisitRequest'
import Visits from './pages/provider/Visits'
import TellUsWhy from './pages/virtualvisit/TellUsWhy'
import WaitingRoom from './pages/virtualvisit/WaitingRoom'
const Room = lazy(() => import('./pages/virtualvisit/Room'))
const Complete = lazy(() => import('./pages/virtualvisit/Complete'))

const App = () => (
  <Suspense>
    <Outlet />
  </Suspense>
)

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />, // TODO: should be auth
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <LoginAuth />, loader: loginAuthLoader },
        {
          path: 'virtualvisit',
          element: <Outlet />,
          children: [
            { index: true, element: <TellUsWhy /> },
            { path: 'waitingroom', element: <WaitingRoom /> },
            { path: 'room', element: <Room /> },
            {
              path: 'complete/:meetingId',
              element: <Complete />,
            },
          ],
        },
        {
          path: 'patient',
          element: <PatientDashboard />,
          errorElement: <ErrorPage />,
          children: [
            { index: true, element: <PatientIndexPage /> },
            { path: 'virtualvisit', element: <VirtualVisit /> },
            {
              path: 'marketplace',
              element: <Outlet />,
              children: [
                { index: true, element: <Marketplace /> },
                { path: 'providers', element: <ProvidersList /> },
                { path: 'checkout', element: <Checkout /> },
                { path: 'success', element: <Success /> },
              ],
            },
            { path: 'profile', element: <Profile /> },
            { path: 'profilesettings', element: <ProfileEdit /> },
            { path: 'appointments', element: <Appointment /> },
            {
              path: 'subscription',
              children: [
                { index: true, element: <Subscription /> },
                { path: 'renew', element: <Renew /> },
              ],
            },

            {
              path: 'insurance',
              children: [
                { index: true, element: <Insurance /> },
                { path: 'upload', element: <Upload /> },
              ],
            },
          ],
        },
        {
          path: 'provider',
          element: <ProviderDashboard />,
          errorElement: <ErrorPage />,
          children: [
            { index: true, element: <ProviderIndex /> },
            {
              path: 'patient',
              element: <Outlet />,
              children: [
                { index: true, element: <Patients /> },
                { path: 'profile', element: <PatientProfile /> },
                { path: 'profile/:action', element: <PatientProfile /> },
              ],
            },
            {
              path: 'ratings',
              element: <Ratings />,
            },
            {
              path: 'visits',
              element: <Visits />,
            },
            {
              path: 'visit-requests',
              element: <VisitRequest />,
            },
            {
              path: 'clinics',
              element: <Outlet />,
              children: [
                { index: true, element: <Clinics /> },
                { path: 'create', element: <ClinicSchedule /> },
              ],
            },
            {
              path: 'services',
              element: <Outlet />,
              children: [
                { index: true, element: <Services /> },
                { path: 'manage/:action', element: <ManageServices /> },
              ],
            },
          ],
        },
        {
          path: 'cburl',
          element: <AWSCallback />,
          loader: awsCallbackLoader,
        },
        { path: 'testUi', element: <GreenLock /> },
        { path: '500', element: <ErrorPage45 statusCode={500} /> },
        { path: '404', element: <ErrorPage45 statusCode={404} /> },
      ],
    },

    { path: '*', element: <ErrorPage45 statusCode={404} /> },
  ],
  { basename: `${process.env.PUBLIC_URL}` }
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)

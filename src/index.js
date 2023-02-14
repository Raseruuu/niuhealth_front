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
import About from './pages/About'
import Appointment from './pages/patient/Appointment'
import Insurance from './pages/patient/insurance/Insurance'
import Upload from './pages/patient/insurance/Upload'
import PatientDashboard from './pages/patient/layout/PatientDashboard'
import Booking from './pages/patient/marketplace/Booking'
import Checkout from './pages/patient/marketplace/Checkout'
import Marketplace from './pages/patient/marketplace/Marketplace'
import ProvidersList from './pages/patient/marketplace/ProvidersList'
import Success from './pages/patient/marketplace/Success'
import PatientIndexPage from './pages/patient/PatientIndexPage'
import Profile from './components/profile/Profile'
import PaymentForm from './pages/patient/subcription/PaymentForm'
import Renew from './pages/patient/subcription/Renew'
import Subscription from './pages/patient/subcription/Subcription'
import VirtualVisit from './pages/patient/VirtualVisit'
import Clinics from './pages/provider/clinics/Clinics'
import ClinicSchedule from './components/clinics/ClinicSchedule'
import ProviderDashboard from './pages/provider/layout/ProviderDashboard'

import ProviderProfile from './pages/patient/marketplace/provider/Profile'
import Patients from './pages/provider/patient/PatientList'
import PatientProfile from './pages/provider/patient/Profile'
import ProviderIndex from './pages/provider/ProviderIndex'
import Ratings from './pages/provider/Ratings'
import ManageServices from './pages/provider/services/ManageServices'
import Services from './pages/provider/services/Services'
import VisitRequest from './pages/provider/VisitRequest'
import VisitRequestProfile from './pages/provider/VisitRequestProfile'
import Visits from './pages/provider/Visits'
import TellUsWhy from './pages/virtualvisit/TellUsWhy'
import WaitingRoom from './pages/virtualvisit/WaitingRoom'
import Login from './pages/Login'
import Register from './pages/Register'

const Verify = lazy(() => import('./pages/Verify'))
const Registration = lazy(() => import('./pages/patient/PatientRegistration'))
const Room = lazy(() => import('./pages/virtualvisit/Room'))
const Complete = lazy(() => import('./pages/virtualvisit/Complete'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminIndex = lazy(() => import('./pages/admin/AdminIndex'))
const AdminClinics = lazy(() => import('./pages/admin/clinics/Clinics'))
// AdminClinicSchedule
const AdminCompanies = lazy(() => import('./pages/admin/Companies'))
const AdminProviders = lazy(() => import('./pages/admin/Providers'))
const AdminPatients = lazy(() => import('./pages/admin/Patients'))

const AdminSettings = lazy(() => import('./pages/admin/Settings'))
// const SettingsList = lazy(() => import('./pages/admin/Settings'))
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
          path: 'login',
          element: <Login/>
        },
        {
          path: 'register',
          element: <Register/>
        },
        { path: 'registration', element: <Registration /> },
        {
          path: 'verify/:email',
          element: <Verify/>
        },
        {
          path: 'admin',
          element: <AdminDashboard />,
          errorElement: <ErrorPage />,
          children: [
            // { index: true, element: <TellUsWhy /> },
            // { path: 'waitingroom', element: <WaitingRoom /> },
            // { path: 'room', element: <Room /> },
            { index: true, element: <AdminIndex /> },
            { path: 'companies', element: <AdminCompanies /> },
            { path: 'clinics', element: <AdminClinics /> },
            {
              path: 'clinics',
              element: <Outlet />,
              children: [
                { index: true, element: <AdminClinics /> },
                { path: 'create', element: <ClinicSchedule /> },
              ],
            },
            { path: 'providers', element: <AdminProviders /> },
            { path: 'patients', element: <AdminPatients /> },
            { path: 'settings', element: <AdminSettings /> },
          ],
        },
        
        {
          path: 'patient',
          element: <PatientDashboard />,
          errorElement: <ErrorPage />,
          children: [
            { index: true, element: <PatientIndexPage /> },
            // { path: 'virtualvisit', element: <VirtualVisit /> },
            
            { path: 'virtualvisit', element: <PatientIndexPage /> },
            {
              path: 'marketplace',
              element: <Outlet />,
              children: [
                { index: true, element: <Marketplace /> },
                { path: 'providers', element: <ProvidersList /> },
                { path: 'provider/:id', element: <ProviderProfile /> },
                { path: 'booking', element: <Booking /> },
                { path: 'checkout', element: <Checkout /> },
                { path: 'success', element: <Success /> },
                
              ],
            },
            { path: 'profile', element: <Profile /> },
            { path: 'about', element: <About/>},
          
            { path: 'appointments', element: <Appointment /> },
            {
              path: 'subscription',
              children: [
                { index: true, element: <Subscription /> },
                { path: 'plans', element: <Renew /> },
                { path: 'renew', element: <Renew /> },
                { path: 'renew/pay', element: <PaymentForm /> },
                { path: 'plans/pay', element: <PaymentForm /> },
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
            { path: 'profile', element: <Profile /> },
            {
              path: 'patient',
              element: <Outlet />,
              children: [
                { index: true, element: <Patients /> },
                { path: 'profile/:id', element: <PatientProfile /> },
                { path: 'profile/:id/:action', element: <PatientProfile /> },
              ],
            },
            { path: 'about', element: <About/>},
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
              
              element: <Outlet />,
              children: [
                { index: true, element: <VisitRequest /> },
                { path: 'profile', element: <VisitRequestProfile /> }
              ],
            },
            {
              path: 'clinics',
              element: <Outlet />,
              children: [
                { index: true, element: <Clinics /> },
                { path: ':action', element: <ClinicSchedule /> },
                { path: ':action/:clinicID', element: <ClinicSchedule /> },
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

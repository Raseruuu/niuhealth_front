import { Link, NavLink, useLocation } from "react-router-dom"
import { APP_URL, AWS_BUCKET } from "../../constants"
import SideNavLogo from "./SideNavLogo"

function PatientSideNav() {
  const location = useLocation()

  return (
    <div className="left-sidenav">
      <div className="topbar-left">
        <Link to="/patient" className="logo">
          <span>
            <SideNavLogo />
          </span>
        </Link>
      </div>

      <div className="media figmaSideUser">
        <Link className="" href="#">
          <img
            src={`${APP_URL}/assets/images/users/user-1.jpg`}
            alt="user"
            className="rounded-circle thumb-md"
            onError={(e) =>
              (e.target.src = `${AWS_BUCKET}/assets/images/users/user-1.jpg`)
            }
          />
        </Link>
        <div className="media-body align-self-center ml-3">
          <p className="font-14 font-weight-bold mb-0">Amr Shawki</p>
          <p className="mb-0 font-12 text-muted">amrshawki@gmail.com</p>
        </div>
      </div>

      <div className="virtualTourSide">
        <button
          type="button"
          className="btn btn-success btn-round waves-effect waves-light figmaBigButton"
        >
          Start Your First Virtual Visit
        </button>
      </div>
      {location?.pathname === "/patient/virtualvisit" ? (
        <div
          class="spacetop alert alert-warning alert-warning-shadow mb-0 alert-dismissible fade show"
          role="alert"
        >
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">
              <i class="mdi mdi-close"></i>
            </span>
          </button>
          Sorry, we are unavailable for virtual visits from 12:00 Am to 8:00 Am.
          Please call 808-888-4800 and select option 4 to talk to a provider
        </div>
      ) : null}

      <ul className="metismenu left-sidenav-menu">
        <li>
          <NavLink to="virtualvisit">
            <i className="mdi mdi-video"></i>
            <span>Virtual Visit</span>
            <span className="menu-arrow"></span>
          </NavLink>
        </li>

        <li>
          <NavLink to="profile">
            <i className="dripicons-user"></i>
            <span>Profile</span>
            <span className="menu-arrow"></span>
          </NavLink>
        </li>
        <li>
          <NavLink to="appointments">
            <i className="mdi mdi-calendar-text"></i>
            <span>Appointments</span>
            <span className="menu-arrow"></span>
          </NavLink>
        </li>
        <li>
          <NavLink to="subscription">
            <i className="mdi mdi-credit-card"></i>
            <span>Subscription and Payment</span>
            <span className="menu-arrow"></span>
          </NavLink>
        </li>
        <li>
          <NavLink to="insurance">
            <i className="mdi mdi-home-plus"></i>
            <span>Insurance</span>
            <span className="menu-arrow"></span>
          </NavLink>
        </li>
      </ul>
      <div className="logoutDiv">
        <Link href="">Logout</Link>
      </div>
    </div>
  )
}

export default PatientSideNav

import { Link } from 'react-router-dom'
import SideNavLogo from '../../../components/SideNavLogo'
import { AWS_BUCKET } from '../../../constants'
import useAuth from '../../../hooks/useAuth'

function TopBar({ menuClick }) {
  const { auth } = useAuth()
  return (
    <div className='topbar'>
      <div className='topbar-left'>
        <Link to='/provider' className='logo'>
          <span>
            <SideNavLogo />
          </span>
        </Link>
      </div>
      <nav className='navbar-custom'>
        <ul className='list-unstyled topbar-nav float-right mb-0'>
          {/* <li className="hidden-sm">
            <Link
              className="nav-link dropdown-toggle waves-effect waves-light"
              data-toggle="dropdown"
              to=""
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              English{" "}
              <img
                src="../assets/images/flags/us_flag.jpg"
                className="ml-2"
                height="16"
                alt=""
              />{" "}
              <i className="mdi mdi-chevron-down"></i>
            </Link>
            <div className="dropdown-menu dropdown-menu-right">
              <Link className="dropdown-item" to="">
                <span> German </span>
                <img
                  src="../assets/images/flags/germany_flag.jpg"
                  alt=""
                  className="ml-2 float-right"
                  height="14"
                />
              </Link>
              <Link className="dropdown-item" to="">
                <span> Italian </span>
                <img
                  src="../assets/images/flags/italy_flag.jpg"
                  alt=""
                  className="ml-2 float-right"
                  height="14"
                />
              </Link>
              <Link className="dropdown-item" to="">
                <span> French </span>
                <img
                  src="../assets/images/flags/french_flag.jpg"
                  alt=""
                  className="ml-2 float-right"
                  height="14"
                />
              </Link>
              <Link className="dropdown-item" to="">
                <span> Spanish </span>
                <img
                  src="../assets/images/flags/spain_flag.jpg"
                  alt=""
                  className="ml-2 float-right"
                  height="14"
                />
              </Link>
              <Link className="dropdown-item" to="">
                <span> Russian </span>
                <img
                  src="../assets/images/flags/russia_flag.jpg"
                  alt=""
                  className="ml-2 float-right"
                  height="14"
                />
              </Link>
            </div>
          </li> */}

          <li className='dropdown notification-list'>
            <Link
              className='nav-link dropdown-toggle arrow-none waves-light waves-effect'
              data-toggle='dropdown'
              href='#'
              role='button'
              aria-haspopup='false'
              aria-expanded='false'
            >
              <i className='ti-bell noti-icon'></i>
              <span className='badge badge-danger badge-pill noti-icon-badge'>
                2
              </span>
            </Link>
            <div className='dropdown-menu dropdown-menu-right dropdown-lg pt-0'>
              <h6 className='dropdown-item-text font-15 m-0 py-3 bg-primary text-white d-flex justify-content-between align-items-center'>
                Notifications{' '}
                <span className='badge badge-light badge-pill'>2</span>
              </h6>
              <div className='slimscroll notification-list'>
                <Link to='' className='dropdown-item py-3'>
                  <small className='float-right text-muted pl-2'>
                    2 min ago
                  </small>
                  <div className='media'>
                    <div className='avatar-md bg-primary'>
                      <i className='la la-cart-arrow-down text-white'></i>
                    </div>
                    <div className='media-body align-self-center ml-2 text-truncate'>
                      <h6 className='my-0 font-weight-normal text-dark'>
                        Your order is placed
                      </h6>
                      <small className='text-muted mb-0'>
                        Dummy text of the printing and industry.
                      </small>
                    </div>
                  </div>
                </Link>
                <Link to='' className='dropdown-item py-3'>
                  <small className='float-right text-muted pl-2'>
                    10 min ago
                  </small>
                  <div className='media'>
                    <div className='avatar-md bg-success'>
                      <i className='la la-group text-white'></i>
                    </div>
                    <div className='media-body align-self-center ml-2 text-truncate'>
                      <h6 className='my-0 font-weight-normal text-dark'>
                        Meeting with designers
                      </h6>
                      <small className='text-muted mb-0'>
                        It is a long established fact that a reader.
                      </small>
                    </div>
                  </div>
                </Link>

                <Link to='' className='dropdown-item py-3'>
                  <small className='float-right text-muted pl-2'>
                    40 min ago
                  </small>
                  <div className='media'>
                    <div className='avatar-md bg-pink'>
                      <i className='la la-list-alt text-white'></i>
                    </div>
                    <div className='media-body align-self-center ml-2 text-truncate'>
                      <h6 className='my-0 font-weight-normal text-dark'>
                        UX 3 Task complete.
                      </h6>
                      <small className='text-muted mb-0'>
                        Dummy text of the printing.
                      </small>
                    </div>
                  </div>
                </Link>

                <Link to='' className='dropdown-item py-3'>
                  <small className='float-right text-muted pl-2'>
                    1 hr ago
                  </small>
                  <div className='media'>
                    <div className='avatar-md bg-warning'>
                      <i className='la la-truck text-white'></i>
                    </div>
                    <div className='media-body align-self-center ml-2 text-truncate'>
                      <h6 className='my-0 font-weight-normal text-dark'>
                        Your order is placed
                      </h6>
                      <small className='text-muted mb-0'>
                        It is a long established fact that a reader.
                      </small>
                    </div>
                  </div>
                </Link>

                <Link to='' className='dropdown-item py-3'>
                  <small className='float-right text-muted pl-2'>
                    2 hrs ago
                  </small>
                  <div className='media'>
                    <div className='avatar-md bg-info'>
                      <i className='la la-check-circle text-white'></i>
                    </div>
                    <div className='media-body align-self-center ml-2 text-truncate'>
                      <h6 className='my-0 font-weight-normal text-dark'>
                        Payment Successfull
                      </h6>
                      <small className='text-muted mb-0'>
                        Dummy text of the printing.
                      </small>
                    </div>
                  </div>
                </Link>
              </div>
              <Link
                to='../pages/pages-notifications.html'
                className='dropdown-item text-center text-primary'
              >
                View all <i className='fi-arrow-right'></i>
              </Link>
            </div>
          </li>

          <li className='dropdown'>
            <Link
              className='nav-link dropdown-toggle waves-effect waves-light nav-user'
              data-toggle='dropdown'
              to='#'
              role='button'
              aria-haspopup='false'
              aria-expanded='false'
            >
              <img
                src={`${AWS_BUCKET}/assets/images/users/user-1.png`}
                alt='profile-user'
                className='rounded-circle'
              />
              <span className='ml-1 nav-user-name hidden-sm'>
                {auth.name} <i className='mdi mdi-chevron-down'></i>{' '}
              </span>
            </Link>
            <div className='dropdown-menu dropdown-menu-right'>
              <Link className='dropdown-item' to='#'>
                <i className='ti-user text-muted mr-2'></i> Profile
              </Link>
              <Link className='dropdown-item' to='#'>
                <i className='ti-wallet text-muted mr-2'></i> My Wallet
              </Link>
              <Link className='dropdown-item' to='#'>
                <i className='ti-settings text-muted mr-2'></i> Settings
              </Link>
              <Link className='dropdown-item' to='#'>
                <i className='ti-lock text-muted mr-2'></i> Lock screen
              </Link>
              <div className='dropdown-divider mb-0'></div>
              <Link className='dropdown-item' to='#'>
                <i className='ti-power-off text-muted mr-2'></i> Logout
              </Link>
            </div>
          </li>
        </ul>

        <ul className='list-unstyled topbar-nav mb-0'>
          <li>
            <button
              onClick={menuClick}
              className='nav-link button-menu-mobile waves-effect waves-light'
              type={'button'}
            >
              <i className='ti-menu nav-icon'></i>
            </button>
          </li>
          {/* <li className="hide-phone app-search">
            <form role="search" className="">
              <input
                type="text"
                id="AllCompo"
                placeholder="Search..."
                className="form-control"
              />
              <Link to="">
                <i className="fas fa-search"></i>
              </Link>
            </form>
          </li> */}
        </ul>
      </nav>
    </div>
  )
}

export default TopBar

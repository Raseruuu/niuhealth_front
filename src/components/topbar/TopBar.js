import { useState } from 'react'
import { Link } from 'react-router-dom'
import SideNavLogo from '../../components/SideNavLogo'
import { AWS_BUCKET } from '../../constants'
import useAuth from '../../hooks/useAuth'
const NotifIconSwitch = (icontype ) => {
  switch (icontype) {
    case "order":
      return 
    (<div className='avatar-md bg-primary'>
      <i className='la la-cart-arrow-down text-white'></i>
    </div>);
    case "meeting":
      return 
    (<div className='avatar-md bg-success'>
    <i className='la la-group text-white'></i>
  </div>);
    default:
      return (
    <div className='avatar-md bg-primary'>
      <i className='la la-cart-arrow-down text-white'></i>
    </div>
      )
  }

}
function NotifLink({ntype,subject,body,timeReceived}){
  // console.log(notifItem)
  // console.log("body"+notifItem['body  '])
  const timeNow=20
  const timeSince=(timeNow-timeReceived) +" minutes ago"
  return(
    <Link to='' className='dropdown-item py-3'>
      <small className='float-right text-muted pl-2'>{timeSince}</small>
      <div className='media'>
          {/* <NotifIconSwitch icontype={ntype}/> */}
          
          <NotifIconSwitch icontype={ntype}/>
        <div className='media-body align-self-center ml-2 text-truncate'>
          <h6 className='my-0 font-weight-normal text-dark'>
            {subject}
          </h6>
          <small className='text-muted mb-0'>
            {body}
          </small>
        </div>
      </div>
    </Link>
  )
}
export function TopBar({ menuClick }) {
  
  const [notifs,setNotifs]=useState([
      {type:"order",subject:"Your order is placed.",body:"Dummy text",timeReceived:4},
      {type:"meeting",subject:"Meeting With Designers",body:"Lorem Ipsum",timeReceived:10},
      {type:"task",subject:"Tax Complete",body:"Dolor Sit Amet",timeReceived:10},
      {type:"order2",subject:"It is a long established fact that a reader...",body:"Dolor Sit Amet",timeReceived:10},
      {type:"success",subject:"Payment Successful",body:"The Success is in the payment.",timeReceived:10}
    ])
  //notif badge number
  const ntfBadgeNum=notifs.length
  console.log(ntfBadgeNum)
  console.log(notifs[0].type)
  const { auth } = useAuth()
  return (
    <div className='dev-top-bar'>
      <div>
        <button
          onClick={menuClick}
          className='nav-link button-menu-mobile waves-effect waves-light btn-lg'
          type={'button'}
        >
          <i className='ti-menu nav-icon'></i>
        </button>
        <Link to='/patient' className='logo'>
          <SideNavLogo style={{ width: '170px' }} />
        </Link>
      </div>

      <ul className='list-unstyled dev-top-bar-right mb-0'>
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
            {ntfBadgeNum>0&&
            <span className='badge badge-danger badge-pill noti-icon-badge'>
              {ntfBadgeNum}
            </span>
            }
            
          </Link>
          <div className='dropdown-menu dropdown-menu-right dropdown-lg pt-0'>
            <h6 className='dropdown-item-text font-15 m-0 py-3 bg-primary text-white d-flex justify-content-between align-items-center'>
              Notifications{' '}
              <span className='badge badge-light badge-pill'>{ntfBadgeNum}</span>
            </h6>
            <div className='slimscroll notification-list'>
              {
              notifs.map((notif)=>
                <NotifLink 
                  type={notif.type}
                  subject={notif.subject}
                  body= {notif.body}
                  timeReceived={notif.timeReceived}/>
              )
              }
              {/* <NotifLink /> */}
              {/* <Link to='' className='dropdown-item py-3'>
                <small className='float-right text-muted pl-2'>2 mins. ago</small>
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
                <small className='float-right text-muted pl-2'>1 hr ago</small>
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
                <small className='float-right text-muted pl-2'>2 hrs ago</small>
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
              </Link> */}
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
            <Link className='dropdown-item' to='profile'>
              <i className='ti-user text-muted mr-2'></i> Profile
            </Link>

            <Link className='dropdown-item' to='#'>
              <i className='ti-settings text-muted mr-2'></i> Settings
            </Link>

            <div className='dropdown-divider mb-0'></div>
            <Link className='dropdown-item' to='#'>
              <i className='ti-power-off text-muted mr-2'></i> Logout
            </Link>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default TopBar

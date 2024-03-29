import { useState,useEffect, } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import SideNavLogo from '../../components/SideNavLogo'
import {AWS_BUCKET, AWS_BUCKET_SERVICES, AWS_BUCKET_PROFILES } from '../../constants'
import useAuth from '../../hooks/useAuth'
import SAMPLENOTIF from '../../mocks/topbarNotifs'

import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useLogout from '../../hooks/useLogout'
import Swal from 'sweetalert2'

const NotifIconSwitch = ({ icontype }) => {
  const iconsGen = {
    order: {
      bg: 'bg-primary',
      icon: 'la-cart-arrow-down',
    },
    meeting: {
      bg: 'bg-success',
      icon: 'la-group',
    },
    success: {
      bg: 'bg-pink',
      icon: 'la-list-alt',
    },
    deliver: {
      bg: 'bg-warning',
      icon: 'la-truck',
    },
    task: {
      bg: 'bg-info',
      icon: 'la-check-circle',
    },
  }
  return (
    <div className={`avatar-md ${iconsGen[icontype].bg}`}>
      <i className={`la ${iconsGen[icontype].icon} text-white`}></i>
    </div>
  )
}
function NotifLink({ type, subject, body, timeReceived }) {
  // console.log(notifItem)
  // console.log("body"+notifItem['body  '])
  const timeNow = 20
  const timeSince = timeNow - timeReceived + ' minutes ago'
  return (
    <Link to='' className='dropdown-item py-3'>
      <small className='float-right text-muted pl-2'>{timeSince}</small>
      <div className='media'>
        {/* <NotifIconSwitch icontype={ntype}/> */}

        <NotifIconSwitch icontype={type} />
        <div className='media-body align-self-center ml-2 text-truncate'>
          <h6 className='my-0 font-weight-normal text-dark'>{subject}</h6>
          <small className='text-muted mb-0'>{body}</small>
        </div>
      </div>
    </Link>
  )
}

export function TopBar({ menuClick, homeAddress,removePfp }) {
  const logout = useLogout()
  const [notifs, setNotifs] = useState(SAMPLENOTIF)
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  const { auth,setAuth } = useAuth()
  
  const [subscribed,setSubscribed] = useState()
  const [profile, setProfile] = useState({picture:(auth.userType==='Patient'?"":""  )+"Default.jpg"})
  //notif badge number
  const ntfBadgeNum = notifs.length
  // console.log(ntfBadgeNum)
  // console.log(notifs[0].type)
  async function logoutCurrentUser(){
    await axiosPrivate
      .post(
        "signOut" ,{Email:auth.email})
      .then((res) => {
        console.log(res);
      })
      

    }
  function handleLogout(e) {
    e.preventDefault()
    Swal.fire(
      {
        icon:'question',
        html:`Are you sure you want to Logout?`,
        showConfirmButton:true,
        showCancelButton:true
      }
      )
      .then((result)=>{
        if(result.isConfirmed)
          { 
            logout()
            logoutCurrentUser()
            navigate('/login',{replace:true})
          }
        else{
          return
        }
      })
  }
  useEffect(()=>{
    
    const controller = new AbortController()
    async function getProfile() {
      if (auth.userType)
        {await axiosPrivate
          .post(
            'get'+auth.userType+'Details',
            { Email: auth.email},{signal: controller.signal}
          )
          .then((res) => {
            // console.log("userdata",res.data.Data[0])
            const { Status, Data: data = [], Message } = res.data
            if (Status) {
              setProfile(res.data.Data[0])
              // res.data.Data[0].hasInsurance
              
              sessionStorage.setItem('has_insurance',  res.data.Data[0].has_insurance)
              sessionStorage.setItem('has_subscribed',  res.data.Data[0].subscription_plan==='1')
              
            } else {
              throw new Error(Message)
            }
          })
          .catch((err) => {
            console.error(err)
          })}
      }
     
      
    // if (auth.userType==="Patient"){
      
    //   getProfile()
    // }
    // if (auth.userType==="Patient"){
      if (profile){
        getProfile()
      }
    // }
    // else if (auth.userType==="Provider"){
    //   getProviderDetails()
    // }
  },[auth])

  return (
    <div className='dev-top-bar'>
      <div style={{minWidth:'240px'}}>
        <button
          onClick={menuClick}
          className='nav-link button-menu-mobile waves-effect waves-light btn-lg'
          type={'button'}
        >
          <i className='ti-menu nav-icon'></i>
        </button>
        <Link to={homeAddress} className='logo' style={{ maxHeight:'100px',height:'auto', width: '100%', maxWidth:'170px'}}>
          <SideNavLogo style={{ maxHeight:'100px',height:'auto', width: '100%', maxWidth:'170px'}} />
        </Link>
      </div>

      <ul className='list-unstyled dev-top-bar-right mb-0'>
        {/* <li>
        <NotifLink />
        </li> */}
        <li className='dropdown'>
          {(removePfp)?<></>:<Link
            className='nav-link dropdown-toggle waves-effect waves-light nav-user'
            data-toggle='dropdown'
            to='#'
            role='button'
            aria-haspopup='false'
            aria-expanded='false'
          > 
            
            {(profile)?
             <>
             <span className='ml-1 nav-user-name hidden-sm m-4' >
              
             {(auth.userType==='Patient')?(profile.first_name):(auth.userType==='Provider')?profile.provider_name:null}
             {/*  <i className='mdi mdi-chevron-down'></i>{' '} */}
           </span>
            <img
              src={(auth.userType==='Patient')?`${AWS_BUCKET_SERVICES}profiles/pictures/${profile?.picture}`:(auth.userType==='Provider')?`${AWS_BUCKET_SERVICES}providers/${profile.picture}`:`${AWS_BUCKET}/assets/images/users/user-1.png`}
              alt='profile-user'
              className='rounded-circle'
              style={{objectFit:"cover", width:50, height:50}}
            />
            </>:null}
           
          </Link>}
          <div className='dropdown-menu dropdown-menu-right'>
            <Link className='dropdown-item' to='profile'>
              <i className='ti-user text-muted mr-2'></i> Profile
            </Link>
            <Link className='dropdown-item' to='about'>
              <i className='ti-info text-muted mr-2'></i> About
            </Link>
            {/* <Link className='dropdown-item' to='#'>
              <i className='ti-settings text-muted mr-2'></i> Settings
            </Link> */}

            <div className='dropdown-divider mb-0'></div>
            <NavLink onClick={handleLogout.bind(this)} className='dropdown-item' >
              <i className='ti-power-off text-muted mr-2'></i> Logout
            </NavLink>
            {/* <div className='logoutDiv'> */}
              {/* <Link className='ti-power-off text-muted mr-2' onClick={handleLogout.bind(this)}>Logout</Link> */}
            {/* </div> */}
          </div>
        </li>
      </ul>
    </div>
  )
}

export default TopBar

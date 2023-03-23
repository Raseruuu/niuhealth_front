import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { APP_URL, AWS_BUCKET } from '../../../constants'
import SideNavLogo from '../../../components/SideNavLogo'
import useLogout from '../../../hooks/useLogout'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

function PatientSideNav({ openSideNav,openSideIcons,removePfp }) {
  const location = useLocation()
  const navigate = useNavigate()
  const logout = useLogout()
  const [openSideNav_delayed,setOpenSideNav_delayed]=useState(openSideNav)
  const name = sessionStorage.getItem('name') || 'Welcome'
  const email = sessionStorage.getItem('email')
  const has_insurance = (sessionStorage.getItem('has_insurance'))
  const [subscribed,setSubscribed] = useState()
  const sessionuser={name:name,email:email}
  const {auth} = useAuth();
  const [isLoading,setIsLoading]=useState(true)
  const axiosPrivate = useAxiosPrivate()
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
            navigate('/login',{replace:true})
          }
        else{
          return
        }
      })
   
    
  }
  useEffect(()=>{
    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );
    const handleClick = async event => {
  
      console.log(openSideNav)
      if (openSideNav===true){
        
        await delay(400);
        setOpenSideNav_delayed(openSideNav)
      }
      else{setOpenSideNav_delayed(openSideNav)}
    };
    handleClick()
  },[openSideNav])
  useEffect(()=>{
    
    const controller = new AbortController()
    function getPatientDetails() {
      axiosPrivate
        .post(
          'getPatientDetails',
          {
            Email:auth.email||sessionStorage.getItem('email')
          },
          {signal: controller.signal}
        )
        .then((res) => {
          
          setIsLoading(false)
          console.log('res',res)
          setSubscribed(parseInt(res.data.Data[0].subscription_plan)>0)
          sessionStorage.setItem('has_insurance',res.data.Data[0].has_insurance)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  getPatientDetails()
  },[])
  return (
    <div
      className='left-sidenav'
      // style={{ display: openSideNav ? 'block' : 'none', minWidth: '308px' ,}}
      style={{ 
        display: (openSideIcons?'block':'none') , 
        marginTop: '70px' ,
        padding:'0px',
        marginTop:'70px' ,
        minWidth:'80px', 
        pxmarginLeft:'-26zpx',
        width:(openSideNav?'320px':'78px'),
        zIndex:10,
        position:(!removePfp?'unset':'absolute')}}

    >
      {/* <div className='topbar-left'>
        <Link to='/patient' className='logo'>
          <span>
            <SideNavLogo />
          </span>
        </Link>
      </div> */}

      {/* <div className='media figmaSideUser'>
        <Link className='' href='#'>
          <img
            src={`${APP_URL}/assets/images/users/user-1.jpg`}
            alt='user'
            className='rounded-circle thumb-md'
            onError={(e) =>
              (e.target.src = `${AWS_BUCKET}/assets/images/users/user-1.jpg`)
            }
          />
        </Link>
        <div className='media-body align-self-center ml-3'>
          <p className='font-14 font-weight-bold mb-0'>{name}</p>
          <p className='mb-0 font-12 text-muted'>{email}</p>
        </div>
      </div> */}
      {(openSideNav)?
      <ul className='metismenu left-sidenav-menu'>
      <li>
        <NavLink to='virtualvisit'>
          <i className='mdi mdi-video'></i>
          {(openSideNav_delayed)?
          <span>Virtual Visit</span>:<></>}
          {/* <span className='menu-arrow'>
            <i className='mdi mdi-chevron-right'></i>
          </span> */}
        </NavLink>
      </li>

      <li>
        <NavLink to='appointments'>
          <i className='mdi mdi-calendar-text'></i>
          {(openSideNav_delayed)?
          <span>Appointments</span>:<></>}
        </NavLink>
      </li>
      <li>
        <NavLink to='marketplace'>
          <i className='dripicons-medical'></i>
          {(openSideNav_delayed)?
          <span>Marketplace</span>:<></>}
        </NavLink>
      </li>
      <li>
        <NavLink to='subscription'>
          <i className='mdi mdi-credit-card'></i>
          {(openSideNav_delayed)?
          <span>Subscription & Payment</span>:<></>}
        </NavLink>
      </li>
      <li>
        <NavLink to='insurance'>
          <i className='mdi mdi-home-plus'></i>
          {(openSideNav_delayed)?
          <span>Insurance</span>:<></>}
        </NavLink>
      </li>
      <li>
        <NavLink to='profile'>
          <i className='dripicons-user'></i>
          {(openSideNav_delayed)?
          <span>Profile</span>:<></>}
        </NavLink>
      </li>
    </ul>:
     <ul className='metismenu left-sidenav-menu'>
     <li>
       <NavLink to='virtualvisit'>
        <i className='mdi mdi-video'></i>
       </NavLink>
     </li>

     <li>
       <NavLink to='appointments'>
       <i className='mdi mdi-calendar-text'></i>
       </NavLink>
     </li>
     <li>
       <NavLink to='marketplace'>
       <i className='dripicons-medical'></i>
       </NavLink>
     </li>
     <li>
       <NavLink to='subscription'>
        <i className='mdi mdi-credit-card'></i>
       </NavLink>
     </li>
     <li>
       <NavLink to='insurance'>
       <i className='mdi mdi-home-plus'></i>
       </NavLink>
     </li>
     <li>
       <NavLink to='profile'>
       <i className='dripicons-user'></i>
       </NavLink>
     </li>
   </ul>}
      {/* <div className='virtualTourSide'>
        
        <button
          disabled={isLoading}
          type='button'
          className={`btn ${(has_insurance==='true'||subscribed)?"btn-success":"btn-outline-success"}  btn-round waves-effect waves-light figmaBigButton`}
          onClick={
            () => {
              console.log(has_insurance)
              if (has_insurance==='true'||subscribed){
                navigate('/virtualvisit')
              }
              else if (has_insurance==='false'){
                
                Swal.fire({
                  html:
                  `
                  Access Virtual Visits by uploading your updated <a href='/patient/insurance'>Insurance</a>  or by <a href='/patient/subscription/plans'>Subscribing.</a>
                 
                  `})
                }
            }}
        >
          {(isLoading)?"Loading...":"Start Your Virtual Visit"}
        </button>
      </div> */}
      {/* {location?.pathname === '/patient/virtualvisit' ? (
        <div
          className='spacetop alert alert-warning alert-warning-shadow mb-0 alert-dismissible fade show'
          role='alert'
        >
          <button
            type='button'
            className='close'
            data-dismiss='alert'
            aria-label='Close'
          >
            <span aria-hidden='true'>
              <i className='mdi mdi-close'></i>
            </span>
          </button>
          Sorry, we are unavailable for virtual visits from 12:00 Am to 8:00 Am.
          Please call 808-888-4800 and select option 4 to talk to a provider
        </div>
      ) : null} */}
      <div className='logoutDiv row' style={{marginLeft:-18}}>
      <ul className='metismenu left-sidenav-menu'>
        <li>
        {(openSideNav)?
          <NavLink onClick={handleLogout.bind(this)}
            >
              <i className="fas fa-sign-out-alt"></i>
              {(openSideNav_delayed)?
              <span>Logout</span>:<></>}
            </NavLink>:
          <NavLink onClick={handleLogout.bind(this)}>
              <i className="fas fa-sign-out-alt"></i>
            </NavLink>
            }
          </li>
        </ul>
      </div>
    </div>
  )
}

export default PatientSideNav

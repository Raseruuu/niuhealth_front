
import TopBar from '../../components/topbar/TopBar'
import PatientSideNav from './layout/PatientSideNav'
import { Outlet } from 'react-router-dom'
import { useMediaQuery } from '@react-hook/media-query'
import { useEffect, useState } from 'react'
function Profile() {
  const matches = useMediaQuery('only screen and (max-width: 575.98px)')
  const [openSideNav, setOpenSideNav] = useState(!matches)
  return (
    <body>
      {/* <TopBar menuClick={() => setOpenSideNav((prev) => !prev)} /> */}
      <div
        className='figma mm-active active'
        style={{ display: 'flex', width: '100vw' }}
      >
      
      <div class="card-body  met-pro-bg">
          <div class="met-profile">
              <div class="row">
                  <div class="col-lg-4 align-self-center mb-3 mb-lg-0">
                      <div class="met-profile-main">
                          <div class="met-profile-main-pic">
                              <img src="../assets/images/users/user-4.jpg" alt="" class="rounded-circle" />
                              <span class="fro-profile_main-pic-change">
                                  <i class="fas fa-camera"></i>
                              </span>
                          </div>
                          <div class="met-profile_user-detail">
                              <h5 class="met-user-name">Ronald Gardner</h5>                                                        
                              <p class="mb-0 met-user-name-post">Confined</p>
                          </div>
                      </div>                                                
                  </div>
                  {/* <!--end col--> */}
                  <div class="col-lg-4 ml-auto">
                      <ul class="list-unstyled personal-detail">
                          <li class=""><i class="dripicons-phone mr-2 text-info font-18"></i> <b> phone </b> : +91 23456 78910</li>
                          <li class="mt-2"><i class="dripicons-mail text-info font-18 mt-2 mr-2"></i> <b> Email </b> : patient@gmail.com</li>
                          <li class="mt-2"><i class="dripicons-location text-info font-18 mt-2 mr-2"></i> <b>Location</b> : Hawaii</li>
                      </ul>
                      <div class="button-list btn-social-icon">                                                
                          <button type="button" class="btn btn-blue btn-circle">
                              <i class="fab fa-facebook-f"></i>
                          </button>

                          <button type="button" class="btn btn-secondary btn-circle ml-2">
                              <i class="fab fa-twitter"></i>
                          </button>

                          <button type="button" class="btn btn-pink btn-circle  ml-2">
                              <i class="fab fa-dribbble"></i>
                          </button>
                      </div>
                  </div>
                  {/* <!--end col--> */}
              </div>
              {/* <!--end row--> */}
          </div>
          {/* <!--end f_profile-->                                                                                 */}
      </div>
      <div class="card-body">
        <ul class="nav nav-pills mb-0" id="pills-tab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="general_detail_tab" data-toggle="pill" href="#general_detail">General</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="activity_detail_tab" data-toggle="pill" href="#activity_detail">Patient Chart</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="settings_detail_tab" data-toggle="pill" href="#settings_detail">Settings</a>
            </li>
        </ul>        
    </div>
      {/* <!--end card-body--> */}
      {/* <!--end card-body--> */}
      {/* <PatientSideNav openSideNav={openSideNav} />
      <Outlet /> */}
      </div>
    </body>
      
  )
}
export default Profile
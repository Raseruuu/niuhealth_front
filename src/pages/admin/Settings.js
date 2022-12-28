import React from 'react'
import { Link } from 'react-router-dom'
// import Footer from '../../../components/Footer'

export default function AdminSettings() {
  return (
<div class="page-wrapper">
            {/* <!-- Page Content--> */}
            <div class="page-content">

                <div class="container-fluid">
                    {/* <!-- Page-Title --> */}
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="page-title-box">
								
                                
                            </div>
                            {/* <!--end page-title-box--> */}
                        </div>
                        {/* <!--end col--> */}
                    </div>
                    {/* <!-- end page title end breadcrumb --> */}
					
					
					
                    <div class="row">
					
						<div class="col-lg-3">
							
            <ul class="metismenu left-sidenav-menu nuGeneralMenu">
                <li>
                    <a href="settings-general.html"><i class="ti-bar-chart"></i><span>General</span></a>
                </li>
			
				 <li>
                    <a href="settings-password.html"><i class="fas fa-user-friends"></i><span>Change Password</span></a>
                </li>
				 <li class="active">
                    <a href="settings-account.html"><i class="far fa-star"></i><span>Account</span></a>
                </li>
				 
			</ul>
			{/* </ul> */}
						</div>
                    
						<div class="col-lg-12 col-xl-9 mx-auto">
							
							<div class="card">
                                                <div class="card-body">
												
												<h4>Deactivate your account?</h4>
												
        
                                                    <div>
                                                        <form class="form-horizontal form-material mb-0">
															
															<div class="form-group row">
                                                                <div class="col-md-12">
																	If you want to permanenetly deactivate your NU Health account, let us know. Your account will be deleted after 30 days. Once the deactivating process begins, you won't be able to reactivate or retrieve any of the content or information you have added.
               
                                                                </div>
                                                            </div>
                                                            
                                                            
                                                            <div class="form-group">
                                                               
                                                                <button class="btn btn-gradient-danger btn-sm px-4 mt-3 mb-0">Deactivate Account</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>                                            
                                            </div>
						</div>
					
					</div>
 

					

                </div>
                {/* <!-- container --> */}

                <footer class="footer text-center text-sm-left">
                    &copy; 2022 NU Health 
                </footer>
                {/* <!--end footer--> */}
            </div>
         {/* <!-- end page content --> */}
        </div>
        // <!-- end page-wrapper -->






    )
  }
  
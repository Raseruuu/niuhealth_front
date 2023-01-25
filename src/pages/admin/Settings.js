import React from 'react'
import { Link } from 'react-router-dom'
// import Footer from '../../../components/Footer'

export default function AdminSettings() {
  return (
<div className="page-wrapper">
            {/* <!-- Page Content--> */}
            <div className="page-content">

                <div className="container-fluid">
                    {/* <!-- Page-Title --> */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="page-title-box">
								
                                
                            </div>
                            {/* <!--end page-title-box--> */}
                        </div>
                        {/* <!--end col--> */}
                    </div>
                    {/* <!-- end page title end breadcrumb --> */}
					
					
					
                    <div className="row">
					
						<div className="col-lg-3">
							
            <ul className="metismenu left-sidenav-menu nuGeneralMenu">
                <li>
                    <a href="settings-general.html"><i className="ti-bar-chart"></i><span>General</span></a>
                </li>
			
				 <li>
                    <a href="settings-password.html"><i className="fas fa-user-friends"></i><span>Change Password</span></a>
                </li>
				 <li className="active">
                    <a href="settings-account.html"><i className="far fa-star"></i><span>Account</span></a>
                </li>
				 
			</ul>
			{/* </ul> */}
						</div>
                    
						<div className="col-lg-12 col-xl-9 mx-auto">
							
							<div className="card">
                                                <div className="card-body">
												
												<h4>Deactivate your account?</h4>
												
        
                                                    <div>
                                                        <form className="form-horizontal form-material mb-0">
															
															<div className="form-group row">
                                                                <div className="col-md-12">
																	If you want to permanenetly deactivate your NU Health account, let us know. Your account will be deleted after 30 days. Once the deactivating process begins, you won't be able to reactivate or retrieve any of the content or information you have added.
               
                                                                </div>
                                                            </div>
                                                            
                                                            
                                                            <div className="form-group">
                                                               
                                                                <button className="btn btn-gradient-danger btn-sm px-4 mt-3 mb-0">Deactivate Account</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>                                            
                                            </div>
						</div>
					
					</div>
 

					

                </div>
                {/* <!-- container --> */}

                <footer className="footer text-center text-sm-left">
                    &copy; 2022 NU Health 
                </footer>
                {/* <!--end footer--> */}
            </div>
         {/* <!-- end page content --> */}
        </div>
        // <!-- end page-wrapper -->






    )
  }
  
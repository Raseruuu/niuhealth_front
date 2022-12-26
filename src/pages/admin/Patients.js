import React from 'react'
import { Link } from 'react-router-dom'
// import Footer from '../../../components/Footer'

export default function AdminPatients() {
  return (
<div class="page-wrapper">
            {/* <!-- Page Content--> */}
            <div class="page-content">

                <div class="container-fluid">
                    {/* <!-- Page-Title --> */}
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="page-title-box">
                                <div class="float-right">
                                    <a href="manage_patients.html"><button type="button" class="btn btn-success waves-effect waves-light">New Patient</button></a>
                                </div>
                                <h4 class="page-title">Patients</h4>
                            </div>
                            {/* <!--end page-title-box--> */}
                        </div>
                        {/* <!--end col--> */}
                    </div>
                    {/* <!-- end page title end breadcrumb --> */}
 

 
					<div class="row ">                               
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                 
								 
								 
								 <div class="">
                                        <table id="datatable2" class="table dt-responsive nowrap" style={{borderCollapse: "collapse", borderSpacing: 0, width: "100%"}}>
                                            <thead>
                                            <tr>
												<th>Patient</th>
                                                <th>Email</th>
                                                <th>Phone No</th>
                                                <th>Address</th>
                                            </tr>
                                            </thead>


                                            <tbody>
                                            <tr>
                                                <th><a href="manage_patients.html"><img src="../assets/images/users/user-10.jpg" alt="user" class="thumb-sm rounded-circle"/> Danica Stoudomaire </a></th>
                                                <th>xyx@gmail.com</th>
												<th>+123456789</th>
                                                <th>Sample address in here</th>
                                            </tr>
                                            <tr>
                                                <th><a href="manage_patients.html"><img src="../assets/images/users/user-10.jpg" alt="user" class="thumb-sm rounded-circle"/> Matt Rosales </a></th>
                                                <th>xyx@gmail.com</th>
												<th>+123456789</th>
                                                <th>Sample address in here</th>
                                            </tr>
                                            <tr>
                                                <th><a href="manage_patients.html"><img src="../assets/images/users/user-10.jpg" alt="user" class="thumb-sm rounded-circle"/> Michael Hill </a></th>
                                                <th>xyx@gmail.com</th>
												<th>+123456789</th>
                                                <th>Sample address in here</th>
                                            </tr>
                                            <tr>
                                                <th><a href="manage_patients.html"><img src="../assets/images/users/user-10.jpg" alt="user" class="thumb-sm rounded-circle"/> Nancy Flanary </a></th>
                                                <th>xyx@gmail.com</th>
												<th>+123456789</th>
                                                <th>Sample address in here</th>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>        
								 
								 
								 
									
								</div>
                                {/* <!--end card-body--> */}
                            </div>
                            {/* <!--end card--> */}
                        </div>
                        {/* <!--end col-->                         */}
                    </div>
                    {/* <!--end row--> */}
					
					
					

                </div>
                {/* <!-- container --> */}

                <footer class="footer text-center text-sm-left">
                    &copy; 2022 NU Health 
                </footer>
                {/* <!--end footer--> */}
            </div>
            {/* <!-- end page content --> */}
        </div>
    






    )
  }
  
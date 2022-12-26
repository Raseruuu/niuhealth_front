import React from 'react'
import { Link } from 'react-router-dom'
// import Footer from '../../../components/Footer'

export default function AdminProviders() {
  return (
<div class="page-wrapper">
            {/* <!-- Page Content--> */}
            <div class="page-wrapper">
            {/* <!-- Page Content--> */}
            <div class="page-content">

                <div class="container-fluid">
                    {/* <!-- Page-Title --> */}
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="page-title-box">
                                <div class="float-right">
                                    <a href="manage_provider.html"><button type="button" class="btn btn-success waves-effect waves-light">New Provider</button></a>
                                </div>
                                <h4 class="page-title">Providers</h4>
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
												<th>Provider Name</th>
                                                <th>Clinics</th>
                                                <th>Specialty</th>
                                                <th>Ratings</th>
                                            </tr>
                                            </thead>


                                            <tbody>
                                            <tr>
                                                <th><a href="manage_provider.html"><img src="../assets/images/users/user-10.jpg" alt="user" class="thumb-sm rounded-circle"/> Dr. Joseph Albert Nefarior </a></th>
                                                <th>Maxicare Centris<br/>Sese Dental Clinic</th>
												<th>Pediatrician, Gastrologist</th>
                                                <th>3.9</th>
                                            </tr>
                                            <tr>
                                                <th><a href="manage_provider.html"><img src="../assets/images/users/user-10.jpg" alt="user" class="thumb-sm rounded-circle"/> Dra. Janice De Leon </a></th>
                                                <th>XYZ Clinic</th>
												<th>Surgeon, ENT</th>
                                                <th>4.7</th>
                                            </tr>
                                            <tr>
                                                <th><a href="manage_provider.html"><img src="../assets/images/users/user-10.jpg" alt="user" class="thumb-sm rounded-circle"/> Dr. Martin Sese </a></th>
                                                <th>Sese Dental Clinic</th>
												<th>Dentist</th>
                                                <th>5.0</th>
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
        {/* <!-- end page-wrapper --> */}
        </div>






    )
  }

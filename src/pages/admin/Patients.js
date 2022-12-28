import React, { useState }  from 'react'
import { Link } from 'react-router-dom'
// import Footer from '../../../components/Footer'


function PatientItem({name,email,contactnum,address}){
    
    return(
        <tr>
        <th><a href="manage_patients.html">
            <img src="../assets/images/users/user-10.jpg" alt="user" class="thumb-sm rounded-circle"/>
            {name}</a></th>
        <th>{email}</th>
        <th>{contactnum}</th>
        <th>{address}</th>
        </tr>
 
 )}
export default function AdminPatients() {
    const [patientsList,setPatientsList] = useState([
        {
            name :"Danica Stoudomaire",
            contactnum:"+63911 1111 1111",
            email: "prime@numberone.com.ph",
            address:"One street block 1 lot 1 Brgy. 1 Area 1"
        },
        {
            name :"Matt Rosales",
            contactnum:"+63911 1111 1111",
            email: "prime@numberone.com.ph",
            address:"Sample Address"
        },
        {
            name :" Michael Hill",
            contactnum:"+63911 1111 1111",
            email: "prime@numberone.com.ph",
            address:"Sampress Addle"
        },
        {
            name :"Nancy Flanary",
            contactnum:"+63911 1111 1111",
            email: "xyx@gmail.com",
            address:"Address Sample"
        }
        ]
    )
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
                                            {patientsList.map((patient)=>
                                                    <PatientItem {...patient} />
                                                    )}
                                           
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
  
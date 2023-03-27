import React, { useState }  from 'react'
import { Link } from 'react-router-dom'
// import Footer from '../../../components/Footer'


function PatientItem({name,email,contactnum,address}){
    
    return(
        <tr>
        <th><a href="manage_patients.html">
            <img src="../assets/images/users/user-10.jpg" alt="user" className="thumb-sm rounded-circle"/>
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
<div className="page-wrapper">
            {/* <!-- Page Content--> */}
            <div className="page-content">

                <div className="container-fluid">
                    {/* <!-- Page-Title --> */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="page-title-box">
                                <div className="float-right">
                                    <a href="manage_patients.html"><button type="button" className="btn btn-success waves-effect waves-light">New Patient</button></a>
                                </div>
                                <h4 className="page-title">Patients</h4>
                            </div>
                            {/* <!--end page-title-box--> */}
                        </div>
                        {/* <!--end col--> */}
                    </div>
                    {/* <!-- end page title end breadcrumb --> */}
 

 
					<div className="row ">                               
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                 
								 
								 
								 <div className="">
                                        <table id="datatable2" className="table dt-responsive nowrap" style={{borderCollapse: "collapse", borderSpacing: 0, width: "100%"}}>
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

                <footer className="footer text-center text-sm-left">
                    &copy; 2022 NIU Health 
                </footer>
                {/* <!--end footer--> */}
            </div>
            {/* <!-- end page content --> */}
        </div>
    






    )
  }
  
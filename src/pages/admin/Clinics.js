import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import Footer from '../../../components/Footer'
import SAMPLECLINICS from '../../mocks/adminlists'

function ClinicItem({name,company,contactnum,email,address,providers,dateCreated}){
    
    return(
        <tr>
            <th><a href="manage_clinic.html">
                {name}
                </a></th>
            <th>{company}</th>
            <th>{contactnum}</th>
            <th>{email}</th>
            <th>{address}</th>
            <th>{providers}</th>
            <th>{dateCreated}</th>
        </tr>
        
    )}
    

export default function AdminClinics() {
    const [clinicsList,setClinicsList] = useState([
        {
            name :"Clinic One",
            company:"Uno Corporation",
            contactnum:"+63911 1111 1111",
            email: "prime@numberone.com.ph",
            address:"One street block 1 lot 1 Brgy. 1 Area 1",
            providers:1,
            dateCreated:"11/11/2011"
        },
        {
            name :"Maxicare Clinic",
            company:"Maxicare Corporation",
            contactnum:"+63919 4569 2311",
            email: "maxicare@maxicare.com.ph",
            address:"Sample address in here",
            providers:2,
            dateCreated:"11/29/2022"
        },
        {
            name :"Tres Clinic",
            company:"Three Corporation",
            contactnum:"+6394 5648 2214",
            email: "a@basdasd.com.ph",
            address:"Sample address in here",
            providers:10,
            dateCreated:"11/29/2022"
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
                                    <a href="manage_clinic.html"><button type="button" className="btn btn-success waves-effect waves-light">New Clinic</button></a>
                                </div>
                                <h4 className="page-title">Clinics</h4>
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
                                 
								  <div className="row" style={{marginBottom: "30px"}}>
                                        <div className="col-lg-3">
											<label for="example-text-input" className="col-form-label text-right">Company</label>
											<select className="form-control">
                                                <option>Maxicare Corporation</option>
                                                <option>The Ogamo Institute</option>
                                                <option>St. Luke Group</option>
                                            </select>
										</div>
										<div className="col-lg-3">
											<label for="example-text-input" className="col-form-label text-right">Location</label>
											<select className="form-control">
                                                <option>Location Name 1</option>
                                                <option>Location Name 2</option>
                                                <option>Location Name 3</option>
                                            </select>
										</div>	
										
									</div>
								 
								 <div className="">
                                        <table 
                                          id="datatable2" 
                                          className="table dt-responsive nowrap" 
                                          style={{borderCollapse: 'collapse', borderSpacing: 0, width: "100%"}}>
                                            <thead>
                                            <tr>
												<th>Clinic Name</th>
                                                <th>Company</th>
                                                <th>Contact Info</th>
                                                <th>Email</th>
                                                <th>Address</th>
												<th>Providers</th>
                                                <th>Date Created</th>
                                            </tr>
                                            </thead>
                                           
                                            <tbody>
                                            
                                                {clinicsList.map((clinic)=>
                                                    <ClinicItem {...clinic} />
                                                    )}

                                                {/* <tr>
                                                    <th><a href="manage_clinic.html">Maxicare Centris</a></th>
                                                    <th>Maxicare Corporation</th>
                                                    <th>+63 8765 4321</th>
                                                    <th>centris@maxicare.com.ph</th>
                                                    <th>Sample address in here</th>
                                                    <th>10</th>
                                                    <th>11/29/2022</th>
                                                </tr>*/}  
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
                    &copy; 2022 NU Health 
                </footer>
                {/* <!--end footer--> */}
            </div>
            {/* <!-- end page content --> */}
        </div>
        // <!-- end page-wrapper -->






    )
  }
  
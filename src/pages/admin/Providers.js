import React,{useState} from 'react'
import { Link } from 'react-router-dom'
// import Footer from '../../../components/Footer'
function ProviderItem({name,clinics,specialty,rating}){
    
    return(
        <tr>
            <th><a href="manage_provider.html">
                <img src="../assets/images/users/user-10.jpg" alt="user" class="thumb-sm rounded-circle"/>
            {name} </a></th>
            <th>{clinics}</th>
            <th>{specialty}</th>
            <th>{rating}</th>
        </tr>
    )}
export default function AdminProviders() {
    const [providerList,setProviderList] = useState([
        {
            name :"Dr. Joseph Albert Nefarior",
            clinics:"Maxicare Centris, Sese Dental Clinic",
            specialty:"Pediatrician, Gastrologist",
            rating: "3.9",
        },
        {
            name :"Dra. Janice De Leon",
            clinics:" XYZ Clinic",
            specialty:"Surgeon, ENT",
            rating: "4.7",
        },
        {
            name :"Dr. Martin Sese",
            clinics:"Sese Dental Clinic",
            specialty:"Dentist",
            rating: "5.0",
        },
        ]
    )
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
                                            {providerList.map((provider)=>
                                                    <ProviderItem {...provider} />
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
        {/* <!-- end page-wrapper --> */}
        </div>






    )
  }

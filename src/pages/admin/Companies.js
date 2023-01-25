import React, { useState } from 'react'

function CompanyItem({name,contactnum,email,address,clinics,providers,dateCreated}){
    
    return(
        <tr>
            <th><a href="manage_clinic.html">
                {name}
                </a></th>
            <th>{contactnum}</th>
            <th>{email}</th>
            <th>{address}</th>
            <th>{clinics}</th>
            <th>{providers}</th>
            <th>{dateCreated}</th>
        </tr>
    )}
export default function AdminCompanies() {
    const [companylist,setCompanyList] = useState([
        {
            name :"Uno Corporation",
            contactnum:"+63911 1111 111",
            email: "prime@numberone.com.ph",
            address:"One street block 1 lot 1 Brgy. 1 Area 1",
            clinics:11,
            providers:1,
            dateCreated:"11/11/2011"
        },
        {
            name :"Dos Corporation",
            contactnum:"+63922 222 2222",
            email: "Biduo@segunda.com",
            address:"#2 Dalawa street Brgy. 2 ",
            clinics:2,
            providers:2,
            dateCreated:"2/2/2022"
        },
        {
            name :"Maxicare Corporation",
            contactnum:"+63999 999 9999",
            email: "Maxicare@maxicare.com.ph",
            address:"Sample Address Here",
            clinics:4,
            providers:10,
            dateCreated:"3/2/2022"
        },
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
                                    <a href="manage_companies.html"><button type="button" className="btn btn-success waves-effect waves-light">New Company</button></a>
                                </div>
                                <h4 className="page-title">Companies</h4>
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
                                        <table id="datatable2" className="table dt-responsive nowrap" style={{borderCollapse: "collapse", borderSpacing: 0, width: "100%"}} >
                                            <thead>
                                            <tr>
                                                <th>Company Name</th>
                                                <th>Contact Info</th>
                                                <th>Email</th>
                                                <th>Address</th>
                                                <th>Clinics</th>
                                                <th>Providers</th>
                                                <th>Date Created</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {companylist.map((company)=>
                                                    <CompanyItem {...company} />
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
                    &copy; 2022 NU Health 
                </footer>
                {/* <!--end footer--> */}
            </div>
            {/* <!-- end page content --> */}
        </div>
        // <!-- end page-wrapper -->






    )
  }
  
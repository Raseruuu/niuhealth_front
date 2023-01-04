import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import TableCard, { TableTitle } from "../../components/table/Tables"

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
    <div class="page-wrapper">
        <div class="page-content">

                <div class="container-fluid">
                    <TableTitle title="Providers">
                        <div class="float-right">
                            <a href="manage_provider.html"><button type="button" class="btn btn-success waves-effect waves-light">New Provider</button></a>
                        </div>
                    {/* <!-- Page-Title --> */}
                    </TableTitle>
                    <TableCard headers={["Provider Name","Clinics","Specialty","Ratings"]}>
                       {providerList.map((provider)=>
                        <ProviderItem {...provider} />
                        )}
                    </TableCard >    
                </div>
                <Footer/>
        </div>
    </div>
</div>
    )
}

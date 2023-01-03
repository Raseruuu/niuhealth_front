import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import PatientListData from "../../../components/provider/PatientListData"
import { AWS_BUCKET } from "../../../constants"
import useAuth from "../../../hooks/useAuth"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"
import useDebounce from "../../../hooks/useDebounce"

// Provider list of patients
function PatientList() {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [list, setList] = useState([])
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search,500)
  /*
  For Status:
  Confined -  badge-soft-purple
  Deceased - badge-soft-danger
  Follow-up Checkup - badge-soft-success
  */
  useEffect(
    () => {
      localStorage.setItem("search", search);
      console.log(search)
      // add search request here
    },
    [debouncedSearch]
  )
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='page-title-box'>
            <h4 className='page-title'>Patients</h4>
            {/* <form role="search" class="">
                <input type="text" id="AllCompo" placeholder="Search..." class="form-control"/>
                <a href=""><i class="fas fa-search"></i></a>
            </form> */}
            <div className="float-right">
              <div className='input-group' style={{paddingTop:"10px",paddingBottom:"10px"}}>
                <form role="search" class="">
                  <input
                    type='text'
                    className='form-control'
                    style = {{maxWidth:'300px'}}
                    placeholder='Search Patients...'
                    aria-label='Search Patients...'
                    onChange={e => {
                      setSearch(e.target.value)
                    }}
                    value={search}/>
                </form>
                <span className='input-group-append'>
                  <button className='btn btn-success' type='button'>
                    <i class="fas fa-search"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='table-responsive'>
                <table className='table'>
                  <thead className='thead-light'>
                    <tr>
                      <th>Patient</th>
                      <th>Email</th>
                      <th>Phone No</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    <PatientListData />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PatientList

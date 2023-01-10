import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import PatientListData from "../../../components/provider/PatientListData"
import TableCard, { TableTitle } from "../../../components/table/Tables"
// import   from "../../../components/table/Tables"
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
  const [searchText, setSearchText] = useState("")
  const debouncedSearch = useDebounce(search,500)
  /*
  For Status:
  Confined -  badge-soft-purple
  Deceased - badge-soft-danger
  Follow-up Checkup - badge-soft-success
  */
  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(event.inputs);
    
    setSearch(searchText)
  }
  useEffect(
    () => {
        localStorage.setItem("search", search);
        // console.log(search)
        // add search request here
        
      },
      [debouncedSearch]
    )
  
  return (
    <div className='container-fluid'>
      <TableTitle title="Patients">
        <div className="float-right">
          <div className='input-group' style={{paddingTop:"10px",paddingBottom:"10px"}}>
            <form role="search" class="" onSubmit={handleSubmit}>
              <input
                type='text'
                className='form-control'
                style = {{maxWidth:'300px'}}
                placeholder='Search Patients...'
                aria-label='Search Patients...'
                onSubmit={() => {
                  handleSubmit()
                }}
                onChange={e => {
                  setSearchText(e.target.value)
                }}/>
                
            </form>
            <span className='input-group-append'>
              <button className='btn btn-success' type='submit' >
                <i class="fas fa-search"></i>
              </button>
            </span>
          </div>
        </div>
      </TableTitle>
      <TableCard headers={["Patient","Email","Phone No.","Status","Insurance"]}>
        <PatientListData limit={10} search={search}/>  
      </TableCard>    
    </div>
  )
}
export default PatientList

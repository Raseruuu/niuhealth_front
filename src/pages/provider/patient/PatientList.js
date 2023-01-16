import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PatientListData from '../../../components/provider/PatientListData'
import TableCard, { ContainerFluid, TableTitle } from '../../../components/table/Tables'
// import   from "../../../components/table/Tables"
import { AWS_BUCKET } from '../../../constants'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import useDebounce from '../../../hooks/useDebounce'
import Pagination from "react-js-pagination";
// Provider list of patients
function handlePageChange(pageNumber) {
  console.log(`active page is ${pageNumber}`);
  // this.setState({activePage: pageNumber});
}
function PatientList() {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [list, setList] = useState([])
  const [search, setSearch] = useState('')
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  /*
  For Status:
  Confined -  badge-soft-purple
  Deceased - badge-soft-danger
  Follow-up Checkup - badge-soft-success
  */
 
 
  async function getList() {
    const controller = new AbortController()
    setIsLoading(true)

    await axiosPrivate
      .post(
        searchText ? 'searchPatient' : 'getPatients',
        { Email: auth.email, Search: searchText },
        {
          signal: controller.signal,
        }
      )
      .then((res) => {
        setIsLoading(false)
        console.log(res)
        const { Data = [] } = res.data
        setList(Data)
      })
      .catch((err) => {
        setIsLoading(false)
        console.error(err)
        setErrMsg(err.message)
      })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (searchText.length < 3) {
      return
    }

    await getList()
  }

  useEffect(() => {
    if (searchText?.length === 0) {
      getList()
    }
  }, [searchText])

  useEffect(() => {
    getList()
  }, [])

  return (
    <ContainerFluid>
      <TableTitle title="Patients">
        <div className="float-right">
          <form onSubmit={handleSubmit}>
            
            <div
              className="input-group"
              style={{ paddingTop: '10px', paddingBottom: '10px' }}
            >
              <input
                type="text"
                className="form-control"
                style={{ maxWidth: '300px' }}
                placeholder="Search Patients..."
                aria-label="Search Patients..."
                onChange={(e) => setSearchText(e.target.value)}
              />

              <span className="input-group-append">
                <button className="btn btn-success" type="submit">
                  <i class="fas fa-search"></i>
                </button>
              </span>
            </div>
          </form>
        </div>
      </TableTitle>
      <TableCard
        headers={[
          'Patient',
          'Email',
          'Phone No.',
          'Status',
          'Insurance',
        ]}
      >
        <PatientListData limit={10} list={list} />
        {isLoading ? 'Loading please wait...' : null}
        {errMsg ? <span style={{ color: 'red' }}>{errMsg}</span> : null}
        {list.length <= 0 && searchText.length > 0
          ? '0 record found.'
          : null}
        <Pagination
          activePage={1}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          itemClass="page-item"
          linkClass="page-link"
          // onChange={this.handlePageChange.bind(this)}
        />
      </TableCard>
      
    </ContainerFluid>
  )
}
export default PatientList

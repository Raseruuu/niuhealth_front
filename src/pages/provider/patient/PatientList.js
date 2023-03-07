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
import { CardLongItem } from '../../../components/cards/Card'
// Provider list of patients

function PatientList() {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [list, setList] = useState([])
  const [search, setSearch] = useState('')
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [pageNum,setPageNum]=useState(1)
  const [pageLimit,setPageLimit]=useState(10)

  // itemsCountPerPage
  /*
  For Status:
  Confined -  badge-soft-purple
  Deceased - badge-soft-danger
  Follow-up Checkup - badge-soft-success
  */
 
  const [dummylist,setDummyList] = useState([
    {address: "1111111",
    contact_info: "+639774011554",
    date_of_birth: "1996-01-27",
    email: "patient2@gmail.com",
    first_name: "11111",
    last_name: "Walker",
    middle_name: "Grayman",
    patient_id: "63a551c0565d9",
    picture: "63a551c0565d9.24bf99b46f8b496caf28d888a072f6ff63c66148b53b9.webp",
    status: "1",
    subscription_plan: "3",
    with_insurance: null},
    {address: "2222222",
    contact_info: "+639774011554",
    date_of_birth: "1996-01-27",
    email: "patient2@gmail.com",
    first_name: "22222",
    last_name: "Man",
    middle_name: "Dude",
    patient_id: "63a551c0565d9",
    picture: "63a551c0565d9.24bf99b46f8b496caf28d888a072f6ff63c66148b53b9.webp",
    status: "1",
    subscription_plan: "3",
    with_insurance: null}
    ,
    {address: "33333",
    contact_info: "+639774011554",
    date_of_birth: "1996-01-27",
    email: "patient2@gmail.com",
    first_name: "33333",
    last_name: "Walker",
    middle_name: "Grayman",
    patient_id: "63a551c0565d9",
    picture: "63a551c0565d9.24bf99b46f8b496caf28d888a072f6ff63c66148b53b9.webp",
    status: "1",
    subscription_plan: "3",
    with_insurance: null}
    ,
    {address: "Test Address",
    contact_info: "+639774011554",
    date_of_birth: "1996-01-27",
    email: "patient2@gmail.com",
    first_name: "44444",
    last_name: "Walker",
    middle_name: "Grayman",
    patient_id: "63a551c0565d9",
    picture: "63a551c0565d9.24bf99b46f8b496caf28d888a072f6ff63c66148b53b9.webp",
    status: "1",
    subscription_plan: "3",
    with_insurance: null}
    ,
    {address: "Test Address",
    contact_info: "+639774011554",
    date_of_birth: "1996-01-27",
    email: "patient2@gmail.com",
    first_name: "555555",
    last_name: "Walker",
    middle_name: "Grayman",
    patient_id: "63a551c0565d9",
    picture: "63a551c0565d9.24bf99b46f8b496caf28d888a072f6ff63c66148b53b9.webp",
    status: "1",
    subscription_plan: "3",
    with_insurance: null}
    ,
    {address: "Test Address",
    contact_info: "+639774011554",
    date_of_birth: "1996-01-27",
    email: "patient2@gmail.com",
    first_name: "66666666",
    last_name: "Walker",
    middle_name: "Grayman",
    patient_id: "63a551c0565d9",
    picture: "63a551c0565d9.24bf99b46f8b496caf28d888a072f6ff63c66148b53b9.webp",
    status: "1",
    subscription_plan: "3",
    with_insurance: null}
    ,
    {address: "Test Address",
    contact_info: "+639774011554",
    date_of_birth: "1996-01-27",
    email: "patient2@gmail.com",
    first_name: "777777",
    last_name: "Walker",
    middle_name: "Grayman",
    patient_id: "63a551c0565d9",
    picture: "63a551c0565d9.24bf99b46f8b496caf28d888a072f6ff63c66148b53b9.webp",
    status: "1",
    subscription_plan: "3",
    with_insurance: null}
    ,
    {address: "Test Address",
    contact_info: "+639774011554",
    date_of_birth: "1996-01-27",
    email: "patient2@gmail.com",
    first_name: "88888",
    last_name: "Walker",
    middle_name: "Grayman",
    patient_id: "63a551c0565d9",
    picture: "63a551c0565d9.24bf99b46f8b496caf28d888a072f6ff63c66148b53b9.webp",
    status: "1",
    subscription_plan: "3",
    with_insurance: null}
    ,
    {address: "Test Address",
    contact_info: "+639774011554",
    date_of_birth: "1996-01-27",
    email: "patient2@gmail.com",
    first_name: "99999",
    last_name: "Walker",
    middle_name: "Grayman",
    patient_id: "63a551c0565d9",
    picture: "63a551c0565d9.24bf99b46f8b496caf28d888a072f6ff63c66148b53b9.webp",
    status: "1",
    subscription_plan: "3",
    with_insurance: null}
    ,
    {address: "Test Address",
    contact_info: "+639774011554",
    date_of_birth: "1996-01-27",
    email: "patient2@gmail.com",
    first_name: "10",
    last_name: "Walker",
    middle_name: "Grayman",
    patient_id: "63a551c0565d9",
    picture: "63a551c0565d9.24bf99b46f8b496caf28d888a072f6ff63c66148b53b9.webp",
    status: "1",
    subscription_plan: "3",
    with_insurance: null},
    {address: "11",
    contact_info: "+639774011554",
    date_of_birth: "1996-01-27",
    email: "patient2@gmail.com",
    first_name: "11",
    last_name: "Walker",
    middle_name: "Grayman",
    patient_id: "63a551c0565d9",
    picture: "63a551c0565d9.24bf99b46f8b496caf28d888a072f6ff63c66148b53b9.webp",
    status: "1",
    subscription_plan: "3",
    with_insurance: null},
    {address: "12",
    contact_info: "+639774011554",
    date_of_birth: "1996-01-27",
    email: "patient2@gmail.com",
    first_name: "12121212121",
    last_name: "Man",
    middle_name: "Dude",
    patient_id: "63a551c0565d9",
    picture: "63a551c0565d9.24bf99b46f8b496caf28d888a072f6ff63c66148b53b9.webp",
    status: "1",
    subscription_plan: "3",
    with_insurance: null}
    ,
    {address: "3113131313333",
    contact_info: "+639774011554",
    date_of_birth: "1996-01-27",
    email: "patient2@gmail.com",
    first_name: "13131313",
    last_name: "Walker",
    middle_name: "Grayman",
    patient_id: "63a551c0565d9",
    picture: "63a551c0565d9.24bf99b46f8b496caf28d888a072f6ff63c66148b53b9.webp",
    status: "1",
    subscription_plan: "3",
    with_insurance: null}
    ,
    {address: "Test Address",
    contact_info: "+639774011554",
    date_of_birth: "1996-01-27",
    email: "patient2@gmail.com",
    first_name: "1414114144",
    last_name: "Walker",
    middle_name: "Grayman",
    patient_id: "63a551c0565d9",
    picture: "63a551c0565d9.24bf99b46f8b496caf28d888a072f6ff63c66148b53b9.webp",
    status: "1",
    subscription_plan: "3",
    with_insurance: null}
    ,
    {address: "Test Address",
    contact_info: "+639774011554",
    date_of_birth: "1996-01-27",
    email: "patient2@gmail.com",
    first_name: "151515151515",
    last_name: "Walker",
    middle_name: "Grayman",
    patient_id: "63a551c0565d9",
    picture: "63a551c0565d9.24bf99b46f8b496caf28d888a072f6ff63c66148b53b9.webp",
    status: "1",
    subscription_plan: "3",
    with_insurance: null}
    ,
    {address: "Test Address",
    contact_info: "+639774011554",
    date_of_birth: "1996-01-27",
    email: "patient2@gmail.com",
    first_name: "161616161616166",
    last_name: "Walker",
    middle_name: "Grayman",
    patient_id: "63a551c0565d9",
    picture: "63a551c0565d9.24bf99b46f8b496caf28d888a072f6ff63c66148b53b9.webp",
    status: "1",
    subscription_plan: "3",
    with_insurance: null}
    ,
    {address: "Test Address",
    contact_info: "+639774011554",
    date_of_birth: "1996-01-27",
    email: "patient2@gmail.com",
    first_name: "17171717177",
    last_name: "Walker",
    middle_name: "Grayman",
    patient_id: "63a551c0565d9",
    picture: "63a551c0565d9.24bf99b46f8b496caf28d888a072f6ff63c66148b53b9.webp",
    status: "1",
    subscription_plan: "3",
    with_insurance: null}
    ,
    {address: "Test Address",
    contact_info: "+639774011554",
    date_of_birth: "1996-01-27",
    email: "patient2@gmail.com",
    first_name: "1818181818",
    last_name: "Walker",
    middle_name: "Grayman",
    patient_id: "63a551c0565d9",
    picture: "63a551c0565d9.24bf99b46f8b496caf28d888a072f6ff63c66148b53b9.webp",
    status: "1",
    subscription_plan: "3",
    with_insurance: null}
    ,
    {address: "Test Address",
    contact_info: "+639774011554",
    date_of_birth: "1996-01-27",
    email: "patient2@gmail.com",
    first_name: "1919191919",
    last_name: "Walker",
    middle_name: "Grayman",
    patient_id: "63a551c0565d9",
    picture: "63a551c0565d9.24bf99b46f8b496caf28d888a072f6ff63c66148b53b9.webp",
    status: "1",
    subscription_plan: "3",
    with_insurance: null}
    ,
    {address: "Test Address",
    contact_info: "+639774011554",
    date_of_birth: "1996-01-27",
    email: "patient2@gmail.com",
    first_name: "2020202002020",
    last_name: "Walker",
    middle_name: "Grayman",
    patient_id: "63a551c0565d9",
    picture: "63a551c0565d9.24bf99b46f8b496caf28d888a072f6ff63c66148b53b9.webp",
    status: "1",
    subscription_plan: "3",
    with_insurance: null}
    
  ])
 
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
        <div className="float-left">
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
                  <i className="fas fa-search"></i>
                </button>
              </span>
            </div>
          </form>
        </div>
      </TableTitle>
      
      {(list.length>0)?<>
        <TableCard
        headers={[
          'Patient',
          'Email',
          'Phone No.',
          'Status',
          'Insurance',
        ]}
      >
        
        <PatientListData limit={pageLimit} pagenum={pageNum} list={list} />
        
        <Pagination
          activePage={pageNum}
          itemsCountPerPage={pageLimit}
          totalItemsCount={list.length}
          pageRangeDisplayed={5}
          // onPageChange={}
          itemclassName="page-item "
          linkClass="page-link float-center"
          onChange={(e)=>{
            console.log(e);
            setPageNum(e)}}
                  />
        {/* {isLoading ? 'Loading please wait...' : null} */}
        {errMsg ? <span style={{ color: 'red' }}>{errMsg}</span> : null}
        {list.length <= 0 && searchText.length > 0
          ? '0 record found.'
          : null}
      </TableCard>

        </>:<CardLongItem><h5>{(isLoading)?"Loading, please wait...":"No Results."}</h5></CardLongItem>
        }
      
      
    </ContainerFluid>
  )
}
export default PatientList

import { useEffect, useMemo,useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { AWS_BUCKET, AWS_BUCKET_PROFILES, AWS_BUCKET_SERVICES } from '../../constants'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { MdOutlineEmail, MdPhone } from 'react-icons/md'
import useDebounce from '../../hooks/useDebounce'
import { StatusTextInsurance } from '../../components/status/Status'
import CardLongItem from '../../components/cards/Card'

import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import useInterval from '../../hooks/useInterval'
import Pagination from 'react-js-pagination'
export function PaginatedList( {limit,pagenum, list = [] }){
  const actionX = useMemo(() => ({ approve: 'approve', cancel: 'cancel' }), [])
  
  function handleActionClick(action, selectedItem) {
    Swal.fire({
      title:
        action === actionX.meet
          ? 'Meet with '+selectedItem.full_name+"?"
          : 'Cancel Appointment',
      html: selectedItem.full_name+` is suffering from <br>
      "${selectedItem.symptoms}".<br>
      <span class="text-muted">Patient: ${selectedItem.email}</span><br />`,
      icon: action === actionX.meet ? 'question' : 'warning',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      focusConfirm: true,
      focusCancel: false,
    }).then(async ({ isConfirmed }) => {
      
      if (isConfirmed) {
        await axiosPrivate
          .post(
            'providerStartVirtualVisit',
            {
              Email: auth.email,
              MeetingID: selectedItem.meeting_id,
            }
          )
          .then((res) => {
            if (res.data?.Status && action === actionX.meet) {
              Swal.fire({title:'Virtual Visit',html:'Zoom Meeting will start.'})
              console.log(res.data.Data)
              navigate('/virtualvisit/room', {
                  state: {
                     MeetingID: res.data.Data.MeetingID,
                     Password: res.data.Data.Passcode,
                     Symptom: selectedItem.symptoms,
                     SelectedItem: selectedItem,
                     MeetingStatus: meetingStatus
                    },
                })
            } else if (res.data?.Status && action === actionX.cancel) {
              Swal.fire('Appointment successfully cancelled.')
            } else {
              Swal.fire(res.data?.Message)
            }
          })
          .catch((err) => {
            console.error(err)
            Swal.fire('Action failed.')
          })
        setRefreshList((prev) => !prev)
      }
    })
  }
  const queue_list=list
  let paginatedlist=[]
  var j=0
  var k=0
  for (var i in queue_list){
    // console.log("list",list)
    // console.log(paginatedlist,limit, pagenum,(pagenum*limit)-limit,i,j,list[i])
    // console.log(parseInt(i)===((pagenum*limit)-limit),i,(pagenum*limit)-limit)
    // console.log("Page "+(pagenum))
    if((parseInt(i))===((pagenum*limit)-limit)){
      
      for (var k=0; k<limit;k++){
        if (queue_list[parseInt(i)+k]){
          paginatedlist.push(queue_list[parseInt(i)+k])}
      }
    }
    j=j+1
  }
  return(
    paginatedlist.map((item, index) => (
    <tr key={item?.recno || index}>
      <td>
        <Link
          // to={'/provider/patient/profile'}
          to={"/provider/patient/profile/"+item.patient_id}
          state={{
            selectedUser: item,
          }}
        >
          {' '}
          <div className='row'>
          
            <img
              src={AWS_BUCKET_SERVICES+"profiles/pictures/"+item.patient_id+"/"+item.picture}
              alt=''
              className='thumb-sm rounded-circle mr-2'
              style={{width:100,height:100}}
            />
            <div className='col'>
              <div>
                {item.full_name}
              </div>
              {/* <div>
                <StatusTextInsurance status={item.with_insurance || 0} />
              </div> */}
            </div>
          </div>
        </Link>
      </td>
      <td>
        <a href={`mailto:${item.email}`}>
          <MdOutlineEmail /> {item.email}
        </a>
      </td>
      <td>
        <a href={`tel:${item.contact_info}`}>
          <MdPhone /> {item.contact_info}
        </a>
      </td>
      <td>
        {item.symptoms}
        
      </td>
      <td>
        {item.address}
      </td>
      <td>
              <button
                type='button'
                className={`btn btn-outline-${item.status==="Waiting"?'warning':'success'} waves-effect waves-light`}
                onClick={handleActionClick.bind(
                  this,
                  actionX.meet,
                  item
                )}
              >
                Meet
              </button>{' '}
            </td>
      </tr>
      )
      ))
}
function PatientQueue({ limit, search, stopPolling=false }) {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [list, setList] = useState([])
  const debouncedSearch = useDebounce(search, 100)
 const [refreshList, setRefreshList] = useState(false)
  const navigate = useNavigate()
  const [meetingStatus, setMeetingStatus] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const [pageNum,setPageNum]=useState(1)
  const [delay, setDelay] = useState('5000')
  /*
  For Status:
  Confined -  badge-soft-purple
  Deceased - badge-soft-danger
  Follow-up Checkup - badge-soft-success
  */
  
  
  async function getProviderVirtualVisitQue() {
      
    await axiosPrivate
      .post(
        'getProviderVirtualVisitQue',
        { Email: auth.email },
        
      )
      .then((res) => {
        setIsLoading(false)
        const data = res.data || []
        // setList(data.Data)
        const {Status,Message,Data}=res.data
        if (Status&&Data){
          setList(res.data.Data)
      
          

        }
        else {
          console.error(Message)
        }
        
        
      })
      .catch((err) => {
        console.error(err)
        setErrMsg(err.message)
      })
} 
 
    useInterval(getProviderVirtualVisitQue, delay)
  
  
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    setIsLoading(true)
    

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [debouncedSearch])

  return (
    // list.length===0?null:
    
  <>
  <table className="table">
  {(list?.length===0)?<CardLongItem><h4>{(isLoading)?'...':'There are no Virtual Visits in the Queue.'}</h4></CardLongItem>:
          <>
                <thead className="thead-light">
                <tr>
                  <th>Patient</th>
                  <th>Email</th>
                  <th>Contact Info</th>
                  <th>Symptoms</th>
                  <th>Address</th>

                  <th>Action</th>
                </tr>
              </thead>
              
          <thead>
        <PaginatedList list={list} limit={limit} pagenum={pageNum}></PaginatedList>
        </thead>

              </>}
            </table>
            <Pagination
              activePage={pageNum}
              itemsCountPerPage={limit}
              totalItemsCount={list?.length||[]}
              pageRangeDisplayed={5}
              // onPageChange={}
              itemclassName="page-item "
              linkClass="page-link float-center"
              onChange={(e)=>{
                setPageNum(e)}}
                  />
  </>)
}
function dateGenerator(date, time) {
  return moment(date).add(time, 'hours').format('DD MMM YYYY h:mm a')
}

export default PatientQueue

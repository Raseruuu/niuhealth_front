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

function PatientQueue({ limit, search }) {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [list, setList] = useState([])
  const debouncedSearch = useDebounce(search, 100)
  const actionX = useMemo(() => ({ approve: 'approve', cancel: 'cancel' }), [])
  const [refreshList, setRefreshList] = useState(false)
  const navigate = useNavigate()
  const [meetingStatus, setMeetingStatus] = useState(false)
  
  const [delay, setDelay] = useState('3000')
  /*
  For Status:
  Confined -  badge-soft-purple
  Deceased - badge-soft-danger
  Follow-up Checkup - badge-soft-success
  */
  
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
  async function getProviderVirtualVisitQue() {
      
    await axiosPrivate
      .post(
        'getProviderVirtualVisitQue',
        { Email: auth.email },
        
      )
      .then((res) => {
        const data = res.data || []
        setList(data.Data.slice(0, limit))
        console.log(res.data)
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

    

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [debouncedSearch])

  return (
    // list.length===0?null:
    
  <>
  {(list.length===0)?<CardLongItem><h4>There are no Virtual Visits in the Queue.</h4></CardLongItem>:
    <>
  {list.map((item, index) => (
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
      {/* <td>
        <span className='badge badge-md badge-soft-purple'>
          {item.status ? 'Active' : 'Inactive'}
        </span>
      </td> */}
      {/* //Action!! */}
      <td>
              <button
                type='button'
                className='btn btn-outline-success waves-effect waves-light'
                onClick={handleActionClick.bind(
                  this,
                  actionX.meet,
                  item
                )}
              >
                Meet
              </button>{' '}
              {/* <button
                type='button'
                className='btn btn-outline-danger waves-effect waves-light'
                onClick={handleActionClick.bind(
                  this,
                  actionX.cancel,
                  item
                )}
              >
                Cancel
              </button> */}
            </td>
    </tr>
  ))}</>}</>)
}
function dateGenerator(date, time) {
  return moment(date).add(time, 'hours').format('DD MMM YYYY h:mm a')
}

export default PatientQueue

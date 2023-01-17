import { useEffect, useMemo,useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { AWS_BUCKET } from '../../constants'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { MdOutlineEmail, MdPhone } from 'react-icons/md'
import useDebounce from '../../hooks/useDebounce'
import { StatusTextInsurance } from '../../components/status/Status'

import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

function PatientQueue({ limit, search }) {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [list, setList] = useState([])
  const debouncedSearch = useDebounce(search, 500)
  const actionX = useMemo(() => ({ approve: 'approve', cancel: 'cancel' }), [])
  const [refreshList, setRefreshList] = useState(false)
  const navigate = useNavigate()

  /*
  For Status:
  Confined -  badge-soft-purple
  Deceased - badge-soft-danger
  Follow-up Checkup - badge-soft-success
  */
  
  function handleActionClick(action, selectedItem) {
    console.log(action)
    console.log("uguu",selectedItem)

    Swal.fire({
      title:
        action === actionX.meet
          ? 'Meet with '+selectedItem.full_name+"?"
          : 'Cancel Appointment',
      html: selectedItem.full_name+` is suffering from "${selectedItem.symptoms}".
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
                     Password: res.data.Data.Passcode },
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
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function getList() {
      
        await axiosPrivate
          .post(
            'getProviderVirtualVisitQue',
            { Email: auth.email },
            {
              signal: controller.signal,
            }
          )
          .then((res) => {
            const data = res.data || []
            isMounted && setList(data.Data.slice(0, limit))
            console.log(res.data)
          })
          .catch((err) => {
            console.error(err)
            setErrMsg(err.message)
          })
    }

    getList()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [debouncedSearch])

  return list.map((item, index) => (
    <tr key={item?.recno || index}>
      <td>
        <Link
          to='profile'
          state={{
            selectedUser: item,
          }}
        >
          {' '}
          <div className='row'>
            <img
              src={`${AWS_BUCKET}/assets/images/users/user-10.jpg`}
              alt=''
              className='thumb-sm rounded-circle mr-2'
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
        <a href={`tel:${item.symptoms}`}>
          {item.symptoms}
        </a>
      </td>
      <td>
        <a href={`tel:${item.address}`}>
          {item.address}
        </a>
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
  ))
}
function dateGenerator(date, time) {
  return moment(date).add(time, 'hours').format('DD MMM YYYY h:mm a')
}

export default PatientQueue

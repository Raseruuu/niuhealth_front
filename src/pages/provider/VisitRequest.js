import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TableCard, { TableTextLink , TableTitle } from "../../components/table/Tables"
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import Swal from 'sweetalert2'
import {StatusTextInsurance} from "../../components/status/Status"

function VisitRequest() {
  const actionX = useMemo(() => ({ approve: 'approve', cancel: 'cancel' }), [])

  const navigate = useNavigate()
  const { auth, setAuth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [list, setList] = useState([])
  const [refreshList, setRefreshList] = useState(false)

  function handleActionClick(action, selectedItem) {
    console.log(action)
    console.log(selectedItem)

    Swal.fire({
      title:
        action === actionX.approve
          ? 'Approve Appointment'
          : 'Cancel Appointment',
      html: `Are you sure you want to ${action} appointment?
      <span class="text-muted">Patient: ${selectedItem.email}</span><br />
      <span class="text-muted">Date and Time: ${dateGenerator(
        selectedItem.trans_date_time,
        selectedItem.trans_start
      )}
        </span>`,
      icon: action === actionX.approve ? 'question' : 'warning',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      focusConfirm: false,
      focusCancel: true,
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        await axiosPrivate
          .post(
            action === actionX.approve
              ? 'approveVisitRequest'
              : 'cancelVisitRequest',
            {
              Email: auth.email,
              AppointmentID: selectedItem.visit_id,
            }
          )
          .then((res) => {
            if (res.data?.Status && action === actionX.approve) {
              Swal.fire('Appointment successfully approved.')
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
          'getAppointmentRequests',
          { Email: auth.email },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          console.log(res)
          const { Status, Data: data = [], Message } = res.data

          if (Status) {
            isMounted && setList(data)
          } else {
            throw new Error(Message)
          }
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
  }, [refreshList])

  return (
    <div className='container-fluid'>
      <TableTitle title = "Visit Requests"/>
      <TableCard headers = {["ID", "Patient", "Request Date", "Action"]}>
        {list.map((item, index) => (
          <tr key={item?.appointment_id || index}>
            <td>{item.visit_id}</td>
            <td>
              <div className='media'>
                <a href='../pages/visit-request-profile.html'>
                  <img
                    src='../assets/images/users/user-1.png'
                    alt=''
                    className='thumb-sm rounded-circle mr-2'
                  />
                </a>
                <div className='media-body align-self-center text-truncate'>
                  <TableTextLink text = {item.full_name} to = '../pages/visit-request-profile.html'>
                  <StatusTextInsurance status={item.with_insurance||0}
                      />
                  </TableTextLink>
                  <p className='text-muted mb-0'>
                    Virtual visit on{' '}
                    {dateGenerator(
                      item.trans_date_time,
                      item.trans_start
                    )}
                  </p>
                </div>
              </div>
            </td>
            <td>
              {dateGenerator(
                item.trans_date_time,
                item.trans_start
              )}
            </td>
            <td>
              <button
                type='button'
                className='btn btn-outline-success waves-effect waves-light'
                onClick={handleActionClick.bind(
                  this,
                  actionX.approve,
                  item
                )}
              >
                Approve
              </button>{' '}
              <button
                type='button'
                className='btn btn-outline-danger waves-effect waves-light'
                onClick={handleActionClick.bind(
                  this,
                  actionX.cancel,
                  item
                )}
              >
                Cancel
              </button>
            </td>
          </tr>
      ))}
      </TableCard>
      
    </div>
  )
}

function dateGenerator(date, time) {
  return moment(date).add(time, 'hours').format('DD MMM YYYY h:mm a')
}

export default VisitRequest

import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import Swal from 'sweetalert2'

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
      <div className='row'>
        <div className='col-sm-12'>
          <div className='page-title-box'>
            <h4 className='page-title'>Visit Requests</h4>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='table-responsive browser_users'>
                <table className='table mb-0'>
                  <thead className='thead-light'>
                    <tr>
                      <th className='border-top-0'>ID</th>
                      <th className='border-top-0'>Patient</th>

                      <th className='border-top-0'>Request Date</th>
                      <th className='border-top-0'>Action</th>
                    </tr>
                  </thead>

                  <tbody>
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
                              <h6 className='mt-0 mb-1 text-dark'>
                                <a href='../pages/visit-request-profile.html'>
                                  {item.name}
                                </a>{' '}
                                <span
                                  className={
                                    'badge badge-md ' +
                                    (item.insurType
                                      ? 'badge-soft-success'
                                      : 'badge-soft-danger')
                                  }
                                >
                                  {item.insurType ? 'Insured' : 'Not Insured'}
                                </span>
                              </h6>
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

function dateGenerator(date, time) {
  return moment(date).add(time, 'hours').format('DD MMM YYYY h:mm a')
}

export default VisitRequest

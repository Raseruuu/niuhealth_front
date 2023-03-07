import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CardItem from '../../components/cards/Card'
import Calendar from '../../components/provider/calendar/Calendar'
import TableCard from '../../components/table/Tables'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { AWS_BUCKET, AWS_BUCKET_PROFILES, AWS_BUCKET_SERVICES } from '../../constants'

import { Link } from 'react-router-dom'

const StatusText = ({ status }) => {
  const statusColor = {
    0: 'badge-soft-purple',
    1: "badge-soft-success",
    2: 'badge-soft-danger',
    3: 'badge-soft-danger',
    4: "badge-soft-success",
  }
  const statusText = {
    0: 'For Approval',
    1: "Completed",
    2: 'Cancelled By You',
    3: 'Cancelled By Doctor',
    4: "Approved",
  }
  return (
    <span className={`virtualvisitbadge badge badge-md ${statusColor[status]}`}>
      {statusText[status]}
    </span>
  )
}
function Visits() {
  const navigate = useNavigate()
  
  const [isLoading, setIsLoading] = useState(true)
  const [appointmentList, setAppointmentList] = useState([])
  const { auth } = useAuth()
  
  const axiosPrivate = useAxiosPrivate()
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function getSched() {
      await axiosPrivate
        .post(
          'getProviderAppointments',
          { Email: auth.email || sessionStorage.getItem('email') },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          const { Status, Data: data = [], Message } = res.data

          if (Status) {
            console.log("Provider_appointments",data)
            isMounted && setAppointmentList(data)
            setIsLoading(false) 
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          setIsLoading(false)
          console.error(err)
        })
    }

    getSched()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='page-title-box'>
            {/* <div className='float-right'>
              <ol className='breadcrumb'>
                <button
                  type='button'
                  className='btn btn-success waves-effect waves-light'
                  id='create-visit'
                  // onclick='openModal()'
                  onClick={() =>
                    navigate('/virtualvisit/room', {
                      state: { MeetingID: 4737080721 },
                    })
                  }
                >
                  New Visit
                </button>
              </ol>
            </div> */}
            <h4 className='page-title'>Visits</h4>
          </div>
        </div>
      </div>

      {/* <!-- Calendar --> */}

      
      <div className='col position-absolute'>
        <div className='col-12 mr-2'>
          <CardItem>
            <ul className='nav nav-pills mb-0' id='pills-tab' role='tablist'>
              <li className='nav-item'>
                <a
                  className='nav-link active'
                  id='calendar_view_tab'
                  data-toggle='pill'
                  href='#calendar_view'
                >
                  Calendar
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  id='list_view_tab'
                  data-toggle='pill'
                  href='#list_view'
                >
                  List
                </a>
              </li>
            
              </ul>
          </CardItem>
        </div>
        <div className='tab-content detail-list' id='pills-tabContent'>
          
        <div className='tab-pane fade show active' id='calendar_view'>
          <div className='col-lg-9'>
            <div className='card'>
              <div className='card-body'>
                <Calendar allowCall={true} />
                <div style={{ clear: 'both' }}></div>
              </div>
            </div>
          </div>
        </div>
      
        <div className='tab-pane fade' id='list_view'>
          <div className='col-lg-9  position-absolute'>
          {(appointmentList.length!==0)?
              <TableCard headers={["Patient","Service Description","Appointment Time", "Status"]}>
              {appointmentList.map((item,index)=>(
                <tr key={index}>
                <td>
                  <Link
                    to={"/patients/profile/"+item.patient_id}
                    state={{
                      selectedUser: item,
                    }}
                  >
                    <div className="row">
                      <div className="col">
                        <img
                          src={AWS_BUCKET_SERVICES+"profiles/pictures/"+item.picture}
                          alt=""
                          className="thumb-sm rounded-circle mr-2"
                          style={{objectFit:'cover'}}
                        />
                        {item.full_name} 
                      </div>
                    </div>
                  </Link>
                </td>

                <td>
                {item.service_description}
                </td>
                <td>
                {moment(item.trans_date_time).format('hh:mm a MM/DD/YY')}
                </td>
                
                <td>
                <StatusText status={item.status}/>
                </td>
                </tr>

              ))}
                      
              </TableCard>:<><CardItem className={'col-lg-12'}>{(isLoading)?"Loading...":"No Appointments."}</CardItem></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Visits

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CardItem from '../../components/cards/Card'
import Calendar from '../../components/provider/calendar/Calendar'
import TableCard from '../../components/table/Tables'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { AWS_BUCKET, AWS_BUCKET_PROFILES, AWS_BUCKET_SERVICES } from '../../constants'

import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useRef } from 'react'

import moment from 'moment'
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

function hourformat(hour){
  if (hour>12){
    return ((hour-12<10)?"0":"")+(hour-12)+":00 PM"
  }
  else if (hour===12){
    return (12)+":00 PM"
  }
  else if (hour===0){
    return (12)+":00 AM"
  }
  else{
    return ((hour<10)?"0":"")+hour+":00 AM"
  }
}
function Visits() {
  const navigate = useNavigate()
  
  const [isLoading, setIsLoading] = useState(true)
  const [appointmentList, setAppointmentList] = useState([])
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  
  const [patientList, setPatientList] = useState([])
  const [clinicList, setClinicList] = useState([])
  
  const myModal=useRef();
  const [updateVisit,setUpdateVisit]=useState(true)
  const [showModal,setShowModal]=useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },

  } = useForm();
  async function createInPersonVisit(data) {
    const controller = new AbortController()

    await axiosPrivate
      .post(
        'createInPersonVisit',
        { ...data,Email: auth?.email || sessionStorage.getItem('email'),

      },
        {
          signal: controller.signal,
        }
      )
      .then((res) => {
        const { Status, Message } = res.data
        if (Status){
          document.getElementById("create-appointment").reset();
          
          Swal.fire({
            title: "In-Person Appointment Created.",
            html: ``,
            icon: 'info'
            
          })
          setUpdateVisit(!updateVisit)
          $('#myModal').hide();
          $('.modal-backdrop').hide();
         
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
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
    async function getPatientList() {
      const controller = new AbortController()

      await axiosPrivate
        .post(
          'getPatients',
          { Email: auth?.email || sessionStorage.getItem('email') },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          const { Data = [] } = res.data
          setPatientList(Data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
    async function getClinicList() {
      const controller = new AbortController()

      await axiosPrivate
        .post(
          'getClinics',
          { Email: auth.email},
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          console.log(res)
          const { Status, Data: data = [], Message } = res.data

          if (Status) {
            console.log("Clinics",data)
            setClinicList(data)
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
          setErrMsg(err.message)
        })
    }
    getPatientList()
    getClinicList()
    getSched()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [updateVisit])
  let morning_options=[8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1,2,3,4,5,6,7]
  
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='page-title-box'>
            <div className='float-right'>
              <ol className='breadcrumb'>
                <button
                  type='button'
                  className='btn btn-success waves-effect waves-light'
                  id='create-visit'
                  // onclick='openModal()'
                  onClick={()=>{
                    setShowModal(true)
                  }}
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  New Visit
                </button>
              </ol>
            </div>
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
      {showModal===false?null:
          <div id="myModal" className={showModal?"modal fade":"modal fade show"} role="form" ref={myModal}>
            <div className="modal-dialog" style={{maxWidth: '500px', margin: '1.75rem auto'}}>

              {/* <!-- Modal content--> */}
              <div className="modal-content">

                <div className="modal-header">
                  
                  <h4 className="modal-title">In-Person Visit</h4>
                </div>
                <form id="create-appointment" onSubmit={handleSubmit(createInPersonVisit)}>
                <div className="modal-body">
                  
                <div className="nuModalCont visitRequestModal">
                
                <div className="" >
                  
                  <label htmlFor="visitTitle" className="col-form-label">Visit Title</label>
                  <input className="form-control" type="text" id="visitTitle" {...register("VisitTitle")}/>
                  <label  className="col-form-label">Patient</label>
                  <select className="form-control" {...register("PatientID")}>
                      <option>Select Patient...</option>
                        {patientList.map((item,index)=>{
                                return(
                                <option key={index} value={item.patient_id}>{item.first_name} {item.last_name}</option>)
                              })}
                  </select>
                  
                  <label  className="col-form-label">Clinic</label>
                  <select className="form-control" {...register("ClinicID")}>
                              <option>Select Clinic...</option>
                              {clinicList.map((item)=>{
                                return(
                                <option value={item.clinic_id}>{item.clinic_name} </option>)
                              })}
                          </select>
                  <label htmlFor="date" className="col-form-label">Visit Date</label>
                  <input className="form-control" defaultValue={moment().format('yy-mm-dd')} type="date" id="date" {...register("Date")}/>
                  
                  <label htmlFor="time" className="col-form-label">Time</label>
                  {/* <input className="form-control" pattern="[0-9]{2}:[0]{2}" defaultValue={moment().format('HH:MM a')} type="time" id="time" {...register("Time")}/> */}
                  <select
                    {...register("Time")}
                    className="form-control">   
                    {morning_options.map((option, index)=>(
                      <option key={index} value={option}>{hourformat(option)}</option>
                      ))}
                      
                    <option value={null}>--:--</option>
                  </select>
                  <label  className="col-form-label">Internal Notes</label>
                  <textarea className="form-control" rows="5" id="message" {...register("InternalNotes")}></textarea>
                  
                </div>
              </div>
              

                </div>
                <div className="modal-footer">
                <div className="nuBtnContMod">
                  <button type="submit" className="btn btn-success waves-effect waves-light" id="create-visit">Save Visit</button>
                  </div>
                  <button type="button" className="btn btn-outline-danger"
                  data-target="#myModal" data-dismiss="modal"
                  onClick={(e)=>{
                    setShowModal(false);
                    $('#myModal').hide();
                    $('.modal-backdrop').hide();
                  }
                  }
                  >Close</button>
                </div>
                </form>
              </div>

            </div>
           
          </div>}
    </div>
  )
}

export default Visits

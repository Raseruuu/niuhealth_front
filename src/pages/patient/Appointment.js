import Footer from "../../components/Footer"
import React, { useEffect,useState } from 'react'

import { AWS_BUCKET } from '../../constants'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
const CancelButton = () => {
return(
  <div className="list-inline mb-0 align-self-center">
    <button
      type="button"
      className="btn btn-danger btn-round waves-effect waves-light"
    >
      Cancel Visit
    </button>
  </div>
)}
const ViewVisitButton = () => {
  return(
    <div className="list-inline mb-0 align-self-center">
      <button
        type="button"
        className="btn btn-success btn-round waves-effect waves-light"
      >
        View Visit Visit Summary
      </button>
    </div>
  )}
const StatusIcon = ({ icontype }) => {
  const StatusColor = {
    0: 'text-purple',
    2: 'text-danger',
    3: 'text-danger',
    1:"text-success",
    4:"text-success",
  }
  return (
    <div className="task-priority-icon">
      <i className={`fas fa-circle ${StatusColor[icontype]}`}></i>
    </div>
  )
}

const StatusText = ({ status }) => {
  const statusColor = {
    0: 'badge-soft-purple',
    2: 'badge-soft-danger',
    3: 'badge-soft-danger',
    1: "badge-soft-success",
    4: "badge-soft-success",
  }
  const statusText = {
    0: 'Upcoming',
    2: 'Cancelled By You',
    3: 'Cancelled By Doctor',
    1: "Completed",
    4: "Approved",
  }
  return (
    <span className={`virtualvisitbadge badge badge-md ${statusColor[status]}`}>
      {statusText[status]}
    </span>
  )
}
const AppointmentAction = ({ status }) => {

  if (status==='upcoming'){
    return (
      <CancelButton/>
    )}
  else if (status==='completed'){
    return (
      <>
        <div className="br-wrapper br-theme-fontawesome-stars"><strong>Rate your experience: </strong> <select id="example-fontawesome" style={{display:"none"}}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        </div>
        <ViewVisitButton/>
      </>
    )}

}

function AppointmentItem({provider_description,provider_name,service_description,service_id,trans_date_time,visit_id,status}){
 
  return(
    <div className="card" id={service_id}>
    <div className="card-body">
      <div className="task-box" key ={visit_id}>

        <div className="task-priority-icon">
          {/* <i className="fas fa-circle text-purple"></i> */}
          <StatusIcon icontype={status}/>
        </div>

        <p className="text-muted float-right">
          <span className="text-muted">{trans_date_time}</span>
          <span className="mx-1">·</span>
          <span>
            <i className="far fa-fw fa-clock"></i> {trans_date_time}
            {/* //date */}
          </span>
        </p>
        <div className="media">
          <a className="" href="#">
            <img
              src="../assets/images/users/user-1.jpg"
              alt="user"
              className="rounded-circle thumb-md"
            />
          </a>
          <div className="media-body align-self-center ml-3">
            <p className="font-14 font-weight-bold mb-0">
              {provider_name}
              <StatusText status={status}/>
            </p>
            <p className="mb-0 font-12 text-muted">{service_description}</p>
          </div>
        </div>
        <p className="text-muted mb-1 virtDesc">
          <strong>{provider_description}</strong> 
        </p>
      
        <div className="virtDesc d-flex justify-content-between">
          <div className="br-wrapper br-theme-fontawesome-stars">
            <strong>{provider_description}</strong> 
          </div>
          <AppointmentAction status={status}/>
          
        </div>
      </div>
    </div>
  </div>
    )}
function Appointment() {
  const sampleappointment ={   
    provider_name :"",
    provider_description:"",
    service_description:"",
    service_id:"",
    trans_date_time:"",
    visit_id:"",
    status:0
  }
  const [appointmentsList,setAppointmentsList] = useState([])
   
    const [errMsg, setErrMsg] = useState(null)
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    useEffect(() => {
      let isMounted = true
      const controller = new AbortController()
  
      async function getList() {
        await axiosPrivate
          .post(
            'getPatientAppointments',
            { Email: auth.email },
            // {
            //   signal: controller.signal,
            // }
          )
          .then((res) => {
            const { Status, Data: data = [], Message } = res.data
  
            if (Status && isMounted) {
              console.log(data)
              setAppointmentsList(data)
            } else {
              throw new Error(Message)
            }
          })
          .catch((err) => {
            setErrMsg(err.message)
          })
      }
  
      isMounted && getList()
  
      return () => {
        isMounted = false
        controller.abort()
      }
    }, [])
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box">
                <h4 className="page-title">Appointments</h4>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              {appointmentsList.map((appointment)=>
              <AppointmentItem {...appointment} />
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default Appointment

import Footer from "../../components/Footer"
import React, { useEffect,useState } from 'react'

import { AWS_BUCKET } from '../../constants'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import moment from "moment"
import TableCard from "../../components/table/Tables"
import CardItem from "../../components/cards/Card"
function dateTimeFormat(date) {
  return moment(date).format('MMM DD, YYYY, hh:mm A')
}
const timenow=moment()
const CancelButton = () => {
return(
  <div className="list-inline mb-0 align-self-center">
    <button
      type="button"
      className="btn btn-outline-danger btn-round waves-effect waves-light"
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
        // className="btn btn-success btn-round waves-effect waves-light"
        className="btn btn-outline-success btn-round waves-effect waves-light"
      >
        View Visit Summary
      </button>
    </div>
  )}
const StartButton = () => {
  return(
    <div className="list-inline mb-0 align-self-center">
      <button
        type="button"
        className="btn btn-gradient-success btn-round waves-effect waves-light"
      >
        Join Virtual Visit
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
    0: 'For Approval',
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
function HMFormat(minutes) {
  
  var hours = Math.floor(minutes / 60);
  var days=Math.floor(hours / 24);
  
  // Getting the minutes.
  var min = parseInt(minutes % 60);
  // var sec= parseInt(min-60)
  let dig=""
  if (min<10){ dig="0"}
  if (hours>24){
    hours=hours-(days*24)
    return days+" days"
  }
  else if(min>60){
    return hours+" hrs and "+dig+min+" mins"
  }
  else{
  return days+" days, "+ hours+" hrs and "+dig+min+" mins"}
  // return hours+":"+dig+min+":"+sec
}
const AppointmentAction = ({ status , appointmentTime }) => {
  const appointmentPeriod=[moment(appointmentTime),moment(appointmentTime).add(1, 'hours')]
  const withinAppointmentPeriod=(timenow>appointmentPeriod[0]&&timenow<appointmentPeriod[1])
  const appointmentETA=HMFormat(moment(appointmentTime).diff(timenow, 'minutes', true))

  // const appointmentETAhrs=parseInt(moment(appointmentTime).diff(timenow, 'hours', true))
  
  
  if (status==="4"&& withinAppointmentPeriod){
    return (
      <StartButton/>
    )}
  else if (status==="4"&& withinAppointmentPeriod){
    return (
      <StartButton/>
    )}
  else if (status==="4"&& !withinAppointmentPeriod&&timenow>appointmentPeriod[1]){
      return (
        <><h6>Virtual visit period is over.</h6>
        <ViewVisitButton/>
        </>
      )}
  else if (status==="4" && timenow<appointmentPeriod[1]){
    return (
      <>
        {/* <h6>Appointment ETA: {appointmentETA}
        </h6> */}
        <CancelButton/>
      </>
    )}
    
  else if (status==="0"){
    return (
      
      <CancelButton/>
    )}
  else if (status==="1"){
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
  // else{return (<>
  //   {/* {"statusis4?"+(parseInt(status))+(status===4)} */}
  //   <ViewVisitButton/>
  //   </>
    
  // )}


}
function TimeCard(){
    return(
      <CardItem>
        <h3>Time Now:</h3> 
        <i className="far fa-fw fa-clock"></i>{dateTimeFormat(timenow)}
      </CardItem>
    )
}
function AppointmentItem({provider_description,provider_name,service_description,service_name,service_id,trans_start,trans_date_time,visit_id,status}){
  
  const dateTime=(trans_date_time+", "+trans_start+":00")

  const date=moment(trans_date_time).format('MMM DD, YYYY')
  const time=moment(trans_date_time+", "+trans_start+":00").format('hh:mm A')+" - "+moment(dateTime).add(1, 'hours').format('hh:mm A')
  // const time=moment(dateTime).get('hour')+":"+moment(dateTime).get('minute')
  return(
    <div className="card" id={service_id}>
    <div className="card-body">
      <div className="task-box" key ={visit_id}>

        <div className="task-priority-icon">
          {/* <i className="fas fa-circle text-purple"></i> */}
          <StatusIcon icontype={status}/>
        </div>
        {/* {dateTimeFormat(trans_date_time+", "+trans_start+":00")} */}
        <p className="text-muted float-right">
          <span className="text-muted">{date}</span>
          <span className="mx-1">·</span>
          <span>
            <i className="far fa-fw fa-clock"></i> {time}
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
          <strong>{service_name}</strong> 
        </p>
      
        <div className="virtDesc d-flex justify-content-between">
          <div className="br-wrapper br-theme-fontawesome-stars">
            <strong>{provider_description}</strong> 
          </div>
          <AppointmentAction status={status} appointmentTime={dateTime} />
          
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
    service_name:"",
    service_id:"",
    trans_date_time:"",
    visit_id:"",
    status:0
  }

  const [appointmentsList,setAppointmentsList] = useState([])
  const [sample_appointmentsList,setSample_AppointmentsList] = useState([
    {provider_description:"Hi! I`m Jane Doe",
      provider_name:"Jane Doe",
      service_description: "service desc",
      service_id: "16",
      service_name: "Service Name",
      status: "4",
      trans_date_time: "2023-01-13",
      trans_end:null,
      trans_start:"13",
      visit_id: "378"}
  ])
     
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
    var emptylist=[]
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
          <TimeCard/>
          {(appointmentsList.length>0)?
          (<div className="row">
            <div className="col-lg-12">
              {appointmentsList.map((appointment)=>
              <AppointmentItem {...appointment} />
              )}
            </div>
          </div>):<CardItem><h4>There are no appointments to display.</h4></CardItem>}
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default Appointment

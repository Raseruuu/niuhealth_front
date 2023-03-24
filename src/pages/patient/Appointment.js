import Footer from "../../components/Footer"
import React, { useEffect,useState } from 'react'

import { AWS_BUCKET, AWS_BUCKET_PROFILES, AWS_BUCKET_SERVICES } from '../../constants'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import moment from "moment"
import TableCard from "../../components/table/Tables"
import CardItem from "../../components/cards/Card"
import useInterval from '../../hooks/useInterval'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import 'animate.css';
import RingLoading from "../../components/lottie/RingLoading"
function dateTimeFormat(date) {
  return moment(date).format('MMM DD, YYYY, hh:mm A UTC Z')
}
const timenow=moment()

  
      
const CancelButton = ({visit_id}) => {
  
  const { auth } = useAuth()
const axiosPrivate = useAxiosPrivate()
return(
  <div className="list-inline mb-0 align-self-center">
    <button
      type="button"
      className="btn btn-outline-danger btn-round waves-effect waves-light"
      onClick={() => {
        Swal.fire({
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          // title: 'Appointment',
          showClass: {
            popup: 'animate__animated animate__fadeIn animate__faster'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOut  animate__faster'
          },
          html: `
          <div class='col'>
          Are You sure you want to cancel this visit?
            </div>
          `,
          // { AWS_BUCKET_SERVICES } + profile.picture,
        }).then(async ({isConfirmed})=>{
          if (isConfirmed){
          await axiosPrivate
            .post(
              'patientCancelVisitRequest',
              {
                Email:auth.email,
                AppointmentID:visit_id
              }
            ) .then((res) => {
              console.log()
              if (res.data?.Status && isConfirmed) {
                Swal.fire('Appointment successfully cancelled.')

              // } else if (res.data?.Status && !cancel) {
              //   Swal.fire('Appointment  cancelled.')
              } else {
                Swal.fire(res.data?.Message)
              }
            })
         }
          
        }
          
        )
      }}
    >
      Cancel Visit
    </button>
  </div>
)}
const ViewVisitButton = ({appointmentPeriod,image,provider_name, provider_description}) => {
  return(
    <div className="list-inline mb-0 align-self-center">
      <button
        type="button"
        // className="btn btn-success btn-round waves-effect waves-light"
        className="btn btn-outline-success btn-round waves-effect waves-light"
        onClick={() => {
          Swal.fire({
            // title: 'Appointment',
            showClass: {
              popup: 'animate__animated animate__fadeIn animate__faster'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOut  animate__faster'
            },
            html: `
            <div class='col'>
            <img 
              class='mb-10'
              height=100
              src=${AWS_BUCKET_SERVICES}providers/${image}
            ></img>

            <b>Provider:</b> ${provider_name}<br>
            <br>
            ${provider_description}<br><br>
              <b>Appointment Period:</b><br>  ${appointmentPeriod[0]}-${appointmentPeriod[1]}<br> 
              </div>
            `,
            // { AWS_BUCKET_SERVICES } + profile.picture,
          })
        }}
      >
        View Visit Summary
      </button>
    </div>
  )}
function StartButton({appointment,joinAppointment}){
  
  return(
    <div className="list-inline mb-0 align-self-center">
      <button
        type="button"
        className="btn btn-gradient-success btn-round waves-effect waves-light"
        onClick={()=>joinAppointment(appointment)}
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
    
    5: "text-success",
    
    6: "text-success",
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
    1: "badge-soft-success",
    2: 'badge-soft-danger',
    3: 'badge-soft-danger',
    4: "badge-soft-success",
    5: "badge-soft-success",
    6: "badge-soft-success",
  }
  const statusText = {
    0: 'For Approval',
    1: "Completed",
    2: 'Cancelled By You',
    3: 'Cancelled By Doctor',
    4: "Approved",
    5: "Started",
    6: "Created By Doctor",
  }
  return (
    <span className={`virtualvisitbadge badge badge-md ml-0 ${statusColor[status]}`}>
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
const AppointmentAction = ({ status ,visit_id, appointmentTime ,image,provider_name, provider_description, appointment ,joinAppointment}) => {

  const appointmentPeriod=[moment(appointmentTime),moment(appointmentTime).add(1, 'hours')]
  const withinAppointmentPeriod=(timenow>appointmentPeriod[0]&&timenow<appointmentPeriod[1])
  const appointmentETA=HMFormat(moment(appointmentTime).diff(timenow, 'minutes', true))

  // const appointmentETAhrs=parseInt(moment(appointmentTime).diff(timenow, 'hours', true))
  
  
  if (status==="4"&& withinAppointmentPeriod){
    return (
      <>
        <h6 className="m-3">Virtual visit period is now!</h6>
        
        <StartButton appointment={appointment} joinAppointment={joinAppointment}/>
      </>
    )}
  else if (status==="4"&& !withinAppointmentPeriod&&timenow>appointmentPeriod[1]){
      return (
        <div className="col-md-12">
          <h6 className="m-3">Virtual visit period is over.</h6>
        <ViewVisitButton appointmentPeriod={[moment(appointmentTime).format('MMM DD, yyyy hh:mm'),moment(appointmentTime).add(1, 'hours').format('hh:mm')]} image={image} provider_name={provider_name} provider_description={provider_description}  />
        {/* <StartButton appointment={appointment}/> */}
        </div>
      )}
  else if (status==="4" && timenow<appointmentPeriod[1]){
    return (
      <div className="col-md-12 ">
        <h6 className="m-3">Appointment ETA: {appointmentETA}
        </h6>
        <CancelButton visit_id={visit_id}/>
      </div>
    )}
    
  else if (status==="0"){
    return (
      <div className="col-md-12 ">
        <h6 className="m-3">Awaiting doctor {provider_name}'s approval.</h6>
        <CancelButton visit_id={visit_id}/></div>
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
        <div width={"1000px"}>
          <h3>Time Now:</h3> 
          <i className="far fa-fw fa-clock"></i>{dateTimeFormat(timenow)}
        </div>
      </CardItem>
    )
}
function AppointmentItem({
    provider_description,
    provider_name,
    provider_id,
    image,
    service_description,
    service_name,
    service_id,
    trans_start,
    trans_date_time,
    visit_id,status,joinAppointment}){
  
  const dateTime=(trans_date_time+", "+trans_start+":00")

  const date=moment(trans_date_time).format('MMM DD, YYYY')
  const time=moment(trans_date_time+", "+trans_start+":00").format('hh:mm A')+" - "+moment(dateTime).add(1, 'hours').format('hh:mm A')
  // const time=moment(dateTime).get('hour')+":"+moment(dateTime).get('minute')
  return(
    <div className="card" id={service_id} >
    <div className="card-body">
      <div className="task-box row" key ={visit_id}>

        <div className="task-priority-icon">
          {/* <i className="fas fa-circle text-purple"></i> */}
          <StatusIcon icontype={status}/>
        </div>
        {/* {dateTimeFormat(trans_date_time+", "+trans_start+":00")} */}
        <div className="media col-lg-12">
          
          <div className="media col-md-8">
            
            <Link className="" to={`/patient/marketplace/provider/${provider_id}`}>
              <img
                src={AWS_BUCKET_SERVICES+"providers/"+image}
                alt="user"
                className="rounded-circle thumb-md"
              />
            </Link>
            <div className="media-body align-self-center ml-3">
              Appointment With:
              <p className="font-16 font-weight-bold mb-0 ">
              
                  <Link className="" to={`/patient/marketplace/provider/${provider_id}`}>
                    {provider_name}
                </Link>
                
              </p>
              <StatusText status={status}/>
              <p className="mb-0 font-12 text-muted">Provider</p>
            </div>
            
          </div>
          <div className="col-lg-4 text-right w-100">
            <div className="text-muted">
              <b>{date}</b><br/>
                <i className="far fa-fw fa-clock"></i>
                {time}
            </div>
          </div>
        </div>
        <div className="row m-2 bg-light w-100">
         
          <div className="col m-1">
          
            <p className="font-18 mb-0 virtDesc">
              Service Title: <strong>{(service_name===""?"Untitled":service_name)}</strong> 
            </p>
            <p className="font-14 mt-0 mb-0 virtDesc">
              Service Description:  <strong>{service_description}</strong> 
            </p>
          </div>
        </div>
        <div className="col-md-12 text-right m-2">
          
          <AppointmentAction status={status} visit_id={visit_id} appointmentTime={dateTime} image={image} provider_name={provider_name} provider_description={provider_description} appointment={visit_id} joinAppointment={joinAppointment} />
          
        </div>
      </div>
    </div>
  </div>
    )}
function Appointment() {
  
  const { auth } = useAuth()
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
  const [delay, setDelay] = useState('10000')
  
  const [sample_appointmentsList,setSample_AppointmentsList] = useState([
    {provider_description:"Hi! I`m Jane Doe",
      provider_name:"Jane Doe",
      service_description: "service desc",
      provider_id:"323123",
      service_id: "16",
      service_name: "Service Name",
      status: "4",
      trans_date_time: "2023-02-14",
      trans_end:null,
      trans_start:"18",
      visit_id: "378"}
  ])
  const [meetingID, setMeetingID] = useState({})
  const [password, setPassword] = useState({})
  const [isReady, setIsReady] = useState(false)
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  let isMounted = true
  const controller = new AbortController()
  const [errMsg, setErrMsg] = useState(null)
  async function joinAppointment (appointment) {
    
     
      let isMounted = true
      await axiosPrivate
        .post(
          'patientJoinAppointment',
          { Email: auth.email,
            VisitID:appointment},
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          const { Data } = res.data

          console.log("Data",Data,res.data?.Status)
          setMeetingID(Data.MeetingID)
          setPassword(Data.Passcode)
          
          if (res.data?.Status === true) {
            setDelay(null)
            setIsReady(true)
           
            navigate('/virtualvisit/room', {
              state: 
              {MeetingID:Data.MeetingID,
              Password:Data.Passcode}
            })
          } else {
            setIsReady(false)
          }
        })
        .catch((err) => console.error(err))
    }
  async function getList() {
    await axiosPrivate
      .post(
        'getPatientAppointments',
        { Email: auth.email },
        {
          signal: controller.signal,
        }
      )
      .then((res) => {
        const { Status, Data: data = [], Message } = res.data

        if (Status && isMounted) {
          console.log(data)
          // sampledata={
          //   provider_description:"I am a theoretical neurobiologist, Affiliate Professor of Psychiatry and Behavioral Sciences at the University of Connecht.",
          //   provider_name:"John Doe",
          //   service_description: "service desc",
          //   provider_id:"323123",
          //   service_id: "16",
          //   service_name: "Service Name",
          //   status: "4",
          //   trans_date_time: "2023-03-14",
          //   trans_end:null,
          //   trans_start:"18",
          //   visit_id: "378"
          // }
          setAppointmentsList(data)

        } else {
          throw new Error(Message)
        }
      })
      .catch((err) => {
        setErrMsg(err.message)
      })
  }
  useEffect(()=>{
    getList()  
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
          <TimeCard/>
          {(appointmentsList.length>0)?
          (<div className="row">
            <div className="col-lg-12">
              {appointmentsList.map((appointment,index)=>
              <AppointmentItem {...appointment} joinAppointment={joinAppointment} key={index} />
              )}
            </div>
          </div>):<CardItem><h4><div className='d-flex justify-content-center'><RingLoading size={200}/></div></h4></CardItem>}
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default Appointment

import FullCalendar from '@fullcalendar/react'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Footer from '../../../components/Footer'
import { AWS_BUCKET_SERVICES } from '../../../constants'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import moment from 'moment'
import { TableTitle } from '../../../components/table/Tables'

import ImageViewer from 'react-simple-image-viewer';
import { Rating } from 'react-simple-star-rating'
import useAuth from '../../../hooks/useAuth'
import CardItem from '../../../components/cards/Card'

import { useCallback } from 'react'


// needed for the style wrapper
import styled from "@emotion/styled"
import Swal from 'sweetalert2'
import RingLoading from '../../../components/lottie/RingLoading'
import { useMediaQuery } from '@react-hook/media-query'


// add styles as css
export const StyleWrapper = styled.div`
  .fc-button.fc-prev-button, .fc-button.fc-next-button, .fc-timegrid-event, .fc-button.fc-button-primary{
    background: green;
    background-image: none 
  } 
   .fc-event {cursor: pointer;waves-effect}
  .styles-module_image__2hdkJ{
    height : auto;
    max-height: 780px;
    margin-bottom : 120px;
    
    
    }
  .styles-module_navigation__1pqAE{
    z-index : 1080;
  }
  .styles-module_wrapper__1I_qj{
    // margin-top : 2070px;
    background-color :rgba(0 0 0 / 50%);
  }
  img{
    
    object-fit:contain;
    opacity: 1.0 !important;
    
  }
`
export default function Booking() {
  
  const matches = useMediaQuery('only screen and (max-width: 1510px)')
  const { state: selectedProvider } = useLocation()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const { auth, setAuth } = useAuth()
  const {id}=useParams()
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  const [moveIcons,setMoveIcons]= useState(matches)
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const effectRun = useRef(false);
  const [serviceDetails,setServiceDetails] = useState({})
  const [service,setService] = useState({})
  const [isLoading,setIsLoading]=useState(true)
  const [serviceImages,setServiceImages] = useState([])
  const [serviceClinics,setServiceClinics] = useState([])

  const [selected_clinic_index,setSelected_clinic_index]=useState(0)
  const [providerSched, setProviderSched] = useState({
    hours_mon_start: '8',
    hours_mon_end: '17',
    hours_tue_start: '8',
    hours_tue_end: '17',
    hours_wed_start: '8',
    hours_wed_end: '17',
    hours_thu_start: '8',
    hours_thu_end: '17',
    hours_fri_start: '8',
    hours_fri_end: '17',
    hours_sat_start: '8',
    hours_sat_end: '17',
    hours_sun_start: '8',
    hours_sun_end: '17',
  })
  const [weeklySched, setWeeklySched] = useState({
    Mon: { start: 8, end: 17 },
    Tue: { start: 8, end: 17 },
    Wed: { start: 8, end: 17 },
    Thu: { start: 8, end: 17 },
    Fri: { start: 8, end: 17 },
    Sat: { start: 8, end: 17 },
    Sun: { start: 8, end: 17 },
  })
  const [calendarStartEndTime, setCalendarStartEndTime] = useState({
    start: 8,
    end: 17,
  })

  const navigate = useNavigate()
  const [slots, setSlots] = useState([])

  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   })
    // }
  }
  const handleEventClick = (clickInfo) => {
    const dateX = moment(clickInfo.event.startStr).format('MM/DD/YY')
    const timeX = moment(clickInfo.event.startStr).format('HH')
    const clinic_obj=serviceClinics[selected_clinic_index]
    console.log(selectedProvider)
    const state = {
      selectedProvider,
      provider:{provider_id:serviceDetails.provider_id},
      timeSlot: {
        dateX,
        timeX,
      },
      clinic_obj
      
    }
    if (auth.userType==="Patient"){
      Swal.fire(
        {
          title: 'Start Booking',
          html:`Are you sure you want to book on this slot/time?<br> 
          <b>
          ${moment(
              clickInfo.event.startStr).format('MMM DD, YYYY, hA'
              )}</b>
            <br><br>
            <img 
              class="" 
              style="height: 150px;width: 200px; object-fit:cover" 
              src="${
                (serviceClinics[selected_clinic_index].default_image!=="Default.png")?
                AWS_BUCKET_SERVICES+"clinics/"+serviceClinics[selected_clinic_index].clinic_id+"/"+serviceClinics[selected_clinic_index].default_image:
                AWS_BUCKET_SERVICES+"clinics/Default.png"
              }">
            <br>
            <b>Clinic:</b> ${serviceClinics[selected_clinic_index].clinic_name}<br>
            <b> Clinic Address:</b> ${serviceClinics[selected_clinic_index].address}
              `,
          showCancelButton: true,
          confirmButtonColor: '#008000',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK'
        }
      )
      .then(({isConfirmed}) => {
      if (isConfirmed){
        navigate('../checkout', {
          state,
        })}
      })
    }
  }

  const handleEvents = (events) => {
    // console.log(events)
  }

  const INITIAL_EVENTS = (appointments = []) => {
    const schedArray = []
    const startDate = moment().startOf('week')
    const endDate = moment().add(6, 'months')
    const startEndDateDiff = endDate.diff(startDate, 'days')
    const timeNow=moment()
    
    for (let index = 0; index < startEndDateDiff; index++) {
      const currentD = startDate
        .add(index === 0 ? 0 : 1, 'days')
        .format('YYYY-MM-DD')
      const _today = startDate.format('ddd')
      for (
        let j = weeklySched[_today].start;
        j <= weeklySched[_today].end;
        j++
      ) {
        let doAppend = (appointments.some(
          (item) =>
            item.trans_date_time === currentD && item.trans_start === String(j)
        ))

        if (doAppend) {
          continue
          
        } else {
          let timeStr = j
          if (j < 10) {
            timeStr = '0' + j
          }
          const startStr = `${currentD}T${timeStr}:00:00`
      
          // console.log('compare',moment(startStr).format('YYYY-MM-DD hh:mm'),"timenow", timeNow.format('YYYY-MM-DD hh:mm'))
          // Condition compares looped time with current time, prevents booking on already past time
          if (moment(startStr).isAfter(timeNow)){ 
            // Adds appointment button
            
              schedArray.push({
              id: 'id_' + index + j,
              title: 'Open',
              start: startStr,
              backgroundColor: '#1eca7b',
              borderColor: 'transparent',
            })
          }
          
        }
      }

     
    }
    setSlots(schedArray)
  }

  useEffect(() => {
    if (matches) {
      setMoveIcons(true)
    }
    if (!matches) {
      setMoveIcons(false)
    }
  },[matches])
  useEffect(() => {
    
    // TODO: CHECK IF providerSched is not SET e.g. not available on sat and sun
    const startTimeArr = []
    const endTimeArr = []
    const _weeklySched = weeklySched

    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    
    for (const [key, value] of Object.entries(providerSched)) {
      // console.log("provsched",key,value)
      for (const day of weekdays) {
        if (key.includes(day.toLowerCase())) {
          if (key.includes('start')) {
            _weeklySched[day].start = Number(value)
            startTimeArr.push(Number(value))
          } else {
            _weeklySched[day].end = Number(value)
            endTimeArr.push(Number(value))
          }
        }
      }
    }

    const startTime = startTimeArr.reduce((a, b) => Math.min(a, b), [8])
    const endTime = endTimeArr.reduce((a, b) => Math.max(a, b), [17])
    

    setCalendarStartEndTime({ start: startTime, end: endTime })
    setWeeklySched(weeklySched)
  }, [providerSched])


  // useEffect(()=>{
  //   let isMounted = true
    
  //   const controller = new AbortController()
   
    
  //   return () => {
  //     isMounted = false
  //     controller.abort()
  //   }
  // },[])
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    async function getService() {
      await axiosPrivate
        .post(
          (auth.userType==="Patient")?'patientGetService':"providerGetService",
          { Email: (auth.email),
            ServiceID:id },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          const { Status, Data: data = [], Message } = res.data
          
          
          if (Status) {
            isMounted && setServiceDetails(data.service_details)
            console.log("serviceDetails", data.service_details)
            setServiceClinics(data.clinics)
            if (auth.userType==="Patient"){
              getDoctorSchedule(data.service_details.provider_id)
            
              getSched(data.service_details.email)
              
              setService(data)
              var tempImageList=[]
              if (data.service_details.image1){
                tempImageList.push(AWS_BUCKET_SERVICES+"services/"+data.service_details.service_number+"/"+data.service_details.image1)
                // `${AWS_BUCKET_SERVICES}services/${serviceDetails?.service_number}/${serviceImages[0]}`
              }
              if (data.service_details.image2){
                tempImageList.push(AWS_BUCKET_SERVICES+"services/"+data.service_details.service_number+"/"+data.service_details.image2)
              }
              if (data.service_details.image3){
                tempImageList.push(AWS_BUCKET_SERVICES+"services/"+data.service_details.service_number+"/"+data.service_details.image3)
              }
              if (data.service_details.image4){
                tempImageList.push(AWS_BUCKET_SERVICES+"services/"+data.service_details.service_number+"/"+data.service_details.image4)
              }
              if (data.service_details.image5){
                tempImageList.push(AWS_BUCKET_SERVICES+"services/"+data.service_details.service_number+"/"+data.service_details.image5)
              }
              setServiceImages(tempImageList)
              console.log(tempImageList)
            }
            else{
              setIsLoading(false)
              
            }
            
            
            
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
          setErrMsg(err.message)
        })
      }
    async function getDoctorSchedule(providerID) {
      await axiosPrivate
        .post(
          'getDoctorSchedule',
          { ProviderID: providerID },
          { signal: controller.signal }
        )
        .then((res) => {
          const { Status, Data: data = [], Message } = res.data

          if (Status) {
            // console.log("providerschedule",data)
            isMounted && setProviderSched(data)
            
            
            
          } else {
            throw new Error(Message)
          }


          
        })
        .catch((err) => {
          console.error(err)
          setErrMsg(err.message)
        })
    }
    async function getSched(providerEmail) {
      await axiosPrivate
        .post(
          'getProviderOccupiedTimeslots',
          { Email: providerEmail },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          const { Status, Data: data = [], Message } = res.data
          console.log("provideroccupiedtimeslots",data)
          if (Status) {
            setIsLoading(false)
            isMounted && INITIAL_EVENTS(data)
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
          setErrMsg(err.message)
        })
      }
    // if (effectRun.current){
      getService()
      console.log(selectedProvider)
    // }
    return () => {
      isMounted = false
      controller.abort()
      // effectRun.current = true;
    }
  }, [])


  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="container-fluid">
          {/* <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box">
                <div className="float-right">
                 
                </div>
                <h4 className="page-title">Book Appointment</h4>
              </div>
            </div>
          </div> */}
          <TableTitle title = {auth.userType==="Patient"?"Book Appointment":"Service"}>
            <div className="float-right">    
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="..">Marketplace</Link>
                </li>
                <li className="breadcrumb-item active">
                  {serviceDetails?.provider_name}
                </li>
              </ol>
            </div>
          </TableTitle>
          {(isLoading)?<CardItem><div className='d-flex justify-content-center'><RingLoading size={200}/></div></CardItem>:<>
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body doctor">
                  <div className="met-profile">
                    <div className="col ">
                      {/* <div className="row-lg-4 align-self-center mb-3 mb-lg-0 "> */}
                      {/* Sir Tata {`${AWS_BUCKET_SERVICES}services/${serviceDetails?.image1}`} */}
                      <div className="row ">
                        <div className='d-flex justify-content-center'>
                        <Link onClick={() => openImageViewer(0)}>
                            <img
                              src={`${serviceImages[0]}`}
                              alt=""
                              // width={30}
                              style={{objectFit:'cover',width:'100%',minWidth:'148px', maxWidth:'560px', maxHeight:'380px', height:'auto'}}
                              // className="rounded-circle"
                            />
                            </Link>
                        </div> 
                        {/* <div className='d-flex justify-content-center'> */}
                        
                          <div className={`row${moveIcons?"":"-lg"}`}>
                          {serviceImages.map((serviceImage,index)=>{
                              // console.log("ServeIMG",serviceImage);
                              if (index!==0){
                              return(
                              <div className='row-sm-3 m-2 ml-3'>
                              <Link 
                                onClick=
                                {() => {console.log(isViewerOpen);
                                  
                                  openImageViewer(index)}}>
                              <img
                                src={`${serviceImage}`}
                                alt=""
                                // width={30}
                                // className='img-thumbnail'
                                style={{
                                  objectFit:'contain',
                                  width:'100%',
                                  minWidth:'140px',
                                  maxWidth:'140px', 
                                  maxHeight:'200px', 
                                  height:'140px'}}

                                // className="rounded-circle"
                              />
                              </Link>
                              </div>
                              )}
                            })
                          }
                          </div>
                        {/* </div> */}
                        </div>
                        <div className="met-profile-main">
                          {/* <div className="met-profile-main-pic"> */}
                          
                          {/* </div> */}
                          <div className="met-profile_user-detail m-4">
                            {/* <Link to={"/patient/marketplace/provider/"+(serviceDetails?.provider_id)}> */}
                              Service Title:
                              <h3 className="">
                                {serviceDetails?.service_name}
                              </h3>
                            {/* </Link> */}
                            Service Description:
                            <h4 className="mb-4">
                              {serviceDetails?.service_description}

                            </h4>
                            <p>
                              {/* <label htmlFor="checkbox3">
                                <i className="mdi mdi-star text-warning"></i>
                                <i className="mdi mdi-star text-warning"></i>
                                <i className="mdi mdi-star text-warning"></i>
                                <i className="mdi mdi-star text-warning"></i>
                                <i className="mdi mdi-star text-warning"></i>
                              </label> */}
                              <b>Average Rating:</b><br/>
                              <Rating
                                fillColor="#ffb822"
                                emptyColor="white"
                                SVGstrokeColor="#f1a545"
                                SVGstorkeWidth={1}
                                size={14}
                                allowFraction={true}
                                initialValue={service?.average}
                                readonly={true}
                              /><br/>
                              {service?.average} ({service?.total_reviews} Total Reviews)
                            </p>
                            <h5>
                              <b>Price:</b>{' '}
                              $ {serviceDetails?.cost_price}
                            </h5>
                          </div>
                        
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {(auth.userType==="Patient")?
            <div className='col-lg-4'>
              <div className='card'>
                <div className='card-body'>
                  
                <div className="row-lg-4 ml-auto" style={{marginLeft:'10px'}}>
                       <div className='row'>
                          <Link to={"/patient/marketplace/provider/"+(serviceDetails.provider_id)}>    
                          {(serviceDetails)?(
                            <img
                              src={`${AWS_BUCKET_SERVICES}providers/${serviceDetails?.provider_photo}`}
                              alt=""
                              // width={120}
                              // height={120}
                              // style={{objectFit:'cover'}}
                              style={{ 
                                // width: 'unset', 
                                 maxWidth:'120px',maxHeight:'120px',
                                 width:'100%', height:'auto',objectFit: 'cover'}}
                              // className="rounded-circle"
                            />):null
                          }
                            </Link>
                          <div className='col'>
                              <Link to={"/patient/marketplace/provider/"+(serviceDetails.provider_id)}>    
                                <h3 className="met-user-name">
                                  {serviceDetails?.provider_name}
                                </h3>
                              </Link>
                              <ul className="list-unstyled personal-detail">
                                  {/* <li className="">
                                    <i className="dripicons-message mr-2 text-info font-18 mt-2 mr-2"></i>{' '}
                                    <b> Clinics </b> :
                                    {serviceClinics[0]?.clinic_name}
                                  </li> */}
                                  <li className="mt-2">
                                    <i className="far fa-money-bill-alt text-info font-18 mt-2 mr-2"></i>
                                    <b>Email </b> : {' '}
                                    {serviceDetails?.email}
                                  </li>
                                  <li className="mt-2">
                                    <i className="dripicons-location text-info font-18 mt-2 mr-2"></i>{' '}
                                    <b>Contact</b> :{' '}
                                    {serviceDetails?.provider_contact}
                                  </li>
                                  <li className="mt-2">
                                    <i className="far fa-money-bill-alt text-info font-18 mt-2 mr-2"></i>
                                    <b>Specialization </b> : {' '}
                                    {serviceDetails?.provider_practice}
                                  </li>
                              </ul>
                            </div>
                          </div>
                      </div>
                  </div>
                </div>

            </div>:null}
          </div>

          <div className="row">
            <div className="col-lg-5">
              <h4>Clinic</h4>
              <div className="card">
                  <div className="card-body">
                  <h4> <b>Available Clinics with this Service</b></h4> 
                  <div className='text-muted'>Choose a clinic for this service</div>
                    {serviceClinics.map((item,index) => (
                              // <CardItem title="Clinic">
                      <div key={index} className="card" >
                        <div className="card-body">
                        
                          <div className='row'>
                            
                          <div>
                          <img
                            className='card-img-top'
                            style={{ 
                              // width: 'unset', 
                               maxWidth:'180px',maxHeight:'130px',
                               width:'100%', height:'auto',objectFit: 'cover'}}
                            // src={`${AWS_BUCKET_SERVICES}/assets/images/users/user-10.jpg`}
                            // src={item.default_image==="Default.png"?(AWS_BUCKET_SERVICES+"clinics/Default.png"):AWS_BUCKET_SERVICES+"clinics/"+serviceDetails.clinic_ids.split(',')[index]+"/"+item.default_image}
                            src={item.default_image==="Default.png"?(AWS_BUCKET_SERVICES+"clinics/Default.png"):AWS_BUCKET_SERVICES+"clinics/"+item.clinic_id+"/"+item.default_image}
                            // style={{}}
                            alt=''
                          />
                          
                              
                              {/* <p className='card-text mb-0'>{item.address}</p>
                              <p className='text-muted mb-0'>
                                {item.specialty}
                              </p> */}
{/*                               
                              <p className='mb-0'>{item.working_hours}</p> */}
                              {/* </CardItem> */}
                              </div>
                              <div className='row-lg-8'>
                                <ul className="list-unstyled personal-detail m-3">
                                  <li className="mt-2">
                                    <h5 className='card-title'>{item.clinic_name}</h5>
                                  </li>
                                  <li className="mt-2">
                                    <i className="dripicons-message mr-2 text-info font-18 mt-2 mr-2"></i>{' '}
                                    <b> Specialization </b> : <br/>
                                    {serviceClinics[index]?.specialty}
                                  </li>
                                  <li className="mt-2">
                                    <i className="dripicons-location text-info font-18 mt-2 mr-2"></i>{' '}
                                    <b>Location</b> :<br/>
                                    {serviceClinics[index]?.address}
                                  </li>
                                  
                                </ul>
                                
                              </div>
                              
                            </div>
                            <div className='row-lg'>
                              <button 
                          className={`btn waves ${selected_clinic_index===index?"btn-success":"btn-gray"}`}
                          onClick={()=>{setSelected_clinic_index(index)}}
                        
                        >
                          
                          {selected_clinic_index===index?"Chosen":"Choose"}
                        </button>
                        </div>
                        </div> 
                  </div>           
                            ))}
              </div>
                  </div>
            </div>

            <div className="col-lg-7" >
              <h4>{auth.userType==="Patient"?"Choose Appointment Schedule":"Provider's Schedule"}</h4>
              <div className="card">
                <div className="card-body">
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                  <div id="calendar" ></div>
                  <StyleWrapper>
                    <FullCalendar
                      
                      plugins={[timeGridPlugin]}
                      headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: '',
                      }}
                      initialView="timeGridWeek"
                      events={slots}
                      slotMinTime={`${calendarStartEndTime.start - 1}:00:00`}
                      slotMaxTime={`${Number(
                        calendarStartEndTime.end + 1
                      )}:59:00`}
                      allDaySlot={false}
                      editable={false}
                      selectable={true}
                      slotDuration={'00:20:00'}
                      select={handleDateSelect}
                      eventClick={handleEventClick}
                      eventsSet={handleEvents}
                      eventAdd={function ({ event }) {
                        console.log('eventAdd', event)
                      }}
                      eventChange={function ({ event }) {
                        console.log('eventChange', event)
                      }}
                      eventRemove={function (event) {
                        console.log('eventRemove', event)
                      }}
                    />
                    </StyleWrapper>
                  {/* <div className="clearfix"></div> */}
                </div>
              </div>
            </div>
          </div>
          </>
          }
        </div>

        <Footer />
      </div>
      {isViewerOpen?(
        <div style={{marginTop:'100px', zIndex:1020}}>
          <StyleWrapper>
            <ImageViewer
              src={ serviceImages }
              currentIndex={ currentImage }
              disableScroll={ true   }
              closeOnClickOutside={ true }
              onClose={ closeImageViewer }
            />
          </StyleWrapper>
        </div>
      ):null}
    </div>
  )
}

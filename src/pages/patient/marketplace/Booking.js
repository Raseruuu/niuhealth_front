import FullCalendar from '@fullcalendar/react'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Footer from '../../../components/Footer'
import { AWS_BUCKET_SERVICES } from '../../../constants'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import moment from 'moment'
import { TableTitle } from '../../../components/table/Tables'

import { Rating } from 'react-simple-star-rating'
import useAuth from '../../../hooks/useAuth'
import CardItem from '../../../components/cards/Card'


// needed for the style wrapper
import styled from "@emotion/styled"
import Swal from 'sweetalert2'


// add styles as css
export const StyleWrapper = styled.div`
  .fc-button.fc-prev-button, .fc-button.fc-next-button, .fc-timegrid-event, .fc-button.fc-button-primary{
    background: green;
    background-image: none
    
} .fc-event {cursor: pointer;waves-effect}
`
export default function Booking() {
  const { state: selectedProvider } = useLocation()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const { auth, setAuth } = useAuth()
  
  const effectRun = useRef(false);
  const [serviceDetails,setServiceDetails] = useState({})
  const [serviceClinics,setServiceClinics] = useState([])
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

    const state = {
      selectedProvider,
      timeSlot: {
        dateX,
        timeX,
      },
      
    }
    
    Swal.fire(
      {
        title: 'Start Booking',
        html:`Are you sure you want to book on this slot/time?<br> ${moment(
            clickInfo.event.startStr).format('MMM DD, YYYY, hA')}?`,
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
              title: 'Available',
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
          'patientGetService',
          { Email: (auth.userType==="Patient"?auth.email:"patient1@gmail.com"),
            ServiceID:selectedProvider.service_id },
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
            getDoctorSchedule(data.service_details.provider_id)
            getSched(data.service_details.email)
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
          <TableTitle title = "Book Appointment">
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
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body doctor">
                  <div className="met-profile">
                    <div className="row ">
                      {/* <div className="row-lg-4 align-self-center mb-3 mb-lg-0 "> */}
                      {`${AWS_BUCKET_SERVICES}services/${serviceDetails?.image1}`}
                        <div className='d-flex justify-content-center'>
                            <img
                              src={`${AWS_BUCKET_SERVICES}services/${serviceDetails?.image1}`}
                              alt=""
                              // width={30}
                              height={300}
                              style={{objectFit:'cover'}}
                              // className="rounded-circle"
                            />
                        </div> 
                        <div className="met-profile-main">
                          {/* <div className="met-profile-main-pic"> */}
                          
                          {/* </div> */}
                          <div className="met-profile_user-detail">
                            <Link to={"/patient/marketplace/provider/"+(serviceDetails?.provider_id)}>
                              
                              <h5 className="met-user-name">
                                {serviceDetails?.service_name}
                              </h5>
                            </Link>
                            <p className="mb-0 met-user-name-post">
                              {serviceDetails?.service_description}

                            </p>
                            <p>
                              {/* <label htmlFor="checkbox3">
                                <i className="mdi mdi-star text-warning"></i>
                                <i className="mdi mdi-star text-warning"></i>
                                <i className="mdi mdi-star text-warning"></i>
                                <i className="mdi mdi-star text-warning"></i>
                                <i className="mdi mdi-star text-warning"></i>
                              </label> */}
                              
                              <Rating
                                fillColor="#ffb822"
                                emptyColor="white"
                                SVGstrokeColor="#f1a545"
                                SVGstorkeWidth={1}
                                size={14}
                                allowFraction={true}
                                initialValue={selectedProvider?.rating}
                                readonly={true}
                              />
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
                              height={120}
                              style={{objectFit:'cover'}}
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

            </div>
          </div>

          <div className="row">
            <div className="col-lg-5">
              <h4>Clinic</h4>
              <div className="card">
                  <div className="card-body">
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
                              width:'180px', height:'130px',objectFit: 'cover'}}
                            // src={`${AWS_BUCKET_SERVICES}/assets/images/users/user-10.jpg`}
                            // src={item.default_image==="Default.png"?(AWS_BUCKET_SERVICES+"clinics/Default.png"):AWS_BUCKET_SERVICES+"clinics/"+serviceDetails.clinic_ids.split(',')[index]+"/"+item.default_image}
                            src={item.default_image==="Default.png"?(AWS_BUCKET_SERVICES+"clinics/Default.png"):AWS_BUCKET_SERVICES+"clinics/"+item.clinic_id+"/"+item.default_image}
                            // style={{}}
                            alt=''
                          />
                          
                              <h5 className='card-title'>{item.clinic_name}</h5>
                              <p className='card-text mb-0'>{item.address}</p>
                              <p className='text-muted mb-0'>
                                {item.specialty}
                              </p>
                              
                              <p className='mb-0'>{item.working_hours}</p>
                              {/* </CardItem> */}
                              </div>
                              <div>
                                <ul className="list-unstyled personal-detail">
                                  <li className="">
                                    <i className="dripicons-message mr-2 text-info font-18 mt-2 mr-2"></i>{' '}
                                    <b> Specialization </b> : 
                                    {serviceClinics[index]?.specialty}
                                  </li>
                                  <li className="mt-2">
                                    <i className="dripicons-location text-info font-18 mt-2 mr-2"></i>{' '}
                                    <b>Location</b> :
                                    {serviceClinics[index]?.address}
                                  </li>
                                 
                                </ul>
                              </div>
                            </div>
                        </div> 
                  </div>           
                            ))}
              </div>
                  </div>
            </div>

            <div className="col-lg-7">
              <h4>Choose Appointment Schedule</h4>
              <div className="card">
                <div className="card-body">
                  <div id="calendar"></div>
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
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}

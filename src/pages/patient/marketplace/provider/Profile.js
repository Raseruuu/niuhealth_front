import { Link, useParams } from "react-router-dom"
import { AWS_BUCKET, AWS_BUCKET_PROFILES, AWS_BUCKET_SERVICES } from "../../../../constants"
import TableCard, { ContainerFluid, TableTitle } from "../../../../components/table/Tables"
import { useEffect, useState } from 'react'
import useAuth from '../../../../hooks/useAuth'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'
import { Rating } from 'react-simple-star-rating'

import styled from "@emotion/styled"
// TODO: check other UI if it has same layout
export const StyleWrapper = styled.div`
  .fc-button.fc-prev-button, .fc-button.fc-next-button, .fc-timegrid-event, .fc-button.fc-button-primary{
    background: green;
    background-image: none
    
} .fc-event {cursor: pointer;waves-effect}
`
function ProviderProfile() {
  
  const [profile, setProfile] = useState({})
  
  const [errMsg, setErrMsg] = useState(null)  
  const [reviews, setReviews] = useState([])
  const { id } = useParams()
  const [active,setActive]=useState(1)
  const axiosPrivate = useAxiosPrivate()
  let isMounted = true
  const controller = new AbortController()
  const [clinicList, setClinicList] = useState([])
  const [calendarStartEndTime, setCalendarStartEndTime] = useState({
    start: 8,
    end: 17,
  })
  
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
  const [slots, setSlots] = useState([])
  const { auth } = useAuth()
  function reviewFormat(string){
  
    if (string?.length>150){
      return string.substring(0,150)+"..."}
    return string
  }
  // let {
  //   state: { selectedUser },
  // } = useLocation()

  // console.log("selectedUser", selectedUser)
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
  const handleEvents = (events) => {
    // console.log(events)
  }

  const handleEventClick = (clickInfo) => {
    const dateX = moment(clickInfo.event.startStr).format('MM/DD/YY')
    const timeX = moment(clickInfo.event.startStr).format('HH')

    const state = {
      profile,
      timeSlot: {
        dateX,
        timeX,
      },
    }
    
    
  }
  function showReview({patientPicture,patientName,patientEmail,rating,service_name,service_description,review}){
    Swal.fire({
      title: `Patient's Review`,
      html: 
        `
        <div class='row'>
            <div class='col-sm-2'>
              <img 
                class='rounded-circle'
                height="100px"
                src="${(AWS_BUCKET_PROFILES)+(patientPicture)}"
                style={
                  width: 60px;
                  height: 60px;
                  object-fit: cover;}
                >  
              </img>
            </div>
            <div class='col-sm-8'>
              <p class='font-22 font-weight-bold responsive'}>${patientName} </p>
              <p className='mb-0 font-12 text-muted responsive'>${patientEmail}</p>
              <div class='col'>
                <i class='mdi mdi-star text-warning'></i>
                ${rating} Stars
              </div>  
            </div>
    
        </div>
        <b>${service_name}</b> <br>
        <i>${service_description}</i> <br>
        <p class='mb-0 font-18 text-dark responsive'>"${review}"</p> <br>
        `
    })
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
          schedArray.push({
              id: 'id_' + index + j,
              title: 'Available',
              start: startStr,
              backgroundColor: '#516856',
              borderColor: '#1eca7b',
            })
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
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    async function getDoctorSchedule() {
      console.log(profile?.ProviderDetails?.provider_id )
      await axiosPrivate
        .post(
          'getDoctorSchedule',
          { ProviderID: id },
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
    async function getSched(email) {
      await axiosPrivate
        .post(
          'getProviderOccupiedTimeslots',
          { Email: email },
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
    async function getProfileDetails() {
      
      await axiosPrivate
        .post(
          'patientGetProviderDetails',
          { Email: auth.email ,ProviderID:id},
          {
            signal: controller.signal
          }
        )
        .then((res) => {
          
          const { Status, Data: data = [], Message } = res.data
          const details = data
         
          if (Status) {
            setProfile(details)
            console.log('deets',details)
            let somereviews=[]
            for (let x=0; x<10;x++){
            somereviews.push(details.ProviderRatingsAndReviews[x])}
            // console.log("somereviews",somereviews)
            setReviews(somereviews)
            getClinicList(details.ProviderDetails.email)
            
            getDoctorSchedule()
            getSched(details.ProviderDetails?.email)

          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
    async function getClinicList(provider_email) {
      await axiosPrivate
        .post(
          'getClinics',
          { Email: provider_email},
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          console.log(res)
          const { Status, Data: data = [], Message } = res.data

          if (Status) {
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
    
    getProfileDetails()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])










  // return (
  //   <div>
  //     Profile from Provider
  //     <p>Selected Patient: {JSON.stringify(selectedUser)}</p>
  //     <p>Action: {action}</p>
  //   </div>
  // )
  return (<div className="page-wrapper">
  <div className="page-content">
    <ContainerFluid>
      <TableTitle title="Provider Profile">
        <div className='float-right'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>
              <Link to='/provider'>NIU Health</Link>
            </li>
            <li className='breadcrumb-item'>
              <Link to='/provider/patient'>Provider</Link>
            </li>
            {/* <li className='breadcrumb-item active'>{selectedUser.first_name} {selectedUser.middle_name} {selectedUser.last_name}</li> */}
          </ol>
        </div>
      </TableTitle>
      
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body  met-pro-bg'>
              <div className='met-profile'>
                <div className='row'>
                  <div className='col-lg-4 align-self-center mb-3 mb-lg-0'>
                    <div className='met-profile-main'>
                      <div className='met-profile-main-pic'>
                        {(profile)?
                        <img
                          src={AWS_BUCKET_SERVICES+"providers/"+profile?.ProviderDetails?.image}
                          alt=''
                          className='rounded-circle'
                          style={{width:125,height:125,objectFit:'contain'}}
                        />:
                        <img
                          src={AWS_BUCKET_SERVICES+"providers/Default.jpg"}
                          alt=''
                          className='rounded-circle'
                          style={{width:125,height:125,objectFit:'contain'}}
                        />}
                        
                        {/* <span className='fro-profile_main-pic-change'>
                          <i className='fas fa-camera'></i>
                        </span> */}
                      </div>
                      <div className='met-profile_user-detail'>
                        <div className="row">
                        
                        <h5 className='met-user-name'>{profile?.ProviderDetails?.provider_name} </h5></div>
                        <Rating
                          fillColor="#ffb822"
                          emptyColor="white"
                          SVGstrokeColor="#f1a545"
                          SVGstorkeWidth={1}
                          size={14}
                          allowFraction={true}
                          initialValue={profile?.AverageRating}
                          readonly={true}
                          />
                        <p className='mb-0 met-user-name-post'>
                        
                        {profile?.ProviderDetails?.practice}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-4 ml-auto'>
                    <ul className='list-unstyled personal-detail'>
                      <li className=''>
                        <i className='dripicons-phone mr-2 text-info font-18'></i>{" "}
                        <b> Contact Info </b> : {profile?.ProviderDetails?.contact_info}
                      </li>
                      <li className='mt-2'>
                        <i className='dripicons-mail text-info font-18 mt-2 mr-2'></i>{" "}
                        <b> Email </b> : {profile?.ProviderDetails?.email}
                      </li>
                      {/* <li className='mt-2' style={{height:68}}>
                        <i className='dripicons-document text-info font-18 mt-2 mr-2'></i>{" "}
                        <b>About Me</b> : 
                      </li> */}
                    </ul>
                    <div className='button-list btn-social-icon'>
                      <button type='button' className='btn btn-blue btn-circle'>
                        <i className='fab fa-facebook-f'></i>
                      </button>

                      <button
                        type='button'
                        className='btn btn-secondary btn-circle ml-2'
                      >
                        <i className='fab fa-twitter'></i>
                      </button>

                      <button
                        type='button'
                        className='btn btn-pink btn-circle  ml-2'
                      >
                        <i className='fab fa-dribbble'></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-body'>
              <ul className='nav nav-pills mb-0' id='pills-tab' role='tablist'>
                <li className='nav-item'>
                  <a
                    className='nav-link active'
                    id='general_detail_tab'
                    data-toggle='pill'
                    href='#general_detail'
                  >
                    General
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    id='activity_detail_tab'
                    data-toggle='pill'
                    href='#activity_detail'
                  >
                    Services
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    id='clinics_tab'
                    data-toggle='pill'
                    href='#clinics'
                  >
                    Clinics
                  </a>
                </li>
                {/* <li className='nav-item'>
                  <a
                    className='nav-link'
                    id='settings_detail_tab'
                    data-toggle='pill'
                    href='#settings_detail'
                  >
                    FAQ
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <div className='tab-content detail-list' id='pills-tabContent'>
            <div className='tab-pane fade show active' id='general_detail'>
              <div className='row'>
                <div className='col-xl-4'>
                  <div className='card'>
                    <div className='card-body'>
                      <div className=' d-flex justify-content-between'>
                        {/* <img
                          src={`${AWS_BUCKET}/assets/images/widgets/monthly-re.png`}
                          alt=''
                          height='75'
                        /> */}
                        {/* <i class="fa-solid fa-stethoscope"></i> */}
                        {/* <div className='align-self-center'>
                          <h2 className='mt-0 mb-2 font-weight-semibold'>
                            $955
                            <span className='badge badge-soft-success font-11 ml-2'>
                              <i className='fas fa-arrow-up'></i> 8.6%
                            </span>
                          </h2>
                          <h4 className='title-text mb-0'>Total Expense</h4>
                        </div> */}
                        <i className='fas fa-stethoscope fa-fw fa-5x' style={{color: 'black'}}></i>
                        <div className='align-self-center mt-4 mb-4 ml-4 mr-4'>
                        <h2>About Me</h2><h6 className='body-text mb-0'>
                        {profile?.ProviderDetails?.provider_description}</h6>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                  <div className='card' style={{height:'auto'}}>
                    <div className='card-body dash-info-carousel'>
                      <h4 className='mt-0 header-title mb-4'>
                        Reviews
                      </h4>
                      <div className="">
                      <a
                          className='carousel-control-prev m-3'
                          href='#carousel_1'
                          role='button'
                          data-slide='prev'
                        >
                          <span
                            className='carousel-control-prev-icon'
                            aria-hidden='true'
                          ></span>
                          <span className='sr-only'>Previous</span>
                        </a>
                        <a
                          className='carousel-control-next m-3'
                          href='#carousel_1'
                          role='button'
                          data-slide='next'
                        >
                          <span
                            className='carousel-control-next-icon'
                            aria-hidden='true'
                          ></span>
                          <span className='sr-only'>Next</span>
                        </a>
                      </div>
                      <div
                        id='carousel_1'
                        className='carousel slide'
                        data-ride='carousel'
                      >
                        <div className='carousel-inner' >
                          {reviews.map((review,index)=>{return(<>
                            
                            <div key={index} className={'carousel-item '+(active===index?'active':"")} >
                              <div className='media'>
                                {/* <Link
                                  to={''}
                                  onClick={()=>
                                    showReview(
                                      patientPicture=review.picture,
                                      patientName =review.patientName,
                                      patientEmail=review.patientEmail,
                                      rating =review.rating,
                                      service_name =review.service_name,
                                      service_description=review.service_description,
                                      review =review.review
                                    )
                                  }> */}
                                  <img
                                    src={`${AWS_BUCKET_PROFILES}${review?.picture}`}
                                    className='mr-2 thumb-lg rounded-circle'
                                    alt='...'
                                    style={{objectFit:'cover'}}
                                  />
                                  <div className='media-body align-self-center'>
                                    <h4 className='mt-0 mb-1 title-text text-dark'>
                                      {review?.full_name}
                                    </h4>
                                    {review?.rating}
                                      <Rating
                                      fillColor="#ffb822"
                                      emptyColor="white"
                                      SVGstrokeColor="#f1a545"
                                      SVGstorkeWidth={1}
                                      size={14}
                                      allowFraction={true}
                                      initialValue={review?.rating}
                                      readonly={true}
                                      />
                                    <p className='text-muted mb-0'>{review?.email}</p>
                                    <p className='text-black mb-0'>{reviewFormat(review?.review)}</p>
                                  </div>
                                {/* </Link> */}
                              </div>
                          </div>
                          </>
                          )})}
                        </div>
                        
                        
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-xl-8'>
                  <div className='card'>
                    <div className='card-body'>
                    <h4 className='header-title mt-0'>Doctor's Schedule</h4>
                      
                     
                      {/* <canvas
                        id='bar'
                        className='drop-shadow w-100'
                        height='140'
                      > */}
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
                      {/* </canvas> */}
                    </div>
                  </div>
                </div>
              </div>
             
            </div>

            <div className='tab-pane fade' id='activity_detail'>
              <div className='row'>
              {profile?.ProviderServices?.map((item, index) => (
                    <div key={index} className="col-xl-3" style={{minWidth:'200px'}}>
                    <div className="card e-co-product" >
                    {/* {AWS_BUCKET_SERVICES+ item.images} */}
                      <Link to="/patient/marketplace/booking" state={{ ...item }}>
                        <img
                          src={(AWS_BUCKET_SERVICES+item.image)}
                          alt=""
                          style={{width:'200px', height:'200px',objectFit: 'cover'}}
                          className="img-fluid"
                        />
                      </Link>
                      <div className="card-body product-info">
                        <Link
                          to="/patient/marketplace/booking"
                          className="product-title"
                          state={{ ...item }}
                        >
                          <div className='text-title' style={{marginBottom:0}}><h4>{item.service_name}</h4>
                          </div>
                        </Link>
                        <br/>
                        <div className='row-lg-3'>
                        <b>Description : </b><br/>{item.service_description}<br/>
                        <b>Category :</b><br/> {item.category}<br/>
                        </div>
                        <br/> 
                        <h4 className='met-user-name'>{item.provider_name}</h4><br/> 
                        <div className='text-muted' style={{marginTop:-20}}>Provider</div>
                        
                        <div className="d-flex justify-content-between my-2 row">
                          <p className="product-price m-2">${item.cost_price}</p>
                          <div className="row product-review align-self-center">
                            <div className='col-md-10 m-3'>
                            {(item.average_ratings===0)?<>Unrated</>:
                            <Rating
                              fillColor="#ffb822"
                              emptyColor="white"
                              SVGstrokeColor="#f1a545"
                              SVGstorkeWidth={1}
                              size={17}
                              allowFraction={true}
                              initialValue={item.average_ratings}
                              readonly={true} 
                            />}
                             {/* ({item.average_ratings}) */}
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between my-2 row">
                          <button 
                            onClick={()=>{navigate("/patient/marketplace/booking",{state:{ ...item}})}}
                            className='btn btn-success'>Book Appointment</button>
                          <button 
                            onClick={()=>{navigate("/patient/marketplace/provider/"+(item?.provider_id))}}
                            className='btn btn-outline-success'>View Profile</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  ))}
                      

              </div>
            </div>

            <div className='tab-pane row fade' id='clinics'>
               <div className='row m-4'>
               {/* <div className='col-xl-12 mx-auto'>
                  <div className='card'>
                    <div className='card-body'> */}
                    {clinicList.map((item,index) => (
                      <div key={index} className='card col-md-5  m-2 flex-sm-col flex-md-row overflow-hidden'  >
                        {/* <Link to={"profile/"+item.clinic_id}> */}
                          {/* <div className=''> */}
                            
                            <img
                              className='card-img-top '
                              style={{ 
                                // width: 'unset', 
                                minwidth:'200px',
                                width:'200px', height:'150px',objectFit: 'cover'}}
                              // src={`${AWS_BUCKET_SERVICES}/assets/images/users/user-10.jpg`}
                              src={AWS_BUCKET_SERVICES+item.picture_file}
                              // style={{}}
                              alt=''
                            />
                            <div className='card-body'>
                              
                              <h5 className='card-title'>{item.clinic_name}</h5>
                              <p className='card-text mb-0'>{item.address}</p>
                              <p className='text-muted mb-0'>
                                {item.specialty}
                              </p>
                              <p className='mb-0'>{item.working_hours || `Mon 8am - 5pm`}</p>
                              
                            </div>
                            
                          {/* </div> */}
                        {/* </Link> */}
                      </div>
                    ))}
                      {/* <form method='post' className='card-box'>
                        <input
                          type='file'
                          id='input-file-now-custom-1'
                          className='dropify'
                          data-default-file='../assets/images/users/user-4.jpg'
                        />
                      </form> */}

                      {/* <div className=''>
                        <form className='form-horizontal form-material mb-0'> */}
                          {/* <div className='form-group'>
                            <input
                              type='text'
                              placeholder='Full Name'
                              className='form-control'
                            />
                          </div>

                          <div className='form-group row'>
                            <div className='col-md-4'>
                              <input
                                type='email'
                                placeholder='Email'
                                className='form-control'
                                name='example-email'
                                id='example-email'
                              />
                            </div>
                            <div className='col-md-4'>
                              <input
                                type='password'
                                placeholder='password'
                                className='form-control'
                              />
                            </div>
                            <div className='col-md-4'>
                              <input
                                type='password'
                                placeholder='Re-password'
                                className='form-control'
                              />
                            </div>
                          </div>
                          <div className='form-group row'>
                            <div className='col-md-6'>
                              <input
                                type='text'
                                placeholder='Phone No'
                                className='form-control'
                              />
                            </div>
                            <div className='col-md-6'>
                              <select className='form-control'>
                                <option>London</option>
                                <option>India</option>
                                <option>Usa</option>
                                <option>Canada</option>
                                <option>Thailand</option>
                              </select>
                            </div>
                          </div>
                          <div className='form-group'>
                            <textarea
                              rows='5'
                              placeholder='Message'
                              className='form-control'
                            ></textarea>
                            <button className='btn btn-gradient-primary btn-sm px-4 mt-3 float-right mb-0'>
                              Update Profile
                            </button>
                          </div> */}
                        {/* </form>
                      </div> */}
                    {/* </div>
                  </div>
                </div>*/}
              </div> 
            </div>
          </div>
        </div>
      </div>
    </ContainerFluid></div>
      </div>
  )
}

export default ProviderProfile

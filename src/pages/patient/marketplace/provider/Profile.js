import { Link, useParams } from "react-router-dom"
import { AWS_BUCKET, AWS_BUCKET_PROFILES, AWS_BUCKET_SERVICES } from "../../../../constants"
import TableCard, { ContainerFluid, TableTitle } from "../../../../components/table/Tables"
import { useEffect, useState } from 'react'
import useAuth from '../../../../hooks/useAuth'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'
import { Rating } from 'react-simple-star-rating'
// TODO: check other UI if it has same layout
function ProviderProfile() {
  
  const [profile, setProfile] = useState({})
  
  const [errMsg, setErrMsg] = useState(null)  
  const [reviews, setReviews] = useState([])
  const { id } = useParams()
  const [active,setActive]=useState(1)
  const axiosPrivate = useAxiosPrivate()
  let isMounted = true
  const controller = new AbortController()
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
      selectedProvider,
      timeSlot: {
        dateX,
        timeX,
      },
    }
    
    Swal.fire(
      {
        title: 'Start Booking',
        text:`Are you sure you want to book on this slot/time ${moment(
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
              backgroundColor: '#1eca7b',
              borderColor: 'transparent',
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
            getSched()
            
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
          setErrMsg(err.message)
        })
    }
    async function getSched() {
      await axiosPrivate
        .post(
          'getProviderOccupiedTimeslots',
          { Email: profile?.ProviderDetails?.email },
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
            console.log('deets',details.ProviderRatingsAndReviews[0])
            let somereviews=[]
            for (let x=0; x<10;x++){
            somereviews.push(details.ProviderRatingsAndReviews[x])}
            // console.log("somereviews",somereviews)
            setReviews(somereviews)

            
            // getDoctorSchedule()
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
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
                        <img
                          src={AWS_BUCKET_SERVICES+"providers/"+profile?.ProviderDetails?.image}
                          alt=''
                          className='rounded-circle'
                          style={{width:125,height:125,objectFit:'contain'}}
                        />
                        
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
                    id='settings_detail_tab'
                    data-toggle='pill'
                    href='#settings_detail'
                  >
                    Clinics
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    id='settings_detail_tab'
                    data-toggle='pill'
                    href='#settings_detail'
                  >
                    FAQ
                  </a>
                </li>
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
                      <div className='d-flex justify-content-between bg-purple p-3 mt-3 rounded'>
                        <div>
                          <h4 className='mb-1 font-weight-semibold text-white'>
                            Big Text
                          </h4>
                          <p className='text-white mb-0'>Small Text</p>
                        </div>
                        <div>
                          <h4 className=' mb-1 font-weight-semibold text-white'>
                            Big Text <small>Small Text</small>
                          </h4>
                          <p className='text-white mb-0'>Smaller Text</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='card' style={{height:'auto'}}>
                    <div className='card-body dash-info-carousel'>
                      <h4 className='mt-0 header-title mb-4'>
                        Reviews
                      </h4>
                      <div
                        id='carousel_1'
                        className='carousel slide'
                        data-ride='carousel'
                      >
                        <div className='carousel-inner' >
                          {reviews.map((review,index)=>{return(<>
                            {/* <div className='carousel-item'>
                            <div className='media'>
                              <img
                                src={`${AWS_BUCKET}/assets/images/users/user-1.jpg`}
                                className='mr-2 thumb-lg rounded-circle'
                                alt='...'
                              />
                              <div className='media-body align-self-center'>
                                <h4 className='mt-0 mb-1 title-text text-dark'>
                                  Dr. Myrtlle Sison
                                </h4>
                                <p className='text-muted mb-0'>Cardiologist</p>
                              </div>
                            </div>
                          </div> */}
                            <div key={index} className={'carousel-item '+(active===index?'active':"")} >
                              <div className='media'>
                                <img
                                  src={`${AWS_BUCKET_PROFILES}${review.picture}`}
                                  className='mr-2 thumb-lg rounded-circle'
                                  alt='...'
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
                                  <p className='text-black mb-0'>{review?.review}</p>
                                </div>
                              </div>
                          </div>
                          </>
                          )})}
                        </div>
                        
                        <a
                          className='carousel-control-prev'
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
                          className='carousel-control-next'
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
                      {/* </canvas> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-4'>
                  <div className='card'>
                    <div className='card-body'>
                      <h4 className='mt-0 header-title'>Patient Schedule</h4>
                      <div className='dash-datepick'>
                        <input type='hidden' id='light_datepick' />
                      </div>
                      <div className='d-flex justify-content-between p-3 bg-light'>
                        <div className='media'>
                          <img
                            src={`${AWS_BUCKET}/assets/images/users/user-2.jpg`}
                            className='mr-3 thumb-md rounded-circle'
                            alt='...'
                          />
                          <div className='media-body align-self-center'>
                            <h5 className='mt-0 text-dark mb-1'>
                              Harry McCall
                            </h5>
                            <p className='mb-0'>
                              Urologist
                              <span className='text-muted'>
                                {" "}
                                Virtual Visit, follow up checkup @10:00AM
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-lg-4'>
                  <div className='card'>
                    <div className='card-body'>
                      <h4 className='mt-0 header-title'>Patient Diagnosis</h4>
                      <p className='text-muted mb-4'>
                        High blood pressure, diabetic, under monitored
                        medication
                      </p>
                      <textarea
                        className='form-control'
                        rows='3'
                        id='clipboardTextarea'
                        defaultValue={`X-ray completed. Diagnosed with severe pneumonia.\nUrinary tract infection with yeast infection.`}
                      ></textarea>
                      <div className='mt-3'>
                        <button
                          type='button'
                          className='btn btn-gradient-secondary btn-clipboard'
                          data-clipboard-action='copy'
                          data-clipboard-target='#clipboardTextarea'
                        >
                          <i className='fas fa-video'></i> Start Virtual Call
                        </button>{" "}
                        <button
                          type='button'
                          className='btn btn-gradient-primary btn-clipboard'
                          data-clipboard-action='cut'
                          data-clipboard-target='#clipboardTextarea'
                        >
                          <i className='fab fa-rocketchat'></i> Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-lg-4'>
                  <div className='card'>
                    <div className='card-body'>
                      <h4 className='header-title mt-0 mb-4'>
                        Latest Activity
                      </h4>
                      <div
                        className='slimscroll profile-activity-height'
                        style={{ overflowY: "scroll" }}
                      >
                        <div className='activity'>
                          <div className='activity-info'>
                            <div className='icon-info-activity'>
                              <i className='mdi mdi-checkbox-marked-circle-outline bg-soft-success'></i>
                            </div>
                            <div className='activity-info-text'>
                              <div className='d-flex justify-content-between align-items-center'>
                                <p className='text-muted mb-0 font-14 w-75'>
                                  <span className='text-dark font-14'>
                                    Patient
                                  </span>
                                  updated the status of{" "}
                                  <Link to='' className='text-dark'>
                                    Invoice #1234
                                  </Link>
                                  to Paid
                                </p>
                                <span className='text-muted'>10 Min ago</span>
                              </div>
                            </div>
                          </div>

                          <div className='activity-info'>
                            <div className='icon-info-activity'>
                              <i className='mdi mdi-timer-off bg-soft-pink'></i>
                            </div>
                            <div className='activity-info-text'>
                              <div className='d-flex justify-content-between align-items-center'>
                                <p className='text-muted mb-0 font-14 w-75'>
                                  <span className='text-dark font-14'>
                                    Dr. Peterson
                                  </span>
                                  scheduled a virtual visit on{" "}
                                  <Link to='' className='text-dark'>
                                    Dec 2, 2022
                                  </Link>
                                </p>
                                <span className='text-muted'>50 Min ago</span>
                              </div>
                            </div>
                          </div>

                          <div className='activity-info'>
                            <div className='icon-info-activity'>
                              <i className='mdi mdi-alert-decagram bg-soft-purple'></i>
                            </div>
                            <div className='activity-info-text'>
                              <div className='d-flex justify-content-between align-items-center'>
                                <p className='text-muted mb-0 font-14 w-75'>
                                  <span className='text-dark font-14'>
                                    Dr. Lim
                                  </span>
                                  completed a virtual meet.{" "}
                                  <Link to='' className='text-dark'>
                                    Checkup #112233
                                  </Link>{" "}
                                  was saved to archive.
                                </p>
                                <span className='text-muted'>10 hours ago</span>
                              </div>
                            </div>
                          </div>

                          <div className='activity-info'>
                            <div className='icon-info-activity'>
                              <i className='mdi mdi-clipboard-alert bg-soft-warning'></i>
                            </div>
                            <div className='activity-info-text'>
                              <div className='d-flex justify-content-between align-items-center'>
                                <p className='text-muted mb-0 font-14 w-75'>
                                  <span className='text-dark font-14'>
                                    Patient
                                  </span>
                                  completed a{" "}
                                  <Link to='' className='text-dark'>
                                    Bloodtest
                                  </Link>{" "}
                                  on Laboratory A.
                                </p>
                                <span className='text-muted'>Yesterday</span>
                              </div>
                            </div>
                          </div>
                          <div className='activity-info'>
                            <div className='icon-info-activity'>
                              <i className='mdi mdi-clipboard-alert bg-soft-secondary'></i>
                            </div>
                            <div className='activity-info-text'>
                              <div className='d-flex justify-content-between align-items-center'>
                                <p className='text-muted mb-0 font-14 w-75'>
                                  <span className='text-dark font-14'>
                                    Dr. Maricris Jowels
                                  </span>
                                  was added to the group, group name is{" "}
                                  <Link to='' className='text-dark'>
                                    Physicians
                                  </Link>
                                </p>
                                <span className='text-muted'>14 Nov 2022</span>
                              </div>
                            </div>
                          </div>
                          <div className='activity-info'>
                            <div className='icon-info-activity'>
                              <i className='mdi mdi-clipboard-alert bg-soft-info'></i>
                            </div>
                            <div className='activity-info-text'>
                              <div className='d-flex justify-content-between align-items-center'>
                                <p className='text-muted mb-0 font-14 w-75'>
                                  <span className='text-dark font-14'>
                                    Patient
                                  </span>
                                  request a virtual visit to{" "}
                                  <Link to='' className='text-dark'>
                                    Dr. Nefario
                                  </Link>{" "}
                                  on Dec. 1, 2022.
                                </p>
                                <span className='text-muted'>15 Nov 2022</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='tab-pane fade' id='activity_detail'>
              <div className='row'></div>
            </div>

            <div className='tab-pane fade' id='settings_detail'>
              <div className='row'>
                <div className='col-lg-12 col-xl-9 mx-auto'>
                  <div className='card'>
                    <div className='card-body'>
                      <form method='post' className='card-box'>
                        <input
                          type='file'
                          id='input-file-now-custom-1'
                          className='dropify'
                          data-default-file='../assets/images/users/user-4.jpg'
                        />
                      </form>

                      <div className=''>
                        <form className='form-horizontal form-material mb-0'>
                          <div className='form-group'>
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
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
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
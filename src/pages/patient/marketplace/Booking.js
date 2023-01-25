import FullCalendar from '@fullcalendar/react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Footer from '../../../components/Footer'
import { AWS_BUCKET } from '../../../constants'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import moment from 'moment'

export default function Booking() {
  const { state: selectedProvider } = useLocation()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
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
  const [calendarStartEndTime, setCalendarSartEndTime] = useState({
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
    if (
      window.confirm(
        `Are you sure you want to book on this slot/time ${moment(
          clickInfo.event.startStr
        ).format('MM/DD/YYYY hA')}?`
      )
    ) {
      navigate('../checkout', {
        state,
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

    for (let index = 0; index < startEndDateDiff; index++) {
      const currentD = startDate
        .add(index === 0 ? 0 : 1, 'days')
        .format('YYYY-MM-DD')

      const _today = startDate.format('ddd')
      console.log('weeklysched',weeklySched)
      for (
        let j = weeklySched[_today].start;
        j <= weeklySched[_today].end;
        j++
      ) {
        let doAppend = appointments.some(
          (item) =>
            item.trans_date_time === currentD && item.trans_start === String(j)
        )

        if (doAppend) {
          continue
        } else {
          let timeStr = j
          if (j < 10) {
            timeStr = '0' + j
          }
          const startStr = `${currentD}T${timeStr}:00:00`

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

    setCalendarSartEndTime({ start: startTime, end: endTime })
    setWeeklySched(weeklySched)
  }, [providerSched])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function getDoctorSchedule() {
      await axiosPrivate
        .post(
          'getDoctorSchedule',
          { ProviderID: selectedProvider.provider_id },
          { signal: controller.signal }
        )
        .then((res) => {
          const { Status, Data: data = [], Message } = res.data

          if (Status) {
            // console.log("providerschedule",data)
            isMounted && setProviderSched(data)
            // setWeeklySched(
            //   {
            //     Sun:{start:data.hours_sun_start,end:hours_sun_end},
            //     Mon:{start:data.hours_mon_start,end:hours_mon_end},
            //     Tue:{start:data.hours_tue_start,end:hours_tue_end},
            //     Wed:{start:data.hours_wed_start,end:hours_wed_end},
            //     Thu:{start:data.hours_thu_start,end:hours_thu_end},
            //     Fri:{start:data.hours_fri_start,end:hours_fri_end},
            //     Sat:{start:data.hours_sat_start,end:hours_sat_end},
            //   })
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
          setErrMsg(err.message)
        })
    }

    getDoctorSchedule()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function getSched() {
      await axiosPrivate
        .post(
          'getProviderOccupiedTimeslots',
          { Email: selectedProvider.email },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          const { Status, Data: data = [], Message } = res.data

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

    getSched()

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
                <div className="float-right">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="..">Marketplace</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      {selectedProvider?.provider_name}
                    </li>
                  </ol>
                </div>
                <h4 className="page-title">Book Appointment</h4>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body doctor">
                  <div className="met-profile">
                    <div className="row">
                      <div className="col-lg-4 align-self-center mb-3 mb-lg-0">
                        <div className="met-profile-main">
                          <div className="met-profile-main-pic">
                            <img
                              src={`${AWS_BUCKET}/assets/images/users/user-4.jpg`}
                              alt=""
                              className="rounded-circle"
                            />
                          </div>
                          <div className="met-profile_user-detail">
                            <Link href="providerprofile">
                              <h5 className="met-user-name">
                                {selectedProvider?.provider_name}
                              </h5>
                            </Link>
                            <p className="mb-0 met-user-name-post">
                              Neurologist / Sleep Doctor / Surgeon
                            </p>
                            <p>
                              <label htmlFor="checkbox3">
                                <i className="mdi mdi-star text-warning"></i>
                                <i className="mdi mdi-star text-warning"></i>
                                <i className="mdi mdi-star text-warning"></i>
                                <i className="mdi mdi-star text-warning"></i>
                                <i className="mdi mdi-star text-warning"></i>
                              </label>
                            </p>
                            <h5>
                              <b>Service:</b>{' '}
                              {selectedProvider?.service_description}
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 ml-auto">
                        <ul className="list-unstyled personal-detail">
                          <li className="">
                            <i className="dripicons-message mr-2 text-info font-18 mt-2 mr-2"></i>{' '}
                            <b> Clinic </b> :
                          </li>
                          <li className="mt-2">
                            <i className="dripicons-location text-info font-18 mt-2 mr-2"></i>{' '}
                            <b>Location</b> :
                          </li>
                          <li className="mt-2">
                            <i className="far fa-money-bill-alt text-info font-18 mt-2 mr-2"></i>
                            <b>Service Rate </b> : $
                            {selectedProvider?.cost_price}
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
            <div className="col-md-12">
              <h4>Choose Appointment Schedule</h4>
              <div className="card">
                <div className="card-body">
                  <div id="calendar"></div>
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

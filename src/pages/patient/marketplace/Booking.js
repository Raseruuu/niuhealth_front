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
  const [providerSched, setProviderSched] = useState([])
  const navigate = useNavigate()

  const handleDateSelect = (selectInfo) => {
    console.log(selectInfo)

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
    const state = {
      selectedProvider,
      timeSlot: clickInfo.event.startStr,
    }

    if (
      window.confirm(
        `Are you sure you want to book on this slot/time '${clickInfo.event.title}'`
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

    const startDate = moment().subtract(2, 'days')
    const endDate = moment().add(10, 'days')

    const startEndDateDiff = endDate.diff(startDate, 'days')

    for (let index = 0; index < startEndDateDiff; index++) {
      const currentD = startDate
        .add(index === 0 ? 0 : 1, 'days')
        .format('YYYY-MM-DD')

      for (let j = 4; j < 23; j++) {
        let timeStr = j
        if (j <= 9) {
          timeStr = '0' + j
        }

        schedArray.push({
          id: 'id_' + index + j,
          title: `${currentD}T${timeStr}:00:00`,
          start: `${currentD}T${timeStr}:00:00`,
          backgroundColor: '#1eca7b',
          borderColor: 'transparent',
        })
      }
    }
    return schedArray
  }

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
          console.log(res)
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
    <div className='page-wrapper'>
      <div className='page-content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='page-title-box'>
                <div className='float-right'>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                      <Link to='..'>Marketplace</Link>
                    </li>
                    <li className='breadcrumb-item active'>
                      {selectedProvider.provider_name}
                    </li>
                  </ol>
                </div>
                <h4 className='page-title'>Book Appointment</h4>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div className='card'>
                <div className='card-body doctor'>
                  <div className='met-profile'>
                    <div className='row'>
                      <div className='col-lg-4 align-self-center mb-3 mb-lg-0'>
                        <div className='met-profile-main'>
                          <div className='met-profile-main-pic'>
                            <img
                              src={`${AWS_BUCKET}/assets/images/users/user-4.jpg`}
                              alt=''
                              className='rounded-circle'
                            />
                          </div>
                          <div className='met-profile_user-detail'>
                            <Link href='providerprofile'>
                              <h5 className='met-user-name'>
                                {selectedProvider.provider_name}
                              </h5>
                            </Link>
                            <p className='mb-0 met-user-name-post'>
                              Neurologist / Sleep Doctor / Surgeon
                            </p>
                            <p>
                              <label for='checkbox3'>
                                <i className='mdi mdi-star text-warning'></i>
                                <i className='mdi mdi-star text-warning'></i>
                                <i className='mdi mdi-star text-warning'></i>
                                <i className='mdi mdi-star text-warning'></i>
                                <i className='mdi mdi-star text-warning'></i>
                              </label>
                            </p>
                            <h5>
                              <b>Service:</b>{' '}
                              {selectedProvider.service_description}
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col-lg-4 ml-auto'>
                        <ul className='list-unstyled personal-detail'>
                          <li className=''>
                            <i className='dripicons-message mr-2 text-info font-18 mt-2 mr-2'></i>{' '}
                            <b> Clinic </b> :
                          </li>
                          <li className='mt-2'>
                            <i className='dripicons-location text-info font-18 mt-2 mr-2'></i>{' '}
                            <b>Location</b> :
                          </li>
                          <li className='mt-2'>
                            <i className='far fa-money-bill-alt text-info font-18 mt-2 mr-2'></i>
                            <b>Service Rate </b> : $
                            {selectedProvider.cost_price}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-12'>
              <h4>Choose Appointment Schedule</h4>
              <div className='card'>
                <div className='card-body'>
                  <div id='calendar'></div>
                  <FullCalendar
                    plugins={[timeGridPlugin]}
                    headerToolbar={{
                      left: 'prev,next today',
                      center: 'title',
                      right: '',
                    }}
                    initialView='timeGridWeek'
                    initialEvents={INITIAL_EVENTS()}
                    // slotMinTime={'06:00:00'}
                    // slotMaxTime={'22:00:00'}
                    allDaySlot={false}
                    editable={false}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
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
                  <div className='clearfix'></div>
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

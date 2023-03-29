import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { memo, useEffect, useMemo, useState } from 'react'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import useAuth from '../../../hooks/useAuth'
import moment from 'moment'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

function Calendar({ allowCall=true,dateList }) {
  const { auth } = useAuth()
  const navigate = useNavigate()
  const [slots, setSlots] = useState([])
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [appointmentList, setAppointmentList] = useState(dateList)
  function hourformat(hourstr){
    const hour=parseInt(hourstr)

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
  const handleDateSelect = (selectInfo) => {
    console.log(selectInfo)
    
    // let title = prompt('Please enter a new title for your event')
    // let calendarApi = selectInfo.view.calendar

    // calendarApi.unselect() // clear date selection

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
    const selected = appointmentList.find(
      (item) => item.appointment_id === clickInfo.event.id
    )
    
    const currentD = moment(selected.trans_date_time).format('YYYY-MM-DD')

    let timeStr = Number(selected.trans_start)
    if (timeStr < 10) {
      timeStr = '0' + timeStr
    }

    const startStr = `${selected.trans_date_time}, ${hourformat(selected.trans_start)} `
    const dateX = moment(startStr).format('MMM DD YYYY,  h:mm a')
    console.log("adasdas",selected.trans_start)
   
    // const appointmentIsLater= (moment(startStr).add(1,'hours').isAfter(moment()))
    // const withinAppointmentPeriod=(!appointmentIsOver)&&(!appointmentIsLater)
    const appointmentTime=`${hourformat(selected.trans_start)} ${moment(selected.trans_date_time).format('MMMM DD YYYY')}`
   
    const appointmentPeriod=[moment(appointmentTime),moment(appointmentTime).add(1, 'hours')]
    const appointmentIsOver= (moment().isAfter(appointmentPeriod[1]))
    
    const withinAppointmentPeriod=moment().isAfter(appointmentPeriod[0])&&appointmentPeriod[1].isAfter(moment())
    Swal.fire({
      titleText: `Appointment Details:`,
      
      html: `<div class='text-left'>
      <b class="text-center"> ${ appointmentIsOver?"<div class='text-purple'>The Appointment period is over.</div>":withinAppointmentPeriod?"<div class='text-success'>Appointment is Now!</div>":""}</b> 
      Date: <strong>${appointmentTime}</strong><br/><br/>
    Name: ${selected.full_name}<br/>
    Email: ${selected.email}<br/>
    Phone: ${selected.contact_info}<br/>
    </div>`,
      confirmButtonText: allowCall ? 
        (withinAppointmentPeriod?"Start Zoom Meeting":'OK'):"OK",
      showCancelButton: allowCall,
    }).then(
      async ({isConfirmed} ) => {
      if (isConfirmed &&withinAppointmentPeriod) {
        await axiosPrivate
          .post('providerStartAppointment',
            {
              Email: auth.email,
              MeetingID: selected.appointment_id,
            }
          )
          .then((res) => {
            if (res.data?.Status ) {
              Swal.fire({title:'Virtual Visit',html:'Zoom Meeting will start.'})
              console.log(res.data.Data)
              if (allowCall && isConfirmed) {
                navigate('/virtualvisit/room', {
                    state: {
                      MeetingID: res.data.Data.MeetingID,
                      Password: res.data.Data.Passcode },
                  })
              }
            } else {
              Swal.fire(res.data?.Message)
            }
          })
          .catch((err) => {
            console.error(err)
            Swal.fire('Action failed.')
          })
        // setRefreshList((prev) => !prev)
      }
    })
    // .then(({ isConfirmed }) => {
    //   if (allowCall && isConfirmed) {
    //     navigate('/virtualvisit/room', {
    //       state: { MeetingID: 4737080721 },
    //     })
    //   }
    // })
  }

  // const handleEvents = (events) => {
  //   console.log(events)
  // }

  const INITIAL_EVENTS = (appointments = []) => {
    const schedArray = [appointments.map((item) => {
      const currentD = moment(item.trans_date_time).format('YYYY-MM-DD')

      let timeStr = Number(item.trans_start)
      if (timeStr < 10) {
        timeStr = '0' + timeStr
      }

      const startStr = `${currentD}T${timeStr}:00:00`

      return {
        id: item.appointment_id,
        title: item.full_name,
        start: startStr,
        backgroundColor: '#1eca7b',
        borderColor: 'transparent',
      }


      
    })]
    console.log("SchedArr"+schedArray)

    setSlots(schedArray[0])
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
            if (dateList){
              
              setAppointmentList(dateList)
              INITIAL_EVENTS(dateList)
            }
            else{
              isMounted && setAppointmentList(data)
              isMounted && INITIAL_EVENTS(data)
            }
            
            console.log("Slots",slots)
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
  }, [dateList])

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      initialView="dayGridMonth"
      events={slots}
      // editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      select={handleDateSelect}
      eventClick={handleEventClick}
      // eventsSet={handleEvents}
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
  )
}

// TODO: Refactor. put all business logic to parent component to fully memoize this component
export default memo(Calendar)

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import useAuth from '../../../hooks/useAuth'
import moment from 'moment'
import Swal from 'sweetalert2'

export default function Calendar() {
  const { auth } = useAuth()
  const [slots, setSlots] = useState([])
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)

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
    console.log(clickInfo)

    Swal.fire(clickInfo.event.title)
  }

  const handleEvents = (events) => {
    console.log(events)
  }

  const INITIAL_EVENTS = (appointments = []) => {
    const schedArray = appointments.map((item) => {
      console.log(item)

      const currentD = moment(item.trans_date_time).format('YYYY-MM-DD')

      let timeStr = Number(item.trans_start)
      if (timeStr < 10) {
        timeStr = '0' + timeStr
      }

      const startStr = `${currentD}T${timeStr}:00:00`

      return {
        id: item.appointment_id,
        title: item.service_id,
        start: startStr,
        backgroundColor: '#1eca7b',
        borderColor: 'transparent',
      }
    })

    setSlots(schedArray)
  }

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function getSched() {
      await axiosPrivate
        .post(
          'getProviderAppointments',
          { Email: auth.email },
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
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      initialView='dayGridMonth'
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

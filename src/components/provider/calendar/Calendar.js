import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, "") // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "All-day event",
    start: todayStr,
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: todayStr + "T12:00:00",
  },
]

export function createEventId() {
  return String(eventGuid++)
}

export default function Calendar() {
  const handleDateSelect = (selectInfo) => {
    console.log(selectInfo)

    let title = prompt("Please enter a new title for your event")
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      })
    }
  }

  const handleEventClick = (clickInfo) => {
    console.log(clickInfo)
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove()
    }
  }

  const handleEvents = (events) => {
    console.log(events)
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      initialView='dayGridMonth'
      initialEvents={INITIAL_EVENTS}
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      select={handleDateSelect}
      eventClick={handleEventClick}
      eventsSet={handleEvents}
      eventAdd={function ({ event }) {
        console.log("eventAdd", event)
      }}
      eventChange={function ({ event }) {
        console.log("eventChange", event)
      }}
      eventRemove={function (event) {
        console.log("eventRemove", event)
      }}
    />
  )
}

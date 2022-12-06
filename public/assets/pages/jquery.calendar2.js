/**
* Theme: Crovex - Responsive Bootstrap 4 Admin Dashboard
* Author: Mannatthemes
* Component: Full-Calendar
*/
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'interaction', 'weekGrid', 'timeGrid' ],
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth'
      },
      defaultDate: '2022-12-06',
      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      selectMirror: true,
      select: function(arg) {
        
      },
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: [
        {
          title: 'Available',
          start: '2022-12-06T13:00:00',
          constraint: 'availableForMeeting',
          className: 'bg-success',
          textColor: 'white'
        },
        {
          title: 'Available',
          start: '2022-12-06T11:00:00',
          constraint: 'availableForMeeting', // defined below
          className: 'bg-success',
          textColor: 'white'
        },
        {
          title: 'Available',
          start: '2022-12-06T14:00:00',
          constraint: 'availableForMeeting', // defined below
          className: 'bg-success',
          textColor: 'white'
        },
        {
          title: 'Available',
          start: '2022-12-06T15:00:00',
          constraint: 'availableForMeeting', // defined below
          className: 'bg-success',
          textColor: 'white'
        },
        {
          title: 'Available',
          start: '2022-12-07T08:00:00',
          constraint: 'availableForMeeting', // defined below
          className: 'bg-success',
          textColor: 'white'
        },
        {
          title: 'Available',
          start: '2022-12-07T09:00:00',
          constraint: 'availableForMeeting', // defined below
          className: 'bg-success',
          textColor: 'white'
        },
        {
          title: 'Available',
          start: '2022-12-07T10:00:00',
          constraint: 'availableForMeeting', // defined below
          className: 'bg-success',
          textColor: 'white'
        },
        {
          title: 'Available',
          start: '2022-12-07T11:00:00',
          constraint: 'availableForMeeting', // defined below
          className: 'bg-success',
          textColor: 'white'
        },
        

        // areas where "Meeting" must be dropped
        {
          groupId: 'availableForMeeting',
          start: '2019-08-11T10:00:00',
          end: '2019-08-11T16:00:00',
          title: 'Repeating Event',
          className: 'bg-soft-purple',
        },
        {
          groupId: 'availableForMeeting',
          start: '2019-08-15T10:00:00',
          end: '2019-08-15T16:00:00',
          title: 'holiday',
          className: 'bg-soft-success',
        },

        // red areas where no events can be dropped
        
        {
          start: '2019-08-06',
          end: '2019-08-08',
          overlap: false,
          title: 'New Event',
          className: 'bg-soft-pink',
        }
      ],
      eventClick: function(arg) {
        if (confirm('Book this date?')) {
          window.open("marketplace-4-cart.html", "_self")
        }
      }
    });

    calendar.render();
  });

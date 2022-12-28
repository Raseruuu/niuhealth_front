import Footer from "../../components/Footer"
import React, { useState } from 'react'

const CancelButton = () => {
return(
  <div className="list-inline mb-0 align-self-center">
    <button
      type="button"
      className="btn btn-danger btn-round waves-effect waves-light"
    >
      Cancel Visit
    </button>
  </div>
)}
const ViewVisitButton = () => {
  return(
    <div className="list-inline mb-0 align-self-center">
      <button
        type="button"
        className="btn btn-success btn-round waves-effect waves-light"
      >
        View Visit Visit Summary
      </button>
    </div>
  )}
const StatusIcon = ({ icontype }) => {
  const StatusColor = {
    upcoming: 'text-purple',
    cancelled_by_p: 'text-danger',
    cancelled_by_d: 'text-danger',
    completed:"text-success",
  }
  return (
    <div className="task-priority-icon">
      <i className={`fas fa-circle ${StatusColor[icontype]}`}></i>
    </div>
  )
}

const StatusText = ({ status }) => {
  const statusColor = {
    upcoming: 'badge-soft-purple',
    cancelled_by_p: 'badge-soft-danger',
    cancelled_by_d: 'badge-soft-danger',
    completed: "badge-soft-success",
  }
  const statusText = {
    upcoming: 'Upcoming',
    cancelled_by_p: 'Cancelled By You',
    cancelled_by_d: 'Cancelled By Doctor',
    completed: "Completed",
  }
  return (
    <span className={`virtualvisitbadge badge badge-md ${statusColor[status]}`}>
      {statusText[status]}
    </span>
  )
}
const AppointmentAction = ({ status }) => {

  if (status==='upcoming'){
    return (
      <CancelButton/>
    )}
  else if (status==='completed'){
    return (
      <ViewVisitButton/>
    )}
  

}

function AppointmentItem({providername,specialty,status,hub,address,time,date}){
 
  return(
    <div className="card">
    <div className="card-body">
      <div className="task-box">

        <div className="task-priority-icon">
          {/* <i className="fas fa-circle text-purple"></i> */}
          <StatusIcon icontype={status}/>
        </div>

        <p className="text-muted float-right">
          <span className="text-muted">{time}</span>
          <span className="mx-1">·</span>
          <span>
            <i className="far fa-fw fa-clock"></i> {date}
          </span>
        </p>
        <div className="media">
          <a className="" href="#">
            <img
              src="../assets/images/users/user-1.jpg"
              alt="user"
              className="rounded-circle thumb-md"
            />
          </a>
          <div className="media-body align-self-center ml-3">
            <p className="font-14 font-weight-bold mb-0">
              {providername}
              <StatusText status={status}/>
            </p>
            <p className="mb-0 font-12 text-muted">{specialty}</p>
          </div>
        </div>
        <p className="text-muted mb-1 virtDesc">
          <strong>Hub: </strong> {hub}
        </p>
      
        <div className="virtDesc d-flex justify-content-between">
          <div className="br-wrapper br-theme-fontawesome-stars">
            <strong>Hub Address:</strong> {address}
          </div>
          <AppointmentAction status={status}/>
          
        </div>
      </div>
    </div>
  </div>
    )}
function Appointment() {
  const [appointmentsList,setAppointmentsList] = useState([
    {
        providername :"Guy McGee",
        specialty:"Surgeon",
        status:"upcoming",
        hub: "Hawaii Kai Health Hub",
        address:"45-1151 kamehameha, Hwy, Suite H View location on map",
        time:"9:30 AM",
        date:"June 06, 2022"
    },
    {
      providername :"Brian McBrains",
      specialty:"Neurosurgeon",
      status:"cancelled_by_p",
      hub: "Hawaii Kai Health Hub",
      address:"One street block 1 lot 1 Brgy. 1 Area 1",
      time:"9:30 AM",
      date:"June 06, 2022"

    },
    {
      providername :"Dr Otto Octavius", 
      specialty:"Neurology",
      status:"completed",
      hub: "Hawaii Kai Health Hub",
      address:"One street block 1 lot 1 Brgy. 1 Area 1",
      time:"9:30 AM",
      date:"June 06, 2022"
    },
    {
      providername :"Dr Otto Octavius",
      specialty:"Neurology",
      status:"cancelled_by_d",
      hub: "Hawaii Kai Health Hub",
      address:"One street block 1 lot 1 Brgy. 1 Area 1",
      time:"9:30 AM",
      date:"June 06, 2022"
    },
    ]
)
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box">
                <h4 className="page-title">Appointments</h4>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              {appointmentsList.map((appointment)=>
              <AppointmentItem {...appointment} />
              )}
              {/* <div className="card">
                <div className="card-body">
                  <div className="task-box">
                    <div className="task-priority-icon">
                      <i className="fas fa-circle text-danger"></i>
                    </div>
                    <p className="text-muted float-right">
                      <span className="text-muted">9:30 AM</span>
                      <span className="mx-1">·</span>
                      <span>
                        <i className="far fa-fw fa-clock"></i> June 06, 2022
                      </span>
                    </p>
                    <div className="media">
                      <a className="" href="#">
                        <img
                          src="../assets/images/users/user-1.jpg"
                          alt="user"
                          className="rounded-circle thumb-md"
                        />
                      </a>
                      <div className="media-body align-self-center ml-3">
                        <p className="font-14 font-weight-bold mb-0">
                          Provider Name
                          <span className="virtualvisitbadge badge badge-md badge-soft-danger">
                            Cancelled by Doctor
                          </span>
                        </p>
                        <p className="mb-0 font-12 text-muted">Specialty</p>
                      </div>
                    </div>
                    <p className="text-muted mb-1 virtDesc">
                      <strong>Hub: </strong> Hawaii Kai Health Hub
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default Appointment

import Footer from "../../components/Footer"
import React, { useEffect,useState } from 'react'
import StatusIcon from "../../components/status/Status"
import StatusText from "../../components/status/Status"

import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
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
const VisitAction = ({ status }) => {

  if (status==='upcoming'){
    return (
      <CancelButton/>
    )}
  else if (status==='completed'){
    return (
      <>
        <div className="br-wrapper br-theme-fontawesome-stars">
          <strong>Rate your experience: </strong>
          <select id="example-fontawesome" style={{display:"none"}}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <ViewVisitButton/>
      </>
    )}

}
function VisitItem({provider_description,provider_name,service_description,service_id,trans_date_time,visit_id,status}){
 
  
  return(
    <div className="card">
    <div className="card-body">
      <div className="task-box">

        <div className="task-priority-icon">
          {/* <i className="fas fa-circle text-purple"></i> */}
          <StatusIcon icontype={status}/>
        </div>

        <p className="text-muted float-right">
          <span className="text-muted">{trans_date_time}</span>
          <span className="mx-1">·</span>
          <span>
            <i className="far fa-fw fa-clock"></i> {trans_date_time}
            {/* //date */}
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
              {provider_name}
              <StatusText status={status}/>
            </p>
            <p className="mb-0 font-12 text-muted">{service_description}</p>
          </div>
        </div>
        <p className="text-muted mb-1 virtDesc">
          <strong>{provider_description}</strong> 
        </p>
      
        <div className="virtDesc d-flex justify-content-between">
          <div className="br-wrapper br-theme-fontawesome-stars">
            <strong>Rate your experience:</strong> {provider_description}
          </div>
          <VisitAction status={status}/>
          
        </div>
      </div>
    </div>
  </div>
    )}
function VirtualVisit() {
  const [visitList,setVisitsList] = useState([
    {   
      provider_name :"Prough VieDre",
      provider_description:"I am Mr Provider man",
      service_description:"Pediatrician",
      service_id:"???",
      trans_date_time:"June 06, 2022",
      visit_id:"???x2",
      status:0
    },
    {   
      provider_name :"Prough VieDre",
      provider_description:"I am Mr Provider man",
      service_description:"Pediatrician",
      service_id:"???",
      trans_date_time:"June 06, 2022",
      visit_id:"???x2",
      status:1
    },
    {   
      provider_name :"Prough VieDre",
      provider_description:"I am Mr Provider man",
      service_description:"Pediatrician",
      service_id:"???",
      trans_date_time:"June 06, 2022",
      visit_id:"???x2",
      status:2
    },
    {   
      provider_name :"Prough VieDre",
      provider_description:"I am Mr Provider man",
      service_description:"Pediatrician",
      service_id:"???",
      trans_date_time:"June 06, 2022",
      visit_id:"???x2",
      status:3
    },
    {   
      provider_name :"Prough VieDre",
      provider_description:"I am Mr Provider man",
      service_description:"Pediatrician",
      service_id:"???",
      trans_date_time:"June 06, 2022",
      visit_id:"???x2",
      status:4
    }
  ])
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box">
                <h4 className="page-title">Virtual Visit</h4>
              </div>
            </div>
          </div>

          <div className="row ">
            <div className="col-lg-12">
              {visitList.map((visit)=>
                <VisitItem {...visit} />
                )}
              <div className="card">
                <div className="card-body">
                  <div className="task-box">
                    <div className="task-priority-icon">
                      <i className="fas fa-circle text-success"></i>
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
                          Provider Name{" "}
                          <span className="virtualvisitbadge badge badge-md badge-soft-success">
                            Completed
                          </span>
                        </p>
                        <p className="mb-0 font-12 text-muted">Specialty</p>
                      </div>
                    </div>
                    <p className="text-muted mb-1 virtDesc">
                      <strong>Visit reason: </strong>Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Integer commodo varius diam.
                      Nulla neque erat, feugiat a tellus in, ullamcorper commodo
                      risus. Pellentesque ac leo mollis magna hendrerit
                      eleifend. Praesent posuere dui eu fringilla ullamcorper.
                      ... <a href="">Read more</a>
                    </p>

                    <div className="virtDesc d-flex justify-content-between">
                      <div className="br-wrapper br-theme-fontawesome-stars">
                        <strong>Rate your experience: </strong>{" "}
                        <select
                          id="example-fontawesome"
                          style={{ display: "none" }}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <div className="list-inline mb-0 align-self-center">
                        <button
                          type="button"
                          className="btn btn-success btn-round waves-effect waves-light"
                        >
                          View Visit Summary
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
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
                          Provider Name{" "}
                          <span className="virtualvisitbadge badge badge-md badge-soft-danger">
                            Cancelled by you
                          </span>
                        </p>
                        <p className="mb-0 font-12 text-muted">Specialty</p>
                      </div>
                    </div>
                    <p className="text-muted mb-1 virtDesc">
                      <strong>Visit reason: </strong>Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Integer commodo varius diam.
                      Nulla neque erat, feugiat a tellus in, ullamcorper commodo
                      risus. Pellentesque ac leo mollis magna hendrerit
                      eleifend. Praesent posuere dui eu fringilla ullamcorper.
                      ... <a href="">Read more</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="task-box">
                    <div className="task-priority-icon">
                      <i className="fas fa-circle text-success"></i>
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
                          Provider Name{" "}
                          <span className="virtualvisitbadge badge badge-md badge-soft-success">
                            Completed
                          </span>
                        </p>
                        <p className="mb-0 font-12 text-muted">Specialty</p>
                      </div>
                    </div>
                    <p className="text-muted mb-1 virtDesc">
                      <strong>Visit reason: </strong>Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Integer commodo varius diam.
                      Nulla neque erat, feugiat a tellus in, ullamcorper commodo
                      risus. Pellentesque ac leo mollis magna hendrerit
                      eleifend. Praesent posuere dui eu fringilla ullamcorper.
                      ... <a href="">Read more</a>
                    </p>

                    <div className="virtDesc d-flex justify-content-between">
                      <div className="br-wrapper br-theme-fontawesome-stars">
                        &nbsp;
                      </div>

                      <div className="list-inline mb-0 align-self-center">
                        <button
                          type="button"
                          className="btn btn-success btn-round waves-effect waves-light"
                        >
                          View Visit Summary
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
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
                          Provider Name{" "}
                          <span className="virtualvisitbadge badge badge-md badge-soft-danger">
                            Cancelled by Doctor
                          </span>
                        </p>
                        <p className="mb-0 font-12 text-muted">Specialty</p>
                      </div>
                    </div>
                    <p className="text-muted mb-1 virtDesc">
                      <strong>Visit reason: </strong>Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Integer commodo varius diam.
                      Nulla neque erat, feugiat a tellus in, ullamcorper commodo
                      risus. Pellentesque ac leo mollis magna hendrerit
                      eleifend. Praesent posuere dui eu fringilla ullamcorper.
                      ... <a href="">Read more</a>
                    </p>
                  </div>
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

export default VirtualVisit

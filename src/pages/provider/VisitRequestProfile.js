import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TableCard, { TableTextLink , TableTitle } from "../../components/table/Tables"
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import Swal from 'sweetalert2'
import {StatusTextInsurance} from "../../components/status/Status"

function VisitRequestProfile() {
  const actionX = useMemo(() => ({ approve: 'approve', cancel: 'cancel' }), [])
  const navigate = useNavigate()
  const { auth, setAuth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [list, setList] = useState([])
  const [refreshList, setRefreshList] = useState(false)

  

  useEffect(() => {
      console.log("Visitprofile")
    // let isMounted = true
    // const controller = new AbortController()

    // // async function getList() {
    // //   await axiosPrivate
    // //     .post(
    // //       'getVisitRequestProfile',
    // //       { Email: auth.email },
    // //       {
    // //         signal: controller.signal,
    // //       }
    // //     )
    //     .then((res) => {
    //       console.log(res)
    //       const { Status, Data: data = [], Message } = res.data

    //       if (Status) {
    //         isMounted && setList(data)
    //       } else {
    //         throw new Error(Message)
    //       }
    //     })
    //     .catch((err) => {
    //       console.error(err)
    //       setErrMsg(err.message)
    //     })
    // }

    // getList()

    // return () => {
    //   isMounted = false
    //   controller.abort()
    // }
  }, [refreshList])

  return (
    <div className='container-fluid'>
      <TableTitle title = "Visit Requests"/>
      <div className="page-wrapper">
            <div className="page-content">

                <div className="container-fluid">
                    {/* <div className="row">
                        <div className="col-sm-12">
                            <div className="page-title-box">
                                <div className="float-right">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="../dashboard/provider-index.html">Niu Health</a></li>
                                        <li className="breadcrumb-item"><a href="../dashboard/visit_requests-index.html">Visit Requests</a></li>
                                        <li className="breadcrumb-item active">Request Approval</li>
                                    </ol>
                                </div>
								<h4 className="page-title">Request Approval</h4>
                            </div>
                            
                        </div>
                    </div>
  */}

 
					<div className="row">                               
                        <div className="col-lg-12">
						
                           <div className="card"> 

							<div className="card-body">  
                                    <div className="text-center">
                                        <img className="mr-3 rounded-circle thumb-xl" src="../assets/images/users/user-4.jpg" alt=""/>
                                        <div className="visitRequestDetailsUser">
                                            <h5 className="mb-1 text-dark">Donald Gardner</h5>
                                            <small className="text-muted">Diagnosis: Bronchisis</small>
											
										</div>
                                        <p className="text-muted font-14 px-3">Visit Reason:<br/>Contrary to popular belief, Lorem Ipsum is not simply random text. 
                                            It has roots in a piece of classical Latin. 
                                        </p>
                                        <div>
											<span className="badge badge-md badge-soft-info">New Patient</span>
											<span className="badge badge-md badge-soft-success">Insured</span>
										</div>
										
										<p>
											<div className="col-lg-4 insuranceVisitRequest">
                            <div className="card">
                                <div className="card-body">
			
								INSURANCE
	
                                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                        <ol className="carousel-indicators">
                                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                            <li data-target="#carouselExampleIndicators" data-slide-to="1" className=""></li>
                                            <li data-target="#carouselExampleIndicators" data-slide-to="2" className=""></li>
                                        </ol>
                                        <div className="carousel-inner" role="listbox">
                                            <div className="carousel-item active">
                                                <img className="d-block img-fluid" src="../assets/images/small/img-4.jpg" alt="First slide"/>
                                            </div>
                                            <div className="carousel-item">
                                                <img className="d-block img-fluid" src="../assets/images/small/img-5.jpg" alt="Second slide"/>
                                            </div>
                                            <div className="carousel-item">
                                                <img className="d-block img-fluid" src="../assets/images/small/img-6.jpg" alt="Third slide"/>
                                            </div>
                                        </div>
                                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </div>
									<div style={{marginTop:"10px"}}>
									<button type="button" className="btn btn-outline-success waves-effect waves-light">Approve</button> <button type="button" className="btn btn-outline-danger waves-effect waves-light">Reject</button>
									</div>
                                </div>
                            </div>
                        </div>
										</p>
										
										
                                        <div>
											<button type="button" className="btn btn-gradient-success waves-effect waves-light" onclick="approveVisit('Donald');">Confirm</button>
                                            
											<button type="button" className="btn btn-gradient-danger waves-effect waves-light" onclick="cancelVisit('Donald');">Cancel</button>
										
                                        </div>
                                    </div>
                                </div>
							
                        </div>                    
                    </div>
					
					
					

                </div>

                <footer className="footer text-center text-sm-left">
                    &copy; 2022 NIU Health 
                </footer>
            </div>
            </div>
        </div>
      
    </div>
  )
}

// function dateGenerator(date, time) {
//   return moment(date).add(time, 'hours').format('DD MMM YYYY h:mm a')
// }

export default VisitRequestProfile

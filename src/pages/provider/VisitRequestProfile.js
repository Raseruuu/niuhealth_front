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
      <div class="page-wrapper">
            <div class="page-content">

                <div class="container-fluid">
                    {/* <div class="row">
                        <div class="col-sm-12">
                            <div class="page-title-box">
                                <div class="float-right">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="../dashboard/provider-index.html">Nu Health</a></li>
                                        <li class="breadcrumb-item"><a href="../dashboard/visit_requests-index.html">Visit Requests</a></li>
                                        <li class="breadcrumb-item active">Request Approval</li>
                                    </ol>
                                </div>
								<h4 class="page-title">Request Approval</h4>
                            </div>
                            
                        </div>
                    </div>
  */}

 
					<div class="row">                               
                        <div class="col-lg-12">
						
                           <div class="card"> 

							<div class="card-body">  
                                    <div class="text-center">
                                        <img class="mr-3 rounded-circle thumb-xl" src="../assets/images/users/user-4.jpg" alt=""/>
                                        <div class="visitRequestDetailsUser">
                                            <h5 class="mb-1 text-dark">Donald Gardner</h5>
                                            <small class="text-muted">Diagnosis: Bronchisis</small>
											
										</div>
                                        <p class="text-muted font-14 px-3">Visit Reason:<br/>Contrary to popular belief, Lorem Ipsum is not simply random text. 
                                            It has roots in a piece of classical Latin. 
                                        </p>
                                        <div>
											<span class="badge badge-md badge-soft-info">New Patient</span>
											<span class="badge badge-md badge-soft-success">Insured</span>
										</div>
										
										<p>
											<div class="col-lg-4 insuranceVisitRequest">
                            <div class="card">
                                <div class="card-body">
			
								INSURANCE
	
                                    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                        <ol class="carousel-indicators">
                                            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                                            <li data-target="#carouselExampleIndicators" data-slide-to="1" class=""></li>
                                            <li data-target="#carouselExampleIndicators" data-slide-to="2" class=""></li>
                                        </ol>
                                        <div class="carousel-inner" role="listbox">
                                            <div class="carousel-item active">
                                                <img class="d-block img-fluid" src="../assets/images/small/img-4.jpg" alt="First slide"/>
                                            </div>
                                            <div class="carousel-item">
                                                <img class="d-block img-fluid" src="../assets/images/small/img-5.jpg" alt="Second slide"/>
                                            </div>
                                            <div class="carousel-item">
                                                <img class="d-block img-fluid" src="../assets/images/small/img-6.jpg" alt="Third slide"/>
                                            </div>
                                        </div>
                                        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                    </div>
									<div style={{marginTop:"10px"}}>
									<button type="button" class="btn btn-outline-success waves-effect waves-light">Approve</button> <button type="button" class="btn btn-outline-danger waves-effect waves-light">Reject</button>
									</div>
                                </div>
                            </div>
                        </div>
										</p>
										
										
                                        <div>
											<button type="button" class="btn btn-gradient-success waves-effect waves-light" onclick="approveVisit('Donald');">Confirm</button>
                                            
											<button type="button" class="btn btn-gradient-danger waves-effect waves-light" onclick="cancelVisit('Donald');">Cancel</button>
										
                                        </div>
                                    </div>
                                </div>
							
                        </div>                    
                    </div>
					
					
					

                </div>

                <footer class="footer text-center text-sm-left">
                    &copy; 2022 NU Health 
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

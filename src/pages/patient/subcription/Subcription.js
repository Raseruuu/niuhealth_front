import moment from 'moment'
import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import CardItem from '../../../components/cards/Card'
import Footer from '../../../components/Footer'
import RingLoading from '../../../components/lottie/RingLoading'
import TableCard from '../../../components/table/Tables'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

/* required css:

<!-- Sweet Alert -->
    <link
      href="../../plugins/sweet-alert2/sweetalert2.min.css"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="../../plugins/animate/animate.css"
      rel="stylesheet"
      type="text/css"
    />
    <script src="../assets/js/nuPopup.js"></script>

    */

/* required js:
    
    <!-- Sweet-Alert  -->
    <script src="../../plugins/sweet-alert2/sweetalert2.min.js"></script>
    <script src="../assets/pages/jquery.sweet-alert.init.js"></script>

    */

function Subscription() {
  const deleteCC = (value) => window?.deleteCC(value) || false
  const navigate = useNavigate()
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [isLoading,setIsLoading]=useState(true)
  
  const [isLoadingPayments,setIsLoadingPayments]=useState(true)
  
  const [paymentHistory,setPaymentHistory] = useState([])
  const [subs, setSubs] = useState({ subsStart: '-', subsEnd: '-' })
  const [isSuccess,setIsSuccess]=useState(false)
  async function handleCancelSub(){
    await axiosPrivate
      .post(
        "cancelSubscription",
        {Email:auth.email})
      .then((res) => {
        console.log('res',res)
        Swal.fire({icon:'info',html:`Subscription has been cancelled.`})
        navigate('/patient/subscription/plans')
    })
    .catch((error) => {
      console.error(error)
    })
  }
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    async function getPatientPayments() {
      await axiosPrivate
        .post(
          'getPatientPayments',
          { Email: auth.email},
          {
            signal: controller.signal
          }
        )
        .then((res) => {
          
          const { Status, Data: data = [], Message } = res.data
          const details = data[0]
         
          if (Status) {
            setIsLoadingPayments(false)
            console.log('deets',res.data.Data )
            setPaymentHistory(res.data.Data)

            



          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          setIsLoadingPayments(false)
          console.error(err)
        })
    }
    async function getRecord() {
      await axiosPrivate
        .post(
          'getPatientSubscription',
          { Email: auth.email },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          console.log(res)
          const { Status, Data: data = [], Message } = res.data

          if (Status && Message === 'Patient not subscribed') {
            
            setIsLoading(false)
            setIsSuccess(true)
            navigate('plans')
          }

          if (Status && isMounted) {
            
            setIsLoading(false)
            setSubs({
              subsStart: data.subscription_start,
              subsEnd: data.subscription_end,
            })
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
          setErrMsg(err.message)
        })
    }

    isMounted && getRecord()
    getPatientPayments()
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
                <h4 className='page-title'>Subscription and Payment</h4>
              </div>
            </div>
          </div>
          {(subs.subsStart!='-'||isLoading)?
            <div className='row'>
              <div className='col-lg-12'>
                <div className='card'>
                  <div className='card-body'>
                    <div className='total-payment'>
                      <h5 className='m-2'>Subscription</h5>
                      <table className='table mb-0'>
                        <tbody>
                          <tr>
                            <td className='payment-title'>Start date</td>
                            <td>{isSuccess?moment(subs.subsStart).format('MM/DD/YYYY'):''}</td>
                          </tr>
                          <tr>
                            <td className='payment-title'>End Date</td>
                            <td>{isSuccess?moment(subs.subsEnd).format('MM/DD/YYYY'):''}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className='d-flex flex-column flex-md-row float-right'>
                        <button
                          type='button'
                          className='btn btn-round btn-outline-info waves-effect waves-light'
                          onClick={() => navigate('renew')}
                        >
                          Renew Your Subscription
                        </button>{' '}
                        <button
                          type='button'
                          className='btn btn-round btn-outline-danger waves-effect waves-light mt-1 mt-md-0 ml-0 ml-md-1'
                          onClick={() =>
                            Swal.fire({
                              icon:'question',
                              html:`Are you sure you want to cancel your subscription?`,
                              showConfirmButton:true,
                              showCancelButton:true
                            }
                            ).then((result)=>{
                              if (result.isConfirmed){
                                handleCancelSub();
                              }
                            })
                            
                          }
                        >
                          Cancel Subscription
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          :<CardItem><div className='d-flex justify-content-center'><RingLoading size={200}/></div></CardItem>}
          {/* <div className='row'>
            <div className='col-lg-6'>
              <div className='card'>
                <div className='card-body'>
                  <div className='total-payment'>
                    <h5>Payment</h5>
                    <p>Saved payment methods</p>

                    <div className='activity'>
                      <div className='activity-info'>
                        <div className='icon-info-activity'>
                          <i className='fab fa-cc-visa'></i>
                        </div>
                        <div className='activity-info-text'>
                          <div className='d-flex justify-content-between align-items-center'>
                            <h6 className='m-0 w-75'>Visa ending in 6111</h6>
                          </div>
                          <p className='text-muted mt-3'>Expires in 12/2017</p>
                          <p className='text-muted mt-3'>
                            Default
                            <a
                              href='?'
                              className='text-info ccDelete redText'
                              onClick={deleteCC.bind('6111')}
                            >
                              Delete
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className='activity-info'>
                        <div className='icon-info-activity'>
                          <i className='fab fa-cc-visa'></i>
                        </div>
                        <div className='activity-info-text'>
                          <div className='d-flex justify-content-between align-items-center'>
                            <h6 className='m-0 w-75'>Visa ending in 6111</h6>
                          </div>
                          <p className='text-muted mt-3'>Expires in 12/2017</p>
                          <p className='text-muted mt-3'>
                            <a href='?' className='text-info'>
                              Make Default
                            </a>
                            <a
                              href='?'
                              className='text-info ccDelete redText'
                              onClick={deleteCC.bind('6111')}
                            >
                              Delete
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>

                    <a href='subscription - manage.html'>
                      <button
                        type='button'
                        className='btn btn-success btn-round waves-effect waves-light'
                      >
                        Add New Payment Method
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className='row-lg-12'>
                    {(paymentHistory.length!==0)?
                      <TableCard headers={["Description","Payment Time", "Amount"]}>
                      {paymentHistory.map((item,index)=>(
                        <tr key={index}>
                        <td>
                          <NavLink onClick={
                            async ()=>{
                              await axiosPrivate.post("getStripeReceipt",{Email:auth.email,ChargeID:item.trans_id})
                              .then((res)=>{
                                console.log(res)
                                const receipt_link=res.data.Data
                                Swal.fire({
                                  html:`Would you like to view your receipt?`,
                                  title:"Payment Receipt",
                                  showConfirmButton:true,
                                  showCancelButton:true
                                })
                                .then((response)=>{if (response){
                                  // navigate(receipt_link,{replace:true})
                                  openInNewTab(receipt_link)
                                }})
                              })
                              }}>
                            {item.description} 
                          </NavLink>
                        </td>
                        <td>
                        {moment(item.payment_date_time).format('hh:mm a MM/DD/YY')}
                        </td>
                        {/* <td>
                        <a href={item.receipt}>View<i className="fa fa-receipt"></i></a>
                        </td> */}
                        <td>
                        {item.amount}
                        </td>
                        </tr>

                      ))}
                      
                      </TableCard>:<><CardItem className={'col-lg-12'}>{(isLoadingPayments)?<div className='d-flex justify-content-center'><RingLoading size={200}/></div>:"No Payment History results."}</CardItem></>}
                  
                </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default Subscription
function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../../components/Footer'
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
  const [subs, setSubs] = useState({ subsStart: '-', subsEnd: '-' })

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

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

          if (!Status && Message === 'Patient not subscribed') {
            navigate('plans')
          }

          if (Status && isMounted) {
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

          <div className='row'>
            <div className='col-lg-6'>
              <div className='card'>
                <div className='card-body'>
                  <div className='total-payment'>
                    <h5>Subscription</h5>
                    <table className='table mb-0'>
                      <tbody>
                        <tr>
                          <td className='payment-title'>Start date</td>
                          <td>{moment(subs.subsStart).format('MM/DD/YYYY')}</td>
                        </tr>
                        <tr>
                          <td className='payment-title'>End Date</td>
                          <td>{moment(subs.subsStart).format('MM/DD/YYYY')}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className='d-flex flex-column flex-md-row '>
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
                          window?.cancelSubscription('6/20/2023') || false
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

          <div className='row'>
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
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default Subscription

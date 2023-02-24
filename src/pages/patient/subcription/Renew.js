import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../../components/Footer'
import { AWS_BUCKET } from '../../../constants'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

function Renew() {
  const navigage = useNavigate()
  const navigate = useNavigate()
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async () => {
    setIsLoading(true)
    try {
      // setIsLoading(false)
    } catch (error) {
      // setIsLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function getList() {
      await axiosPrivate
        .get(
          'getSubscriptions',
          { },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          const { Status, Data: data = [], Message } = res.data

          if (Status && isMounted) {
            isMounted && setList(data)
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          setErrMsg(err.message)
        })
    }

    getList()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <div className='container-fluid'>
          {/* <div
            className='spacetop alert alert-warning alert-warning-shadow mb-0 alert-dismissible fade show'
            role='alert'
          >
            <button
              type='button'
              className='close'
              data-dismiss='alert'
              aria-label='Close'
            >
              <span aria-hidden='true'>
                <i className='mdi mdi-close'></i>
              </span>
            </button>
            Your insurance document has expired. Please upload a valid document.
            If you don’t have insurance, please subscribe to our{' '}
            <Link to=''>monthly plan</Link>
          </div> */}

          <div className='row'>
            <div className='col-sm-12'>
              <div className='page-title-box'>
                <h4 className='page-title'>Subscription and Payment</h4>
              </div>
            </div>
          </div>

          <div className='row'>
            {list.map((item) => (
              <div className='col-lg-3' key={item?.subscription_plan}>
                <div className='card'>
                  <div className='card-body'>
                    <div className='pricingTable1 text-center'>
                      <img
                        src={`${AWS_BUCKET}/assets/images/widgets/p-5.svg`}
                        alt=''
                        className=''
                        height='100'
                      />
                      <h6 className='title1 py-3 mt-2 mb-0'>
                        {item.plan_name}
                        <small className='text-muted'></small>
                      </h6>
                      <ul className='list-unstyled pricing-content-2 pb-3'>
                        <li>Lorem ipsum</li>
                        <li>Dolor sit amet</li>
                        <li>Consectetur adipiscing</li>
                        <li>Nulla quis accumsan</li>
                        <li>Sed auctor</li>
                      </ul>
                      <div className='text-center'>
                        <h3 className='amount'>
                          ${item.amount}
                          <small className='font-12 text-muted'>
                            /{item.description}
                          </small>
                        </h3>
                      </div>
                      <div className='d-flex justify-content-center'>
                        <Link
                          to='pay'
                          state={{
                            ...item,
                            actionDescription: 'Purchase subcription',
                          }}
                          className='pricingTable-signup mt-3 '
                          disabled={isLoading}
                          onClick={handleSubscribe}
                        >
                          subscribe now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default Renew

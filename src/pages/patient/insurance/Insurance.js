import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AWS_BUCKET } from '../../../constants'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

function Insurance() {
  const navigate = useNavigate()
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [list, setList] = useState([])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function getList() {
      await axiosPrivate
        .post(
          'patientGetInsurances',
          { Email: auth.email },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          console.log(res)
          const { Status, Data: data = [], Message } = res.data

          if (Status) {
            setList(data)
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
          setErrMsg(err.message)
        })
    }

    isMounted && getList()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <div className='container-fluid'>
          {/* {(list.length===0)?
          <div className='row figmaFirstBox'>
            <div className='col-sm-12'>
              <div
                className='alert alert-warning alert-warning-shadow mb-0 alert-dismissible fade show'
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
                You currently have no active insurance documents submitted. Please upload a 
                document. If you don’t have insurance, please subscribe to
                <a href=''>our monthly plan</a>
              </div>
            </div>
          </div>:null
          } */}
          <div className='row'>
            <div className='col-sm-12'>
              <div className='page-title-box'>
                <h4 className='page-title'>Insurance</h4>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-12'>
              <div className='card'>
                <div className='card-body'>
                  <h4 className='header-title mt-0 mb-3'>Insurance Document</h4>

                  <div className='file-box-content'>
                    {list.map((item) => (
                      <div className='file-box'>
                        <Link
                          to={{
                            pathname: `${AWS_BUCKET}/insurance/${item.image}`,
                          }}
                          target='_blank'
                          className='download-icon-link'
                        >
                          <i className='dripicons-download file-download-icon'></i>
                        </Link>
                        <div className='text-center'>
                          <i className='far fa-file-alt text-primary'></i>
                          <h6 className='text-truncate'>
                            {item.provider} {item.type}
                          </h6>
                          <small className='text-muted'>
                            {/* 06 March 2022 / 5MB */}
                          </small>
                        </div>
                      </div>
                    ))}

                    {/* <div className='file-box'>
                      <a href='#' className='download-icon-link'>
                        <i className='dripicons-download file-download-icon'></i>
                      </a>
                      <div className='text-center'>
                        <i className='far fa-file-code text-danger'></i>
                        <h6 className='text-truncate'>Insurance.pdf</h6>
                        <small className='text-muted'>
                          15 March 2022 / 8MB
                        </small>
                      </div>
                    </div> */}
                  </div>

                  <Link to='upload'>
                    <button
                      type='button'
                      className='btn btn-success btn-round waves-effect waves-light mt-2'
                    >
                      Upload New Documents
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className='footer text-center text-sm-left'>
          &copy; 2022 NU Health
        </footer>
      </div>
    </div>
  )
}

export default Insurance

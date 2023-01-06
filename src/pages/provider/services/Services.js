import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import { AWS_BUCKET } from '../../../constants'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

function Services({ limit }) {
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
          'getServices',
          { Email: auth.email || sessionStorage.getItem('email') },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          console.log(res)
          const { Status, Data: data = [], Message } = res.data

          if (Status) {
            setList(data.slice(0, limit))
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
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='page-title-box'>
            <div className='float-right'>
              <ol className='breadcrumb'>
                <Link to='manage/new'>
                  <button
                    type='button'
                    className='btn btn-success waves-effect waves-light'
                  >
                    New Service
                  </button>
                </Link>
              </ol>
            </div>
            <h4 className='page-title'>Services</h4>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-3'>
          <div className='card'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-lg-12'>
                  <h5 className='mt-0 mb-4'>Filter</h5>

                  <div className='p-3'>
                    <h6 className='mb-3 mt-0'>My Clinics</h6>
                    <div className='checkbox checkbox-success '>
                      <input id='checkbox0' type='checkbox' defaultChecked />
                      <label for='checkbox0'>BLK Hospital</label>
                    </div>
                    <div className='checkbox checkbox-success '>
                      <input id='checkbox1' type='checkbox' defaultChecked />
                      <label for='checkbox1'>Linda's Clinic</label>
                    </div>
                    <div className='checkbox checkbox-success '>
                      <input id='checkbox2' type='checkbox' />
                      <label for='checkbox2'>Sony Center Clinic</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-lg-12'>
                  <div className='p-3'>
                    <h6 className='mt-0 mb-4'>Ratings</h6>
                    <div className='checkbox checkbox-success'>
                      <input id='checkbox3' type='checkbox' />
                      <label for='checkbox3'>
                        {' '}
                        5<i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                      </label>
                    </div>
                    <div className='checkbox checkbox-success'>
                      <input id='checkbox4' type='checkbox' />
                      <label for='checkbox4'>
                        {' '}
                        4<i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star light-gray'></i>
                      </label>
                    </div>
                    <div className='checkbox checkbox-success'>
                      <input id='checkbox5' type='checkbox' />
                      <label for='checkbox5'>
                        {' '}
                        3<i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star light-gray'></i>
                        <i className='mdi mdi-star light-gray'></i>
                      </label>
                    </div>
                    <div className='checkbox checkbox-success'>
                      <input id='checkbox6' type='checkbox' />
                      <label for='checkbox6'>
                        {' '}
                        2<i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star light-gray'></i>
                        <i className='mdi mdi-star light-gray'></i>
                        <i className='mdi mdi-star light-gray'></i>
                      </label>
                    </div>
                    <div className='checkbox checkbox-success'>
                      <input id='checkbox7' type='checkbox' />
                      <label for='checkbox7'>
                        {' '}
                        1<i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star light-gray'></i>
                        <i className='mdi mdi-star light-gray'></i>
                        <i className='mdi mdi-star light-gray'></i>
                        <i className='mdi mdi-star light-gray'></i>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-lg-9'>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='form-group'>
                <div className='input-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Search Service...'
                    aria-label='Search Service...'
                  />
                  <span className='input-group-append'>
                    <button className='btn btn-success' type='button'>
                      Go!
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            {list.map((item, index) => (
              <div key={item?.recno || index} className='col-lg-4'>
                <div className='card e-co-product'>
                  <Link to=''>
                    <img
                      src={`${AWS_BUCKET}/${
                        item?.picture_file ?? 'assets/images/products/img-1.png'
                      }`}
                      alt=''
                      className='img-fluid'
                    />
                  </Link>
                  <div className='card-body product-info'>
                    <Link to='' className='product-title'>
                      {item.service_description}
                    </Link>
                    <p>{item.description}</p>
                    <div className='d-flex justify-content-between my-2'>
                      <p className='product-price'>${item.cost_price}</p>
                      <p className='mb-0 product-review align-self-center'>
                        <Rating
                          fillColor='#ffb822'
                          emptyColor='white'
                          SVGstrokeColor='#f1a545'
                          SVGstorkeWidth={1}
                          size={17}
                          allowFraction={true}
                          initialValue={4.5}
                          readonly={true}
                        />
                      </p>
                    </div>
                    <Link to='manage/update' state={{ selectedService: item }}>
                      <button
                        type='button'
                        className='btn btn-gradient-success waves-effect waves-light'
                      >
                        Manage
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services

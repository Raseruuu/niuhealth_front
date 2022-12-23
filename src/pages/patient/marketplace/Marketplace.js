import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import Footer from '../../../components/Footer'
import { AWS_BUCKET } from '../../../constants'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

export default function Marketplace() {
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [list, setList] = useState([])
  const priceRangeRef = useRef()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function getList() {
      await axiosPrivate
        .get('getAllServices', {
          signal: controller.signal,
        })
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

  useEffect(() => {
    window.$('#range_doctors_rate').ionRangeSlider({
      type: 'double',
      skin: 'modern',
      grid: true,
      min: 0,
      max: 1000,
      from: 20,
      to: 200,
    })
  }, [])

  return (
    <div className='figma mt-5'>
      <div className='page-wrapper'>
        <div className='page-content'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-sm-12'>
                <div className='page-title-box'>
                  <h4 className='page-title'>Marketplace</h4>
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
                          <h6 className='mb-3 mt-0'>Service Categories</h6>
                          <div className='checkbox checkbox-success '>
                            <input
                              id='checkbox0'
                              type='checkbox'
                              defaultChecked
                            />
                            <label htmlFor='checkbox0'>
                              Allergy and immunology
                            </label>
                          </div>
                          <div className='checkbox checkbox-success '>
                            <input
                              id='checkbox1'
                              type='checkbox'
                              defaultChecked
                            />
                            <label htmlFor='checkbox1'>Anesthesiology</label>
                          </div>
                          <div className='checkbox checkbox-success '>
                            <input
                              id='checkbox2'
                              type='checkbox'
                              defaultChecked
                            />
                            <label htmlFor='checkbox2'>Dermatology</label>
                          </div>
                          <div className='checkbox checkbox-success '>
                            <input
                              id='checkbox3'
                              type='checkbox'
                              defaultChecked
                            />
                            <label htmlFor='checkbox3'>
                              Diagnostic radiology
                            </label>
                          </div>
                          <div className='checkbox checkbox-success '>
                            <input
                              id='checkbox4'
                              type='checkbox'
                              defaultChecked
                            />
                            <label htmlFor='checkbox4'>
                              Emergency medicine
                            </label>
                          </div>
                          <div className='checkbox checkbox-success '>
                            <input
                              id='checkbox5'
                              type='checkbox'
                              defaultChecked
                            />
                            <label htmlFor='checkbox5'>Family medicine</label>
                          </div>
                          <div className='checkbox checkbox-success '>
                            <input
                              id='checkbox6'
                              type='checkbox'
                              defaultChecked
                            />
                            <label htmlFor='checkbox6'>Internal medicine</label>
                          </div>
                          <div className='checkbox checkbox-success '>
                            <input
                              id='checkbox7'
                              type='checkbox'
                              defaultChecked
                            />
                            <label htmlFor='checkbox7'>Medical genetics</label>
                          </div>
                          <div className='checkbox checkbox-success '>
                            <input
                              id='checkbox8'
                              type='checkbox'
                              defaultChecked
                            />
                            <label htmlFor='checkbox8'>Neurology</label>
                          </div>
                          <div className='checkbox checkbox-success '>
                            <input
                              id='checkbox9'
                              type='checkbox'
                              defaultChecked
                            />
                            <label htmlFor='checkbox9'>Nuclear medicine</label>
                          </div>
                          <div className='checkbox checkbox-success '>
                            <input
                              id='checkbox10'
                              type='checkbox'
                              defaultChecked
                            />
                            <label htmlFor='checkbox10'>
                              Obstetrics and gynecology
                            </label>
                          </div>
                          <div className='checkbox checkbox-success '>
                            <input
                              id='checkbox11'
                              type='checkbox'
                              defaultChecked
                            />
                            <label htmlFor='checkbox11'>Ophthalmology</label>
                          </div>
                          <div className='checkbox checkbox-success '>
                            <input
                              id='checkbox12'
                              type='checkbox'
                              defaultChecked
                            />
                            <label htmlFor='checkbox12'>Pathology</label>
                          </div>
                          <div className='checkbox checkbox-success '>
                            <input
                              id='checkbox13'
                              type='checkbox'
                              defaultChecked
                            />
                            <label htmlFor='checkbox13'>Pediatrics</label>
                          </div>
                          <div className='checkbox checkbox-success '>
                            <input
                              id='checkbox14'
                              type='checkbox'
                              defaultChecked
                            />
                            <label htmlFor='checkbox14'>
                              Physical medicine and rehabilitation
                            </label>
                          </div>
                          <div className='checkbox checkbox-success '>
                            <input
                              id='checkbox15'
                              type='checkbox'
                              defaultChecked
                            />
                            <label htmlFor='checkbox15'>
                              Preventive medicine
                            </label>
                          </div>
                          <div className='checkbox checkbox-success '>
                            <input
                              id='checkbox16'
                              type='checkbox'
                              defaultChecked
                            />
                            <label htmlFor='checkbox16'>Psychiatry</label>
                          </div>
                          <div className='checkbox checkbox-success '>
                            <input
                              id='checkbox17'
                              type='checkbox'
                              defaultChecked
                            />
                            <label htmlFor='checkbox17'>
                              Radiation oncology
                            </label>
                          </div>
                          <div className='checkbox checkbox-success '>
                            <input
                              id='checkbox18'
                              type='checkbox'
                              defaultChecked
                            />
                            <label htmlFor='checkbox18'>Surgery</label>
                          </div>
                          <div className='checkbox checkbox-success '>
                            <input
                              id='checkbox19'
                              type='checkbox'
                              defaultChecked
                            />
                            <label htmlFor='checkbox19'>Urology</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-lg-12'>
                        <div className='p-3'>
                          <h6 className='mb-3 mt-0'>Price Range</h6>
                          <input
                            ref={priceRangeRef}
                            type='text'
                            id='range_doctors_rate'
                          />
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-lg-12'>
                        <div className='p-3'>
                          <h6 className='mt-0 mb-4'>Ratings</h6>
                          {[5, 4, 3, 2, 1].map((val) => (
                            <div className='checkbox checkbox-success'>
                              <input id={`checkboxa${val}`} type='checkbox' />
                              <label htmlFor={`checkboxa${val}`}>
                                {val}
                                {Array.apply(null, { length: val }).map(
                                  (e, i) => (
                                    <i className='mdi mdi-star text-warning'></i>
                                  )
                                )}
                              </label>
                            </div>
                          ))}
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
                    <div key={item?.id || index} className='col-lg-4'>
                      <div className='card e-co-product'>
                        <Link to='providers'>
                          <img
                            src={`${AWS_BUCKET}/assets/images/products/img-1.png`}
                            alt=''
                            className='img-fluid'
                          />
                        </Link>
                        <div className='card-body product-info'>
                          <Link to='providers' className='product-title'>
                            {item.service_description}
                          </Link>
                          <p>{item.provider_name}</p>
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  )
}

const Filter = () => {}

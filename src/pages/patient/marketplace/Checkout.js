import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Footer from '../../../components/Footer'
import { AWS_BUCKET, AWS_BUCKET_SERVICES } from '../../../constants'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

export default function Checkout() {
  const cardRef = useRef()
  const { state: selectedService } = useLocation()
  
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = useForm()

  const [show, setShow] = useState(false)
  const [totalAmount, setTotalAmount] = useState(
    selectedService?.selectedProvider?.cost_price
  )
  console.log("SelectedSer",selectedService)
  const [clinic] = useState(selectedService?.clinic_obj)
  console.log("CLINIC",selectedService?.clinic_obj)
  const handleClose = () => setShow(false)

  const onSubmit = async (data) => {
    try {
      const ExpMonth = data?.expiry.split(' / ')[0]
      const ExpYear = data?.expiry.split(' / ')[1]

      const billing = {
        CardNumber: data.number,
        ExpMonth,
        Expyear: ExpYear,
        CVC: data?.cvc,
        Email: auth?.email,
        ServiceID: selectedService.selectedProvider.service_id,
        PaymentType: 3,
        ClinicID:clinic.clinic_id,
        ProviderID: selectedService.provider.provider_id,
        Date: selectedService.timeSlot.dateX,
        Time: selectedService.timeSlot.timeX,
      }

      console.log(billing)

      await axiosPrivate
        .post('servicePayment', billing)
        .then((res) => {
          const { Status, Message } = res.data
          if (Status) {
            navigate('../success', { replace: true })
          } else {
            alert(Message)
          }
        })
        .catch((err) => {
          console.error(err)
          alert(err.message)
        })
    } catch (error) {
      console.error(error)
    }
  }

  const hanldePayNow = async () => {
    await trigger().then(() => {
      if (isValid) setShow(true)
    })
  }

  useEffect(() => {
    if (cardRef.current) {
      new window.Card({
        form: document.querySelector('.bill-form'),
        container: '.card-wrapper',
      })
    }
  }, [])

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='page-title-box'>
                <div className='float-right'>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                      <Link to='/patient/marketplace'>Marketplace</Link>
                    </li>
                    <li className='breadcrumb-item active'>Checkout</li>
                  </ol>
                </div>
                <h4 className='page-title'>Checkout</h4>
              </div>
            </div>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className='row'>
              <div className='col-lg-5'>
                <div className='card'>
                  <div className='card-body'>
                    <h4 className='header-title mt-0 mb-3'>Order Summary</h4>
                    <div className='table-responsive shopping-cart'>
                      <table className='table mb-0'>
                        <thead>
                          <tr>
                            <th>Service</th>
                            <th>Appointment Date</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                           
                              <img
                                src={`${AWS_BUCKET_SERVICES}${selectedService?.selectedProvider.images}`}
                                alt=''
                                height='52'
                              />
                              <p className='d-inline-block align-middle mb-0 product-name'>
                                {
                                  selectedService?.selectedProvider
                                    ?.provider_name
                                }{' '}
                                -{' '}
                                {
                                  selectedService?.selectedProvider
                                    ?.service_name
                                }
                                
                              </p>
                            </td>
                            <td>
                              {moment(selectedService.timeSlot).format(
                                'MM/DD/YYYY h:mm a'
                              )}
                            </td>
                            <td>
                              ${selectedService?.selectedProvider?.cost_price}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className='total-payment'>
                      <table className='table mb-0'>
                        <tbody>
                          <tr>
                            <td className='payment-title'>Subtotal</td>
                            <td>
                              ${selectedService?.selectedProvider?.cost_price}
                            </td>
                          </tr>
                          <tr>
                            <td className='payment-title'>Promo Code</td>
                            <td>-$0.00</td>
                          </tr>
                          <tr>
                            <td className='payment-title'>Total</td>
                            <td className='text-dark'>
                              <strong>${totalAmount}</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* <div className='card'>
                  <div
                    className='col-md-12 align-self-center'
                    style={{ padding: '30px 20px' }}
                  >
                    <div className='text-center'>
                      <h4 className=''>Have a promo code ?</h4>
                      <p className='font-13'>
                        If you have a promocode, You can take discount !
                      </p>
                      <div className='input-group w-75 mx-auto'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Use Promo code'
                          aria-describedby='button-addon2'
                          {...register('coupon')}
                        />
                        <div className='input-group-append'>
                          <button
                            className='btn btn-gradient-success'
                            type='button'
                            id='button-addon2'
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>

              <div className='col-lg-7'>
                <div className='card'>
                  <div className='card-body'>
                    <h4 className='header-title mt-0 mb-3'>Billing Address</h4>

                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='form-group'>
                          <label>
                            First Name{' '}
                            <small className='text-danger font-13'>*</small>
                          </label>
                          <input
                            type='text'
                            className={`form-control ${
                              errors.firstname ? 'is-invalid' : null
                            }`}
                            {...register('firstname', {
                              required: true,
                              onBlur: () => trigger('firstname'),
                            })}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='form-group'>
                          <label>
                            Last Name{' '}
                            <small className='text-danger font-13'>*</small>
                          </label>
                          <input
                            type='text'
                            className={`form-control ${
                              errors.lastname ? 'is-invalid' : null
                            }`}
                            {...register('lastname', {
                              onBlur: () => trigger('lastname'),
                              required: true,
                            })}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-12'>
                        <div className='form-group'>
                          <label>
                            Address <small className='text-danger font-13'>*</small>
                          </label>
                          <input
                            type='text'
                            className={`form-control ${
                              errors.address ? 'is-invalid' : null
                            }`}
                            {...register('address', {
                              onBlur: () => trigger('address'),
                              required: true,
                            })}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='form-group'>
                          <label>
                            City <small className='text-danger font-13'>*</small>
                          </label>
                          <input
                            type='text'
                            className={`form-control ${
                              errors.city ? 'is-invalid' : null
                            }`}
                            {...register('city', {
                              onBlur: () => trigger('city'),
                              required: true,
                            })}
                          />
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='form-group'>
                          <label className='col-form-label pt-0 pb-1'>
                            Country <small className='text-danger font-13'>*</small>
                          </label>
                          <select
                            className={`form-control ${
                              errors.country ? 'is-invalid' : null
                            }`}
                            {...register('country', {
                              onBlur: () => trigger('country'),
                              required: true,
                            })}
                          >
                            <option value={''}>Select</option>
                            <option value={'Hawaii'}>Hawaii</option>
                            <option value={'USA'}>USA</option>
                            <option value={'New Zealand'}>New Zealand</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='form-group'>
                          <label>
                            Email Address{' '}
                            <small className='text-danger font-13'>*</small>
                          </label>
                          <input
                            type='email'
                            className={`form-control ${
                              errors.email ? 'is-invalid' : null
                            }`}
                            {...register('email', {
                              onBlur: () => trigger('email'),
                              required: true,
                            })}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='form-group'>
                          <label>
                            Mobile No{' '}
                            <small className='text-danger font-13'>*</small>
                          </label>
                          <input
                            type='text'
                            className={`form-control ${
                              errors.mobileno ? 'is-invalid' : null
                            }`}
                            {...register('mobileno', {
                              onBlur: () => trigger('mobileno'),
                              required: true,
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='card'>
                  <div className='card-body'>
                    <h4 className='header-title mt-0 mb-3'>Payment Details</h4>
                    <div className='billing-nav'>
                      {/* <ul
                        className='nav nav-pills justify-content-center text-center mb-3'
                        id='pills-tab'
                        role='tablist'
                      >
                        <li className='nav-item'>
                          <a
                            className='nav-link active'
                            id='pills-credit-card-tab'
                            data-toggle='pill'
                            href='#pills-credit-card'
                          >
                            <i className='mdi mdi-credit-card d-block mx-auto text-danger font-18'></i>
                            Credit-Card
                          </a>
                        </li>
                        <li className='nav-item'>
                          <a
                            className='nav-link'
                            id='pills-paypal-tab'
                            data-toggle='pill'
                            href='#pills-paypal'
                          >
                            <i className='mdi mdi-paypal d-block mx-auto text-secondary font-18'></i>
                            Paypal
                          </a>
                        </li>
                        <li className='nav-item'>
                          <a
                            className='nav-link'
                            id='pills-bitcoin-tab'
                            data-toggle='pill'
                            href='#pills-bitcoin'
                          >
                            <i className='mdi mdi-bitcoin d-block mx-auto text-warning font-18'></i>
                            Bitcoin
                          </a>
                        </li>
                      </ul> */}
                      <div className='tab-content' id='pills-tabContent'>
                        <div
                          className='tab-pane fade show active'
                          id='pills-credit-card'
                        >
                          <div className='demo-container w-100 h-100'>
                            <div className='card-wrapper mb-4'></div>
                            <div className='form-container'>
                              <div ref={cardRef} className='bill-form'>
                                <div className='row'>
                                  <div className='col-md-6'>
                                    <div className='form-group'>
                                      <input
                                        placeholder='Card number'
                                        className={`form-control ${
                                          errors.cardnumber
                                            ? 'is-invalid'
                                            : null
                                        }`}
                                        type='tel'
                                        {...register('number', {
                                          onBlur: () => trigger('number'),
                                          required: true,
                                        })}
                                      />
                                    </div>
                                  </div>
                                  <div className='col-md-6'>
                                    <div className='form-group'>
                                      <input
                                        placeholder='Full name'
                                        className={`form-control ${
                                          errors.fullname ? 'is-invalid' : null
                                        }`}
                                        type='text'
                                        {...register('name', {
                                          onBlur: () => trigger('name'),
                                          required: true,
                                        })}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='row'>
                                  <div className='col-md-6'>
                                    <div className='form-group'>
                                      <input
                                        placeholder='MM/YY'
                                        className={`form-control ${
                                          errors.expiry ? 'is-invalid' : null
                                        }`}
                                        type='tel'
                                        {...register('expiry', {
                                          onBlur: () => trigger('expiry'),
                                          required: true,
                                        })}
                                      />
                                    </div>
                                  </div>
                                  <div className='col-md-6'>
                                    <div className='form-group'>
                                      <input
                                        placeholder='CVC'
                                        className={`form-control ${
                                          errors.cvc ? 'is-invalid' : ''
                                        }`}
                                        type='number'
                                        {...register('cvc', {
                                          onBlur: () => trigger('cvc'),
                                          required: true,
                                        })}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <button
                                  type='button'
                                  className='btn btn-success px-3'
                                  onClick={hanldePayNow}
                                >
                                  Pay Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='tab-pane fade' id='pills-paypal'>
                          <div className='row'>
                            <div className='col-md-12 col-lg-6 offset-lg-3'>
                              <div className='card border'>
                                <div className='card-body'>
                                  <h4 className='title-text'>
                                    <i className='mdi mdi-paypal d-block mx-auto text-secondary font-18'></i>
                                    Add Paypal Form
                                  </h4>
                                  <p className='mb-0 text-muted'>
                                    There are many variations of passages of
                                    Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by
                                    injected humour, or randomised words.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='tab-pane fade' id='pills-bitcoin'>
                          <div className='row'>
                            <div className='col-md-12 col-lg-6 offset-lg-3'>
                              <div className='card border'>
                                <div className='card-body'>
                                  <h4 className='title-text'>
                                    <i className='mdi mdi-bitcoin d-block mx-auto text-warning font-18'></i>
                                    Add Bitcoin Form
                                  </h4>
                                  <p className='mb-0 text-muted'>
                                    There are many variations of passages of
                                    Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by
                                    injected humour, or randomised words.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ConfirmModal
              show={show}
              handleClose={handleClose}
              handleSubmit={handleSubmit(onSubmit)}
              isSubmitting={isSubmitting}
            />
          </form>

          <Footer />
        </div>
      </div>
    </div>
  )
}

const ConfirmModal = ({ show, handleClose, handleSubmit, isSubmitting }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header>
      <Modal.Title>Do you want to proceed?</Modal.Title>
    </Modal.Header>
    <Modal.Body>Please confirm to pay for availed service(s)</Modal.Body>
    <Modal.Footer>
      <button
        type='submit'
        className='btn btn-success px-3'
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Please wait...' : 'Confirm'}
      </button>
      <Button variant='outline-dark' onClick={handleClose}>
        Cancel
      </Button>
    </Modal.Footer>
  </Modal>
)

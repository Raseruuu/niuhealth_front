import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Footer from '../../../components/Footer'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

export default function PaymentForm() {
  const { state: selectedSubscription } = useLocation()
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const cardRef = useRef()
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = useForm()

  console.log(selectedSubscription)

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)

  const onSubmit = async (data) => {
    try {
      const ExpMonth = data?.expiry.split(' / ')[0]
      const ExpYear = data?.expiry.split(' / ')[1]

      const billing = {
        ...data,
        CardNumber: data.number,
        ExpMonth,
        Expyear: ExpYear,
        CVC: data?.cvc,
        Amount: selectedSubscription.amount,
        Description: selectedSubscription.actionDescription,
        Email: auth.email,
        SubscriptionPlan: selectedSubscription.subscription_plan,
        PaymentType: 3,
      }

      console.log(billing)

      await axiosPrivate
        .post('subscriptionPayment', billing)
        .then((res) => {
          const { Status, Message } = res.data
          if (Status) {
            alert(Message)
            navigate('/patient/subscription', { replace: true })
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
      <div className='page-content pt-4'>
        <div className='container-fluid'>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className='row'>
              <div className='col-lg-12'>
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
                            Address{' '}
                            <small className='text-danger font-13'>*</small>
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
                            City{' '}
                            <small className='text-danger font-13'>*</small>
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
                            Country{' '}
                            <small className='text-danger font-13'>*</small>
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
                      <ul
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
                      </ul>
                      <div className='tab-content' id='pills-tabContent'>
                        <div
                          className='tab-pane fade show active'
                          id='pills-credit-card'
                        >
                          <div className='demo-container'>
                            <div className='card-wrapper mb-4'></div>
                            <div className='form-container'>
                              <div className='bill-form' ref={cardRef}>
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
    <Modal.Body>Please confirm to pay for availed subscription.</Modal.Body>
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

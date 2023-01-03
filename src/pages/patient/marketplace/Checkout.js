import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Footer from '../../../components/Footer'
import { AWS_BUCKET } from '../../../constants'
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
        ProviderID: selectedService.selectedProvider.provider_id,
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
    <div class='page-wrapper'>
      <div class='page-content'>
        <div class='container-fluid'>
          <div class='row'>
            <div class='col-sm-12'>
              <div class='page-title-box'>
                <div class='float-right'>
                  <ol class='breadcrumb'>
                    <li class='breadcrumb-item'>
                      <Link to='/patient/marketplace'>Marketplace</Link>
                    </li>
                    <li class='breadcrumb-item active'>Checkout</li>
                  </ol>
                </div>
                <h4 class='page-title'>Checkout</h4>
              </div>
            </div>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div class='row'>
              <div class='col-lg-4'>
                <div class='card'>
                  <div class='card-body'>
                    <h4 class='header-title mt-0 mb-3'>Order Summary</h4>
                    <div class='table-responsive shopping-cart'>
                      <table class='table mb-0'>
                        <thead>
                          <tr>
                            <th>Service</th>
                            <th>Appt Date</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <img
                                src={`${AWS_BUCKET}/assets/images/products/img-5.png`}
                                alt=''
                                height='52'
                              />
                              <p class='d-inline-block align-middle mb-0 product-name'>
                                {
                                  selectedService?.selectedProvider
                                    ?.provider_name
                                }{' '}
                                -{' '}
                                {
                                  selectedService?.selectedProvider
                                    ?.service_description
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
                    <div class='total-payment'>
                      <table class='table mb-0'>
                        <tbody>
                          <tr>
                            <td class='payment-title'>Subtotal</td>
                            <td>
                              ${selectedService?.selectedProvider?.cost_price}
                            </td>
                          </tr>
                          <tr>
                            <td class='payment-title'>Promo Code</td>
                            <td>-$0.00</td>
                          </tr>
                          <tr>
                            <td class='payment-title'>Total</td>
                            <td class='text-dark'>
                              <strong>${totalAmount}</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* <div class='card'>
                  <div
                    class='col-md-12 align-self-center'
                    style={{ padding: '30px 20px' }}
                  >
                    <div class='text-center'>
                      <h4 class=''>Have a promo code ?</h4>
                      <p class='font-13'>
                        If you have a promocode, You can take discount !
                      </p>
                      <div class='input-group w-75 mx-auto'>
                        <input
                          type='text'
                          class='form-control'
                          placeholder='Use Promo code'
                          aria-describedby='button-addon2'
                          {...register('coupon')}
                        />
                        <div class='input-group-append'>
                          <button
                            class='btn btn-gradient-success'
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

              <div class='col-lg-8'>
                <div class='card'>
                  <div class='card-body'>
                    <h4 class='header-title mt-0 mb-3'>Billing Address</h4>

                    <div class='row'>
                      <div class='col-md-6'>
                        <div class='form-group'>
                          <label>
                            First Name{' '}
                            <small class='text-danger font-13'>*</small>
                          </label>
                          <input
                            type='text'
                            class={`form-control ${
                              errors.firstname ? 'is-invalid' : null
                            }`}
                            {...register('firstname', {
                              required: true,
                              onBlur: () => trigger('firstname'),
                            })}
                          />
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group'>
                          <label>
                            Last Name{' '}
                            <small class='text-danger font-13'>*</small>
                          </label>
                          <input
                            type='text'
                            class={`form-control ${
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
                    <div class='row'>
                      <div class='col-md-12'>
                        <div class='form-group'>
                          <label>
                            Address <small class='text-danger font-13'>*</small>
                          </label>
                          <input
                            type='text'
                            class={`form-control ${
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
                    <div class='row'>
                      <div class='col-md-6'>
                        <div class='form-group'>
                          <label>
                            City <small class='text-danger font-13'>*</small>
                          </label>
                          <input
                            type='text'
                            class={`form-control ${
                              errors.city ? 'is-invalid' : null
                            }`}
                            {...register('city', {
                              onBlur: () => trigger('city'),
                              required: true,
                            })}
                          />
                        </div>
                      </div>

                      <div class='col-md-6'>
                        <div class='form-group'>
                          <label class='col-form-label pt-0 pb-1'>
                            Country <small class='text-danger font-13'>*</small>
                          </label>
                          <select
                            class={`form-control ${
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
                    <div class='row'>
                      <div class='col-md-6'>
                        <div class='form-group'>
                          <label>
                            Email Address{' '}
                            <small class='text-danger font-13'>*</small>
                          </label>
                          <input
                            type='email'
                            class={`form-control ${
                              errors.email ? 'is-invalid' : null
                            }`}
                            {...register('email', {
                              onBlur: () => trigger('email'),
                              required: true,
                            })}
                          />
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group'>
                          <label>
                            Mobile No{' '}
                            <small class='text-danger font-13'>*</small>
                          </label>
                          <input
                            type='text'
                            class={`form-control ${
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

                <div class='card'>
                  <div class='card-body'>
                    <h4 class='header-title mt-0 mb-3'>Payment Details</h4>
                    <div class='billing-nav'>
                      {/* <ul
                        class='nav nav-pills justify-content-center text-center mb-3'
                        id='pills-tab'
                        role='tablist'
                      >
                        <li class='nav-item'>
                          <a
                            class='nav-link active'
                            id='pills-credit-card-tab'
                            data-toggle='pill'
                            href='#pills-credit-card'
                          >
                            <i class='mdi mdi-credit-card d-block mx-auto text-danger font-18'></i>
                            Credit-Card
                          </a>
                        </li>
                        <li class='nav-item'>
                          <a
                            class='nav-link'
                            id='pills-paypal-tab'
                            data-toggle='pill'
                            href='#pills-paypal'
                          >
                            <i class='mdi mdi-paypal d-block mx-auto text-secondary font-18'></i>
                            Paypal
                          </a>
                        </li>
                        <li class='nav-item'>
                          <a
                            class='nav-link'
                            id='pills-bitcoin-tab'
                            data-toggle='pill'
                            href='#pills-bitcoin'
                          >
                            <i class='mdi mdi-bitcoin d-block mx-auto text-warning font-18'></i>
                            Bitcoin
                          </a>
                        </li>
                      </ul> */}
                      <div class='tab-content' id='pills-tabContent'>
                        <div
                          class='tab-pane fade show active'
                          id='pills-credit-card'
                        >
                          <div class='demo-container w-100 h-100'>
                            <div class='card-wrapper mb-4'></div>
                            <div class='form-container'>
                              <div ref={cardRef} class='bill-form'>
                                <div class='row'>
                                  <div class='col-md-6'>
                                    <div class='form-group'>
                                      <input
                                        placeholder='Card number'
                                        class={`form-control ${
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
                                  <div class='col-md-6'>
                                    <div class='form-group'>
                                      <input
                                        placeholder='Full name'
                                        class={`form-control ${
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
                                <div class='row'>
                                  <div class='col-md-6'>
                                    <div class='form-group'>
                                      <input
                                        placeholder='MM/YY'
                                        class={`form-control ${
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
                                  <div class='col-md-6'>
                                    <div class='form-group'>
                                      <input
                                        placeholder='CVC'
                                        class={`form-control ${
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
                                  class='btn btn-success px-3'
                                  onClick={hanldePayNow}
                                >
                                  Pay Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class='tab-pane fade' id='pills-paypal'>
                          <div class='row'>
                            <div class='col-md-12 col-lg-6 offset-lg-3'>
                              <div class='card border'>
                                <div class='card-body'>
                                  <h4 class='title-text'>
                                    <i class='mdi mdi-paypal d-block mx-auto text-secondary font-18'></i>
                                    Add Paypal Form
                                  </h4>
                                  <p class='mb-0 text-muted'>
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
                        <div class='tab-pane fade' id='pills-bitcoin'>
                          <div class='row'>
                            <div class='col-md-12 col-lg-6 offset-lg-3'>
                              <div class='card border'>
                                <div class='card-body'>
                                  <h4 class='title-text'>
                                    <i class='mdi mdi-bitcoin d-block mx-auto text-warning font-18'></i>
                                    Add Bitcoin Form
                                  </h4>
                                  <p class='mb-0 text-muted'>
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
        class='btn btn-success px-3'
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

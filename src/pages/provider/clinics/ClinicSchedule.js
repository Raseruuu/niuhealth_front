import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../../../hooks/useAuth"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"

export default function ClinicSchedule() {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [isSuccess, setIsSuccess] = useState(false)
  const [feedbackMsg, setFeedbackMsg] = useState(null)
  const alertBtnRef = useRef()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm()
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    setFeedbackMsg(null)
    setIsSuccess(false)

    await axiosPrivate
      .post("createClinic", {
        ...data,
        Provider: auth?.email || "jmmalunao@gmail.com",
      })
      .then((res) => {
        return res.data
      })
      .then((data) => {
        const { StatusCode, Message } = data || {}
        setFeedbackMsg(Message)

        if (StatusCode === 200) {
          setIsSuccess(true)
        } else {
          setIsSuccess(false)
        }
      })
      .catch((err) => {
        console.log(err)
        setFeedbackMsg(err)
      })
  }

  useEffect(() => {
    reset()
  }, [isSubmitSuccessful])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-12'>
            <div className='page-title-box'>
              <div className='float-right'>
                <ol className='breadcrumb'>
                  <li className='breadcrumb-item'>
                    <Link to='/provider'>NU Health</Link>
                  </li>
                  <li className='breadcrumb-item'>
                    <Link to='/provider/clinics'>Clinics</Link>
                  </li>
                  <li className='breadcrumb-item active'>
                    New Clinic Schedule
                  </li>
                </ol>
              </div>
              <h4 className='page-title'> New Clinic Schedule</h4>
            </div>
          </div>
        </div>

        <div className='row '>
          <div className='col-lg-12'>
            <div className='card'>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-lg-6'>
                    <div className='form-group row'>
                      <div className='col-md-12'>
                        <label
                          htmlFor='Name'
                          className='col-form-label text-right'
                        >
                          Clinic Name
                        </label>
                      </div>
                      <div className='col-md-12'>
                        <input
                          className={`form-control ${
                            errors.Name ? "is-invalid" : ""
                          }`}
                          type='text'
                          id='Name'
                          {...register("Name", { required: true })}
                        />
                        {errors.Name ? (
                          <div
                            className='invalid-feedback'
                            style={{ display: "block" }}
                          >
                            Please enter clinic name.
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-lg-6'>
                    <div className='form-group row'>
                      <div className='col-md-12'>
                        <label
                          htmlFor='example-text-input'
                          className='col-form-label text-right'
                        >
                          Address
                        </label>
                      </div>
                      <div className='col-md-12'>
                        <input
                          className={`form-control ${
                            errors.Address ? "is-invalid" : ""
                          }`}
                          type='text'
                          id='Address'
                          {...register("Address", { required: true })}
                        />
                        {errors.Address ? (
                          <div
                            className='invalid-feedback'
                            style={{ display: "block" }}
                          >
                            Please enter clinic address.
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-lg-6'>
                    <div className='form-group row'>
                      <div className='col-md-12'>
                        <label
                          htmlFor='Services'
                          className='col-form-label text-right'
                        >
                          Services
                        </label>
                      </div>
                      <div className='col-md-12'>
                        <input
                          className={`form-control ${
                            errors.Services ? "is-invalid" : ""
                          }`}
                          type='text'
                          id='Services'
                          {...register("Services", { required: true })}
                        />
                        {errors.Services ? (
                          <div
                            className='invalid-feedback'
                            style={{ display: "block" }}
                          >
                            Please enter clinic services.
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-lg-6'>
                    <div className='form-group row'>
                      <div className='col-md-12'>
                        <label
                          htmlFor='Working_hours'
                          className='col-form-label text-right'
                        >
                          Working Hours
                        </label>
                      </div>
                      <div className='col-md-12'>
                        <input
                          className={`form-control ${
                            errors.Services ? "is-invalid" : ""
                          }`}
                          type='text'
                          id='Working_hours'
                          {...register("Working_hours", { required: true })}
                        />
                        {errors.Working_hours ? (
                          <div
                            className='invalid-feedback'
                            style={{ display: "block" }}
                          >
                            Please enter clinic working hour(s).
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                {feedbackMsg ? (
                  <div className='row'>
                    <div className='col-lg-6'>
                      <div
                        className={`alert  alert-dismissible fade show ${
                          isSuccess ? "alert-success" : "alert-danger"
                        }`}
                        role='alert'
                      >
                        {feedbackMsg}
                        <button
                          type='button'
                          className='close'
                          data-dismiss='alert'
                          aria-label='Close'
                          ref={alertBtnRef}
                        >
                          <span aria-hidden='true'>&times;</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className='row'>
                  <div className='col-lg-12'>
                    <button
                      type='submit'
                      className='btn btn-gradient-success waves-effect waves-light'
                      disabled={isSubmitting}
                    >
                      Save
                    </button>{" "}
                    <button
                      type='button'
                      className='btn btn-gradient-info waves-effect waves-light'
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

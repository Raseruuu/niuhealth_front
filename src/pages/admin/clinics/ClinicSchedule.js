import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
function CurrencySelect(currency){
  return(
    <div class="row">
      <select className="col-sm form-control" required={true} style={{marginLeft:"10px",marginRight:"20px",maxWidth:400}}>
        
        <option value={"USD"}>US Dollar (USD) </option>
        <option value={"EUR"}>European Euro (EUR)</option>
        <option value={"JPY"}>Japanese Yen (JPY)</option>
        <option value={"GBP"}>Sterling Pound (GBP)</option>
        <option value={"CHF"}>Swiss Franc (CHF)</option>
        <option value={"CAD"}>Canadian Dollar (CAD)</option>
        </select>
  </div>
  )
}
function TimeZoneSelect(timezone){
  return(
    <div class="row">
      <select className="col-sm form-control" required={true} style={{marginLeft:"10px",marginRight:"20px",maxWidth:400}}>
        
        <option value={"+00:00"}>(UTC+00:00) Coordinated Universal Time </option>
        <option value={"+01:00"}>(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna </option>
        <option value={"+01:00"}>(UTC+01:00) Brussels, Copenhagen, Madrid, Paris </option>
        <option value={"+01:00"}>(UTC+01:00) West Central Africa </option>
        <option value={"+01:00"}>(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague </option>
        <option value={"+01:00"}>(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb </option>
        <option value={"+01:00"}>(UTC+01:00) Windhoek </option>
        <option value={"+02:00"}>(UTC+02:00) Athens, Bucharest, Istanbul </option>
        <option value={"+02:00"}>(UTC+02:00) Helsinki, Kiev, Riga, Sofia, Tallinn, Vilnius </option>
        <option value={"+02:00"}>(UTC+02:00) Cairo </option>
        <option value={"+02:00"}>(UTC+02:00) Damascus </option>
        <option value={"+02:00"}>(UTC+02:00) Cairo </option>
        <option value={"+02:00"}>(UTC+02:00) Amman</option>
        <option value={"+02:00"}>(UTC+02:00) Harare, Pretoria </option>
        <option value={"+02:00"}>(UTC+02:00) Jerusalem</option>
        <option value={"+02:00"}>(UTC+02:00) Beirut</option>
        <option value={"+03:00"}>(UTC+03:00) Baghdad</option>
        <option value={"+03:00"}>(UTC+03:00) Minsk </option>
        <option value={"+03:00"}>(UTC+03:00) Kuwait, Riyadh</option>
        <option value={"+03:00"}>(UTC+03:00) Nairobi</option>
        <option value={"+3:30"}>(UTC+03:30) Tehran</option>
        <option value={"+4:00"}>(UTC+04:00) Moscow, St. Petersburg, Volgograd</option>
        <option value={"+4:00"}>(UTC+04:00) Tbilisi</option>
        <option value={"+4:00"}>(UTC+04:00) Yerevan</option>
        <option value={"+4:00"}>(UTC+04:00) Abu Dhabi, Muscat</option>
        <option value={"+4:00"}>(UTC+04:00) Baku</option>
        <option value={"+4:00"}>(UTC+04:00) Port Louis</option>
        <option value={"+4:30"}>(UTC+04:30) Kabul</option>
        <option value={"+5:00"}>(UTC+05:00) Tashkent</option>
        <option value={"+5:00"}>(UTC+05:00) Islamabad, Karachi</option>
        <option value={"+5:30"}>(UTC+05:30) Sri Jayewardenepura Kotte </option>
        <option value={"+5:30"}>(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi </option>
        <option value={"+5:45"}>(UTC+05:45) Kathmandu </option>
        <option value={"+6:00"}>(UTC+06:00) Astana </option>
        <option value={"+6:00"}>(UTC+06:00) Dhaka </option>
        <option value={"+6:00"}>(UTC+06:00) Yekaterinburg </option>
        <option value={"+6:30"}>(UTC+06:30) Yangon </option>
        <option value={"+7:00"}>(UTC+07:00) Bangkok, Hanoi, Jakarta </option>
        <option value={"+7:00"}>(UTC+07:00) Novosibirsk </option>
        <option value={"+8:00"}>(UTC+08:00) Krasnoyarsk </option>
        <option value={"+8:00"}>(UTC+08:00) Ulaanbaatar </option>
        <option value={"+8:00"}>(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi </option>
        <option value={"+8:00"}>(UTC+08:00) Perth </option>
        <option value={"+8:00"}>(UTC+08:00) Kuala Lumpur, Singapore </option>
        <option value={"+8:00"}>(UTC+08:00) Taipei </option>
        <option value={"+9:00"}>(UTC+09:00) Irkutsk </option>
        <option value={"+9:00"}>(UTC+09:00) Seoul </option>
        <option value={"+9:00"}>(UTC+09:00) Osaka, Sapporo, Tokyo </option>
        <option value={"+9:30"}>(UTC+09:30) Darwin </option>
        <option value={"+9:30"}>(UTC+09:30) Adelaide </option>
        <option value={"+10:00"}>(UTC+10:00) Hobart </option>
        <option value={"+10:00"}>(UTC+10:00) Yakutsk </option>
        <option value={"+10:00"}>(UTC+10:00) Brisbane </option>
        <option value={"+10:00"}>(UTC+10:00) Guam, Port Moresby </option>
        <option value={"+10:00"}>(UTC+10:00) Canberra, Melbourne, Sydney </option>
        <option value={"+11:00"}>(UTC+11:00) Vladivostok </option>
        <option value={"+11:00"}>(UTC+11:00) Solomon Islands, New Caledonia </option>
        <option value={"+12:00"}>(UTC+12:00) Coordinated Universal Time+12 </option>
        <option value={"+12:00"}>(UTC+12:00) Fiji, Marshall Islands </option>
        <option value={"+12:00"}>(UTC+12:00) Magadan </option>
        <option value={"+12:00"}>(UTC+12:00) Auckland, Wellington(UTC+13:00) Nuku'alofa </option>
        <option value={"+13:00"}>(UTC+13:00) Nuku'alofa </option>
        <option value={"+13:00"}>(UTC+13:00) Samoa </option>
        <option value={"-12:00"}>(UTC-12:00) International Date Line West</option>
        <option value={"-11:00"}>(UTC-11:00) Coordinated Universal Time-11</option>
        <option value={"-10:00"}>(UTC-10:00) Hawaii</option>
        <option value={"-9:00"}>(UTC-09:00) Alaska</option>
        <option value={"-8:00"}>(UTC-08:00) Baja California</option>
        <option value={"-8:00"}>(UTC-08:00) Pacific Time (US and Canada)</option>
        <option value={"-8:00"}>(UTC-07:00) Chihuahua, La Paz, Mazatlan</option>
        <option value={"-8:00"}>(UTC-07:00) Arizona</option>
        <option value={"-7:00"}>(UTC-07:00) Mountain Time (US and Canada)</option>
        <option value={"-6:00"}>(UTC-06:00) Central America</option>
        <option value={"-6:00"}>(UTC-06:00) Central Time (US and Canada)</option>
        <option value={"-6:00"}>(UTC-06:00) Saskatchewan</option>
        <option value={"-6:00"}>(UTC-06:00) Guadalajara, Mexico City, Monterey</option>
        <option value={"-5:00"}>(UTC-05:00) Bogota, Lima, Quito</option>
        <option value={"-5:00"}>(UTC-05:00) Indiana (East) </option>
        <option value={"-5:00"}>(UTC-05:00) Eastern Time (US and Canada) </option>
        <option value={"-04:30"}>(UTC-04:30) Caracas </option>
        <option value={"-04:00"}>(UTC-04:00) Atlantic Time (Canada) </option>
        <option value={"-04:00"}>(UTC-04:00) Asuncion </option>
        <option value={"-04:00"}>(UTC-04:00) Georgetown, La Paz, Manaus, San Juan </option>
        <option value={"-04:00"}>(UTC-04:00) Cuiaba </option>
        <option value={"-04:00"}>(UTC-04:00) Santiago </option>
        <option value={"-03:30"}>(UTC-03:30) Newfoundland</option>
        <option value={"03:00"}>(UTC-03:00) Brasilia </option>
        <option value={"03:00"}>(UTC-03:00) Greenland </option>
        <option value={"03:00"}>(UTC-03:00) Cayenne, Fortaleza </option>
        <option value={"03:00"}>(UTC-03:00) Buenos Aires </option>
        <option value={"03:00"}>(UTC-03:00) Montevideo </option>
        <option value={"02:00"}>(UTC-02:00) Coordinated Universal Time-2 </option>
        <option value={"-01:00"}>(UTC-01:00) Cape Verde</option>
        <option value={"-01:00"}>(UTC-01:00) Azores </option>
        <option value={"+00:00"}>(UTC+00:00) Casablanca </option>
        <option value={"+00:00"}>(UTC+00:00) Monrovia, Reykjavik </option>
        <option value={"+00:00"}>(UTC+00:00) Dublin, Edinburgh, Lisbon, London </option>
        
      </select>
  </div>
  )
}

function ScheduleSelect(){
  // hours = 0
  return(
    <div class="column" style={{paddingLeft:"20px"}}>
      <div class = "row">Start Time 
      <select className="col-sm form-control" required={true} style={{marginLeft:"10px",marginRight:"10px",minWidth:40}}>   
        <option value={8}>8 AM</option>
        <option value={9}>9 AM</option>
        <option value={10}>10 AM</option>
        <option value={11}>11 AM</option>
        <option value={12}>12 PM</option>
        <option value={13}>1 PM</option>
        <option value={14}>2 PM</option>
        <option value={15}>3 PM</option>
        <option value={16}>4 PM</option>
        <option value={17}>5 PM</option>
        <option value={18}>6 PM</option>
        <option value={19}>7 PM</option>
        <option value={20}>8 PM</option>
        <option value={21}>9 PM</option>
        <option value={22}>10 PM</option>
        <option value={23}>11 PM</option>
        <option value={0}>12 AM</option>
        <option value={1}>1 AM</option>
        <option value={2}>2 AM</option>
        <option value={3}>3 AM</option>
        <option value={4}>4 AM</option>
        <option value={5}>5 AM</option>
        <option value={6}>6 AM</option>
        <option value={7}>7 AM</option>
        <option value={null}>N/A</option>
      </select>
      </div>
      <div class = "row">End Time
        <select className="col-sm form-control" required={true} style={{marginLeft:"10px",marginRight:"10px",minWidth:40}}>
        
        <option value={20}>8 PM</option>
        <option value={21}>9 PM</option>
        <option value={22}>10 PM</option>
        <option value={23}>11 PM</option>
        <option value={0}>12 AM</option>
        <option value={1}>1 AM</option>
        <option value={2}>2 AM</option>
        <option value={3}>3 AM</option>
        <option value={4}>4 AM</option>
        <option value={5}>5 AM</option>
        <option value={6}>6 AM</option>
        <option value={7}>7 AM</option>
        <option value={8}>8 AM</option>
        <option value={9}>9 AM</option>
        <option value={10}>10 AM</option>
        <option value={11}>11 AM</option>
        <option value={12}>12 PM</option>
        <option value={13}>1 PM</option>
        <option value={14}>2 PM</option>
        <option value={15}>3 PM</option>
        <option value={16}>4 PM</option>
        <option value={17}>5 PM</option>
        <option value={18}>6 PM</option>
        <option value={19}>7 PM</option>
        <option value={null}>N/A</option>
      </select>
      </div>
  </div>
  )
}

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
      .post('createClinic', {
        ...data,
        Provider: auth?.email || 'jmmalunao@gmail.com',
      })
      .then((res) => {
        return res.data
      })
      .then((data) => {
        const { Status, Message } = data || {}
        setFeedbackMsg(Message)

        if (Status) {
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
                    <Link to='/admin'>NU Health</Link>
                  </li>
                  <li className='breadcrumb-item'>
                    <Link to='/admin/clinics'>Clinics</Link>
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
                          htmlFor='name'
                          className='col-form-label text-right'
                        >
                          Clinic Name
                        </label>
                      </div>
                      <div className='col-md-12'>
                        <input
                          className={`form-control ${
                            errors.Name ? 'is-invalid' : ''
                          }`}
                          type='text'
                          id='name'
                          {...register('name', { required: true })}
                        />
                        {errors.name ? (
                          <div
                            className='invalid-feedback'
                            style={{ display: 'block' }}
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
                          Specialty
                        </label>
                      </div>
                      <div className='col-md-12'>
                        <input
                          className={`form-control ${
                            errors.specialty ? 'is-invalid' : ''
                          }`}
                          type='text'
                          id='specialty'
                          {...register('specialty', { required: true })}
                        />
                        {errors.specialty ? (
                          <div
                            className='invalid-feedback'
                            style={{ display: 'block' }}
                          >
                            Please enter clinic's service specialty.
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
                          htmlFor='Contact_info'
                          className='col-form-label text-right'
                        >
                          Contact Info
                        </label>
                      </div>
                      <div className='col-md-12'>
                        <input
                          className={`form-control ${
                            errors.contact_info ? 'is-invalid' : ''
                          }`}
                          type='text'
                          id='contact_info'
                          {...register('contact_info', { required: true })}
                        />
                        {errors.contact_info ? (
                          <div
                            className='invalid-feedback'
                            style={{ display: 'block' }}
                          >
                            Please enter clinic's contact info.
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
                            errors.Address ? 'is-invalid' : ''
                          }`}
                          type='text'
                          id='Address'
                          {...register('Address', { required: true })}
                        />
                        {errors.Address ? (
                          <div
                            className='invalid-feedback'
                            style={{ display: 'block' }}
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
                          htmlFor='local_currency'
                          className='col-form-label text-right'
                        >
                          Local Currency
                        </label>
                      </div>
                      <div className='col-md-12'>
                        {/* <input
                          className={`form-control ${
                            errors.Services ? 'is-invalid' : ''
                          }`}
                          type='text'
                          id='local_currency'
                          {...register('local_currency', { required: true })}
                        /> */}
                        <CurrencySelect/>
                        {errors.local_currency ? (
                          <div
                            className='invalid-feedback'
                            style={{ display: 'block' }}
                          >
                            Please enter clinic's local currency(s).
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
                          htmlFor='local_time_zone'
                          className='col-form-label text-right'
                        >
                          Local Time Zone
                        </label>
                      </div>
                      <div className='col-md-12'>
                        {/* <input
                          className={`form-control ${
                            errors.Services ? 'is-invalid' : ''
                          }`}
                          type='text'
                          id='local_time_zone'
                          {...register('local_time_zone', { required: true })}
                        /> */}
                        <TimeZoneSelect/>
                        {errors.local_time_zone ? (
                          <div
                            className='invalid-feedback'
                            style={{ display: 'block' }}
                          >
                            Please enter clinic's local time zone(s).
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
                        <div className='col-sm'>
                          Sunday
                          <ScheduleSelect />
                        </div>
                        <div className='col-sm'>
                          Monday
                          <ScheduleSelect />
                        </div>
                        <div className='col-sm'>
                          Tuesday
                          <ScheduleSelect />
                        </div>
                        <div className='col-sm'>
                          Wednesday
                          <ScheduleSelect />
                        </div>
                        <div className='col-sm'>
                          Thursday
                          <ScheduleSelect />
                        </div>
                        <div className='col-sm'>
                          Friday
                          <ScheduleSelect />
                        </div>
                        <div className='col-sm'>
                          Saturday
                          <ScheduleSelect />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {feedbackMsg ? (
                  <div className='row'>
                    <div className='col-lg-6'>
                      <div
                        className={`alert  alert-dismissible fade show ${
                          isSuccess ? 'alert-success' : 'alert-danger'
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
                    </button>{' '}
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

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { AWS_BUCKET } from '../../../constants'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

function ManageServices() {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const { action } = useParams()
  const { state } = useLocation()
  const [clinicList, setClinicList] = useState([])
  const placeholderimage =`${AWS_BUCKET}/assets/images/users/user-4.jpg`
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log("data",data)
    createService(data)
    // navigate(-1)
    
  }
  const controller = new AbortController()
  async function createService(data){
    await axiosPrivate
        .post(
          'createService',
          { ServiceName: data.name,
            Email: auth.email,
            ServiceDescription:data.type,
            CostPrice:data.rate,
            Status:(data.active)||0,
            ClinicID:data.clinic[0],
            Image:data.image[0],
          },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          console.log(res)
          const { Status, Data: data = [], Message } = res.data

          if (Status) {
            setClinicList(data)
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
        })
  }
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    async function getList() {
      await axiosPrivate
        .post(
          'getClinics',
              { Email: auth.email || 'jmmalunao@gmail.com' },
              {
                signal: controller.signal,
              }
            )
            .then((res) => {
              console.log(res)
              const { Status, Data: data = [], Message } = res.data
    
              if (Status) {
                setClinicList(data)
              } else {
                throw new Error(Message)
              }
            })
            .catch((err) => {
              console.error(err)
            })
      
    }

    isMounted && getList()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <div class='container-fluid'>
      <div class='row'>
        <div class='col-sm-12'>
          <div class='page-title-box'>
            <div class='float-right'>
              <ol class='breadcrumb'>
                <li class='breadcrumb-item'>
                  <Link to='/'>NU Health</Link>
                </li>
                <li class='breadcrumb-item'>
                  <Link to='/provider/services'>Services</Link>
                </li>
                <li class='breadcrumb-item active'>Manage Service</li>
              </ol>
            </div>
            <h4 class='page-title'>Manage Service</h4>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class='row'>
          <div class='col-lg-12'>
            <div class='card'>
              <div class='card-body'>
                <h4 class='mt-0 header-title'>
                  {action === 'new' ? 'Create New' : 'Update'} Service
                </h4>
                <p class='text-muted mb-3'>
                  Lorem ipsum dolor sit amet consucetetur.
                </p>
                <div class='row' style={{ marginBottom: '30px' }}>
                  <div class='col-md-12'>
                    <label class='mb-3'>Service Name</label>
                    <input
                      required
                      class='form-control'
                      type='text'
                      {...register('name', {
                        value: state?.selectedService?.name,
                      })}
                    />
                  </div>
                </div>

                <div class='row' style={{ marginBottom: '30px' }}>
                  <div class='col-md-6'>
                    <label class='mb-3'>Choose Service Type</label>
                    <select
                      required
                      class='select2 form-control mb-3 custom-select select2-hidden-accessible'
                      style={{ width: '100%', height: '36px' }}
                      tabindex='-1'
                      aria-hidden='true'
                      {...register('type', {
                        value: state?.selectedService?.type,
                      })}
                    >
                      <option>Select</option>
                      <optgroup label='Allergy and Immunology'>
                        <option value='AK'>Allergy care</option>
                        <option value='HI'>Immunology medicine</option>
                      </optgroup>
                      <optgroup label='Anesthesiology'>
                        <option value='CA'>Critical care medicine</option>
                        <option value='CA'>Hospice and palliative care</option>
                        <option value='CA'>Pain medicine</option>
                        <option value='CA'>Pediatric anesthesiology</option>
                        <option value='CA'>Sleep medicine</option>
                      </optgroup>
                      <optgroup label='Dermatology'>
                        <option value='AZ'>Dermatopathology</option>
                        <option value='AZ'>Pediatric dermatology</option>
                        <option value='AZ'>Procedural dermatology</option>
                      </optgroup>
                      <optgroup label='Diagnostic radiology'>
                        <option value='AL'>Abdominal radiology</option>
                        <option value='AL'>Breast imaging</option>
                        <option value='AL'>Cardiothoracic radiology</option>
                        <option value='AL'>Cardiovascular radiology</option>
                        <option value='AL'>Chest radiology</option>
                        <option value='AL'>Emergency radiology</option>
                        <option value='AL'>
                          Endovascular surgical neuroradiology
                        </option>
                        <option value='AL'>Gastrointestinal radiology</option>
                        <option value='AL'>Genitourinary radiology</option>
                        <option value='AL'>Head and neck radiology</option>
                        <option value='AL'>Interventional radiology</option>
                        <option value='AL'>Musculoskeletal radiology</option>
                        <option value='AL'>Neuroradiology</option>
                        <option value='AL'>Nuclear radiology</option>
                        <option value='AL'>Pediatric radiology</option>
                        <option value='AL'>Radiation oncology</option>
                        <option value='AL'>
                          Vascular and interventional radiology
                        </option>
                      </optgroup>
                      <optgroup label='Emergency medicine'>
                        <option value='CT'>
                          Anesthesiology critical care medicine
                        </option>
                        <option value='CT'>Emergency medical services</option>
                        <option value='CT'>
                          Hospice and palliative medicine
                        </option>
                        <option value='CT'>
                          Internal medicine / Critical care medicine
                        </option>
                        <option value='CT'>Medical toxicology</option>
                        <option value='CT'>Pain medicine</option>
                        <option value='CT'>Pediatric emergency medicine</option>
                        <option value='CT'>Sports medicine</option>
                        <option value='CT'>
                          Undersea and hyperbaric medicine
                        </option>
                      </optgroup>
                    </select>
                  </div>

                  <div class='col-md-6'>
                    <label
                      for='example-text-input'
                      class='col-form-label text-right'
                    >
                      Price / Rate
                    </label>
                    <input
                      required
                      class='form-control'
                      type='text'
                      {...register('rate', {
                        value: state?.selectedService?.rate,
                      })}
                    />
                  </div>
                </div>

                <div class='row'>
                  <div class='col-lg-6'>
                    <div class='row'>
                      <div class='col-md-12'>
                        <div class='form-group'>
                          <label for='message'>Description</label>
                          <textarea
                            required
                            class='form-control'
                            rows='5'
                            {...register('description', {
                              value: state?.selectedService?.description,
                            })}
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div class='custom-control custom-switch switch-success'>
                      <input
                        id='customSwitchSuccess'
                        type='checkbox'
                        class='custom-control-input'
                        {...register('active')}
                      />
                      <label
                        class='custom-control-label'
                        for='customSwitchSuccess'
                      >
                        Active
                      </label>
                    </div>
                  </div>

                  <div class='col-lg-6'>
                    <div class='form-group'>
                      <label for='exampleFormControlSelect2'>
                        Clinic Availability (choose all that applies)
                      </label>
                      <select
                        multiple
                        required
                        className='select2 form-control mb-3 custom-select select2-hidden-accessible'
                        {...register('clinic', {
                          value: state?.selectedService?.clinic,
                        })}
                      >
                        {clinicList.map((clinic) => (
                          <option value={clinic.clinic_id}>{clinic.clinic_name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div class='row' style={{ marginTop: '40px' }}>
                  <div class='col-lg-12'>
                    <label for='exampleFormControlSelect2'>
                      Upload Service Image
                    </label>
                    <form method='post' class='card-box'>
                      <div class='uploadPicContainer'>
                        <input
                          type='file'
                          id='input-file-now-custom-1'
                          class='dropify'
                          data-default-file={placeholderimage}
                          {...register('image', {
                            value: state?.selectedService?.image,
                          })}
                        />
                      </div>
                    </form>
                  </div>
                </div>

                <div class='row' style={{ marginTop: '40px' }}>
                  <div class='col-lg-12'>
                    <button
                      type='submit'
                      class='btn btn-gradient-success waves-effect waves-light'
                    >
                      Save
                    </button>{' '}
                    <button
                      onClick={() => navigate(-1)}
                      type='button'
                      class='btn btn-gradient-info waves-effect waves-light'
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ManageServices

import { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../../components/Footer'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

function Upload() {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const formRef = useRef()
  const [errMsg, setErrMsg] = useState()
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm()

  const handleUpload = async (data) => {
    if (!data?.Image[0]) {
      return
    }

    setIsSuccess(false)
    setErrMsg(null)

    try {
      await axiosPrivate
        .post(
          'uploadInsurance',
          {
            Image: data?.Image[0],
            Email: auth?.email,
            Type: 'Health Insurance',
            Provider: data.Provider,
          },
          {
            Accept: 'application/json',
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )
        .then((res) => {
          const { Message, Status } = res.data

          if (Status) {
            setIsSuccess(true)
          } else {
            setIsSuccess(false)
            throw new Error(Message)
          }
        })
        .catch((err) => {
          setErrMsg(err.Message)
          throw err
        })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='page-title-box'>
                <h4 className='page-title'>Insurance</h4>
              </div>
            </div>
          </div>
          <form
            ref={formRef}
            onSubmit={handleSubmit(handleUpload)}
            id='formUpload'
            enctype='multipart/form-data'
          >
            <div className='row'>
              <div className='col-lg-12'>
                <div className='card'>
                  <div className='card-body'>
                    <h4 className='header-title mt-0 mb-3'>
                      Upload your insurance document to enjoy free service
                    </h4>

                    <div>
                      <label>Insurance Provider</label>
                      <select
                        class='select2 form-control mb-3 custom-select select2-hidden-accessible'
                        style={{ width: '100%', height: '36px' }}
                        tabindex='-1'
                        aria-hidden='true'
                        // {...register('Provider')}
                        name='Provider'
                      >
                        <option>Select</option>
                        <optgroup label='Hawaii Specific Medical Insurance Providers'>
                          <option value='Hawaii Medical Service Association (HMSA)'>
                            Hawaii Medical Service Association (HMSA)
                          </option>
                          <option value='Kaiser Permanente'>
                            Kaiser Permanente
                          </option>
                          <option value='Compass Rose Health Plan'>
                            Compass Rose Health Plan
                          </option>
                          <option value='UnitedHealthcare Insurance Company'>
                            UnitedHealthcare Insurance Company
                          </option>
                          <option value='United HealthCare Services, Inc.'>
                            United HealthCare Services, Inc.
                          </option>
                          <option value='American Postal Workers Union Health Plan'>
                            American Postal Workers Union Health Plan
                          </option>
                          <option value='Government Employees Health Association, Inc.'>
                            Government Employees Health Association, Inc.
                          </option>
                          <option value='National Association of Letter Carriers Health Benefit Plan'>
                            National Association of Letter Carriers Health
                            Benefit Plan
                          </option>
                          <option value='Special Agents Mutual Benefit Association'>
                            Special Agents Mutual Benefit Association
                          </option>
                          <option value='AlohaCare'>AlohaCare</option>
                        </optgroup>
                        <optgroup label='Popular US Medical Insurance Providers'>
                          <option value='AARP'>AARP</option>
                          <option value='American Family Insurance'>
                            American Family Insurance
                          </option>
                          <option value='American National Insurance Company'>
                            American National Insurance Company
                          </option>
                          <option value='Amerigroup'>Amerigroup</option>
                          <option value='Blue Cross and Blue Shield Association'>
                            Blue Cross and Blue Shield Association
                          </option>
                          <option value='Bright Health'>Bright Health</option>
                          <option value='CareSource'>CareSource</option>
                          <option value='Cambia Health Solutions'>
                            Cambia Health Solutions
                          </option>
                          <option value='Centene Corporation'>
                            Centene Corporation
                          </option>
                          <option value='Cigna'>Cigna</option>
                          <option value='Coventry Health Care'>
                            Coventry Health Care
                          </option>
                          <option value='Delta Dental'>Delta Dental</option>
                          <option value='Elevance Health'>
                            Elevance Health
                          </option>
                          <option value='EmblemHealth'>EmblemHealth</option>
                          <option value='Fortis'>Fortis</option>
                          <option value='Geisinger'>Geisinger</option>
                          <option value='Golden Rule Insurance Company'>
                            Golden Rule Insurance Company
                          </option>
                          <option value='Group Health Cooperative'>
                            Group Health Cooperative
                          </option>
                          <option value='Group Health Incorporated'>
                            Group Health Incorporated
                          </option>
                          <option value='Harvard Pilgrim Health Care'>
                            Harvard Pilgrim Health Care
                          </option>
                          <option value='Healthcare Highways'>
                            Healthcare Highways
                          </option>
                          <option value='Health Net'>Health Net</option>
                          <option value='HealthMarkets'>HealthMarkets</option>
                          <option value='HealthPartners'>HealthPartners</option>
                          <option value='HealthSpring'>HealthSpring</option>
                          <option value='Highmark'>Highmark</option>
                          <option value='Horace Mann Educators Corporation'>
                            Horace Mann Educators Corporation
                          </option>
                          <option value='Humana'>Humana</option>
                          <option value='Independence Blue Cross'>
                            Independence Blue Cross
                          </option>
                          <option value='Kaleida Health'>Kaleida Health</option>
                          <option value='Liberty Medical'>
                            Liberty Medical
                          </option>
                          <option value='MassHealth'>MassHealth</option>
                          <option value='Medical Mutual of Ohio'>
                            Medical Mutual of Ohio
                          </option>
                          <option value='MEGA Life and Health Insurance'>
                            MEGA Life and Health Insurance
                          </option>
                          <option value='Molina Healthcare'>
                            Molina Healthcare
                          </option>
                          <option value='Oscar Health'>Oscar Health</option>
                          <option value='Oxford Health Plans'>
                            Oxford Health Plans
                          </option>
                          <option value='Premera Blue Cross'>
                            Premera Blue Cross
                          </option>
                          <option value='Principal Financial Group'>
                            Principal Financial Group
                          </option>
                          <option value='Shelter Insurance'>
                            Shelter Insurance
                          </option>
                          <option value='State Farm'>State Farm</option>
                          <option value='Thrivent Financial for Lutherans'>
                            Thrivent Financial for Lutherans
                          </option>
                          <option value='UnitedHealth Group'>
                            UnitedHealth Group
                          </option>
                          <option value='Unitrin'>Unitrin</option>
                          <option value='Universal American Corporation'>
                            Universal American Corporation
                          </option>
                          <option value='WellCare'>WellCare</option>
                          <option value='10Insurances'>10Insurances</option>
                          <option value='Bankers Life and Casualty'>
                            Bankers Life and Casualty
                          </option>
                          <option value='Conseco'>Conseco</option>
                          <option value='Fidelis Care'>Fidelis Care</option>
                          <option value='Mutual of Omaha'>
                            Mutual of Omaha
                          </option>
                          <option value='United American Insurance Company'>
                            United American Insurance Company
                          </option>
                        </optgroup>
                      </select>
                    </div>

                    <div>
                      <input
                        type='file'
                        id='input-file-now'
                        className='dropify'
                        accept='image/*'
                        capture='user'
                        {...register('Image', { required: true })}
                      />
                      {errors.Image ? (
                        <div className='text-danger'>Please choose file</div>
                      ) : null}
                    </div>

                    <p>
                      <small className='text-muted'>
                        If you want to capture the document photos using mobile
                        camera, sign in on your mobile and you will get navigate
                        directly to this page
                      </small>
                    </p>
                    <p>The document will be checked during your first visit</p>

                    {errMsg ? (
                      <div class='alert alert-danger' role='alert'>
                        Upload Failed. {errMsg}
                      </div>
                    ) : null}
                    {isSuccess ? (
                      <div class='alert alert-success' role='alert'>
                        File successfully uploaded.
                      </div>
                    ) : null}
                    {!isSuccess ? (
                      <button
                        type='submit'
                        onClick={handleUpload}
                        className='btn btn-success btn-round waves-effect waves-light'
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Please wait...' : 'Upload Documents'}
                      </button>
                    ) : (
                      <button
                        type='button'
                        onClick={() => navigate(-1)}
                        className='btn btn-success btn-round waves-effect waves-light'
                      >
                        Go Back
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default Upload

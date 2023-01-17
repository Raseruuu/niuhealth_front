import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
export default function TellUsWhy() {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const [symptom, setSymptom] = useState('')
  const [selectedSymptom, setSelectedSymptom] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleButtonClick(selected) {
    const currentSelected = new Set(selectedSymptom)

    if (currentSelected.has(selected)) return

    currentSelected.add(selected)
    setSelectedSymptom((prev) => [...prev, selected])

    if (symptom.trim().length <= 0) {
      setSymptom(selected)
    } else {
      setSymptom((prev) => `${prev}, ${selected}`)
    }
  }

  function handleTextarea(e) {
    const val = e.target.value
    setSymptom(val)

    if (val.length <= 0) {
      setSelectedSymptom([])
    }
  }

  const handleSubmit = async () => {
    const controller = new AbortController()

    try {
      setIsSubmitting(true)
      await axiosPrivate
        .post(
          'patientSaveSymptoms',
          { Email: auth.email, Symptoms: symptom },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          console.log(res.data)
          const { Status, Message, Data } = res.data
          if (Status) {
            navigate('/virtualvisit/waitingroom', { state: Data })
          } else {
            alert(Message)
          }
        })
        .catch((err) => {
          console.error(err)
          throw err
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    } catch (error) {
      setIsSubmitting(false)
      console.error(error)
    }
  }

  return (
    <div className="page-wrapper mt-0">
      {/* <!-- Page Content--> */}
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- Page-Title --> */}
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box">
                <h4 className="page-title"></h4>
              </div>
              {/* <!--end page-title-box--> */}
            </div>
            {/* <!--end col--> */}
          </div>
          {/* <!-- end page title end breadcrumb --> */}

          <div className="row ">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h3>Tell us why you’re here</h3>

                  <textarea
                    style={{ margin: '30px 0 0 0' }}
                    className="form-control"
                    rows="5"
                    id="message"
                    placeholder="Add a reason for your virtual visit"
                    value={symptom}
                    onChange={handleTextarea}
                    maxLength="150"
                  ></textarea>
                  <div
                    className="d-flex  flex-row justify-content-start align-items-center overflow-auto"
                    style={{ height: '50px' }}
                  >
                    {[
                      'Headache',
                      'Stomachache',
                      'Cough',
                      'Skin Infection',
                      'Colds',
                    ].map((e) => (
                      <button
                        key={e}
                        type="button"
                        className="btn btn-light btn-sm mr-1 text-nowrap"
                        style={{
                          boxShadow: 'unset',
                          borderRadius: '15px',
                        }}
                        onClick={handleButtonClick.bind(this, e)}
                      >
                        {e}
                      </button>
                    ))}
                  </div>

                  {/* <p className='text-muted mb-3'>Upload your files here</p> */}
                  {/* <input type='file' id='input-file-now' className='dropify' /> */}
                  <div
                    className="wizard_btn  "
                    style={{ marginBottom: '50px' }}
                  >
                    {/* <Link to='waitingroom'> */}
                    <button
                      type="button"
                      className="mb-1 mb-md-0 btn btn-success btn-round waves-effect waves-light figmaBigButton float-left"
                      onClick={handleSubmit}
                      disabled={isSubmitting || !symptom}
                    >
                      {isSubmitting
                        ? 'Please wait...'
                        : 'Start Your Virtual Visit'}
                    </button>
                    {/* </Link> */}
                    <Link to="..">
                      <button
                        type="button"
                        className="btn btn-danger btn-round waves-effect waves-light figmaBigButton float-bottom"
                      >
                        Cancel
                      </button>
                    </Link>
                    <p style={{ marginTop: '40px' }}>
                      Enjoy our video content while you wait. It’s entertaining,
                      educational, and helps us reduce costs for you.
                    </p>
                  </div>
                  {/* <!--end of row --> */}
                </div>
                {/* <!--end card-body--> */}
              </div>
              {/* <!--end card-->                                    */}
            </div>
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <img
                    src="../assets/images/getting-consultation-of-doctor.jpg"
                    className="steps_img"
                    alt=""
                  />

                  <div className="media">
                    <div className="media-body align-self-center">
                      <h3 className="mt-0 mb-1">
                        How to get the most out of your visit
                      </h3>
                    </div>
                    {/* <!--end media-body--> */}
                  </div>
                  {/* <!--end media--> */}

                  <div className="pricingTable1 text-center">
                    <ul className="list-unstyled pricing-content-2 text-left py-3 border-0 mb-0">
                      <li>
                        Please give NIU Health permission to access your camera
                        and microphone when starting the visit
                      </li>
                      <li>Do not start a virtual visit while driving</li>
                      <li>
                        Be sure your device has a strong internet signal before
                        starting your visit
                      </li>
                      <li>Try to find a quiet location with good lighting</li>
                    </ul>
                  </div>
                  <div></div>
                </div>
                {/* <!--end card-body-->  */}
              </div>
              {/* <!--end card-->*/}
            </div>
          </div>
          {/* <!--end row--> */}
        </div>
        {/* <!-- container --> */}

        {/* <footer className="footer text-center text-sm-left">
            &copy; 2022 NU Health 
        </footer> */}
        <Footer />
        {/* <!--end footer--> */}
      </div>
      {/* <!-- end page content --> */}
    </div>
  )
}

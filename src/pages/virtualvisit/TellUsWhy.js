import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'

export default function TellUsWhy() {
  return (
    <div className='page-wrapper mt-0'>
      {/* <!-- Page Content--> */}
      <div className='page-content'>
        <div className='container-fluid'>
          {/* <!-- Page-Title --> */}
          <div className='row'>
            <div className='col-sm-12'>
              <div className='page-title-box'>
                <h4 className='page-title'></h4>
              </div>
              {/* <!--end page-title-box--> */}
            </div>
            {/* <!--end col--> */}
          </div>
          {/* <!-- end page title end breadcrumb --> */}

          <div className='row '>
            <div className='col-lg-6'>
              <div className='card'>
                <div className='card-body'>
                  <h3>Tell us why you’re here today</h3>

                  {/* <Textarea/> */}
                  <textarea
                    style={{ margin: '30px 0 20px 0' }}
                    className='form-control'
                    rows='5'
                    id='message'
                    placeholder='Add reason for your virtual visit'
                  ></textarea>
                  {/* <p className='text-muted mb-3'>Upload your files here</p> */}
                  {/* <input type='file' id='input-file-now' className='dropify' /> */}
                  <div className='wizard_btn' style={{ marginBottom: '50px' }}>
                    <Link to='waitingroom'>
                      <button
                        type='button'
                        className='btn btn-success btn-round waves-effect waves-light figmaBigButton float-left'
                      >
                        Start Your First Virtual Visit
                      </button>
                    </Link>
                    <p>
                      Enjoy our video content while you wait. It’s entertaining,
                      educational and helps us reduce costs for you
                    </p>
                  </div>
                  {/* <!--end of row --> */}
                </div>
                {/* <!--end card-body--> */}
              </div>
              {/* <!--end card-->                                    */}
            </div>
            <div className='col-lg-6'>
              <div className='card'>
                <div className='card-body'>
                  <img
                    src='../assets/images/getting-consultation-of-doctor.jpg'
                    className='steps_img'
                  />

                  <div className='media'>
                    <div className='media-body align-self-center'>
                      <h3 className='mt-0 mb-1'>
                        How to get the most out of your visit
                      </h3>
                    </div>
                    {/* <!--end media-body--> */}
                  </div>
                  {/* <!--end media--> */}

                  <div className='pricingTable1 text-center'>
                    <ul className='list-unstyled pricing-content-2 text-left py-3 border-0 mb-0'>
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
              {/* <!--end card-->                                    */}
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

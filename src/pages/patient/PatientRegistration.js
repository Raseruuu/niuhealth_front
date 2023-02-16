import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'

function PatientRegistration() {
    const navigate = useNavigate()
    async function getCountries() {
        await axiosPrivate
          .post(
            'getCountries',
            { Email: auth.email },
            {
              signal: controller.signal,
            }
          )
          .then((res) => {
            // console.log(res)
            const { Status, Data: data = [], Message } = res.data
  
            if (Status) {
              isMounted && setCountries(data)
              setCityActive(true)
            } else {
              throw new Error(Message)
            }
          })
          .catch((err) => {
            console.error(err)
          })
      }

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
          <div className="container-fluid">
    {/* <!-- end page title end breadcrumb --> */}
        <div className="row "> 
        <div className="col-lg-6">
          <div className="card">
              <div className="card-body">
              <h3>Thanks for registering  to NIU Health Social.</h3>
              <h5>We need a few more items to get started</h5>
              <div className="form-group row">
                <div className="col-md-12">
          <label htmlFor="contactnumber" className="col-form-label text-right">Phone Number</label>
          <input className="form-control" type="text" value="" id="example-text-input"/>
        </div>
    </div>
  
  
    <div className="form-group row">
        <div className="col-md-12">
            <label htmlFor="example-text-input" className="col-form-label text-right">Address</label></div>
                <div className="col-md-12">
                    <input className="form-control" type="text" value="" id="example-text-input" />
                </div>
            </div>
        <div className="form-group row">
            <div className="col-md-6">
                <label htmlFor="example-text-input" className="col-form-label text-right">Country</label>
            <select className="form-control">
                <option>Choose Country...</option>
                <option>USA</option>
                <option>South Korea</option>
                <option>Canada</option>
                <option>Thailand</option>
            </select>
        </div>
        <div className="col-md-6">
            <label htmlFor="example-text-input" className="col-form-label text-right">City</label>
                <select className="form-control">
                <option>Choose City...</option>
            </select>
            </div>
        </div>
  
    <div className="form-group row">
        <div className="col-md-12">
            <label htmlFor="example-text-input" className="col-form-label text-right">
                Subscription may cost more for patients not residing in Hawaii. <a href="">Know more</a></label>
        </div>
    </div>
      
      
  <div className="form-group row">
        <div className="col-md-6">
            <label htmlFor="example-date-input" className="">Date of Birth</label>
            <input className="form-control" type="date" value="2011-08-19" id="example-date-input" />
        </div>
    </div>		
        <div className="wizard_btn" style={{marginBottom: "50px"}}> 
            <button 
                onClick={()=>{
                    navigate('/', { replace: true })}} 
                type="button" 
                className="btn btn-success btn-round waves-effect waves-light figmaBigButton float-left postRegBtn">
                    Continue
            </button>            
        </div>

            </div>
        </div>                           
    </div>



<div className="col-lg-6">
    <div className="card">
        <div className="card-body">
            <div className="media">
                <div className="media-body align-self-center">
                    <h3 className="mt-0 mb-1">How can NIU help you?</h3>
                </div>
            

    <div className="pricingTable1 text-center">
        <ul className="list-unstyled pricing-content-2 text-left py-3 border-0 mb-0">
            <li>Unlimited access to Virtual and In-Person Visits</li>
            <li>Unlimited access to NIU Health In-Person Visits</li>
            <li>With health insurance, you get a free subscription and unlimited visits</li>
            <li>Without health insurance, you pay just $9.99 per month for unlimited visits</li>
        </ul>
    </div>
<div>
    
  </div>
                          </div>
                      </div>                            
                  </div>
          </div></div>
    </div>
        <Footer />
      </div>
    </div>
  )
}

export default PatientRegistration

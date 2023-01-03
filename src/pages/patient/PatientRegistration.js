import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'

function PatientRegistration() {

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
          <div class="container-fluid">
    {/* <!-- end page title end breadcrumb --> */}
        <div class="row "> 
        <div class="col-lg-6">
          <div class="card">
              <div class="card-body">
              <h3>Thanks for registering  to NIU Health Social.</h3>
              <h5>We need a few more items to get started</h5>
              <div class="form-group row">
                <div class="col-md-12">
          <label for="example-text-input" class="col-form-label text-right">Phone Number</label>
          <input class="form-control" type="text" value="" id="example-text-input"/>
        </div>
                            </div>
  
  
  <div class="form-group row">
                                <div class="col-md-12">
        <label for="example-text-input" class="col-form-label text-right">Address</label></div>
                                <div class="col-md-12">
                                    <input class="form-control" type="text" value="" id="example-text-input" />
                                </div>
                            </div>
      <div class="form-group row">
                                <div class="col-md-6">
          <label for="example-text-input" class="col-form-label text-right">Country</label>
          <select class="form-control">
                                                        <option>Choose Country...</option>
                                                        <option>USA</option>
                                                        <option>South Korea</option>
                                                        <option>Canada</option>
                                                        <option>Thailand</option>
                                                    </select>
        </div>
                                <div class="col-md-6">
          <label for="example-text-input" class="col-form-label text-right">City</label>
                                    <select class="form-control">
                                                        <option>Choose City...</option>
                                                    </select>
                                </div>
                            </div>
  
    <div class="form-group row">
                                <div class="col-md-12">
          <label for="example-text-input" class="col-form-label text-right">
Subscription may cost more for patients not residing in Hawaii. <a href="">Know more</a></label>
        </div>
    </div>
      
      
  <div class="form-group row">
        <div class="col-md-6">
            <label for="example-date-input" class="">Date of Birth</label>
            <input class="form-control" type="date" value="2011-08-19" id="example-date-input" />
        </div>
    </div>		
      
  
  
  
  
  <div class="wizard_btn" style={{marginBottom: "50px"}}> 
    
      <a href="welcome-step2.html"><button type="button" class="btn btn-success btn-round waves-effect waves-light figmaBigButton float-left postRegBtn">Continue</button>
      </a>
  </div>

                </div>
            </div>                           
        </div>



<div class="col-lg-6">
            <div class="card">
                <div class="card-body">

    
  
                    <div class="media">
                                      
                        <div class="media-body align-self-center">
                            <h3 class="mt-0 mb-1">How can NIU help you?</h3>
                           
                        </div>
                   

  <div class="pricingTable1 text-center">
                        
                       
                        <ul class="list-unstyled pricing-content-2 text-left py-3 border-0 mb-0">
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
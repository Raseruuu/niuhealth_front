import { useNavigate } from 'react-router-dom'
import Calendar from '../../components/provider/calendar/Calendar'

function Visits() {
  const navigate = useNavigate()

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='page-title-box'>
            {/* <div className='float-right'>
              <ol className='breadcrumb'>
                <button
                  type='button'
                  className='btn btn-success waves-effect waves-light'
                  id='create-visit'
                  // onclick='openModal()'
                  onClick={() =>
                    navigate('/virtualvisit/room', {
                      state: { MeetingID: 4737080721 },
                    })
                  }
                >
                  New Visit
                </button>
              </ol>
            </div> */}
            <h4 className='page-title'>Visits</h4>
          </div>
        </div>
      </div>

      {/* <!-- Calendar --> */}
      <div className='row'>
        <div className='col-lg-3'>
          <div className='card'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-lg-12'>
                  <div className='p-3'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='2022-11-04'
                      id='mdate'
                    />
                  </div>
                  <div className='p-3'>
                    <div className='custom-control custom-switch switch-success'>
                      <input
                        type='checkbox'
                        className='custom-control-input'
                        id='customSwitchSuccess'
                        checked
                      />
                      <label
                        className='custom-control-label'
                        htmlFor='customSwitchSuccess'
                      >
                        Accept Instant Visits
                      </label>
                    </div>
                  </div>
                </div>

                <div className='col-lg-12'>
                  <div className='p-3'>
                    <div className='checkbox checkbox-success '>
                      <h6 className='mb-3 mt-0'>Filter</h6>
                      <input id='checkbox0' type='checkbox' checked />
                      <label htmlFor='checkbox0'>
                        <i className='dripicons-camcorder'></i> Virtual Visits
                      </label>
                    </div>
                    <div className='checkbox checkbox-success '>
                      <input id='checkbox1' type='checkbox' checked />
                      <label htmlFor='checkbox1'>
                        <i className=' dripicons-user'></i> In-Person Visits
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* 
              <div className='row'>
                <div className='col-lg-12'>
                  <div className='p-3'>
                    <h6 className='mb-3 mt-0'>Age Range</h6>
                    <input type='text' id='range_04' />
                  </div>
                </div>
              </div> */}

              <div className='row'>
                <div className='col-lg-12'>
                  <div className='p-3'>
                    <h6 className='mb-3 mt-0'>Booking Status</h6>
                    <div className='checkbox checkbox-success '>
                      <input id='checkbox0' type='checkbox' checked />
                      <label htmlFor='checkbox0'>Confirmed</label>
                    </div>
                    <div className='checkbox checkbox-success '>
                      <input id='checkbox1' type='checkbox' checked />
                      <label htmlFor='checkbox1'>Pending</label>
                    </div>
                    <div className='checkbox checkbox-success '>
                      <input id='checkbox2' type='checkbox' />
                      <label htmlFor='checkbox2'>Rejected</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-lg-12'>
                  <div className='p-3'>
                    <h6 className='mb-3 mt-0'>My Clinics</h6>
                    <div className='checkbox checkbox-success '>
                      <input id='checkbox0' type='checkbox' />
                      <label htmlFor='checkbox0'>BLK Hospital</label>
                    </div>
                    <div className='checkbox checkbox-success '>
                      <input id='checkbox1' type='checkbox' />
                      <label htmlFor='checkbox1'>Linda's Clinic</label>
                    </div>
                    <div className='checkbox checkbox-success '>
                      <input id='checkbox2' type='checkbox' />
                      <label htmlFor='checkbox2'>Sony Center Clinic</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-9'>
          <div className='card'>
            <div className='card-body'>
              <Calendar allowCall={true} />
              <div style={{ clear: 'both' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Visits

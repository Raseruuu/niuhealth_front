function Clinics() {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='page-title-box'>
            <div className='float-right'>
              <ol className='breadcrumb'>
                <button
                  type='button'
                  className='btn btn-success waves-effect waves-light'
                >
                  New Clinic Schedule
                </button>
              </ol>
            </div>
            <h4 className='page-title'>Clinics</h4>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='table-responsive'>
                <table className='table'>
                  <thead className='thead-light'>
                    <tr>
                      <th>Clinic</th>
                      <th>Address</th>
                      <th>Services</th>
                      <th>Working Hours</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>
                        <img
                          src='../assets/images/users/user-10.jpg'
                          alt=''
                          className='thumb-sm rounded-circle mr-2'
                        />
                        Sese Dental Clinic
                      </td>
                      <td>123 Somewhere St. Somewhere Rd, Sample City</td>
                      <td>Service 1, Service 2, Service 3</td>
                      <td>6:00 AM - 6:00 PM</td>

                      <td>
                        <a href='#' className='mr-2'>
                          <i className='fas fa-edit text-info font-16'></i>
                        </a>
                        <a href='#'>
                          <i className='fas fa-trash-alt text-danger font-16'></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a>
                          <img
                            src='../assets/images/users/user-9.jpg'
                            alt=''
                            className='thumb-sm rounded-circle mr-2'
                          />
                          Ace Diagnostics Center
                        </a>
                      </td>
                      <td>123 Somewhere St. Somewhere Rd, Sample City</td>
                      <td>Service 1, Service 2, Service 3</td>
                      <td>6:00 AM - 6:00 PM</td>
                      <td>
                        <a href='#' className='mr-2'>
                          <i className='fas fa-edit text-info font-16'></i>
                        </a>
                        <a href='#'>
                          <i className='fas fa-trash-alt text-danger font-16'></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a>
                          <img
                            src='../assets/images/users/user-8.jpg'
                            alt=''
                            className='thumb-sm rounded-circle mr-2'
                          />
                          The Mayo Clinic
                        </a>
                      </td>
                      <td>123 Somewhere St. Somewhere Rd, Sample City</td>
                      <td>Service 1, Service 2, Service 3</td>
                      <td>6:00 AM - 6:00 PM</td>
                      <td>
                        <a href='#' className='mr-2'>
                          <i className='fas fa-edit text-info font-16'></i>
                        </a>
                        <a href='#'>
                          <i className='fas fa-trash-alt text-danger font-16'></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Clinics

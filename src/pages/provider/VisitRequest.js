function VisitRequest() {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='page-title-box'>
            <h4 className='page-title'>Visit Requests</h4>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='table-responsive browser_users'>
                <table className='table mb-0'>
                  <thead className='thead-light'>
                    <tr>
                      <th className='border-top-0'>ID</th>
                      <th className='border-top-0'>Patient</th>

                      <th className='border-top-0'>Request Date</th>
                      <th className='border-top-0'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>382314</td>
                      <td>
                        <div className='media'>
                          <a href='../pages/visit-request-profile.html'>
                            <img
                              src='../assets/images/users/user-1.png'
                              alt=''
                              className='thumb-sm rounded-circle mr-2'
                            />
                          </a>
                          <div className='media-body align-self-center text-truncate'>
                            <h6 className='mt-0 mb-1 text-dark'>
                              <a href='../pages/visit-request-profile.html'>
                                Donald Gardner
                              </a>{" "}
                              <span className='badge badge-md badge-soft-danger'>
                                Not Insured
                              </span>
                            </h6>
                            <p className='text-muted mb-0'>
                              Virtual visit on 15 August
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>03 Aug 2022 12:33</td>
                      <td>
                        {" "}
                        <button
                          type='button'
                          className='btn btn-outline-success waves-effect waves-light'
                          onclick="approveVisit('Donald');"
                        >
                          Approve
                        </button>{" "}
                        <button
                          type='button'
                          className='btn btn-outline-danger waves-effect waves-light'
                          onclick="cancelVisit('Donald');"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>504152</td>
                      <td>
                        <div className='media'>
                          <a href='../pages/visit-request-profile.html'>
                            <div className='avatar-box thumb-sm align-self-center mr-2'>
                              <span className='avatar-title bg-soft-pink rounded-circle'>
                                NS
                              </span>
                            </div>
                          </a>
                          <div className='media-body align-self-center text-truncate'>
                            <h6 className='mt-0 mb-1 text-dark'>
                              <a href='../pages/visit-request-profile.html'>
                                Nicholas Smith
                              </a>{" "}
                              <span className='badge badge-md badge-soft-success'>
                                Insured
                              </span>
                            </h6>
                            <p className='text-muted mb-0'>
                              Virtual visit on 15 August
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>03 Aug 2022 12:33</td>
                      <td>
                        <button
                          type='button'
                          className='btn btn-outline-success waves-effect waves-light'
                          onclick="approveVisit('Nicholas');"
                        >
                          Approve
                        </button>{" "}
                        <button
                          type='button'
                          className='btn btn-outline-danger waves-effect waves-light'
                          onclick="cancelVisit('Nicholas');"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>240879</td>
                      <td>
                        <div className='media'>
                          <a href='../pages/visit-request-profile.html'>
                            <img
                              src='../assets/images/users/user-4.jpg'
                              alt=''
                              className='thumb-sm rounded-circle mr-2'
                            />
                          </a>
                          <div className='media-body align-self-center text-truncate'>
                            <h6 className='mt-0 mb-1 text-dark'>
                              <a href='../pages/visit-request-profile.html'>
                                Paula Anderson
                              </a>{" "}
                              <span className='badge badge-md badge-soft-success'>
                                Insured
                              </span>
                            </h6>
                            <p className='text-muted mb-0'>
                              Virtual visit on 15 August
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>03 Aug 2022 12:33</td>
                      <td>
                        <button
                          type='button'
                          className='btn btn-outline-success waves-effect waves-light'
                          onclick="approveVisit('Paula');"
                        >
                          Approve
                        </button>{" "}
                        <button
                          type='button'
                          className='btn btn-outline-danger waves-effect waves-light'
                          onclick="cancelVisit('Paula');"
                        >
                          Cancel
                        </button>
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

export default VisitRequest

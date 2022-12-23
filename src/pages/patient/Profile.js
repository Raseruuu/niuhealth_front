function ProfileEdit() {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="page-title-box">
                  <h4 className="page-title">Profile</h4>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div className="form-group row">
                          <label
                            for="example-text-input"
                            className="col-sm-2 col-form-label text-right"
                          >
                            Text
                          </label>
                          <div className="col-sm-10">
                            <input
                              className="form-control"
                              type="text"
                              value="Johnny French"
                              id="example-text-input"
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            for="example-email-input"
                            className="col-sm-2 col-form-label text-right"
                          >
                            Email
                          </label>
                          <div className="col-sm-10">
                            <input
                              className="form-control"
                              type="email"
                              value="sample@example.com"
                              id="example-email-input"
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            for="example-tel-input"
                            className="col-sm-2 col-form-label text-right"
                          >
                            Telephone
                          </label>
                          <div className="col-sm-10">
                            <input
                              className="form-control"
                              type="tel"
                              value="1-(555)-555-5555"
                              id="example-tel-input"
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            for="example-password-input"
                            className="col-sm-2 col-form-label text-right"
                          >
                            Password
                          </label>
                          <div className="col-sm-4">
                            <input
                              className="form-control"
                              type="password"
                              value="hunter2"
                              id="example-password-input"
                            />
                          </div>
                          <label
                            for="example-password-input"
                            className="col-sm-2 col-form-label text-right"
                          >
                            Re-Password
                          </label>
                          <div className="col-sm-4">
                            <input
                              className="form-control"
                              type="password"
                              value="hunter2"
                              id="example-password-input2"
                            />
                          </div>
                        </div>
  
                        <div className="form-group row">
                          <label
                            for="example-text-input2"
                            className="col-sm-2 col-form-label text-right"
                          >
                            Address
                          </label>
                          <div className="col-sm-10">
                            <input
                              className="form-control"
                              type="text"
                              value=""
                              id="example-text-input2"
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label text-right">
                            Country
                          </label>
                          <div className="col-sm-4">
                            <select className="form-control">
                              <option>Select</option>
                              <option>Large select</option>
                              <option>Small select</option>
                            </select>
                          </div>
                          <label className="col-sm-2 col-form-label text-right">
                            City
                          </label>
                          <div className="col-sm-4">
                            <select className="form-control">
                              <option>Select</option>
                              <option>Large select</option>
                              <option>Small select</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            for="example-date-input"
                            className="col-sm-2 col-form-label text-right"
                          >
                            Date of Birth
                          </label>
                          <div className="col-sm-10">
                            <input
                              className="form-control"
                              type="date"
                              value="2011-08-19"
                              id="example-date-input"
                            />
                          </div>
                        </div>
  
                        <button
                          type="button"
                          className="btn btn-success btn-round waves-effect waves-light"
                        >
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default ProfileEdit
  
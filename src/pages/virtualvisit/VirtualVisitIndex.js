import { useNavigate } from "react-router-dom"
import Footer from "../../components/Footer"

export default function VirtualVisitIndex() {
  const navigate = useNavigate()

  return (
    <div className='figma'>
      <div className='page-wrapper'>
        <div className='page-content'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-sm-12'>
                <div className='page-title-box'>
                  <h4 className='page-title'></h4>
                </div>
              </div>
            </div>

            <div className='row '>
              <div className='col-lg-6'>
                <iframe
                  width='100%'
                  height='500'
                  src='https://www.youtube.com/embed/oVAJZMVpL_g'
                  title='YouTube video player'
                  frameborder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowfullscreen
                ></iframe>
              </div>

              <div className='col-lg-6'>
                <div className='card'>
                  <div className='card-body'>
                    <h2 style={{ paddingTop: "30px" }}>
                      Thanks for your patience.
                      <br />
                      Your provider will soon be with you.
                    </h2>

                    <div className='steps_title_sub_text'>
                      Keep this window open and active to hold your place in
                      line. Video content is how we keep your healthcare costs
                      low
                    </div>

                    <div className='steps_info_text'>
                      {/* <i className='dripicons-user-group green_h'></i> There are{" "}
                      <span className='green_h'>12</span> patients ahead of you */}
                    </div>
                    <div className='steps_info_text'>
                      {/* <i className='mdi mdi-av-timer green_h'></i> Estimated
                      waiting time is <span className='green_h'>5:20</span> mins */}
                    </div>

                    <div
                      className='wizard_btn'
                      style={{ margin: "50px 0", paddingBottom: "50px" }}
                    >
                      <button
                        type='button'
                        className='btn btn-success btn-round waves-effect waves-light figmaBigButton float-left'
                        onClick={() => navigate("room")}
                      >
                        Join Virtual Visit Now
                      </button>

                      <button
                        onClick={() => navigate(-1)}
                        type='button'
                        className='btn btn-outline-danger btn-round waves-effect waves-light figmaBigButton float-right'
                      >
                        Cancel Visit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  )
}

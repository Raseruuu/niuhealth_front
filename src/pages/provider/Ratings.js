import { useEffect, useState } from 'react'
import { AWS_BUCKET } from '../../constants'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

function TitleBox({text}){
  return(
    <div className='row'>
      <div className='col-sm-12'>
        <div className='page-title-box'>
          <h4 className='page-title'>{text}</h4>
        </div>
      </div>
    </div>
  )
}
function RatingsItem({patientName,service_name,service_description,patientEmail,rating}){
  return(
    <div className='col-lg-4'>
      <div className='card'>
        <div className='card-body'>
          <div className='media'>
            <a className='' href='#'>
              <img
                src='../assets/images/users/user-1.jpg'
                alt='user'
                className='rounded-circle thumb-md'
              />
            </a>
            <div className='media-body align-self-center ml-3'>
              <p className='font-14 font-weight-bold mb-0'>
                {/* John Tamez */}
                {patientName}
              </p>
              <p className='mb-0 font-12 text-muted'>
                {patientEmail}
              </p>
              <p className='mb-0 font-14 '>
                {service_name}
                
                {service_description}
              </p>
              <ul className='list-inline mb-2 product-review ratingsPage'>
                <RatingsStars score={rating} size={14}/>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
function RatingsStars({score,size=24,children}){
  const score_float=parseFloat(score)
  let scorestars=[]
  for (var i=0; i<(score_float-score_float%1); i++) (scorestars.push(1))
  if (score_float%1>0){scorestars.push(0.5)}
  for (var i=5; (score_float+(1))<=i; i--) (scorestars.push(0))
  const starswitch={
    1:"mdi-star text-warning",
    0.5:"mdi-star-half text-warning",
    0:"mdi-star light-gray"
  }
  return(
    <ul className='list-inline mb-0 product-review'><>
    {(size<24)?(
      <>{score}</>):<></>}
      {scorestars.map((star)=>(
            <li className='list-inline-item mr-0'>
              <i className={`mdi `+ starswitch[star] +` font-`+size}></i>
            </li>
        )
      )}
      {children}
      </>
    </ul>
  )
}
function RatingsBoxOverall({score,totalReviews,size=24}){
  return(
    <div className='p-4 bg-light text-center align-item-center'>
    <h1 className='font-weight-semibold'>{score}</h1>
    <h4 className='header-title'>Overall Rating</h4>
    <RatingsStars score={score} size={24}>
      <li className='list-inline-item'>
        <small className='text-muted'>Total Reviews ({totalReviews})</small>
      </li>
    </RatingsStars>
  </div>
  )
}

function RatingBar({ total, count,starscore}){

  return(
    <li className='mb-2'>
      <span className='text-dark'>{starscore} Star</span>
      <small className='float-right text-muted ml-3 font-14'>
        {count}
      </small>
      <div className='progress mt-2' style={{ height: '5px' }}>
        <div
          className='progress-bar bg-secondary'
          role='progressbar'
          style={{ width: (count/total)*100+'%', borderRadius: '5px' }}
          aria-valuenow={(count/total)*100}
          aria-valuemin='0'
          aria-valuemax='100'
          
        ></div>
      </div>
    </li>
  )
}
function RatingsChart({ratinglist}){
  return(
    <ul className='list-unstyled mt-3'>
      <RatingBar total={ratinglist.length} count={ratinglist.filter(item => item === 5).length} starscore={5}/>
      <RatingBar total={ratinglist.length} count={ratinglist.filter(item => item >= 4 && item< 5).length} starscore={4}/>
      <RatingBar total={ratinglist.length} count={ratinglist.filter(item => item >= 3 && item< 4).length} starscore={3}/>
      <RatingBar total={ratinglist.length} count={ratinglist.filter(item => item >= 2 && item< 3).length} starscore={2}/>
      <RatingBar total={ratinglist.length} count={ratinglist.filter(item => item >= 1 && item< 2).length} starscore={1}/>
    </ul>
  )
}
function RatingsFilter(){
  return(
      
    <div className='card'>
    <div className='card-body'>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='p-3'>
            <h6 className='mt-0 mb-4'>Filter</h6>
            <div className='checkbox checkbox-success'>
              <input id='checkbox3' type='checkbox' />
              <label for='checkbox3'>
                {' '}
                5<i className='mdi mdi-star text-warning'></i>
                <i className='mdi mdi-star text-warning'></i>
                <i className='mdi mdi-star text-warning'></i>
                <i className='mdi mdi-star text-warning'></i>
                <i className='mdi mdi-star text-warning'></i>
              </label>
            </div>
            <div className='checkbox checkbox-success'>
              <input id='checkbox4' type='checkbox' />
              <label for='checkbox4'>
                {' '}
                4<i className='mdi mdi-star text-warning'></i>
                <i className='mdi mdi-star text-warning'></i>
                <i className='mdi mdi-star text-warning'></i>
                <i className='mdi mdi-star text-warning'></i>
                <i className='mdi mdi-star light-gray'></i>
              </label>
            </div>
            <div className='checkbox checkbox-success'>
              <input id='checkbox5' type='checkbox' />
              <label for='checkbox5'>
                {' '}
                3<i className='mdi mdi-star text-warning'></i>
                <i className='mdi mdi-star text-warning'></i>
                <i className='mdi mdi-star text-warning'></i>
                <i className='mdi mdi-star light-gray'></i>
                <i className='mdi mdi-star light-gray'></i>
              </label>
            </div>
            <div className='checkbox checkbox-success'>
              <input id='checkbox6' type='checkbox' />
              <label for='checkbox6'>
                {' '}
                2<i className='mdi mdi-star text-warning'></i>
                <i className='mdi mdi-star text-warning'></i>
                <i className='mdi mdi-star light-gray'></i>
                <i className='mdi mdi-star light-gray'></i>
                <i className='mdi mdi-star light-gray'></i>
              </label>
            </div>
            <div className='checkbox checkbox-success'>
              <input id='checkbox7' type='checkbox' />
              <label for='checkbox7'>
                {' '}
                1<i className='mdi mdi-star text-warning'></i>
                <i className='mdi mdi-star light-gray'></i>
                <i className='mdi mdi-star light-gray'></i>
                <i className='mdi mdi-star light-gray'></i>
                <i className='mdi mdi-star light-gray'></i>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-12'>
          <div className='p-3'>
            <div className='checkbox checkbox-success '>
              <input id='checkbox0' type='checkbox' checked />
              <label for='checkbox0'>
                <i className='dripicons-camcorder'></i> Virtual Visits
              </label>
            </div>
            <div className='checkbox checkbox-success '>
              <input id='checkbox1' type='checkbox' checked />
              <label for='checkbox1'>
                <i className=' dripicons-user'></i> In-Person Visits
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='row'>
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
            <h6 className='mb-3 mt-0'>My Clinics</h6>
            <div className='checkbox checkbox-success '>
              <input id='checkbox0' type='checkbox' checked />
              <label for='checkbox0'>BLK Hospital</label>
            </div>
            <div className='checkbox checkbox-success '>
              <input id='checkbox1' type='checkbox' checked />
              <label for='checkbox1'>Linda's Clinic</label>
            </div>
            <div className='checkbox checkbox-success '>
              <input id='checkbox2' type='checkbox' />
              <label for='checkbox2'>Sony Center Clinic</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
function Ratings({}) {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [list, setList] = useState([])
  const [ratingList, setRatingList] = useState([])
  const [patientRatingList,setPatientRatingList]=useState([])
  const [errMsg, setErrMsg] = useState(null)
 
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function getList() {
      await axiosPrivate
        .post(
          'getProviderRatings',
          { Email: auth.email },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          console.log(res)
          const { Status, Message } = res.data
          
          if (Status) {
            setList(res.data.Data)
            console.log(res.data.Data.Ratings.map(({ rating }) => (parseFloat(rating))))
            setRatingList(res.data.Data.Ratings.map(({ rating }) => (parseFloat(rating))))
            setPatientRatingList(res.data.Data.Ratings)
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
          setErrMsg(err.message)
        })
    }

    isMounted && getList()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <div className='container-fluid'>
      <TitleBox text="Ratings"/>
      <div className='row'>
        <div className='col-lg-3'>
          <div className='card'>
            <div className='card-body'>
              <RatingsBoxOverall score={list.Average} totalReviews={ratingList.length} size={24} />
              <RatingsChart ratinglist={ratingList}/>
              <div className=''>
                {/* <span className='text-right ml-auto d-inline-block'>
                  <i className='far fa-smile font-24 text-warning'></i>
                </span> */}
                <i className={`mdi mdi-star text-warning font-24`}></i>
                <h3 className='d-inline-block mr-2 mb-1 mb-lg-0'>{list.TotalRatings}</h3>
                <h4 className='header-title d-inline-block mr-2 mb-1 mb-lg-0'>
                  Total Stars
                </h4>
                
              </div>
            </div>
          </div>
          <RatingsFilter/>
        </div>
        <div className='col-lg-9'>
          <div className='card'>
            <div className='card-body'>
              <div className='row'>
              {patientRatingList.map((item,index)=>
                  (<RatingsItem patientName={item.full_name} service_name={item.service_name} service_description={item.service_description} patientEmail={item.email} rating={item.  rating}/>)
                
                )}
               </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ratings

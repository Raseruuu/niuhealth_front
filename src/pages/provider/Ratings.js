import { useEffect, useState } from 'react'
import { AWS_BUCKET ,AWS_BUCKET_PROFILES} from '../../constants'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import Swal from 'sweetalert2'

import { Link, useNavigate } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import CardItem, { CardLongItem } from '../../components/cards/Card'


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
function reviewFormat(string){

  if (string.length>120){
    return string.substring(0,120)+"..."}
  return string
}
function showReview({patientPicture,patientName,patientEmail,rating,service_name,service_description,review}){
  Swal.fire({
    title: `Patient's Review`,
    customClass: 'swal-wide',
    html: 
      `
      <div class='col'>
        <div class='col'>
            <div class='col'>
              <img 
                class='rounded-circle'
                height="100px"
                src="${(AWS_BUCKET_PROFILES)+(patientPicture)}"
                style={
                  width: 60px;
                  height: 60px;
                  object-fit: cover;}
                >  
              </img>
            </div>
            <div class='col' >
              <p class='font-22 font-weight-bold responsive mb-0'}>${patientName} </p>
              <p className='mb-0 font-12 text-muted responsive'>${patientEmail}</p>
              Review For:
              <b>${service_name}</b><br>
              <i>${service_description}</i>
              <br>
            </div>
    
        </div>
        <div class='col-xl-12 bg-light mt-4'>
          
          <div class='col'>
                <i class='mdi mdi-star text-warning'></i>
                ${rating} Stars
              </div> 
          <p class='mb-0 font-18 text-dark'>"${review}"</p> <br>
        </div>
      </div>
      `
  })
}

function RatingsItem({setRefreshList,refreshList,patientPicture,patientName,service_name,service_description,patientEmail,rating_id,rating,review="It was certainly one of the consultations of all time."}){
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  async function handleDeleteReview(ratingID){
    await axiosPrivate
      .post(
        "providerDeleteRating",
        {Email:auth.email, RatingID:ratingID})
      .then((res) => {
        console.log('res',res.data)
        const {Status,Message}=res.data
        if (Status){
          Swal.fire({icon:'info',html:`This Review has been deleted.`}).then(()=>{setRefreshList(!refreshList)
          })
          
          return
        }
        else {
          Swal.fire({ icon: 'error',html:`${Message}`})
          throw new Error(Message);
        }

    })
    .catch((error) => {
      console.error(error)
    })
  }
  
  return(
    <div className='col-lg-12'>
      <div className='card' >
        <div className='card-body col'>
        <div className='media col' >
            <div className="row-md-4">
            <div className='row'>
              <img
                // src='../assets/images/users/user-1.jpg'
                src={(AWS_BUCKET_PROFILES)+(patientPicture)}
                alt='user'
                className='rounded-circle thumb-md'
                style={{width:60,height:60, objectFit:'cover'}}
              />
             <div className='row m-2'>
                <div className='col'>
                  <p className='font-14 font-weight-bold mb-0 responsive'>
                    {patientName}
                  </p>
                  <p className='mb-0 font-12 text-muted responsive'>
                    {patientEmail}
                  </p>
                </div>
              
              </div>
              </div>
            <div className='media-body align-self-center ml-3 mw-100' style={{marginLeft: '20px'}}>

              
              <div className='p-1 ml-8 '>
                <h6 className='mb-0 font-14 responsive'>
                  
                  Review For:
                 <div className='m-2'> { service_name  }<br/>  
                  {service_description==='For'?"":service_description} <br/>
                  </div>
                </h6>
                
                <ul className='list-inline m-2 p-1 col-xl-12 product-review ratingsPage'>
                  {/* <RatingsStars score={rating} size={14}/> */}
                  <div className='row'>
                  <div className='m-1 mr-4'><b>{rating} Stars</b> </div>
                  <Rating
                    fillColor="#ffb822"
                    emptyColor="white"
                    SVGstrokeColor="#f1a545"
                    SVGstorkeWidth={1}
                    size={18}
                    allowFraction={true}
                    initialValue={rating}
                    readonly={true}
                  />
                  </div>
                  {(review)?
                (<p size={14}>
                  "{(reviewFormat(review))}"

                </p>):null}
                </ul>
              
                </div>
              </div>
            </div>
            
            </div>
            <div className='row-lg-4 float-right'>
                <button 
                  onClick={()=>
                    showReview(
                      {patientPicture,
                      patientName,
                      patientEmail,
                      rating,
                      service_name,
                      service_description,
                      review})
                  }
                  className='btn btn-outline-success waves btn-round m-1' style={{zIndex:3,fontSize:12}}>Open Review
                </button>
                <button 
                  onClick={()=>{
                    Swal.fire({
                      html:`Are you sure you want to Delete this Review?`,
                      showCancelButton:true
                    }).then((response)=>{
                      if (response.isConfirmed){
                        handleDeleteReview(rating_id);
                      }
                      else{
                        return
                      }
                    }) 
                  }}
                  className='btn btn-outline-danger waves btn-round m-1' style={{zIndex:3,fontSize:12}}>Delete Review
                  
                </button>
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
      <Rating
            fillColor="#ffb822"
            emptyColor="white"
            SVGstrokeColor="#f1a545"
            SVGstorkeWidth={1}
            size={size}
            allowFraction={true}
            initialValue={score}
            readonly={true}
          />
      {/* {scorestars.map((star)=>( */}
          {/* <li className='list-inline-item mr-0'>
            <i className={`mdi `+ starswitch[star] +` font-`+size}></i>
          </li> */}
            
        {/* )
      )} */}
      {/* {(size<24)?(
      <div style={{marginLeft:'5px'}}>({score})</div>):<></>} */}
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
      <RatingBar total={ratinglist.length} count={ratinglist.filter(item => parseInt(item) === 5).length} starscore={5}/>
      <RatingBar total={ratinglist.length} count={ratinglist.filter(item => parseInt(item) >= 4 && item< 5).length} starscore={4}/>
      <RatingBar total={ratinglist.length} count={ratinglist.filter(item => parseInt(item) >= 3 && item< 4).length} starscore={3}/>
      <RatingBar total={ratinglist.length} count={ratinglist.filter(item => parseInt(item) >= 2 && item< 3).length} starscore={2}/>
      <RatingBar total={ratinglist.length} count={ratinglist.filter(item => parseInt(item) >= 1 && item< 2).length} starscore={1}/>
    </ul>
  )
}

function RatingsFilter({
  starFilter,
  setStarFilter,
  ratingListOriginal, 
  generalRatingListOriginal, 
  setPatientRatingList, 
  setPatientGeneralRatingList}){
 
  // function handleFiltercheckbox(filtervalue){
  //   console.log(filtervalue)
  //   setFilters([...filters,filtervalue])
  // }
  return(
      
    <div className='card'>
    <div className='card-body'>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='p-3'>
            <h6 className='mt-0 mb-4'>Filter</h6>
            {[5,4,3,2,1].map((val,index) => (
                <div key={val} className="checkbox checkbox-success">
                  <input 
                    id={`checkboxa${val}`}
                    type="checkbox" 
                    defaultChecked={starFilter[index]===val}
                    onChange={
                      (e)=>{
                          
                          var newstarfilter=starFilter
                          var checked=false
                          if (newstarfilter[index]===parseInt(val)){
                            
                            newstarfilter[index]=false
                          }
                          else {
                            newstarfilter[index]=parseInt(val)
                            checked=true
                          }
                          console.log(newstarfilter)
                          setStarFilter(newstarfilter)
                          setPatientRatingList(ratingListOriginal
                            .filter((item)=>{
                                console.log("bru",ratingListOriginal)
                                console.log(item)
                                return(
                                  newstarfilter.includes(parseInt(item.rating))
                                  )
                              }))
                          setPatientGeneralRatingList(generalRatingListOriginal
                            .filter((item)=>{
                                console.log("bruh",generalRatingListOriginal)
                                return(
                                  newstarfilter.includes(parseInt(item.rating))
                                  )
                              }))
                      }}
                      />
                  <label htmlFor={`checkboxa${val}`}>
                    {(val===0)?"Unrated":val}
                    {Array.apply(null, { length: val }).map(
                      (e, i) => (
                        <i key={i} className="mdi mdi-star text-warning"></i>
                      )
                    )}
                  </label>
                </div>
              ))}
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
  const [totalRatings, setTotalRatings] = useState([])
  const [patientRatingList,setPatientRatingList]=useState([])
  const [starFilter, setStarFilter]=useState([5,4,3,2,1,0])
  const [ratingListOriginal, setRatingListOriginal] = useState([])

  const [generalRatingListOriginal, setGeneralRatingListOriginal] = useState([])
  const [patientGeneralRatingList,setPatientGeneralRatingList]=useState([])
  const [errMsg, setErrMsg] = useState(null)
  const [refreshList,setRefreshList]=useState(false)
  const [filters,setFilters]=useState([])
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
            setRatingListOriginal(res.data.Data.Ratings)
            setRatingList(res.data.Data.Ratings)
            console.log("totalRatings",[...res.data.Data.Ratings,...res.data.Data.GeneralVisitRatings])
            setTotalRatings([...res.data.Data.Ratings,...res.data.Data.GeneralVisitRatings].map((item)=>{return item.rating}))
            // console.log([...res.data.Data.Ratings,res.data.Data.GeneralVisitRatings].map((item)=>{return item.rating}))
            setPatientRatingList(res.data.Data.Ratings)
            setPatientGeneralRatingList(res.data.Data.GeneralVisitRatings)
            setGeneralRatingListOriginal(res.data.Data.GeneralVisitRatings)
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
  }, [refreshList])

  return (
    <div className='container-fluid'>
      <TitleBox text="Ratings"/>
      <div className='row'>
        <div className=''>
          <h4 className='header-title mt-0 mb-4'>
            Overview
          </h4>
          <div className='card m-2 ml-4'>
            <div className='card-body'>
              <RatingsBoxOverall score={list?.Average} totalReviews={totalRatings.length} size={24} />
              <RatingsChart ratinglist={totalRatings}/>
              <div className=''>
                {/* <span className='text-right ml-auto d-inline-block'>
                  <i className='far fa-smile font-24 text-warning'></i>
                </span> */}
                {/* <i className={`mdi mdi-star text-warning font-24`}></i> */}
                {/* <h3 className='d-inline-block mr-2 mb-1 mb-lg-0'>{list.TotalRatings}</h3>
                <h4 className='header-title d-inline-block mr-2 mb-1 mb-lg-0'>
                  Total Stars
                </h4> */}
                
              </div>
            </div>
          </div>
          <div className='m-2 ml-4'>
          <RatingsFilter 
            starFilter={starFilter} 
            setList={setList} 
            // listOriginal={listOriginal} 
            setPatientRatingList={setPatientRatingList}
            setPatientGeneralRatingList ={setPatientGeneralRatingList}
            
            ratingListOriginal={ratingListOriginal} 
            generalRatingListOriginal={generalRatingListOriginal} 
            setStarFilter={setStarFilter} 
            filters={filters} 
            setFilters={setFilters}/>
            </div>
        </div>
        <div className='col'>
          <div className='row'>
            <div className='col'>
                  <h4 className='header-title mt-0 mb-4'>
                    Appointment Reviews
                  </h4>
                  {((patientRatingList?.length===0))?
                  (<div className='col-lg-12' style={{minWidth:"450px"}}>
                  <div className='card'>
                  <div className='card-body'>
                    <h4>There are no reviews to display.</h4></div></div></div>):
                  ([patientRatingList].length>0)?
                  
                    (<div className='col-lg-12' style={{minWidth:"450px"}}>
                      <div className='card'>
                        <div className='card-body'>
                          <div className='row'>
                          {patientRatingList.map((item,index)=>
                              (<RatingsItem key={index} patientPicture={item.picture} patientName={item.full_name} service_name={item.service_name} service_description={item.service_description} patientEmail={item.email} rating_id={item.rating_id} rating={item.rating} review={item.review}/>)
                            
                            )}
                          </div> 
                        </div>
                      </div>
                    </div>)
              :null}
            </div>
            <div className='col'>
              <h4 className='header-title mt-0 mb-4'>
                  General Visit Reviews
                </h4>
                { (patientGeneralRatingList?.length===0)?
                (<div className='col-lg-12' style={{minWidth:"450px"}}>
                <div className='card'>
                <div className='card-body'><h4>There are no reviews to display.</h4></div></div></div>):
                (patientGeneralRatingList.length>0)?
                <div className='col-lg-12' style={{minWidth:"450px"}}>
                  <div className='card'>
                    <div className='card-body'>
                {/* <CardItem length={12}> */}
                      <div className='row'>
                      {patientGeneralRatingList.map((item,index)=>
                          (<RatingsItem setRefreshList={setRefreshList} refreshList={refreshList} key={index} patientPicture={item.picture} patientName={item.full_name} service_name={item.service_name} service_description={item.service_description} patientEmail={item.email} rating_id={item.rating_id} rating={item.rating} review={item.review}/>)
                        
                        )}
                      </div> 
                    </div>
                  </div>
                </div> 
              
              :null}
            </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Ratings

import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import Footer from '../../../components/Footer'
import { AWS_BUCKET,AWS_BUCKET_SERVICES } from '../../../constants'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

export default function Marketplace() {
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [list, setList] = useState([])
  const [listOriginal, setListOriginal] = useState([])
   const [toggleFilter, setToggleFilter] = useState(true)
  const priceRangeRef = useRef()
  const effectRun = useRef(false);
  const [starFilter, setStarFilter]=useState([5,4,3,2,1,0])
  const [searchString,setSearchString]=useState("")
  // const [starFilter1, setStarFilter1]=useState(true)
  // const [starFilter2, setStarFilter2]=useState(true)
  // const [starFilter3, setStarFilter3]=useState(true)
  // const [starFilter4, setStarFilter4]=useState(true)
  // const [starFilter5, setStarFilter5]=useState(true)
  function handleSearch(search){
    setSearchString(search)
  }
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function getList() {
      await axiosPrivate
        .get('getAllServices', {
          Search:searchString,
          signal: controller.signal,
        })
        .then((res) => {
          isMounted && setList(res.data.Data)
          setListOriginal(res.data.Data)
        })
        .catch((err) => {
          console.error(err)
          setErrMsg(err.message)
        })
    }
    // if (effectRun.current){
      getList()
    // }
    return () => {
      isMounted = false
      controller.abort()
      // effectRun.current = true;
    }
  }, [])

  useEffect(() => {
    if (priceRangeRef.current) {
      window.$('#range_doctors_rate').ionRangeSlider({
        type: 'double',
        skin: 'modern',
        grid: true,
        min: 0,
        max: 1000,
        from: 20,
        to: 200,
      })
    }
  }, [])

  return (
    <div className="figma mt-5">
      <div className="page-wrapper">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="page-title-box">
                  <h4 className="page-title">Marketplace</h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className={toggleFilter?"col-lg-3":"col-lg-2"}>
                <div className="card">
                  <div className="card-body">
                  
                    <div className="row">
                      <div className="col-lg-12">
                        <h5 onClick={()=>{setToggleFilter(!toggleFilter)}} className="mt-0 mb-4">Filters</h5>
                        <button onClick={()=>{setToggleFilter(!toggleFilter)}} className='btn btn-success btn-round waves-effect waves-light'>
                          <i   className='dripicons-arrow-down
                        '></i></button>
                        {/* {(toggleFilter)?
                        <div className="p-3">
                          <h6 className="mb-3 mt-0">Service Categories</h6>
                          <div className="checkbox checkbox-success ">
                            <input
                              id="checkbox0"
                              type="checkbox"
                              defaultChecked
                            />
                            <label htmlFor="checkbox0">
                              Allergy and immunology
                            </label>
                          </div>
                          
                        </div>
                        :null}   */}
                      </div>
                    </div>
                      {(toggleFilter)?  <>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="p-3">
                          <h6 className="mb-3 mt-0">Price Range</h6>
                          <input
                            ref={priceRangeRef}
                            type="text"
                            id="range_doctors_ratex"
                            onChange={(e)=>{console.log(priceRangeRef)}}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="p-3">
                          <h6 className="mt-0 mb-4">Ratings</h6>
                          {[5,4,3,2,1,0].map((val,index) => (
                            <div key={val} className="checkbox checkbox-success">
                              <input 
                                id={`checkboxa${val}`}
                                type="checkbox" 
                                defaultChecked={starFilter[index]===val}
                                onChange={
                                  (e)=>{
                                     
                                      var newstarfilter=starFilter
                                      var checked=false
                                      if (newstarfilter[index]===val){
                                        
                                        newstarfilter[index]=false
                                      }
                                      else {
                                        newstarfilter[index]=parseInt(val)
                                        checked=true
                                      }
                                      setStarFilter(newstarfilter)
                                      setList(listOriginal
                                        .filter((item)=>{
                                            return(newstarfilter.includes(parseInt(item.average_ratings))
                                              // newstarfilter[0]===(parseInt(item.average_ratings))||
                                              // newstarfilter[1]===(parseInt(item.average_ratings))||
                                              // newstarfilter[2]===(parseInt(item.average_ratings))||
                                              // newstarfilter[3]===(parseInt(item.average_ratings))||
                                              // newstarfilter[4]===(parseInt(item.average_ratings))||
                                              // newstarfilter[5]===(parseInt(item.average_ratings))
                                              )
                                          }))
                                  }}
                                  />
                              <label htmlFor={`checkboxa${val}`}>
                                {val}
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
                    </div></>:null}
                  </div>
                </div>
              </div>

              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Service..."
                          aria-label="Search Service..."
                          onSubmit={handleSearch}
                        />
                        <span className="input-group-append">
                          <button className="btn btn-success" type="button">
                            Go!
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {
                  list
                  .map((item, index) => (
                    <div key={index} className="col-lg-4" style={{minWidth:'200px'}}>
                      <div className="card e-co-product" >
                      {/* {AWS_BUCKET_SERVICES+ item.images} */}
                        <Link to="booking" state={{ ...item }}>
                          <img
                            src={(AWS_BUCKET_SERVICES+ item.images)}
                            alt=""
                            style={{width:'200px', height:'200px',objectFit: 'cover'}}
                            className="img-fluid"
                          />
                        </Link>
                        <div className="card-body product-info">
                          <Link
                            to="booking"
                            className="product-title"
                            state={{ ...item }}
                          >
                            {item.service_description}
                          </Link>
                          <p>{item.provider_name}</p>
                          <div className="d-flex justify-content-between my-2">
                            <p className="product-price">${item.cost_price}</p>
                            <p className="mb-0 row product-review align-self-center">
                              
                              <Rating
                                fillColor="#ffb822"
                                emptyColor="white"
                                SVGstrokeColor="#f1a545"
                                SVGstorkeWidth={1}
                                size={17}
                                allowFraction={true}
                                initialValue={item.average_ratings}
                                readonly={true} 
                              />
                              ({item.average_ratings})
                              
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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

const Filter = () => {}

import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import SAMPLECLINICS from '../../../mocks/adminlists'
import Footer from '../../../components/Footer'
import TableCard, { TableTitle } from "../../../components/table/Tables"
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { AWS_BUCKET, AWS_BUCKET_SERVICES } from '../../../constants'
import CardItem from '../../../components/cards/Card'
function ClinicItem({name,company,contactnum,email,address,providers,dateCreated}){
    
    return(
        <tr>
            <th><a href="manage_clinic.html">
                {name}
                </a></th>
            <th>{company}</th>
            <th>{contactnum}</th>
            <th>{email}</th>
            <th>{address}</th>
            <th>{providers}</th>
            <th>{dateCreated}</th>
        </tr>
        
    )}
    

export default function AdminClinics() {
    
    const axiosPrivate = useAxiosPrivate()
    
    const { auth, setAuth } = useAuth()
    const [list, setList] = useState([])
    
    const [errMsg, setErrMsg] = useState(null)
    const [clinicsList,setClinicsList] = useState([
        {
            name :"Clinic One",
            company:"Uno Corporation",
            contactnum:"+63911 1111 1111",
            email: "prime@numberone.com.ph",
            address:"One street block 1 lot 1 Brgy. 1 Area 1",
            providers:1,
            dateCreated:"11/11/2011"
        },
        {
            name :"Maxicare Clinic",
            company:"Maxicare Corporation",
            contactnum:"+63919 4569 2311",
            email: "maxicare@maxicare.com.ph",
            address:"Sample address in here",
            providers:2,
            dateCreated:"11/29/2022"
        },
        {
            name :"Tres Clinic",
            company:"Three Corporation",
            contactnum:"+6394 5648 2214",
            email: "a@basdasd.com.ph",
            address:"Sample address in here",
            providers:10,
            dateCreated:"11/29/2022"
        }
        ]
    )
    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()
    
        async function getList() {
          await axiosPrivate
            .post(
              'getClinics',
              { Email: auth.email},
              {
                signal: controller.signal,
              }
            )
            .then((res) => {
              console.log(res)
              const { Status, Data: data = [], Message } = res.data
    
              if (Status) {
                setList(data)
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
<div className="page-wrapper">
            {/* <!-- Page Content--> */}
            <div className="page-content">
                <div className="container-fluid">
                    <TableTitle title="Clinics">
                        <div className="float-right">
                            <Link to='create'>
                                <button type="button" className="btn btn-success waves-effect waves-light">
                                    New Clinic
                                </button>
                            </Link>
                        </div>
                    </TableTitle>
                    {/* <div className="row" style={{marginBottom: "30px"}}>
                        <div className="col-lg-3">
                            <label for="example-text-input" className="col-form-label text-right">Company</label>
                            <select className="form-control">
                                <option>Maxicare Corporation</option>
                                <option>The Ogamo Institute</option>
                                <option>St. Luke Group</option>
                            </select>
                        </div>
                        <div className="col-lg-3">
                            <label for="example-text-input" className="col-form-label text-right">Location</label>
                            <select className="form-control">
                                <option>Location Name 1</option>
                                <option>Location Name 2</option>
                                <option>Location Name 3</option>
                            </select>
                        </div>	
                    </div> */}
                    <div className='row'>
                        {/* {clinicsList.map((clinic)=>
                        <ClinicItem {...clinic} />
                        )}
                        
                         */}
                        {list.map((item) => (
                            <CardItem>
                                <img
                                    className='card-img-top'
                                    style={{ 
                                        // width: 'unset', 
                                        width:'200px', height:'150px',objectFit: 'cover'}}
                                    // src={`${AWS_BUCKET_SERVICES}/assets/images/users/user-10.jpg`}
                                    src={AWS_BUCKET_SERVICES+item.picture_file}
                                    // style={{}}
                                    alt=''
                                    />
                                    <div className='card-body'>
                                        <h5 className='card-title'>{item.clinic_name}</h5>
                                        <p className='card-text mb-0'>{item.address}</p>
                                        <p className='text-muted mb-0'>
                                            {item.specialty }
                                        </p>
                                        <p className='mb-0'>{item.working_hours || `Mon 8am - 5pm`}</p>
                                    </div>
                            </CardItem>
                            ))}
                    </div >
                </div>
                {/* <!-- container --> */}

                <Footer/>
            </div>
        </div>


    )
  }
export function Card({children}){
    return(
        <div className='row'>
            <div className='col-lg-3'>
                <div className='card'>
                    <div className='card-body'>
                        {children}
                    </div>
                </div>
            </div>
      </div>

)
}
  
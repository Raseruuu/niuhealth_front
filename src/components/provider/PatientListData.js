import { memo } from 'react'
import { MdOutlineEmail, MdPhone } from 'react-icons/md'
import Pagination from 'react-js-pagination'
import { Link } from 'react-router-dom'
import { StatusTextInsurance } from '../../components/status/Status'
import { AWS_BUCKET, AWS_BUCKET_PROFILES, AWS_BUCKET_SERVICES } from '../../constants'

function PatientListData({ limit,pagenum, list = [] }) {
  // var paginatedlist = new List('users', options);
  let paginatedlist=[]
  var j=0
  var k=0
  for (var i in list){
    console.log("list",list)
    console.log(paginatedlist,limit, pagenum,(pagenum*limit)-limit,i,j,list[i])
    // console.log(parseInt(i)===((pagenum*limit)-limit),i,(pagenum*limit)-limit)
    console.log("Page "+(pagenum))
    if((parseInt(i))===((pagenum*limit)-limit)){
      
      for (var k=0; k<limit;k++){
        if (list[parseInt(i)+k]){
        paginatedlist.push(list[parseInt(i)+k])}
      }
    }
    j=j+1
  }
  return paginatedlist.map((item, index) => (
    <tr key={index}>
      <td>
        <Link
          to={"profile/"+item.patient_id}
          state={{
            selectedUser: item,
          }}
        >
          <div className="row">
            <div className="col">
              <img
                src={AWS_BUCKET_SERVICES+"profiles/pictures/"+item.patient_id+"/"+item.picture}
                alt=""
                className="thumb-sm rounded-circle mr-2"
                style={{objectFit:'cover'}}
              />
              {item.first_name} {item.middle_name} {item.last_name}
            </div>
          </div>
        </Link>
      </td>
      <td>
        <a href={`mailto:${item.email}`}>
          <MdOutlineEmail /> {item.email}
        </a>
      </td>
      <td>
        <a href={`tel:${item.contact_info}`}>
          <MdPhone /> {item.contact_info}
        </a>
      </td>
      <td>
        <span className='badge badge-md badge-soft-purple'>
          {item.status ? 'Subscribed' : 'Not Subscribed'}

        </span>
      </td>
      <td>
        <StatusTextInsurance status={item.with_insurance || 0} />
      </td>
      {/* //Action!!
       <td>
        <Link
          to='profile/edit'
          state={{
            selectedUser: item,
          }}
          className='mr-2'
        >
          <i className='fas fa-edit text-info font-16'></i>
        </Link>
        <Link
          to='profile/delete'
          state={{
            selectedUser: item,
          }}
        >
          <i className='fas fa-trash-alt text-danger font-16'></i>
        </Link>
      </td> */}
    </tr>
  ))
}

export default PatientListData

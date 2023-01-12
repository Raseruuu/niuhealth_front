import { memo } from 'react'
import { MdOutlineEmail, MdPhone } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { StatusTextInsurance } from '../../components/status/Status'
import { AWS_BUCKET } from '../../constants'

function PatientListData({ list = [] }) {
  return list.map((item, index) => (
    <tr key={item?.patient_id || index}>
      <td>
        <Link
          to="profile"
          state={{
            selectedUser: item,
          }}
        >
          <div className="row">
            <div className="col">
              <img
                src={`${AWS_BUCKET}/assets/images/users/user-10.jpg`}
                alt=""
                className="thumb-sm rounded-circle mr-2"
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

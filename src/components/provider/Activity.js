import moment from 'moment'
import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

function Activity() {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [list, setList] = useState([])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function getList() {
      await axiosPrivate
        .post(
          'getActivities',
          { Email: auth.email },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          const { Status, Data: data = [], Message } = res.data

          if (Status) {
            isMounted && setList(data?.slice(0, 5))
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
          setErrMsg(err.message)
        })
    }

    getList()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <div className='card'>
      <div className='card-body'>
        <h4 className='header-title mt-0 mb-3'>Activity</h4>
        <div className='slimscroll crm-dash-activity'>
          <div className='activity'>
            {list.map((activity, index) => (
              <ActivityCard key={index} {...activity} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// <i className='mdi mdi-timer-off bg-soft-pink'></i>
// <i className='mdi mdi-alert-decagram bg-soft-purple'></i>
// <i className='mdi mdi-clipboard-alert bg-soft-warning'></i>
// <i className='mdi mdi-clipboard-alert bg-soft-secondary'></i>

function ActivityCard({ title, dateTime, body }) {
  return (
    <div className='activity-info'>
      <div className='icon-info-activity'>
        <i className='mdi mdi-checkbox-marked-circle-outline bg-soft-success'></i>
      </div>
      <div className='activity-info-text'>
        <div className='d-flex justify-content-between align-items-center'>
          <h6 className='m-0 w-75'>{title}</h6>
          <span className='text-muted d-block'>
            {moment(dateTime).local().fromNow()}
          </span>
        </div>
        <p className='text-muted mt-3'>
          {body}
          {/* <Link to='#' className='text-info'>
        [more info]
      </Link> */}
        </p>
      </div>
    </div>
  )
}

export default Activity

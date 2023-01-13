export const StatusIcon = ({ icontype }) => {
    const StatusColor = {
      0: 'text-purple',
      2: 'text-danger',
      3: 'text-danger',
      1:"text-success",
      4:"text-success",
    }
    return (
      <div className="task-priority-icon">
        <i className={`fas fa-circle ${StatusColor[icontype]}`}></i>
      </div>
    )
  }

export function StatusTextInsurance({ status=0 }){
    const statusColor = {
      0: 'badge-soft-danger',
      1: "badge-soft-success",
      'yes': "badge-soft-success"
    }
    const text = {
      0: 'Not Insured',
      1: "Insured",
      'yes': "Insured",
      
    }
    return (
      <span className={`virtualvisitbadge badge badge-md ${statusColor[status]}`}>
        {text[status]}
      </span>
    )
  }  

export default function StatusTextVisit({ status }){
    const statusColor = {
      0: 'badge-soft-purple',
      2: 'badge-soft-danger',
      3: 'badge-soft-danger',
      1: "badge-soft-success",
      4: "badge-soft-success",
    }
    const statusText = {
      0: 'Upcoming',
      2: 'Cancelled By You',
      3: 'Cancelled By Doctor',
      1: "Completed",
      4: "Approved",
    }
    return (
      <span className={`virtualvisitbadge badge badge-md ${statusColor[status]}`}>
        {statusText[status]}
      </span>
    )
  }  
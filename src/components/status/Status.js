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
      1: "badge-soft-success"
    }
    const text = {
      0: 'Not Insured',
      1: "Insured"
    }
    return (
      <span className={`virtualvisitbadge ml-0 badge badge-md ${statusColor[status]}`}>
        {text[status]}
      </span>
    )
  }  
  export function StatusTextInsurance3({ status=0 }){
    const statusColor = {
      0: 'badge-soft-success',
      1: "badge-soft-purple",
    }
    const text = {
      0: 'Active',
      1: "Archived"
    }
    return (
      <span className={`virtualvisitbadge ml-0 badge badge-md ml-0 ${statusColor[status]}`}>
        {text[status]}
      </span>
    )
  }  
  export function StatusTextInsurance2({ status=0 }){
    const statusColor = {
      0: 'badge-soft-purple',
      1: "badge-soft-success",
      2: "badge-soft-danger"
    }
    const text = {
      0: 'For Approval',
      1: "Approved",
      2: 'Rejected'
    }
    return (
      <span  className={`virtualvisitbadge ml-0 badge badge-md ${statusColor[status]}`}>
        {text[status]}
      </span>
    )
  }  

  export function StatusTextVisit ({ status }) {
    const statusColor = {
      0: 'badge-soft-purple',
      1: "badge-soft-success",
      2: 'badge-soft-danger',
      3: 'badge-soft-danger',
      4: "badge-soft-success",
      5: "badge-soft-success",
      6: "badge-soft-success",
    }
    const statusText = {
      0: 'For Approval',
      1: "Completed",
      2: 'Cancelled By Patient',
      3: 'Cancelled By Provider',
      4: "Approved",
      5: "Started",
      6: "Created By Provider",
    }
    return (
      <span className={`virtualvisitbadge badge badge-md ml-0 ${statusColor[status]}`}>
        {statusText[status]}
      </span>
    )
  } 

  export default function StatusText ({ status }) {
    const statusColor = {
      0: 'badge-soft-purple',
      1: "badge-soft-success",
      2: 'badge-soft-danger',
      3: 'badge-soft-danger',
      4: "badge-soft-success",
      5: "badge-soft-success",
      6: "badge-soft-success",
    }
    const statusText = {
      0: 'For Approval',
      1: "Completed",
      2: 'Cancelled By Patient',
      3: 'Cancelled By Provider',
      4: "Approved",
      5: "Started",
      6: "Created By Provider",
    }
    return (
      <span className={`virtualvisitbadge badge badge-md ml-0 ${statusColor[status]}`}>
        {statusText[status]}
      </span>
    )
  }


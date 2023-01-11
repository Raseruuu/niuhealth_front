
export function ContainerFluid({children}){
    return(
    
    <div className='container-fluid'>
        {children}
    </div>
    )
  }
  export function PageWrapper({children}){
    return(
        <div className='page-wrapper'>
        <div className='page-content'>
        {children}
        </div>
        </div>
    )
  }
export function TableTitle({title,children}){
    return(
    
    <div className='row'>
    <div className='col-sm-12'>
      <div className='page-title-box'>
        {children}
        <h4 className='page-title'>{title}</h4>
        

      </div>
    </div>
  )
}
export function TableTextLink({ text, to, children }) {
  return (
    <h6 className="mt-0 mb-1 text-dark">
      <a href={to}>{text}</a>
      {children}
    </h6>
  )
}
export default function TableCard({ headers, children }) {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead className="thead-light">
          <tr>
            {headers.map((header) => (
              <th>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

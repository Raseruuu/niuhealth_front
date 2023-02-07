
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
          <h4 className='page-title'>{title}</h4>
        {children}
        </div>
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
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    {headers.map((header,index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody style={{marginBottom:"10px"}}>{children}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

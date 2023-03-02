
export default function CardItem({image,length=4,className,children}){
    return(
        <div className={className+'col-md-'+length}>
            <div className='card flex-sm-col flex-md-row overflow-hidden'>
                {image?(
                    <img
                        className='card-img-top'
                        src={image}
                        alt=''
                    />)
                    :<></>
                }
                <div className='card-body'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export function CardLongItem({image,children}){
    return(
        <div className='col-sm-12'>
            {/* <div className='card flex-sm-col flex-md-row overflow-hidden'> */}
            <div className='card flex-md-row overflow-hidden'>
                {image?(
                    <img
                        className='card-img-top'
                        src={image}
                        alt=''
                    />)
                    :<></>
                }
                <div className='card-body'>
                    {children}
                </div>
            </div>
        </div>
    )
}
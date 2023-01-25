
export default function CardItem({image,children}){
    return(
        <div className='col-sm-12 col-md-4'>
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

export default function CardItem({image,children}){
    return(
        <div className='col-sm-12 col-md-4'>
            <div class='card flex-sm-col flex-md-row overflow-hidden'>
                {image?(
                    <img
                        class='card-img-top'
                        src={image}
                        alt=''
                    />)
                    :<></>
                }
                <div class='card-body'>
                    {children}
                </div>
            </div>
        </div>
    )
}
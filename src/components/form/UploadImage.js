import { AWS_BUCKET_SERVICES, AWS_BUCKET_PROFILES } from '../../constants'
import { useEffect, useRef, useState } from 'react'
import './imageup.css'

export function UploadOneImage({image,setImage, disabled}){
  const [imagepreview, setImagePreview] = useState(false)
  const [previewImage, setPreviewImage] = useState({path:'', file:''})
  // const [image, setImage] = useState({})
  const imgRef = useRef()
  function triggerFileInput() {
   
    if (imgRef.current) {
        imgRef.current.click()
    }}
  const handleImageInputChange = (e) => {
    const [file] = e.target.files;
    console.log("FILE HERE: ",file)
    setImage({...image, file:file})
    
    setPreviewImage({...image, file:file})
    setImagePreview(true)
  };
  
  useEffect(() => {
        
    // let isMounted = true
    // const controller = new AbortController()
    let fileReader, isCancel = false;
    // for (var image in formData.images) {
    if (image.file) {
        fileReader = new FileReader();
        fileReader.onload = (e) => {
            const { result } = e.target;
            if (result && !isCancel) {
            const tempimage={path:result,file:image.file}
            console.log(tempimage)
            setImage(tempimage)
            // setImages([...images, tempimage])
            
            }
        }
    fileReader.readAsDataURL(image.file);
    }
    // }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }
  }, [previewImage])

return (

        <div className="upload-container d-flex flex-column justify-content-center align-items-center" style={{marginBottom:'10px',marginLeft:'10px',marginRight:'10px'}}>
                <input
                    hidden
                    type="file"
                    id="input-file-now-custom-1"
                    accept="image/*"
                    capture="user"
                    name="Image"
                    ref={imgRef}
                    onChange={handleImageInputChange}
                />
                {(image.path!=='undefined')?(
                  <>
                  {(imagepreview)?(
                  <img
                      alt=""
                      style={{objectFit: 'cover', margin: 'unset' ,width:180,height:150}}

                      onClick={() => {
                      Swal.fire({
                          // title: 'Profile Picture',
                          customClass: 'swal-wide',
                          html: `<img height="600px" src="${!imagepreview?AWS_BUCKET_SERVICES + (image.path): (image.path)}"></img>`,
                          // { AWS_BUCKET_SERVICES } + profile.picture,
                      })
                      }}
                      src={!imagepreview?AWS_BUCKET_SERVICES + (image.path): (image.path)}
                      className="ob waves-effect waves-light"
                      
                  />):null}
                  <div className='row' style ={{marginTop:'10px'}}>
                        <button
                          type="button"
                          disabled={disabled}
                          className="btn btn-gradient-success waves-effect waves-light"
                          onClick={triggerFileInput}
                          >
                            Upload 
                        </button>
                        
                    </div>
                 
                 </>
                 ):null}
                </div>
           
              )
}
export default function UploadImage({id,images,setImages, previewImage,formData,setFormData, action}) {
    const [imagepreview, setImagePreview] = useState(false)
    const [image, setImage] = useState({})
    const imgRef = useRef()
   
    const handleImageInputChange = (e) => {
        const [file] = e.target.files;
        console.log("FILE HERE: ",file);
        // console.log(imgRef.current.value+"")
        // let imageid='image'+id+'_file'
        console.log('editing now: ', id)
        setImage({...image, file:file})
        // setFormData({...formData,imagefile:file})

        setFormData({...formData,images:[...images,image]})
        console.log('uguu',images)
      };
    const removeClinicImage = (index) => {
      setImages([
        ...images.slice(0, index),
        ...images.slice(index + 1, images.length)
      ]);
    }
    function triggerFileInput() {
        if (imgRef.current) {
            imgRef.current.click()
        }
    }
    const updateImages = (i,tempimage) => {
        setImages(existingItems => {
          return [
            ...existingItems.slice(0, i),
            tempimage,
            ...existingItems.slice(i + 1),
          ]
        })
        
      }
    useEffect(() => {
        
        // let isMounted = true
        // const controller = new AbortController()
        let fileReader, isCancel = false;
        // for (var image in formData.images) {
        if (image.file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                const tempimage={path:result,file:image.file}
                // console.log(tempimage)
                updateImages(id,tempimage)
                console.log("images",images)
                // setImages([...images, tempimage])
                setImagePreview(true)
                }
            }
        fileReader.readAsDataURL(image.file);
        }
        // }
        return () => {
          isCancel = true;
          if (fileReader && fileReader.readyState === 1) {
            fileReader.abort();
          }
        }
      }, [formData])
    return (

        <div className="upload-container d-flex flex-column justify-content-center align-items-center" style={{marginBottom:'10px',marginLeft:'10px',marginRight:'10px'}}>
                <input
                    hidden
                    type="file"
                    id="input-file-now-custom-1"
                    accept="image/*"
                    capture="user"
                    name="Image"
                    ref={imgRef}
                    onChange={handleImageInputChange}
                />
                {(previewImage)?(
                  <>
                  <img
                      alt=""
                      style={{objectFit: 'cover', margin: 'unset' ,width:180,height:150}}

                      onClick={() => {
                      Swal.fire({
                          // title: 'Profile Picture',
                          html: `<img height="300px" src="${!imagepreview?AWS_BUCKET_SERVICES + (previewImage.path): (previewImage.path)}"></img>`,
                          // { AWS_BUCKET_SERVICES } + profile.picture,
                      })
                      }}
                      src={!imagepreview?AWS_BUCKET_SERVICES + (previewImage.path): (previewImage.path)}
                      className="ob waves-effect waves-light"
                      
                  />
                  {action==='edit' ||action==='create'||action==='new' ||action==='update'? (
                      <div className='row' style ={{marginTop:'10px'}}>
                        <button
                          type="button"
                          className="btn btn-gradient-success waves-effect waves-light"
                          onClick={triggerFileInput}
                          >
                            Change
                        </button>
                        {images.length>1? (
                          <button
                            type="button"
                            className="btn btn-gradient-danger waves-effect waves-light"
                            onClick={()=>
                              {removeClinicImage(id)}}
                            >
                            Remove
                          </button>
                        ): null }
                      </div>
                  ): null }
                 </>
                 ):null}
                </div>
           
              )
            }
            
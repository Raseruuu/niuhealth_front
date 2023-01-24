import { AWS_BUCKET_SERVICES, AWS_BUCKET_PROFILES } from '../../constants'
import { useEffect, useRef, useState } from 'react'
// import './imageup.css'
export default function UploadImage({id,images,setImages, previewImage,formData,setFormData, action}) {
    const [imagepreview, setImagePreview] = useState(false)
    const [image, setImage] = useState({})
    const imgRef = useRef()
    const handleRemoveItem = index => {
        // assigning the list to temp variable
        const temp = [...list];
    
        // removing the element using splice
        temp.splice(index, 1);
    
        // updating the list
        setClinicImages(temp);
    }
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
                // setClinicProfile({
                //     ...formData,
                //     picture:result 
                // })
                
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
                      style={{objectFit: 'cover', margin: 'unset' ,width:200,height:150}}

                      onClick={() => {
                      Swal.fire({
                          // title: 'Profile Picture',
                          html: `<img width="200px" height="150px" src="${!imagepreview?AWS_BUCKET_SERVICES + (previewImage.path): (previewImage.path)}"></img>`,
                          // { AWS_BUCKET_SERVICES } + profile.picture,
                      })
                      }}
                      src={!imagepreview?AWS_BUCKET_SERVICES + (previewImage.path): (previewImage.path)}
                      className="ob waves-effect waves-light"
                      
                  />
                  {action==='edit' ||action==='create'? (
                      <div className='row'>
                      <button
                      type="button"
                      className="btn btn-gradient-success waves-effect waves-light"
                      onClick={triggerFileInput}
                      >
                      Change
                      </button>
                      <button
                      type="button"
                      className="btn btn-gradient-danger waves-effect waves-light"
                      onClick={()=>
                        {removeClinicImage(id)}}
                      >
                      Remove
                      </button>
                      </div>
                 ): null }
                 </>
                 ):null}
                </div>
           
              )
            }
            
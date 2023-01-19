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
        setFormData({...formData,imagefile:file})
      };
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
        setImage(images[parseInt(id)])
      }
    useEffect(() => {
        // setImage(images[id-]) 
        
        setFormData({...images,images:[...images,image]})
        console.log('uguu',images)
    }, [images])
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
      }, [image])
    return (

        <div className="upload-container d-flex flex-column justify-content-center align-items-center">
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
                    // style={{ margin: 'unset' }}
                    
                />
                {/* <button className="btn" minWidth="200px" height="150px" onClick={()=>{if (clinicImages.length<4){setClinicImages([...clinicImages,'clinics/Default.png'])}}}>x</button> */}
                {/* <span className='fro-profile_main-pic-change'>
                          <i className='fas fa-camera'></i>
                        </span> */}
                {action==='edit' ||action==='create'? (
                    <button
                    type="button"
                    className="btn btn-gradient-success waves-effect waves-light"
                    onClick={triggerFileInput}
                    >
                    Upload
                    </button>
                 ): null }
                </div>
           
              )
            }
            
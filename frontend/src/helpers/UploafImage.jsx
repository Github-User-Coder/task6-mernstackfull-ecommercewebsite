const url=`https://api.cloudinary.com/v1_1/dqot9obgx/image/upload`
const UploafImage = async(image)=>{
    const formData = new FormData()
    formData.append("file",image)
    formData.append("upload_preset","manoj_yadav")
    const dataResponse = await fetch(url,{
        method:"post",
        body:formData
    })
    return dataResponse.json()

}
export default UploafImage
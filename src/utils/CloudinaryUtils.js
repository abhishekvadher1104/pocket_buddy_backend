const cloudinary = require('cloudinary').v2;

const uploadFileToCloudinary = async(file)=>{

 try {
  cloudinary.config({
    cloud_name:"dwecddn8b",
    api_key:"974979267579339",
    api_secret:"QkhhbfOkXmefhi54t89uvOmj0Fc"
  })
  const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
  return cloudinaryResponse
 } catch (error) {
  console.log(error);
 }  
}

module.exports = {
  uploadFileToCloudinary
}
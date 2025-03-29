const cloudinary = require("cloudinary").v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

    cloudinary.config({
      cloud_name: "dwecddn8b",
      api_key: "974979267579339",
      api_secret: "QkhhbfOkXmefhi54t89uvOmj0Fc",
    });
    const storage = new CloudinaryStorage({
      cloudinary:cloudinary,
      params:{
       folder:"profile_pictures",
       allowed_formats:["jpg","png","jpeg"],
       public_id:(req,file) =>`profile_${Date.now()}`,
      },
    })
  


const upload = multer({storage});

module.exports = {
  upload,cloudinary
};

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'drqsa0alw',
  api_key: '788441429566633',
  api_secret: 'B5gcpF_wOtH7EDPImtYS7UGzozI'
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'recetas',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 800, height: 600, crop: 'limit' }]
  },
});

module.exports = {
  cloudinary,
  storage
};

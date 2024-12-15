import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary'

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME | 'dbwuzcbme';
const API_KEY = process.env.CLOUDINARY_API_KEY | '842262788651257';
const API_SECRET = process.env.CLOUDINARY_API_SECRET | 'zNimO8t4am9QIhNvXfZPCmHelVA';

cloudinary.config({
    cloud_name: 'dbwuzcbme',
    api_key: '842262788651257',
    api_secret: 'zNimO8t4am9QIhNvXfZPCmHelVA'
})

export const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'BookBliss',
        resource_type: 'raw' 
    },
    allowedFormats: ['jpg', 'png', 'jpeg', 'webp' , 'pdf'], // Adjust allowed formats as needed
    filename: function(req, file, cb) {
        cb(null, file.originalname); // Use original file name
    }
});

// Configure Cloudinary storage for multer
// export const storage = new CloudinaryStorage({
//     cloudinary,
//     params: async (req, file) => {
//         // Set folder and transformation based on file type
//         if (file.mimetype.includes('pdf')) {
//             return {
//                 folder: 'BookBliss/PDFs', // Folder for PDF uploads
//             };
//         } else {
//             return {
//                 folder: 'BookBliss/Images', // Folder for image uploads
//                 transformation: [{
//                     width: 500,
//                     height: 500,
//                     crop: 'limit'
//                 }]
//             };
//         }
//     },
//     filename: function (req, file, cb) {
//         cb(undefined, `${file.originalname.split('.')[0]}`);
//     },
// });

// export const storage = new CloudinaryStorage({
//     cloudinary,
//     allowedFormats: ['jpg', 'png', 'jpeg'],
//     params: {
//         folder: 'BookBliss',
//         transformation: [{
//             width: 500,
//             height: 500,
//             crop: 'limit'
//         }]
//     }
// })

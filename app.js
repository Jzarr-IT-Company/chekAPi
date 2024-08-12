import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs';
import Tesseract from 'tesseract.js';
import moment from 'moment';
import cors from "cors"
import serverConfig from './config/server.config.js';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import multerS3 from "multer-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3"



const app = express();
const PORT = process.env.PORT || 28759;

app.use(cors())
app.use(express.json())
cloudinary.config({
    cloud_name: serverConfig.cloudName,
    api_key: serverConfig.cloudApiKey,
    api_secret: serverConfig.cloudSecretKey
});

const s3Client = new S3Client({
    region:  "ap-south-1",
    credentials: {
        accessKeyId: "AKIA3FLDXL2KM3EOC6FF",
        secretAccessKey: "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"
    }
});

// const getObjectURL = async (key) => {
//     const command = new GetObjectCommand({
//         Bucket: 'jzarreducation.com',
//         Key: key, // Note that the key should be capitalized
//     });
//     const url = await getSignedUrl(s3Client, command);
//     return url;
// }
// getObjectURL("demo.mp4")
//     .then(url => {
//         console.log("Get image from BUCKET:", url);
//     })
//     .catch(error => {
//         console.error("Error getting image URL:", error);
//     });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    }
});

// 662 cvc
// 04 / 29
// 5590 4902 2754 2386



const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: 'jzarreducation2', // Yahan aapka bucket name hona chahiye
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            const fileName = `${Date.now()}_${file.originalname}`;
            cb(null, fileName);
        }
    })
});

// API to handle upload
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;

        // Generate a URL to access the uploaded file
        const command = new GetObjectCommand({
            Bucket: file.bucket,
            Key: file.key,
        });
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

        res.json({
            message: "File uploaded successfully",
            url: url,
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file');
    }
});

// API to handle multiple file uploads
app.post('/uploads', upload.array('files', 30), async (req, res) => {
    try {
        const files = req.files;
        const urls = [];

        for (const file of files) {
            // Generate a URL to access the uploaded file
            const command = new GetObjectCommand({
                Bucket: file.bucket,
                Key: file.key,
            });
            const url = await getSignedUrl(s3Client, command);
            urls.push(url);
        }

        res.json({
            message: "Files uploaded successfully",
            urls: urls,
        });
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).send('Error uploading files');
    }
});













// const upload = multer({ storage: storage });
// // single image 
// app.post('/upload', upload.single('image'), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }
//         const result = await cloudinary.uploader.upload(req.file.path, {
//             upload_preset: 'ml_default'
//         });
//         fs.unlinkSync(req.file.path);
//         return res.status(200).json({ imageUrl: result.secure_url, publicId: result.public_id });
//     } catch (error) {
//         return res.status(500).json({ message: 'Error uploading image', error: error.message });
//     }
// });
// // video
// app.post('/video', upload.single('video'), async (req, res) => {
//     try {
//         console.log("VIDEO FILE", req.file)
//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         const result = await cloudinary.uploader.upload(req.file.path, {
//             resource_type: 'video',
//             upload_preset: 'ml_default'
//         });

//         fs.unlinkSync(req.file.path);

//         return res.status(200).json({ videoUrl: result.secure_url, publicId: result.public_id });
//     } catch (error) {
//         if (req.file && fs.existsSync(req.file.path)) {
//             fs.unlinkSync(req.file.path);
//         }
//         return res.status(500).json({ message: 'Error uploading video', error: error.message });
//     }
// });
// // bulk videos 
// app.post('/videos', upload.array('videos[]', 50), async (req, res) => {
//     try {
//         // Check if any files were uploaded
//         if (!req.files || req.files.length === 0) {
//             return res.status(400).json({ message: 'No files uploaded' });
//         }

//         // Upload files to Cloudinary
//         const uploadPromises = req.files.map(file => {
//             return cloudinary.uploader.upload(file.path, {
//                 resource_type: 'video',
//                 upload_preset: 'ml_default' // Make sure to create this preset in your Cloudinary account
//             });
//         });

//         // Execute all upload promises concurrently
//         const results = await Promise.all(uploadPromises);

//         // Array to hold Cloudinary video URLs and public_ids
//         const videosData = results.map(result => {
//             return {
//                 videoUrl: result.secure_url,
//                 publicId: result.public_id
//             };
//         });

//         // Once uploaded to Cloudinary, delete the files from local storage
//         req.files.forEach(file => {
//             fs.unlinkSync(file.path); // Delete the file from local storage
//         });

//         // Respond with array of Cloudinary video URLs and public_ids
//         return res.status(200).json({ videosData });
//     } catch (error) {
//         return res.status(500).json({ message: 'Error uploading videos', error: error.message });
//     }
// });
// // bulk images
// app.post('/uploads', upload.array('images', 10), async (req, res) => {
//     try {
//         if (!req.files || req.files.length === 0) {
//             return res.status(400).json({ message: 'No files uploaded' });
//         }
//         const uploadPromises = req.files.map(file => {
//             return cloudinary.uploader.upload(file.path, {
//                 upload_preset: 'ml_default'
//             });
//         });
//         // Execute all upload promises concurrently
//         const results = await Promise.all(uploadPromises);

//         // Array to hold Cloudinary image URLs and public_ids
//         const imagesData = results.map(result => {
//             return {
//                 imageUrl: result.secure_url,
//                 publicId: result.public_id
//             };
//         });

//         // Once uploaded to Cloudinary, delete the files from local storage
//         req.files.forEach(file => {
//             fs.unlinkSync(file.path);
//         });

//         // Respond with array of Cloudinary image URLs and public_ids
//         return res.status(200).json({ imagesData });
//     } catch (error) {
//         return res.status(500).json({ message: 'Error uploading images', error: error.message });
//     }
// });
// // Route to handle single image delete
// app.delete('/delete-image/:public_id', async (req, res) => {
//     try {
//         const { public_id } = req.params;
//         // Delete image using Cloudinary's destroy method
//         const deleteResponse = await cloudinary.uploader.destroy(public_id);
//         // Respond with success message
//         return res.status(200).json({ message: 'Image deleted successfully', deleteResponse });
//     } catch (error) {
//         return res.status(500).json({ message: 'Error deleting image', error: error.message });
//     }
// });
// // Route to handle all images delete
// app.delete('/delete-all-images', async (req, res) => {
//     try {
//         // Fetch all resources (images) from Cloudinary
//         const { resources } = await cloudinary.api.resources({
//             type: 'upload',
//             prefix: '', // You can specify a prefix to narrow down the search (optional)
//             max_results: 100 // Adjust max_results as per your needs
//         });

//         // Extract public_ids of all images
//         const publicIds = resources.map(resource => resource.public_id);

//         // Delete all images using Cloudinary's Batch API
//         const deleteResponse = await cloudinary.api.delete_resources(publicIds);

//         // Respond with success message
//         return res.status(200).json({ message: 'All images deleted successfully', deleteResponse });
//     } catch (error) {
//         return res.status(500).json({ message: 'Error deleting images', error: error.message });
//     }
// });





app.get('/', (req, res) => {
    return res.status(200).json("hi")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


export default app

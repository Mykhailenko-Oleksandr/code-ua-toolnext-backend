// Змінений файл: saveFileToCloudinary.js

import { Readable } from 'node:stream';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function saveFileToCloudinary(req, res, next) {
    if (!req.file || !req.file.buffer) {
        return res.status(400).json({ message: 'Будь ласка, авантажте зображення' });
    }

    const buffer = req.file.buffer;
    try {
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'tool-images',
                    resource_type: 'image',
                    overwrite: true,
                    unique_filename: true,
                    use_filename: false,
                },
                (err, result) => (err ? reject(err) : resolve(result)),
            );
            Readable.from(buffer).pipe(uploadStream);
        });


        req.body.images = result.secure_url;

        next();

    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        return res.status(500).json({ message: 'Не вдалося завантажити зображення' });
    }
}

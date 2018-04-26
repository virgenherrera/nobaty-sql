import { existsSync, mkdirSync } from 'fs';
import * as multer from 'multer';
import { Directories } from '../Library/Directories';

const dirs = new Directories;

// Create uploads directory if does not exist
if (!existsSync(dirs.uploadsPath)) {
	mkdirSync(dirs.uploadsPath);
}


function imageFilter(req, file, cb) {
	// accept image only
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
		return cb(new Error('Only image files are allowed!'), false);
	}

	cb(null, true);
}

// function videoFilter(req, file, cb) {
// 	// accept video only
// 	if (!file.originalname.match(/\.(mp4|flv)$/)) {
// 		return cb(new Error('Only video files are allowed!'), false);
// 	}

// 	cb(null, true);
// }


export const imageUpload = multer({
	dest: dirs.uploadsPath,
	fileFilter: imageFilter
});

// export const videoUpload = multer({
// 	dest: dirs.uploadsPath,
// 	fileFilter: videoFilter
// });

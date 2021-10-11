import multer from "multer"
import { Express, Request } from "express"
import path from "path"

export const storageConfig = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "video")
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	},
})

export const videoUpload = multer({
		storage: storageConfig,
		fileFilter(req, file, cb) {
			const videoTypes = [
				"video/mpeg",
				"video/mp4"
			]
			cb(null, videoTypes.includes(file.mimetype));
		}
	});
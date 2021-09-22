import multer from "multer"
import { Express, Request } from "express"
import path from "path"

export const storageConfig = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "../videos")
	},
	filename: (req, file, cb) => {
		req.body.link = "VIDEO-" + Date.now() + path.extname(file.originalname)
		cb(null, req.body.link)
	},
})
/*
export const fileFilter = (req:Request, file: Express.Multer.File, cb:any) => {
	const videoTypes = [
		"video/mpeg",
		"video/mp4",
		"video/x-ms-wmv",
		"video/x-flv",
		"video/x-msvideo",
		"video/3gpp",
		"video/3gpp2",
	]
	if (videoTypes.includes(file.mimetype)) {
		cb(null, true)
	} else {
		cb(null, false)
	}
*/
export const videoUpload = multer({
		storage: storageConfig,
		fileFilter(req, file, cb) {
			const videoTypes = [
				"video/mpeg",
				"video/mp4",
				"video/x-ms-wmv",
				"video/x-flv",
				"video/x-msvideo",
				"video/3gpp",
				"video/3gpp2",
			]
			if (videoTypes.includes(file.mimetype)) {
				cb(null, true)
			} else {
				cb(null, false)
			}
		}
	});
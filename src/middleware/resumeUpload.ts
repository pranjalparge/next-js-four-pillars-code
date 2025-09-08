import multer, { FileFilterCallback } from "multer";
import path from "path";

class FileUpload {
  static checkFile(file: Express.Multer.File, fileSize: number, maxSize: string) {
    const allowtypes = ["jpg", "jpeg", "png", "pdf", "bmp"];
    const fileExtension = path.extname(file.originalname).toLowerCase().replace(".", "");
    const mimeType = file.mimetype.split("/")[1]?.toLowerCase();

    if (!allowtypes.includes(fileExtension) || !allowtypes.includes(mimeType)) {
      return { check: false, msg: "Invalid file type. Allowed: JPG, JPEG, PNG, PDF, BMP." };
    }
    if (file.size > fileSize) {
      return { check: false, msg: `File too big. Max size is ${maxSize}.` };
    }
    return { check: true, msg: "" };
  }
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "./uploads"),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-4pii-${file.originalname}`),
});

const fileFilter = (req: any, file: Express.Multer.File, cb: FileFilterCallback) => {
  const maxSize = 1 * 1024 * 1024;
  const result = FileUpload.checkFile(file, maxSize, "1MB");

  if (!result.check) return cb(new Error(result.msg));
  cb(null, true);
};

export const uploadResume = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter,
});

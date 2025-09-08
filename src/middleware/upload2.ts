import multer from "multer";

const imageFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (
    [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "application/pdf",
      "application/msword",
      "application/zip",
      "application/vnd.rar",
      "image/avif",
    ].includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, SVG, PDF, MsWord, ZIP, RAR, AVIF files allowed."));
  }
};

const storage = multer.memoryStorage();

export const uploadFile = multer({ storage, fileFilter: imageFilter });

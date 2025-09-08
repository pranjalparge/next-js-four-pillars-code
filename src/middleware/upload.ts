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
    ].includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, SVG, PDF, MsWord, ZIP, RAR files allowed."));
  }
};

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "./uploads"),
  filename: (_req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`),
});

export const uploadFile = multer({ storage, fileFilter: imageFilter });

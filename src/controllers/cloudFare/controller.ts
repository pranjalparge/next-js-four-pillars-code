const {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const r2 = require("../../utils/cloudFlare/r2Client");

const BUCKET = process.env.R2_BUCKET;

exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const timestampedName = `file-${Date.now()}-4pii-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: timestampedName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await r2.send(command);
    res.json({ message: "File uploaded", filename: timestampedName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFileUrl = async (req, res) => {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET,
      Key: req.params.filename,
    });

    const url = await getSignedUrl(r2, command, { expiresIn: 300 }); // 5 minutes
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.replaceFile = async (req, res) => {
  try {
    const file = req.file;

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: req.params.filename, // keep same name to overwrite
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await r2.send(command);
    res.json({ message: "File replaced" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: req.params.filename,
    });

    await r2.send(command);
    res.json({ message: "File deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

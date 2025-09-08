const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sslcertificateschema = new Schema(
  {
    info: { type: String, required: true },
    info_head: { type: String, required: true },
    image: { type: Object },
  },
  {
    timestamps: true,
  }
);

const sslcertificate = mongoose.model(
  "LLC_SslCertificate",
  sslcertificateschema
);

module.exports = sslcertificate;

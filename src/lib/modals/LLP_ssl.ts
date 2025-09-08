const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const sslcertificateschema = new Schema({
   
    page_name:{ type: String, required: true },
    page_heading:{ type: String, required: true },
    info_head1:{ type: String, required: true },
    info1:{ type: String, required: true },
    info2:{ type: String, required: true },
    info3:{ type: String, required: true },
    info4:{ type: String, required: true },
        
   
    
  }, {
    timestamps: true,
  }); 
   
  const sslcertificate = mongoose.model('LLP_SslCertificate',sslcertificateschema);
  
  module.exports =sslcertificate;

const sendEmail = require('./sendEmail');

async function sendOTPMobile(mobile, otp) {
	const options = {
		method: "GET",
		hostname: "api.msg91.com",
		port: null,
		path:
			"/api/v5/otp?authkey=128527AP4lXIIyv580b64e8&template_id=5e254d07d6fc05724f0e8fc9&mobile=+91" +
			mobile +
			"&invisible=1&otp=" +
			otp,
		headers: {
			"content-type": "application/json",
		},
	};
	const https = require("https");
	return new Promise((resolve, rejects) => {
		const req1 = https.request(options, function (otpres) {
			let chunks;
			otpres.on('data', function (chunk) {
				// console.log('data');
				chunks = chunk;
				// console.log(chunk);
			});

			otpres.on('end', function () {
				// console.log('end');
				resolve(chunks.toString());
			});

			otpres.on('error', (err) => {
				// console.log('eror');
				rejects(err);
			});
		});
		req1.end();
	});
}

async function sendOTPEmail(email, otp) {
	const message = '<p>Dear</p><p>Your Account Verification OTP For Online Virtual Tax is :<h2>' + otp + '</h2></p> <p>Please do not share with anyone.</p> <p>Thank You.</p>';
	// console.log(`Sending ${otp} to ${email}`);
	await sendEmail({
		email: email,
		subject: 'Online Virtual Tax - Account Verification OTP',
		html: message,
	})
}

// const cb = async() => {
// 	const res = await sendOTPEmail("fullstack2@4pillarsinfotechindia.com", 123456)
// 	console.log(res);
// }
// cb()

exports.sendOTPMobile = sendOTPMobile;
exports.sendOTPEmail = sendOTPEmail;
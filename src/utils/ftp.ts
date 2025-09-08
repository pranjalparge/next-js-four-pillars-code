const ftp = require('basic-ftp');
const { readFile } = require('fs/promises');
const fs = require('fs');
const { createHash } = require('crypto');
const util = require('util');
const mv = util.promisify(fs.rename);
const path = require('path');

require('dotenv').config({ path: 'utils/util.env' });

const upload_path = path.join(__dirname, '/../uploads/');
// console.log(`uploadPath : ${upload_path}`);

const FTP_HOST = process.env.FTP_HOST || '172.16.0.99';
const FTP_USER = process.env.FTP_USER || 'ftpuser1';
const FTP_PASSWORD = process.env.FTP_PASSWORD || 'fpii@1122';
const FTP_SECURE = 'true';
const FTP_VERBOSE = 'true';
const FTP_PATH = '/website2025/';

console.log(FTP_HOST);

async function uploadPhoto(file, userid) {
	let timestamp = Date.now().toString();
	try {
		if (!file || !file.file.name) {
			throw new Error('File object is invalid or does not have a name property.');
		}

		const fileExtension = file.file.name.split('.').pop();
		const newFilename = userid + '_' + timestamp + '.' + fileExtension;

		const destinationPath = upload_path + newFilename;
		console.log(upload_path + newFilename);
		await file.file.mv(destinationPath);
		await upload_to_ftp_server(file, newFilename);
		console.log(newFilename, 'newFilename');

		return newFilename;
	} catch (error) {
		console.error(error);
		return false;
	}
}

async function uploadAnyFile(file, userid, subFolderName) {
	if (!subFolderName) {
		throw new Error('Subfolder is missing');
		return false;
	}

	let timestamp = Date.now().toString();
	try {
		if (!file || !file.file.name) {
			throw new Error('File object is invalid or does not have a name property.');
		}

		const fileExtension = file.file.name.split('.').pop();
		const newFilename = userid + '_' + timestamp + '.' + fileExtension;

		const destinationPath = upload_path + newFilename;
		await file.file.mv(destinationPath);
		await upload_to_ftp_server(destinationPath, newFilename, subFolderName);
		return newFilename;
	} catch (error) {
		console.error(error);
		return false;
	}
}

async function download(filename) {
	try {
		const localFilePath = path.join(upload_path, filename);

		if (await check_locally_exists(localFilePath)) {
			// File exists locally, return the local path
			return localFilePath;
		}

		// File doesn't exist locally, download from FTP
		await download_from_ftp_server(filename);

		// Check again after downloading
		if (await check_locally_exists(localFilePath)) {
			return localFilePath;
		}

		// If still not found, return null
		console.log('File not found locally or on FTP.');
		return null;
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function uploadDoc(file) {
	let timestamp = Date.now().toString();
	try {
		// console.log(docid, "docID");
		// console.log("File name:", file.name);

		if (!file || !file.name) {
			throw new Error('File object is invalid or does not have a name property.');
		}

		const fileExtension = file.name.split('.').pop();
		const newFilename = userid + '_' + docid + '_' + timestamp + '.' + fileExtension;

		const destinationPath = upload_path + newFilename;
		// console.log(newFilename);
		await file.mv(destinationPath);
		await upload_to_ftp_server(file, newFilename);

		return { newFilename, docid };
	} catch (error) {
		console.error(error);
		return false;
	}
}

async function upload_to_ftp_server(file, newFilename) {
	const client = new ftp.Client();
	client.ftp.verbose = FTP_VERBOSE;
	try {
			await client.access({
				host: FTP_HOST,
				user: FTP_USER,
				password: FTP_PASSWORD,
				secure: FTP_SECURE,
			})


		await client.uploadFrom(upload_path + newFilename, FTP_PATH + newFilename);
	} catch (err) {
		console.error({message : err});
	} finally {
		client.close();
	}
}

async function download_from_ftp_server(filename) {
	const client = new ftp.Client();
	client.ftp.verbose = FTP_VERBOSE;
	try {
		await client.access({
			host: FTP_HOST,
			user: FTP_USER,
			password: FTP_PASSWORD,
			secure: FTP_SECURE,
		});

		await client.downloadTo(upload_path + filename, FTP_PATH + filename);
	} catch (err) {
		console.error(err);
	} finally {
		client.close();
	}
}

async function check_locally_exists(filename) {
	try {
		await readFile(filename);
		return true;
	} catch (error) {
		return false;
	}
}

async function uploadOptionFile(newFilename, userid) {
	let timestamp = Date.now().toString();
	try {
		const outputFilePath = path.join(upload_path, newFilename);

		await upload_to_ftp_server(outputFilePath, newFilename);
		console.log(newFilename, 'newFilename');
		return newFilename;
	} catch (error) {
		console.error(error);
		return false;
	}
}

module.exports = {
	uploadPhoto,
	uploadDoc,
	download,
	check_locally_exists,
	uploadOptionFile,
	uploadAnyFile,
	upload_to_ftp_server
};

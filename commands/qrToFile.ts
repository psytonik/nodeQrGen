import fs from "fs";
import {toFile} from "qrcode";

const qrToFile = async (data:any) => {
	try {
		let dir = "./images";
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
		if(!data) {
			throw new Error("No data");
		}

		await toFile(`${dir}/${data.id}.svg`, data.link, {
			color: {
				dark: "#000000",
				light: "#0000",
			},
			// maskPattern: 5,
			errorCorrectionLevel: "H",
			width: 1200,
			version: 8
		});
	} catch (e) {
		if (e instanceof Error) {
			console.log(e.message);
		}
	}
};

export default qrToFile;

import fs from "fs";
import {toFile} from "qrcode";

const qrToFile = async (id:number,link:string) => {
	try {
		let dir = "./images";
		if (!fs.existsSync(dir)) {
			await fs.mkdirSync(dir);
		}
		await toFile(`${dir}/${id}.svg`, link, {
			color: {
				dark: "#000000",
				light: "#0000",
			},
			maskPattern: 7,
			errorCorrectionLevel: "H",
			width: 1200,
			version: 3
		});
	} catch (e) {
		if (e instanceof Error) {
			console.log(e.message);
		}
	}
};

export default qrToFile;

import {createCanvas,loadImage,registerFont, Image} from "canvas";
import fs from "fs";

const qrToCanvas = async (data:any) => {
	const width = 1200;
	const height = 1200;
	try {
		const {id, name} = await data;
		let dir = "./images";
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
		let publicDir = "./public";
		if (!fs.existsSync(publicDir)) {
			fs.mkdirSync(publicDir);
		}
		let img = await loadImage(`images/${id}.svg`);
		const canvas = createCanvas(width, height, "svg");
		const ctx = canvas.getContext('2d');
		registerFont('./iqos.ttf', { weight:'bold', family: 'Open Sans' })

		const hRatio =  canvas.width / img.width;
		const vRatio = canvas.height / img.height;
		const ratio = Math.max(hRatio,vRatio);
		const centerShiftX = (canvas.width - img.width * ratio) / 2;
		const centerShiftY = (canvas.height - img.height * ratio) / 2;

		// ctx.beginPath();
		// ctx.shadowColor = 'grey';
		// ctx.shadowOffsetX = 2;
		// ctx.shadowOffsetY = 2;
		// ctx.stroke();

		ctx.font = 'bold 60px Open Sans';
		ctx.direction = "rtl";
		ctx.textAlign = "center";
		ctx.fillStyle = "#000000";
		ctx.fillText(name, canvas.width / 2, height - 15);

		ctx.drawImage(
				img,
				0,
				0,
				img.width,
				img.height,
				centerShiftX,
				centerShiftY,
				img.width * ratio,
				img.height * ratio
		);
		ctx.rect(0,0,canvas.width,canvas.height);
		fs.writeFileSync(`./${publicDir}/${id}.svg`, canvas.toBuffer());
		fs.unlinkSync(`./images/${id}.svg`);
		fs.rmdirSync('./images')
	} catch (e) {
		if (e instanceof Error) {
			console.log(e.message);
		}
	}
};
export default qrToCanvas;

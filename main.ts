import express, {Response, Request, raw} from 'express';
import {qrToFile, qrToCanvas, createJson} from "./commands";
import fs from "fs";
const _port = 3000
const app = express();

app.use(express.static('public'));
app.get('/generate', async (req:Request,res:Response)=>{
	try {
		if(!fs.existsSync('data.json')){
			res.status(404).send('Json Not Found please generate Json first at http://localhost:3000')
		}
		const jsonData: any = await JSON.parse(fs.readFileSync('data.json', {encoding: 'utf-8'}));
		if(!jsonData) {
			res.status(404).send('Json Not Found please generate Json first at http://localhost:3000')
		}
		for(let data of jsonData){
			await qrToFile(data);
		}
		for(let data of jsonData){
			await qrToCanvas(data);
		}
		res.status(200).send(`
			<div style="background-color: #eff5ff; margin: 0; padding: 0">
				<h1 style="text-align: center">Job Done</h1>
			</div>`
			);
	} catch (e) {
		if (e instanceof Error) {
			return console.log(e.message);
		}
	}
});
app.get('/', async (req:Request,res:Response)=>{
	await createJson();
	res.status(200).send('done');
})

app.listen(_port,()=>{
	console.log('program running on port: '+ _port)
})


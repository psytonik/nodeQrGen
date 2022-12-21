import Excel from 'xlsx';
import fs from "fs";

export interface ExcelData {
	URL: string;
	NAME: string;
	ID: string;
}
const createJson = async () => {
	let JSON_DATA = []
	try {
		if(!Excel.readFile('urls.xlsx')){
			return new Error('File not found')
		}
		const ws: any = await Excel.readFile('urls.xlsx').Sheets['Sheet1'];
		const data: ExcelData[] = Excel.utils.sheet_to_json(ws);
		for(let d of data){
			JSON_DATA.push({
				link: d.URL,
				name: d.NAME,
				id: d.ID
			})
		}
		await fs.writeFileSync('data.json',JSON.stringify([...JSON_DATA]),{ "encoding": 'utf-8'});
	} catch (e) {
		if(e instanceof Error){
			console.log(e.message);
		}
	}
}
export default createJson;

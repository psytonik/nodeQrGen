import Excel from 'xlsx';
import fs from "fs";

export interface ExcelData {
	qr_code: string;
	retailer_name: string;
	retailer_code: string;
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
				link: d.qr_code,
				name: d.retailer_name,
				id: d.retailer_code
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

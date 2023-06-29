import { Button } from "@mui/material";
import { TagsProps } from "./_types";
import exportToExcel, { excelToJSON } from "./utils/excel";
import { compareArr } from "./utils";
const REQUIRED_COLUMNS: any = {
	DATA_ORIGIN: true,
	DATA_TYPE: true,
	DESCRIPTION: true,
	ID: true,
	DS_TAG_NAME: true,
	VL_FREQUENCY_COLLECTION_TAG: true,
	VL_MINIMUM_LIMIT: false,
	VL_MAXIMUM_LIMIT: false
};
const TAG_LIMIT = 90000;
const App = () => {
	function generateRandomDecimalInRangeFormatted(min: number, max: number, places: number) {
		let value = (Math.random() * (max - min + 1)) + min;
		return Number(value.toFixed(places));
	}
	const generateTagsJSON = (maxValue: number) => {
		let info: TagsProps[] = []
		for (let x = 0; x < maxValue; x++) {
			const obj: TagsProps = {
				DATA_ORIGIN: `Tag ${x + 1}`,
				DATA_TYPE: "string",
				DESCRIPTION: `DESCRIPTION ${x + 1}`,
				ID: x + 1,
				DS_TAG_NAME: `Tag ${x + 1}`,
				VL_FREQUENCY_COLLECTION_TAG: 15,
				VL_MINIMUM_LIMIT: generateRandomDecimalInRangeFormatted(1, 20, 0),
				VL_MAXIMUM_LIMIT: generateRandomDecimalInRangeFormatted(1, 20, 0),
			}
			info.push(obj);
		}
		return info;
	}
	const generateFile = async () => {
		console.time()
		const info = generateTagsJSON(100);
		await exportToExcel("Teste", info);
		console.timeEnd()
	}
	const fileHandler = async (ev: React.ChangeEvent<HTMLInputElement>) => {
		const input = ev.target as HTMLInputElement;
		if (!input.files) return false;

		const fileObj = input.files[0];
		if (!(fileObj.type === "application/vnd.ms-excel" || fileObj.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || fileObj.type === "text/csv")) return false;

		const temp: any[] = await excelToJSON(fileObj);
		if (temp.length === 0) {
			console.log("Você precisa preencher pelo menos 1 linha");
			return false;
		}
		if (temp.length > TAG_LIMIT) {
			console.log(`O limite máximo de tags é ${TAG_LIMIT} e sua planilha tem ${temp.length}`);
			return false;
		}
		const columns = Object.keys(REQUIRED_COLUMNS).filter(column => REQUIRED_COLUMNS[column]);
		console.log(columns)
		if(!compareArr(columns, Object.keys(temp[0]))){
			console.log(`As colunas não correspondem ao esperado! Colunas esperadas: ${columns.join(", ")}`);
			return false;
		}

		let errorMessage: string[] = [];
		Object.keys(REQUIRED_COLUMNS).forEach((columns: any) => {
			return temp.forEach((item, index) => {
				if(REQUIRED_COLUMNS[columns] && !item[columns]){
					errorMessage.push(`A coluna ${columns} não está preenchida na linha ${index + 2}`);
				}
			});
		});
		if(errorMessage.length > 0){
			let message = errorMessage.splice(0, 3).join("<br />");
				message += errorMessage.length > 0 ? ` + ${errorMessage.length} erro(s)` : "";
			console.log(message);
		}
		console.log(temp);
		return false;
	};
	return (
		<>
			<p>Faça o download do arquivo</p>
			{/* <ButtonGroupDownload options={["DEFAULT", "FULL"]} /> */}

			<Button
				onClick={generateFile}
			>Download</Button>

			<Button variant="contained" component="label">
				Upload
				<input hidden accept=".xlsx,.csv" type="file" onChange={fileHandler} />
			</Button>
		</>
	);
}

export default App;
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
export default async function exportToExcel<Props = any>(fileName: string, excelData: Props[]){
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, {bookType: "xlsx", type: "array"});
    const data = new Blob([excelBuffer], {type: fileType});

    FileSaver.saveAs(data, fileName);
}

export async function excelToJSON(file: File): Promise<any>{
    return new Promise((resolve) => {
        try{
            const reader = new FileReader();
            reader.onload = e => {
                const data = e.target?.result;
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                resolve(XLSX.utils.sheet_to_json(worksheet) || []);
            };
            reader.readAsArrayBuffer(file);
        }catch(err){ resolve([]) }
    });
}
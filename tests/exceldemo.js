const ExcelJs = require('exceljs');

async function excelReading(searchtext,replacetext, excelpath) {

   
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(excelpath);
    const worksheet = workbook.getWorksheet('Sheet1');

    const output =await readExcel(worksheet,searchtext);

    const cell = worksheet.getCell(output.row, output.column);
        cell.value = replacetext;
        await workbook.xlsx.writeFile(excelpath);

};

async function readExcel(worksheet,searchtext) {

     let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, cellNumber) => {
            //console.log(cell.value);
            //console.log(`Row ${rowNumber} Cell ${cellNumber} = ${cell.value}`);

            if (cell.value === searchtext) {
                output.row = rowNumber;
                output.column = cellNumber;
            }
        });
    });
    
     return output;
}
excelReading('Sachin','pankaj','C:\\Users\\Pankaj\\Playwright\\PlayWrightPractice\\exceldata\\excelPractices.xlsx');
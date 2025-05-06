import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const ExportToExcel = async (data, sheetName = "Report") => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  // Set columns based on keys of first object
  const columns = Object.keys(data[0]).map((key) => ({
    header: key.charAt(0).toUpperCase() + key.slice(1),
    key: key,
    width: 20,
  }));

  worksheet.columns = columns;

  // Add data rows
  data.forEach((item) => {
    worksheet.addRow(item);
  });

  // Make header bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  // Generate file and trigger download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `${sheetName}.xlsx`);
};

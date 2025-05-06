// utils/exportExcel.js
import XlsxPopulate from "xlsx-populate";

export const ExportUserDetails = async (data) => {
  const fileName = "Arksh_Food_User";

  const workbook = await XlsxPopulate.fromBlankAsync();
  const sheet = workbook.sheet(0);

  // Set headers
  const headers = Object.keys(data[0]);
  headers.forEach((header, index) => {
    sheet.cell(1, index + 1).value(header);
  });

  // Set data rows
  data.forEach((row, rowIndex) => {
    headers.forEach((header, colIndex) => {
      sheet.cell(rowIndex + 2, colIndex + 1).value(row[header]);
    });
  });

  // Generate the file
  const blob = await workbook.outputAsync();
  const blobUrl = window.URL.createObjectURL(new Blob([blob]));

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = `${fileName}.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

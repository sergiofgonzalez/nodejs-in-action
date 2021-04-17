
export function mapFilesToDataRows(files) {
  const fileDataRows = files.map((file, index) => {
    const fileDataRow = {
      '#': index
    };
    for (const fileProp in file) {
      fileDataRow[fileProp] = file[fileProp];
    }

    return fileDataRow;
  });
  return fileDataRows;
}
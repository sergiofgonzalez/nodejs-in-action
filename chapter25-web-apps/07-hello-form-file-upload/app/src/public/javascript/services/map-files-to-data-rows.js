
export function mapFilesToDataRows(files) {
  const fileInfos = files.map((filename, index) => {
    return {
      '#': index,
      'Filename': filename
    };
  });
  return fileInfos;
}
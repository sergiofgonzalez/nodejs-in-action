'use strict';



(async () => {
  const response = await fetch('/rest/report');
  const report = await response.json();

  const output = document.querySelector('#textareaoutput');
  console.log(report);

  const formattedOutput =
  `number of rows: ${ report.numRows }
number of columns: ${ report.numColumns }
column names: ${ report.columnNames.join(' ,') }`;  
  
  output.value = formattedOutput;
})();

let tableNumColumns = -1;

function buildTable(elements, tableClassName = 'table', headerClassName) {
  const table = document.createElement('table');
  table.className = tableClassName;
  table.appendChild(buildTableHeader(elements, headerClassName));

  const tableBody = document.createElement('tbody');
  for (const row of elements) {
    tableBody.appendChild(buildTableDataRow(row));
  }

  table.appendChild(tableBody);
  return table;
}

function buildTableHeader(elements, className) {
  if (!elements || elements.length === 0) {
    throw new Error(`buildTableHeader: an array with at least one element was expected`);
  }

  const thead = document.createElement('thead');
  if (className) {
    thead.className = className;
  }
  const headerItems = Object.keys(elements[0]);
  tableNumColumns = headerItems.length;
  const tr = document.createElement('tr');
  for (const headerItem of headerItems) {
    const th = document.createElement('th');
    th.appendChild(document.createTextNode(headerItem));
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  return thead;
}

function buildTableDataRow(dataRowItems) {
  if (!dataRowItems || Object.keys(dataRowItems).length !== tableNumColumns) {
    throw new Error(`buildTableDataRow: an object with ${ tableNumColumns } columns was expected`);
  }

  const tr = document.createElement('tr');
  for (const [, dataRowItemValue] of Object.entries(dataRowItems)) {
    const td = document.createElement('td');
    td.appendChild(document.createTextNode(dataRowItemValue));
    tr.appendChild(td);
  }
  return tr;
}

export { buildTable };
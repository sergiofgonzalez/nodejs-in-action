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

  // Additional column for the download icon
  const th = document.createElement('th');
  th.appendChild(document.createTextNode('Actions'));
  tr.appendChild(th);

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

  const td = document.createElement('td');

  // appending the download link (always present)
  let a = document.createElement('a');
  a.href = '#';
  a.className = 'badge badge-light';

  let span = document.createElement('span');
  span.className = 'oi oi-cloud-download';
  span.title = `download ${ dataRowItems['Key'] }`;
  span.dataset.action = 'download';
  span.dataset.filename = dataRowItems['Key'];

  a.appendChild(span);
  td.appendChild(a);

  // appending the view link (only present for images)
  if (dataRowItems['MimeType'].startsWith('image/')) {
    a = document.createElement('a');
    a.href = '#';
    a.className = 'badge badge-light';
    span = document.createElement('span');
    span.className = 'oi oi-eye';
    span.title = `view ${ dataRowItems['Key'] }`;
    span.dataset.action = 'view';
    span.dataset.filename = dataRowItems['Key'];
    a.disabled = true;
    a.appendChild(span);
    td.appendChild(a);
  }

  tr.appendChild(td);

  return tr;
}

export { buildTable };
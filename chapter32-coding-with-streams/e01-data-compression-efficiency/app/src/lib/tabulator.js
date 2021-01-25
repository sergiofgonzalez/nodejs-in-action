import { isNumber } from './is-number.js';

export class Tabulator {
  constructor(header, dataRows) {
    this.cellCount = header.length;
    this.cellWidths = [];
    header.forEach(headerCell => {
      this.cellWidths.push(headerCell.length + 2);
    });

    dataRows.forEach(dataRowObj => {
      for (let i = 0; i < Object.keys(dataRowObj).length; i++) {
        const propertyName = Object.keys(dataRowObj)[i];
        const cellContentsStr = String(dataRowObj[propertyName]);
        const cellContentsLength = cellContentsStr.length + 2;
        this.cellWidths[i] = Math.max(this.cellWidths[i], cellContentsLength);
      }
    });

    this.dataRows = [];
    dataRows.forEach(dataRowObj => {
      const dataRowStrings = [];
      for (let i = 0; i < Object.keys(dataRowObj).length; i++) {
        const propertyName = Object.keys(dataRowObj)[i];
        const cellContentsStr = String(dataRowObj[propertyName]);
        if (isNumber(dataRowObj[propertyName])) {
          dataRowStrings.push(cellContentsStr.padStart(this.cellWidths[i] - 1) + ' ');
        } else {
          dataRowStrings.push(' ' + cellContentsStr.padEnd(this.cellWidths[i] - 1));
        }
      }
      this.dataRows.push(dataRowStrings);
    });

    this.headerCells = header.map((headerCell, index) => ' ' + headerCell.padEnd(this.cellWidths[index] - 1));
  }

  buildTable() {
    const tableRows = [];
    // first row (the one that define the boundaries of the table)
    const firstRowComponents = [];
    for (const cellWidth of this.cellWidths) {
      firstRowComponents.push('─'.repeat(cellWidth));
    }
    const firstRow = '┌' + firstRowComponents.join('┬') + '┐';
    tableRows.push(firstRow);

    // second row (the one with the header fields)
    const headerRow = '│' + this.headerCells.join('│') + '│';
    tableRows.push(headerRow);

    // third row (the one underneath the header)
    const thirdRow = '├' + firstRowComponents.join('┼') + '┤';
    tableRows.push(thirdRow);

    // now the rows of data
    this.dataRows.forEach(dataRow => {
      tableRows.push('│' + dataRow.join('│') + '│');
    });

    // now the last row which delimits the table
    const lastRow = '└' + firstRowComponents.join('┴') + '┘';
    tableRows.push(lastRow);

    this.table = tableRows.join('\n');

    return this;
  }

  display() {
    console.log(this.table);
  }
}
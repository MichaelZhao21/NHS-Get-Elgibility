var FIRST_ROW = 3; // The row in which the first cell to scan is in (Row 3 is the '111111' example)
var DIVIDER_ROW = 5; // The row in which that black cell is in (The blank one)
var MASTER_SHEET = 0; // The sheet with all of the information
var MESSAGES_SHEET = 1; // The sheet with the messages table
var TEST_COL = 1; // The column used to check if there is another name (1st col)
var ID_NUM_COL = 3; // The column with the id nums
var STATUS_COL = 4; // The column with the statuses
var FIRST_MESSAGES_ROW = 2; //The first row of the messages sheet
var sheet;

function doGet() {
  file = HtmlService.createTemplateFromFile('Index').evaluate();
  return file;
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getStatus(idNum) {
  var output = retrieveMessages();
  sheet = getSheetNumber(MASTER_SHEET);
  var currRow = FIRST_ROW;
  var isCell;
  while (isAnotherRow(currRow)) {
    isCell = getStatusIfIdNumIsRow(idNum, currRow);
    if (isCell != null) {
      output.status = isCell;
      return output;
    }
    currRow++;
  }
  output.status = "missing";
  return output;
}

function getSheetNumber(num) {
  var ss = SpreadsheetApp.getActive();
  return ss.getSheets()[num];
}

function isAnotherRow(currRow) {
  var testCell = sheet.getRange(currRow, TEST_COL);
  if (sheet == MASTER_SHEET && currRow == DIVIDER_ROW) {
    return true;
  }
  return (testCell.getDisplayValue() != "");
}

function getStatusIfIdNumIsRow(idNum, currRow) {
  var currCell = sheet.getRange(currRow, ID_NUM_COL);
  if (idNum == parseInt(currCell.getDisplayValue()))
    return sheet.getRange(currRow, STATUS_COL).getDisplayValue();
  return null;
}

function retrieveMessages() {
  var output = {};
  output.displayMaps = [];
  sheet = getSheetNumber(MESSAGES_SHEET);
  var rowCount = FIRST_MESSAGES_ROW;
  while (isAnotherRow(rowCount)) {
    output.displayMaps.push(getMessageRow(rowCount));
  }
  return output;
}

function getMessageRow(row) {
  var rowOutput = [];
  rowOutput.push(sheet.getRange(currRow, 1).getDisplayValue());
  rowOutput.push(sheet.getRange(currRow, 2).getDisplayValue());
  rowOutput.push(sheet.getRange(currRow, 3).getBackground());
  return rowOutput;
}

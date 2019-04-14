var FIRST_ROW = 3; // The row in which the first cell to scan is in (Row 3 is the '111111' example)
var DIVIDER_ROW = 5; // The row in which that black cell is in (The blank one)
var MASTER_SHEET = 0; // The sheet with all of the information
var MESSAGES_SHEET = 1; // The sheet with the messages table
var TEST_COL = 1; // The column used to check if there is another name (1st col)
var ID_NUM_COL = 3; // The column with the id nums
var STATUS_COL = 4; // The column with the statuses
var FIRST_MESSAGES_ROW = 2; //The first row of the messages sheet

var sheet;
var sheetNum;

function doGet() {
  file = HtmlService.createTemplateFromFile('Index').evaluate();
  return file;
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getStatus(idNum) {
  var output = retrieveMessages();
  sheetNum = MASTER_SHEET;
  sheet = getSheetNumber();
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

function getSheetNumber() {
  var ss = SpreadsheetApp.getActive();
  return ss.getSheets()[sheetNum];
}

function isAnotherRow(currRow) {
  var testCell = sheet.getRange(currRow, TEST_COL);
  if (sheetNum == MASTER_SHEET && currRow == DIVIDER_ROW) {
    return true;
  }
  return (testCell.getDisplayValue() != "");
}

function getStatusIfIdNumIsRow(idNum, currRow) {
  var currCell = sheet.getRange(currRow, ID_NUM_COL);
  if (idNum == parseInt(currCell.getDisplayValue()))
    return sheet.getRange(currRow, STATUS_COL).getDisplayValue().toLowerCase();
  return null;
}

function retrieveMessages() {
  var output = {};
  output.displayMaps = [];
  sheetNum = MESSAGES_SHEET;
  sheet = getSheetNumber();
  var rowCount = FIRST_MESSAGES_ROW;
  while (isAnotherRow(rowCount)) {
    output.displayMaps.push(getMessageRow(rowCount));
    rowCount++;
  }
  return output;
}

function getMessageRow(row) {
  var rowOutput = [];
  rowOutput.push(sheet.getRange(row, 1).getDisplayValue().toLowerCase());
  rowOutput.push(sheet.getRange(row, 2).getDisplayValue());
  rowOutput.push(sheet.getRange(row, 3).getBackground());
  return rowOutput;
}

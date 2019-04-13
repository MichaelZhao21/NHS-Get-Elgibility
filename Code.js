var FIRST_ROW = 3; // The row in which the first cell to scan is in (Row 3 is the '111111' example)
var DIVIDER_ROW = 5; // The row in which that black cell is in (The blank one)
var MASTER_SHEET = 0; // The sheet with all of the information
var MESSAGES_SHEET = 1; // The sheet with the messages table
var sheet;

function doGet() {
  file = HtmlService.createTemplateFromFile('Index').evaluate();
  return file;
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getStatus(idNum) {
  sheet = getSheetNumber(0);
  var currRow = FIRST_ROW;
  var isCell;
  while (isAnotherRow(currRow)) {
    isCell = getStatusIfIdNumIsRow(idNum, currRow);
    if (isCell != null) return isCell;
    currRow++;
  }
  return "missing";
}

function getSheetNumber(num) {
  var ss = SpreadsheetApp.getActive();
  return ss.getSheets()[num];
}

function isAnotherRow(currRow) {
  var testCell = sheet.getRange(currRow, 4);
  return (testCell.getDisplayValue() != "" || currRow == DIVIDER_ROW);
}

function getStatusIfIdNumIsRow(idNum, currRow) {
  var currCell = sheet.getRange(currRow, 3);
  if (idNum == parseInt(currCell.getDisplayValue()))
    return sheet.getRange(currRow, 4).getDisplayValue();
  return null;
}

function doGet() {
  file = HtmlService.createTemplateFromFile('Index').evaluate();
  return file;
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getStatus(idNum) {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheets()[0];
  var cellCount = 2;
  var currCell = sheet.getRange(cellCount,2);
  //increment cellcount and get next cell if there is another cell
  while (currCell.getDisplayValue() != "") {
    //check if cell contains the requested id number
    console.log(currCell.getDisplayValue());
    if (idNum == parseInt(currCell.getDisplayValue())) {
      return sheet.getRange(cellCount, 3).getDisplayValue();
    }
    cellCount++;
    currCell = sheet.getRange(cellCount, 2);
  }
  return "missing";
}

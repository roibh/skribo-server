/*
Skribo managed script
$SCRIPTNAME$
$SCRIPTDESCRIPTION$
$TIMESTAMP$
*/

var SkriboEmbeder = "$SERVERURL$/$SCRIPTURL$";
function main() {
    
    SpreadsheetApp.getActive();
    DriveApp.getRootFolder();
    Logger.log("starting skribo");
    try {
        eval((UrlFetchApp.fetch(SkriboEmbeder)).getContentText());
        Logger.log("evaluated skribo"); 
        skribo();
    } catch (error) {
        Logger.log(error);
    }
    Logger.log("finished skribo");
}


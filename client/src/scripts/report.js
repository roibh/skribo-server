function skribo() {
    function go(account) {
        if (account.getName() !== "Cancelled Account") {
            try {
                var report = AdWordsApp.report("SELECT Clicks, Impressions, AverageCpc, HourOfDay FROM ACCOUNT_PERFORMANCE_REPORT DURING LAST_MONTH");
                const sheet = spreadsheet.insertSheet(account.getName());
                report.exportToSheet(sheet);
            }
            catch (error) {
                Logger.log(error);
            }
        }

    }
    Logger.log("creating spreadsheet");
    var spreadsheet = SpreadsheetApp.create("Report output");
    Logger.log("created spreadsheet");


    SkriboForAccounts(go, 5);
    var sheet = spreadsheet.getSheetByName("sheet1");
    spreadsheet.deleteSheet(sheet);
    Logger.log("Report available at " + spreadsheet.getUrl());

}



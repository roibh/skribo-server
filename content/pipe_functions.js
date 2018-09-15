
/*Skribo functions for adwords scripts
setting up some functions*/

var SkriboLogUrl = "$SERVERURL$$LOGURL$";
var SkriboResultUrl = "$SERVERURL$$RESULTURL$";
var SkriboSyncUrl = "$SERVERURL$$SYNCURL$";

var SkriboData = JSON.parse($SKRIBODATA$);
var currentDate = Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd HH:mm:ss");


function SkriboForAccounts(cb, limit) {
    var accountSelector = MccApp.accounts();
    if (limit) {
        accountSelector = MccApp.accounts().withLimit(limit);
    }
    var accountIterator = accountSelector.get();

    // Iterate through the list of accounts
    while (accountIterator.hasNext()) {
        var account = accountIterator.next();
        Logger.log("selecting account:" + account.getName());
        // Select the client account.
        MccApp.select(account);
        Logger.log("calling account callback");
        cb(account);
    }
}


function SkriboLog(message) {
    var options = {
        "method": "post",
        "payload": {
            "time": currentDate,
            "message": message,
            "accountId": AdWordsApp.currentAccount().getCustomerId(),
            "accountName": AdWordsApp.currentAccount().getName()
        }
    };
    UrlFetchApp.fetch(SkriboLogUrl, options);
}

function SkriboPostResults(results, reportType) {
    var options = {
        "muteHttpExceptions": false,
        "method": "post",
        "payload": {
            "reportType": reportType || 'embeded',
            "results": results,
            "variables": null

        }
    };
    UrlFetchApp.fetch(SkriboResultUrl, options);
}

var Util = {
    timespanToRange: function (timespan) {
        switch (timespan) {
            case 'LAST_MONTH':
                var date = new Date();
                date.setDate(date.getDate() - 30);
                var dateString = date.toISOString().split('T')[0];
                return { start: dateString, end: new Date().split('T')[0] }
        }
    }
}
/*Skribo end pipe functions*/


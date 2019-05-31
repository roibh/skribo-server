
/*Skribo functions for adwords scripts
setting up some functions*/

var SkriboLogUrl = "$SERVERURL$$LOGURL$";
var SkriboResultUrl = "$SERVERURL$$RESULTURL$";
var SkriboSyncUrl = "$SERVERURL$$SYNCURL$";

var SkriboData = JSON.parse($SKRIBODATA$);
var currentDate = Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd HH:mm:ss");


function SkriboForAccounts(cb, limit_or_list) {
    var accountSelector;

    if (typeof limit_or_list === 'object') {
        accountSelector = MccApp.accounts().withIds(Object.keys(limit_or_list));
    } else if (typeof limit_or_list === 'number') {
        accountSelector = MccApp.accounts().withLimit(limit_or_list);
    }

    if (!accountSelector) {
        return;
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
    if (!reportType) {
        reportType = 'embeded';
    }
    var options = {
        "muteHttpExceptions": false,
        "method": "post",
        "payload": {
            "reportType": reportType,
            "results": results,
            "variables": null
        }
    };
    Logger.log(JSON.stringify(options));
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


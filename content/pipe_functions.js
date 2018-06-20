
/*Skribo functions for adwords scripts
setting up some functions*/

var SkriboLog = "$SERVERURL$$LOGURL$";
var SkriboResult = "$SERVERURL$$RESULTURL$";
var SkriboSync = "$SERVERURL$$SYNCURL$";


function SkriboForAccounts(cb, limit) {
    var accountSelector = MccApp.accounts();
    if (limit) {
        accountSelector = MccApp.accounts().withLimit(limit);
    }
    var accountIterator = accountSelector.get();

    // Iterate through the list of accounts
    while (accountIterator.hasNext()) {
        var account = accountIterator.next();
        Logger.log(account);
        // Select the client account.
        MccApp.select(account);
        cb(account);
    }
}


function log(message) {
    var options = {
        "method": "post",
        "payload": {
            "time": currentDate,
            "message": message,
            "accountId": AdWordsApp.currentAccount().getCustomerId(),
            "accountName": AdWordsApp.currentAccount().getName()
        }
    };
    UrlFetchApp.fetch(SkriboLog, options);
}

function SkriboPostResults(results) {
    var options = {
        "method": "post",
        "payload": {
            "results": results,
            "variables": null

        }
    };
    UrlFetchApp.fetch(SkriboResult, options);
}

/*Skribo end pipe functions*/


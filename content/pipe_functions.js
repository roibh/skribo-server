var SkriboResult;


function SkriboForAccounts(cb) {
    var accountSelector = MccApp.accounts();
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


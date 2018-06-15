class Skribo {
    ForAccounts(cb) {
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
}
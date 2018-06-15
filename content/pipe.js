var isMcc = 0;
var urlLog = "https://skribo.herokuapp.com/$SCRIPTURL$/log";
var currentDate = Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd HH:mm:ss");
var embeder = "https://skribo.herokuapp.com/$SCRIPTURL$";
var Skribo = JSON.parse($SKRIBODATA$);

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
    UrlFetchApp.fetch(urlLog, options);
}

function main() {
    log("starting script");
    try {
        eval((UrlFetchApp.fetch(embeder)).getContentText());
        skribo();
    } catch (error) {
        log(error);
    }

    log("ending script");

}


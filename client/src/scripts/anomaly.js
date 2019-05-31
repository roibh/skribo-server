var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
    'Saturday', 'Sunday'];

/**
* Configuration to be used for running reports.
*/
var REPORTING_OPTIONS = {
    // Comment out the following line to default to the latest reporting version.
    apiVersion: 'v201802'
};

function skribo() {
    SkriboForAccounts(go, 2);
}

function go() {
    var now = new Date();
    // Basic reporting statistics are usually available with no more than a 3-hour
    // delay.
    var upTo = new Date(now.getTime() - 3 * 3600 * 1000);
    var upToHour = parseInt(getDateStringInTimeZone('h', upTo));
    var impressionsThreshold = 100, clicksThreshold = 100, conversionsThreshold = 10, costThreshold = 1;
    var weeks = 4;
    var dateRangeToCheck = getDateStringInPast(0, upTo);
    var dateRangeToEnd = getDateStringInPast(1, upTo);
    var dateRangeToStart = getDateStringInPast(1 + weeks * 7, upTo);
    var fields = 'HourOfDay,DayOfWeek,Clicks,Impressions,Conversions,Cost';
    var todayQuery = 'SELECT ' + fields +
        ' FROM ACCOUNT_PERFORMANCE_REPORT DURING ' + dateRangeToCheck + ',' +
        dateRangeToCheck;
    var pastQuery = 'SELECT ' + fields +
        ' FROM ACCOUNT_PERFORMANCE_REPORT WHERE DayOfWeek=' +
        DAYS[getDateStringInTimeZone('u', now)].toUpperCase() +
        ' DURING ' + dateRangeToStart + ',' + dateRangeToEnd;

    var todayStats = getReportStats(todayQuery, upToHour, 1);
    var pastStats = getReportStats(pastQuery, upToHour, weeks);

    var statsExist = true;
    if (typeof todayStats === 'undefined' || typeof pastStats === 'undefined') {
        statsExist = false;
    }

    var alertText = [];
    if (statsExist && todayStats.impressions < pastStats.impressions * impressionsThreshold) {
        var ImpressionsAlert = '    Impressions are too low: ' +
            todayStats.impressions + ' impressions by ' + upToHour +
            ':00, expecting at least ' +
            parseInt(pastStats.impressions * impressionsThreshold);
        writeAlert('impressions_alert', alertText, ImpressionsAlert,
            upToHour);
    }
    if (statsExist &&
        todayStats.clicks < pastStats.clicks * clicksThreshold) {
        var clickAlert = '    Clicks are too low: ' + todayStats.clicks +
            ' clicks by ' + upToHour + ':00, expecting at least ' +
            (pastStats.clicks * clicksThreshold).toFixed(1);
        writeAlert('clicks_alert', alertText, clickAlert, upToHour);
    }
    if (statsExist &&
        todayStats.conversions < pastStats.conversions * conversionsThreshold) {
        var conversionsAlert =
            '    Conversions are too low: ' + todayStats.conversions +
            ' conversions by ' + upToHour + ':00, expecting at least ' +
            (pastStats.conversions * conversionsThreshold).toFixed(1);
        writeAlert(
            'conversions_alert', alertText, conversionsAlert,
            upToHour);
    }
    if (statsExist &&
        todayStats.cost > pastStats.cost * costThreshold) {
        var costAlert = '    Cost is too high: ' + todayStats.cost + ' ' +
            AdWordsApp.currentAccount().getCurrencyCode() + ' by ' + upToHour +
            ':00, expecting at most ' +
            (pastStats.cost * costThreshold).toFixed(2);
        writeAlert('cost_alert', alertText, costAlert, upToHour);
    }



    writeDataToSpreadsheet(now, statsExist, todayStats, pastStats,
        AdWordsApp.currentAccount().getCustomerId());
}













function toFloat(value) {
    value = value.toString().replace(/,/g, '');
    return parseFloat(value);
}

function parseField(value) {
    if (value == 'No alert') {
        return null;
    } else {
        return toFloat(value);
    }
}

/**
* Runs an AdWords report query for a number of weeks and return the average
* values for the stats.
*
* @param {string} query The formatted report query.
* @param {int} hours The limit hour of day for considering the report rows.
* @param {int} weeks The number of weeks for the past stats.
* @return {Object} An object containing the average values for the stats.
*/
function getReportStats(query, hours, weeks) {
    var reportRows = [];
    var report = AdWordsApp.report(query, REPORTING_OPTIONS);
    var rows = report.rows();
    while (rows.hasNext()) {
        reportRows.push(rows.next());
    }
    return accumulateRows(reportRows, hours, weeks);
}

function accumulateRows(rows, hours, weeks) {
    var result = { clicks: 0, impressions: 0, conversions: 0, cost: 0 };

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var hour = row['HourOfDay'];
        if (hour < hours) {
            result = addRow(row, result, 1 / weeks);
        }
    }
    return result;
}

function addRow(row, previous, coefficient) {
    if (!coefficient) {
        coefficient = 1;
    }
    if (row == null) {
        row = { Clicks: 0, Impressions: 0, Conversions: 0, Cost: 0 };
    }
    if (!previous) {
        return {
            clicks: parseInt(row['Clicks']) * coefficient,
            impressions: parseInt(row['Impressions']) * coefficient,
            conversions: parseInt(row['Conversions']) * coefficient,
            cost: toFloat(row['Cost']) * coefficient
        };
    } else {
        return {
            clicks: parseInt(row['Clicks']) * coefficient + previous.clicks,
            impressions:
                parseInt(row['Impressions']) * coefficient + previous.impressions,
            conversions:
                parseInt(row['Conversions']) * coefficient + previous.conversions,
            cost: toFloat(row['Cost']) * coefficient + previous.cost
        };
    }
}

/**
* Produces a formatted string representing a date in the past of a given date.
*
* @param {number} numDays The number of days in the past.
* @param {date} date A date object. Defaults to the current date.
* @return {string} A formatted string in the past of the given date.
*/
function getDateStringInPast(numDays, date) {
    date = date || new Date();
    var MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
    var past = new Date(date.getTime() - numDays * MILLIS_PER_DAY);
    return getDateStringInTimeZone('yyyyMMdd', past);
}


/**
* Produces a formatted string representing a given date in a given time zone.
*
* @param {string} format A format specifier for the string to be produced.
* @param {date} date A date object. Defaults to the current date.
* @param {string} timeZone A time zone. Defaults to the account's time zone.
* @return {string} A formatted string of the given date in the given time zone.
*/
function getDateStringInTimeZone(format, date, timeZone) {
    date = date || new Date();
    timeZone = timeZone || AdWordsApp.currentAccount().getTimeZone();
    return Utilities.formatDate(date, timeZone, format);
}



/**
* Writes the alert time in the spreadsheet and push the alert message to the
* list of messages.
*
* @param {Spreadsheet} spreadsheet The dashboard spreadsheet.
* @param {string} rangeName The named range in the spreadsheet.
* @param {Array<string>} alertText The list of alert messages.
* @param {string} alertMessage The alert message.
* @param {int} hour The limit hour used to get the stats.
*/
function writeAlert(rangeName, alertText, alertMessage, hour) {
    log(alertMessage);
    //   var range = spreadsheet.getRangeByName(rangeName);
    //   if (!range.getValue() || range.getValue().length == 0) {
    //     alertText.push(alertMessage);
    //     range.setValue('Alerting ' + hour + ':00');
    //   }
}

/**
* Writes the data to the spreadsheet.
*
* @param {Spreadsheet} spreadsheet The dashboard spreadsheet.
* @param {Date} now The date corresponding to the running time of the script.
* @param {boolean} statsExist A boolean that indicates the existence of stats.
* @param {Object} todayStats The stats for today.
* @param {Object} pastStats The past stats for the period defined in the
* spreadsheet.
* @param {string} accountId The account ID.
*/
function writeDataToSpreadsheet(now, statsExist, todayStats,
    pastStats, accountId) {


    if (statsExist) {
        var dataRows = [
            [todayStats.impressions, pastStats.impressions.toFixed(0)],
            [todayStats.clicks, pastStats.clicks.toFixed(1)],
            [todayStats.conversions, pastStats.conversions.toFixed(1)],
            [todayStats.cost, pastStats.cost.toFixed(2)]
        ];
        SkriboPostResults(JSON.stringify(dataRows));

    }
}

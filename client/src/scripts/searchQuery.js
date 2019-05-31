
/**
*
* Search Query Mining Tool
*
* This script calculates the contribution of each word found in the search query report
* and outputs a report into a Google Doc spreadsheet.
*
* Version: 1.0
* Google Apps Script maintained on brainlabsdigital.com
*
**/
function skribo(){
    function go() {

        //////////////////////////////////////////////////////////////////////////////
        // Options
    
        var startDate = "2015-04-01";
        var endDate = "2015-04-30";
        // The start and end date of the date range for your search query data
        // Format is yyyy-mm-dd
    
        var currencySymbol = "£";
        // The currency symbol used for formatting. For example "£", "$" or "€".
    
        var campaignNameContains = "";
        // Use this if you only want to look at some campaigns
        // such as campaigns with names containing 'Brand' or 'Shopping'.
        // Leave as "" if not wanted.
    
        
        // The URL of the Google Doc the results will be put into.
    
    
        //////////////////////////////////////////////////////////////////////////////
    
        // Thresholds
    
        var impressionThreshold = 10;
        var clickThreshold = 0;
        var costThreshold = 0;
        var conversionThreshold = 0;
        // Words will be ignored if their statistics are lower than any of these thresholds
    
    
        //////////////////////////////////////////////////////////////////////////////
        // Find the negative keywords
    
        var negativesByGroup = [];
        var negativesByCampaign = [];
        var sharedSetData = [];
        var sharedSetNames = [];
        var sharedSetCampaigns = [];
        var dateRange = startDate.replace(/-/g, "") + "," + endDate.replace(/-/g, "");
        var activeCampaignIds = [];
    
        // Gather ad group level negative keywords
    
        var keywordReport = AdWordsApp.report(
            "SELECT CampaignId, AdGroupId, KeywordText, KeywordMatchType " +
            "FROM   KEYWORDS_PERFORMANCE_REPORT " +
            "WHERE CampaignStatus = ENABLED AND AdGroupStatus = ENABLED AND Status = ENABLED AND IsNegative = TRUE " +
            "AND CampaignName CONTAINS_IGNORE_CASE '" + campaignNameContains + "' " +
            "DURING " + dateRange);
    
        var keywordRows = keywordReport.rows();
        while (keywordRows.hasNext()) {
            var keywordRow = keywordRows.next();
    
            if (negativesByGroup[keywordRow["AdGroupId"]] == undefined) {
                negativesByGroup[keywordRow["AdGroupId"]] =
                    [[keywordRow["KeywordText"].toLowerCase(), keywordRow["KeywordMatchType"].toLowerCase()]];
            } else {
    
                negativesByGroup[keywordRow["AdGroupId"]].push([keywordRow["KeywordText"].toLowerCase(), keywordRow["KeywordMatchType"].toLowerCase()]);
            }
    
            if (activeCampaignIds.indexOf(keywordRow["CampaignId"]) < 0) {
                activeCampaignIds.push(keywordRow["CampaignId"]);
            }
        }//end while
    
        // Gather campaign level negative keywords
    
        var campaignNegReport = AdWordsApp.report(
            "SELECT CampaignId, KeywordText, KeywordMatchType " +
            "FROM   CAMPAIGN_NEGATIVE_KEYWORDS_PERFORMANCE_REPORT " +
            "WHERE  IsNegative = TRUE " +
            "AND CampaignId IN [" + activeCampaignIds.join(",") + "]"
        );
        var campaignNegativeRows = campaignNegReport.rows();
        while (campaignNegativeRows.hasNext()) {
            var campaignNegativeRow = campaignNegativeRows.next();
    
            if (negativesByCampaign[campaignNegativeRow["CampaignId"]] == undefined) {
                negativesByCampaign[campaignNegativeRow["CampaignId"]] = [[campaignNegativeRow["KeywordText"].toLowerCase(), campaignNegativeRow["KeywordMatchType"].toLowerCase()]];
            } else {
    
                negativesByCampaign[campaignNegativeRow["CampaignId"]].push([campaignNegativeRow["KeywordText"].toLowerCase(), campaignNegativeRow["KeywordMatchType"].toLowerCase()]);
            }
        }//end while
    
        // Find which campaigns use shared negative keyword sets
    
        var campaignSharedReport = AdWordsApp.report(
            "SELECT CampaignName, CampaignId, SharedSetName, SharedSetType, Status " +
            "FROM   CAMPAIGN_SHARED_SET_REPORT " +
            "WHERE SharedSetType = NEGATIVE_KEYWORDS " +
            "AND CampaignName CONTAINS_IGNORE_CASE '" + campaignNameContains + "'");
        var campaignSharedRows = campaignSharedReport.rows();
        while (campaignSharedRows.hasNext()) {
            var campaignSharedRow = campaignSharedRows.next();
    
            if (sharedSetCampaigns[campaignSharedRow["SharedSetName"]] == undefined) {
                sharedSetCampaigns[campaignSharedRow["SharedSetName"]] = [campaignSharedRow["CampaignId"]];
            } else {
    
                sharedSetCampaigns[campaignSharedRow["SharedSetName"]].push(campaignSharedRow["CampaignId"]);
            }
        }//end while
    
        // Map the shared sets' IDs (used in the criteria report below)
        // to their names (used in the campaign report above)
    
        var sharedSetReport = AdWordsApp.report(
            "SELECT Name, SharedSetId, MemberCount, ReferenceCount, Type " +
            "FROM   SHARED_SET_REPORT " +
            "WHERE ReferenceCount > 0 AND Type = NEGATIVE_KEYWORDS ");
        var sharedSetRows = sharedSetReport.rows();
        while (sharedSetRows.hasNext()) {
            var sharedSetRow = sharedSetRows.next();
            sharedSetNames[sharedSetRow["SharedSetId"]] = sharedSetRow["Name"];
        }//end while
    
        // Collect the negative keyword text from the sets,
        // and record it as a campaign level negative in the campaigns that use the set
    
        var sharedSetReport = AdWordsApp.report(
            "SELECT SharedSetId, KeywordMatchType, KeywordText " +
            "FROM   SHARED_SET_CRITERIA_REPORT ");
        var sharedSetRows = sharedSetReport.rows();
        while (sharedSetRows.hasNext()) {
            var sharedSetRow = sharedSetRows.next();
            var setName = sharedSetNames[sharedSetRow["SharedSetId"]];
            if (sharedSetCampaigns[setName] !== undefined) {
                for (var i = 0; i < sharedSetCampaigns[setName].length; i++) {
                    var campaignId = sharedSetCampaigns[setName][i];
                    if (negativesByCampaign[campaignId] == undefined) {
                        negativesByCampaign[campaignId] =
                            [[sharedSetRow["KeywordText"].toLowerCase(), sharedSetRow["KeywordMatchType"].toLowerCase()]];
                    } else {
    
                        negativesByCampaign[campaignId].push([sharedSetRow["KeywordText"].toLowerCase(), sharedSetRow["KeywordMatchType"].toLowerCase()]);
                    }
                }
            }
        }//end while
    
        Logger.log("Finished negative keyword lists.");
    
        //////////////////////////////////////////////////////////////////////////////
        // Defines the statistics to download or calculate, and their formatting
    
        var statColumns = ["Clicks", "Impressions", "Cost", "ConvertedClicks", "ConversionValue"];
        var calculatedStats = [["CTR", "Clicks", "Impressions"],
        ["CPC", "Cost", "Clicks"],
        ["Conv. Rate", "ConvertedClicks", "Clicks"],
        ["Cost / conv.", "Cost", "ConvertedClicks"],
        ["Conv. value/cost", "ConversionValue", "Cost"]]
        var currencyFormat = currencySymbol + "#,##0.00";
        var formatting = ["#,##0", "#,##0", currencyFormat, "#,##0", currencyFormat, "0.00%", currencyFormat, "0.00%", currencyFormat, "0.00%"];
    
    
        //////////////////////////////////////////////////////////////////////////////
        // Go through the search query report, remove searches already excluded by negatives
        // record the performance of each word in each remaining query
    
        var queryReport = AdWordsApp.report(
            "SELECT CampaignName, CampaignId, AdGroupId, AdGroupName, Query, " + statColumns.join(", ") + " " +
            "FROM SEARCH_QUERY_PERFORMANCE_REPORT " +
            "WHERE CampaignStatus = ENABLED AND AdGroupStatus = ENABLED " +
            "AND CampaignName CONTAINS_IGNORE_CASE '" + campaignNameContains + "' " +
            "DURING " + dateRange);
    
        var campaignSearchWords = [];
        var totalSearchWords = [];
        var totalSearchWordsKeys = [];
        var numberOfWords = [];
    
        var queryRows = queryReport.rows();
        while (queryRows.hasNext()) {
            var queryRow = queryRows.next();
            var searchIsExcluded = false;
    
            // Checks if the query is excluded by an ad group level negative
    
            if (negativesByGroup[queryRow["AdGroupId"]] !== undefined) {
                for (var i = 0; i < negativesByGroup[queryRow["AdGroupId"]].length; i++) {
                    if ((negativesByGroup[queryRow["AdGroupId"]][i][1] == "exact" &&
                        queryRow["Query"] == negativesByGroup[queryRow["AdGroupId"]][i][0]) ||
                        (negativesByGroup[queryRow["AdGroupId"]][i][1] != "exact" &&
                            (" " + queryRow["Query"] + " ").indexOf(" " + negativesByGroup[queryRow["AdGroupId"]][i][0] + " ") > -1)) {
                        searchIsExcluded = true;
                        break;
                    }
                }
            }
    
            // Checks if the query is excluded by a campaign level negative
    
            if (!searchIsExcluded && negativesByCampaign[queryRow["CampaignId"]] !== undefined) {
                for (var i = 0; i < negativesByCampaign[queryRow["CampaignId"]].length; i++) {
                    if ((negativesByCampaign[queryRow["CampaignId"]][i][1] == "exact" &&
                        queryRow["Query"] == negativesByCampaign[queryRow["CampaignId"]][i][0]) ||
                        (negativesByCampaign[queryRow["CampaignId"]][i][1] != "exact" &&
                            (" " + queryRow["Query"] + " ").indexOf(" " + negativesByCampaign[queryRow["CampaignId"]][i][0] + " ") > -1)) {
                        searchIsExcluded = true;
                        break;
                    }
                }
            }
    
            if (searchIsExcluded) { continue; }
            // if the search is already excluded by the current negatives,
            // we ignore it and go on to the next query
    
            var currentWords = queryRow["Query"].split(" ");
            var doneWords = [];
    
            if (campaignSearchWords[queryRow["CampaignName"]] == undefined) {
                campaignSearchWords[queryRow["CampaignName"]] = [];
            }
    
            var wordLength = currentWords.length;
            if (wordLength > 6) {
                wordLength = "7+";
            }
            if (numberOfWords[wordLength] == undefined) {
                numberOfWords[wordLength] = [];
            }
            for (var i = 0; i < statColumns.length; i++) {
                if (numberOfWords[wordLength][statColumns[i]] > 0) {
                    numberOfWords[wordLength][statColumns[i]] += parseFloat(queryRow[statColumns[i]].replace(/,/g, ""));
                } else {
                    numberOfWords[wordLength][statColumns[i]] = parseFloat(queryRow[statColumns[i]].replace(/,/g, ""));
                }
            }
    
    
            // Splits the query into words and records the stats for each
    
            for (var w = 0; w < currentWords.length; w++) {
                if (doneWords.indexOf(currentWords[w]) < 0) { //if this word hasn't been in the query yet
    
                    if (campaignSearchWords[queryRow["CampaignName"]][currentWords[w]] == undefined) {
                        campaignSearchWords[queryRow["CampaignName"]][currentWords[w]] = [];
                    }
                    if (totalSearchWords[currentWords[w]] == undefined) {
                        totalSearchWords[currentWords[w]] = [];
                        totalSearchWordsKeys.push(currentWords[w]);
                    }
    
                    for (var i = 0; i < statColumns.length; i++) {
                        var stat = parseFloat(queryRow[statColumns[i]].replace(/,/g, ""));
                        if (campaignSearchWords[queryRow["CampaignName"]][currentWords[w]][statColumns[i]] > 0) {
                            campaignSearchWords[queryRow["CampaignName"]][currentWords[w]][statColumns[i]] += stat;
                        } else {
                            campaignSearchWords[queryRow["CampaignName"]][currentWords[w]][statColumns[i]] = stat;
                        }
                        if (totalSearchWords[currentWords[w]][statColumns[i]] > 0) {
                            totalSearchWords[currentWords[w]][statColumns[i]] += stat;
                        } else {
                            totalSearchWords[currentWords[w]][statColumns[i]] = stat;
                        }
                    }
    
                    doneWords.push(currentWords[w]);
                }//end if
            }//end for
        }//end while
    
        Logger.log("Finished analysing queries.");
    
    
        //////////////////////////////////////////////////////////////////////////////
        // Output the data into the spreadsheet
    
        var campaignSearchWordsOutput = [];
        var campaignSearchWordsFormat = [];
        var totalSearchWordsOutput = [];
        var totalSearchWordsFormat = [];
        var wordLengthOutput = [];
        var wordLengthFormat = [];
    
        // Add headers
    
        var calcStatNames = [];
        for (var s = 0; s < calculatedStats.length; s++) {
            calcStatNames.push(calculatedStats[s][0]);
        }
        var statNames = statColumns.concat(calcStatNames);
        campaignSearchWordsOutput.push(["Campaign", "Word"].concat(statNames));
        totalSearchWordsOutput.push(["Word"].concat(statNames));
        wordLengthOutput.push(["Word count"].concat(statNames));
    
        // Output the campaign level stats
    
        for (var campaign in campaignSearchWords) {
            for (var word in campaignSearchWords[campaign]) {
    
                if (campaignSearchWords[campaign][word]["Impressions"] < impressionThreshold) { continue; }
                if (campaignSearchWords[campaign][word]["Clicks"] < clickThreshold) { continue; }
                if (campaignSearchWords[campaign][word]["Cost"] < costThreshold) { continue; }
                if (campaignSearchWords[campaign][word]["ConvertedClicks"] < conversionThreshold) { continue; }
    
                // skips words under the thresholds
    
                var printline = [campaign, word];
    
                for (var s = 0; s < statColumns.length; s++) {
                    printline.push(campaignSearchWords[campaign][word][statColumns[s]]);
                }
    
                for (var s = 0; s < calculatedStats.length; s++) {
                    var multiplier = calculatedStats[s][1];
                    var divisor = calculatedStats[s][2];
                    if (campaignSearchWords[campaign][word][divisor] > 0) {
                        printline.push(campaignSearchWords[campaign][word][multiplier] / campaignSearchWords[campaign][word][divisor]);
                    } else {
                        printline.push("-");
                    }
                }
    
                campaignSearchWordsOutput.push(printline);
                campaignSearchWordsFormat.push(formatting);
            }
        } // end for
    
    
        totalSearchWordsKeys.sort(function (a, b) { return totalSearchWords[b]["Cost"] - totalSearchWords[a]["Cost"]; });
    
        for (var i = 0; i < totalSearchWordsKeys.length; i++) {
            var word = totalSearchWordsKeys[i];
    
            if (totalSearchWords[word]["Impressions"] < impressionThreshold) { continue; }
            if (totalSearchWords[word]["Clicks"] < clickThreshold) { continue; }
            if (totalSearchWords[word]["Cost"] < costThreshold) { continue; }
            if (totalSearchWords[word]["ConvertedClicks"] < conversionThreshold) { continue; }
    
            // skips words under the thresholds
    
            var printline = [word];
    
            for (var s = 0; s < statColumns.length; s++) {
                printline.push(totalSearchWords[word][statColumns[s]]);
            }
    
            for (var s = 0; s < calculatedStats.length; s++) {
                var multiplier = calculatedStats[s][1];
                var divisor = calculatedStats[s][2];
                if (totalSearchWords[word][divisor] > 0) {
                    printline.push(totalSearchWords[word][multiplier] / totalSearchWords[word][divisor]);
                } else {
                    printline.push("-");
                }
            }
    
            totalSearchWordsOutput.push(printline);
            totalSearchWordsFormat.push(formatting);
        } // end for
    
        for (var i = 1; i < 8; i++) {
            if (i < 7) {
                var wordLength = i;
            } else {
                var wordLength = "7+";
            }
    
            var printline = [wordLength];
    
            if (numberOfWords[wordLength] == undefined) {
                printline.push([0, 0, 0, 0, "-", "-", "-", "-"]);
            } else {
                for (var s = 0; s < statColumns.length; s++) {
                    printline.push(numberOfWords[wordLength][statColumns[s]]);
                }
    
                for (var s = 0; s < calculatedStats.length; s++) {
                    var multiplier = calculatedStats[s][1];
                    var divisor = calculatedStats[s][2];
                    if (numberOfWords[wordLength][divisor] > 0) {
                        printline.push(numberOfWords[wordLength][multiplier] / numberOfWords[wordLength][divisor]);
                    } else {
                        printline.push("-");
                    }
                }
            }
    
            wordLengthOutput.push(printline);
            wordLengthFormat.push(formatting);
        } // end for
    
        // Finds available names for the new sheets
    
        var campaignWordName = "Campaign Word Analysis";
        var totalWordName = "Total Word Analysis";
        var wordCountName = "Word Count Analysis";
        var campaignWordSheet = spreadsheet.getSheetByName(campaignWordName);
        var totalWordSheet = spreadsheet.getSheetByName(totalWordName);
        var wordCountSheet = spreadsheet.getSheetByName(wordCountName);
        var i = 1;
        while (campaignWordSheet != null || wordCountSheet != null || totalWordSheet != null) {
            campaignWordName = "Campaign Word Analysis " + i;
            totalWordName = "Total Word Analysis " + i;
            wordCountName = "Word Count Analysis " + i;
            campaignWordSheet = spreadsheet.getSheetByName(campaignWordName);
            totalWordSheet = spreadsheet.getSheetByName(totalWordName);
            wordCountSheet = spreadsheet.getSheetByName(wordCountName);
            i++;
        }
        campaignWordSheet = spreadsheet.insertSheet(campaignWordName);
        totalWordSheet = spreadsheet.insertSheet(totalWordName);
        wordCountSheet = spreadsheet.insertSheet(wordCountName);
    
        campaignWordSheet.getRange("R1C1").setValue("Analysis of Words in Search Query Report, By Campaign");
        wordCountSheet.getRange("R1C1").setValue("Analysis of Search Query Performance by Words Count");
    
        if (campaignNameContains == "") {
            totalWordSheet.getRange("R1C1").setValue("Analysis of Words in Search Query Report, By Account");
        } else {
            totalWordSheet.getRange("R1C1").setValue("Analysis of Words in Search Query Report, Over All Campaigns Containing '" + campaignNameContains + "'");
        }
    
        campaignWordSheet.getRange("R2C1:R" + (campaignSearchWordsOutput.length + 1) + "C" + campaignSearchWordsOutput[0].length).setValues(campaignSearchWordsOutput);
        campaignWordSheet.getRange("R3C3:R" + (campaignSearchWordsOutput.length + 1) + "C" + (formatting.length + 2)).setNumberFormats(campaignSearchWordsFormat);
        totalWordSheet.getRange("R2C1:R" + (totalSearchWordsOutput.length + 1) + "C" + totalSearchWordsOutput[0].length).setValues(totalSearchWordsOutput);
        totalWordSheet.getRange("R3C2:R" + (totalSearchWordsOutput.length + 1) + "C" + (formatting.length + 1)).setNumberFormats(totalSearchWordsFormat);
        wordCountSheet.getRange("R2C1:R" + (wordLengthOutput.length + 1) + "C" + wordLengthOutput[0].length).setValues(wordLengthOutput);
        wordCountSheet.getRange("R3C2:R" + (wordLengthOutput.length + 1) + "C" + (formatting.length + 1)).setNumberFormats(wordLengthFormat);
    
        Logger.log("Finished writing to spreadsheet.");
    }


    Logger.log("creating spreadsheet");
    var spreadsheet = SpreadsheetApp.create("Report output");
    SkriboForAccounts(go, 1);
    Logger.log("created spreadsheet");
}

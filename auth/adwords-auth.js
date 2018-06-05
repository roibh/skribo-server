var url = require('url');
var http = require('http');
var https = require('https');
var open = require('open');

var options = {
    hostname: 'accounts.google.com',
    port: 443,
    path: '/o/oauth2/token',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

module.exports.getTokens = function (clientId, clientSecret, redirectUri, callback) {
    var time = new Date().getTime();
    var authRequestUrl = 'https://accounts.google.com/o/oauth2/auth';
    authRequestUrl += '?scope=' + encodeURIComponent('https://www.googleapis.com/auth/adwords');
    authRequestUrl += '&response_type=code';
    authRequestUrl += '&access_type=offline';
    authRequestUrl += '&approval_prompt=force';
    authRequestUrl += '&client_id=' + clientId;
    authRequestUrl += '&redirect_uri=' + encodeURIComponent(redirectUri);

    open(authRequestUrl, callback);
    //callback(err, authorizationCode);
}

module.exports.refresh = function (clientId, clientSecret, refreshToken, callback) {
    var time = new Date().getTime();
    var authRequestUrl = 'https://accounts.google.com/o/oauth2/auth';
    var request = https.request(options, function (response) {
        response.setEncoding('utf8');
        var token = '';
        response.on('data', function (chunk) {
            token += chunk;
        });
        response.on('end', function () {
            token = JSON.parse(token);
            token.expires = time + token.expires_in * 1000;
            callback(null, token);
            return;
        });
    });
    request.on('error', function (err) {
        callback(err, null);
        return;
    });
    request.write('client_id=' + clientId);
    request.write('&client_secret=' + clientSecret);
    request.write('&refresh_token=' + refreshToken);
    request.write('&grant_type=refresh_token');
    request.end();
}

module.exports.getRefresTokens = function (clientId, clientSecret, redirectUri, authorizationCode, callback) {
    var request = https.request(options, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            callback(null, chunk);
            return;
        });
    });
    request.on('error', function (err) {
        callback(err, null);
        return;
    });
    request.write('code=' + authorizationCode);
    request.write('&client_id=' + clientId);
    request.write('&client_secret=' + clientSecret);
    request.write('&redirect_uri=' + redirectUri);
    request.write('&grant_type=authorization_code');
    request.end();
}
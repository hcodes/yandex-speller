const querystring = require('querystring');
const https = require('https');

function post(params, callback) {
  const form = querystring.stringify(params.form);
  const options = {
    host: params.host,
    path: params.path,
    port: 443,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(form)
    }
  };

  let req = https.request(options, function(res) {
    let textBuffer = '';

    res.setEncoding('utf8');

    res.on('data', function(chunk) {
      textBuffer += chunk;
    });

    res.on('end', function() {
      let json;
      try {
        json = JSON.parse(textBuffer);
      } catch (e) {
        callback(e);
        return;
      }

      callback(null, res, json);
    });
  });

  req.on('error', function(e) {
    callback(e);
  });

  req.on('timeout', function() {
    req.abort();
    callback(Error('Request timed out.'));
  });

  req.write(form);
  req.end();
}

module.exports = post;

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var Twitter = require('twitter');
var app = express();


app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});


var client = new Twitter({
	  consumer_key: 'RSgnkUZwGxAWWnqZAWh7QFOt2',
	  consumer_secret: 'JckgGctzqn7Md5rkhUh3VPbnVE4EQSYL4zE0704MtsMFaopplj',
	  access_token_key: '248339629-xt2AKRQttBQr3WEUyiovDKrDeu09bObacg50QpcT',
	  access_token_secret: 'dtNUkxKfbcdY7tihRXpCVfTwxAw6QoLp4PZSq6b10Nq8l'
	});

client.stream('statuses/filter', {track: 'GoldmanSachs'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });

  stream.on('error', function(error) {
    throw error;
  });
});
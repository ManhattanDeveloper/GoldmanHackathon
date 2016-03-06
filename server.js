var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var Twitter = require('twitter');
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();
var app = express();


var sum = 0;
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
var consumer_key = process.env.CONSUMER_KEY;
var consumer_secret = process.env.CONSUMER_SECRET;
var acess_token_key = process.env.ACCESS_TOKEN_KEY;
var access_token_secret = process.env.ACCESS_TOKEN_SECRET;

var client = new Twitter({

	  consumer_key: consumer_key,
	  consumer_secret: consumer_secret,
	  access_token_key: access_token_key,
	  access_token_secret: access_token_secret
	});

var array = [sum];



app.post('/addToArray', function(req, res){
  var phrase = req.body.name;
  client.stream('statuses/filter', {track: phrase}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
    array = [tweet.text, sum];
    console.log("Sum" + sum);

    alchemyapi.sentiment("text", tweet.text, {}, function(response) {
    
    console.log(response);
    if((response["status"]) != 'ERROR'){
      if((response["docSentiment"]["score"]) != undefined){
        sum = sum + parseFloat(response["docSentiment"]["score"]);
      };
    };
    

    });
  });

  stream.on('error', function(error) {
    throw error;
  });
});

});

//Retrieves all entries from the array.
app.get('/contactlist', function(req, res){
  res.send(array);
});





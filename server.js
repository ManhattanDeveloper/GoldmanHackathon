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


var client = new Twitter({
	  consumer_key: 'RSgnkUZwGxAWWnqZAWh7QFOt2',
	  consumer_secret: 'JckgGctzqn7Md5rkhUh3VPbnVE4EQSYL4zE0704MtsMFaopplj',
	  access_token_key: '248339629-xt2AKRQttBQr3WEUyiovDKrDeu09bObacg50QpcT',
	  access_token_secret: 'dtNUkxKfbcdY7tihRXpCVfTwxAw6QoLp4PZSq6b10Nq8l'
	});

var array = ["test", sum];



app.post('/addToArray', function(req, res){
  var phrase = req.body.name;
  client.stream('statuses/filter', {track: phrase}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
    sum = Number(sum)+ Math.random()*2-1;
    array = [tweet.text, sum];
    console.log("Sum" + sum);

    alchemyapi.sentiment("text", tweet.text, {}, function(response) {


    });
  });

  stream.on('error', function(error) {
    throw error;
  });
});
  /*
  array.push(req.body.name);
  console.log(array);
  res.send(array);
  */
});

//Retrieves all entries from the array.
app.get('/contactlist', function(req, res){
  res.send(array);
});


/*
    if((typeof response[docSentiment] === undefined) == false){
        myVar =  response["docSentiment"];
        console.log(typeof myVar["score"]);
        
        if (typeof myVar != 'undefined' ){
          array.push(myVar["score"]);
          console.log(array);
          console.log("Sentiment: " + response["docSentiment"]["type"]);
        }
        
    }*/


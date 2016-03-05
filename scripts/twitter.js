var Twitter = require('twitter');

var twitterLog = function(){
	console.log("Lg her")
	
 
	client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response){
	   console.log(tweets);
	});

	var runTweet = new function(){

		console.log("hey");
	}
}


module.export = twitterLog;
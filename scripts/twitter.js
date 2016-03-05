var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'RSgnkUZwGxAWWnqZAWh7QFOt2',
  consumer_secret: 'JckgGctzqn7Md5rkhUh3VPbnVE4EQSYL4zE0704MtsMFaopplj',
  access_token_key: '248339629-xt2AKRQttBQr3WEUyiovDKrDeu09bObacg50QpcT',
  access_token_secret: 'dtNUkxKfbcdY7tihRXpCVfTwxAw6QoLp4PZSq6b10Nq8l'
});
 
client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response){
   console.log(tweets);
});
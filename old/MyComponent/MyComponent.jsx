import React from 'react';
import SubComponentA from './subcomponents/SubComponentA';

/**
 * Component seed to demonstrate how to build a component.
 * For Component Lifecycle API go to:
 * https://facebook.github.io/react/docs/component-specs.html
 *
 * For component Documentation go to:
 * <INSERT DOC URL>
 */
export default class MyComponent extends React.Component {

    // ---------------------------------------------------
    // VIEW LIFECYCLE. THESE ARE CALLED BY REACT AUTOMATICALLY
    // ALL METHODS ARE OPTIONAL
    // ----------------------------------------------------
	constructor() {
		super();
		this.bindMethods();
        this.state = {searchWord:null,data:null};
        
	}

    componentDidMount() {
        setInterval(function(){

            this.serverRequest = $.get('/getData', function(result){
                this.state.data = result[0]
            })
        }, 3000);
        var state = this.props.meta.state;
        this.setState(state);
    }

    // ---------------------------------------------------
    // MOVEMENT LIFECYCLE.
    // THESE ARE ALL CALLED BY THE LAYOUT MANAGER.
    // ----------------------------------------------------

	//Resize callbacks
	resizeStart() {
		console.log('resize started');
	}

	resize() {
		console.log('resize happening');
	}

	resizeStop() {
		console.log('resize stopped');
	}

	//drag callbacks
	dragStart() {
		console.log('drag started');
	}

	drag() {
		console.log('drag happening');
	}

	dragStop() {
		console.log('drag stopped');
	}

    // ---------------------------------------------------
    // ACTUAL CODE FOR COMPONENT THAT DOES ANYTHING
    // ----------------------------------------------------

    /**
     * Make the following methods accessible outside component
     * @return {[type]} [description]
     */
    bindMethods() {
        this.resizeStart = this.resizeStart.bind(this);
        this.resize = this.resize.bind(this);
        this.resizeStop = this.resizeStop.bind(this);
        this.dragStart = this.dragStart.bind(this);
        this.drag = this.drag.bind(this);
        this.dragStop = this.dragStop.bind(this);
    }

    assetFieldChanged(event) {
        var text = event.target.value;
        this.setState({userName:text}, function() {
            this.parseTwitter(text);
            this.props.meta.state =  this.state;
        });
    }

    parseTwitter(searchWord){
        var Twitter = require('twitter');
        var AlchemyAPI = require('./alchemyapi');

        var client = new Twitter({
              consumer_key: 'RSgnkUZwGxAWWnqZAWh7QFOt2',
              consumer_secret: 'JckgGctzqn7Md5rkhUh3VPbnVE4EQSYL4zE0704MtsMFaopplj',
              access_token_key: '248339629-xt2AKRQttBQr3WEUyiovDKrDeu09bObacg50QpcT',
              access_token_secret: 'dtNUkxKfbcdY7tihRXpCVfTwxAw6QoLp4PZSq6b10Nq8l'
            });

        client.stream('statuses/filter', {track: searchWord}, function(stream) {
          stream.on('data', function(tweet) {
            console.log(tweet.text);
            alchemyapi.sentiment("text", tweet.text, {}, function(response) {
                console.log("Sentiment: " + response["docSentiment"]["type"]);
                });
          });

          stream.on('error', function(error) {
            throw error;
          });
        });
    }

	/**
	 * Create component HTML
	 * @return {[type]} [description]
	 */
  	render() {
        return (
        <div className='my-component'>
            <br/>
            <input placeholder="Type your number" style={{width:'50%'}} type="text" value={this.state.userName} onChange={this.assetFieldChanged.bind(this)}> </input>
            <br/>
            <p style={{color:'white'}}>Welcome: {this.state.userName} </p>
            
        </div>

        );
    }
}
import React from 'react';
 
export default class SubComponentA extends React.Component {

	/**
	 * Create component HTML
	 * @return {[type]} [description]
	 */
  	render() {
	    return (
	    	<p style={{color : 'red'}}> Subcomponent says: {this.props.hello}</p>
	    );
  	}
}
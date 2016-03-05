import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './src/dashboard/Dashboard';
import Header from './src/header/Header';

class Sandbox extends React.Component {

    render() {
        return (
        	<div className="sandbox">
        		<Header></Header>
        		<Dashboard></Dashboard>
        	</div>
        )
    }
}

//insert into DOM
var el = ReactDOM.render(<Sandbox/>,document.getElementById('content'));
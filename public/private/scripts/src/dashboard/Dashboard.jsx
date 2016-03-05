import React from 'react';
import MyComponent from '../../../../MyComponent/MyComponent';
import Gridster from './dependencies/gridster/Gridster';
import meta from '../../../../MyComponent/meta.json';

const COMPONENT_TO_SHOW = MyComponent;

/**
 * Trading and reporting dashboard
 */
 export default class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {components:[COMPONENT_TO_SHOW], gridster:null, definedLayout:null};
    }

    insertComponents(components) {
        var el = React.createElement(components[0], {meta:meta});
        var elements = [el];
        return elements;
    }

    gridsterSet(gridster) {
        this.state.gridster = gridster;
    }

    render() {
        return (
            <div className="dashboard">
                <Gridster definedLayout={this.state.definedLayout} onGridsterSet={this.gridsterSet.bind(this)}>
                    {this.insertComponents(this.state.components)}
                </Gridster>
            </div>
            )
    }
}
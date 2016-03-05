import React from 'react';
import ReactDOM from 'react-dom';



export default class Gridster extends React.Component {

    /**
     * Configure gridster
     * @return {[type]} [description]
     */
    gridsterSettings() {
        return {
            widget_margins:[2,2],
            widget_base_dimensions:[100, 55],
            resize: {
                enabled : true,
                start: this.resizeStart.bind(this),
                resize: this.resize.bind(this),
                stop: this.resizeStop.bind(this)
            },
            draggable : {
                start : this.dragStart.bind(this),
                drag : this.drag.bind(this),
                stop : this.dragStop.bind(this)
            }
        }
    }

    //-------------------------------------------------
    //Lifecycle
    //-------------------------------------------------
    constructor() {
        super();
        this.state = {componentsById:{}};
        this.bindMethods();
    }

    componentDidMount() {
        this.linkGridster();
    }

    bindMethods() {
        this.wrapChildrenComponents = this.wrapChildrenComponents.bind(this);
        this.trackComponentById = this.trackComponentById.bind(this);
        this.getComponentById = this.getComponentById.bind(this);
    }

    //-------------------------------------------------
    //Resize callbacks
    //-------------------------------------------------
    resizeStart(event, ui, el) {
        var componentId = el[0].children[0].id;
        this.dispatchActionToComponentInElement('resizeStart', componentId);
    }

    resize(event, ui, el) {
        var componentId = el[0].children[0].id;
        this.dispatchActionToComponentInElement('resize', componentId);
    }

    resizeStop(event, ui, el) {
        var componentId = el[0].children[0].id;
        this.dispatchActionToComponentInElement('resizeStop', componentId);
    }

    //-------------------------------------------------
    //Drag start
    //-------------------------------------------------
    dragStart(event, ui) {
        var componentId = "child-" + ui.$helper[0].id;
        this.dispatchActionToComponentInElement('dragStart', componentId);
    }

    drag(event, ui) {
        var componentId = "child-" + ui.$helper[0].id;
        this.dispatchActionToComponentInElement('drag', componentId);
    }

    dragStop(event, ui) {
        var componentId = "child-" + ui.$helper[0].id;
        this.dispatchActionToComponentInElement('dragStop', componentId);
    }

    //-------------------------------------------------
    //Gridster
    //-------------------------------------------------

    /**
     * Insert gridster
     * @return {[type]} [description]
     */
    linkGridster() {
        var gridster = $(".gridster ul").gridster(this.gridsterSettings()).data('gridster');
        this.setState({gridster: gridster});
        this.props.onGridsterSet(gridster);
    }

    dispatchActionToComponentInElement(action, componentId) {
        var component = this.getComponentById(componentId);

        if (component[action]) {
            component[action]();
        }
    }

    trackComponentById(id, component) {
        var keyMap = this.state.componentsById;
        keyMap[id] = component;
    }

    getComponentById(id) {
        var keyMap = this.state.componentsById;
        return keyMap[id];
    }

    //-------------------------------------------------
    //Insert
    //-------------------------------------------------
    /**
     * Wraps children in the react component
     * @param  {[type]} children [description]
     * @return {[type]}          [description]
     */
    wrapChildrenComponents(children) {
        var self = this;

        var gridster = self.state.gridster;
        if (gridster) {
            var wrappedComponents = React.Children.map(children, function(component, idx) {

                //uniquely id component
                var key = 'component-' + idx.toString();
                var componentId = 'child-' + key;

                //only add new elements
                var elementExists = document.getElementById(componentId) != null;
                if (!elementExists) {

                    //add element to DOM first
                    var el = '<li id="{key}" key={key}><div class="db-component-base" id="{componentId}"></div></li>'.replace(/{key}/g, key).replace('{componentId}', componentId);
                    var layout = component.props.meta.layouts.web;
                    gridster.add_widget.apply(gridster, [el, layout.size_x, layout.size_y, layout.col, layout.row]);

                    //render react component to this html element
                    var component = ReactDOM.render(component, document.getElementById(componentId));
                    self.trackComponentById(componentId, component);
                }
            });
        }
    }

    render() {
        return (
            <div className="gridster" style={{minWidth : "100%", padding:'20px'}}>
                <ul style={{"position" : "relative", "minWidth":"100%", width:'100%', height:'100%'}}>
                    {this.wrapChildrenComponents(this.props.children)}
                </ul>
            </div>
        )
    }
}
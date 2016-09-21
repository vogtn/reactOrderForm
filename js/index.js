"use strict";

var ServiceChooser = React.createClass({
    displayName: "ServiceChooser",

    getInitialState: function getInitialState() {
        return { total: 0 };
    },

    addTotal: function addTotal(price) {
        this.setState({ total: this.state.total + price });
    },

    render: function render() {

        var self = this;

        var services = this.props.items.map(function (s) {

            // Create a new Service component for each item in the items array.
            // Notice that I pass the self.addTotal function to the component.

            return React.createElement(Service, { name: s.name, price: s.price, active: s.active, addTotal: self.addTotal });
        });

        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { id: "services" },
                services,
                React.createElement(
                    "p",
                    { id: "total" },
                    "Total ",
                    React.createElement(
                        "b",
                        null,
                        "$",
                        this.state.total.toFixed(2)
                    )
                )
            )
        );
    }
});

var Service = React.createClass({
    displayName: "Service",

    getInitialState: function getInitialState() {
        return { active: false };
    },

    clickHandler: function clickHandler() {

        var active = !this.state.active;

        this.setState({ active: active });

        // Notify the ServiceChooser, by calling its addTotal method
        this.props.addTotal(active ? this.props.price : -this.props.price);
    },

    render: function render() {

        return React.createElement(
            "p",
            { className: this.state.active ? 'active' : '', onClick: this.clickHandler },
            this.props.name,
            " ",
            React.createElement(
                "b",
                null,
                "$",
                this.props.price.toFixed(2)
            )
        );
    }

});

var services = [{ name: 'Plane Ticket', price: 300 }, { name: 'Housing', price: 400 }, { name: 'Food', price: 250 }, { name: 'Training', price: 220 }];

// Render the ServiceChooser component, and pass the array of services

ReactDOM.render(React.createElement(ServiceChooser, { items: services }), document.getElementById('container'));

/*

Menu

*/

var MenuExample = React.createClass({
    displayName: "MenuExample",

    getInitialState: function getInitialState() {
        return { focused: 0 };
    },

    clicked: function clicked(index) {

        // The click handler will update the state with
        // the index of the focused menu entry

        this.setState({ focused: index });
    },

    render: function render() {

        // Here we will read the items property, which was passed
        // as an attribute when the component was created

        var self = this;

        // The map method will loop over the array of menu entries,
        // and will return a new array with <li> elements.

        return React.createElement(
            "div",
            null,
            React.createElement(
                "ul",
                null,
                this.props.items.map(function (m, index) {

                    var style = '';

                    if (self.state.focused == index) {
                        style = 'focused';
                    }

                    // Notice the use of the bind() method. It makes the
                    // index available to the clicked function:

                    return React.createElement(
                        "li",
                        { className: style, onClick: self.clicked.bind(self, index) },
                        m
                    );
                })
            ),
            React.createElement(
                "h1",
                null,
                "Selected: ",
                this.props.items[this.state.focused]
            )
        );
    }
});

// Render the menu component on the page, and pass an array with menu options

ReactDOM.render(React.createElement(MenuExample, { items: ['Home', 'Services', 'About', 'Contact us'] }), document.getElementById('menu'));
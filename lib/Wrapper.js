var React = require('react');
var createManager = require('./createManager');
var specialAssign = require('./specialAssign');

var checkedProps = {
  children: React.PropTypes.node.isRequired,
  activeTabId: React.PropTypes.string,
  letterNavigation: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  tag: React.PropTypes.string,
};

module.exports = React.createClass({
  displayName: 'AriaTabPanel-Wrapper',

  propTypes: checkedProps,

  getDefaultProps: function() {
    return { tag: 'div' };
  },

  childContextTypes: {
    atpManager: React.PropTypes.object.isRequired,
  },

  getChildContext: function() {
    return { atpManager: this.manager };
  },

  componentWillMount: function() {
    this.componentWillReceiveProps(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    this.manager = createManager({
      onChange: nextProps.onChange,
      activeTabId: nextProps.activeTabId,
      letterNavigation: nextProps.letterNavigation,
    });
  },

  componentWillUpdate: function() {
    this.manager.activate();
  },

  componentWillUnmount: function() {
    this.manager.destroy();
  },

  componentDidMount: function() {
    this.manager.activate();
  },

  render: function() {
    var props = this.props;
    var elProps = {};
    specialAssign(elProps, props, checkedProps);
    return React.createElement(props.tag, elProps, props.children);
  },
});

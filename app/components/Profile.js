var React = require('react');
var Router = require('react-router');
var Repos = require('../components/Github/Repos');
var UserProfile = require('../components/Github/UserProfile');
var Notes = require('../components/Notes/Notes');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var Profile = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return {
      notes: [1,2,3],
      bio: {
        name: "Phrenel Lawson"
      },
      repos: ["ab", "cd", "ef"]
    }
  },
  componentDidMount: function() {
    this.ref = new Firebase('https://react-egghead-1e5d6.firebaseio.com/');
    var childRef = this.ref.child(this.props.params.username);
    this.bindAsArray(childRef, 'notes');
  },
  componentWillUnmount: function() {
    this.unbind('notes');
  },
  render: function() {
    return (
      <div className="row">

        <div className="col-md-4">
          <UserProfile username={this.props.params.username} bio={this.state.bio} />
        </div>

        <div className="col-md-4">
          <Repos username={this.props.params.username} repos={this.state.repos} />
        </div>

        <div className="col-md-4">
          <Notes username={this.props.params.username} notes={this.state.notes} />
        </div>

      </div>
    )
  }
})

module.exports = Profile;
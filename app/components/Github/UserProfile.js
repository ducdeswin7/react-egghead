import React from 'react';

var UserProfile = React.createClass({
    propTypes: {
        username: React.PropTypes.string.isRequired,
        bio: React.PropTypes.object.isRequired
    },
    render: function() {
        console.log('REPOS', this.props.bio);
        return (
            <div>
                {this.props.bio.avatar_url && <li className="list-group-item"> <img src={this.props.bio.avatar_url} /></li>}
                {this.props.bio.name && <li className="list-group-item">Name: {this.props.bio.name}</li>}
                {this.props.bio.login && <li className="list-group-item">Username: {this.props.bio.login}</li>}
                {this.props.bio.email && <li className="list-group-item">Email: {this.props.bio.email}</li>}
            </div>
        );
    }
});

module.exports = UserProfile;

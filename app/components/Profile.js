import React from 'react';
import Repos from '../components/Github/Repos';
import UserProfile from '../components/Github/UserProfile';
import Notes from '../components/Notes/Notes';
import getGithubInfo from '../utils/helpers';
import Rebase from 're-base';

const base = Rebase.createClass(
    {
        apiKey: "AIzaSyAlO4LpjrSibwrtPY0LPdsXSbsVp5HMNqU",
        authDomain: "react-egghead-1e5d6.firebaseapp.com",
        databaseURL: "https://react-egghead-1e5d6.firebaseio.com/",
        storageBucket: "bucket.appspot.com",
        messagingSenderId: "825972099195"
    },
    'react-egghead');

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            bio: {},
            repos: []
        }
    }
    componentDidMount() {
        this.init(this.props.params.username);
    }
    componentWillReceiveProps(nextProps){
        base.removeBinding(this.ref);
        this.init(nextProps.params.username);
    }
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }
    init(username) {
        this.ref = base.bindToState(username, {
            context: this,
            asArray: true,
            state: 'note'
        });

        getGithubInfo(this.props.params.username)
            .then(function (data) {
                this.setState({
                    bio: data.bio,
                    repos: data.repos
                })
            }.bind(this))
    }
    handleAddNote(newNote) {
        base.post(this.props.params.username, {
            data: this.state.notes.concat([newNote])
        })
    }
    render() {
        return (
            <div className="row">

                <div className="col-md-4">
                    <UserProfile username={this.props.params.username} bio={this.state.bio} />
                </div>

                <div className="col-md-4">
                    <Repos username={this.props.params.username} repos={this.state.repos} />
                </div>

                <div className="col-md-4">
                    <Notes
                        addNote={(newNote) => this.handleAddNote(newNote)}
                        username={this.props.params.username}
                        notes={this.state.notes} />
                </div>

            </div>
        )
    }
}

export default Profile;
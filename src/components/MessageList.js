import React from 'react';
import './../css/MessageList.css'

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friendsList: []
        };
    }

    handleClick() {
        console.log("Hello")
        this.setState({
            isRead: !this.state.isRead,
            isSelected: true
        })
    }

    componentDidMount() {
        const me = this;
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                console.log(this.responseText)
                var json = JSON.parse(this.responseText);
                json.forEach(function(friendItem) {
                    console.log(friendItem.FirstName);
                    console.log(friendItem.LastName);
                    console.log(friendItem.UserId);

                    

                    me.setState({
                        firstName: friendItem.FirstName,
                        lastName: friendItem.LastName,
                        userId: friendItem.UserId


                    })
                    // MessageList.push()
                })
            }
        };

        xhttp.open("GET", "https://iz8ccp1kta.execute-api.eu-west-2.amazonaws.com/messaging-rest/friends")
        xhttp.send();

        console.log("Hello");
    }

    render() {
        console.log(`Selected: ${this.state.isSelected}`);
        return (
            <div>
                <MessageListItem ></MessageListItem>
            </div>
        )
    }
}
export default MessageList;
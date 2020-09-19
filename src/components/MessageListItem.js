import React from 'react';
import './../css/MessageListItem.css'

class MessageListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRead: props.isRead,
            isSelected: props.isSelected,
            messageText: props.messageText,
            firstName: props.firstName,
            lastName: props.lastName,
            userId: props.userId,
        };
        console.log(this.state.isSelected);
    }

    handleClick() {
        console.log("Hello")
        this.setState({
            isRead: true,
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
            <div onClick={() => this.handleClick()} className={`message-list-item ${this.state.isRead ? "read": "unread"} ${this.state.isSelected ? "selected" : ""}`} data-user-id={this.state.userId}>
                <div className="name" >{this.state.firstName} {this.state.lastName}</div>
                <div className="message-preview">{this.state.messageText}</div>
            </div>
        )
    }
}
export default MessageListItem;
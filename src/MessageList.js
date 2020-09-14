import React from 'react';
import './css/MessageListItem.css'

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRead: false,
            isSelected: false
        };
        console.log(this.state.isSelected);
    }

    handleClick() {
        console.log("Hello")
        this.setState({
            isRead: !this.state.isRead,
            isSelected: true
        })
    }

    render() {
        console.log(`Selected: ${this.state.isSelected}`);
        return (
            <div onClick={() => this.handleClick()} className={`message-preview ${this.state.isRead ? "read": "unread"} ${this.state.isSelected ? "selected" : ""}`}>Hello</div>
        )
    }
}
export default MessageList;
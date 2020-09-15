import React from 'react'

import './css/MessageThread.css'

class MessageThread extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSender: props.isSender,
            messageText: props.messageText,
        }
    }

    render() {
        return(
            <div className="message-thread-container">
                <div className={`message-thread ${this.state.isSender ? "me" : "other-person"}`}>
                    {this.state.messageText}
                </div>
            </div>
        );
    }
}

export default MessageThread;
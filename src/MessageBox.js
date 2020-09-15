import React from 'react';

import './css/MessageBox.css'

class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            messageToSend: '',
            webSocket: props.webSocket
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(event) {
        console.log(this.state.messageToSend);
        event.preventDefault();
        console.log(this.state);
        this.state.webSocket.json({
            action: "default",
            message: this.state.messageToSend
        });

    }

    onInputChange(event) {
        this.setState({
            messageToSend: event.target.value
        })
        event.preventDefault();
    }

    render() {
        return (
            <div className="bottom-bar">
                <form onSubmit={this.sendMessage} className="message-box-form">
                    <input type="text" className="message-box" value={this.state.messageToSend} onChange={this.onInputChange}/>
                    {/* <input type="submit" className="message-button" value="Send" /> */}
                    <button type="submit" className="message-button"><span className="material-icons">send</span></button>
                </form>
            </div>
        )
    }
}

export default MessageBox;
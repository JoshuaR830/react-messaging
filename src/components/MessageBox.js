import React from 'react';

import SendIcon from '@material-ui/icons/SendRounded'

import './../css/MessageBox.css'

class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            messageToSend: '',
            webSocket: props.webSocket,
            onSubmit: (message) => props.onSubmit(props.context, message)
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(event) {
        console.log(this.state.messageToSend);
        event.preventDefault();
        console.log(this.state);
        this.state.onSubmit(this.state.onSubmit(this.state.messageToSend));
        this.state.webSocket.json({
            action: "default",
            message: this.state.messageToSend
        });
        this.setState({
            messageToSend: ""
        });

        this.messageInput.focus();
    }

    componentDidMount(){
        this.messageInput.focus();
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
                    <input type="text" className="message-box" value={this.state.messageToSend} onChange={this.onInputChange} ref={(input) => { this.messageInput = input; }}/>
                    <button type="submit" className="message-button"><SendIcon style={{color: "#00b7ff"}}/></button>
                </form>
            </div>
        )
    }
}

export default MessageBox;
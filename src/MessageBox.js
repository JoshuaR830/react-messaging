import React from 'react';

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
            <form onSubmit={this.sendMessage}>
                <label>Message:
                    <input type="text" value={this.state.messageToSend} onChange={this.onInputChange}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default MessageBox;
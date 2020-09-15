import React from 'react';
import MessageList from './MessageList';
import MessageBox from './MessageBox';
import MessageThread from './MessageThread';

import Sockette from 'sockette'

import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            ws: this.startWebSocket(),
            messageList: []
        }
    }

    startWebSocket() {
        const ws = new Sockette('wss://oc9gdrsfcl.execute-api.eu-west-2.amazonaws.com/messaging-test', {
            timeout: 5e3,
            maxAttempts: 1,
            onopen: e => {
                console.log("Connected!")
            },
            onmessage: e => {
                if(this._isMounted) {
                    this.generateMessageList(e.data);
                }
                console.log('Received:', e.data)
            },
            onreconnect: e => console.log('Reconnecting...', e),
            onmaximum: e => console.log('Stop attempting!', e),
            onclose: e => console.log('Closed!', e),
            onerror: e => console.log('Error:', e),
        });

        return ws;
    }

    generateMessageList(message) {
        let messages = this.state.messageList.slice();

        console.log(messages)

        messages.push(<MessageList key={messages.length} messageText = {message} isSelected = {false} isRead = {false}/>);

        console.log(messages)


        this.setState({
            messageList: messages
        })
    }

    updateMessages() {
        let messages = this.state.messageList.slice();
        
        let newMessages = [];

        messages.forEach(function(message) {
            newMessages.push()
        })
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return ( 
            <div className="thread-view">
                {/* {this.state.messageList} */}
                <MessageThread 
                    isSender = {false} 
                    messageText="Hello world! how are you doing this should overflow onto the next line at some point because it is a big hello to the whole world!"
                />
                <MessageThread 
                    isSender = {true} 
                    messageText="Hello world! how are you doing this should overflow onto the next line at some point because it is a big hello to the whole world!"
                />
                <MessageBox
                    webSocket = {this.state.ws}
                />
            </div>
        );
    }
}

export default App;

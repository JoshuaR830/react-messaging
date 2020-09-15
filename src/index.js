import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// const ws = new Sockette('wss://oc9gdrsfcl.execute-api.eu-west-2.amazonaws.com/messaging-test', {
//   timeout: 5e3,
//   maxAttempts: 1,
//   onopen: e => {
//     ReactDOM.render(
//       <React.StrictMode>
//         {/* <App /> */}
//         <MessageBox 
//           webSocket = {ws}
//         />
//         <MessageList/>
//       </React.StrictMode>,
//       document.getElementById('root')
//     );
//     console.log("Connected!")
//     // ws.json({
//     //   action: "default",
//     //   message: "Hello world!"
//     // });
//   },
//   onmessage: e => {console.log('Received:', e)},
//   onreconnect: e => console.log('Reconnecting...', e),
//   onmaximum: e => console.log('Stop attempting!', e),
//   onclose: e => console.log('Closed!', e),
//   onerror: e => console.log('Error:', e),
// });

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

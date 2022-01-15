import React from 'react' //React default
import ReactDOM from 'react-dom' //React default
import './index.css' // styling CSS file
import App from './components/App' //our main App
import { createStore } from 'redux' //create sroe from redux
import { Provider } from 'react-redux' //to take the Redux store state and give it to any component tha ask for it
import reducer from './reducers' //import reducer files
import middleware from './middlewares' // import middleware files

const store = createStore(reducer, middleware)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
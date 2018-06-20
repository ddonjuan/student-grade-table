import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import promise from './middleware/promise';

const store = createStore(rootReducer, {}, applyMiddleware(promise))

ReactDOM.render(
    <Provider store ={store}>
        <App />
    </Provider>
    ,
    document.getElementById('root')
);

registerServiceWorker();

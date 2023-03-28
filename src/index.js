import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/LoginReducer';
import newsReducer from './reducers/NewsReducer';
import playerReducer from './reducers/PlayerReducer';
import seasonReducer from './reducers/SeasonReducer';
import seasonGameReducer from './reducers/SeasonGameReducer';
import userReducer from './reducers/UserReducer';


const rootReducer = combineReducers({
  login: loginReducer,
  news: newsReducer,
  player: playerReducer,
  seasonGame: seasonGameReducer,
  season:seasonReducer,
  user:userReducer

});

const store = createStore(rootReducer, applyMiddleware(thunk));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
